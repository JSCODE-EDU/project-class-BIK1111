import { IsString, Length } from "class-validator"
import { Transform, TransformFnParams } from 'class-transformer';


export class AuthCredentialDto {
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    email : string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Length(8, 15)
    password : string
}