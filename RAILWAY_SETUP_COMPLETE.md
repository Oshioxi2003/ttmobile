# ✅ Railway Deployment Setup - Hoàn tất

## 📦 Các file đã được tạo/cập nhật

### ✅ Files mới được tạo:
1. **`railway.json`** - Railway configuration (JSON format)
2. **`railway.toml`** - Railway configuration (TOML format - ưu tiên)
3. **`nixpacks.toml`** - Nixpacks build configuration
4. **`Procfile`** - Process file cho Railway
5. **`package.json`** (root) - Build scripts cho toàn bộ project
6. **`RAILWAY_DEPLOY.md`** - Hướng dẫn deploy chi tiết
7. **`DEPLOY_QUICK_START.md`** - Hướng dẫn nhanh 3 bước

### ✅ Files đã được cập nhật:
1. **`backend/server.js`** - Đã thêm logic serve frontend static files trong production

## 🎯 Cấu trúc Deployment

```
Railway Service
├── Build Phase:
│   └── npm run build (build frontend)
│
└── Start Phase:
    └── cd backend && npm start (start backend server)
        └── Backend serve:
            ├── /api/v1/* → API routes
            ├── /uploads/* → Static uploads
            └── /* → Frontend static files (production only)
```

## 🚀 Bước tiếp theo

### 1. Commit và Push code lên Git
```bash
git add .
git commit -m "Add Railway deployment configuration"
git push
```

### 2. Deploy trên Railway
- Xem hướng dẫn trong `DEPLOY_QUICK_START.md` (3 bước nhanh)
- Hoặc xem chi tiết trong `RAILWAY_DEPLOY.md`

### 3. Cấu hình Environment Variables
Quan trọng nhất:
- `NODE_ENV=production`
- Database credentials từ Railway MySQL
- `JWT_SECRET` (tạo chuỗi ngẫu nhiên mạnh)
- `ALLOWED_ORIGINS` (sau khi có domain)

### 4. Setup Database
Sau khi deploy, chạy migrations:
```bash
cd backend
npx sequelize db:migrate
npx sequelize db:seed:all
```

## 📋 Checklist trước khi deploy

- [x] Railway configuration files đã được tạo
- [x] Backend server đã được cập nhật để serve frontend
- [x] Build scripts đã được thiết lập
- [ ] Code đã được commit và push lên Git
- [ ] Railway project đã được tạo
- [ ] MySQL database đã được thêm vào Railway project
- [ ] Environment variables đã được cấu hình
- [ ] Database migrations đã được chạy

## 🔧 Cấu hình quan trọng

### Build Process
- Railway sẽ tự động detect Node.js project
- Build command: `npm run build` (build frontend)
- Start command: `cd backend && npm start` (start backend)

### Environment Variables cần thiết
```env
NODE_ENV=production
PORT=3000
API_PREFIX=/api/v1

# Database (từ Railway MySQL)
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# JWT
JWT_SECRET=your-secret-key

# CORS
ALLOWED_ORIGINS=https://your-app.railway.app
```

## 📝 Notes

1. **Frontend Build**: Tự động build trong quá trình deploy
2. **Static Files**: Frontend được serve từ `frontend/dist` trong production
3. **API Routes**: Vẫn hoạt động bình thường qua `/api/v1`
4. **Upload Files**: Lưu trong ephemeral storage (mất khi redeploy)
5. **Database**: Cần chạy migrations thủ công lần đầu

## 🐛 Troubleshooting

Nếu gặp lỗi, kiểm tra:
1. Railway build logs
2. Railway deploy logs  
3. Environment variables
4. Database connection
5. Xem `RAILWAY_DEPLOY.md` phần Troubleshooting

## 📚 Tài liệu tham khảo

- `DEPLOY_QUICK_START.md` - Hướng dẫn nhanh
- `RAILWAY_DEPLOY.md` - Hướng dẫn chi tiết
- Railway Docs: https://docs.railway.app

---

**Status**: ✅ Ready to Deploy
**Next Step**: Follow `DEPLOY_QUICK_START.md`

