# Hướng dẫn Deploy lên Railway.com

## 📋 Yêu cầu

1. Tài khoản Railway.com (đăng ký tại https://railway.app)
2. Database MySQL (có thể dùng Railway MySQL plugin hoặc external database)
3. Git repository (GitHub, GitLab, hoặc Bitbucket)

## 🚀 Các bước deploy

### Bước 1: Chuẩn bị Database

1. Tạo MySQL database trên Railway:
   - Vào Railway dashboard
   - Click "New Project" → "Add Database" → "MySQL"
   - Railway sẽ tự động tạo database và cung cấp connection string

2. Hoặc sử dụng external database (PlanetScale, AWS RDS, etc.)

### Bước 2: Deploy Backend lên Railway

1. **Kết nối Repository:**
   - Vào Railway dashboard
   - Click "New Project"
   - Chọn "Deploy from GitHub repo" (hoặc GitLab/Bitbucket)
   - Chọn repository của bạn

2. **Cấu hình Environment Variables:**
   
   Vào tab "Variables" và thêm các biến sau:

   ```env
   # Server
   PORT=3000
   NODE_ENV=production
   API_PREFIX=/api/v1

   # Database (lấy từ Railway MySQL service)
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}

   # JWT Secret (tạo một chuỗi ngẫu nhiên mạnh)
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

   # CORS (thay bằng domain Railway của bạn)
   ALLOWED_ORIGINS=https://your-app-name.railway.app

   # Database Options
   DB_ALTER=false
   SEED_DB=false
   ```

3. **Cấu hình Build Settings:**
   - Railway sẽ tự động detect Node.js project
   - Build Command: `npm run build` (tự động build frontend)
   - Start Command: `npm start` (sẽ chạy từ Procfile)

4. **Deploy:**
   - Railway sẽ tự động build và deploy
   - Kiểm tra logs để đảm bảo không có lỗi

### Bước 3: Setup Database Schema

Sau khi deploy thành công, bạn cần chạy migrations:

1. **Option 1: Sử dụng Railway CLI**
   ```bash
   railway login
   railway link
   railway run cd backend && npx sequelize db:migrate
   railway run cd backend && npx sequelize db:seed:all
   ```

2. **Option 2: Sử dụng Railway Shell**
   - Vào service → Click "Shell"
   - Chạy:
     ```bash
     cd backend
     npx sequelize db:migrate
     npx sequelize db:seed:all
     ```

### Bước 4: Kiểm tra Deployment

1. Vào tab "Settings" → "Networking"
2. Click "Generate Domain" để tạo public URL
3. Truy cập URL để kiểm tra:
   - `https://your-app.railway.app/` - Frontend
   - `https://your-app.railway.app/api/v1` - API

## 🔧 Cấu hình bổ sung

### Custom Domain (Tùy chọn)

1. Vào "Settings" → "Networking"
2. Click "Custom Domain"
3. Thêm domain của bạn
4. Cập nhật DNS records theo hướng dẫn

### Environment Variables quan trọng

- `NODE_ENV=production` - Bắt buộc cho production
- `DB_ALTER=false` - Không nên để true trong production
- `ALLOWED_ORIGINS` - Phải khớp với domain Railway của bạn
- `JWT_SECRET` - Phải là chuỗi ngẫu nhiên mạnh (ít nhất 32 ký tự)

## 📁 File Structure cho Railway

```
T-T-Mobile/
├── railway.json          # Railway configuration
├── railway.toml          # Railway TOML config
├── Procfile              # Process file
├── package.json          # Root package.json với build scripts
├── backend/
│   ├── package.json
│   └── server.js         # Đã được cập nhật để serve frontend
└── frontend/
    ├── package.json
    └── dist/             # Sẽ được build tự động
```

## 🐛 Troubleshooting

### Lỗi Database Connection

- Kiểm tra environment variables đã đúng chưa
- Đảm bảo MySQL service đã được start
- Kiểm tra firewall rules

### Lỗi Build Frontend

- Kiểm tra logs trong Railway dashboard
- Đảm bảo Node.js version >= 18
- Kiểm tra `frontend/package.json` có đầy đủ dependencies

### Lỗi Static Files không load

- Đảm bảo `NODE_ENV=production`
- Kiểm tra `frontend/dist` đã được build chưa
- Xem logs để kiểm tra path

### Lỗi CORS

- Cập nhật `ALLOWED_ORIGINS` với đúng domain Railway
- Đảm bảo không có trailing slash

## 📝 Notes

- Railway tự động detect Node.js và chạy build
- Frontend sẽ được build trong quá trình deploy
- Backend sẽ serve cả API và frontend static files
- Upload files sẽ được lưu trong Railway's ephemeral storage (mất khi redeploy)
- Nên sử dụng external storage (S3, Cloudinary) cho production

## 🔐 Security Checklist

- [ ] Đã đổi JWT_SECRET thành giá trị ngẫu nhiên mạnh
- [ ] DB_ALTER=false trong production
- [ ] ALLOWED_ORIGINS chỉ chứa domain hợp lệ
- [ ] Database credentials được bảo mật
- [ ] Không commit .env file vào Git

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Railway logs trong dashboard
2. Build logs
3. Environment variables
4. Database connection

