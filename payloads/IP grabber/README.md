# IP Grabber

<p align="center">
  <br>
  <strong>Windows System Information Collector</strong>
</p>

![Category](https://img.shields.io/badge/Category-Reconnaissance-orange)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized data collection is illegal.

## Description

The IP Grabber is a specialized reconnaissance tool designed to collect and report system information from Windows machines. It features Discord webhook integration for secure data exfiltration.

## Features

- 📡 Collects local IP address
- 💻 Retrieves system hostname
- 👤 Captures username
- 🔒 Secure data transmission via Discord webhook
- ⚡ Fast and lightweight execution

## Requirements

- Target System:
    - Windows 10/11
    - PowerShell 5.1 or higher
    - Network connectivity
- Tested On:
    - Windows 10 Family Version 20H2 (PowerShell 5.1)
    - Windows 10 Professional Version 20H2 (PowerShell 5.1)

## Configuration

1. Edit the payload file:
    - Replace `!!!PASTE_WEBHOOK_HERE!!!` with your Discord webhook URL

## Usage

1. Deploy payload on target system
2. Receive Discord notification containing:
    - Local IP address
    - Computer name
    - Username
