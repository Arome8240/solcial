# Expo Go Local API Setup Guide

## Current Configuration ✅

Your `.env` file already has the local IP configured:
```
EXPO_PUBLIC_API_URL=http://10.175.198.183:3000/api
```

The backend is already configured to listen on all network interfaces (`0.0.0.0`).

## Quick Start

### 1. Restart Backend
```bash
cd solcial-backend
pnpm run start:dev
```

You should see:
```
🚀 Server running on http://localhost:3000
📡 API available at http://localhost:3000/api
📱 For mobile devices, use: http://YOUR_LOCAL_IP:3000/api
```

### 2. Verify Backend is Accessible
From your computer:
```bash
curl http://10.175.198.183:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123,
  "database": "connected"
}
```

### 3. Start Expo with Cache Clear
```bash
cd solcial
npx expo start -c
```

### 4. Connect Phone
- Make sure your phone is on the same WiFi network as your computer
- Scan the QR code with Expo Go
- The app should now connect to your local backend

## Troubleshooting

### Can't Connect from Phone?

#### Check Firewall
If the curl command works but the phone can't connect, your firewall might be blocking port 3000:

```bash
# Check if port 3000 is open
sudo ufw status

# Allow port 3000 (if using ufw)
sudo ufw allow 3000

# Or for iptables
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
```

#### Verify IP Address
Make sure `10.175.198.183` is still your current local IP:

```bash
# Linux
ip addr show | grep "inet "

# Or
hostname -I
```

If your IP changed, update `.env`:
```
EXPO_PUBLIC_API_URL=http://YOUR_NEW_IP:3000/api
```

#### Check WiFi Network
- Both devices must be on the same WiFi network
- Some public/corporate WiFi networks block device-to-device communication
- Try using a mobile hotspot if needed

### Backend Not Starting?

Check for port conflicts:
```bash
# See what's using port 3000
lsof -i :3000

# Kill the process if needed
kill -9 <PID>
```

### App Shows Connection Error?

1. Check the API URL in the app:
   - Open `solcial/.env`
   - Verify `EXPO_PUBLIC_API_URL` matches your local IP

2. Restart Expo with cache clear:
   ```bash
   npx expo start -c
   ```

3. Check backend logs for incoming requests

## Testing the Connection

### From the App
1. Open the app on your phone
2. Check the API status indicator (if you have one)
3. Try signing in or fetching data
4. Watch the backend logs for incoming requests

### Backend Logs
You should see requests like:
```
[ChatsService] Fetching chats for user: 69abfa2689a6d3647455f7c2
[PostsService] Fetching feed, page: 1
```

## Switching Between Local and Production

### Use Local API
```env
EXPO_PUBLIC_API_URL=http://10.175.198.183:3000/api
```

### Use Production API
```env
EXPO_PUBLIC_API_URL=https://solcial-backend.onrender.com/api
```

After changing, restart Expo:
```bash
npx expo start -c
```

## Network Requirements

- Both devices on same WiFi network
- Firewall allows port 3000
- No VPN interfering with local network
- Router allows device-to-device communication

## Benefits of Local Development

- Faster response times (no internet latency)
- See backend logs in real-time
- Test changes immediately
- No deployment needed for testing
- Works offline
