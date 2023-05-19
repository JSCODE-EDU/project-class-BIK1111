// 대부분의 REST API에서 데이터 생성용 DTO 클래스와 데이터 수정용 DTO 클래스의 차이는
// 단지 속성을 필수적으로 받아야하는지 말아야하는지 밖에 없습니다.
// createdAt은 사용자가 입력하는 값이 아니기에 넣지 않는다.
// 이곳은 DB에 조작하기 위한 값만 받는 곳
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardDto {
    @ApiProperty({
    example : "해당 글 제목",
    description: '제목',
    required : true
})
    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    title : string;
    
    @ApiProperty({
        example : "해당 글 내용",
        description: '내용',
        required : true
    })    
    @IsNotEmpty()
    @Length(1, 1000)
    description : string;

}