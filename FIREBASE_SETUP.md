# Firebase Cloud Messaging Setup Guide

This guide will help you set up Firebase Cloud Messaging (FCM) for push notifications in your Solcial app.

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `solcial` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Add Android App

1. In your Firebase project, click the Android icon
2. Enter package name: `com.arome.dev.solcial`
3. Enter app nickname: `Solcial Android`
4. Leave SHA-1 empty for now (add later for production)
5. Click "Register app"
6. Download `google-services.json`
7. Place it in the root of your `solcial/` folder
8. Click "Next" and "Continue to console"

## Step 3: Add iOS App

1. In your Firebase project, click the iOS icon
2. Enter bundle ID: `com.arome.dev.solcial`
3. Enter app nickname: `Solcial iOS`
4. Leave App Store ID empty
5. Click "Register app"
6. Download `GoogleService-Info.plist`
7. Place it in the root of your `solcial/` folder
8. Click "Next" and "Continue to console"

## Step 4: Enable Cloud Messaging

1. In Firebase Console, go to "Project settings" (gear icon)
2. Go to "Cloud Messaging" tab
3. Under "Cloud Messaging API (Legacy)", note your "Server key"
4. Copy this server key - you'll need it for the backend

## Step 5: Update Backend Environment Variables

Add to your `solcial-backend/.env`:

```env
# Firebase Cloud Messaging
FIREBASE_SERVER_KEY=your_server_key_here
```

## Step 6: Build Your App

### For Development Testing:
```bash
cd solcial
eas build --profile development --platform android
```

### For Production:
```bash
cd solcial
eas build --profile production --platform android
eas build --profile production --platform ios
```

## Step 7: Test Push Notifications

1. Install the built app on your device
2. Sign in to your account
3. The app will automatically register for push notifications
4. Check backend logs to see the FCM token being registered
5. Test by triggering a notification (like, comment, follow, etc.)

## Troubleshooting

### Notifications not working?

1. **Check Firebase config files exist:**
   - `solcial/google-services.json` (Android)
   - `solcial/GoogleService-Info.plist` (iOS)

2. **Verify package names match:**
   - Firebase console: `com.arome.dev.solcial`
   - app.json: `com.arome.dev.solcial`

3. **Check backend has Firebase server key:**
   - Environment variable `FIREBASE_SERVER_KEY` is set

4. **Rebuild the app:**
   - Config changes require a new build
   - Run `eas build` again

5. **Check device permissions:**
   - Go to device Settings > Apps > Solcial > Notifications
   - Ensure notifications are enabled

### Development builds

Push notifications require a production or development build with EAS. They won't work in:
- Expo Go
- Local development server (`npx expo start`)

## Security Notes

- Never commit `google-services.json` or `GoogleService-Info.plist` to git
- These files are already in `.gitignore`
- Keep your Firebase server key secure
- Use environment variables for sensitive keys

## Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Expo Push Notifications Guide](https://docs.expo.dev/push-notifications/overview/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
