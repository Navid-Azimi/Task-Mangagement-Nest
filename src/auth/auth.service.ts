import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(@Inject('UsersRepository') private usersRepo: UsersRepository) {}
}
