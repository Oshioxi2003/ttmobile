/* eslint-disable */
'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface) {
    // Demo admin user removed for production deployment
    // Create your admin user manually after deployment for security
    // Or uncomment and update the code below with your own credentials
    
    /*
    const now = new Date()
    const email = 'your-admin@email.com'
    const exists = await queryInterface.rawSelect('users', { where: { email } }, ['id'])
    if (!exists) {
      const passwordHash = await bcrypt.hash('your-secure-password', 10)
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
    */
    
    return Promise.resolve()
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@ttmobile.com' })
  }
}

