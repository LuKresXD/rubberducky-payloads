# WinRM Backdoor

<p align="center">
  <img src="../assets/winrm-banner.png" alt="WinRM Backdoor Banner" width="600"/>
  <br>
  <strong>Advanced Windows Remote Management Backdoor</strong>
</p>

![Category](https://img.shields.io/badge/Category-Remote%20Access-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized access to computer systems is illegal.

## Description

The WinRM Backdoor is an advanced penetration testing tool that automates the setup of persistent remote access on Windows systems. It configures Windows Remote Management with stealth measures and includes Discord webhook integration for real-time notifications.

## Features

- 📡 Reports system IP address to Discord webhook
- 👤 Creates hidden administrative user account
- 🔓 Enables Windows Remote Management (WinRM)
- 🛡️ Configures firewall rules automatically
- 🚫 Disables UAC remote restrictions
- 🕵️ Implements stealth measures

## Requirements

- Target System:
    - Windows 10/11 Professional or Enterprise
    - User with administrative privileges
    - Network connectivity
- Tested On:
    - Windows 10 Family Version 20H2 (PowerShell 5.1)
    - Windows 10 Professional Version 20H2 (PowerShell 5.1)

## Configuration

1. Edit the payload file:
    - Replace `!!!PASTE_WEBHOOK_HERE!!!` with your Discord webhook URL

## Usage

1. Deploy the payload on target system with administrative privileges
2. Wait for Discord notification containing:
    - Local IP address
    - Computer name
    - Username
3. Access system remotely using WinRM credentials:
    - Username: Userr
    - Password: Passwordd

## Security Measures

This tool implements several security features:
- Discord webhook for secure communication
- Hidden user account creation
- Firewall rule configuration
- UAC bypass for remote access