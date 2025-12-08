/* eslint-disable */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table if not exists
    let exists = true
    try { await queryInterface.describeTable('users') } catch (_) { exists = false }
    if (exists) return

    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      fullName: { type: Sequelize.STRING(100) },
      phone: { type: Sequelize.STRING(20) },
      role: { type: Sequelize.ENUM('admin', 'user'), defaultValue: 'user' },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    })
  },

  async down(queryInterface) {
    // Drop enum type first for Postgres; MySQL ignores
    await queryInterface.dropTable('users')
  }
}

