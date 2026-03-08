# Token Holdings Display Fix

## Issue
Purchased tokens were not showing in the wallet's "Your Assets" section.

## Root Cause
The wallet page was not correctly passing the user ID to the `useTokenHoldings` hook, which prevented the portfolio data from being fetched.

## Changes Made

### 1. Fixed User ID Extraction (`solcial/app/(tabs)/wallet/index.tsx`)
- Changed from `typedUser?.id` to properly typed `(user as User)?.id`
- Added proper User type import
- This ensures the user ID is correctly extracted and passed to the portfolio hook

### 2. Added Refetch Functionality (`solcial/hooks/usePortfolio.ts`)
- Updated `useTokenHoldings` to return `refetch` function
- Updated `isLoading` to use the actual loading state from the query
- This allows manual refresh of token holdings

### 3. Improved Refresh Behavior (`solcial/app/(tabs)/wallet/index.tsx`)
- Created `handleRefresh` function that refreshes both balance and holdings
- Updated RefreshControl to use the new handler
- Pull-to-refresh now updates both SOL balance and token holdings

## How It Works

1. **User ID**: The wallet page gets the authenticated user's ID from `useAuth()`
2. **Portfolio Query**: The ID is passed to `useTokenHoldings(userId)` which calls the backend
3. **Backend Endpoint**: `GET /api/posts/portfolio/:userId` returns all token holdings
4. **Display**: Holdings are mapped and displayed with current value, profit/loss, etc.

## Backend Endpoint

The portfolio endpoint (`getUserPortfolio` in `posts.service.ts`) does the following:

1. Finds all `TokenHolder` records for the user
2. Populates post and author information
3. Calculates current value based on current token price
4. Computes profit/loss and percentage
5. Returns aggregated portfolio data

## Testing

To verify tokens show up:
1. Buy tokens from a tokenized post
2. Navigate to Wallet tab
3. Scroll to "Your Assets" section
4. Token holdings should appear under "Post Tokens"
5. Pull down to refresh and see updated values

## Data Displayed

For each token holding:
- Post content preview (first 30 characters)
- Number of tokens owned
- Current value in SOL
- Profit/Loss percentage with trend indicator (up/down arrow)
- Tap to view the original post

Total token value is shown at the bottom of the holdings list.
