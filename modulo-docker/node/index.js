const app = require('express')()
const mysql = require('mysql')

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)

const sql = "INSERT INTO people(name) VALUES ('Gibran')"
connection.query(sql)
connection.end()

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})

app.get('/', (req, res) => res.send('ok'))


