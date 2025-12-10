# Thông tin Rate Limiting & Tối ưu API

## Vấn đề đã fix

### 1. Backend Rate Limiting (server.js)
**Trước:**
- General API: 100 requests/15 phút → **Quá thấp, dễ bị spam**
- Auth API: 5 requests/15 phút → Quá ít cho development

**Sau:**
- General API: **500 requests/15 phút** ✅
- Auth API: **10 requests/15 phút** ✅
- Skip rate limit cho `/uploads` (static files)
- Skip rate limit cho `/auth/me` (user info fetch)

### 2. Frontend Caching (useSiteSettings.js)
**Đã thêm:**
- Cache 5 phút cho settings
- Kiểm tra cache trước khi gọi API
- Tránh gọi API trùng lặp khi đang loading
- Promise caching để tránh multiple concurrent calls

### 3. Setting Store Optimization (settingStore.js)
**Đã thêm:**
- Cache TTL: 5 phút
- Track `lastFetchTime` để tránh fetch liên tục
- Prevent duplicate requests với `loading` flag

### 4. Cart Store Optimization (cartStore.js)
**Đã thêm:**
- Debounce cho fetchCart (1 giây)
- Track lastFetchTime

## Cách hoạt động

### Settings API Call Flow:
```
Page load → useSiteSettings.loadSettings()
  ├─ Check cache (valid < 5 min) → Return cached ✅
  ├─ Check loading promise → Return existing promise ✅
  └─ Fetch from API → Cache result → Set expiry
```

### Best Practices đã áp dụng:

1. **Single Source of Truth**: MainLayout chỉ gọi `loadSettings()` một lần
2. **Cache Duration**: 5 phút cho public settings (ít thay đổi)
3. **Promise Caching**: Tránh duplicate requests khi nhiều component mount cùng lúc
4. **Rate Limit Skip**: Cho phép static files và auth/me bypass

## Monitoring Rate Limits

Backend sẽ trả về headers:
```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 499
X-RateLimit-Reset: 1702123456
```

## Nếu vẫn bị Rate Limited

1. **Kiểm tra console**: Xem có loop API calls không
2. **Xóa cache**: `localStorage.clear()` trong DevTools
3. **Restart backend**: `npm run dev` trong folder backend
4. **Tăng rate limit**: Edit `server.js` line 53, tăng `max` lên cao hơn

## Emergency Fix

Nếu cần disable rate limiting tạm thời (development only):

```javascript
// backend/server.js - Comment out these lines:
// app.use(API_PREFIX, generalLimiter);
// app.use(`${API_PREFIX}/auth/login`, authLimiter);
// app.use(`${API_PREFIX}/auth/register`, authLimiter);
```

⚠️ **Lưu ý**: Không disable rate limiting trên production!
