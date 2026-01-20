const fs = require('fs');
const path = require('path');

class FileManager {
    async readFile(filePath : string) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            console.log('File Content:');
            console.log(data);
            return data;
        } catch (error) {
            this.handleError(error, 'reading');
        }
    }

    async writeFile(filePath: string, content: string) {
        try {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`✓ Successfully written to ${filePath}`);
        } catch (error) {
            this.handleError(error, 'writing');
        }
    }

    async appendFile(filePath: string, content: string) {
        try {
            await fs.appendFile(filePath, content + '\n', 'utf-8');
            console.log(`✓ Successfully appended to ${filePath}`);
        } catch (error) {
            this.handleError(error, 'appending');
        }
    }

    async copyFile(source: string, destination: string) {
        try {
            await fs.copyFile(source, destination);
            console.log(`✓ Successfully copied ${source} to ${destination}`);
        } catch (error) {
            this.handleError(error, 'copying');
        }
    }

    async deleteFile(filePath: string) {
        try {
            await fs.unlink(filePath);
            console.log(`✓ Successfully deleted ${filePath}`);
        } catch (error) {
            this.handleError(error, 'deleting');
        }
    }

    async listFiles(dirPath: string) {
        try {
            const files = await fs.readdir(dirPath, { withFileTypes: true });
            console.log(`\nContents of ${dirPath}:`);
            console.log('─'.repeat(50));
            
            if (files.length === 0) {
                console.log('(empty directory)');
                return;
            }

            files.forEach((file: any) => {
                const type = file.isDirectory() ? '[DIR]' : '[FILE]';
                console.log(`${type} ${file.name}`);
            });
            console.log('─'.repeat(50));
        } catch (error) {
            this.handleError(error, 'listing');
        }
    }

    handleError(error: any, operation: string) {
        if (error.code === 'ENOENT') {
            console.error(`✗ Error: File or directory not found while ${operation}`);
        } else if (error.code === 'EACCES') {
            console.error(`✗ Error: Permission denied while ${operation}`);
        } else if (error.code === 'EISDIR') {
            console.error(`✗ Error: Target is a directory, not a file`);
        } else if (error.code === 'ENOTDIR') {
            console.error(`✗ Error: Target is a file, not a directory`);
        } else {
            console.error(`✗ Error while ${operation}:`, error.message);
        }
        process.exit(1);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const fileManager = new FileManager();

    if (args.length === 0) {
        console.log(`
File Manager CLI Tool
Usage: node stream.js <command> [arguments]

Commands:
  read <file>              - Read and display file content
  write <file> <content>   - Write content to file
  append <file> <content>  - Append content to file
  copy <source> <dest>     - Copy file from source to destination
  delete <file>            - Delete a file
  list <directory>         - List files in directory

Examples:
  node stream.js read input.txt
  node stream.js write output.txt "Hello World"
  node stream.js append output.txt "New log entry"
  node stream.js copy input.txt backup.txt
  node stream.js delete temp.txt
  node stream.js list ./
        `);
        return;
    }

    const command = args[0].toLowerCase();

    switch (command) {
        case 'read':
            if (args.length < 2) {
                console.error('✗ Error: Please provide a file path');
                console.log('Usage: node stream.js read <file>');
                process.exit(1);
            }
            await fileManager.readFile(args[1]);
            break;

        case 'write':
            if (args.length < 3) {
                console.error('✗ Error: Please provide file path and content');
                console.log('Usage: node stream.js write <file> <content>');
                process.exit(1);
            }
            await fileManager.writeFile(args[1], args.slice(2).join(' '));
            break;

        case 'append':
            if (args.length < 3) {
                console.error('✗ Error: Please provide file path and content');
                console.log('Usage: node stream.js append <file> <content>');
                process.exit(1);
            }
            await fileManager.appendFile(args[1], args.slice(2).join(' '));
            break;

        case 'copy':
            if (args.length < 3) {
                console.error('✗ Error: Please provide source and destination paths');
                console.log('Usage: node stream.js copy <source> <destination>');
                process.exit(1);
            }
            await fileManager.copyFile(args[1], args[2]);
            break;

        case 'delete':
            if (args.length < 2) {
                console.error('✗ Error: Please provide a file path');
                console.log('Usage: node stream.js delete <file>');
                process.exit(1);
            }
            await fileManager.deleteFile(args[1]);
            break;

        case 'list':
            if (args.length < 2) {
                console.error('✗ Error: Please provide a directory path');
                console.log('Usage: node stream.js list <directory>');
                process.exit(1);
            }
            await fileManager.listFiles(args[1]);
            break;

        default:
            console.error(`✗ Error: Unknown command '${command}'`);
            console.log('Run "node stream.js" without arguments to see available commands');
            process.exit(1);
    }
}

main().catch(error => {
    console.error('✗ Unexpected error:', error.message);
    process.exit(1);
});
