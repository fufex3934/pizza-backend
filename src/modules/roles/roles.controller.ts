import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum } from 'src/common/constants/permissions.constants';
import { RoleResponseDto } from './dto/role-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @Roles(PermissionsEnum.MANAGE_ROLES)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: RoleResponseDto,
  })
  async create(
    @CurrentUser('restaurantId') restaurantId: string,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.create({
      ...createRoleDto,
      restaurantId,
    });
  }

  @Get()
  @Roles(PermissionsEnum.VIEW_ROLES)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all roles for currendt restaurant' })
  @ApiResponse({
    status: 200,
    description: 'List of roles',
    type: [RoleResponseDto],
  })
  async findAllByRestaurant(@CurrentUser('restaurantId') restaurantId: string) {
    return this.rolesService.findAllByRestaurant(restaurantId);
  }
}
