import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/models/admin.model';


@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('creator unauthorized');
    }
    const bear = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bear != 'Bearer' || !token) {
      throw new UnauthorizedException('creator unauthorized');
    }
    console.log(token);
    
    async function verify(token: string, jwtService: JwtService) {
      const creator: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!creator) {
        throw new UnauthorizedException('invalid token provided');
      }
      if (!creator.is_creator) {
        throw new BadRequestException('creator is not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
