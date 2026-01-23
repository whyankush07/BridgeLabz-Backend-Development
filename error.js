const fsPromises = require("fs");

// fs.readFile("./text.txt", "utf-8", (error, data) => {
//     if (error) {
//         if (error.code === "ENOENT") {
//             console.log("File not found");
//         } else {
//             console.log("Error reading file:", error);
//         }
//         return;
//     }
//     console.log(data);
// });

// const fsPromises=require("fs").fsPromises;
// async function readFilseSafe(){
//     try{
//         const data = await fsPromises("./text.txt", "utf-8");
//         console.log(data);
//     }catch(err){
//         console.log("Error:",err.code);
//     }
// }

const readStream= fsPromises.createReadStream("./input.txt", "utf-8");
const writeStream= fsPromises.createWriteStream("./source.txt", "utf-8");
readStream.on("error",(err)=>{
    console.log("Read error:" ,err.message);
    writeStream.destroy();
});

writeStream.on("error",(err)=>{
    console.log("Read error:" ,err.message);
    readStream.destroy();
});