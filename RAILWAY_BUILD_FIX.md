# 🔧 Sửa lỗi Build trên Railway

## ❌ Lỗi gặp phải

```
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c cd ../backend && npm ci" did not complete successfully: exit code: 1
```

## ✅ Đã sửa

### 1. Cập nhật `package.json` scripts
- Sử dụng `npm ci --prefix` thay vì `cd` để đảm bảo working directory đúng
- Script `install:all` giờ chạy từ root directory

### 2. Cập nhật cấu hình Railway
- `railway.json` - Đơn giản hóa, để Nixpacks tự detect
- `railway.toml` - Sử dụng `npm start` từ root
- `nixpacks.toml` - Sử dụng npm scripts từ root
- `Procfile` - Sử dụng `npm start` từ root

## 📋 Các file đã được cập nhật

1. ✅ `package.json` - Script `install:all` sử dụng `--prefix`
2. ✅ `railway.json` - Đơn giản hóa build config
3. ✅ `railway.toml` - Sử dụng npm scripts
4. ✅ `nixpacks.toml` - Sử dụng npm scripts
5. ✅ `Procfile` - Sử dụng npm start

## 🚀 Cách hoạt động mới

### Build Process:
1. Railway detect Node.js project từ root `package.json`
2. Chạy `npm run install:all` (install cả frontend và backend)
3. Chạy `npm run build` (build frontend)
4. Chạy `npm start` (start backend server)

### Scripts trong `package.json`:
```json
{
  "install:all": "npm ci --prefix frontend && npm ci --prefix backend",
  "build": "cd frontend && npm ci && npm run build",
  "start": "cd backend && npm ci && npm start"
}
```

## ✅ Kiểm tra

Sau khi commit và push, Railway sẽ:
1. ✅ Install dependencies cho cả frontend và backend
2. ✅ Build frontend thành công
3. ✅ Start backend server

## 🔄 Nếu vẫn gặp lỗi

1. **Kiểm tra Railway logs** để xem lỗi cụ thể
2. **Đảm bảo** `package.json` ở root directory
3. **Kiểm tra** Node.js version (>= 18.0.0)
4. **Xóa cache** trên Railway và rebuild

## 📝 Notes

- `npm ci --prefix` đảm bảo chạy từ root directory
- Tất cả scripts giờ chạy từ root, không phụ thuộc vào working directory
- Railway sẽ tự động detect và sử dụng `package.json` ở root

