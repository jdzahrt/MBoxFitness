# MBoxFitness

A React Native fitness marketplace app built with Expo for buying and selling fitness equipment.

## Features

- Browse fitness equipment listings
- User authentication and profiles
- Direct messaging with sellers
- Image upload for listings
- Push notifications
- Offline support

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
eas build --platform ios 

eas submit --platform ios
```