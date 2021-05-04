import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models/models.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/task-manager', {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    ModelsModule,
    RoutesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}