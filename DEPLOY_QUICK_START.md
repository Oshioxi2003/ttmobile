# 🚀 Quick Start - Deploy lên Railway

## ⚡ 3 Bước nhanh

### 1️⃣ Kết nối Repository
- Vào https://railway.app
- Click "New Project" → "Deploy from GitHub repo"
- Chọn repo của bạn

### 2️⃣ Thêm MySQL Database
- Trong project, click "New" → "Database" → "MySQL"
- Railway tự động tạo database

### 3️⃣ Cấu hình Environment Variables

Vào tab "Variables" và thêm:

```env
NODE_ENV=production
PORT=3000
API_PREFIX=/api/v1

# Database (Railway tự động cung cấp)
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# JWT (tạo chuỗi ngẫu nhiên mạnh)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# CORS (sau khi có domain)
ALLOWED_ORIGINS=https://ttmobile-production.up.railway.app

# Database Options
DB_ALTER=false
SEED_DB=false
```

### 4️⃣ Deploy & Setup Database

Railway sẽ tự động build và deploy. Sau đó:

1. Vào "Settings" → "Networking" → "Generate Domain"
2. Cập nhật `ALLOWED_ORIGINS` với domain vừa tạo
3. Vào "Shell" và chạy:
   ```bash
   cd backend
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

### ✅ Xong!

Truy cập domain Railway của bạn để xem website!

---

## 📝 Lưu ý quan trọng

- ✅ Frontend sẽ tự động build trong quá trình deploy
- ✅ Backend sẽ serve cả API và frontend
- ✅ Database migrations cần chạy thủ công lần đầu
- ⚠️ Upload files sẽ mất khi redeploy (nên dùng S3/Cloudinary)

## 🔗 Xem hướng dẫn chi tiết

Xem file `RAILWAY_DEPLOY.md` để biết thêm chi tiết và troubleshooting.

