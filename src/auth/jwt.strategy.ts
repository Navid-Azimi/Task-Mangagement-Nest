import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UsersRepository) private usersRepo: UsersRepository) {
    super({
      secretOrKey: 'secret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(Payload: JwtPayload): Promise<User | undefined> {
    console.log('JWT Payload:', Payload); // ✅ Log the JWT payload
    const { username } = Payload;
    console.log(username);
    const user = await this.usersRepo.repo.findOne({ where: { username } });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
