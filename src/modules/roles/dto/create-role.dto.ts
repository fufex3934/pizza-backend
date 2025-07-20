import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Kitchen Manager', description: 'Role name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: { manage_orders: true, view_orders: true },
    description: 'Permissions object',
  })
  @IsNotEmpty()
  @IsObject()
  permissions: Record<string, boolean>;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  restaurantId: string;
}
