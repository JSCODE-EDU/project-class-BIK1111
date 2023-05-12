import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}