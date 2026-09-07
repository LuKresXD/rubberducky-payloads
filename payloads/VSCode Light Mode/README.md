# VSCode Light Mode

<p align="center">
  <br>
  <strong>VSCode Theme Switcher Prank</strong>
</p>

![Category](https://img.shields.io/badge/Category-Prank-green)
![Target](https://img.shields.io/badge/Target-macOS-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## Description

A harmless prank tool that switches VSCode to light theme - perfect for trolling fellow developers who prefer dark mode.

## Features

- 🔄 Automated theme switching
- ⚡ Quick execution
- 🎯 Targets VSCode settings
- 🔍 Preserves other settings
- 😈 Maximum trolling effect

## Requirements

- Target System:
    - macOS Monterey 12.0+
    - Visual Studio Code installed
    - Previous VSCode usage
- Tested On:
    - macOS Monterey 12.0+
    - macOS Ventura 13.0+
    - macOS Sonoma 14.0+

## Usage

1. Deploy on target system
2. Automatic process:
    - Opens VSCode settings
    - Navigates to theme settings
    - Switches to light theme
    - Saves changes

## Notes

- Harmless prank - only changes theme
- Easily reversible
- No permanent changes

## 🛡️ Defense

This payload is a benign prank that switches Visual Studio Code to its light theme. It poses no security threat: no data exfiltration, persistence, or system change, only a cosmetic user preference.

**Detection** — a change to `settings.json` (`workbench.colorTheme`).

**Mitigation** — none needed. Revert with Ctrl+Shift+P → "Preferences: Color Theme".

**Weakness** — VS Code settings live in a plain JSON file any process with write access to the user profile can modify.
