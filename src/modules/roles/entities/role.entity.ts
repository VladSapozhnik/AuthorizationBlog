import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { UserRoles } from './user-roles.entity';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
