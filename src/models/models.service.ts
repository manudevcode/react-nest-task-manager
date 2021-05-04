import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ){}

  get UserModel () { return this.userModel }
}
