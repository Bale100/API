const Course = require("../models/course.model") 
const {validationResult} = require('express-validator')
const httpStatusText = require("../utilities/httpStatusText")
const asyncWrapper = require ("../middlewares/asyncWrapper")
const appError = require("../utilities/appErorr")
//----------------------------------------------------------------
const getAllCourses=asyncWrapper(
  async (req, res,next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, {"__v":false}).limit(limit).skip(skip);
  res.status(200).json({status: httpStatusText.SUCCESS, data: {courses}})
})

const getCourse = asyncWrapper(
  async(req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course){
      const error = appError.create("no course found", 404, httpStatusText.FAIL)
      return next(error);
    }
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {course}})
  }
)

const createCourse=asyncWrapper(
  async(req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 404, httpStatusText.FAIL)
      return next(error);
    }
    const newCourse = new Course(req.body) // newCourse is object 
    await newCourse.save()
    return res.status(201).json({status:httpStatusText.SUCCESS, data: {newCourse}})
})

const updateCourse=asyncWrapper(
  async(req, res, next) => {
    const updateCourse = await Course.updateOne({_id: req.params.courseId} , {$set: {...req.body}}) // $set is operator
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {course: updateCourse}})
  }
)

const deleteCourse=asyncWrapper(
  async(req, res)=>{
  await Course.deleteOne({_id :req.params.courseId})
  // res.status(200).json({msg: 'Course deleted'})
  res.status(200).json({status: httpStatusText.SUCCESS, data: null})
})
//----------------------------------------------------------------
module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
}