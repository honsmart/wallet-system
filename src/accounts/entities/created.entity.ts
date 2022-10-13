import { ApiProperty } from '@nestjs/swagger';

export class registerEntity {
 
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmVOdW1iZXIiOjIzNDkwMDAwMDAwMDAsImlhdCI6MTY2NTYxNTIyNSwiZXhwIjoxNjY1NjE2MTI1fQ._KsPcQDwKrmWFxzRYcvWKeJf7ozt6uYmpyG0Ve9ELWI', description: 'access_token is use for authorization' })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInBob25lTnVtYmVyIjoyMzQ5MDAwMDAwMDAwLCJpYXQiOjE2NjU2MTUyMjUsImV4cCI6MTY2NjIyMDAyNX0.8Lm1683XMZtE0y-6zCWfZOMgllxvHv0Y9ZbtR2cX1-k',
    description: 'refresh_token is use for authorization',
  })
  refresh_token: string;
}

export class walletCreatedEntity {
 
  @ApiProperty({
    example: 4
  })
  id: string;

  @ApiProperty({
    example: '2349000000000'
  })
  phone_number: string;

  @ApiProperty({
    example: 'EURO'
  })
  currency: string;

  @ApiProperty({
    example: '298102388238'
  })
  wallet_id: string;

  @ApiProperty({
    example: '0'
  })
  balance: string;

  @ApiProperty({
    example: 'active'
  })
  status: string;

  @ApiProperty({
    example: true
  })
  created: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  createdAt: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  updatedAt: string;
}

export class walletTransferEntity {
 
  @ApiProperty({
    example: 4
  })
  id: string;

  @ApiProperty({
    example: 'EURO'
  })
  currency: string;

  @ApiProperty({
    example: '298102388238'
  })
  sender_wallet_id: string;

  @ApiProperty({
    example: '298102388238'
  })
  receiver_wallet_id: string;

  @ApiProperty({
    example: 'Sender'
  })
  historyFor: string;

  @ApiProperty({
    example: '100'
  })
  amount: string;

  @ApiProperty({
    example: 'DEBIT'
  })
  transactionType: string;

  @ApiProperty({
    example: 'Completed'
  })
  status: string;


  @ApiProperty({
    example: true
  })
  adminApproval: string;

  @ApiProperty({
    example: true
  })
  completed: string;

  @ApiProperty({
    example: "Transaction completed"
  })
  message: string;

  @ApiProperty({
    example: "Wallet transaction"
  })
  name: string;



  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  createdAt: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  updatedAt: string;
}
export class TransactionUnderApprovalEntity {
 
  @ApiProperty({
    example: 4
  })
  id: string;

  @ApiProperty({
    example: 'EURO'
  })
  currency: string;

  @ApiProperty({
    example: '298102388238'
  })
  sender_wallet_id: string;

  @ApiProperty({
    example: '298102388238'
  })
  receiver_wallet_id: string;

  @ApiProperty({
    example: 'Sender'
  })
  historyFor: string;

  @ApiProperty({
    example: '100'
  })
  amount: string;

  @ApiProperty({
    example: 'DEBIT'
  })
  transactionType: string;

  @ApiProperty({
    example: 'Pending'
  })
  status: string;

  @ApiProperty({
    example: false
  })
  adminApproval: string;

  @ApiProperty({
    example: false
  })
  completed: string;

  @ApiProperty({
    example: "Transaction initialized, transaction is under review by super admin"
  })
  message: string;

  @ApiProperty({
    example: "Wallet transaction"
  })
  name: string;



  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  createdAt: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  updatedAt: string;
}

export class TransactionApprovedEntity {
 
  @ApiProperty({
    example: 4
  })
  id: string;

  @ApiProperty({
    example: 17
  })
  transactionID: string;

  @ApiProperty({
    example: 'EURO'
  })
  currency: string;

  @ApiProperty({
    example: '298102388238'
  })
  sender_wallet_id: string;

  @ApiProperty({
    example: '298102388238'
  })
  receiver_wallet_id: string;

  @ApiProperty({
    example: 'Sender'
  })
  historyFor: string;

  @ApiProperty({
    example: '100'
  })
  amount: string;

  @ApiProperty({
    example: 'DEBIT'
  })
  transactionType: string;

  @ApiProperty({
    example: 'Completed'
  })
  status: string;

  @ApiProperty({
    example: true
  })
  adminApproval: string;

  @ApiProperty({
    example: true
  })
  completed: string;

  @ApiProperty({
    example: "Transaction Approved"
  })
  message: string;

  @ApiProperty({
    example: "Wallet transaction"
  })
  name: string;



  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  createdAt: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  updatedAt: string;
}

export class listUnapprovedTransactionEntity {
 
  @ApiProperty({
    example: 4
  })
  id: string;

  @ApiProperty({
    example: 'EURO'
  })
  currency: string;

  @ApiProperty({
    example: '298102388238'
  })
  sender_wallet_id: string;

  @ApiProperty({
    example: '298102388238'
  })
  receiver_wallet_id: string;

  @ApiProperty({
    example: 'Sender'
  })
  historyFor: string;

  @ApiProperty({
    example: '100'
  })
  amount: string;

  @ApiProperty({
    example: 'DEBIT'
  })
  transactionType: string;

  @ApiProperty({
    example: 'UnApproved'
  })
  status: string;

  @ApiProperty({
    example: false
  })
  adminApproval: string;

  @ApiProperty({
    example: false
  })
  completed: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  createdAt: string;

  @ApiProperty({
    example: "2022-10-13T00:11:06.530Z"
  })
  updatedAt: string;
}