import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditBoardDto {
    @IsString()
    @IsOptional()
    title? : string;

    @IsNotEmpty()
    @IsOptional()
    description? : string;
}