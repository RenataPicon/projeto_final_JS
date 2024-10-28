let tasks = [
    { id: 1, description: 'Comprar pão', checked: false },
    { id: 2, description: 'Passear com o cachorro', checked: false },
    { id: 3, description: 'Fazer o almoço', checked: false },
];

const removeTask = (taskId) => {
    tasks = tasks.filter(({ id }) => id !== taskId);
    document.getElementById(taskId)?.remove();
};

const getCheckboxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked;

    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
};

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
};

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();
    return { id, description, checked: false };
};

const addTask = (event) => {
    event.preventDefault(); // Previne o recarregamento da página ao submeter o formulário
    const newTaskData = getNewTaskData(event);
    tasks.push(newTaskData);

    const checkbox = getCheckboxInput(newTaskData);
    createTaskListItem(newTaskData, checkbox);
    event.target.reset(); // Limpa o campo de entrada após adicionar uma nova tarefa
};

const createTaskListItem = (task, checkbox) => {
    const taskList = document.getElementById('to-do-list');
    const listItem = document.createElement('li');
    listItem.id = task.id;

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'Remover item da lista';
    removeTaskButton.onclick = () => removeTask(task.id);

    listItem.className = 'task-item';
    listItem.appendChild(checkbox);
    listItem.appendChild(removeTaskButton);

    taskList.appendChild(listItem);
};

window.onload = () => {
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', addTask);

    tasks.forEach((task) => {
        const checkbox = getCheckboxInput(task);
        createTaskListItem(task, checkbox);
    });
};
