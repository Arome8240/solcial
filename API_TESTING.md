# API Testing Guide

Your backend is live at: **https://solcial-backend.onrender.com/api**

## Quick Health Check

```bash
curl https://solcial-backend.onrender.com/api/health
```

## Testing from the Mobile App

Your app is already configured to use the live API. The `.env` file contains:

```
EXPO_PUBLIC_API_URL=https://solcial-backend.onrender.com/api
```

### Test the Auth Flow

1. **Start the Expo app**:
   ```bash
   pnpm start
   ```

2. **Test Signup**:
   - Open the app on your device/simulator
   - Navigate to the signup screen
   - Enter email, username, and password
   - Submit the form

3. **Get Verification Code**:
   - Check your Render backend logs for the 6-digit code
   - Go to: https://dashboard.render.com → Your Service → Logs
   - Look for: `Verification code for [email]: XXXXXX`

4. **Verify Email**:
   - Enter the 6-digit code in the verification screen
   - Complete the verification

5. **Sign In**:
   - Use your email and password to sign in
   - You should be redirected to the main app

## Testing with cURL

### 1. Signup
```bash
curl -X POST https://solcial-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456",
    "username": "testuser"
  }'
```

### 2. Resend Verification Code
```bash
curl -X POST https://solcial-backend.onrender.com/api/auth/resend-code \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### 3. Verify Email
```bash
curl -X POST https://solcial-backend.onrender.com/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "code": "123456"
  }'
```

### 4. Sign In
```bash
curl -X POST https://solcial-backend.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### 5. Get Profile (requires token)
```bash
curl https://solcial-backend.onrender.com/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Checking Backend Logs

To see verification codes and debug issues:

1. Go to https://dashboard.render.com
2. Select your `solcial-backend` service
3. Click on "Logs" tab
4. Look for verification codes and error messages

## Common Issues

### CORS Errors
If you see CORS errors in the app, ensure your backend has proper CORS configuration for your frontend domain.

### Connection Timeout
Render free tier services spin down after inactivity. The first request may take 30-60 seconds to wake up the service.

### Environment Variables
Verify all required environment variables are set in Render:
- `MONGODB_URI`
- `JWT_SECRET`
- `SOLANA_RPC_URL`
- `ENCRYPTION_KEY`

## Next Steps

1. ✅ Backend is deployed and healthy
2. ✅ Frontend is configured with live API URL
3. 🔄 Test the complete auth flow from the mobile app
4. 🔄 Monitor logs for any errors
5. 🔄 Test wallet creation and Solana integration

## Support

If you encounter issues:
1. Check backend logs on Render
2. Check app console logs
3. Verify environment variables
4. Test endpoints with cURL to isolate issues
