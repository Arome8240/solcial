# Firebase Cloud Messaging - Complete Setup Summary

Firebase Cloud Messaging has been configured for your Solcial app. Follow these steps to complete the setup.

## ✅ What's Already Done

### Frontend (solcial/)
- ✅ Updated `app.json` with Firebase config paths
- ✅ Created `lib/firebase.ts` with FCM token management
- ✅ Updated `hooks/useNotifications.ts` to use Firebase
- ✅ Added Firebase config to `.gitignore`
- ✅ Created example config files

### Backend (solcial-backend/)
- ✅ Installed `firebase-admin` package
- ✅ Created `FirebaseService` for sending push notifications
- ✅ Created `FirebaseModule` and added to app
- ✅ Ready to send FCM notifications

## 📋 What You Need to Do

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "Solcial" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Add Android App to Firebase

1. Click the Android icon in Firebase Console
2. Package name: `com.arome.dev.solcial`
3. App nickname: `Solcial Android`
4. Click "Register app"
5. **Download `google-services.json`**
6. **Place it in `solcial/` folder** (root, next to app.json)
7. Click "Next" → "Continue to console"

### 3. Add iOS App to Firebase

1. Click the iOS icon in Firebase Console
2. Bundle ID: `com.arome.dev.solcial`
3. App nickname: `Solcial iOS`
4. Click "Register app"
5. **Download `GoogleService-Info.plist`**
6. **Place it in `solcial/` folder** (root, next to app.json)
7. Click "Next" → "Continue to console"

### 4. Get Firebase Server Key

1. In Firebase Console, click gear icon → "Project settings"
2. Go to "Cloud Messaging" tab
3. Under "Cloud Messaging API (Legacy)", find "Server key"
4. **Copy this key**

### 5. Update Backend Environment

Add to `solcial-backend/.env`:

```env
# Firebase Cloud Messaging
FIREBASE_SERVER_KEY=your_server_key_from_step_4
```

### 6. Build Your App

Push notifications require a production or development build:

```bash
cd solcial

# For development testing
eas build --profile development --platform android

# For production
eas build --profile production --platform android
eas build --profile production --platform ios
```

### 7. Test Notifications

1. Install the built app on your device
2. Sign in
3. App will automatically register for notifications
4. Test by:
   - Getting a like on your post
   - Receiving a comment
   - Getting a follow
   - Receiving a chat message

## 📁 File Structure

```
solcial/
├── google-services.json          # ← Add this (Android)
├── GoogleService-Info.plist      # ← Add this (iOS)
├── google-services.json.example  # ← Template
├── GoogleService-Info.plist.example # ← Template
├── FIREBASE_SETUP.md            # ← Detailed guide
├── app.json                     # ← Already configured
└── lib/
    └── firebase.ts              # ← FCM helper

solcial-backend/
├── .env                         # ← Add FIREBASE_SERVER_KEY
└── src/modules/firebase/
    ├── firebase.service.ts      # ← Send notifications
    └── firebase.module.ts       # ← Module
```

## 🔒 Security Checklist

- [ ] `google-services.json` is in `.gitignore`
- [ ] `GoogleService-Info.plist` is in `.gitignore`
- [ ] `FIREBASE_SERVER_KEY` is in `.env` (not committed)
- [ ] Firebase config files are NOT in git

## 🐛 Troubleshooting

### "Push notifications not available in development build"
- This is normal for local dev (`npx expo start`)
- Build with EAS to enable notifications

### "FIREBASE_SERVER_KEY not found"
- Add it to `solcial-backend/.env`
- Restart backend server

### Notifications not received
1. Check Firebase config files exist in `solcial/`
2. Verify package names match everywhere
3. Rebuild app after adding config files
4. Check device notification permissions
5. Check backend logs for errors

### Invalid token errors
- Token expires when app is uninstalled
- Token changes when app is reinstalled
- Backend automatically handles invalid tokens

## 📚 Additional Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

## 🎯 Next Steps

1. Complete steps 1-5 above
2. Build your app with EAS
3. Test notifications
4. Deploy backend to Render with new env var
5. Enjoy working push notifications! 🎉
