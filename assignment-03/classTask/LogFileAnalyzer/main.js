const fs = require('fs');

function analyzeLogFile(logFilePath, reportFilePath) {
    const stats = {
        totalLines: 0,
        ERROR: 0,
        WARNING: 0,
        INFO: 0
    };

    // Handle incomplete lines between chunks
    let leftover = '';
    const readStream = fs.createReadStream(logFilePath, { encoding: 'utf-8' });

    readStream.on('data', (chunk) => {
        const lines = (leftover + chunk).split('\n');
        leftover = lines.pop(); // Save incomplete line for next chunk

        lines.forEach((line) => {
            stats.totalLines++;
            
            if (line.includes('ERROR')) stats.ERROR++;
            else if (line.includes('WARNING')) stats.WARNING++;
            else if (line.includes('INFO')) stats.INFO++;
        });
    });

    readStream.on('end', () => {
        // Process the last line if exists
        if (leftover) {
            stats.totalLines++;
            if (leftover.includes('ERROR')) stats.ERROR++;
            else if (leftover.includes('WARNING')) stats.WARNING++;
            else if (leftover.includes('INFO')) stats.INFO++;
        }

        generateReport(stats, reportFilePath);
        console.log('Analysis completed!');
        console.log(`Total Lines: ${stats.totalLines}`);
        console.log(`ERROR: ${stats.ERROR}, WARNING: ${stats.WARNING}, INFO: ${stats.INFO}`);
    });

    readStream.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.error('Error: Log file not found!');
        } else if (err.code === 'EACCES') {
            console.error('Error: Permission denied!');
        } else {
            console.error('Error:', err.message);
        }
    });
}

function generateReport(stats, reportFilePath) {
    const reportContent = `
=== Log File Analysis Report ===
Generated: ${new Date().toLocaleString()}

Total Lines: ${stats.totalLines}
ERROR Count: ${stats.ERROR}
WARNING Count: ${stats.WARNING}
INFO Count: ${stats.INFO}

ERROR Percentage: ${((stats.ERROR / stats.totalLines) * 100).toFixed(2)}%
WARNING Percentage: ${((stats.WARNING / stats.totalLines) * 100).toFixed(2)}%
INFO Percentage: ${((stats.INFO / stats.totalLines) * 100).toFixed(2)}%
`;

    const writeStream = fs.createWriteStream(reportFilePath);
    writeStream.write(reportContent);
    writeStream.end();

    writeStream.on('finish', () => {
        console.log(`Report saved to ${reportFilePath}`);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing report:', err.message);
    });
}

function main() {
    console.log("=== Log File Analyzer ===\n");
    
    const args = process.argv.slice(2);
    const logFile = args[0];
    const reportFile = args[1] || 'report.txt';

    if (!logFile) {
        console.log('Usage: node main.js <log_file_path> [report_file_path]');
        console.log('Example: node main.js server.log analysis-report.txt');
        return;
    }

    console.log(`Analyzing: ${logFile}`);
    console.log(`Report will be saved to: ${reportFile}\n`);
    
    analyzeLogFile(logFile, reportFile);
}

main();
