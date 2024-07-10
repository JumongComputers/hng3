import { DataTypes, Model } from 'sequelize';
import { baseConfig } from '../config/db-config';
import User from './user.model'; // Import User model for association
import UserOrganization from './userOrganization.model';

class Organization extends Model {
    public orgId!: string;
    public name!: string;
    public description!: string;

    // static associate(models: any) {
    //     Organization.belongsToMany(models.User, { through: models.UserOrganization });
    // }
}

Organization.init(
    {
        orgId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name is required',
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        ...baseConfig,
        tableName: 'organizations', // Correct table name
    }
);

Organization.belongsToMany(User, { through: UserOrganization });
export default Organization;
