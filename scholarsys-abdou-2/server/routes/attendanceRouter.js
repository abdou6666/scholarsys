const express = require('express');
const attendanceController = require('../controllers/attendance.controller');
const attendanceRouter = express.Router();

attendanceRouter.get('/all', attendanceController.getAll);
attendanceRouter.get('/:id', attendanceController.getOne);
attendanceRouter.post('/', attendanceController.create);
attendanceRouter.patch('/:id', attendanceController.update);
attendanceRouter.delete('/:id', attendanceController.delete);

module.exports = attendanceRouter;
