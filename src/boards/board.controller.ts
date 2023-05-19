import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { EditBoardDto } from './dto/edit-board.dto';
import { GetBoardsByKeywordDto } from './dto/search-by-keyword-board';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiBadGatewayResponse, ApiBadRequestResponse, ApiOkResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@Controller('boards')
@ApiTags('게시판 API')
export class BoardsController {
    constructor(private boardService: BoardsService) { }

    @Get()
    @ApiOperation({ summary: '게시글 전체 조회 API', description: '게시글 전체를 조회한다.' })
    @ApiOkResponse({ description: '게시글 전체를 조회한다.', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })

    async getAllBoards(): Promise<Board[]> {

        const AllBoards: Board[]  = await this.boardService.getAllBoards();

        return AllBoards;
    }




    @Get('/search')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '키워드를 통한 게시글 조회 API', description: '특정 제목의 키워드를 통해 게시글 조회.' })
    @ApiOkResponse({ description: '특정 제목의 키워드를 통해 게시글 조회.', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })

    getBoardsByKeyword(@Query() getBoardsByKeywordDto: GetBoardsByKeywordDto): Promise<Board[]> {
        return this.boardService.getBoardsByKeyword(getBoardsByKeywordDto);
    }



    @Get('/:id')
    @UsePipes(ValidationPipe)

    @ApiOperation({ summary: '게시글 ID를 통한 게시글 조회 API', description: '특정 게시글의 ID 통해 게시글 조회.' })
    @ApiParam({ name : 'id', type: 'string' })
    @ApiOkResponse({ description: '특정 게시글의 ID 통해 게시글 조회.', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })
    
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }



    @Post()
    @ApiBody({ type: [CreateBoardDto] })
    @ApiOperation({ summary: '게시글 생성 API', description: ' 새로운 게시글을 생성한다. ' })
    @ApiCreatedResponse({ 
        description : '새로운 게시글 생성한다. ', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })

    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }



    @Patch('/:id')
    @ApiOperation({ summary: '게시글 수정 API', description: '게시글을 수정한다.' })
    @ApiParam({ name : 'id', type: 'string' })
    @ApiOkResponse({ description: '게시글을 수정한다.', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })
    
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body() editBoardDto: EditBoardDto): Promise<Board> {

        return this.boardService.updateBoard(id, editBoardDto);
    }



    @Delete('/:id')
    @ApiOperation({ summary: '게시글 삭제 API', description: '게시글을 삭제한다.' })
    @ApiParam({ name : 'id', type: 'string' })
    @ApiOkResponse({ description: '게시글을 삭제한다.', type: Board })
    @ApiBadRequestResponse({ status: 403, description : 'Forbidden' })
    @ApiBadGatewayResponse({ status: 500, description : 'Internal Server Error' })

    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

}
