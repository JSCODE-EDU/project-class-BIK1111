import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
    //Board가 아닌 BoardRepository import
    imports: [TypeOrmModule.forFeature([Board]),
    AuthModule

    ],
    controllers : [BoardsController],
    providers : [BoardsService, BoardRepository]
})
export class BoardsModule {}
