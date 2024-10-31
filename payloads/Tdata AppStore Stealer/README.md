# Tdata AppStore Stealer

<p align="center">
  <img src="../assets/tdata-appstore-banner.png" alt="Tdata AppStore Stealer Banner" width="600"/>
  <br>
  <strong>App Store Telegram Data Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-MacOS_AppStore-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized data extraction is illegal.

## Description

The Tdata AppStore Stealer specifically targets the App Store version of Telegram on MacOS. It features container-aware extraction, sandbox navigation, and secure data exfiltration.

## Features

- 🎯 Specialized for App Store Telegram version
- 📱 Container-aware data extraction
- 🗄️ Sandbox navigation capability
- 🌐 Discord webhook integration
- 🧹 Trace removal
- ⚡ Optimized performance
- 🔍 Advanced error handling
- 📊 Version compatibility checks

## Technical Details

### Data Extraction
- Target Path: `/Users/$USER/Library/Group Containers/[Telegram.ID]/appstore`
- Container Detection: Dynamic ID resolution
- Compression Method: ZIP with exclusions
- Data Selection: Smart filtering

### Security Measures
- Sandbox compliance
- Access validation
- Resource cleanup
- Error isolation

## Requirements

### System Requirements
- MacOS Monterey (12.0) or later
- App Store version of Telegram
- Active Telegram profile
- Network connectivity
- 100MB minimum free space

### Tested Environments
- MacOS Monterey 12.0
- MacOS Ventura 13.0
- MacOS Sonoma 14.0

## Configuration

1. Modify the payload:
```bash
# Insert webhook URL
!!!PASTE_WEBHOOK_HERE!!!
```

## Usage

1. Deploy on target system
2. Automatic execution flow:
    - Locates App Store container
    - Identifies Telegram data
    - Creates secured archive
    - Exfiltrates via webhook
    - Removes traces

## Response Format

```json
{
  "type": "file",
  "name": "tdata_appstore.zip",
  "size": "SIZE_IN_BYTES",
  "timestamp": "YYYY-MM-DD HH:MM:SS"
}
```

## Error Management

- Container access errors
- Permission issues
- Compression failures
- Network problems

## Security Features

- Secure container handling
- Network encryption
- File sanitization
- Memory management