import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class walltTransferDto{
    @ApiProperty({
        description: "amount is required",
        example: "100"
    })
    @IsNotEmpty()
    amount: string
    @ApiProperty({
        description: "recieverWalletID is required.",
        example: "29810938393"
    })
    @IsNotEmpty()
    recieverWalletID: string
}