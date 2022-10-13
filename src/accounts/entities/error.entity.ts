import { ApiProperty } from '@nestjs/swagger';

export class conflictEntity {
 
  @ApiProperty({ example: '409' })
  statusCode: string;

  @ApiProperty({
    example: 'User already exist',
    description: 'User already exist',
  })
  message: string;
}

export class unAuthorizedEntity {
 
    @ApiProperty({ example: '409' })
    statusCode: string;
  
    @ApiProperty({
      example: 'User already exist',
      description: 'User already exist',
    })
    message: string;
  }

  export class invalidCredencialsEntity {
 
    @ApiProperty({ example: '401' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Unauthorized',
      description: 'Unauthorized',
    })
    message: string;
  }

  export class accessDeneidEntity {
 
    @ApiProperty({ example: '409' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Access Denied!',
      description: 'Access Denied!',
    })
    message: string;
  }

  export class walletExistEntity {
 
    @ApiProperty({ example: '406' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Currency already exist',
      description: 'A wallet is already created with Currency provided',
    })
    message: string;
  }

  export class insufficientBalEntity {
 
    @ApiProperty({ example: '402' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Insufficient balance. Available balance: 0',
      description: 'Insufficient balance. Available balance: 0',
    })
    message: string;
  }

  export class personalWalletEntity {
 
    @ApiProperty({ example: '402' })
    statusCode: string;
  
    @ApiProperty({
      example: 'You can\'t transfer fund to your personal wallet ID',
      description: 'You can\'t transfer fund to your personal wallet ID',
    })
    message: string;
  }


  export class WalletNotExistEntity {
 
    @ApiProperty({ example: '404' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Wallet ID does not exist',
      description: 'Wallet ID does not exist',
    })
    message: string;
  }

  export class adminAuthEntity {
 
    @ApiProperty({ example: '403' })
    statusCode: string;
  
    @ApiProperty({
      example: 'Access Denied!, you are not authorized to access this route',
      description: 'Access Denied!, you are not authorized to access this route',
    })
    message: string;
  }