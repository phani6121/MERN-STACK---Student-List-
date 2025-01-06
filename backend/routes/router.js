const express = require("express");
const students = require("../models/studentSchema");

const router = express();


// POST API to add a new student
router.post("/addStudents", async (req, res) => {
    const { name, address, subject, mobile } = req.body;
    try {
        // Create a new student using the provided data
        const newStudent = new students({
            name,
            address,
            subject,
            mobile
        });
        // Save the new student to the database
        await newStudent.save();
        // Respond with the newly created student data
        return res.status(201).json(newStudent);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
});


// GET API to get all students
router.get("/getStudents", async (req, res) => {
    try {
        const allStudents = await students.find();
        return res.status(200).json(allStudents);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
});

// GET API to get a student by ID
router.get("/getStudentById/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const student = await students.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        return res.status(200).json(student);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
});

// PUT API to update student details
router.put("/updateStudent/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, subject, mobile } = req.body;

    try {
        const updatedStudent = await students.findByIdAndUpdate(
            id,
            { name, address, subject, mobile },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        return res.status(200).json(updatedStudent);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
});

// DELETE API to remove a student by ID
router.delete("/deleteStudent/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const studentToDelete = await students.findByIdAndDelete(id);

        if (!studentToDelete) {
            return res.status(404).json({ message: "Student not found." });
        }

        return res.status(200).json({ message: "Student deleted successfully." });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
});

module.exports = router;