import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';
import { GetBoardsByKeywordDto } from './dto/search-by-keyword-board';
@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) { }

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }
    
    // Query 데코레이터 매개변수 이름을 getBoardsByKeywordDto로 지정해줬기에
    // 파라미터에 들어가는 것도 getBoardsByKeywordDto 를 이용해야함
    // @Query('keyword')라고 하면 getBoardsByKeywordDto 가 사용되지 못함
    @Get('/search')
    @UsePipes(ValidationPipe)
    getBoardsByKeyword(@Query() getBoardsByKeywordDto: GetBoardsByKeywordDto): Promise<Board[]> {
        return this.boardService.getBoardsByKeyword(getBoardsByKeywordDto);
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body() editBoardDto: EditBoardDto): Promise<Board> {

        return this.boardService.updateBoard(id, editBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

}
