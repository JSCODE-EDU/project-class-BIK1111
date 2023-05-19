import { Injectable, NotFoundException} from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';
import { BoardRepository } from './board.repository';
import { GetBoardsByKeywordDto } from './dto/search-by-keyword-board';


@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository
    ) {}
    
    async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
        return await this.boardRepository.createBoard(createBoardDto);
    }
            

    async getAllBoards() : Promise<Board[]> {

        return this.boardRepository.getAllBoards();
    }

    async getBoardsByKeyword(getBoardsByKeywordDto : GetBoardsByKeywordDto) : Promise<Board[]> {

        return this.boardRepository.getBoardsByKeyword(getBoardsByKeywordDto);
    }
    
       
    async getBoardById(id : number) : Promise <Board> {

        return this.boardRepository.getBoardById(id)
    }


    async deleteBoard(id: number) : Promise <void> {

        return this.boardRepository.deleteBoard(id);

    }

    async updateBoard(id : number, editBoardDto : EditBoardDto) : Promise<Board> {

        return this.boardRepository.updateBoard(id, editBoardDto);

    }


}

