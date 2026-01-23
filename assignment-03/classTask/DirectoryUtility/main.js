const fs = require('fs').promises;
const path = require('path');

async function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    await fs.appendFile('backup.log', logMessage);
    console.log(message);
}

async function ensureDirectory(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

async function backupFiles(sourceDir, backupDir) {
    const timestamp = new Date().toISOString().split('T')[0];
    const backupFolder = path.join(backupDir, `backup-${timestamp}`);
    
    await ensureDirectory(backupFolder);
    
    let backedUpCount = 0;
    
    async function backupRecursive(currentSource, currentBackup) {
        const files = await fs.readdir(currentSource);
        
        for (const file of files) {
            const sourcePath = path.join(currentSource, file);
            const backupPath = path.join(currentBackup, file);
            const stats = await fs.stat(sourcePath);
            
            if (stats.isDirectory()) {
                // Create directory in backup and recurse into it
                await ensureDirectory(backupPath);
                await backupRecursive(sourcePath, backupPath);
            } else {
                // Backup file
                await fs.copyFile(sourcePath, backupPath);
                await log(`Backed up: ${path.relative(sourceDir, sourcePath)}`);
                backedUpCount++;
            }
        }
    }
    
    await backupRecursive(sourceDir, backupFolder);
    return backedUpCount;
}

async function deleteOldFiles(sourceDir, daysOld = 7) {
    const now = Date.now();
    const cutoffTime = daysOld * 24 * 60 * 60 * 1000; // milliseconds for daysOld(7)
    let deletedCount = 0;
    
    async function deleteRecursive(currentDir) {
        const files = await fs.readdir(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = await fs.stat(filePath);
            
            if (stats.isDirectory()) {
                // Recurse into subdirectory
                await deleteRecursive(filePath);
            } else {
                const fileAge = now - stats.mtime.getTime();
                
                if (fileAge > cutoffTime) {
                    await fs.unlink(filePath);
                    await log(`Deleted old file: ${path.relative(sourceDir, filePath)} (age: ${Math.floor(fileAge / (24 * 60 * 60 * 1000))} days)`);
                    deletedCount++;
                }
            }
        }
    }
    
    await deleteRecursive(sourceDir);
    return deletedCount;
}

async function main() {
    console.log("=== Directory Backup & Cleanup Utility ===\n");
    
    const args = process.argv.slice(2);
    const sourceDir = args[0] || './uploads';
    const backupDir = args[1] || './backups';
    
    try {
        await log("Starting backup and cleanup process...");
        
        // Backup files
        const backedUp = await backupFiles(sourceDir, backupDir);
        await log(`Total files backed up: ${backedUp}`);
        
        // Delete old files
        const deleted = await deleteOldFiles(sourceDir);
        await log(`Total old files deleted: ${deleted}`);
        
        await log("Process completed successfully!");
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: Directory not found!');
            await log(`Error: Directory not found - ${error.path}`);
        } else if (error.code === 'EACCES') {
            console.error('Error: Permission denied!');
            await log(`Error: Permission denied - ${error.path}`);
        } else {
            console.error('Error:', error.message);
            await log(`Error: ${error.message}`);
        }
    }
}

main();
