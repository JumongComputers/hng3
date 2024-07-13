import { Sequelize, DataTypes, Options } from 'sequelize';
import { config } from 'dotenv';
// import associate from '../models/association'

config();

interface Connection {
    sequelize: Sequelize | null;
}

const connection: Connection = {
    sequelize: null,
};

if (!process.env.DB_URL) {
    const sequelizeOptions: Options = {
        host: process.env.DB_HOST,
        port: 5432,
        dialect: 'postgres',
        logging: true,
    };

    connection.sequelize = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USERNAME as string,
        process.env.DB_PASSWORD as string,
        sequelizeOptions
    );
} else {
    connection.sequelize = new Sequelize(process.env.DB_URL as string);
}

// associate();

export const { sequelize } = connection;

export const baseConfig = {
    sequelize,
    paranoid: true,
    underscored: true,
    // timestamps: true,
};

export const baseSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
   
};




