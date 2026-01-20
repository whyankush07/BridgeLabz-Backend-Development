const fs = require("fs");
const path = require("path");

class FileManager {
    async readFile(filepath) {
        try {
            const data = await fs.readFile(filepath, 'utf-8');
            console.log('File Content: ');
            console.log(data);
        } catch (error) {
            console.error('The filepath does not exist!!');
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    const fm = new FileManager();

    if (args.length === 0) {
        console.log('This is a CLI file manager!!');
        return;
    }

    const command = args[0].toLowerCase();

    switch (command){
        case 'read':
            if (args.length < 2) {
                console.error('Please enter the file path!!');
            }
            await fm.readFile(args[1]);
            break;
    }
}

main().catch(error => {
    console.error('✗ Unexpected error:', error.message);
    process.exit(1);
});
