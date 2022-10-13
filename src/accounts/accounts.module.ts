import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountsController } from './controllers/accounts/accounts.controller';
import { AccountsService } from './services/accounts/accounts.service';
import { WalletController } from './controllers/wallet/wallet.controller';
import { AdminController } from './controllers/admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { WalletService } from './services/wallet/wallet.service';
import { AdminService } from './services/admin/admin.service';


@Module({
  controllers: [AccountsController, WalletController, AdminController],
  providers: [AccountsService, WalletService,JwtService, {provide: APP_GUARD, useClass: AtGuard}, WalletService, AdminService],
  imports: [PrismaModule, JwtModule.register({})]
})
export class AccountsModule {}
