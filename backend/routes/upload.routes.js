const express = require('express');
const router = express.Router();
const path = require('path');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { handleUploadSingle, handleUploadMultiple, deleteFile } = require('../middleware/upload.middleware');

// Upload single image
router.post('/single', verifyToken, isAdmin, handleUploadSingle, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Resolve subdirectory based on destination path
        const relDir = path.relative(path.join(__dirname, '..'), req.file.destination).replace(/\\/g, '/');
        const fileUrl = `/${relDir}/${req.file.filename}`;

        res.json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                filename: req.file.filename,
                url: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
});

// Upload multiple images
router.post('/multiple', verifyToken, isAdmin, handleUploadMultiple, (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const relDir = req.files[0]
            ? path.relative(path.join(__dirname, '..'), req.files[0].destination).replace(/\\/g, '/')
            : 'uploads';

        const files = req.files.map(file => ({
            filename: file.filename,
            url: `/${relDir}/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype
        }));

        res.json({
            success: true,
            message: 'Files uploaded successfully',
            data: files
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading files',
            error: error.message
        });
    }
});

// Delete file
router.delete('/:filename', verifyToken, isAdmin, (req, res) => {
    try {
        const filename = req.params.filename;
        
        // Prevent directory traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid filename'
            });
        }

        deleteFile(`uploads/${filename}`);
        
        res.json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error.message
        });
    }
});

module.exports = router;

