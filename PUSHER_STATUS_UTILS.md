# Pusher Connection Status Utilities

## Overview
Utilities to monitor and debug Pusher WebSocket connections in the Solcial app.

## Files Created

### 1. `utils/pusherStatus.ts`
Core utility functions for Pusher connection monitoring.

### 2. `hooks/usePusherStatus.ts`
React hook for real-time Pusher status in components.

### 3. `components/PusherStatus.tsx`
Visual component to display Pusher connection status.

### 4. `scripts/test-pusher.ts`
Test script for Pusher connection diagnostics.

## Usage

### Quick Status Check (Console)

```typescript
import { logPusherStatus } from '@/utils/pusherStatus';

// Log current status to console
logPusherStatus();
```

Output:
```
=== Pusher Connection Status ===
State: connected
Connected: true
Socket ID: 123456.789012
================================
```

### Get Status Programmatically

```typescript
import { getPusherStatus } from '@/utils/pusherStatus';

const status = getPusherStatus();
console.log(status.isConnected); // true/false
console.log(status.state); // 'connected', 'connecting', 'disconnected', etc.
console.log(status.socketId); // '123456.789012' or null
```

### Monitor Status Changes

```typescript
import { subscribeToPusherStatus } from '@/utils/pusherStatus';

const unsubscribe = subscribeToPusherStatus((status) => {
  console.log('Pusher state:', status.state);
  if (status.isConnected) {
    console.log('Connected with socket:', status.socketId);
  }
});

// Later, cleanup
unsubscribe();
```

### Wait for Connection

```typescript
import { waitForPusherConnection } from '@/utils/pusherStatus';

try {
  await waitForPusherConnection(5000); // 5 second timeout
  console.log('Pusher is connected!');
} catch (error) {
  console.error('Connection failed:', error);
}
```

### Test Connection

```typescript
import { testPusherConnection } from '@/utils/pusherStatus';

const success = await testPusherConnection();
if (success) {
  console.log('All tests passed!');
}
```

## React Hook Usage

### Basic Usage

```typescript
import { usePusherStatus } from '@/hooks/usePusherStatus';

function MyComponent() {
  const status = usePusherStatus();
  
  return (
    <View>
      <Text>Status: {status.state}</Text>
      <Text>Connected: {status.isConnected ? 'Yes' : 'No'}</Text>
      {status.socketId && <Text>Socket: {status.socketId}</Text>}
    </View>
  );
}
```

### With Visual Component

```typescript
import { PusherStatus } from '@/components/PusherStatus';

function MyScreen() {
  return (
    <View>
      {/* Compact indicator */}
      <PusherStatus compact />
      
      {/* Compact with text */}
      <PusherStatus compact showDetails />
      
      {/* Full card */}
      <PusherStatus showDetails />
    </View>
  );
}
```

## Adding to Settings Page

Add Pusher status to your settings page:

```typescript
import { PusherStatus } from '@/components/PusherStatus';

export default function SettingsScreen() {
  return (
    <ScrollView>
      {/* Other settings */}
      
      <View className="px-4 py-2">
        <Text className="mb-2 text-sm font-medium text-muted-foreground">
          Real-time Connection
        </Text>
        <PusherStatus showDetails />
      </View>
    </ScrollView>
  );
}
```

## Running Tests

### Method 1: Import in App Root

Add to `app/_layout.tsx`:

```typescript
// Only in development
if (__DEV__) {
  import('@/scripts/test-pusher');
}
```

### Method 2: Manual Testing

In any component or screen:

```typescript
import { testPusherConnection, logPusherStatus } from '@/utils/pusherStatus';

// In a button handler
const handleTest = async () => {
  logPusherStatus();
  await testPusherConnection();
};
```

### Method 3: Console Commands

If you have access to the app console:

```javascript
import('@/utils/pusherStatus').then(({ logPusherStatus }) => {
  logPusherStatus();
});
```

## Connection States

| State | Description |
|-------|-------------|
| `initialized` | Pusher client created but not connected |
| `connecting` | Attempting to establish connection |
| `connected` | Successfully connected to Pusher |
| `unavailable` | Connection temporarily unavailable |
| `failed` | Connection failed permanently |
| `disconnected` | Disconnected from Pusher |

## Troubleshooting

### Connection Not Establishing

1. Check environment variables:
   ```bash
   EXPO_PUBLIC_PUSHER_KEY=your_key
   EXPO_PUBLIC_PUSHER_CLUSTER=your_cluster
   ```

2. Verify credentials:
   ```typescript
   import pusher from '@/lib/pusher';
   console.log('Key:', pusher.key);
   console.log('Config:', pusher.config);
   ```

3. Check network:
   ```typescript
   import { testPusherConnection } from '@/utils/pusherStatus';
   await testPusherConnection();
   ```

### Frequent Disconnections

Monitor state changes:
```typescript
import { subscribeToPusherStatus } from '@/utils/pusherStatus';

subscribeToPusherStatus((status) => {
  console.log(`[${new Date().toISOString()}] State: ${status.state}`);
});
```

### Debug Mode

Enable Pusher debug logging in `lib/pusher.ts`:

```typescript
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true; // Add this line

export const pusher = new Pusher(pusherKey, {
  cluster: pusherCluster,
  forceTLS: true,
});
```

## Example: Chat Connection Monitor

```typescript
import { useEffect } from 'react';
import { usePusherStatus } from '@/hooks/usePusherStatus';
import { toast } from 'sonner-native';

function ChatScreen() {
  const pusherStatus = usePusherStatus();
  
  useEffect(() => {
    if (!pusherStatus.isConnected) {
      toast.error('Real-time messaging unavailable');
    }
  }, [pusherStatus.isConnected]);
  
  return (
    <View>
      {/* Show indicator in header */}
      <View className="flex-row items-center gap-2">
        <Text>Chat</Text>
        <PusherStatus compact />
      </View>
      
      {/* Chat content */}
    </View>
  );
}
```

## API Reference

### `getPusherStatus()`
Returns current connection status.

**Returns:** `PusherConnectionStatus`
```typescript
{
  state: string;
  isConnected: boolean;
  socketId: string | null;
}
```

### `subscribeToPusherStatus(callback)`
Subscribe to connection state changes.

**Parameters:**
- `callback: (status: PusherConnectionStatus) => void`

**Returns:** `() => void` (unsubscribe function)

### `logPusherStatus()`
Log status to console.

**Returns:** `PusherConnectionStatus`

### `waitForPusherConnection(timeoutMs?)`
Wait for connection with timeout.

**Parameters:**
- `timeoutMs?: number` (default: 10000)

**Returns:** `Promise<void>`

### `testPusherConnection(channelName?)`
Test connection by subscribing to a channel.

**Parameters:**
- `channelName?: string` (default: 'test-channel')

**Returns:** `Promise<boolean>`

## Notes

- All utilities work in both development and production
- Status monitoring has minimal performance impact
- Socket ID is only available when connected
- Tap the `PusherStatus` component to log status to console
