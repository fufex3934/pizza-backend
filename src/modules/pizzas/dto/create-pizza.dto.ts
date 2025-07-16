import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Margherita', description: 'Pizza name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Classic tomato and mozzarella',
    description: 'Pizza description',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 9.99, description: 'Base price' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  basePrice: number;

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Default topping IDs',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  defaultToppingIds?: string[];

  @ApiProperty({
    example: 'https://example.com/margherita.jpg',
    description: 'Image URL',
    required: false,
  })
  @IsString()
  image?: string;
}
