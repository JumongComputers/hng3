import { Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({ tableName: 'users', modelName: 'User', timestamps: true })
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true, // Use primaryKey here
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
  phone?: string;

  @Column({
    type: DataType.UUID,
    unique: true,
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
