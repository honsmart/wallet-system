import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { approvedTransactionDto } from 'src/accounts/dtos/approveTransaction.dto';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService){}
    async approveTransaction(approvedTransactionDto:approvedTransactionDto,userID:number){
        const user = await this.prisma.account.findFirst({
            where: {
                id: userID
            }
        })
    
        if(!user) throw new ForbiddenException("Access Denied!")
        if(user.role === "USER")throw new ForbiddenException("Access Denied!, you are not authorized to access this route")
        if(approvedTransactionDto.transactionStatus != "APPROVED") throw new ForbiddenException("Oops!, invalid value for transactionStatus")

        const ApproveTranasction = await this.prisma.walletTrasactionApproval.findFirst({
            where:{
                transactionID: approvedTransactionDto.transactionID,
                status: "UnApproved",
                adminApproval: false,
                completed: false,
            }
        })
       if(!ApproveTranasction) throw new ForbiddenException("Oops!, Transaction does not exist or already approved")

       const createNewHistoryForReciever = await this.prisma.walletHistory.create({ data: {
        currency: ApproveTranasction.currency,
        sender_wallet_id: ApproveTranasction.sender_wallet_id,
        receiver_wallet_id:ApproveTranasction.receiver_wallet_id,
        amount: ApproveTranasction.amount,
        transactionType: "CREDIT",
        historyFor: "Receiver"
      } })
       
      const updateTransaction =  await this.prisma.walletTrasactionApproval.update({
        where: {
            id: ApproveTranasction.id,
        },
        data: { 
            status: "Completed",
            adminApproval: true,
            completed: true,
        }
      })

      if(!updateTransaction) throw new ForbiddenException("Oops!, unable to approve transaction")


      const updateSenderTransactionAsCompleted = await this.prisma.walletHistory.update({
        where: {
            id: Number(ApproveTranasction.transactionID)
        },
        data: { 
            status: 'Completed',
            adminApproval: true,
            completed: true
        }
    })

    const updateReceiverTransactionAsCompleted = await this.prisma.walletHistory.update({
        where: {
            id: createNewHistoryForReciever.id
        },
        data: { 
            status: 'Completed',
            adminApproval: true,
            completed: true
        }
    })

    const completedResponse = {
        Transaction: updateTransaction,
        message: "Transaction Approved",
        name: "Wallet transaction"
    }

    if(updateSenderTransactionAsCompleted && updateReceiverTransactionAsCompleted)  return completedResponse
    }

    async unApprovedTransaction(userID:number){
        const user = await this.prisma.account.findFirst({
            where: {
                id: userID
            }
        })
    
        if(!user) throw new ForbiddenException("Access Denied!")
        if(user.role === "USER")throw new ForbiddenException("Access Denied!, you are not authorized to access this route")

        const unApprovedTranasction = await this.prisma.walletTrasactionApproval.findMany({
            where:{
                status: "UnApproved",
                adminApproval: false,
                completed: false,
            }
        })

        if(Object.keys(unApprovedTranasction).length === 0)throw new ForbiddenException("No record for unapproved transactions")
        return unApprovedTranasction
    }
}
