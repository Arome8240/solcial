# Input Component Features

## New Features Added

### 1. Password Visibility Toggle
- Automatically shows eye icon for password inputs
- Click to toggle between visible/hidden password
- Uses `Eye` and `EyeOff` icons from lucide-react-native

### 2. Active Border Color
- Purple border (`border-purple-600`) when input is focused
- Transparent border when not focused
- Red border when there's an error
- Smooth visual feedback

## Usage

### Basic Input
```tsx
<Input
  label="Email"
  placeholder="john@example.com"
  value={email}
  onChangeText={setEmail}
/>
```

### Password Input (with toggle)
```tsx
<Input
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>
```

### Input with Error
```tsx
<Input
  label="Email"
  placeholder="john@example.com"
  value={email}
  onChangeText={setEmail}
  error="Invalid email address"
/>
```

## Visual States

### Default State
- White background
- Transparent border (2px)
- Gray placeholder text

### Focused State
- White background
- Purple border (2px, #9333ea)
- Active appearance

### Error State
- White background
- Red border (2px)
- Red error message below

### Password Input
- Eye icon on the right side
- Click to toggle visibility
- Icon changes between Eye and EyeOff

## Props

All standard TextInput props are supported, plus:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Optional label above input |
| `error` | `string` | Error message to display |
| `secureTextEntry` | `boolean` | Makes it a password input with toggle |

## Implementation Details

- Uses React hooks for state management
- Preserves original `onFocus` and `onBlur` handlers
- Password toggle button positioned absolutely
- Right padding added for password inputs to prevent text overlap
- Border transitions are smooth with Tailwind classes

## Examples in App

The enhanced Input component is used in:
- Sign in screen (`/auth/signin`)
- Sign up screen (`/auth/email`)
- Edit profile screen (`/profile/edit`)
- Security settings (`/profile/security`)

## Accessibility

- Password visibility toggle is a pressable button
- Clear visual feedback for focus state
- Error messages are displayed below input
- Proper color contrast for all states
