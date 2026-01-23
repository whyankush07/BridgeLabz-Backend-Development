const os = require('os');
const fs = require('fs');

function getSystemInfo() {
    const timestamp = new Date().toISOString();
    const cpus = os.cpus();
    const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
    const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);
    const usedMemory = (totalMemory - freeMemory).toFixed(2);
    
    const info = {
        timestamp: timestamp,
        platform: os.platform(),
        architecture: os.arch(),
        cpuModel: cpus[0].model,
        cpuCores: cpus.length,
        totalMemoryGB: totalMemory,
        freeMemoryGB: freeMemory,
        usedMemoryGB: usedMemory,
        uptime: (os.uptime() / 3600).toFixed(2) + ' hours'
    };
    
    return info;
}

function logSystemInfo() {
    const info = getSystemInfo();
    const logEntry = `
================================
Timestamp: ${info.timestamp}
Platform: ${info.platform}
Architecture: ${info.architecture}
CPU Model: ${info.cpuModel}
CPU Cores: ${info.cpuCores}
Total Memory: ${info.totalMemoryGB} GB
Used Memory: ${info.usedMemoryGB} GB
Free Memory: ${info.freeMemoryGB} GB
System Uptime: ${info.uptime}
================================

`;
    
    fs.appendFile('system-log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing log:', err.message);
        } else {
            console.log(`[${info.timestamp}] System info logged`);
        }
    });
}

console.log('System Information Logger Started');
console.log('Logging every 5 seconds to system-log.txt');
console.log('Press Ctrl+C to stop\n');

// Log immediately on start
logSystemInfo();

// Log every 5 seconds
setInterval(logSystemInfo, 5000);
