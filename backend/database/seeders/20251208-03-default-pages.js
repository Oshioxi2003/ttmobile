/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const pages = [
      {
        title: 'About',
        slug: 'about',
        content: JSON.stringify({
          time: Date.now(),
          blocks: [
            { type: 'header', data: { text: 'About T&T Mobile', level: 2 } },
            { type: 'paragraph', data: { text: 'Welcome to T&T Mobile — Genuine smartphones at the best prices.' } }
          ],
          version: '2.28.2'
        }),
        showInFooter: true,
        footerColumn: 'about',
        footerOrder: 1
      },
      {
        title: 'Refund Policy',
        slug: 'policies/refund-policy',
        content: JSON.stringify({
          time: Date.now(),
          blocks: [
            { type: 'header', data: { text: 'Refund & Return Policy', level: 2 } },
            { type: 'paragraph', data: { text: 'You can request a refund/return within 7 days if the product has a manufacturer defect.' } }
          ],
          version: '2.28.2'
        }),
        showInFooter: true,
        footerColumn: 'policy',
        footerOrder: 1
      }
    ]

    for (const p of pages) {
      const exists = await queryInterface.rawSelect('pages', { where: { slug: p.slug } }, ['id'])
      if (!exists) {
        await queryInterface.bulkInsert('pages', [{ ...p, createdAt: now, updatedAt: now }])
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('pages', { slug: ['about', 'policies/refund-policy'] })
  }
}

