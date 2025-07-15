import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { ErrorCode } from 'src/common/constants/error.constants';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'src/common/interfaces/token-payload.interface';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
        ErrorCode.EMAIL_ALREADY_EXISTS,
      );
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({
      email: loginDto.email,
    });
    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
    return this.generateToken(user);
  }
  private generateToken(user: UserDocument): { accessToken: string } {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      type: user.type,
      restaurantId: user.restaurantId ? user.restaurantId.toString() : null,
      permissions: user.permissions || {},
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_SECRET_EXPIRES_IN'),
      }),
    };
  }
}
