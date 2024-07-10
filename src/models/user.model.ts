import { DataTypes, Model } from 'sequelize';
import { baseConfig } from '../config/db-config';
import Organization from './organization.model'; // Import Organization model for association
import UserOrganization from './userOrganization.model';

class User extends Model {
    public userId!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public orgId?: string;

    // static associate(models: any) {
    //     User.belongsToMany(models.Organization, { through: models.UserOrganization });
    // }
}

User.init(
    {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orgId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        ...baseConfig,
        tableName: 'users',
    }
);


User.belongsToMany(Organization, { through: UserOrganization });
export default User;
