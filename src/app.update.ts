import { AppService } from './app.service';
import { Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from "telegraf"
import { actionButtons } from './app.buttons';
import { Context } from './app.contextInterace';
import { showList } from './app.utils';


const todos = [
  {
    id: 1,
    name: "Buy products",
    isCompleted: false
  },
  {
    id: 2,
    name: "Go to walk",
    isCompleted: false
  },
  {
    id: 3,
    name: "Travel",
    isCompleted: true
  },
]

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService) { }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply("Hi! Friend")
    await ctx.reply("Что ты хочешь сделать?", actionButtons())
  }

  @Hears("🌺Список задач")
  async getAll(ctx: Context) {
    await ctx.reply(showList(todos))
  }

  @Hears("🖖Завершить")
  async doneTask(ctx: Context) {
    await ctx.reply("Напишите ID задачи:")
    ctx.session.type = "Done"
  }

  @Hears("👨‍🦲Редактирование")
  async editTask(ctx: Context) {
    await ctx.replyWithHTML("Напишите ID и новое название задачи: \n\n" +
      "<i>В формате 1 | Новое название</i>")
    ctx.session.type = "Edit"
  }

  @Hears("🤏Удаление")
  async deleteTask(ctx: Context) {
    await ctx.reply("Напишите ID задачи:")
    ctx.session.type = "Remove"
  }

  @On("text")
  async getMessage(
    @Ctx() ctx: Context,
    @Message("text") message: string,
  ) {
    if (!ctx.session.type) return

    if (ctx.session.type === "Done") {
      const todo = todos.find(t => t.id === +message)
      if (!todo) {

        ctx.reply("Задачи с таким id не найдено")
        return
      }
      todo.isCompleted = !todo.isCompleted
      await ctx.reply(showList(todos))
    }

    if (ctx.session.type === "Edit") {
      const [taskId, taskName] = message.split(" | ")
      const todo = todos.find(t => t.id === +taskId)

      if (!todo) {

        ctx.reply("Задачи с таким id не найдено")
        return
      }

      todo.name = taskName
      await ctx.reply(showList(todos))
    }
    if (ctx.session.type === "Remove") {
      const todo = todos.find(t => t.id === +message)

      if (!todo) {

        ctx.reply("Задачи с таким id не найдено")
        return
      }

      await ctx.reply(showList(todos.filter(t => t.id !== +message)))
    }

  }
}
