import { Injectable, NotFoundException} from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository
    ) {}
    
    async createBoard(createBoardDto : CreateBoardDto) :
    Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }


    // 유의점 : 해당 함수의 경우 리스트 안에 객체가 담겨있으므로 타입 지정시 Board'[]' 형태로 지정
    // 'board'는 릴레이션 명
    // createQueryBuilder => 해당 테이블에 조건을 주기 위한 쿼리 생성
    async getAllBoards() : Promise<Board[]> {
        
        const query = this.boardRepository.createQueryBuilder('board')
        query.limit(100)
        query.orderBy('board.createdAt', 'DESC');

        const boards = await query.getMany();

        return boards;
    }
       
    async getBoardById(id : number) : Promise <Board> {
        //findOne(id) 로만 하면 안됨 why?
        const board = await this.boardRepository.findOne({ where: { id } });
        
        if(!board) throw new NotFoundException(`Does not exist the board with id ${id}`)

        return board
    }

    async getBoardsByKeyword(keyword : string) : Promise<Board[]> {

        const query = this.boardRepository.createQueryBuilder('board')
        query.where('board.title LIKE :keyword', { keyword: `%${keyword}%` })
        query.limit(100)
        query.orderBy('board.createdAt', 'DESC');
        
        const boards = await query.getMany();

        if(boards.length === 0) throw new NotFoundException(`Does not exist the board with the keyword ${keyword}`)

        return boards;
    }
       

    async deleteBoard(id: number) : Promise <void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0 ) {
            throw new NotFoundException(`Does not exist the board with id ${id}`)
        }
    }

    async updateBoard(id : number, dto: EditBoardDto) : Promise<Board> {

        const board = await this.getBoardById(id)
    
        board.title = dto.title;
        board.description = dto.description;

        await this.boardRepository.save(board);

        return board;

    }


}

