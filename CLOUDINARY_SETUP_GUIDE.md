# Cloudinary Setup Guide

## Quick Start

### 1. Install Frontend Dependency
```bash
cd solcial
npx expo install expo-file-system
```

### 2. Create Cloudinary Account
1. Visit https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email address
4. Log in to your dashboard

### 3. Get Your Cloud Name
1. On the dashboard, find your "Cloud name" (top left)
2. Copy it (e.g., `dxyz123abc`)

### 4. Create Upload Preset
1. Click Settings (gear icon) → Upload tab
2. Scroll to "Upload presets" section
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `solcial_uploads`
   - **Signing Mode**: Select "Unsigned"
   - **Folder**: `solcial` (optional, for organization)
   - **Access Mode**: `Public`
   - **Unique filename**: Enable (recommended)
5. Click "Save"

### 5. Update Backend Environment
Edit `solcial-backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_UPLOAD_PRESET=solcial_uploads
```

Replace `your_cloud_name_here` with your actual cloud name from step 3.

### 6. Restart Backend
```bash
cd solcial-backend
pnpm run start:dev
```

### 7. Test Upload
1. Run the app
2. Go to Edit Profile
3. Change your avatar
4. Save changes
5. Check Cloudinary dashboard → Media Library to see the uploaded image

## Verification

### Check Backend
```bash
# In solcial-backend directory
cat .env | grep CLOUDINARY
```

Should show:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=solcial_uploads
```

### Check Upload Preset
1. Go to Cloudinary dashboard
2. Settings → Upload → Upload presets
3. Find `solcial_uploads`
4. Verify "Signing Mode" is "Unsigned"

### Test API Endpoint
```bash
# Get auth token first (login to app)
TOKEN="your_jwt_token"

# Test upload
curl -X POST http://localhost:3000/api/upload/image \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"image":"data:image/jpeg;base64,/9j/4AAQSkZJRg..."}'
```

## Troubleshooting

### "Cloudinary configuration is missing"
- Check `.env` file has both variables
- Restart backend after updating `.env`
- Verify no typos in variable names

### "Failed to upload image to Cloudinary"
- Verify upload preset exists
- Check preset is "Unsigned"
- Verify cloud name is correct
- Check internet connection

### Images not displaying
- Check Cloudinary URL is valid
- Verify image is public
- Check browser console for errors

### Upload is slow
- Reduce image quality in ImagePicker
- Check internet speed
- Try smaller images

## Features Now Available

### Post Images
- Upload up to 4 images per post
- Images stored on Cloudinary CDN
- Fast loading from CDN
- Automatic optimization

### Profile Avatar
- Upload custom avatar
- Stored on Cloudinary
- Fast loading
- Automatic resizing

## Next Steps

1. Test creating posts with images
2. Test updating profile avatar
3. Monitor Cloudinary dashboard for uploads
4. Check storage usage
5. Optimize image quality if needed

## Support

### Cloudinary Documentation
- https://cloudinary.com/documentation
- https://cloudinary.com/documentation/upload_images

### Common Issues
- https://support.cloudinary.com

### Contact
- Cloudinary Support: support@cloudinary.com
- Free tier includes email support

## Summary

✅ Cloudinary account created
✅ Upload preset configured
✅ Backend environment updated
✅ Frontend dependency installed
✅ Ready to upload images!

Your app now uses Cloudinary for all image uploads!
