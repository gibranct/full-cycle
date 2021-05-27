const app = require('express')()
const mysql = require('mysql')

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

function createTablePerson() {
  return new Promise((resolve,reject) => {
    const connection = mysql.createConnection(config)
    const sql = "CREATE TABLE IF NOT EXISTS people ( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, PRIMARY KEY ( id ))"
    connection.query(sql, (error) => {
      if (error) {
        return reject(error)
      }
      connection.end()
      resolve()
    })
  })
}

function insertPerson() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config)
    const sql = "INSERT INTO people(name) VALUES ('Gibran')"
    connection.query(sql, (error) => {
      if (error) {
        return reject(error)
      }
      resolve()
      connection.end()
    })
  })
}

function findPeople() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config)
    const sql = "SELECT * FROM people"
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return reject(error)
      }
      resolve(results)
      connection.end()
    })
  })
}


app.listen(3000, async () => {
  console.log('Server is running at http://localhost:3000')
  await createTablePerson();
})

app.get('/', async (req, res) => {
  await insertPerson()
  const people = await findPeople();
  const unorderedList = `
    <ul>
      ${people.map(p => `<li>${p.id} - ${p.name}</li>`).join('')}
    </ul>
  `
  res.contentType('.html').send(`
    <h1>Full Cycle Rocks!</h1>
    </br>
    ${unorderedList}
  `)
})


