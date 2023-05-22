import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";


export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) 
    private dataSource : DataSource, 
    private jwtService : JwtService ) {
        super(User, dataSource.manager);

    }

    async createUser(authCredentailDto : AuthCredentialDto): Promise<void> {
        const { email, password } = authCredentailDto;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user =  this.create({ email, password : hashedPassword })
        try {
        await this.save(user);
        } catch(err) {
            if(err.code === '23505') {
                throw new ConflictException('Existing email')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async signIn(authCredentailDto : AuthCredentialDto) : Promise<{accessToken : string}> {
        const { email, password } = authCredentailDto;
        const user = await this.findOne({ where : { email } })
        const userId = user.id

        if (user && (await bcrypt.compare(password,  user.password))) {
            //유저 JWT 토큰 생성 ( Secret + Payload )
            const payload = { userId }
            const accessToken = await this.jwtService.sign(payload);
            
            return { accessToken }

        } else {
            throw new UnauthorizedException(' login failed ')
        }

    }
}