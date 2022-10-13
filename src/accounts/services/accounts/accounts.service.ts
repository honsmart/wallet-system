import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createAccountDto } from 'src/accounts/dtos/createAccount.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash} from 'bcrypt'
import { loginAccountDto } from 'src/accounts/dtos/loginAccount.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/accounts/types';

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService, private jwtService:JwtService){}

    //Generate auth token  
    async getTokens(userID: number, phoneNumber: number): Promise<Tokens>{
    const [at, rt] = await Promise.all([
        this.jwtService.signAsync({
            id:userID,
            phoneNumber:phoneNumber
        }, {
            secret: 'at-secret',
            expiresIn: 60 * 15
        }),
        this.jwtService.signAsync({
            userID:userID,
            phoneNumber:phoneNumber
        }, {
            secret: 'rt-secret',
            expiresIn: 60 * 60 * 24 *7 
        })  
    ])

    return {
        access_token: at,
        refresh_token: rt
    }
   }  

       //Function that update Refresh token
       async updateRtHash(userID: number, rt:String){
        const newhash = await hash(rt, 530)
        await this.prisma.account.update({
            where: {
                id: Number(userID)
            },
            data: { 
             hashedRt: newhash,
            }
        })
     }

     async userLogout(userID: number){
      const logout = await this.prisma.account.update({
           where: {
               id: userID
           },
           data: {
            hashedRt: undefined
           }
       });

       console.log(logout)
     }

   async createUserAccount(createAccountDto: createAccountDto): Promise<Tokens>{
        //Check if user exist in Db
       const userExist = await this.prisma.account.findFirst({
            where:{
                phone_number: String(createAccountDto.phone_number)
            }
        })

        if(userExist)throw new HttpException("User already exist", HttpStatus.CONFLICT)
        

       const newUser = await this.prisma.account.create({data:{
           phone_number: String(createAccountDto.phone_number),
           password: await hash(createAccountDto.password, 20),
           hashedRt: ""
       }});

       const tokens = await this.getTokens(newUser.id,Number(newUser.phone_number))
       await this.updateRtHash(newUser.id, tokens.refresh_token)

       
       return tokens
    }

   async UserAccountAuth(loginAccountDto:loginAccountDto):Promise<Tokens>{
          //Check if user exist in Db
        const user = await this.prisma.account.findUnique({
            where: {
                phone_number: String(loginAccountDto.phone_number)
            }
        });

        if(!user){
            throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
        }   
        
        //Compare password
        const equalPass = await compare(loginAccountDto.password, user.password);

        if(!equalPass){
            throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
        }


        const tokens = await this.getTokens(user.id,Number(user.phone_number))
        await this.updateRtHash(user.id, tokens.refresh_token)
 
        return tokens
    }

    async refreshToken(userID: number, rt: string) {
        console.log(userID)
       const user = await this.prisma.account.findFirst({
            where: {
                id: userID
            }
        })

        if(!user || !user.hashedRt) throw new ForbiddenException("Access Denied!")

        const rtMatches =  await compare(rt, user.hashedRt);
        if(!rtMatches) throw new ForbiddenException("Access Denied!")
        
        const tokens = await this.getTokens(user.id,Number(user.phone_number))
        await this.updateRtHash(user.id, tokens.refresh_token)
 
        return tokens
    }

}
