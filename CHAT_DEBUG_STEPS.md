# Chat User Details Debug Steps

## Issue
Chat list and detail pages showing "Unknown" and "?" for user info instead of actual usernames and avatars.

## Changes Made

### Backend Changes

1. **Added comprehensive logging** to `chats.service.ts`:
   - `getChats()`: Logs participants data, comparison logic, and selected otherParticipant
   - `getChat()`: Logs participants data and selection process
   - `createChat()`: Logs chat creation, participant storage, and population

2. **Fixed participant storage** in `createChat()`:
   - Changed from storing strings to explicitly creating ObjectIds
   - Before: `participants: [userId, participantId]`
   - After: `participants: [new Types.ObjectId(userId), new Types.ObjectId(participantId)]`

3. **Added email field** to populate queries for better debugging:
   - Changed `select: 'username name avatar'` to `select: 'username name avatar email'`

4. **Added controller logging** in `chats.controller.ts`:
   - Logs userId from JWT token in `getChats()` and `getChat()`

### Debug Tools

1. **Debug endpoint**: `GET /api/chats/debug/:id`
   - No authentication required
   - Returns full chat details with participants
   - Includes debug info: participant count, raw participants array

2. **Test script**: `solcial-backend/scripts/test-chat-debug.ts`
   - Fetches chats list
   - Tests debug endpoint
   - Usage: `TEST_TOKEN=your_jwt pnpm tsx scripts/test-chat-debug.ts`

3. **Inspect script**: `solcial-backend/scripts/inspect-chats.ts`
   - Directly inspects MongoDB database
   - Shows all chats with participant details
   - Usage: `pnpm tsx scripts/inspect-chats.ts`

4. **Fix script**: `solcial-backend/scripts/fix-chat-participants.ts`
   - Fixes existing chats that have string participants instead of ObjectIds
   - Converts all participant IDs to proper ObjectId format
   - Usage: `pnpm tsx scripts/fix-chat-participants.ts`

## How to Debug

### Step 1: Check Backend Logs

After deploying the updated backend, check the logs when:
1. Opening the chat list
2. Opening a specific chat

Look for logs starting with:
- `[ChatsController.getChats]`
- `[getChats]`
- `[ChatsController.getChat]`
- `[getChat]`

### Step 2: Verify Data Structure

The logs will show:
- User ID from JWT token
- Number of participants in each chat
- Full participant data (including _id, username, name, avatar, email)
- Comparison logic (which participant is selected as "other")

### Step 3: Use Debug Endpoint

If you have a chat ID, test the debug endpoint:

```bash
curl https://solcial-backend.onrender.com/api/chats/debug/CHAT_ID
```

This will show:
- Full chat object
- All participants with their data
- Participant count
- Raw participants array

### Step 4: Test Chat Creation

Create a new chat and check logs to see:
- If participants are stored correctly as ObjectIds
- If population works after creation
- If otherParticipant is selected correctly

## Expected Behavior

When working correctly, the logs should show:

```
[ChatsController.getChats] User ID from token: 507f1f77bcf86cd799439011
[getChats] Fetching chats for user: 507f1f77bcf86cd799439011
[getChats] Found chats: 2
[getChats] Chat ID: 507f191e810c19729de860ea
[getChats] Participants count: 2
[getChats] Participants data: [
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "user1",
    "name": "User One",
    "avatar": "https://...",
    "email": "user1@example.com"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "username": "user2",
    "name": "User Two",
    "avatar": "https://...",
    "email": "user2@example.com"
  }
]
[getChats] Current userId: 507f1f77bcf86cd799439011
[getChats] Comparing participant ID: 507f1f77bcf86cd799439011 with userId: 507f1f77bcf86cd799439011
[getChats] Is other participant? false
[getChats] Comparing participant ID: 507f1f77bcf86cd799439012 with userId: 507f1f77bcf86cd799439011
[getChats] Is other participant? true
[getChats] Selected otherParticipant: {"_id":"507f1f77bcf86cd799439012","username":"user2",...}
```

## Possible Issues

1. **Empty participants array**: Chat was created incorrectly
2. **Participants not populated**: Database reference issue
3. **All participants match userId**: Wrong userId being passed
4. **ObjectId comparison failing**: Type mismatch in comparison

## Next Steps

1. **Inspect the database** to see current chat structure:
   ```bash
   cd solcial-backend
   pnpm tsx scripts/inspect-chats.ts
   ```

2. **Fix existing chats** if participants are stored as strings:
   ```bash
   cd solcial-backend
   pnpm tsx scripts/fix-chat-participants.ts
   ```

3. **Deploy the updated backend** with enhanced logging

4. **Check the logs** when opening chats in the app

5. **Use the debug endpoint** to inspect specific chats:
   ```bash
   curl https://solcial-backend.onrender.com/api/chats/debug/CHAT_ID
   ```

6. **Share the log output** to identify the exact issue if problem persists
