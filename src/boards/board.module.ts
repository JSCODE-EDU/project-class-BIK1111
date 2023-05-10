import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';


@Module({
    //Board가 아닌 BoardRepository import
    imports: [TypeOrmModule.forFeature([Board])

    ],
    controllers : [BoardsController],
    providers : [BoardsService, BoardRepository]
})
export class BoardsModule {}
