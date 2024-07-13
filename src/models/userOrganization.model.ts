// import { IUser } from './../types/index';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
// import User from './user.model'; // Adjust the path to your User model file
// import {Organization} from './organization.model'; // Adjust the path to your Organization model file


interface UserOrganizationAttributes {
  userId?: string; // Corrected to match DataType.UUID type
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}




@Table({ tableName: 'user_organizations' })
export default class UserOrganization extends Model<UserOrganizationAttributes> implements UserOrganizationAttributes{
  @Column({ allowNull: false, type: DataType.UUID })
  userId!: string;

  @Column({ allowNull: false, type: DataType.UUID })
  orgId!: string;

  
}
