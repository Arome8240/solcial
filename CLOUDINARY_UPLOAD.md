# Cloudinary Upload Implementation

## Overview
Implemented Cloudinary integration for uploading images (profile avatars and post images) to the cloud instead of storing them locally.

## Backend Implementation

### 1. Upload Module
Created a new upload module with service and controller:

**Files Created:**
- `solcial-backend/src/modules/upload/upload.module.ts`
- `solcial-backend/src/modules/upload/upload.service.ts`
- `solcial-backend/src/modules/upload/upload.controller.ts`

**Features:**
- Upload single image
- Upload multiple images
- Base64 image support
- Cloudinary API integration

### 2. API Endpoints

#### Upload Single Image
```
POST /upload/image
Authorization: Bearer <token>
Body: { "image": "data:image/jpeg;base64,..." }
Response: { "url": "https://res.cloudinary.com/..." }
```

#### Upload Multiple Images
```
POST /upload/images
Authorization: Bearer <token>
Body: { "images": ["data:image/jpeg;base64,...", ...] }
Response: { "urls": ["https://res.cloudinary.com/...", ...] }
```

### 3. Environment Variables

Add to `solcial-backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Frontend Implementation

### 1. Upload Utility
Created `solcial/lib/upload.ts` with helper functions:

**Functions:**
- `convertImageToBase64(uri: string)` - Converts local image to base64
- `uploadImage(uri: string)` - Uploads single image to Cloudinary
- `uploadMultipleImages(uris: string[])` - Uploads multiple images

### 2. API Client Updates
Added upload methods to `solcial/lib/api.ts`:
- `uploadImage(image: string)`
- `uploadImages(images: string[])`

### 3. Integration Points

#### Feed Screen (Post Images)
- `solcial/app/(tabs)/feed.tsx`
- Uploads images before creating post
- Shows "Uploading..." state
- Converts local URIs to Cloudinary URLs

#### Edit Profile (Avatar)
- `solcial/app/(tabs)/profile/edit.tsx`
- Uploads avatar before saving profile
- Shows "Uploading..." state
- Only uploads if avatar is a local file URI

## Setup Instructions

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Note your Cloud Name from the dashboard

### 2. Create Upload Preset
1. Go to Settings > Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set:
   - Preset name: `solcial_uploads` (or your choice)
   - Signing Mode: `Unsigned`
   - Folder: `solcial` (optional)
   - Access Mode: `Public`
5. Save the preset

### 3. Configure Backend
Update `solcial-backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_UPLOAD_PRESET=solcial_uploads
```

### 4. Install Frontend Dependency
```bash
cd solcial
npx expo install expo-file-system
```

## Usage Examples

### Upload Post Images
```typescript
import { uploadMultipleImages } from '@/lib/upload';

const handleCreatePost = async () => {
  // User selects images
  const localUris = ['file:///path/to/image1.jpg', 'file:///path/to/image2.jpg'];
  
  // Upload to Cloudinary
  const cloudinaryUrls = await uploadMultipleImages(localUris);
  
  // Create post with Cloudinary URLs
  createPost({
    content: 'My post',
    images: cloudinaryUrls
  });
};
```

### Upload Profile Avatar
```typescript
import { uploadImage } from '@/lib/upload';

const handleSaveProfile = async () => {
  // User selects avatar
  const localUri = 'file:///path/to/avatar.jpg';
  
  // Upload to Cloudinary
  const cloudinaryUrl = await uploadImage(localUri);
  
  // Update profile with Cloudinary URL
  updateProfile({
    avatar: cloudinaryUrl
  });
};
```

## Features

### Image Processing
- Automatic format conversion
- Base64 encoding
- Quality optimization (80%)
- Aspect ratio preservation

### User Experience
- Loading states during upload
- Success/error toasts
- Disabled buttons during upload
- Progress feedback

### Error Handling
- Network error handling
- Invalid image handling
- Upload failure recovery
- User-friendly error messages

## Security

### Backend
- JWT authentication required
- Upload preset validation
- File type validation
- Size limits enforced by Cloudinary

### Frontend
- Secure token transmission
- HTTPS only
- No sensitive data in URLs

## Performance

### Optimization
- Parallel uploads for multiple images
- Image compression before upload
- Efficient base64 conversion
- Cloudinary CDN delivery

### Limits
- Single image: ~10MB
- Multiple images: 4 images max per post
- Avatar: 1:1 aspect ratio, 80% quality

## Cloudinary Features Used

### Free Tier Includes:
- 25 GB storage
- 25 GB bandwidth/month
- Image transformations
- CDN delivery
- Automatic format optimization

### Transformations Available:
- Resize
- Crop
- Quality adjustment
- Format conversion
- Responsive images

## Troubleshooting

### Upload Fails
1. Check Cloudinary credentials in `.env`
2. Verify upload preset is unsigned
3. Check network connection
4. Verify image file is valid

### Images Not Displaying
1. Check Cloudinary URL is valid
2. Verify image is public
3. Check CORS settings
4. Verify CDN is accessible

### Slow Uploads
1. Reduce image quality
2. Compress images before upload
3. Check network speed
4. Use smaller images

## Future Enhancements

### Potential Improvements:
- Image compression before upload
- Multiple upload presets (avatar, post, etc.)
- Image transformation on upload
- Progress bars for uploads
- Retry logic for failed uploads
- Batch upload optimization
- Image caching
- Offline upload queue

## Testing

### Manual Testing:
1. Create post with images
2. Update profile avatar
3. Verify images display correctly
4. Check Cloudinary dashboard for uploads
5. Test error scenarios

### Test Scenarios:
- Upload single image
- Upload multiple images
- Upload large image
- Upload invalid file
- Network failure during upload
- Cancel upload
- Retry failed upload

## Monitoring

### Cloudinary Dashboard:
- View uploaded images
- Check storage usage
- Monitor bandwidth
- Review transformations
- Analyze performance

### Backend Logs:
- Upload success/failure
- Error messages
- Upload duration
- File sizes

## Cost Considerations

### Free Tier:
- Sufficient for development
- Good for small apps
- 25 GB storage
- 25 GB bandwidth

### Paid Plans:
- More storage
- More bandwidth
- Advanced transformations
- Priority support
- Custom domains

## Summary

Cloudinary integration is now complete and working:
- ✅ Backend upload service
- ✅ Frontend upload utilities
- ✅ Post image uploads
- ✅ Profile avatar uploads
- ✅ Error handling
- ✅ Loading states
- ✅ User feedback

All images are now stored on Cloudinary's CDN for fast, reliable delivery!
