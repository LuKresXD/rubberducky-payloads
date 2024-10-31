# Tdata Windows Stealer

<p align="center">
  <img src="../assets/tdata-windows-banner.png" alt="Tdata Windows Stealer Banner" width="600"/>
  <br>
  <strong>Windows Telegram Data Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized data extraction is illegal.

## Description

The Tdata Windows Stealer is engineered specifically for Windows Telegram Desktop installations. It features process management, efficient data extraction, and secure exfiltration capabilities.

## Features

- 🎯 Windows Telegram specialized
- 💻 Process management
- 📁 Smart path resolution
- 🌐 Discord webhook integration
- 🧹 Automated cleanup
- ⚡ High-speed execution
- 🔍 Comprehensive error handling
- 📊 Multi-version support

## Technical Details

### Data Extraction
- Target Directory: `%APPDATA%\Telegram Desktop\tdata`
- Process Handling: Graceful termination
- Compression: ZIP with selective inclusion
- Data Filtering: Smart pattern matching

### Security Implementation
- Process verification
- Access validation
- Resource management
- Error containment

## Requirements

### System Requirements
- Windows 10/11
- Telegram Desktop installed
- Active profile
- Network access
- 100MB minimum free space

### Tested Platforms
- Windows 10 Pro (20H2)
- Windows 10 Enterprise (21H2)
- Windows 11 Pro (22H2)

## Configuration

1. Edit payload configuration:
```bash
# Set webhook URL
!!!PASTE_WEBHOOK_HERE!!!
```

## Usage

1. Execute on target system
2. Automated sequence:
    - Terminates Telegram
    - Locates data directory
    - Creates secure archive
    - Transmits via webhook
    - Cleans environment

## Response Format

```json
{
  "type": "file",
  "name": "tdata_windows.zip",
  "size": "SIZE_IN_BYTES",
  "timestamp": "YYYY-MM-DD HH:MM:SS"
}
```

## Error Handling

- Process termination failures
- Access permission issues
- Compression errors
- Network failures

## Security Features

- Secure file operations
- Network security
- Trace removal
- Memory sanitization

## Additional Notes

- Supports multiple Telegram versions
- Handles portable installations
- Manages multiple profiles
- Preserves file integrity