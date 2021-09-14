import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
    constructor(private usersRepository: UserRepository){}

    async signUp(inputUser: CreateUserDto): Promise<void> {
        const {username, password} = inputUser;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.usersRepository.create({username,password: hashedPassword});

        try {
              await this.usersRepository.save(user);
        } catch (error) {
            // TODO: Improve this
            if(error.code === "23505"){
                throw new ConflictException("Username already exists");
            } 
            throw new InternalServerErrorException();
        }
      

    }
}
