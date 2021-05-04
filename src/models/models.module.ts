import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.model';
import { ModelsService } from './models.service';
import { Project, ProjectSchema } from './project.model';
import { Tag } from './tag.model';
import { Task, TaskSchema } from './task.model';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Tag.name, schema: TaskSchema },
      { name: Comment.name, schema: CommentSchema },
    ])
  ],
  providers: [ModelsService],
  exports: [ModelsService] 
})
export class ModelsModule {}
