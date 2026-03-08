# Quick Start: Testing Chat Fix

## What Was Fixed
The chat participants weren't being populated correctly - they were stored as strings instead of ObjectIds, so MongoDB couldn't populate the user details.

## Test It Now

### 1. Restart Backend
```bash
cd solcial-backend
pnpm run start:dev
```

### 2. Create a New Chat
- Open the app on your phone (Expo Go)
- Go to a user's profile
- Tap the message button to create a chat
- The chat should now show the user's name and avatar

### 3. Check Existing Chats
- Go to the Chats tab
- All chats should now display user details correctly
- No more "Unknown" or "?" placeholders

## What to Look For

### Backend Logs (Success)
```
[getChats] Participants type: object
[getChats] Participants: [{ _id: '...', username: 'john', name: 'John Doe', avatar: '...' }]
```

### Backend Logs (Still Broken)
```
[getChats] Participants type: string
[getChats] Participant is string (not populated): 69abfa2689a6d3647455f7c2
```

If you still see "string" types, run the fix script again:
```bash
cd solcial-backend
npx tsx scripts/fix-chat-participants.ts
```

## Frontend Display
- Chat list should show real usernames and avatars
- Chat detail page should show the other person's name in the header
- No more "Unknown" or "?" text

## Troubleshooting

### Still seeing "Unknown"?
1. Check backend logs for the participant types
2. Run the fix script if needed
3. Restart the backend
4. Clear app cache: `npx expo start -c`

### New chats still broken?
- Make sure you restarted the backend after the code change
- Check that the backend is running the latest code
