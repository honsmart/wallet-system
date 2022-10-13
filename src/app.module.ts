import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AtStrategy, RtStrategy } from './accounts/strategies';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AccountsModule, PrismaModule],
  controllers: [],
  providers: [AtStrategy,RtStrategy],
})
export class AppModule {}
