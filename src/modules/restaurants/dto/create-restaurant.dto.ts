import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Pizza Heaven', description: 'Restaurant name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Full address',
  })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @MinLength(10)
  @MaxLength(200)
  address: string;

  @ApiProperty({
    example: 'heaver@example.com',
    description: 'Email of Restaurant',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Authentic Italian pizza since 1990',
    description: 'Description',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'Logo URL',
    required: false,
  })
  @IsUrl()
  logo?: string;
}
