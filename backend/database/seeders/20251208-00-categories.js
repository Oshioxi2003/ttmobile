/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const categories = [
      { name: 'iPhone', slug: 'iphone', description: 'Điện thoại iPhone chính hãng', sortOrder: 1 },
      { name: 'Samsung', slug: 'samsung', description: 'Điện thoại Samsung chính hãng', sortOrder: 2 },
      { name: 'Xiaomi', slug: 'xiaomi', description: 'Điện thoại Xiaomi chính hãng', sortOrder: 3 },
      { name: 'Máy tính bảng', slug: 'tablet', description: 'Máy tính bảng các loại', sortOrder: 4 },
      { name: 'Đồng hồ thông minh', slug: 'smartwatch', description: 'Đồng hồ thông minh', sortOrder: 5 },
      { name: 'Phụ kiện', slug: 'accessories', description: 'Phụ kiện điện thoại', sortOrder: 6 }
    ]
    for (const c of categories) {
      const exists = await queryInterface.rawSelect('categories', { where: { slug: c.slug } }, ['id'])
      if (!exists) {
        await queryInterface.bulkInsert('categories', [{ ...c, createdAt: now, updatedAt: now }])
      }
    }
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', { slug: ['iphone','samsung','xiaomi','tablet','smartwatch','accessories'] })
  }
}

