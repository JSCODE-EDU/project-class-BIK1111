import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetBoardsByKeywordDto {
    @IsNotEmpty()
    @IsString()
    @Length(1)
    keyword: string;
  }