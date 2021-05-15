FROM golang:1.16.4-alpine as builder

WORKDIR /app

COPY . .

RUN go build main.go


FROM hello-world

WORKDIR /app

COPY --from=builder /app/main .

ENTRYPOINT [ "./main" ]