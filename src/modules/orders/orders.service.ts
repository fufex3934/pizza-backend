import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { PizzasService } from '../pizzas/pizzas.service';
import { ToppingsService } from '../toppings/toppings.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ErrorCode } from 'src/common/constants/error.constants';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private pizzasService: PizzasService,
    private toppingsService: ToppingsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const pizza = await this.pizzasService.findOne(
      createOrderDto.pizzaId,
      createOrderDto.restaurantId,
    );

    if ((createOrderDto.additionalToppingIds?.length ?? 0) > 0) {
      await this.pizzasService.validateToppings(
        createOrderDto.restaurantId,
        createOrderDto.additionalToppingIds ?? [],
      );
    }
    const additionalToppings = await this.toppingsService.findByIds(
      createOrderDto.additionalToppingIds ?? [],
    );

    const additionalToppingsPrice = additionalToppings.reduce(
      (sum, topping) => sum + topping.price,
      0,
    );
    const totalPrice = pizza.basePrice + additionalToppingsPrice;

    const order = new this.orderModel({
      ...createOrderDto,
      totalPrice,
    });
    return order.save();
  }

  async findAllByCustomer(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ customerId }).exec();
  }

  async findAllByRestaurant(restaurantId: string): Promise<Order[]> {
    return this.orderModel.find({ restaurantId }).exec();
  }

  async updateStatus(
    orderId: string,
    restaurantId: string,
    status: string,
  ): Promise<Order> {
    const order = await this.orderModel
      .findOneAndUpdate(
        { _id: orderId, restaurantId },
        { status },
        { new: true },
      )
      .exec();

    if (!order) {
      throw new NotFoundException(
        'Order not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return order;
  }
}
