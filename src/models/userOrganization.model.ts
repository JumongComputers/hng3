import { DataTypes, Model } from 'sequelize';
import { baseConfig } from '../config/db-config';

class UserOrganization extends Model {
    public userId!: string;
    public orgId!: string;
}

UserOrganization.init(
    {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
        orgId: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'organizations',
                key: 'orgId',
            },
        },
    },
    {
        ...baseConfig,
        tableName: 'user_organizations',
    }
);

export default UserOrganization;
