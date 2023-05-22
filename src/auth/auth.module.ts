import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports : [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy : 'jwt'}),
  JwtModule.register({
    secret : 'thisissecret',
    signOptions : {
      expiresIn : 60 * 60
    }
  }),],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}

