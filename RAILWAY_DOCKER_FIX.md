# 🔧 Sửa lỗi Build với Dockerfile

## ❌ Vấn đề

Railway đang tự động tạo Dockerfile và gặp lỗi:
```
cd ../backend: No such file or directory
```

## ✅ Giải pháp

Đã tạo **Dockerfile tùy chỉnh** để kiểm soát hoàn toàn quá trình build.

## 📁 Files mới

### 1. `Dockerfile`
- Build image từ Node.js 18 Alpine
- Install dependencies cho cả frontend và backend
- Build frontend
- Start backend server

### 2. `.dockerignore`
- Loại trừ các file không cần thiết khỏi Docker build
- Giảm kích thước image và tăng tốc build

### 3. Cập nhật `railway.toml`
- Chuyển từ NIXPACKS sang DOCKERFILE builder
- Railway sẽ sử dụng Dockerfile tùy chỉnh

## 🚀 Build Process

1. **Copy package files** → Cache dependencies
2. **Install dependencies** → `npm ci` cho cả frontend và backend
3. **Copy source code** → Copy toàn bộ project
4. **Build frontend** → `npm run build` trong frontend
5. **Start backend** → `node server.js` trong backend

## ✅ Kiểm tra

Sau khi commit và push:
1. Railway sẽ detect Dockerfile
2. Build sẽ chạy theo đúng thứ tự
3. Không còn lỗi `cd ../backend`

## 📝 Notes

- Dockerfile sử dụng multi-stage approach để tối ưu cache
- Dependencies được install trước khi copy source code (tận dụng Docker layer caching)
- Backend server chạy trực tiếp với `node server.js` (không cần `npm ci` lại)

## 🔄 Nếu vẫn gặp lỗi

1. Kiểm tra Railway logs để xem lỗi cụ thể
2. Đảm bảo Dockerfile ở root directory
3. Kiểm tra `.dockerignore` không loại trừ file cần thiết
4. Thử rebuild trên Railway

