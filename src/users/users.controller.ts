import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'login User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'logout User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  @Post(':id/password')
  update_password(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Get('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(+id);
  }

  // @Post(':id/owner')
  // owner(@Param('id') id: string) {
  //   return this.usersService.owner(+id);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @UseGuards(UserGuard, AdminGuard)//l
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

@Post('/otp')//l
newOtp(@Body() phoneUserDto:PhoneUserDto){
  return this.usersService.newOTP(phoneUserDto)
}

@Post('/verify')
verifyOtp(@Body() verifyOtpDto:VerifyOtpDto,
// @Req() req,
@Res({passthrough:true}) res:Response
){
  return this.usersService.verifyOtp(verifyOtpDto, res)
}

}
