import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class GetBoardsByKeywordDto {
    @ApiProperty({ description : 'keyword '})
    @IsNotEmpty()
    @IsString()
    @Length(1)
    keyword: string;
  }