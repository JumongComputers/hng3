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

@Table({ tableName: 'user_organizations' })
export default class UserOrganization extends Model<UserOrganization> {
  @Column({ allowNull: false, type: DataType.UUID })
  userId!: string;

  @Column({ allowNull: false, type: DataType.UUID })
  orgId!: string;

  
}
