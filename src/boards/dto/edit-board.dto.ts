import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EditBoardDto {

    @IsString()
    @IsOptional()
    title? : string;

    @IsNotEmpty()
    @IsOptional()
    description? : string;
}