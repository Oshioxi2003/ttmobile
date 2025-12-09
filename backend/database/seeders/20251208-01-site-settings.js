/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const rows = [
      // Site info - Update these values for your production site
      { key: 'site_name', value: 'Your Site Name', type: 'text', group: 'site', description: 'Tên website', createdAt: now, updatedAt: now },
      { key: 'site_description', value: 'Your site description', type: 'text', group: 'site', description: 'Mô tả website', createdAt: now, updatedAt: now },
      { key: 'site_logo', value: '/images/logo.png', type: 'text', group: 'site', description: 'Logo website', createdAt: now, updatedAt: now },
      // Small banners - Update with your production banner URLs
      { key: 'small_banner_1', value: JSON.stringify({ imageUrl: '', linkUrl: '', title: '', isActive: false, openInNewTab: false }), type: 'json', group: 'site', description: 'Small Banner 1 (right side of hero)', createdAt: now, updatedAt: now },
      { key: 'small_banner_2', value: JSON.stringify({ imageUrl: '', linkUrl: '', title: '', isActive: false, openInNewTab: false }), type: 'json', group: 'site', description: 'Small Banner 2 (right side of hero)', createdAt: now, updatedAt: now },
      // Contact - Update with your actual contact information
      { key: 'contact_phone', value: '', type: 'text', group: 'contact', description: 'Số điện thoại liên hệ', createdAt: now, updatedAt: now },
      { key: 'contact_email', value: '', type: 'text', group: 'contact', description: 'Email liên hệ', createdAt: now, updatedAt: now },
      { key: 'contact_address', value: '', type: 'text', group: 'contact', description: 'Địa chỉ cửa hàng', createdAt: now, updatedAt: now },
      // Social / purchase - Update with your social media links
      { key: 'facebook_url', value: '', type: 'text', group: 'social', description: 'Link Facebook', createdAt: now, updatedAt: now },
      { key: 'facebook_name', value: '', type: 'text', group: 'social', description: 'Tên Facebook', createdAt: now, updatedAt: now },
      { key: 'zalo_phone', value: '', type: 'text', group: 'social', description: 'Số Zalo', createdAt: now, updatedAt: now },
      { key: 'zalo_url', value: '', type: 'text', group: 'social', description: 'Link Zalo', createdAt: now, updatedAt: now },
      { key: 'purchase_message', value: 'Để đặt mua sản phẩm, vui lòng liên hệ với chúng tôi!', type: 'text', group: 'purchase', description: 'Thông báo mua hàng', createdAt: now, updatedAt: now },
      { key: 'working_hours', value: '', type: 'text', group: 'contact', description: 'Giờ làm việc', createdAt: now, updatedAt: now }
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

