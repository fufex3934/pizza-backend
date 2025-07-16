import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToppingDto {
  @ApiProperty({ example: 'Mozzarella', description: 'Topping name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 1.5,
    description: 'Additional price for this topping',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '60c72b2f9b1d8b3a1c8e4f66', required: false })
  restaurantId?: string;
}
