import { Board } from "./board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";


export class BoardRepository extends Repository<Board> {
    constructor(@InjectRepository(Board) private dataSource : DataSource) {
        super(Board, dataSource.manager);
    }
    // 서비스와 레포지토리 파일 분리
    // createBoardDto 가 클라가 입력하는 body 정보 담음.
    async createBoard(createBoardDto: CreateBoardDto ):
    Promise<Board> {

        const { title, description } = createBoardDto

        const board = this.create({
            title,
            description,
        });
        
        await this.save(board);
        return board;
    }


}


