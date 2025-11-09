# Currency App

A modern React Native application for managing and viewing cryptocurrency and fiat currency information. Built with Expo, TypeScript, and Jotai for state management.

## 🎥 Demo

Check out our app in action:

![Currency App Demo](CurrencyAppDemo.gif)

## � Features

- **Multi-Currency Support**: View cryptocurrencies and fiat currencies
- **Advanced Search**: Case-sensitive search with multiple matching criteria
  - Name starts with query
  - Name contains query with space prefix
  - Symbol starts with query
- **Persistent Storage**: Data cached locally using AsyncStorage
- **Internationalization**: Support for multiple languages (English, Spanish)
- **Type Safety**: Full TypeScript implementation with enums
- **Modern UI**: Monochrome theme with SafeAreaView for notch compatibility
- **Responsive Design**: Optimized for mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for backend API)
- **Expo CLI** (optional, for additional features)
- **Expo Go** app on your mobile device or iOS Simulator/Android Emulator

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd "/Users/sukhchain/projects/React Native/CurrencyApp"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Backend API

The app requires a mock API server running on port 3000. Start it using Docker Compose:

```bash
docker-compose up -d
```

This will start the currency API service in detached mode. The API provides the following endpoints:

- `GET /api/currencies/crypto` - Returns list of cryptocurrencies
- `GET /api/currencies/fiat` - Returns list of fiat currencies
- `GET /api/currencies/all` - Returns all currencies
- `GET /health` - Health check endpoint

To verify the API is running:

```bash
curl http://localhost:3000/health
```

### 4. Start the Expo Development Server

```bash
npx expo start
```

This will start the Metro bundler and display a QR code in your terminal.

### 5. Run the App

**On iOS Simulator:**
- Press `i` in the terminal

**On Android Emulator:**
- Press `a` in the terminal

**On Physical Device:**
- Open the **Expo Go** app
- Scan the QR code from the terminal

## 🏗️ Architecture

### State Management

The app uses **Jotai** for atomic state management with the following atoms:

- `currencyListAtom` - Currently displayed currency list
- `cryptoListAtom` - Cached cryptocurrency list
- `fiatListAtom` - Cached fiat currency list
- `currentListTypeAtom` - Active list type (crypto/fiat/all)
- `searchQueryAtom` - Search input value
- `isLoadingAtom` - Loading state
- `filteredCurrencyListAtom` - Derived atom with filtered results

### Data Persistence

**AsyncStorage** is used for local data persistence:
- Cryptocurrencies cached under `@CurrencyApp:cryptoList`
- Fiat currencies cached under `@CurrencyApp:fiatList`
- Data persists across app restarts

### Type Safety

The app uses TypeScript enums for better type safety:

```typescript
// Currency list types
enum ListType {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
  ALL = 'all',
}

// Supported languages
enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
}

// Button variants
enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  PURPLE = 'purple',
}
```

### Internationalization

Localization is managed through a centralized config:

```typescript
import i18n from './src/config/localization';
import { Language } from './src/types/enums';

// Get translations
const texts = i18n.t();

// Change language
i18n.setLanguage(Language.SPANISH);
```

## 📁 Project Structure

```
CurrencyApp/
├── App.tsx                          # Root application component
├── backend/
│   ├── server.js                    # Express API server
│   ├── Dockerfile                   # Docker configuration
│   └── package.json
├── docker-compose.yml               # Docker Compose configuration
├── src/
│   ├── components/
│   │   ├── CurrencyActions.tsx      # Main control screen
│   │   ├── CurrencyListFragment.tsx # Currency list display
│   │   ├── common/
│   │   │   └── Button.tsx           # Reusable button component
│   │   └── icons/
│   │       └── Icons.tsx            # SVG icon components
│   ├── config/
│   │   └── localization.ts          # i18n configuration
│   ├── services/
│   │   ├── api.ts                   # API service layer
│   │   └── storage.ts               # AsyncStorage wrapper
│   ├── store/
│   │   └── atoms.ts                 # Jotai state atoms
│   └── types/
│       ├── CurrencyInfo.ts          # Currency type definitions
│       └── enums.ts                 # Application enums
├── package.json
└── tsconfig.json
```

## 🎮 Usage

### Control Buttons

1. **Clear** - Clears all cached currency data
2. **Insert Data** - Fetches fresh data from the API
3. **Crypto** - Displays cryptocurrency list
4. **Fiat** - Displays fiat currency list
5. **All** - Displays all currencies

### Search Functionality

The search bar uses case-sensitive matching with three criteria:

1. **Name starts with**: `Bitcoin` matches "Bitcoin"
2. **Name contains with space**: `bit` matches "Bitcoin" if query is "Bit"
3. **Symbol starts with**: `BTC` matches Bitcoin's symbol

Search settings:
- No auto-capitalization
- No auto-correction
- No auto-focus

### Changing Language

To change the app language, modify the localization import:

```typescript
// In any component
import i18n from '../config/localization';
import { Language } from '../types/enums';

// Switch to Spanish
i18n.setLanguage(Language.SPANISH);
```

## 🛠️ Development

### Adding New Currencies

Modify `backend/server.js`:

```javascript
const cryptoCurrencies = [
  { id: 'new-coin', name: 'New Coin', symbol: 'NEW' },
  // ... existing currencies
];
```

### Adding New Translations

Update `src/config/localization.ts`:

```typescript
const en: Translations = {
  // Add new keys here
  newSection: {
    title: 'New Section',
  },
};

const es: Translations = {
  newSection: {
    title: 'Nueva Sección',
  },
};
```

### Creating New Button Variants

Add to `src/types/enums.ts`:

```typescript
export enum ButtonVariant {
  // ... existing variants
  CUSTOM = 'custom',
}
```

Then add styles in `src/components/common/Button.tsx`.

## 🐳 Docker Commands

### Start Backend

```bash
docker-compose up -d
```

### Stop Backend

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f currency-api-mock
```

### Rebuild Backend

```bash
docker-compose up -d --build
```

## 🔧 Troubleshooting

### API Server Not Running

**Error**: "Failed to fetch currency data. Make sure the API server is running on port 3000."

**Solution**:
```bash
# Check if container is running
docker ps

# If not running, start it
docker-compose up -d

# Check logs for errors
docker-compose logs currency-api-mock
```

### Port 3000 Already in Use

**Solution**:
```bash
# Find the process using port 3000
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Restart Docker container
docker-compose up -d
```

### Expo Go Connection Issues

**Solution**:
- Ensure your device and computer are on the same WiFi network
- Try restarting the Expo development server
- Clear Expo cache: `npx expo start -c`

### TypeScript Errors

**Solution**:
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Reinstall dependencies
npm install

# Restart Metro bundler
npx expo start -c
```

### AsyncStorage Data Issues

Clear cached data:
```bash
# In Expo Go, shake device and select "Clear AsyncStorage"
# Or use the Clear button in the app
```

## 📱 Supported Platforms

- ✅ iOS (Expo Go)
- ✅ Android (Expo Go)
- ⚠️ iOS Simulator
- ⚠️ Android Emulator

**Note**: The app uses Expo Go for development. For production, you'll need to build standalone apps.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Insert Data button fetches currencies successfully
- [ ] Crypto button displays only cryptocurrencies
- [ ] Fiat button displays only fiat currencies
- [ ] All button displays combined list
- [ ] Search filters results correctly
- [ ] Clear button removes cached data
- [ ] Data persists after app restart
- [ ] Language switching works (if implemented)

## 📦 Dependencies

### Main Dependencies

- `react-native`: 0.81.5
- `expo`: ~54.0.0
- `typescript`: ^5.8.3
- `jotai`: ^2.15.1
- `@react-native-async-storage/async-storage`: ^2.1.0
- `react-native-svg`: ^15.8.0

### Backend Dependencies

- `express`: ^4.18.2
- `cors`: ^2.8.5

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript enums for hardcoded values
3. Add translations for new text content
4. Update README for new features

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Built with React Native and Expo
- State management by Jotai
- Icons created with react-native-svg

---

**Need help?** Check the troubleshooting section or review the inline code documentation.
