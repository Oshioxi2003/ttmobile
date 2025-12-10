# Logo Upload & Display Fix

## Vấn đề đã fix

### 🐛 Bug Description
- Upload logo thành công nhưng không hiển thị
- Logo path được lưu dạng relative (`/uploads/...`) 
- Frontend không resolve được full URL

### ✅ Solutions Applied

#### 1. Admin Settings.vue
**Cải tiến:**
- ✅ Thêm `resolveAssetUrl()` helper function
- ✅ Computed property `logoPreviewUrl` để preview
- ✅ Better UI: Preview box với border, placeholder icon
- ✅ File validation: Size < 2MB, image types only
- ✅ Error handling với fallback SVG placeholder
- ✅ User feedback: Alert sau khi upload thành công
- ✅ Console logging để debug

**Preview UI:**
```vue
<div class="relative w-20 h-20 border-2 border-gray-200 rounded-lg">
  <img :src="logoPreviewUrl" class="w-full h-full object-contain" />
</div>
```

**Validation:**
- Max file size: 2MB
- File type: image/* only
- Error messages tiếng Việt

#### 2. useSiteSettings.js
**Cải tiến:**
- ✅ Thêm `resolveAssetUrl()` helper
- ✅ Auto resolve logo path khi load từ API
- ✅ Handle cả absolute và relative URLs
- ✅ VITE_ASSET_BASE support

**Logic:**
```javascript
const resolveAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const baseUrl = import.meta.env.VITE_ASSET_BASE || window.location.origin
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}
```

## Cách hoạt động

### Upload Flow:
```
1. User chọn file → Validate (size, type)
2. Upload to /api/v1/upload/single
3. Backend trả về path: "/uploads/logo.png"
4. Frontend lưu vào form.site_logo
5. Preview hiển thị qua logoPreviewUrl (resolved)
6. Click "Lưu thay đổi" → Save to database
```

### Display Flow:
```
1. Load settings từ API
2. site_logo = "/uploads/logo.png"
3. resolveAssetUrl() → "http://localhost:3000/uploads/logo.png"
4. Hiển thị logo trên client
```

## Testing

### Test Upload:
1. Vào Admin → Settings
2. Click "Choose file" ở Logo
3. Chọn ảnh PNG/JPG (< 2MB)
4. Thấy preview ngay lập tức
5. Click "Lưu thay đổi"
6. Reload page → Logo vẫn hiển thị ✅

### Test Display:
1. Check logo ở Admin Settings → Should show ✅
2. Check logo ở Client Header → Should show ✅
3. Check logo responsive → Should scale properly ✅

### Test Error Cases:
1. Upload file > 2MB → Alert "Kích thước quá lớn" ✅
2. Upload non-image → Alert "Vui lòng chọn file ảnh" ✅
3. Upload failed → Alert with error message ✅
4. Invalid path → Fallback SVG placeholder ✅

## Environment Variables

Add to `.env` (optional):
```env
# Backend base URL for assets
VITE_ASSET_BASE=http://localhost:3000
```

If not set, uses `window.location.origin` (current domain).

## Backend Requirements

Backend should serve static files:
```javascript
// server.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

Upload endpoint should return:
```json
{
  "success": true,
  "data": {
    "url": "/uploads/filename.png"
  }
}
```

## File Structure

```
backend/
  uploads/
    logo.png          ← Uploaded files here
    
frontend/
  src/
    Admin/
      views/
        Settings.vue  ← Upload & preview
    composables/
      useSiteSettings.js ← Resolve URLs
```

## Common Issues

### Logo không hiển thị?
1. Check backend `/uploads` route hoạt động
2. Check file path trong database: `/uploads/...`
3. Check CORS settings cho static files
4. Check console logs: "Failed to load logo"

### Upload lỗi?
1. Check file size < 2MB
2. Check file type là image
3. Check backend upload route: `/api/v1/upload/single`
4. Check multer configuration

### Preview không ra?
1. Check `logoPreviewUrl` computed property
2. Check resolveAssetUrl logic
3. Check browser console for errors

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Security Notes
- File type validation client + server side
- File size limit enforced
- Sanitize filenames (multer)
- Store in safe directory (/uploads)
- No execute permissions on upload folder

## Performance
- Lazy load logo on client
- Cache resolved URLs
- Optimize image size before upload
- Use CDN for production (optional)

## Future Enhancements
- [ ] Image cropping tool
- [ ] Multiple logo variants (light/dark theme)
- [ ] Favicon upload
- [ ] Image optimization on upload
- [ ] Progress bar for upload
- [ ] Drag & drop support
