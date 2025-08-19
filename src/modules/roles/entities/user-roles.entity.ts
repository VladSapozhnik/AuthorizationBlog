import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Role } from './role.entity';

@Table({ createdAt: false, updatedAt: false })
export class UserRoles extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  userId: string;
  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
  })
  rolesId: string;
}
