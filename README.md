# MBoxFitness

A React Native fitness app built with Expo for booking fitness classes and training sessions.

## Dependencies

**Backend Required**: This app requires the [MBoxFitness-Backend](https://github.com/jessezahrt/MBoxFitness-Backend) service to function properly.

## Features

- Browse and book fitness classes
- User authentication and profiles
- Class scheduling and booking
- Payment integration
- Push notifications

## Tech Stack

- React Native with Expo
- React Navigation v6
- Formik + Yup validation
- AsyncStorage & Expo SecureStore
- Expo Notifications

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

## Project Structure

```
app/
├── api/           # API endpoints
├── auth/          # Authentication
├── components/    # UI components
├── navigation/    # App navigation
├── screens/       # App screens
└── hooks/         # Custom hooks
```

## Requirements

- Node.js 14+
- Expo CLI
- iOS Simulator or Android Emulator

## EAS Build and Publish
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build --platform ios 

# Submit to App Store
eas submit --platform ios
```