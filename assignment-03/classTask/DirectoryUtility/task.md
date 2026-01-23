# Task 3 : Directory Backup & Cleanup Utility Scenario

Your system stores user uploads. You must:
- Backup important files
- Delete old unused files automatically

## Tasks
Create a Node.js utility that:Scans a directoryCopies files to a backup folder with timestampDeletes files older than 7 daysLogs all operations into backup.log

## Constraints
- Use fs.stat
- Handle missing directories safely
- Use promises / async-await