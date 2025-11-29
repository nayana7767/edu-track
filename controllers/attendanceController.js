const Attendance = require('../models/Attendance');

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

const getAttendanceByEnrollment = async (req, res) => {
  try {
    const attendance = await Attendance.findByEnrollmentId(req.params.enrollmentId);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance for enrollment', error: error.message });
  }
};

const createAttendance = async (req, res) => {
  try {
    const attendanceId = await Attendance.create(req.body);
    res.status(201).json({ message: 'Attendance created successfully', attendanceId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance', error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    await Attendance.update(req.params.id, req.body);
    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance', error: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    await Attendance.delete(req.params.id);
    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance', error: error.message });
  }
};

module.exports = { getAllAttendance, getAttendanceById, getAttendanceByEnrollment, createAttendance, updateAttendance, deleteAttendance };
