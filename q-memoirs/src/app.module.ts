import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Entry } from './entry/entry.entity';
import { UserModule } from './user/user.module';
import { EntriesController } from './entry/entry.controller';
import { EntriesService } from './entry/entry.service';
import { EntriesModule } from './entry/entry.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'diarydb.sqlite',
      entities: [User, Entry],
      synchronize: true, // for dev only — auto sync schema
    }),
    TypeOrmModule.forFeature([User, Entry]),
    UserModule,
    EntriesModule,
    AuthModule,
    // Import your modules here (UserModule, EntryModule)
  ],
  controllers: [AppController, EntriesController],
  providers: [AppService, EntriesService],
})
export class AppModule {}
