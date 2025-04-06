import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Log để debug
    console.log('JWT Auth Guard - Headers:', {
      auth: request.headers.authorization,
      cookies: request.headers.cookie,
    });

    // Thử method gốc
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (error) {
      console.error('JWT Auth Guard Error:', error.message);
      throw new UnauthorizedException('Invalid authentication credentials');
    }
  }
}
