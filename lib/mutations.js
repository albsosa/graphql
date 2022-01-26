'use stric'
const connectDb = require('./conexion')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course

    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  createStudent: async (root, { input }) => {
    let db
    let student

    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course

    try {
      db = await connectDb()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student

    try {
      db = await connectDb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      student = await db.collection('students').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()
      person = await db.collection('students').findOne({ _id: ObjectID(personID) })
      course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })

      if (!person || !course) throw new Error('La Persona o el Curso no existe')
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  }
}
