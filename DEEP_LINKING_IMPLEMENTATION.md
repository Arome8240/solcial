# Deep Linking Implementation

## Overview

Implemented deep linking support for push notifications, allowing users to tap notifications and be taken directly to the relevant screen in the app. Supports both custom URL scheme (`solcial://`) and universal links (`https://solcial.app`).

## Features

### 1. Push Notification Deep Links

When users tap push notifications, they're automatically navigated to:
- **Payment notifications** → Transaction details page
- **Post notifications** (likes, comments) → Post details page
- **Follow notifications** → User profile page
- **Chat notifications** → Chat conversation page

### 2. URL Scheme Support

**Custom Scheme**: `solcial://`

Supported deep link formats:
```
solcial://transaction/[signature]
solcial://post/[postId]
solcial://profile/[username]
solcial://chat/[chatId]
solcial://notifications
```

### 3. Universal Links (Optional)

**Domain**: `https://solcial.app`

Same paths work with HTTPS:
```
https://solcial.app/transaction/[signature]
https://solcial.app/post/[postId]
https://solcial.app/profile/[username]
https://solcial.app/chat/[chatId]
https://solcial.app/notifications
```

## Implementation Details

### Frontend Changes

#### 1. Root Layout (`app/_layout.tsx`)

Added deep linking handlers:

**Notification Listener**:
- Listens for notification taps
- Extracts data from notification payload
- Routes to appropriate screen

**URL Listener**:
- Handles deep link URLs when app opens
- Parses URL and extracts parameters
- Routes to appropriate screen

**Key Functions**:
```typescript
handleNotificationNavigation(data) // Routes based on notification data
handleDeepLink(url)                 // Parses and routes deep link URLs
```

#### 2. App Configuration (`app.json`)

**iOS Configuration**:
```json
{
  "bundleIdentifier": "com.arome.dev.solcial",
  "associatedDomains": ["applinks:solcial.app"]
}
```

**Android Configuration**:
```json
{
  "intentFilters": [
    {
      "action": "VIEW",
      "autoVerify": true,
      "data": [
        { "scheme": "https", "host": "solcial.app" },
        { "scheme": "solcial" }
      ],
      "category": ["BROWSABLE", "DEFAULT"]
    }
  ]
}
```

### Backend Changes

#### Blockchain Monitor Service

Updated push notifications to include deep link URLs:

```typescript
{
  to: pushToken,
  title: 'Payment Received',
  body: 'You received 0.5000 SOL',
  data: {
    signature: 'abc123...',
    amount: 0.5,
    url: 'solcial://transaction/abc123...'
  }
}
```

## Deep Link URL Structure

### Transaction Details
```
solcial://transaction/[signature]
```
**Example**: `solcial://transaction/5j7s8k9...`

**Data Required**:
- `signature`: Solana transaction signature

### Post Details
```
solcial://post/[postId]
```
**Example**: `solcial://post/507f1f77bcf86cd799439011`

**Data Required**:
- `postId`: MongoDB ObjectId of the post

### User Profile
```
solcial://profile/[username]
```
**Example**: `solcial://profile/alice`

**Data Required**:
- `username`: User's username

### Chat Conversation
```
solcial://chat/[chatId]
```
**Example**: `solcial://chat/507f1f77bcf86cd799439011`

**Data Required**:
- `chatId`: MongoDB ObjectId of the chat

### Notifications Page
```
solcial://notifications
```

## Notification Data Structure

### Payment Received
```json
{
  "signature": "5j7s8k9...",
  "amount": 0.5,
  "url": "solcial://transaction/5j7s8k9..."
}
```

### Post Like/Comment
```json
{
  "postId": "507f1f77bcf86cd799439011",
  "url": "solcial://post/507f1f77bcf86cd799439011"
}
```

### Follow
```json
{
  "username": "alice",
  "url": "solcial://profile/alice"
}
```

### Chat Message
```json
{
  "chatId": "507f1f77bcf86cd799439011",
  "url": "solcial://chat/507f1f77bcf86cd799439011"
}
```

## Testing Deep Links

### 1. Test with Expo CLI

```bash
# iOS Simulator
npx uri-scheme open solcial://transaction/test123 --ios

# Android Emulator
npx uri-scheme open solcial://transaction/test123 --android
```

### 2. Test with ADB (Android)

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "solcial://transaction/test123" \
  com.arome.dev.solcial
```

### 3. Test with xcrun (iOS)

```bash
xcrun simctl openurl booted "solcial://transaction/test123"
```

### 4. Test Push Notifications

Send a test notification with deep link data:

```bash
curl -X POST https://exp.host/--/api/v2/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "ExponentPushToken[...]",
    "title": "Test Notification",
    "body": "Tap to open transaction",
    "data": {
      "signature": "test123",
      "url": "solcial://transaction/test123"
    }
  }'
```

## Universal Links Setup (Optional)

To enable universal links (HTTPS URLs), you need to:

### 1. Create Apple App Site Association File

Host at `https://solcial.app/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.com.arome.dev.solcial",
        "paths": [
          "/transaction/*",
          "/post/*",
          "/profile/*",
          "/chat/*",
          "/notifications"
        ]
      }
    ]
  }
}
```

### 2. Create Android Asset Links File

Host at `https://solcial.app/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.arome.dev.solcial",
      "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
    }
  }
]
```

### 3. Update app.json

Already configured in the implementation above.

## How It Works

### Flow Diagram

```
User receives push notification
         ↓
User taps notification
         ↓
Expo Notifications API captures tap
         ↓
Extract data from notification payload
         ↓
handleNotificationNavigation() called
         ↓
Check data fields (signature, postId, etc.)
         ↓
router.push() to appropriate screen
         ↓
User sees relevant content
```

### Deep Link Flow

```
User clicks deep link (email, SMS, web)
         ↓
OS opens app with URL
         ↓
Linking.addEventListener captures URL
         ↓
handleDeepLink() parses URL
         ↓
Extract path and parameters
         ↓
router.push() to appropriate screen
         ↓
User sees relevant content
```

## Troubleshooting

### Deep Links Not Working

1. **Check URL scheme is registered**:
   ```bash
   npx uri-scheme list
   ```
   Should show `solcial`

2. **Verify app.json configuration**:
   - `scheme` is set to `solcial`
   - Intent filters are configured (Android)
   - Associated domains are set (iOS)

3. **Check logs**:
   ```typescript
   console.log('Deep link:', { hostname, path, queryParams });
   ```

4. **Rebuild app**:
   ```bash
   npx expo prebuild --clean
   ```

### Notifications Not Navigating

1. **Check notification data**:
   ```typescript
   console.log('Notification tapped with data:', data);
   ```

2. **Verify data structure**:
   - Payment: Has `signature` field
   - Post: Has `postId` field
   - Profile: Has `username` field
   - Chat: Has `chatId` field

3. **Check navigation logic**:
   - Ensure routes exist in app
   - Verify parameter names match

### Universal Links Not Working

1. **Verify AASA file is accessible**:
   ```bash
   curl https://solcial.app/.well-known/apple-app-site-association
   ```

2. **Check certificate**:
   - Must be served over HTTPS
   - Valid SSL certificate required

3. **Verify Team ID and Bundle ID**:
   - Match in AASA file and Xcode

## Security Considerations

### URL Validation

- Always validate deep link parameters
- Check user authentication before showing sensitive data
- Sanitize input to prevent injection attacks

### Data Privacy

- Don't include sensitive data in URLs
- Use IDs instead of personal information
- Validate user has permission to view content

## Future Enhancements

Potential improvements:

1. **Deferred Deep Links**: Track attribution for new installs
2. **Dynamic Links**: Firebase Dynamic Links for better sharing
3. **Branch.io Integration**: Advanced deep linking analytics
4. **QR Code Deep Links**: Generate QR codes with deep links
5. **Share Sheet Integration**: Share content with deep links

## Related Files

### Frontend
- `app/_layout.tsx` - Deep linking handlers
- `app.json` - Deep linking configuration

### Backend
- `src/modules/blockchain-monitor/blockchain-monitor.service.ts` - Push notification with deep links

### Documentation
- `DEEP_LINKING_IMPLEMENTATION.md` - This file
- `BLOCKCHAIN_NOTIFICATIONS_COMPLETE.md` - Notification system

## Summary

Successfully implemented deep linking that:
- ✅ Handles push notification taps
- ✅ Supports custom URL scheme (`solcial://`)
- ✅ Configured for universal links (`https://solcial.app`)
- ✅ Routes to transaction, post, profile, and chat screens
- ✅ Parses URL parameters correctly
- ✅ Works on both iOS and Android
- ✅ Includes deep link URLs in push notifications
- ✅ Handles app launch from closed state
- ✅ Handles app resume from background
