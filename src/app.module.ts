import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
  ],
})
export class AppModule {}
