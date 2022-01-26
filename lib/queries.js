'use stric'
const connectDb = require('./conexion')
const { ObjectID } = require('mongodb')
module.exports = {
  getCourses: async () => {
    let db
    let courses = []

    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
      return courses
    } catch (error) {
      console.error('Error', error)
    }
    return courses
  },
  getCourse: async (__, { id }) => {
    let db
    let course = []
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      return course
    } catch (error) {
      console.error('Error', error)
    }
    return course
  },
  getStudents: async () => {
    let db
    let students = []

    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
      return students
    } catch (error) {
      console.error('Error', error)
    }
    return students
  },
  getStudent: async (__, { id }) => {
    let db
    let student = []
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
      return student
    } catch (error) {
      console.error('Error', error)
    }
    return student
  }
}
