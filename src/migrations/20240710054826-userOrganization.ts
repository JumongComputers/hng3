import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('user_organizations', {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Define as primary key
        references: {
          model: 'users',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      orgId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Define as primary key
        references: {
          model: 'organizations',
          key: 'orgId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex('user_organizations', ['userId']);
    await queryInterface.addIndex('user_organizations', ['orgId']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('user_organizations');
  }
};
