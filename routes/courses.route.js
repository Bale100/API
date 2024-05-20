const express = require('express')
let coursesController = require('../controllers/courses.controller')
const courseValidationSchema = require('../middlewares/courseValidationSchema')
const courseRouter = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const userRoles = require('../utilities/userRoles')
const allowedTo = require('../middlewares/allowedTo')
//----------------------------------------------------------------
courseRouter.route('/')
  .get(coursesController.getAllCourses)
  .post(verifyToken, courseValidationSchema,
      coursesController.createCourse)

courseRouter.route('/:courseId')
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse)
//----------------------------------------------------------------
module.exports = courseRouter; // this is not function