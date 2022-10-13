import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class approvedTransactionDto{
    @ApiProperty({
        description: "Transaction ID is required.Transaction ID of UNAPPROVED wallet transaction",
        example: "9"
    })
    @IsNotEmpty()
    transactionID: string
    @ApiProperty({
        description: "Transaction status is required",
        example: "APPROVED"
    })
    @IsNotEmpty()
    transactionStatus: string
}