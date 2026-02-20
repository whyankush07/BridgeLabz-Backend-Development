const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let students = [
  { id: 1, name: "Kirito", marks: 85, grade: "A" },
  { id: 2, name: "Asuna", marks: 72, grade: "B" },
  { id: 3, name: "Leafa", marks: 35, grade: "F" },
];

// Display all students
app.get("/students", (req, res) => {
  res.render("students", { students });
});

// Display individual student
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) {
    return res.send("Student not found");
  }

  res.render("student", { student });
});

// Form to add student
app.get("/add-student", (req, res) => {
  res.render("add-student");
});

// Add student
app.post("/add-student", (req, res) => {
  const { name, marks } = req.body;

  const grade = marks >= 50 ? "Pass" : "Fail";

  const newStudent = {
    id: students.length + 1,
    name,
    marks: Number(marks),
    grade,
  };

  students.push(newStudent);
  res.redirect("/students");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
