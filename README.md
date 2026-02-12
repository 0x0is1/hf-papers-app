# HF Papers - a React Native App

A React Native application for browsing AI research papers from HuggingFace's Daily Papers collection. Built with Expo and TypeScript.

![HF Papers App](https://img.shields.io/badge/Expo-52.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.76.5-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg) [![Android APK Build](https://github.com/0x0is1/hf-papers-app/actions/workflows/android-build.yml/badge.svg)](https://github.com/0x0is1/hf-papers-app/actions/workflows/android-build.yml) [![Android OTA Update](https://github.com/0x0is1/hf-papers-app/actions/workflows/android-update.yml/badge.svg)](https://github.com/0x0is1/hf-papers-app/actions/workflows/android-update.yml)
## Features

### Core Features
- **Daily Papers Feed**: Browse curated AI research papers from HuggingFace
- **Trending Papers**: Discover the most upvoted papers
- **Advanced Search**: Find papers by keyword, author, or topic
- **Paper Details**: View comprehensive information including:
  - Full abstract
  - Author information with avatars
  - Publication date
  - Upvotes and comments count
  - arXiv integration
  - PDF viewer
  - GitHub code links
  - Media resources

### Design Features
- **Modern UI**: Dark theme with gradient accents
- **Smooth Animations**: Professional transitions and interactions
- **Responsive Layout**: Works on all screen sizes
- **Custom Components**: Reusable, aesthetic components
- **Tab Navigation**: Easy switching between sections
- **Pull to Refresh**: Update content with a swipe
- **Infinite Scroll**: Load more papers seamlessly

### Technical Features
- **TypeScript**: Full type safety
- **Expo Router**: File-based routing
- **API Integration**: HuggingFace Papers API
- **Error Handling**: Graceful error states
- **Loading States**: Beautiful loading indicators
- **Share Functionality**: Share papers with others
- **External Links**: Open papers in browser or PDF viewer

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (will be installed automatically)
- **Expo Go** app on your mobile device (for testing)

## Installation

### 1. Clone or Download the Project

```bash
# Navigate to the project directory
cd PapersApp
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm start
```

or

```bash
npx expo start
```

### 4. Run on Your Device

#### Option A: Use Expo Go (Recommended for Testing)
1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in your terminal with:
   - iOS: Camera app
   - Android: Expo Go app

#### Option B: Run on Emulator/Simulator
```bash
# For iOS (macOS only)
npm run ios

# For Android
npm run android
```

#### Option C: Run on Web
```bash
npm run web
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is an unofficial app for browsing HuggingFace Papers and is not affiliated with HuggingFace.

## 🔗 Links

- [HuggingFace Papers](https://huggingface.co/papers)
- [HuggingFace Unofficial API Documentation](https://github.com/0x0is1/hf-papers-api-docs/)

## Acknowledgments

- **HuggingFace** for providing the Papers API
- **arXiv** for hosting research papers
- **Expo** for the amazing development platform
- **React Native** community for the awesome ecosystem

## Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review HuggingFace API documentation
3. Open an issue on GitHub
