import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userRepo: Model<UserModel>,
  ) {}

  public getAllUsers(): Promise<UserModel[]> {
    return this.userRepo.find().exec();
  }
}
