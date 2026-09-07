# Tdata MacOS Stealer

<p align="center">
  <br>
  <strong>MacOS Telegram Data Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-MacOS-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized data extraction is illegal.

## Description

The Tdata MacOS Stealer is a specialized tool designed to extract and exfiltrate Telegram Desktop data from MacOS systems. It features intelligent path detection, automated compression, and secure data transmission via Discord webhook.

## Features

- 🎯 Specialized for MacOS Telegram Desktop
- 📁 Intelligent Telegram directory detection
- 🗜️ Automatic data compression
- 🌐 Discord webhook integration
- 🧹 Self-cleaning functionality
- ⚡ Quick and efficient execution
- 🔍 Smart error handling
- 📊 Cross-version compatibility

## Technical Details

### Data Extraction
- Target Directory: `/Users/$USER/Library/Application Support/Telegram Desktop/tdata`
- Extraction Method: ZIP compression
- Excluded Patterns:
    - `/emoji*`
    - `/dumps*`
    - `/user_data/media*`

### Security Features
- Process termination check
- Temporary file cleanup
- Error handling and logging
- Memory management

## Requirements

### System Requirements
- MacOS Monterey (12.0) or later
- Telegram Desktop installed
- Active Telegram profile
- Network connectivity
- Minimum 100MB free disk space

### Tested Environments
- MacOS Monterey 12.0
- MacOS Ventura 13.0
- MacOS Sonoma 14.0

## Configuration

1. Edit the payload file:
```bash
# Replace webhook URL
!!!PASTE_WEBHOOK_HERE!!!
```

## Usage

1. Deploy payload on target system
2. Automatic execution sequence:
    - Terminates active Telegram process
    - Locates Telegram data directory
    - Creates compressed archive
    - Transmits via Discord webhook
    - Cleans temporary files

## Response Format

```json
{
  "type": "file",
  "name": "tdata_macos.zip",
  "size": "SIZE_IN_BYTES",
  "timestamp": "YYYY-MM-DD HH:MM:SS"
}
```

## Error Handling

- Process termination failures
- Directory access issues
- Compression errors
- Network transmission problems

## Security Notes

- Implements secure file handling
- Network traffic encryption
- Temporary file shredding
- Memory cleanup
## 🛡️ Defense

**Detection**
- Access to the Telegram `tdata` directory (`%APPDATA%\Telegram Desktop\tdata\` or `~/Library/Application Support/Telegram Desktop/tdata/`)
- Copy operations of `D877F783D5D3EF8C*` key files and `map*` files
- Exfiltration of small binary files (typically 1 KB–64 KB) to external destinations
- A non-Telegram process accessing session files

**Mitigation**
- Enable Telegram's passcode lock (Settings → Privacy & Security → Passcode Lock)
- Encrypt the Telegram data directory with third-party tools
- Application allowlisting to restrict access to the session folder
- Monitor `tdata` access from non-Telegram processes
- Review active sessions regularly; use "Log Out Other Sessions" on suspicion

**Weakness** — Telegram Desktop stores session authorization keys in plain files in `tdata`, so copying them hijacks the session.
