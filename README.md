# Payload Repository 💻

This project is an Internal Assignment on computer science.

## Description
The Payload Repository is a web application designed to provide various scripts for system penetration testing and security assessments. These scripts enable users to perform actions such as setting up backdoors, grabbing IP information, and stealing passwords. Built with Next.js and TailwindCSS, this application is an essential tool for security professionals and enthusiasts.

## Features
- **WinRM Backdoor**: Sets up a backdoor on Windows by reporting the device's IP to a Discord webhook, creating a hidden admin user, enabling WinRM, modifying firewall rules, and disabling UAC remote restrictions.
- **IP Grabber**: Reports the IP address, hostname, and username of a Windows system to a Discord webhook using PowerShell commands.
- **Password Stealer**: Gains unauthorized remote access to a Windows system by disabling security measures, extracting data, and uploading it to a Discord webhook.
- **Telegram Data Stealer**: Steals Telegram user data from macOS and Windows systems, including App Store and Tdata versions.

## Installation

To get a local copy up and running follow these simple steps.

### Prerequisites
- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/YourUsername/payload-repository.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage

To use the Payload Repository, follow these steps:

1. **Start the application**:
    ```sh
    npm run dev
    ```
    This will run the application in development mode.

2. **Open your browser**:
    Navigate to `http://localhost:3000` to view the app.

3. **Browse Payloads**:
    Explore the available payloads by viewing their descriptions and download counts.

4. **Download Payloads**:
    Click on the desired payload to download the script and use it for your security assessments.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Luka - [@lukres](https://t.me/lukres) - [me@lukres.dev](mailto:me@lukres.dev)

Project Link: [https://github.com/LuKresXD/phishing-website-detector)
