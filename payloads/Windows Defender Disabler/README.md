# Windows Defender Disabler

<p align="center">
  <br>
  <strong>Advanced Windows Security Configuration Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Security-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)
![Language Support](https://img.shields.io/badge/Language-Multi--Language-yellow)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Disabling security features without authorization is illegal and can expose systems to serious risks.

## Description

The Windows Defender Disabler is an advanced security configuration tool designed for penetration testing and security assessment scenarios. It provides automated methods to modify Windows Defender settings with multi-language support and stealth capabilities.

## Features

- 🛡️ Tamper Protection Bypass
- 🚫 Real-time Protection Disabling
- 🔧 Registry-level Modifications
- 🌐 Multi-language Support
- 🔄 Restore Functionality
- 🕵️ Stealth Implementation
- ⚡ Quick Execution
- 📝 Error Logging

## Technical Details

### Security Modifications
- Tamper Protection Management
- Real-time Monitoring Control
- Registry Modifications:
    - DisableAntiSpyware
    - DisableRealtimeMonitoring
    - DisableIntrusionPreventionSystem
    - DisableIOAVProtection

### Implementation Methods
- GUI Automation
- PowerShell Commands
- Registry Modifications
- Service Management

### Language Support
- English Configuration
- German Configuration
- Additional language templates available

## Requirements

### System Requirements
- Windows 10/11 Professional or Enterprise
- Administrative privileges
- PowerShell 5.1 or higher
- GUI access

### Tested Environments
- Windows 10 Pro Version 22H2 (PowerShell 5.1)
- Windows 11 Pro Version 23H2 (PowerShell 5.1)

## Configuration

1. Language Settings (Optional):
```powershell
# Default English
DEFINE WIN_SEC_EN "Windows Security"
# German
DEFINE WIN_SEC_DE "Windows-Sicherheit"
```

2. Registry Paths:
```powershell
HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender
HKLM:\SOFTWARE\Microsoft\Windows Defender
```

## Usage

1. Execute with administrative privileges:
    - Automatic GUI navigation
    - Security feature modification
    - Registry updates
    - Service reconfiguration

2. Verification Steps:
    - Check Windows Security Center
    - Verify registry modifications
    - Confirm service status

## Restoration

To restore Windows Defender:
```powershell
# Uncomment and use restore commands
# CMD_RESTORE_RTP
# CMD_RESTORE_DEFENDER
```

## Error Handling

- Administrative privilege verification
- GUI navigation fallbacks
- Registry access error management
- Service modification error handling

## Security Features

- Tamper Protection Management
- UAC Interaction Handling
- Registry Backup Options
- Service State Validation

## Notes

- System restore point creation recommended
- Regular security assessment required
- Documentation of changes advised
- Consider system stability impact