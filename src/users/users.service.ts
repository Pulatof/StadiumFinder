import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { response, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4, v4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { BotService } from 'src/bot/bot.service';
import { AddMinutesToDate } from 'src/helpers/addMinutes';
import { Otp } from 'src/otp/models/otp.model';
import { Op } from 'sequelize';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { dates, decode, encode } from 'src/helpers/crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });
    if (user) {
      throw new BadRequestException('This user already exists');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords is not match');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(
      newUser.id,
      newUser.is_active,
      newUser.is_owner,
    );

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User password is not match');
    }
    const tokens = await this.getTokens(user.id, user.is_active, user.is_owner);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out succesfully',
      user: updatedUser[1][0],
    };
    return response;
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found');
    }
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user.id, user.is_active, user.is_owner);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async updatePassword(user_id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found');
    }
    const isMatchPass = await bcrypt.compare(
      updatePasswordDto.password,
      user.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('User password is not match');
    }
    if (updatePasswordDto.new_password != updatePasswordDto.confirm_password) {
      throw new BadRequestException('password is not matched');
    }
    const hashed_password = await bcrypt.hash(
      updatePasswordDto.new_password,
      7,
    );

    const updatedUser = await this.userRepo.update(
      { hashed_password: hashed_password },
      { where: { id: user.id }, returning: true },
    );
    const response = {
      message: 'Password updated',
      user: updatedUser[1][0],
    };
    return response;
  }

  async getTokens(user_id: number, is_active: boolean, is_owner: boolean) {
    const jwtPayload = {
      id: user_id,
      is_active,
      is_owner,
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

  findAll() {
    return this.userRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return user;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      { ...updateUserDto },
      {
        where: { id: user_id },
        returning: true,
      },
    );
    const response = {
      message: 'User updated successfully',
      user: updatedUser[1][0],
    };
    return response;
  }

  async activate(link: string) {
    const updatedUser = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    const response = {
      message: 'User activated succesfully',
      user: updatedUser,
    };
    return response;
  }

  async deactivate(id: number) {
    const user = await this.userRepo.findOne({
      where: { id, is_active: true },
    });
    if (!user) {
      throw new BadRequestException('User not found or not active');
    }
    const updatedUser = await this.userRepo.update(
      { is_active: false },
      { where: { id, is_active: true }, returning: true },
    );
    const response = {
      message: 'User deactivated successfully',
      user: updatedUser,
    };
    return response;
  }
  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepo.destroy({ where: { id } });
    const response = {
      message: 'user deleted',
      UserID: id,
    };
    return response;
  }

  async newOTP(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend) {
      throw new HttpException('Botdan royxatdan oting', HttpStatus.BAD_REQUEST);
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { [Op.and]: [{ check: phone_number }, { verify: false }] },
    });
    const newOtp = await this.otpRepo.create({
      id: v4(),
      otp: otp,
      expiration_time,
      check: phone_number,
    });
    const details = {
      timestamp: now,
      chek: phone_number,
      success: true,
      message: 'OTP sent to user',
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    console.log(encode)
    return { status: 'Success', Details: encoded };

  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, check } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if (!check_obj) {
      throw new BadRequestException('Otp bu raqamga yuborilmagan');
    }
    const result = await this.otpRepo.findOne({
      where: { id: obj.otp_id },
    });
    if (result != null) {
      if (!result.verify) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const updatedUser = await this.userRepo.update(
              { is_owner: true },
              { where: { phone: check }, returning: true },
            );
            const user = updatedUser[1][0];
            const tokens = await this.getTokens(
              user.id,
              user.is_active,
              user.is_owner,
            );
            res.cookie('refresh_token', tokens.refresh_token, {
              maxAge: 15 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            const hashed_refresh_token = await bcrypt.hash(
              tokens.refresh_token,
              7,
            );
            const newUpdatedUser = await this.userRepo.update(
              { hashed_refresh_token: hashed_refresh_token },
              { where: { id: user.id } },
            );
            console.log(newUpdatedUser);
            const response = {
              message:
                'Tabriklaymiz, egani faollashtirish muvaffaqqiyatli yakunlandi',
              owner: newUpdatedUser,
              tokens: tokens,
            };
            return response;
          } else {
            throw new BadRequestException('Otp is not match');
          }
        } else {
          throw new BadRequestException('Otp expired');
        }
      } else {
        throw new BadRequestException('Otp already user');
      }
    } else {
      throw new BadRequestException("Bunday foydalanuvchi yo'q");
    }
  }
//   async verifyOtp(
//     verifyOtpDto: VerifyOtpDto,
//     // headers: { 'user-agent': string },
//     res: Response,
//   ) {
//     const { verification_key, otp, check } = verifyOtpDto;
//     const currentdate = new Date();
//     const decoded = await decode(verification_key);
//     const obj = JSON.parse(decoded);
//     const check_obj = obj.check;
//     if (check_obj != check) {
//       throw new BadRequestException('OTP bu raqamga yuborilmagan');
//     }
//     const result = await this.otpRepo.findOne({
//       where: { id: obj.otp_id },
//     });
//     if (result != null) {
//       if (!result.verify) {
//         if (dates.compare(result.expiration_time, currentdate)) {
//           if (otp === result.otp) {
//             const user = await this.userRepo.findOne({
//               where: { phone: check },
//             });
//             if (!user) {
//               const newUser = await this.userRepo.create({
//                 phone: check,
//               });
//               const tokens = await this.getTokens(newUser.id, true, true);
//               res.cookie('refresh_token', tokens.refresh_token, {
//                 maxAge: 15 * 24 * 60 * 60 * 1000,
//                 httpOnly: true,
//               });
//               const hashed_refresh_token = await bcrypt.hash(
//                 tokens.refresh_token,
//                 7,
//               );

//               const updatedUser = await this.userRepo.update(
//                 { hashed_refresh_token: hashed_refresh_token },
//                 { where: { id: newUser.id }, returning: true },
//               );
//               const response = {
//                 message: 'User created',
//                 user: updatedUser[1][0],
//                 tokens,
//               };
//               return response;
//             }
//           } else {
//             throw new BadRequestException('Otp is not match');
//           }
//         } else {
//           throw new BadRequestException('Otp expired');
//         }
//       } else {
//         throw new BadRequestException('Otp allready used');
//       }
//     } else {
//       throw new BadRequestException('Bunday foydalanuvchi yoq');
//     }
//   }
}

// async owner(id: number) {
//   const user = await this.userRepo.findOne({ where: { id: id } });
//   if (!user) {
//     throw new BadRequestException('User not found');
//   }
//   const is_owner = user.is_owner;
//   if (is_owner === true) {
//     const updatedUser = await this.userRepo.update(
//       {
//         is_owner: false,
//       },
//       { where: { id }, returning: true },
//     );
//     const response = {
//       message: 'user is not owner',
//       user: updatedUser[1][0],
//     };
//     return response;
//   } else {
//     const updatedUser = await this.userRepo.update(
//       { is_owner: true },
//       { where: { id }, returning: true },
//     );
//     const response = {
//       message: 'user is owner',
//       user: updatedUser[1][0],
//     };
//     return response;
//   }
// }

//   async remove(id: number) {
//     const user = await this.userRepo.findOne({ where: { id: id } });
//     if (!user) {
//       throw new BadRequestException('User not found');
//     }
//     await this.userRepo.destroy({ where: { id } });
//     const response = {
//       message: 'user deleted',
//       UserID: id,
//     };
//     return response;
//   }
// }
