import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';

import { UserModel } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userRepo: Model<UserModel>,
  ) {}

  public getAllUsers(): Promise<UserModel[]> {
    return this.findUsers();
  }

  private validateLoginPayload(user: LoginDto) {
    if (!user.email && !user.phone) {
      throw new Error('Either email or phone is required');
    }

    if (user.phone && !user.countryCode) {
      throw new Error('Country code is mandatory with phone');
    }
  }

  public async loginUsers(user: LoginDto): Promise<UserModel> {
    this.validateLoginPayload(user);

    let filter: RootFilterQuery<UserModel> = {};
    if (user.email) {
      filter = { ...filter, email: user.email };
    }
    if (user.phone) {
      filter = { ...filter, phone: user.phone, countryCode: user.countryCode };
    }

    const existingUser = await this.findUser(filter);
    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.addUser(user);
    if (newUser) {
      return newUser;
    }

    throw new Error('Something went wrong');
  }

  // ----------------------- Common DB services --------------------

  private findUsers(): Promise<UserModel[]> {
    return this.userRepo.find().exec();
  }

  private findUser(
    filter: RootFilterQuery<UserModel>,
  ): Promise<UserModel | null> {
    return this.userRepo.findOne(filter).exec();
  }

  private addUser(user: Partial<UserModel>): Promise<UserModel> {
    return this.userRepo.create(user);
  }
}
