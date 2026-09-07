# Windows Key Grabber

<p align="center">
  <br>
  <strong>Windows Product Key Extraction Tool</strong>
</p>

![Category](https://img.shields.io/badge/Category-Exfiltration-red)
![Target](https://img.shields.io/badge/Target-Windows-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Ensure you have explicit permission to use it on any system. Unauthorized key extraction is illegal and violates licensing agreements.

## Description

The Windows Key Grabber is a specialized tool designed to extract and securely report Windows product keys using multiple methods. It features Discord webhook integration and implements various extraction techniques for maximum reliability.

## Features

- 🔑 Multiple Key Extraction Methods
- 🌐 Discord Webhook Integration
- 💾 Registry Analysis
- 🔍 WMI Query Support
- 🧹 Self-cleaning Capability
- ⚡ Efficient Execution
- 🛡️ Error Handling
- 📊 System Information Collection

## Technical Details

### Extraction Methods
1. WMI SoftwareLicensingService
2. Registry Backup Key
3. OA3xOriginalProductKey Query
4. BIOS/UEFI Embedded Key Check

### Data Collection
- Product Key
- System Information
- Windows Version
- Installation Details

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

1. Discord Webhook Setup:
```powershell
# Replace webhook URL
!!!PASTE_WEBHOOK_HERE!!!
```

## Usage

1. Deploy on target system
2. Automatic execution sequence:
    - Key extraction attempt
    - System information gathering
    - Data formatting
    - Webhook transmission
    - Trace cleanup

## Response Format

```json
{
  "content": "🔑 **Windows Key Found!**\n",
  "embeds": [{
    "title": "Product Key Information",
    "fields": [
      {
        "name": "Product Key",
        "value": "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
      },
      {
        "name": "System Info",
        "value": "Windows Version, Computer Name, etc."
      }
    ],
    "timestamp": "YYYY-MM-DD HH:MM:SS"
  }]
}
```

## Error Handling

- Multiple extraction method fallbacks
- Registry access error management
- WMI query error handling
- Network transmission retry logic

## Security Features

- Secure data transmission
- Memory cleanup
- History clearance
- Variable sanitization

## Additional Capabilities

- OEM Key Detection
- Digital License Identification
- Volume License Recognition
- KMS Configuration Detection

## Notes

- Success rate varies by Windows version
- Some methods require elevated privileges
- Network connectivity required for reporting
- Supports both retail and OEM keys

## Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| E01 | WMI Access Denied | Retry with elevated privileges |
| E02 | Registry Access Error | Check permissions |
| E03 | Network Error | Verify connectivity |
| E04 | Key Not Found | Try alternate methods |

## Troubleshooting

1. Extraction Failures:
    - Verify administrative privileges
    - Check system compatibility
    - Ensure required services are running

2. Transmission Issues:
    - Validate webhook URL
    - Check network connectivity
    - Verify firewall settings

## Performance Optimization

- Parallel extraction methods
- Efficient registry queries
- Optimized WMI calls
- Minimal system impact

## Future Enhancements

- Additional extraction methods
- Enhanced error handling
- Extended system information
- Alternative transmission methods
## 🛡️ Defense

**Detection**
- WMI queries for product-key info (`Get-WmiObject -Class Win32_ComputerSystemProduct`)
- Registry reads from `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\DigitalProductId`
- Key-extraction commands (`wmic path softwarelicensingservice get OA3xOriginalProductKey`)
- Unusual access to licensing-related registry keys and WMI classes

**Mitigation**
- Use Volume Licensing (KMS/MAK) instead of embedded OEM keys
- Application allowlisting to block unauthorized WMI queries
- Monitor for key-extraction command patterns
- Restrict WMI namespace permissions for standard users
- Deploy with generic install keys and activate via organizational KMS
- Consider Subscription Activation or Azure AD-based licensing

**Weakness** — Windows product keys sit in the registry and WMI in a recoverable form accessible to user-level processes.
