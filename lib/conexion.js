const { MongoClient } = require('mongodb')

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`
let connection

async function connectDB () {
  if (connection) return connection.db()

  let client
  try {
    client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = await client.connect()
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }
  return connection.db()
}

module.exports = connectDB
