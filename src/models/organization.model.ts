import { IOrganization } from './../types/index';
import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import UserOrganization from './userOrganization.model';
import { CreationAttributes } from 'sequelize';


interface OrganizatioAttribute {
  orgId?: string; // Corrected to match DataType.UUID type
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}





@Table({ tableName: 'organizations', modelName: 'Organization', timestamps: true })
export class Organization extends Model<OrganizatioAttribute> implements OrganizatioAttribute {
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
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  deletedAt?: Date

  @BelongsToMany(() => User, () => UserOrganization)
  users!: Array<User & { UserOrganization: UserOrganization }>;
}
