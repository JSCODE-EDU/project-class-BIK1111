import { Board } from "./board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { NotFoundException } from "@nestjs/common";
import { EditBoardDto } from "./dto/edit-board.dto";
import { GetBoardsByKeywordDto } from "./dto/search-by-keyword-board";

export class BoardRepository extends Repository<Board> {
    constructor(@InjectRepository(Board) private dataSource : DataSource) {
        super(Board, dataSource.manager);
    }
    
    
    async createBoard( createBoardDto: CreateBoardDto ):
    Promise<Board> {

        const { title, description } = createBoardDto

        const board = this.create({
            title,
            description,
        });
        
        await this.save(board);
        return board;
    }

    async getAllBoards() : Promise<Board[]> {
        
        const query = this.createQueryBuilder('board')
        query.limit(100)
        query.orderBy('board.createdAt', 'DESC');
        
        const boards = await query.getMany();

        return boards;
    }

           
    async getBoardById(id : number) : Promise <Board> {

        const board = await this.findOne({ where: { id } });
        
        if(!board) throw new NotFoundException(`Does not exist the board with id : ${id}`)

        return board
    }


    async getBoardsByKeyword(getBoardsByKeywordDto : GetBoardsByKeywordDto) : Promise<Board[]> {
        
        const { keyword } = getBoardsByKeywordDto

        const query = this.createQueryBuilder('board')
        query.where('board.title LIKE :keyword', { keyword: `%${keyword}%` })
        query.limit(100)
        query.orderBy('board.createdAt', 'DESC');
        
        const boards = await query.getMany();

        if(boards.length === 0) throw new NotFoundException(`Does not exist the board with the keyword ${keyword}`)

        return boards;
    }

    async deleteBoard(id: number) : Promise <void> {
        const result = await this.delete(id);

        if(result.affected === 0 ) {
            throw new NotFoundException(`Does not exist the board with id! : ${id}`)
        }
    }

    async updateBoard( id: number, editBoardDto : EditBoardDto) : Promise<Board> {

        const board = await this.getBoardById(id)
    
        board.title = editBoardDto.title;
        board.description = editBoardDto.description;

        await this.save(board);

        return board;

    }


}


