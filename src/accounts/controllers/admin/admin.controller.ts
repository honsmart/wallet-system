import {Body, Controller, HttpCode, HttpException, HttpStatus, Get, Post } from '@nestjs/common';
import { AdminService } from 'src/accounts/services/admin/admin.service';
import {  GetCurrentUser, GetCurrentUserId, Public } from 'src/accounts/common/decorators';
import { approvedTransactionDto } from 'src/accounts/dtos/approveTransaction.dto';
import {ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse, ApiCreatedResponse,  ApiSecurity, ApiTags} from "@nestjs/swagger";
import { unAuthorizedEntity,conflictEntity, walletExistEntity, invalidCredencialsEntity, accessDeneidEntity, WalletNotExistEntity, insufficientBalEntity, personalWalletEntity, adminAuthEntity} from 'src/accounts/entities/error.entity';
import { registerEntity,walletCreatedEntity, walletTransferEntity, TransactionUnderApprovalEntity,TransactionApprovedEntity, listUnapprovedTransactionEntity } from 'src/accounts/entities/created.entity';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
     constructor(private AdminService:AdminService) {}
     @Get('/unapprovedtransactions')
     @ApiBearerAuth("JWT-auth")
     @HttpCode(HttpStatus.OK)
     @ApiCreatedResponse({type: [listUnapprovedTransactionEntity],description: "Get unapproved transaction"})
     @ApiOperation({summary: "Unapproved transaction"})
     @ApiResponse({ type: invalidCredencialsEntity,status: 401, description: 'Unauthorized' })
     @ApiResponse({ type: accessDeneidEntity,status: 409, description: 'Access Denied!' }) 
     @ApiResponse({ type: adminAuthEntity,status: 403, description: 'Admin role!' })
     walletTransactions(@GetCurrentUserId() userid:number){
          return this.AdminService.unApprovedTransaction(userid)
     }

     @Post('/approvetransaction')
     @ApiBearerAuth("JWT-auth")
     @HttpCode(HttpStatus.CREATED)
     @ApiCreatedResponse({type: TransactionApprovedEntity,description: "Approve transaction"})
     @ApiOperation({summary: "Approve transaction"})
     @ApiResponse({ type: invalidCredencialsEntity,status: 401, description: 'Unauthorized' })
     @ApiResponse({ type: accessDeneidEntity,status: 409, description: 'Access Denied!' })
     @ApiResponse({ type: adminAuthEntity,status: 403, description: 'Admin panel!' })
     ApproveTransactions(@Body() approvedTransactionDto: approvedTransactionDto,@GetCurrentUserId() userid:number){
         return this.AdminService.approveTransaction(approvedTransactionDto,userid)
     }
}
