import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  userId?: string; // Corrected to match DataType.UUID type
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null; // Nullable for soft delete
}

@Table({ tableName: 'users', modelName: 'User', timestamps: true })
export default class User extends Model<UserAttributes> implements UserAttributes {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  phone!: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  orgId?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;
}
