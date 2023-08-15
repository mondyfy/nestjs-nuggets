import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { DBModule } from './db.module';

@Module({
  imports: [ConfigModule.forRoot({}), DBModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
