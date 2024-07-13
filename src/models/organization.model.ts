import { IOrganization } from './../types/index';
import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import UserOrganization from './userOrganization.model';
import { CreationAttributes } from 'sequelize';

@Table({ tableName: 'organizations', modelName: 'Organization', timestamps: true })
export class Organization extends Model<Organization> implements IOrganization {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  orgId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @BelongsToMany(() => User, () => UserOrganization)
  users!: Array<User & { UserOrganization: UserOrganization }>;
}
