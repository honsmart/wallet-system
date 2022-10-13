import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createWalletDto{
    @ApiProperty({
        description: "Currency is required",
        example: "NGN"
    })
    @IsNotEmpty()
    currency: string
}