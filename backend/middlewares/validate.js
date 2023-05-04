const Joi = require("@hapi/joi");

const create = Joi.object({
  name: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  email: Joi.string().email(),
  gender: Joi.string(),
  role: Joi.string(),
  telephone: Joi.string(),
  classID: Joi.string(),
  positions: Joi.array(),
  position: Joi.string(),
  address: Joi.string(),
  courses: Joi.array(),
  classes: Joi.array(),
  nextofKinID: Joi.string(),
  profileUrl: Joi.string(),
  grade: Joi.string(),
});

const login = Joi.object({
  userID: Joi.string().required(),
  password: Joi.string().required(),
});

const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const createDepart = Joi.object({
  headTeacher: Joi.string(),
  name: Joi.string().required(),
  office: Joi.string(),
});

const createCourse = Joi.object({
  name: Joi.string().required(),
  code: Joi.string(),
  type: Joi.string(),
  teacherID: Joi.string(),
});

const createClass = Joi.object({
  name: Joi.string().required(),
  classCode: Joi.string().required(),
  campusID: Joi.string(),
  teacherID: Joi.string(),
});

const createnextKin = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  address: Joi.string(),
  telephone: Joi.string(),
  occupation: Joi.string(),
  email: Joi.string(),
  relationship: Joi.string(),
  gender: Joi.string(),
});

const startAttendance = Joi.object({
  startTime: Joi.string(),
  startLocation: Joi.string().required(),
});

const endAttendance = Joi.object({
  endTime: Joi.string(),
  endLocation: Joi.string().required(),
});

const createTask = Joi.object({
  deadline: Joi.string(),
  score: Joi.string(),
  teacherID: Joi.string(),
  classID: Joi.string(),
  courseID: Joi.string(),
  taskData: Joi.string().required(),
});

const createFile = Joi.object({
  filename: Joi.string(),
  courseID: Joi.string(),
  senderID: Joi.string(),
  fileData: Joi.string(),
});

const results = Joi.object({
  studentID: Joi.string(),
  courseID: Joi.string(),
  score: Joi.string(),
  total: Joi.string(),
  teacherID: Joi.string(),
});

const sendFriendRequest = Joi.object({
  acceptor_id: Joi.string().required(),
  requestor_id: Joi.string().required(),
});

const sendMessage = Joi.object({
  message: Joi.string().required(),
  senderID: Joi.string().required(),
  channelID: Joi.string().required(),
});

module.exports = {
  sendMessage,
  sendFriendRequest,
  results,
  createFile,
  create,
  login,
  changePassword,
  createDepart,
  createCourse,
  createClass,
  createnextKin,
  startAttendance,
  endAttendance,
  createTask,
};
