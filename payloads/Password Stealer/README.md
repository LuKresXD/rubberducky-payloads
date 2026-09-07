# Password Stealer

<p align="center">
  <br>
  <strong>Advanced Windows Credential Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized credential extraction is illegal.

## Description

The Password Stealer is an advanced credential extraction tool designed for Windows systems. It features UAC bypass capabilities and secure data exfiltration via Discord webhook.

## Features

- 🔓 Advanced credential extraction
- 🛡️ UAC bypass functionality
- 🔥 Real-time monitoring disabling
- 🌐 Discord webhook integration
- 🧹 Self-cleaning capabilities

## Requirements

- Target System:
    - Windows 10/11
    - Administrative privileges
    - Network connectivity
- Tested On:
    - Windows 10 Professional Version 20H2 (PowerShell 5.1)
    - Windows 11 Professional Version 23H2 (PowerShell 5.1)

## Configuration

1. Edit the payload file:
    - Replace `!!!PASTE_WEBHOOK_HERE!!!` with your Discord webhook URL

## Usage

1. Deploy with administrative privileges
2. Automatic process:
    - Disables security features
    - Extracts credentials
    - Sends data via webhook
    - Cleans traces

## 🛡️ Defense

**Detection**
- Security service stops (Event ID 7036) for antivirus/EDR processes
- LSASS memory access by non-system tools (Sysmon Event ID 10)
- Credential-dumping patterns (Mimikatz-like command lines)
- Registry changes disabling Defender real-time protection
- Outbound exfiltration of credential data (base64-encoded or compressed)

**Mitigation**
- Enable Credential Guard and LSA protection to isolate credential material
- Application allowlisting to block credential-dumping tools
- EDR with credential-theft detection (e.g. Microsoft Defender for Identity)
- Disable plaintext credential storage in memory via Group Policy
- Network segmentation to restrict outbound traffic from sensitive workstations
- Regular credential rotation and multi-factor authentication

**Weakness** — Windows caches credentials in memory for single sign-on, and administrative processes can disable security tooling.
