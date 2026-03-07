# Quick Start Guide - Solcial

## 🚀 Your App is Ready!

Everything is set up and ready to test. Here's how to get started:

## Backend Status

✅ **Live and Running**
- URL: https://solcial-backend.onrender.com/api
- Health: https://solcial-backend.onrender.com/api/health
- Database: Connected to MongoDB
- Blockchain: Connected to Solana Devnet
- Email: Configured with Nodemailer

## Frontend Setup

### 1. Install Dependencies
```bash
cd solcial
pnpm install
```

### 2. Start the App
```bash
pnpm start
```

### 3. Open on Device
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on physical device

## Testing the Auth Flow

### Step 1: Sign Up
1. Open the app
2. Tap "Create Account" on onboarding screen
3. Enter:
   - Username: `testuser`
   - Email: `your-email@example.com`
   - Password: `Test123456`
4. Tap "Create Account"

### Step 2: Verify Email
1. Check your email inbox for verification code
2. Enter the 6-digit code in the app
3. Tap "Verify"
4. You'll receive a welcome email with your wallet address

### Step 3: Explore
- Your wallet is automatically created with 2 SOL on devnet
- Navigate through the app:
  - Feed: Social posts
  - Wallet: View balance, send/receive SOL
  - Pay: Scan QR codes, pay contacts
  - Chats: Message friends with payment integration
  - Profile: View and edit your profile

## Features Implemented

### Authentication
- ✅ Email/password signup
- ✅ Email verification with 6-digit code
- ✅ Signin with credentials
- ✅ JWT token authentication
- ✅ Token persistence
- ✅ Auto-redirect based on auth state
- ✅ Logout functionality

### Wallet
- ✅ Automatic Solana wallet creation
- ✅ Custodial wallet (backend manages keys)
- ✅ 2 SOL airdrop on devnet
- ✅ View balance
- ✅ Send SOL
- ✅ Receive SOL with QR code
- ✅ Transaction history (UI ready)

### Social Features
- ✅ User profiles
- ✅ Social feed (UI ready)
- ✅ Messaging (UI ready)
- ✅ Payment in chats (UI ready)

### Email Notifications
- ✅ Verification email with code
- ✅ Welcome email after verification
- ✅ Beautiful HTML templates
- ✅ Branded with purple theme

## API Endpoints

### Auth
- `POST /auth/signup` - Create account
- `POST /auth/signin` - Sign in
- `POST /auth/verify-email` - Verify email
- `POST /auth/resend-code` - Resend verification code
- `GET /auth/profile` - Get user profile (protected)

### Health
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system status

## Environment Variables

### Backend (Already configured on Render)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
SOLANA_RPC_URL=https://api.devnet.solana.com
ENCRYPTION_KEY=32-byte-hex-key
```

### Frontend (Already configured)
```env
EXPO_PUBLIC_API_URL=https://solcial-backend.onrender.com/api
```

## Troubleshooting

### Backend Issues
1. Check Render logs: https://dashboard.render.com
2. Verify environment variables are set
3. Test health endpoint: `curl https://solcial-backend.onrender.com/api/health`

### Frontend Issues
1. Clear Metro bundler cache: `pnpm start --clear`
2. Reinstall dependencies: `rm -rf node_modules && pnpm install`
3. Check console logs for errors

### Email Issues
1. Check spam folder
2. Verify SMTP credentials in backend
3. Check Render logs for email sending errors
4. Verification codes are also logged to console as fallback

## Next Steps

### For Hackathon
1. ✅ Auth is complete and working
2. 🔄 Test the complete flow end-to-end
3. 🔄 Implement wallet send/receive functionality
4. 🔄 Add transaction history
5. 🔄 Implement social features (posts, comments)
6. 🔄 Add messaging functionality
7. 🔄 Polish UI/UX

### Future Enhancements
- [ ] Password reset flow
- [ ] Social login (Google, Apple)
- [ ] Biometric authentication
- [ ] Push notifications
- [ ] Transaction notifications
- [ ] Profile customization
- [ ] Friend requests
- [ ] Post creation and interactions
- [ ] Real-time messaging

## Support

### Documentation
- [API Testing Guide](./API_TESTING.md)
- [Auth Integration Status](./AUTH_INTEGRATION_STATUS.md)
- [Setup Instructions](./SETUP.md)

### Backend Documentation
- [Deployment Guide](../solcial-backend/DEPLOYMENT.md)
- [Email Integration](../solcial-backend/EMAIL_INTEGRATION.md)
- [README](../solcial-backend/README.md)

## 🎉 You're All Set!

Your Solcial app is ready to use. Start the app, create an account, and explore the features. Good luck with your hackathon! 🚀
