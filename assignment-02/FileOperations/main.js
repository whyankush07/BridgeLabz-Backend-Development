// Exercise 1: File Operations
// Create a Node.js program that reads a text file, counts the number of words, and writes the count to a new file.

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const wordCount = data.split(/\s+/).filter((word) => word.length > 0).length;
  
  fs.writeFile(outputPath, `Word Count: ${wordCount}`, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("Word count written to", outputPath);
  });
});
