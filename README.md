# HF Papers - React Native App

A beautiful, professional React Native application for browsing AI research papers from HuggingFace's Daily Papers collection. Built with Expo and TypeScript.

![HF Papers App](https://img.shields.io/badge/Expo-52.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.76.5-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)

## ✨ Features

### 📱 Core Features
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

### 🎨 Design Features
- **Modern UI**: Dark theme with gradient accents
- **Smooth Animations**: Professional transitions and interactions
- **Responsive Layout**: Works on all screen sizes
- **Custom Components**: Reusable, aesthetic components
- **Tab Navigation**: Easy switching between sections
- **Pull to Refresh**: Update content with a swipe
- **Infinite Scroll**: Load more papers seamlessly

### 🔧 Technical Features
- **TypeScript**: Full type safety
- **Expo Router**: File-based routing
- **API Integration**: HuggingFace Papers API
- **Error Handling**: Graceful error states
- **Loading States**: Beautiful loading indicators
- **Share Functionality**: Share papers with others
- **External Links**: Open papers in browser or PDF viewer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (will be installed automatically)
- **Expo Go** app on your mobile device (for testing)

## 🚀 Installation

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

## 📁 Project Structure

```
PapersApp/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation configuration
│   │   ├── index.tsx             # Home screen (Daily Papers)
│   │   ├── trending.tsx          # Trending papers screen
│   │   ├── search.tsx            # Search screen
│   │   └── profile.tsx           # Settings/Profile screen
│   ├── _layout.tsx               # Root layout
│   └── paper-details.tsx         # Paper details screen
├── components/
│   ├── PaperCard.tsx             # Paper card component
│   ├── LoadingSpinner.tsx        # Loading indicator
│   ├── ErrorMessage.tsx          # Error display component
│   └── SearchBar.tsx             # Search input component
├── constants/
│   └── theme.ts                  # Theme configuration (colors, sizes, etc.)
├── services/
│   └── papersApi.ts              # API service for HuggingFace Papers
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── babel.config.js               # Babel configuration
└── metro.config.js               # Metro bundler configuration
```

## 🎨 Customization

### Colors
Edit `constants/theme.ts` to customize the color scheme:

```typescript
export const COLORS = {
  primary: '#FF6B35',        // Primary accent color
  background: '#0F0F23',     // Main background
  card: '#1E1E3F',          // Card background
  text: '#FFFFFF',          // Primary text
  // ... more colors
};
```

### Sizes
Adjust spacing and sizes in `constants/theme.ts`:

```typescript
export const SIZES = {
  md: 16,    // Medium spacing
  lg: 24,    // Large spacing
  // ... more sizes
};
```

## 🔌 API Integration

The app uses the **HuggingFace Papers API** with the following endpoints:

### Available Endpoints

1. **Daily Papers**
   ```
   GET https://huggingface.co/api/daily_papers
   Parameters: date, page, limit
   ```

2. **Search Papers**
   ```
   GET https://huggingface.co/api/papers/search
   Parameters: q (query)
   ```

3. **Paper Details**
   ```
   GET https://huggingface.co/api/papers/{arxivId}
   ```

### API Service (`services/papersApi.ts`)

The API service provides the following methods:

```typescript
// Get daily papers with pagination
getDailyPapers(date?, page, limit)

// Search papers by keyword
searchPapers(query)

// Get paper details by arXiv ID
getPaperDetails(arxivId)

// Get trending papers (sorted by upvotes)
getTrendingPapers(limit)

// Get recent papers (sorted by date)
getRecentPapers(limit)
```

## 🧩 Key Components

### PaperCard
A reusable card component that displays paper information:
- Thumbnail image
- Title and summary
- Authors
- Upvotes and comments
- Publication date
- Tags

### SearchBar
An elegant search input with:
- Real-time search
- Clear button
- Keyboard handling

### LoadingSpinner
A consistent loading indicator used throughout the app.

### ErrorMessage
A friendly error display with retry functionality.

## 📱 Screens

### 1. Home (Daily Papers)
- Displays curated papers from HuggingFace
- Pull to refresh
- Infinite scroll pagination
- Filter button (UI placeholder)

### 2. Trending
- Shows most upvoted papers
- Ranking badges
- Pull to refresh
- Sorted by upvotes

### 3. Search
- Keyword-based search
- Suggested searches
- Real-time results
- Search history (UI placeholder)

### 4. Profile/Settings
- App information
- Statistics
- Preferences (notifications, dark mode)
- Links to resources
- Support section

### 5. Paper Details
- Full paper information
- In-app PDF viewer
- Share functionality
- External links (arXiv, GitHub)
- Author profiles
- Media resources

## 🎯 Features in Detail

### Navigation
- **Tab Navigation**: Bottom tabs for main sections
- **Stack Navigation**: For paper details
- **Deep Linking**: Support for paper URLs

### Data Management
- **API Integration**: RESTful API calls
- **Error Handling**: Graceful error states
- **Loading States**: Skeleton screens and spinners
- **Caching**: Automatic response caching

### User Experience
- **Pull to Refresh**: Update content easily
- **Infinite Scroll**: Load more content automatically
- **Search Suggestions**: Quick access to common searches
- **Share Papers**: Share via native share sheet
- **PDF Viewing**: In-app PDF viewer with external option

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Clear cache and restart
npx expo start -c
```

### Building for Production

#### iOS
```bash
# Build for App Store
npx eas build --platform ios

# Create development build
npx eas build --profile development --platform ios
```

#### Android
```bash
# Build for Play Store
npx eas build --platform android

# Create APK for testing
npx eas build --profile preview --platform android
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler errors**
   ```bash
   npx expo start -c
   ```

2. **Module not found errors**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS simulator issues**
   ```bash
   npx pod-install
   ```

4. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

## 📝 API Response Examples

### Daily Papers Response
```json
{
  "papers": [
    {
      "_id": "...",
      "arxivId": "2401.12345",
      "title": "Example Paper Title",
      "summary": "Paper abstract...",
      "upvotes": 42,
      "numComments": 5,
      "publishedAt": "2024-01-15T00:00:00.000Z",
      "authors": [...],
      "thumbnail": "https://...",
      "githubUrl": "https://github.com/..."
    }
  ],
  "numTotalItems": 100
}
```

### Paper Details Response
```json
{
  "_id": "...",
  "arxivId": "2401.12345",
  "title": "Example Paper Title",
  "summary": "Full abstract...",
  "upvotes": 42,
  "numComments": 5,
  "publishedAt": "2024-01-15T00:00:00.000Z",
  "authors": [...],
  "mediaUrls": [...],
  "submittedBy": {...}
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is an unofficial app for browsing HuggingFace Papers and is not affiliated with HuggingFace.

## 🔗 Links

- [HuggingFace Papers](https://huggingface.co/papers)
- [HuggingFace API Documentation](https://huggingface.co/docs/hub/en/api)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)

## 🙏 Acknowledgments

- **HuggingFace** for providing the Papers API
- **arXiv** for hosting research papers
- **Expo** for the amazing development platform
- **React Native** community for the awesome ecosystem

## 📧 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review HuggingFace API documentation
3. Open an issue on GitHub

---

**Made with ❤️ using HuggingFace Papers API**
