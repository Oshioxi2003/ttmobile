/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const rows = [
      // Site info
      { key: 'site_name', value: 'T&T Mobile', type: 'text', group: 'site', description: 'Tên website', createdAt: now, updatedAt: now },
      { key: 'site_description', value: 'Điện thoại chính hãng - Uy tín - Chất lượng', type: 'text', group: 'site', description: 'Mô tả website', createdAt: now, updatedAt: now },
      { key: 'site_logo', value: '/images/logo.png', type: 'text', group: 'site', description: 'Logo website', createdAt: now, updatedAt: now },
      // Small banners (stored as JSON string)
      { key: 'small_banner_1', value: JSON.stringify({ imageUrl: '/images/banners/hero-right-1.webp', linkUrl: '/products?brand=Apple', title: 'Ưu đãi iPhone', isActive: true, openInNewTab: false }), type: 'json', group: 'site', description: 'Small Banner 1 (right side of hero)', createdAt: now, updatedAt: now },
      { key: 'small_banner_2', value: JSON.stringify({ imageUrl: '/images/banners/hero-right-2.webp', linkUrl: 'https://zalo.me/your-number', title: 'Chat Zalo nhận tư vấn', isActive: true, openInNewTab: true }), type: 'json', group: 'site', description: 'Small Banner 2 (right side of hero)', createdAt: now, updatedAt: now },
      // Contact
      { key: 'contact_phone', value: '0123-456-789', type: 'text', group: 'contact', description: 'Số điện thoại liên hệ', createdAt: now, updatedAt: now },
      { key: 'contact_email', value: 'info@ttmobile.com', type: 'text', group: 'contact', description: 'Email liên hệ', createdAt: now, updatedAt: now },
      { key: 'contact_address', value: 'Việt Nam', type: 'text', group: 'contact', description: 'Địa chỉ cửa hàng', createdAt: now, updatedAt: now },
      // Social / purchase
      { key: 'facebook_url', value: 'https://facebook.com/ttmobile', type: 'text', group: 'social', description: 'Link Facebook', createdAt: now, updatedAt: now },
      { key: 'facebook_name', value: 'T&T Mobile', type: 'text', group: 'social', description: 'Tên Facebook', createdAt: now, updatedAt: now },
      { key: 'zalo_phone', value: '0123456789', type: 'text', group: 'social', description: 'Số Zalo', createdAt: now, updatedAt: now },
      { key: 'zalo_url', value: 'https://zalo.me/0123456789', type: 'text', group: 'social', description: 'Link Zalo', createdAt: now, updatedAt: now },
      { key: 'purchase_message', value: 'Để đặt mua sản phẩm, vui lòng liên hệ với chúng tôi qua Facebook hoặc Zalo để được tư vấn và báo giá tốt nhất!', type: 'text', group: 'purchase', description: 'Thông báo mua hàng', createdAt: now, updatedAt: now },
      { key: 'working_hours', value: '8:00 - 22:00 (Thứ 2 - Chủ nhật)', type: 'text', group: 'contact', description: 'Giờ làm việc', createdAt: now, updatedAt: now }
    ]
    // Insert only missing keys
    for (const row of rows) {
      const exists = await queryInterface.rawSelect('settings', { where: { key: row.key } }, ['id'])
      if (!exists) {
        await queryInterface.bulkInsert('settings', [row])
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('settings', {
      key: [
        'site_name','site_description','site_logo','small_banner_1','small_banner_2',
        'contact_phone','contact_email','contact_address','facebook_url','facebook_name','zalo_phone','zalo_url','purchase_message','working_hours'
      ]
    })
  }
}

