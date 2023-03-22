import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {Response} from 'express'
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { PasswordAdminDto } from './dto/admin-password.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.registration(createAdminDto, res);
  }

  @Post('signin')
  login(
    @Body() loginAdminDto:LoginAdminDto,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.login(loginAdminDto, res);
  }

  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.logout(refreshToken, res);
  }

  @Post(':id/refresh')
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({ passthrough: true }) res: Response,) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @Post(':id/activate')
  activate(
    @Param('id') id: string,
  ) {
    return this.adminService.activate(+id);
  }

  @Patch(':id/password')
  updatedPassword(@Param('id') id: string, @Body() updateAdminPassDto:  PasswordAdminDto) {
    return this.adminService.updateAdminPass(+id, updateAdminPassDto);
  }

  @Post(':id/creator')
  creator(
    @Param('id') id: string,
  ) {
    return this.adminService.creator(+id);
  }


  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
