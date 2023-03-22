import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PasswordAdminDto } from './dto/admin-password.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { user_name: createAdminDto.user_name },
    });
    if (admin) {
      throw new BadRequestException('Username allready exists');
    }
    if (createAdminDto.confirm_password !== createAdminDto.password) {
      throw new BadRequestException('Passwords not match');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(
      newAdmin.id,
      newAdmin.is_active,
      newAdmin.is_creator,
    );
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 60 * 60 * 24 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin registereted succesfulli',
      admin: updatedAdmin[1][0],
      tokens: tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({
      where: { email: email },
    });
    if (!admin) {
      throw new UnauthorizedException('Email or (password) is not match');
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      admin.hashed_password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password or (Email) is not match');
    }
    const tokens = await this.getTokens(
      admin.id,
      admin.is_active,
      admin.is_creator,
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );
    const response = {
      message: 'admin logged succesfully',
      admin: updatedAdmin[1][0],
      tokens: tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('admin not found');
    }
    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    res.clearCookie('refreshToken');
    const response = {
      message: 'admin logged out succesfully',
      admin: updateAdmin[1][0],
    };
    return response;
  }

  async getTokens(admin_id: number, is_active: boolean, is_creator: boolean) {
    const jwtPayload = {
      id: admin_id,
      is_active,
      is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(admin_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    if (admin_id !== decodedToken['id']) {
      throw new BadRequestException('Admin not found');
    }
    const admin = await this.adminRepo.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('admin not found');
    }
    const tokens = await this.getTokens(
      admin.id,
      admin.is_active,
      admin.is_creator,
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 60 * 60 * 24 * 1000,
      httpOnly: true,
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: admin.id }, returning: true },
    );
    const response = {
      message: 'admin refreshshed',
      admin: updatedAdmin[1][0],
      tokens: tokens,
    };
    return response;
  }

  async updateAdminPass(id: number, updateAdminPasswordDto: PasswordAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    const password = updateAdminPasswordDto.password;

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException('incorrect password');
    }
    if (
      updateAdminPasswordDto.confirm_password !==
      updateAdminPasswordDto.new_password
    ) {
      throw new BadRequestException('password is not match');
    }
    const hashed_password = await bcrypt.hash(
      updateAdminPasswordDto.new_password,
      7,
    );
    const updatedAdmin = await this.adminRepo.update(
      { hashed_password },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'Password updates succesfully',
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  findAll() {
    return this.adminRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    const updatedAdmin = await this.adminRepo.update(
      {
        ...updateAdminDto,
      },
      { where: { id }, returning: true },
    );

    const response = {
      message: 'admin updated',
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  async activate(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    const is_active = admin.is_active;
    if (is_active === true) {
      const updatedAdmin = await this.adminRepo.update(
        {
          is_active: false,
        },
        { where: { id }, returning: true },
      );
      const response = {
        message: 'admin deactivated',
        admin: updatedAdmin[1][0],
      };
      return response;
    } else {
      const updatedAdmin = await this.adminRepo.update(
        { is_active: true },
        { where: { id }, returning: true },
      );
      const response = {
        message: 'admin activated',
        admin: updatedAdmin[1][0],
      };
      return response;
    }
  }

  async creator(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    const is_creator = admin.is_creator;
    if (is_creator === true) {
      const updatedAdmin = await this.adminRepo.update(
        {
          is_creator: false,
        },
        { where: { id }, returning: true },
      );
      const response = {
        message: 'admin is not creator',
        admin: updatedAdmin[1][0],
      };
      return response;
    } else {
      const updatedAdmin = await this.adminRepo.update(
        { is_creator: true },
        { where: { id }, returning: true },
      );
      const response = {
        message: 'admin is creator',
        admin: updatedAdmin[1][0],
      };
      return response;
    }
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    await this.adminRepo.destroy({ where: { id } });
    const response = {
      message: 'admin deleted',
      admin: admin.id,
    };
    return response;
  }
}
