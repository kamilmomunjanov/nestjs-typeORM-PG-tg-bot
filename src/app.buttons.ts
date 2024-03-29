import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

export function actionButtons(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard(
        [
            Markup.button.callback("🌺Список задач", "list"),
            Markup.button.callback("🖖Завершить", "done"),
            Markup.button.callback("👨‍🦲Редактирование", "edit"),
            Markup.button.callback("🤏Удаление", "delete"),
        ],
        {
            columns: 1,
        }
    )
}