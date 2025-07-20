import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Role ID' })
  id: string;

  @ApiProperty({ example: 'Kitchen Manager', description: 'Role name' })
  name: string;
  @ApiProperty({
    example: { manage_orders: true, view_orders: true },
    description: 'Permissions object',
  })
  permissions: Record<string, boolean>;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  restaurantId: string;

  @ApiProperty({
    example: false,
    description: 'Whether this is a default role',
  })
  isDefault: false;
}
