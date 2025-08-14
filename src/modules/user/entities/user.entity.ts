import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.STRING })
  email: string;
  @Column({ type: DataType.STRING })
  password: string;
}
