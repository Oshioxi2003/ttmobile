/* eslint-disable */
'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const email = 'admin@ttmobile.com'
    const exists = await queryInterface.rawSelect('users', { where: { email } }, ['id'])
    if (!exists) {
      const passwordHash = await bcrypt.hash('admin123', 10)
      await queryInterface.bulkInsert('users', [
        {
          username: 'admin',
          email,
          password: passwordHash,
          fullName: 'Administrator',
          role: 'admin',
          isActive: true,
          createdAt: now,
          updatedAt: now
        }
      ])
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@ttmobile.com' })
  }
}

