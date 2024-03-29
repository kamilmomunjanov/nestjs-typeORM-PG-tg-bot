import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from "@nestjs/typeorm"
import * as LocalSession from 'telegraf-session-local';
import { join } from 'path';
import { TaskEntity } from './task.entity';


const sessions = new LocalSession({ database: "session_db.json" })

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: "7061533036:AAEn3UXsB5LMOlQ1Lld22fbZFeZwEgyl16s"
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "todo-app-tg-bot",
      username: "postgres",
      password: "1997micro1997",
      entities: [join(__dirname, "**", "*.entify.{ts,js}")],
      migrations: [join(__dirname, "**", "*.migration.{ts,js}")],
      synchronize: true
    }),
    TypeOrmModule.forFeature([TaskEntity])
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule { }
