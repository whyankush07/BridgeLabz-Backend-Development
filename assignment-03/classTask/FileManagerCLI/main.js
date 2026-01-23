const fs = require('fs');

function readFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            handleError(err, filePath);
        } else {
            console.log('File content:\n', data);
        }
    });
}

function writeFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            handleError(err, filePath);
        } else {
            console.log(`Successfully wrote to ${filePath}`);
        }
    });
}

function appendFile(filePath, content) {
    fs.appendFile(filePath, content + '\n', (err) => {
        if (err) {
            handleError(err, filePath);
        } else {
            console.log(`Successfully appended to ${filePath}`);
        }
    });
}

function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            handleError(err, source);
        } else {
            console.log(`Successfully copied ${source} to ${destination}`);
        }
    });
}

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            handleError(err, filePath);
        } else {
            console.log(`Successfully deleted ${filePath}`);
        }
    });
}

function listDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            handleError(err, dirPath);
        } else {
            console.log(`Contents of ${dirPath}:`);
            files.forEach(file => console.log(`  - ${file}`));
        }
    });
}

function handleError(error, filePath) {
    if (error.code === 'ENOENT') {
        console.error(`Error: File or directory not found - ${filePath}`);
    } else if (error.code === 'EACCES') {
        console.error(`Error: Permission denied - ${filePath}`);
    } else {
        console.error(`Error: ${error.message}`);
    }
}

function showHelp() {
    console.log("File Manager CLI Tool\n");
    console.log("Usage:");
    console.log("  node main.js read <file_path>");
    console.log("  node main.js write <file_path> <content>");
    console.log("  node main.js append <file_path> <content>");
    console.log("  node main.js copy <source_path> <destination_path>");
    console.log("  node main.js delete <file_path>");
    console.log("  node main.js list <directory_path>");
}

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command) {
        showHelp();
        return;
    }

    switch (command.toLowerCase()) {
        case 'read':
            if (args.length < 2) {
                console.log('Usage: read <file_path>');
                return;
            }
            readFile(args[1]);
            break;

        case 'write':
            if (args.length < 3) {
                console.log('Usage: write <file_path> <content>');
                return;
            }
            writeFile(args[1], args.slice(2).join(' '));
            break;

        case 'append':
            if (args.length < 3) {
                console.log('Usage: append <file_path> <content>');
                return;
            }
            appendFile(args[1], args.slice(2).join(' '));
            break;

        case 'copy':
            if (args.length < 3) {
                console.log('Usage: copy <source_path> <destination_path>');
                return;
            }
            copyFile(args[1], args[2]);
            break;

        case 'delete':
            if (args.length < 2) {
                console.log('Usage: delete <file_path>');
                return;
            }
            deleteFile(args[1]);
            break;

        case 'list':
            if (args.length < 2) {
                console.log('Usage: list <directory_path>');
                return;
            }
            listDirectory(args[1]);
            break;

        default:
            console.log(`Unknown command: ${command}`);
            showHelp();
    }
}

main();