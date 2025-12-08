const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads', 'uploads/products', 'uploads/banners', 'uploads/categories'];
uploadDirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'uploads/';

        // Determine upload folder based on route or query
        const q = req.query || {};
        const type = (q.type || q.folder || '').toString().toLowerCase();

        if (req.baseUrl.includes('products') || type === 'product' || type === 'products' || (req.originalUrl && req.originalUrl.includes('/upload/products'))) {
            uploadPath = 'uploads/products/';
        } else if (req.baseUrl.includes('banners') || type === 'banner' || type === 'banners' || (req.originalUrl && req.originalUrl.includes('/upload/banners'))) {
            uploadPath = 'uploads/banners/';
        } else if (req.baseUrl.includes('categories') || type === 'category' || type === 'categories' || (req.originalUrl && req.originalUrl.includes('/upload/categories'))) {
            uploadPath = 'uploads/categories/';
        }

        cb(null, path.join(__dirname, '..', uploadPath));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter for images
const imageFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'), false);
    }
};

// Create multer instances
const uploadSingle = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single('image');

const uploadMultiple = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
        files: 10 // Max 10 files
    }
}).array('images', 10);

// Middleware wrapper with error handling
const handleUploadSingle = (req, res, next) => {
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

const handleUploadMultiple = (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

// Delete file utility
const deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

module.exports = {
    handleUploadSingle,
    handleUploadMultiple,
    deleteFile
};

