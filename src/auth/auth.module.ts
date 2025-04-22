import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret51',
      signOptions: {
        expiresIn: '3600',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'UsersRepository',
      useFactory: (dataSource: DataSource): UsersRepository => {
        return new UsersRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [AuthController],
  exports: ['UsersRepository', JwtStrategy, PassportModule],
})
export class AuthModule {}
