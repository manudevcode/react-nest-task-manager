import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ModelsModule } from 'src/models/models.module';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  imports: [ModelsModule, AuthModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
