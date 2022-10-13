import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsPhoneNumber, Max, Min} from "class-validator"

export class loginAccountDto {
    @ApiProperty({
        description: "Phone_number is required",
        example: "8100100100"
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(8100100100)
    @Max(23481001001000)
    phone_number: Number;

    @ApiProperty({
        description: "Password is required",
        example: "1234567890"
    })
    @IsNotEmpty()
    password: string;
}