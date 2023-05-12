import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService : BoardsService) { }

    @Get()
    getAllBoards() : Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Get('/search')
    @UsePipes(ValidationPipe)
    getBoardsByKeyword(@Query('keyword') keyword: string) : Promise<Board[]> {
        return this.boardService.getBoardsByKeyword(keyword);
    }
   
    @Get('/:id')
    @UsePipes(ValidationPipe)
    getBoardById(@Param('id') id : number) : Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id', ParseIntPipe) id : number,
        @Body() editBoardDto : EditBoardDto) : Promise<Board> {

            return this.boardService.updateBoard(id, editBoardDto);  
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id ) : Promise<void> {
        return this.boardService.deleteBoard(id);
    }

}
