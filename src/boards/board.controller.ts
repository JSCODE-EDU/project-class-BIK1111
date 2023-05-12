import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService : BoardsService) { }

    @Get()
    // 반환 객체가 리스트 형식이므로 Borad[] 로 지정
    getAllBoards() : Promise<Board[]> {
        return this.boardService.getAllBoards();
    }
    
    @Get('/:id')
    @UsePipes(ValidationPipe)
    getBoardById(@Param('id') id : number) : Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    // boards/:id 보다 앞서서 존재해야함
    // 그렇지 않으면 search를 id로 인식함.
    @Get('/search')
    @UsePipes(ValidationPipe)
    getBoardsByKeyword(@Query('keyword') keyword: string) : Promise<Board[]> {
        return this.boardService.getBoardsByKeyword(keyword);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto : EditBoardDto) : Promise<Board> {

            return this.boardService.updateBoard(id, dto);
    
    }

    //해당 아이디 파라미터를 정수로 변환 (ParseIntPipe)
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id ) : Promise<void> {
        return this.boardService.deleteBoard(id);
    }

}
