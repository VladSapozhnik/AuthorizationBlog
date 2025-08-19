import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}
  async createRole(createRoleDto: CreateRoleDto) {
    const role: Role = await this.roleModel.findOne({
      where: {
        value: createRoleDto.value,
      },
    });

    if (role) {
      throw new ConflictException('Такая роль уже существует!');
    }

    return await this.roleModel.create(createRoleDto);
  }

  async getRoleByValue(value: string) {
    const role: Role = await this.roleModel.findOne({
      where: {
        value,
      },
    });

    if (!role) {
      throw new NotFoundException('Такой роли не существует!');
    }

    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
