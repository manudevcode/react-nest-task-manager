import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ModelsService } from 'src/models/models.service';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(private models: ModelsService, private jwtService: JwtService) {}

  /**
   * Create a hash from string
   * @param password String
   *
   * @returns hash String
   */
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * Compare string with a bcrypt hash
   * @param password String
   * @param hashedPassword String
   *
   * @returns result Boolean
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, hashedPassword);
      return result;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  /**
   * Create token for user
   * @param user User
   */
  async login(user: User) {
    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.models.UserModel.findOne({
      email: email,
    }).lean();

    const compare = await this.compare(password, user.password);
    if (user && compare) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
    return null;
  }
}
