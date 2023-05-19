import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";


export class EditBoardDto {
    @ApiProperty({ description: '글 수정된 제목'})
    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
    @Transform(({ value }: TransformFnParams) => value?.trim())    @IsString()
    @IsOptional()
    title? : string;

    @ApiProperty({ description: '글 수정 내용'})
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    description? : string;
}