import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
// import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@GetUser() user: User) {
    return this.userService.findById(user.id);
  }

  @Patch('profile')
  async updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Log để debug
    console.log('Updating user profile:', {
      userId: user.id,
      data: updateUserDto,
    });

    return this.userService.update(user.id, updateUserDto);
  }

  @Post('password')
  async updatePassword(
    @Req() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(req.user.id, updatePasswordDto);
  }

  @Delete()
  async deleteAccount(@Req() req) {
    return this.userService.delete(req.user.id);
  }
}
