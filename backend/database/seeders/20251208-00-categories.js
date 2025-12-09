/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface) {
    // Demo data removed for production deployment
    // Add your production categories here if needed
    return Promise.resolve()
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', { slug: ['iphone','samsung','xiaomi','tablet','smartwatch','accessories'] })
  }
}

