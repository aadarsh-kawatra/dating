import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  path: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    try {
      const res = await this.userService.getAllUsers();
      return {
        responseCode: 1,
        message: 'Success',
        data: res,
      };
    } catch (error) {
      return {
        responseCode: 0,
        message: 'Error',
        error: error.message || 'Failed to get all users',
      };
    }
  }
}
