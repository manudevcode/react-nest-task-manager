import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ModelsService } from 'src/models/models.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/services/auth/guards/local-auth.guard';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private modelsService: ModelsService,
    private authService: AuthService,
  ) {}

  @Post()
  async createAccount(
    @Req() req: any,
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      const { password, ...userData } = body;
      const hashedPassword = await this.authService.encryptPassword(password);

      const user = new this.modelsService.UserModel({
        ...userData,
        password: hashedPassword,
      });

      const token = await this.authService.login(userData);

      const {
        _doc: { password: _, ...userCreated },
      }: any = await user.save();

      res.status(HttpStatus.CREATED).send({
        userCreated,
        token,
      });
    } catch (error) {
      console.log(
        'Log at ~ file: user.controller.ts ~ line 16 ~ UserController ~ createAccount ~ error',
        error,
      );
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async auth(@Req() req: any, @Body() body: any, @Res() res: Response) {
    try {
      const userData = req.user;
      const token = await this.authService.login(req.user);
      res.status(HttpStatus.OK).send({ userData, ...token });
    } catch (error) {}
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Req() req: any, @Res() res: Response) {
    res.send(req.user);
  }
}
