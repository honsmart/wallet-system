import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse, ApiCreatedResponse,  ApiSecurity, ApiTags} from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/accounts/common/decorators';
import { createWalletDto } from 'src/accounts/dtos';
import { walltTransferDto } from 'src/accounts/dtos/walletTransfer.dro';
import { WalletService } from '../../services/wallet/wallet.service'
import { unAuthorizedEntity,conflictEntity, walletExistEntity, invalidCredencialsEntity, accessDeneidEntity, WalletNotExistEntity, insufficientBalEntity, personalWalletEntity} from 'src/accounts/entities/error.entity';
import { registerEntity,walletCreatedEntity, walletTransferEntity, TransactionUnderApprovalEntity } from 'src/accounts/entities/created.entity';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(private walletService:WalletService){}
    @Post('create')
     @ApiBearerAuth("JWT-auth")
     @ApiCreatedResponse({type: walletCreatedEntity,description: "New wallet created"})
     @ApiOperation({summary: "Create new wallet with unique walletID"})
     @ApiResponse({ type: invalidCredencialsEntity,status: 401, description: 'Unauthorized' })
     @ApiResponse({ type: walletExistEntity,status: 406, description: 'A wallet is created with the currency provided' })
     @ApiResponse({ type: accessDeneidEntity,status: 409, description: 'Access Denied!' })
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    createWallet(@Body() createWalletDto:createWalletDto, @GetCurrentUserId() userid: number){
       return this.walletService.createWallet(createWalletDto,userid)
    }

    @Post('transfer')
    @ApiBearerAuth("JWT-auth")
    @ApiCreatedResponse({type: walletTransferEntity,description: "New wallet created"})
    @ApiOperation({summary: "Transfer to unique walletID"})
    @ApiResponse({ type: invalidCredencialsEntity,status: 401, description: 'Unauthorized' })
    @ApiResponse({ type: accessDeneidEntity,status: 409, description: 'Access Denied!' })
    @ApiResponse({ type: insufficientBalEntity,status: 402, description: 'Insufficient balance!' })
    @ApiResponse({ type: personalWalletEntity,status: 406, description: 'personal wallet ID err!' })
    @ApiResponse({ type: TransactionUnderApprovalEntity,status: 403, description: 'Transaction approval!' })
    @ApiResponse({ type: WalletNotExistEntity,status: 404, description: 'Wallet ID not found!' })
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    walletTransfer(@Body() walltTransferDto:walltTransferDto, @GetCurrentUserId() userid:number){
        return this.walletService.walletTransfer(walltTransferDto, userid)
    }
}
