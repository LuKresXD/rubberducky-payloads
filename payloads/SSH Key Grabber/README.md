# SSH Key Grabber

<p align="center">
  <br>
  <strong>Advanced SSH Key Extraction and Exfiltration Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## 🚀 Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized key extraction is illegal.

## Description

The SSH Key Grabber is an advanced penetration testing tool designed to locate and exfiltrate SSH private keys from Windows systems. It features intelligent path detection, multi-method extraction, and secure Discord webhook integration for data transmission.

## Features

- 🔍 Smart SSH directory detection
- 🔐 Multiple extraction methods:
    - Default ~/.ssh location scanning
    - Recursive pattern matching
- 📤 Discord webhook integration
- 🧹 Self-cleaning functionality
- ⚡ Quick execution
- 🛡️ Error handling
- 🔄 System state preservation

## Requirements

### System Requirements
- Windows 10/11
- PowerShell 5.1 or higher
- Network connectivity
- Administrative privileges (recommended)

### Tested Environments
- Windows 10 Pro Version 22H2 (PowerShell 5.1)
- Windows 11 Pro Version 23H2 (PowerShell 5.1)

## Configuration

1. Edit the payload file:
```bash
# Replace webhook URL
!!!PASTE_WEBHOOK_HERE!!!
```

## Usage

1. Deploy on target system
2. Automatic process:
    - Locates SSH directories
    - Extracts private keys
    - Performs recursive search
    - Transmits via webhook
    - Cleans traces

## Response Format

```json
{
  "content": "🔑 **SSH Keys Found!**\n",
  "embeds": [{
    "title": "SSH Key Information",
    "fields": [
      {
        "name": "System Info",
        "value": "Windows Version, Computer Name"
      },
      {
        "name": "Keys Found",
        "value": "List of discovered keys"
      }
    ],
    "timestamp": "YYYY-MM-DD HH:MM:SS"
  }]
}
```

## Error Handling

- Directory access failures
- File permission issues
- Network transmission errors
- Pattern matching problems

## Security Features

- Secure transmission
- Memory cleanup
- History clearance
- Variable sanitization

## Additional Notes

- Supports multiple key formats
- Handles encrypted keys
- Built-in rate limiting
- Resource-aware operation
## 🛡️ Defense

**Detection**
- File enumeration in home directories (`~/.ssh/`, `C:\Users\*\.ssh\`)
- Reads of private key files (`id_rsa`, `id_dsa`, `id_ecdsa`)
- A non-SSH-client process accessing SSH key files
- Command patterns searching for keys (`find`, `grep`, `dir`)

**Mitigation**
- Protect private keys with strong passphrases (never passwordless)
- Store keys in hardware (YubiKey, TPM) via FIDO2 / OpenSSH 8.2+
- Restrict permissions on `~/.ssh/` (`chmod 700`)
- Monitor private-key reads from non-SSH processes
- Use a centralized SSH certificate authority instead of static keys
- Run `ssh-agent` with time-based or confirmation constraints

**Weakness** — SSH private keys often lack passphrases, carry loose permissions, and sit in predictable locations.
