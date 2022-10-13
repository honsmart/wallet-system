import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createAccountDto } from 'src/accounts/dtos/createAccount.dto';
import { loginAccountDto } from 'src/accounts/dtos/loginAccount.dto';
import { AccountsService } from 'src/accounts/services/accounts/accounts.service';
import {ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse, ApiCreatedResponse,  ApiSecurity, ApiTags} from "@nestjs/swagger";
import { Tokens } from 'src/accounts/types';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard } from 'src/accounts/common/guards';
import {  GetCurrentUser, GetCurrentUserId, Public } from 'src/accounts/common/decorators';
import { registerEntity } from 'src/accounts/entities/created.entity';
import { unAuthorizedEntity,conflictEntity, invalidCredencialsEntity, accessDeneidEntity} from 'src/accounts/entities/error.entity';





@ApiTags("Accounts")
@Controller('accounts')
export class AccountsController {
    constructor(private accountServices: AccountsService){}

    @Public()
    @ApiCreatedResponse({type: registerEntity,description: "New created user(access_token & refresh_token)"})
    @ApiOperation({summary: "New user registration"})
    @ApiResponse({ type: conflictEntity,status: 409, description: 'Conflict' })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    public async register(@Body() createUserDto: createAccountDto):Promise<Tokens>{
     return this.accountServices.createUserAccount(createUserDto)
    }

    @Public()
    @ApiCreatedResponse({type: registerEntity,description: "User authentication(access_token & refresh_token)"})
    @ApiOperation({summary: "New user authenticated"})
    @ApiResponse({ type: invalidCredencialsEntity,status: 401, description: 'Unauthorized' })
    @Post('auth')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    public async login(@Body() loginUserDto: loginAccountDto): Promise<Tokens>{
        return this.accountServices.UserAccountAuth(loginUserDto)
    }


    @Post('logout')
    @ApiBearerAuth("JWT-auth")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: "Unauthorized user"})
    @ApiResponse({ type: conflictEntity,status: 409, description: 'Conflict' })
    public async logout(@GetCurrentUserId() userid: number){
        return this.accountServices.userLogout(userid)
 }
 
 @Public()
 @UseGuards(RtGuard)
 @Post('refresh')
 @ApiOperation({summary: "Refresh token"})
 @ApiResponse({ type: conflictEntity,status: 409, description: 'Conflict' })
 @ApiBearerAuth("JWT-auth")
 @HttpCode(HttpStatus.OK)
 public async refresh(@GetCurrentUserId() userID: number,@GetCurrentUser('refreshToken') refreshToken: string){
     console.log(userID,refreshToken)
        return this.accountServices.refreshToken(userID, refreshToken)
}
}
