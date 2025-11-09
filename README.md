# Currency App

A modern React Native app for managing and viewing cryptocurrency and fiat currency info. Built with Expo, TypeScript, Jotai, and a Dockerized Express backend.

## 🎥 Demo

Check out our app in action:

![Currency App Demo](CurrencyAppDemo.gif)

## Features

- **Multi-Currency Support**: View cryptocurrencies and fiat currencies
- **Advanced Search**: Case-sensitive, supports name/symbol matching
- **Persistent Storage**: Data cached locally using AsyncStorage
- **Internationalization**: English, Spanish, French supported
- **Type Safety**: TypeScript enums for all hardcoded values
- **Modern UI**: Monochrome theme, SafeAreaView, responsive design
- **Dockerized Backend**: Express API for currency data

## 📋 Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **Docker** & **Docker Compose** (for backend API)
- **Expo CLI** (for development)
- **Expo Go** app (for running on device)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sukhchainss/crypto-currency-demo-wallet.git
cd CurrencyApp
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

API Endpoints:
- `GET /api/currencies/crypto` — List cryptocurrencies
- `GET /api/currencies/fiat` — List fiat currencies
- `GET /api/currencies/all` — All currencies
- `GET /health` — Health check

Verify API:
```bash
curl http://localhost:3000/health
```

### 4. Start the Expo Development Server

```bash
npx expo start
```

- **iOS Simulator:** Press `i` in terminal
- **Android Emulator:** Press `a` in terminal
- **Physical Device:** Open Expo Go, scan QR code

## 📁 Project Structure

```
CurrencyApp/
├── App.tsx                  # Root application component
├── app.json                 # Expo app config
├── assets/                  # Images, icons, etc.
├── backend/
│   ├── server.js            # Express API server
│   ├── Dockerfile           # Docker config
│   └── package.json         # Backend dependencies
├── docker-compose.yml       # Docker Compose config
├── index.ts                 # Entry point
├── package.json             # Main dependencies
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript config
├── src/
│   ├── components/
│   │   ├── CurrencyActions.tsx      # Main control screen
│   │   ├── CurrencyListFragment.tsx # Currency list display
│   │   ├── common/
│   │   │   ├── Button.tsx           # Reusable button component
│   │   │   └── index.ts             # Common exports
│   │   └── icons/
│   │       ├── Icons.tsx            # SVG icon components
│   │       └── index.ts             # Icon exports
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

## 🧪 Testing

Manual Testing Checklist:
- [ ] Insert Data button fetches currencies
- [ ] Crypto button displays cryptocurrencies
- [ ] Fiat button displays fiat currencies
- [ ] All button displays combined list
- [ ] Search filters results correctly
- [ ] Clear button removes cached data
- [ ] Data persists after app restart
- [ ] Language switching works

## 📦 Dependencies

### Main Dependencies
- `react-native`: 0.81.5
- `expo`: ~54.0.23
- `typescript`: ~5.9.2
- `jotai`: ^2.15.1
- `@react-native-async-storage/async-storage`: ^2.2.0
- `react-native-svg`: ^15.12.1

### Backend Dependencies
- `express`: ^4.18.2
- `cors`: ^2.8.5

## 🐳 Docker Compose Usage

To run the backend API using Docker Compose:

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

### Troubleshooting
- If port 3000 is busy, use:
  ```bash
  lsof -ti:3000
  kill -9 <PID>
  docker-compose up -d
  ```
- Check container status:
  ```bash
  docker ps
  docker-compose logs currency-api-mock
  ```

## 🤝 Contributing

- Follow code style
- Use TypeScript enums for hardcoded values
- Add translations for new text
- Update README for new features

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Built with React Native and Expo
- State management by Jotai
- Icons created with react-native-svg

---

**Need help?** Check the troubleshooting section or review the inline code documentation.
