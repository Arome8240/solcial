# Two-Factor Authentication & Account Recovery

## Overview
Comprehensive 2FA and account recovery system for enhanced security.

## Features

### 1. Two-Factor Authentication (2FA)
- **TOTP-based** - Time-based One-Time Password using authenticator apps
- **QR Code Setup** - Easy setup by scanning QR code
- **Manual Entry** - Alternative setup with secret key
- **Recovery Codes** - 10 backup codes for account recovery
- **Flexible Verification** - Use authenticator or recovery codes

### 2. Account Recovery
- **Password Reset** - Email-based password reset flow
- **Recovery Codes** - One-time use backup codes
- **Email Verification** - Secure email verification process

### 3. Security Settings
- **Enable/Disable 2FA** - Toggle from settings
- **View Recovery Codes** - Access saved recovery codes
- **Biometric Integration** - Works alongside biometric auth

## Implementation

### Files Created

#### Frontend
- `lib/twoFactor.ts` - 2FA utility functions
- `components/settings/TwoFactorSettings.tsx` - 2FA settings component
- `app/auth/2fa-verify/index.tsx` - 2FA verification screen
- `app/auth/forgot-password/index.tsx` - Password reset request
- `app/auth/reset-password/index.tsx` - Password reset completion

#### Storage
- `lib/storage.ts` - Added 2FA and recovery code storage

### Files Modified
- `components/auth/SignInForm.tsx` - Added forgot password link
- `app/auth/signin/index.tsx` - Added forgot password handler
- `app/settings/index.tsx` - Added 2FA settings

## User Flows

### 1. Enable 2FA

```
Settings → Two-Factor Authentication → Toggle ON
  ↓
Display QR Code + Secret Key
  ↓
User scans with authenticator app
  ↓
Enter 6-digit verification code
  ↓
Display 10 recovery codes
  ↓
User saves recovery codes
  ↓
2FA Enabled ✓
```

### 2. Sign In with 2FA

```
Enter Email + Password
  ↓
Backend validates credentials
  ↓
If 2FA enabled → Redirect to 2FA verification
  ↓
Enter 6-digit code from authenticator
  OR
Enter recovery code
  ↓
Verify code with backend
  ↓
Sign in successful ✓
```

### 3. Password Recovery

```
Sign In → Forgot Password?
  ↓
Enter email address
  ↓
Receive reset email
  ↓
Click reset link
  ↓
Enter new password
  ↓
Password reset successful ✓
```

### 4. Use Recovery Code

```
2FA Verification Screen
  ↓
"Use recovery code instead"
  ↓
Enter recovery code (XXXX-XXXX)
  ↓
Code verified and marked as used
  ↓
Sign in successful ✓
```

## Backend Requirements

### API Endpoints Needed

```typescript
// 2FA Setup
POST /api/auth/2fa/setup
Response: { qrCode: string, secret: string }

// 2FA Verification (Enable)
POST /api/auth/2fa/verify
Body: { code: string }
Response: { success: boolean, recoveryCodes: string[] }

// 2FA Disable
POST /api/auth/2fa/disable
Response: { success: boolean }

// 2FA Login Verification
POST /api/auth/2fa/verify-login
Body: { email: string, tempToken: string, code: string, isRecoveryCode: boolean }
Response: { token: string, user: User }

// Password Reset Request
POST /api/auth/password/reset-request
Body: { email: string }
Response: { success: boolean }

// Password Reset
POST /api/auth/password/reset
Body: { token: string, password: string }
Response: { success: boolean }
```

### Database Schema

```typescript
// User Model additions
interface User {
  // ... existing fields
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  recoveryCodes?: string[]; // Hashed
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
```

## Security Considerations

### 1. 2FA Implementation
- **TOTP Standard** - Use standard TOTP algorithm (RFC 6238)
- **Secret Storage** - Encrypt 2FA secrets in database
- **Recovery Codes** - Hash recovery codes before storage
- **Rate Limiting** - Limit verification attempts
- **Expiry** - Codes expire after 30 seconds

### 2. Recovery Codes
- **One-Time Use** - Each code can only be used once
- **Secure Generation** - Cryptographically secure random generation
- **Hashed Storage** - Never store plain text codes
- **Limited Quantity** - 10 codes per user
- **Regeneration** - Allow users to regenerate codes

### 3. Password Reset
- **Token Expiry** - Reset tokens expire after 1 hour
- **Single Use** - Tokens can only be used once
- **Secure Tokens** - Use cryptographically secure tokens
- **Email Verification** - Verify email ownership
- **Rate Limiting** - Limit reset requests per email

## Usage

### For Users

#### Enable 2FA:
1. Go to Settings → Security
2. Toggle "Two-Factor Authentication"
3. Scan QR code with authenticator app (Google Authenticator, Authy, etc.)
4. Enter verification code
5. Save recovery codes in a safe place

#### Sign In with 2FA:
1. Enter email and password
2. Enter 6-digit code from authenticator app
3. Or use recovery code if needed

#### Reset Password:
1. Click "Forgot Password?" on sign in
2. Enter your email
3. Check email for reset link
4. Click link and enter new password

### For Developers

```typescript
import { twoFactor } from '@/lib/twoFactor';

// Check if 2FA is enabled
const enabled = await twoFactor.isEnabled();

// Enable 2FA
await twoFactor.enable();

// Save recovery codes
await twoFactor.saveRecoveryCodes(codes);

// Use recovery code
const valid = await twoFactor.useRecoveryCode(code);

// Format recovery code for display
const formatted = twoFactor.formatRecoveryCode('12345678'); // "1234-5678"
```

## Recommended Authenticator Apps
- Google Authenticator (iOS/Android)
- Authy (iOS/Android/Desktop)
- Microsoft Authenticator (iOS/Android)
- 1Password (iOS/Android/Desktop)
- LastPass Authenticator (iOS/Android)

## Testing Checklist

- [ ] Enable 2FA with QR code
- [ ] Enable 2FA with manual entry
- [ ] Verify 6-digit code works
- [ ] Verify recovery code works
- [ ] Recovery code marked as used after use
- [ ] Disable 2FA removes all data
- [ ] Password reset email sent
- [ ] Password reset link works
- [ ] Password reset token expires
- [ ] Rate limiting works
- [ ] 2FA works with biometric auth
- [ ] Recovery codes can be viewed
- [ ] Invalid codes rejected
- [ ] Expired codes rejected

## Future Enhancements
- [ ] SMS-based 2FA as alternative
- [ ] Email-based 2FA codes
- [ ] Trusted devices (skip 2FA for 30 days)
- [ ] 2FA for sensitive operations (wallet transactions)
- [ ] Backup email for account recovery
- [ ] Security questions as additional recovery method
- [ ] Activity log for security events
- [ ] Push notification-based 2FA
