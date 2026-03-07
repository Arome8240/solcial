# Solcial - Social Payment App

A React Native social payment application built with Expo, featuring Solana blockchain integration for peer-to-peer payments.

## Live Backend

The app is connected to a live backend API:
- **API URL**: https://solcial-backend.onrender.com/api
- **Status**: Check at https://solcial-backend.onrender.com/api/health
- **Network**: Solana Devnet

See [API_TESTING.md](./API_TESTING.md) for detailed testing instructions.

## Features

- 🔐 Email-based authentication with verification codes
- 💰 Custodial Solana wallet (auto-created on signup)
- 💸 Send and receive SOL payments
- 📱 QR code scanning for payments
- 💬 Chat with payment integration
- 👤 User profiles and settings
- 📊 Social feed
- 🎨 Beautiful UI with NativeWind (Tailwind CSS)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm start
```

3. Open the app:
- **iOS**: press `i` to launch in the iOS simulator _(Mac only)_
- **Android**: press `a` to launch in the Android emulator
- **Web**: press `w` to run in a browser

You can also scan the QR code using the [Expo Go](https://expo.dev/go) app on your device.

### Testing the App

1. **Sign Up**: Create a new account with email and password
2. **Verify Email**: Check backend logs for the 6-digit verification code
3. **Sign In**: Use your credentials to access the app
4. **Explore**: Your wallet is automatically created with 2 SOL on devnet!

## Adding components

You can add more reusable components using the CLI:

```bash
npx react-native-reusables/cli@latest add [...components]
```

> e.g. `npx react-native-reusables/cli@latest add input textarea`

If you don't specify any component names, you'll be prompted to select which components to add interactively. Use the `--all` flag to install all available components at once.

## Project Features

- ⚛️ Built with [Expo Router](https://expo.dev/router)
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/) via [Nativewind](https://www.nativewind.dev/)
- 📦 UI powered by [React Native Reusables](https://github.com/founded-labs/react-native-reusables)
- 🚀 New Architecture enabled
- 🔥 Edge to Edge enabled
- 📱 Runs on iOS, Android, and Web

## Learn More

To dive deeper into the technologies used:

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Nativewind Docs](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com)

## Deploy with EAS

The easiest way to deploy your app is with [Expo Application Services (EAS)](https://expo.dev/eas).

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Updates](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

---

If you enjoy using React Native Reusables, please consider giving it a ⭐ on [GitHub](https://github.com/founded-labs/react-native-reusables). Your support means a lot!
