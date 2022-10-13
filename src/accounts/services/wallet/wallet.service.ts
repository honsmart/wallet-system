import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createWalletDto } from 'src/accounts/dtos';
import { walltTransferDto } from 'src/accounts/dtos/walletTransfer.dro';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash} from 'bcrypt'

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService){}

   public async createWallet(createWalletDto:createWalletDto, userID: number){
    const user = await this.prisma.account.findFirst({
        where: {
            id: userID
        }
    })

    if(!user) throw new ForbiddenException("Access Denied!")

    //Wallet ID generator
    var walletID
    var WalletNum = "298"
    var GenerateWalletID = Math.floor(Math.random() *  10000000) + 99999999
    walletID = String(WalletNum) +  String(GenerateWalletID)
    
    //Check if account is already created
    const walletExist = await this.prisma.wallet.findUnique({
        where:{
            wallet_id: String(walletID)
        }
    })

    if(walletExist) throw new HttpException("Wallet already exist", HttpStatus.NOT_ACCEPTABLE)

        //Check if currency is already created
        const currencyExist = await this.prisma.wallet.findFirst({
            where:{
                currency: createWalletDto.currency,
                phone_number: user.phone_number
            }
        })
    
   if(currencyExist) throw new HttpException("A wallet is already created with Currency provided", HttpStatus.CONFLICT)

    const wallet = await this.prisma.wallet.create({data:{
        phone_number: user.phone_number,
        currency: createWalletDto.currency,
        wallet_id: walletID
    }})

    return wallet
    }

  

   async walletTransfer(walltTransferDto:walltTransferDto, userID: number){
        var MaxTransferAmount = 1000000
        const user = await this.prisma.account.findFirst({
            where: {
                id: userID
            }
        })
    
        if(!user) throw new ForbiddenException("Access Denied!")

        const VerifyAllSenderWallet = await this.prisma.wallet.findMany({
            where: {
                    phone_number: user.phone_number
            }
        })

        
        if(Object.keys(VerifyAllSenderWallet).length === 0) throw new HttpException("Oops!, You don't any wallet", HttpStatus.CONFLICT)


        const verifyWallet = await this.prisma.wallet.findFirst({
            where: {
                wallet_id: walltTransferDto.recieverWalletID
            }
        })

        if(!verifyWallet) throw new HttpException("Wallet ID does not exist", HttpStatus.CONFLICT)

        if(verifyWallet.phone_number === user.phone_number) throw new HttpException("You can't transfer fund to your personal wallet ID", HttpStatus.BAD_REQUEST)

        
        const findReceieverWallet = await this.prisma.wallet.findUnique({
            where: {
                wallet_id: walltTransferDto.recieverWalletID
            }
        })

        

        if(!findReceieverWallet) throw new HttpException("Wallet ID does not exist", HttpStatus.NOT_FOUND)

        const findSenderWallet = await this.prisma.wallet.findFirst({
            where: {
                    phone_number: user.phone_number,
                    currency:  findReceieverWallet.currency
            }
        })

           
       
        if(!findSenderWallet) throw new HttpException("Transaction declined, " + "You don't have a wallet with " + findReceieverWallet.currency + " currency", HttpStatus.CONFLICT)

        if(Number(findSenderWallet.balance) < Number(walltTransferDto.amount)) throw new HttpException("Insufficient balance. Available balance: " + findSenderWallet.balance, HttpStatus.PAYMENT_REQUIRED)

        if(Number(walltTransferDto.amount) > Number(MaxTransferAmount)){
            const createPendingHistoryForSender = await this.prisma.walletHistory.create({ data: {
                currency: findReceieverWallet.currency,
                sender_wallet_id: findSenderWallet.wallet_id,
                receiver_wallet_id:findReceieverWallet.wallet_id,
                amount: walltTransferDto.amount,
                transactionType: "DEBIT",
                historyFor: "Sender"
            } })

            const createAdminApproval = await this.prisma.walletTrasactionApproval.create({ data: {
                transactionID: String( createPendingHistoryForSender.id),
                currency: findReceieverWallet.currency,
                sender_wallet_id: findSenderWallet.wallet_id,
                receiver_wallet_id:findReceieverWallet.wallet_id,
                amount: walltTransferDto.amount,
                transactionType: "DEBIT",
                historyFor: "Sender"
            } })

            const NewSenderBalanceApproval = Number(findSenderWallet.balance) - Number(walltTransferDto.amount)
            const updateSenderWalletApproval = await this.prisma.wallet.update({
                where: {
                    wallet_id: findSenderWallet.wallet_id
                },
                data: { 
                 balance: String(NewSenderBalanceApproval),
                }
            })

        const TransactionResult = {
            Transaction: createPendingHistoryForSender,
            message: "Transaction initialized, transaction is under review by super admin",
            name: "Wallet transaction"
        }

        if(createPendingHistoryForSender && createAdminApproval && updateSenderWalletApproval) return new HttpException(TransactionResult, HttpStatus.OK)
        }

       const NewSenderBalance = Number(findSenderWallet.balance) - Number(walltTransferDto.amount)
       const NewReceiverBalance = Number(findReceieverWallet.balance) + Number(walltTransferDto.amount)

       const createNewHistoryForSender = await this.prisma.walletHistory.create({ data: {
        currency: findReceieverWallet.currency,
        sender_wallet_id: findSenderWallet.wallet_id,
        receiver_wallet_id:findReceieverWallet.wallet_id,
        amount: walltTransferDto.amount,
        transactionType: "DEBIT",
        historyFor: "Sender"
      } })

       const updateSenderWallet = await this.prisma.wallet.update({
            where: {
                wallet_id: findSenderWallet.wallet_id
            },
            data: { 
             balance: String(NewSenderBalance),
            }
        })

        const updateReceiverWallet = await this.prisma.wallet.update({
            where: {
                wallet_id: findReceieverWallet.wallet_id
            },
            data: { 
             balance: String(NewReceiverBalance),
            }
        })

        if(!updateSenderWallet && !updateReceiverWallet ) throw new HttpException("Transaction declined. sorry an error ocurred", HttpStatus.CONFLICT)

        const createNewHistoryForReciever = await this.prisma.walletHistory.create({ data: {
            currency: findReceieverWallet.currency,
            sender_wallet_id: findSenderWallet.wallet_id,
            receiver_wallet_id:findReceieverWallet.wallet_id,
            amount: walltTransferDto.amount,
            transactionType: "CREDIT",
            historyFor: "Receiver"
          } })
    
        const updateSenderTransactionAsCompleted = await this.prisma.walletHistory.update({
            where: {
                id: createNewHistoryForSender.id
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
            Transaction: updateSenderTransactionAsCompleted,
            message: "Transaction completed",
            name: "Wallet transaction"
        }
       if(updateSenderTransactionAsCompleted && updateReceiverTransactionAsCompleted) return   new HttpException(completedResponse, HttpStatus.CREATED)

    }
}