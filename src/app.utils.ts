export const showList = (todos) => 
    `Ваш список задач: \n\n${todos.map(todo => 
        (todo.isCompleted ? "Сделано -" : "Не сделано -") + " " + todo.name + "\n\n")
        .join(" ")
        }`
