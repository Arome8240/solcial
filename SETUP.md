# Solcial - Setup Guide

Complete authentication system with React Query integration.

## ✅ What's Implemented

### Backend (NestJS + MongoDB)
- ✅ User signup with automatic Solana wallet creation
- ✅ Email verification with 6-digit code
- ✅ User signin with JWT authentication
- ✅ Custodial wallet management (encrypted private keys)
- ✅ Devnet airdrop for new users (2 SOL)
- ✅ Profile endpoint

### Frontend (React Native + Expo)
- ✅ React Query integration for state management
- ✅ Signup flow with email/username/password
- ✅ Email verification screen
- ✅ Signin screen
- ✅ Profile setup screen
- ✅ Logout functionality
- ✅ Token persistence with AsyncStorage
- ✅ Loading states and error handling

## 🚀 Quick Start

### 1. Start MongoDB

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
```

### 2. Start Backend

```bash
cd solcial-backend

# Install dependencies (if not done)
pnpm install

# Start development server
pnpm run start:dev
```

Backend will run on `http://localhost:3000`

### 3. Start Frontend

```bash
cd solcial

# Install dependencies (if not done)
pnpm install

# Start Expo
pnpm start
```

Press `i` for iOS simulator or `a` for Android emulator.

## 📱 Testing the Auth Flow

### 1. Sign Up
1. Open the app
2. Tap "Sign Up" or navigate to email screen
3. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Tap "Create Account"

### 2. Verify Email
1. Check backend console for verification code
2. Enter the 6-digit code
3. Tap "Verify"

### 3. Complete Profile (Optional)
1. Add name and bio (optional)
2. Tap "Setup and Continue"
3. You'll be redirected to the feed

### 4. Sign In
1. Go back to signin screen
2. Enter email and password
3. Tap "Sign In"

### 5. Check Wallet
1. Go to Wallet tab
2. You should see 2 SOL (from devnet airdrop)
3. Your wallet address is displayed

## 🔧 Configuration

### Frontend (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# For Android emulator
# EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api

# For physical device (use your computer's IP)
# EXPO_PUBLIC_API_URL=http://192.168.1.x:3000/api
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/solcial
JWT_SECRET=your-secret-key
SOLANA_RPC_URL=https://api.devnet.solana.com
ENCRYPTION_KEY=<generate-with-crypto>
```

## 🎯 Next Steps

### Immediate (For Hackathon)
1. ✅ Auth system (DONE)
2. [ ] Wallet endpoints (balance, send, transactions)
3. [ ] Social features (posts, follows)
4. [ ] Messaging with payments
5. [ ] Connect frontend wallet screens to backend

### Future
- [ ] Email service integration (SendGrid/Mailgun)
- [ ] File upload for avatars (S3/Cloudinary)
- [ ] WebSocket for real-time updates
- [ ] Push notifications
- [ ] Rate limiting
- [ ] API documentation (Swagger)

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongosh`
- Check if port 3000 is available
- Verify .env file exists

### Frontend can't connect to backend
- Check API_URL in .env
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address
- Make sure backend is running

### Verification code not working
- Check backend console for the code
- Code expires in 10 minutes
- Use "Resend Code" button if expired

### Wallet not created
- Check backend logs for errors
- Verify ENCRYPTION_KEY is set
- Check Solana RPC connection

## 📚 API Documentation

### Auth Endpoints

**POST /api/auth/signup**
- Creates user + wallet
- Returns JWT token
- Sends verification code

**POST /api/auth/signin**
- Authenticates user
- Returns JWT token

**POST /api/auth/verify-email**
- Verifies email with code
- Marks account as verified

**POST /api/auth/resend-code**
- Sends new verification code

**GET /api/auth/profile**
- Returns current user
- Requires JWT token

## 🎨 React Query Hooks

### useAuth()
```typescript
const {
  user,              // Current user object
  isLoadingUser,     // Loading state
  isAuthenticated,   // Boolean
  signup,            // Signup mutation
  isSigningUp,       // Loading state
  signin,            // Signin mutation
  isSigningIn,       // Loading state
  verifyEmail,       // Verify mutation
  isVerifying,       // Loading state
  resendCode,        // Resend mutation
  isResending,       // Loading state
  logout,            // Logout function
} = useAuth();
```

### Usage Example
```typescript
// Signup
signup({ email, password, username });

// Signin
signin({ email, password });

// Verify
verifyEmail({ email, code });

// Logout
logout();
```

## 🔐 Security Notes

- Private keys are encrypted with AES-256-CBC
- Passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- Email verification required
- All API calls use HTTPS in production

## 📝 Database Collections

### users
- Stores user accounts
- Encrypted wallet private keys
- Email verification status
- Social stats (followers, posts)

### transactions (TODO)
- Transaction history
- Signatures and amounts
- Status tracking

### posts (TODO)
- User posts
- Likes and reposts

### messages (TODO)
- Chat messages
- Payment messages

## 🚀 Deployment Checklist

### Backend
- [ ] Set strong JWT_SECRET
- [ ] Generate secure ENCRYPTION_KEY
- [ ] Use MongoDB Atlas
- [ ] Set SOLANA_NETWORK to mainnet-beta
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up monitoring

### Frontend
- [ ] Update API_URL to production
- [ ] Build with EAS
- [ ] Test on real devices
- [ ] Submit to app stores

## 💡 Tips

1. **Development**: Use devnet for free SOL
2. **Testing**: Create multiple test accounts
3. **Debugging**: Check backend console for verification codes
4. **Performance**: React Query caches API calls
5. **State**: User data persists across app restarts

## 🎉 You're Ready!

The complete auth system is working. Now you can:
1. Focus on wallet features
2. Add social features
3. Implement messaging
4. Polish the UI
5. Prepare for hackathon demo

Good luck! 🚀
