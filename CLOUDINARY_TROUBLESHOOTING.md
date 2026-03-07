# Cloudinary Upload Troubleshooting

## Error: "Failed to upload image"

This error means the backend cannot upload to Cloudinary. Here's how to fix it:

### Step 1: Check Backend Logs
Look at your backend console output. You should see:
```
Cloudinary Config: {
  cloudName: 'your_cloud_name',
  uploadPreset: 'solcial_uploads',
  url: 'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload'
}
```

If you see empty values, Cloudinary is not configured.

### Step 2: Configure Cloudinary

#### Option A: Quick Setup (Recommended)
1. Go to https://cloudinary.com/users/register/free
2. Sign up and verify your email
3. On the dashboard, copy your "Cloud name"
4. Go to Settings → Upload → Upload presets
5. Click "Add upload preset"
6. Set:
   - Preset name: `solcial_uploads`
   - Signing Mode: **Unsigned** (important!)
   - Click Save

#### Option B: Use Existing Account
If you already have a Cloudinary account:
1. Log in to https://cloudinary.com
2. Copy your Cloud name from the dashboard
3. Create an unsigned upload preset named `solcial_uploads`

### Step 3: Update Backend .env
Edit `solcial-backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_UPLOAD_PRESET=solcial_uploads
```

**Important**: Replace `your_actual_cloud_name` with your real cloud name!

### Step 4: Restart Backend
```bash
cd solcial-backend
# Stop the server (Ctrl+C)
pnpm run start:dev
```

### Step 5: Verify Configuration
Check the backend logs when it starts. You should see:
```
Cloudinary Config: {
  cloudName: 'your_actual_cloud_name',  // ← Should NOT be empty
  uploadPreset: 'solcial_uploads',      // ← Should NOT be empty
  ...
}
```

### Step 6: Test Upload
1. Try uploading an image in the app
2. Check backend logs for:
   - "Uploading to Cloudinary..."
   - "Upload successful: https://res.cloudinary.com/..."

## Common Issues

### Issue: "Cloudinary configuration is missing"
**Cause**: .env file not configured
**Fix**: Follow Step 3 above

### Issue: "Upload preset not found"
**Cause**: Upload preset doesn't exist or is named wrong
**Fix**: 
1. Go to Cloudinary Settings → Upload
2. Create preset named exactly `solcial_uploads`
3. Set Signing Mode to "Unsigned"

### Issue: "Invalid signature"
**Cause**: Upload preset is set to "Signed" mode
**Fix**: Change preset to "Unsigned" mode

### Issue: "Unauthorized"
**Cause**: Cloud name is wrong
**Fix**: Double-check cloud name in Cloudinary dashboard

## Alternative: Temporary Base64 Storage

If you can't set up Cloudinary right now, you can temporarily store images as base64 in the database:

### Quick Fix (Development Only)
Edit `solcial-backend/src/modules/upload/upload.service.ts`:

```typescript
async uploadImage(base64Image: string): Promise<string> {
  // Temporary: Just return the base64 image
  // WARNING: This stores images in database - not for production!
  return base64Image;
}
```

**Note**: This is only for development. Base64 images in database are:
- Much larger than URLs
- Slower to load
- Not recommended for production

## Verification Checklist

- [ ] Cloudinary account created
- [ ] Cloud name copied
- [ ] Upload preset created (unsigned)
- [ ] .env file updated with correct values
- [ ] Backend restarted
- [ ] Configuration logs show correct values
- [ ] Test upload successful

## Still Having Issues?

### Check These:
1. **Internet connection**: Backend needs internet to reach Cloudinary
2. **Firewall**: Make sure Cloudinary API is not blocked
3. **Typos**: Double-check cloud name and preset name
4. **Case sensitivity**: Names are case-sensitive

### Get Help:
- Check backend console for detailed error messages
- Check Cloudinary dashboard → Media Library for uploads
- Check Cloudinary dashboard → Reports → Usage for API calls

## Success Indicators

When everything works, you'll see:
1. Backend logs: "Upload successful: https://res.cloudinary.com/..."
2. Cloudinary dashboard: New images in Media Library
3. App: Images display correctly
4. Network tab: Images load from Cloudinary CDN

## Next Steps

Once Cloudinary is working:
1. Test uploading profile avatar
2. Test uploading post images
3. Check images in Cloudinary dashboard
4. Verify images load quickly from CDN

Your images will be stored on Cloudinary's global CDN for fast, reliable delivery!
