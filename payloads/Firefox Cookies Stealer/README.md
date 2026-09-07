# Firefox Cookie Stealer

<p align="center">
  <br>
  <strong>Firefox Profile Data Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized data extraction is illegal.

## Description

The Firefox Cookie Stealer is a specialized tool designed to extract and exfiltrate Firefox browser data, specifically focusing on the cookies database.

## Features

- 🔍 Locates Firefox profile directory
- 📦 Extracts cookies.sqlite database
- 🌐 Discord webhook integration
- 🧹 Trace cleaning functionality
- 🚀 Fast and efficient execution

## Requirements

- Target System:
    - Windows 10/11
    - Firefox browser installed
    - Active Firefox profile
    - Network connectivity
- Tested On:
    - Windows 10 Pro Version 22H2
    - Windows 11 Pro Version 23H2

## Configuration

1. Edit the payload file:
    - Replace `!!!PASTE_WEBHOOK_HERE!!!` with your Discord webhook URL

## Usage

1. Deploy on target system
2. Automatic process:
    - Locates Firefox profile
    - Extracts cookie database
    - Sends via webhook
    - Cleans traces
## 🛡️ Defense

**Detection**
- File reads on Firefox profile directories (`%APPDATA%\Mozilla\Firefox\Profiles\*.default\cookies.sqlite`)
- A non-browser process opening browser SQLite databases
- Copy operations of `.sqlite` files to temporary locations
- Outbound transmission of SQLite databases or extracted cookies

**Mitigation**
- Application allowlisting to restrict which processes can read browser profile directories
- Encrypt Firefox data stores with a master password
- Monitor cookie-database access from non-browser processes
- Data-loss-prevention (DLP) rules for cookie/session-token exfiltration
- Browser sandboxing to isolate cookie stores from userland processes

**Weakness** — Firefox stores session cookies in unencrypted SQLite databases inside user-accessible directories.
