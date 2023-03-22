import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('user unauthorized');
    }
    const bear = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bear != 'Bearer' || !token) {
      throw new UnauthorizedException('User unauthorized');
    }
    console.log(token);
    
    async function verify(token: string, jwtService: JwtService) {
      const user: Partial<User> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!user) {
        throw new UnauthorizedException('invalid token provided');
      }
      if (!user.is_active) {
        throw new BadRequestException('user is not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
