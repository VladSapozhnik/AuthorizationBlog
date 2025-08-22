import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table
export class Post extends Model<Post> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  userId: string;
  @BelongsTo(() => User)
  author: User;
}
