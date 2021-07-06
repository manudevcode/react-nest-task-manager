import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UserModule, ProjectsModule]
})
export class RoutesModule {
}
