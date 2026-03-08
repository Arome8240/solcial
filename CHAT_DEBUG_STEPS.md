# Chat Debug Steps - Complete Guide

## Issues Fixed ✅

### 1. Chat Participants Not Populating
**Problem**: Participants stored as strings instead of ObjectIds
**Solution**: Convert to ObjectIds in `createChat()`
**Status**: FIXED

### 2. TypeScript Errors in Scripts
**Problem**: `MONGODB_URI` type errors and `db` possibly undefined
**Solution**: Added type assertions and null checks
**Status**: FIXED

### 3. Expo Go Can't Access Local API
**Problem**: Backend not accessible from phone
**Solution**: Backend already configured to listen on `0.0.0.0`
**Status**: READY TO TEST

## Quick Test Procedure

### Step 1: Restart Backend
```bash
cd solcial-backend
pnpm run start:dev
```

Wait for:
```
🚀 Server running on http://localhost:3000
📡 API available at http://localhost:3000/api
```

### Step 2: Verify Backend Accessibility
```bash
curl http://10.175.198.183:3000/api/health
```

Should return:
```json
{"status":"ok","timestamp":"...","uptime":123,"database":"connected"}
```

### Step 3: Start Expo
```bash
cd solcial
npx expo start -c
```

### Step 4: Test Chat Functionality
1. Open app on phone
2. Navigate to Chats tab
3. Create a new chat or open existing one
4. Verify user details display correctly

## What to Look For

### Backend Logs (Success ✅)
```
[getChats] Fetching chats for user: 69abfa2689a6d3647455f7c2
[getChats] Found chats: 1
[getChats] First chat participants: [{"_id":"...","username":"john","name":"John Doe","avatar":"..."}]
[getChats] Processing chat: 69ad20b578b9c787c7991ba6
[getChats] Participants type: object
[getChats] Selected otherParticipant: {"_id":"...","username":"john","name":"John Doe","avatar":"..."}
```

### Backend Logs (Still Broken ❌)
```
[getChats] Participants type: string
[getChats] Participant is string (not populated): 69abfa2689a6d3647455f7c2
```

### Frontend Display (Success ✅)
- Chat list shows real usernames and avatars
- Chat detail page shows participant name in header
- No "Unknown" or "?" placeholders

### Frontend Display (Still Broken ❌)
- Shows "Unknown" for usernames
- Shows "?" for avatars
- Chat header shows "Chat"

## Troubleshooting

### Issue: Still Seeing String Participants

**Solution**: Run the fix script again
```bash
cd solcial-backend
npx tsx scripts/fix-chat-participants.ts
```

Then restart backend.

### Issue: Can't Connect from Phone

**Check 1**: Firewall
```bash
sudo ufw allow 3000
```

**Check 2**: IP Address
```bash
hostname -I
```

Update `.env` if IP changed.

**Check 3**: Same WiFi Network
- Both devices must be on same network
- Try mobile hotspot if corporate WiFi blocks device communication

### Issue: New Chats Still Broken

**Check**: Backend restarted after code change?
```bash
# Stop backend (Ctrl+C)
# Start again
pnpm run start:dev
```

### Issue: Frontend Not Updating

**Solution**: Clear cache and restart
```bash
npx expo start -c
```

## Debug Tools

### Inspect Existing Chats
```bash
cd solcial-backend
npx tsx scripts/inspect-chats.ts
```

Shows:
- Chat IDs
- Participant IDs and types
- User details for each participant

### Fix Existing Chats
```bash
cd solcial-backend
npx tsx scripts/fix-chat-participants.ts
```

Converts string participants to ObjectIds.

### Test Chat Endpoint Directly
```bash
# Get all chats (replace with your auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://10.175.198.183:3000/api/chats

# Get specific chat
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://10.175.198.183:3000/api/chats/CHAT_ID
```

## Files Modified

1. `solcial-backend/src/modules/chats/chats.service.ts`
   - Line 60: Convert participants to ObjectIds in createChat()

2. `solcial-backend/scripts/fix-chat-participants.ts`
   - Added type assertion for MONGODB_URI
   - Added null check for db connection

3. `solcial-backend/scripts/inspect-chats.ts`
   - Added type assertion for MONGODB_URI
   - Added null check for db connection

## Next Steps

1. ✅ Restart backend
2. ✅ Test creating new chat
3. ✅ Verify existing chats work
4. ✅ Test on phone via Expo Go
5. ✅ Monitor backend logs for any issues

## Success Criteria

- [ ] Backend starts without errors
- [ ] Backend accessible from phone
- [ ] New chats populate user details
- [ ] Existing chats show user details
- [ ] No "Unknown" or "?" in chat list
- [ ] Chat detail page shows participant name
- [ ] Backend logs show "object" type for participants

## Additional Resources

- `CHAT_USER_DETAILS_FIX_COMPLETE.md` - Detailed fix explanation
- `CHAT_FIX_QUICK_START.md` - Quick testing guide
- `EXPO_LOCAL_API_SETUP.md` - Expo Go configuration guide
