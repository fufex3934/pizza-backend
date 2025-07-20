import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { ErrorCode } from 'src/common/constants/error.constants';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name,
      restaurantId: createRoleDto.restaurantId,
    });

    if (existingRole) {
      throw new ConflictException(
        'Role with this name already exists',
        ErrorCode.CONFLICT,
      );
    }
    const role = new this.roleModel(createRoleDto);
    return role.save();
  }

  async findAllByRestaurant(restaurantId: string): Promise<Role[]> {
    return this.roleModel.find({ restaurantId }).exec();
  }

  async findOne(id: string, restaurantId: string): Promise<Role> {
    const role = await this.roleModel
      .findOne({
        _id: id,
        restaurantId,
      })
      .exec();
    if (!role) {
      throw new NotFoundException(
        'Role not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return role;
  }

  async getDefaultRoles(restaurantId: string): Promise<Role[]> {
    return this.roleModel.find({ restaurantId, isDefault: true }).exec();
  }
}
