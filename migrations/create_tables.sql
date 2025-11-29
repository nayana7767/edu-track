-- EduTrack Database Schema

CREATE DATABASE IF NOT EXISTS edutrack;
USE edutrack;

-- Users table (students, faculty, admin)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'faculty', 'admin') NOT NULL,
  department_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  department_id INT,
  faculty_id INT,
  credits INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (faculty_id) REFERENCES users(id)
);

-- Enrollments table
CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE(student_id, course_id)
);

-- Grades table
CREATE TABLE grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT,
  grade VARCHAR(5),
  grade_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(id)
);

-- Attendance table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL,
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
  UNIQUE(enrollment_id, date)
);

-- Add foreign key to users
ALTER TABLE users ADD FOREIGN KEY (department_id) REFERENCES departments(id);
