/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    // Demo pages removed for production deployment
    // Add your production pages here if needed
    return Promise.resolve()
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('pages', { slug: ['about', 'policies/refund-policy'] })
  }
}

