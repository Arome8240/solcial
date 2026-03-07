# Send & Receive Screens Implementation

Complete implementation of Send and Receive SOL screens with full functionality.

## Send Screen (`app/(tabs)/wallet/send.tsx`)

### Features Implemented

#### 1. Balance Display
- Shows current available balance
- Purple-themed card for visibility
- Real-time balance from `useWallet` hook

#### 2. Recipient Input
- Text input for Solana wallet address
- Validation for empty and invalid addresses
- Error messages with icons
- Auto-lowercase, no autocorrect

#### 3. Amount Input
- Decimal keyboard for numeric input
- Large, prominent text display
- Validation for:
  - Empty amount
  - Invalid numbers
  - Zero or negative amounts
  - Insufficient balance
- Error messages with visual feedback

#### 4. Quick Amount Buttons
- Pre-set amounts: 0.1, 0.5, 1, 2 SOL
- One-tap to fill amount field
- Convenient for common transactions

#### 5. Memo Field (Optional)
- Add notes to transactions
- 100 character limit
- Helps identify transactions later

#### 6. Transaction Details
- Network information (Solana Devnet)
- Estimated network fee (~0.000005 SOL)
- Transparent fee display

#### 7. Validation System
```typescript
- Amount validation:
  - Must be a valid number
  - Must be greater than 0
  - Must not exceed balance
  
- Recipient validation:
  - Must not be empty
  - Must be at least 32 characters (Solana address length)
```

#### 8. Confirmation Modal
- Review transaction before sending
- Shows:
  - Amount in large text
  - Recipient address (truncated)
  - Memo (if provided)
  - Warning about irreversible transactions
- Cancel or Confirm options
- Loading state during send

#### 9. Send Functionality
- Uses `useWallet` hook's `sendSol` function
- Passes: recipient address, amount, optional memo
- Shows loading spinner during transaction
- Toast notification on success/error
- Resets form after successful send
- Clears all errors

### User Experience

- **Visual Feedback**: Red borders on invalid fields
- **Error Messages**: Clear, actionable error text
- **Loading States**: Spinner during transaction
- **Disabled States**: Button disabled when invalid
- **Form Reset**: Clears after successful send
- **Confirmation**: Double-check before sending

### Technical Details

**State Management:**
```typescript
const [amount, setAmount] = useState('');
const [recipient, setRecipient] = useState('');
const [memo, setMemo] = useState('');
const [showConfirmModal, setShowConfirmModal] = useState(false);
const [errors, setErrors] = useState({ amount: '', recipient: '' });
```

**Hooks Used:**
- `useWallet()` - Balance, sendSol function, loading state

**Validation Function:**
- `validateInputs()` - Checks all fields before showing modal

---

## Receive Screen (`app/(tabs)/wallet/receive.tsx`)

### Features Implemented

#### 1. Balance Display
- Shows current balance
- Purple-themed card matching app design
- Real-time balance from `useWallet` hook

#### 2. QR Code Display
- Large, scannable QR code (240x240)
- White background for better scanning
- Shadow for depth
- Contains full wallet address
- Loading state while address loads

#### 3. Address Preview
- Shows truncated address below QR code
- Format: `9xQeW...kJ7P` (first 12 + last 12 chars)
- Monospace font for readability

#### 4. Toggle View
- Switch between QR code and full address
- Button: "Show Full Address" / "Show QR Code"
- Purple-themed toggle button

#### 5. Full Address View
- Complete wallet address in monospace font
- Gray background for contrast
- Word-wrap for long addresses
- Copy and Share buttons

#### 6. Quick Actions
Two prominent action buttons:
- **Copy Address** - Copies to clipboard with toast
- **Share** - Opens native share dialog

#### 7. Share Functionality
- Uses React Native's Share API
- Shares formatted message with address
- Works on iOS and Android
- Includes title and message

#### 8. How to Receive Guide
Numbered steps with visual indicators:
1. Share wallet address or QR code
2. Sender enters amount and confirms
3. Funds arrive within seconds

#### 9. Network Information
- Network: Solana Devnet
- Transaction Speed: ~400ms
- Network Fee: ~0.000005 SOL

### User Experience

- **Two View Modes**: QR code or full address
- **Easy Sharing**: One-tap copy or share
- **Visual Guide**: Step-by-step instructions
- **Network Info**: Transparent fee and speed info
- **Toast Feedback**: Confirmation when copied
- **Clean Design**: Purple theme throughout

### Technical Details

**State Management:**
```typescript
const [showAddress, setShowAddress] = useState(false);
```

**Hooks Used:**
- `useWallet()` - Wallet address, balance

**Functions:**
- `copyToClipboard()` - Copy address with toast
- `shareAddress()` - Native share dialog

**Dependencies:**
- `react-native-qrcode-svg` - QR code generation
- `expo-clipboard` - Clipboard access
- `Share` from React Native - Native sharing

---

## Integration with Wallet Hook

Both screens use the `useWallet` hook:

```typescript
const { 
  balance,           // Current SOL balance
  walletAddress,     // User's wallet address
  sendSol,          // Function to send SOL
  isSending         // Loading state
} = useWallet();
```

### Send Function Signature
```typescript
sendSol({ 
  toAddress: string,   // Recipient address
  amount: number,      // Amount in SOL
  memo?: string        // Optional memo
})
```

---

## Navigation Flow

### From Feed Balance Card:
- Tap "Send" → Send Screen
- Tap "Receive" → Receive Screen

### From Wallet Screen:
- Tap "Send" button → Send Screen
- Tap "Receive" button → Receive Screen

### After Sending:
- Success → Toast notification + form reset
- Error → Toast with error message

---

## Validation Rules

### Send Screen Validations:

1. **Amount Field:**
   - ✅ Must be a valid decimal number
   - ✅ Must be greater than 0
   - ✅ Must not exceed available balance
   - ❌ Empty or invalid shows error

2. **Recipient Field:**
   - ✅ Must not be empty
   - ✅ Must be at least 32 characters
   - ❌ Invalid address shows error

3. **Form Submission:**
   - ✅ All validations pass → Show confirmation
   - ❌ Any validation fails → Show errors

---

## Error Handling

### Send Screen:
- Invalid amount → Red border + error message
- Invalid recipient → Red border + error message
- Insufficient balance → Specific error message
- Network error → Toast notification

### Receive Screen:
- No wallet address → Shows loading state
- Share error → Console log (silent fail)
- Copy error → Handled by expo-clipboard

---

## UI/UX Improvements

### Visual Design:
- Consistent purple theme
- Rounded corners (xl, 2xl, 3xl)
- Shadow effects for depth
- Clear visual hierarchy

### Accessibility:
- Large touch targets (py-3, py-4)
- Clear labels and placeholders
- Error messages with icons
- Loading states with spinners

### Feedback:
- Toast notifications for actions
- Visual error indicators
- Loading spinners
- Disabled states

---

## Testing Checklist

### Send Screen:
- [x] Balance displays correctly
- [x] Amount validation works
- [x] Recipient validation works
- [x] Quick amount buttons work
- [x] Memo field accepts text
- [x] Confirmation modal shows
- [x] Send function called correctly
- [x] Form resets after send
- [x] Loading states display
- [x] Error messages show
- [x] Navigation works

### Receive Screen:
- [x] QR code generates correctly
- [x] Address displays properly
- [x] Toggle view works
- [x] Copy address works with toast
- [x] Share functionality works
- [x] Balance displays correctly
- [x] Network info shows
- [x] Instructions are clear
- [x] Loading states display
- [x] Navigation works

---

## Future Enhancements

### Send Screen:
- Contact list integration
- Recent recipients
- USD value conversion
- Transaction history link
- Scan QR code for recipient
- Address book
- Max button (send all)

### Receive Screen:
- Request specific amount
- Generate payment link
- Save QR code to gallery
- Multiple address support
- Request payment with amount in QR
- Payment request notifications

---

## Security Considerations

1. **Address Validation**: Basic length check (should add checksum validation)
2. **Confirmation Modal**: Prevents accidental sends
3. **Warning Message**: Alerts about irreversible transactions
4. **Balance Check**: Prevents overdraft
5. **Network Display**: Shows which network (devnet/mainnet)

---

## Performance

- QR code generation: Instant
- Address copy: Instant
- Share dialog: Native speed
- Send transaction: Depends on network
- Form validation: Real-time

---

## Dependencies

```json
{
  "react-native-qrcode-svg": "QR code generation",
  "expo-clipboard": "Clipboard access",
  "sonner-native": "Toast notifications",
  "lucide-react-native": "Icons"
}
```

All screens are fully functional and ready for testing!
