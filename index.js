let tasks = [
    { id: 1, description: 'Comprar pão', checked: false },
    { id: 2, description: 'Passear com o cachorro', checked: false },
    { id: 3, description: 'Fazer o almoço', checked: false },
];

const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}

const renderTasksProgressData = (tasks) => {
    let tasksProgressDOM = document.getElementById('tasks-progress');
    if (!tasksProgressDOM) {
        tasksProgressDOM = document.createElement('div');
        tasksProgressDOM.id = 'tasks-progress';
        document.getElementsByTagName('footer')[0].appendChild(tasksProgressDOM);
    }

    const doneTasks = tasks.filter(({ checked }) => checked).length;
    const totalTasks = tasks.length;
    tasksProgressDOM.textContent = `${doneTasks}/${totalTasks}`;
};

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeTask = (taskId) => {
    tasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));
    const updatedTasks = tasks; //declarando updatedTasks antes;
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks); 

    const taskItem = document.getElementById(taskId);
    if (taskItem) document.getElementById('to-do-list').removeChild(taskItem);
}

const onCheckBoxClick = (event) => {
    const [id] = event.target.id.split('-');
    tasks = tasks.map((task) => {
        if (parseInt(task.id) === parseInt(id)) {
            return { ...task, checked: event.target.checked };
        }
        return task;
    });
    const updatedTasks = tasks; // Atualiza a lista de tarefas
    console.log({ tasks });
    renderTasksProgressData(updatedTasks); 
    setTasksInLocalStorage(updatedTasks);
}

const getCheckboxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked;
    checkbox.addEventListener('change', onCheckBoxClick);

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

const getCreatedTaskInfo = (event) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(getNewTaskData(event));
    }, 3000);
});

const addTask = async (event) => {
    event.preventDefault();
    document.getElementById('save-task').setAttribute('disabled', true);
    const newTaskData = await getCreatedTaskInfo(event);
    tasks.push(newTaskData);
    const updatedTasks = tasks; // declarando updatedTasks novamente; Atualização da Variável updatedTasks:
    //Original: Em várias funções, updatedTasks não estava sendo atualizado corretamente após as modificações na lista de tasks, o que poderia levar a inconsistências.
    //Corrigido: Agora, updatedTasks é sempre atribuído a tasks logo após qualquer modificação (como adição ou remoção de tarefas). Isso garante que a variável refletirá sempre o estado atual da lista de tarefas.
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks); 

    const checkbox = getCheckboxInput(newTaskData);
    createTaskListItem(newTaskData, checkbox);

    document.getElementById('description').value = '';
    document.getElementById('save-task').removeAttribute('disabled');
}

const removeDoneTasks = () => {
    const tasksToRemove = tasks.filter(({ checked }) => checked).map(({ id }) => id);
    tasks = tasks.filter(({ checked }) => !checked);
    const updatedTasks = tasks; // Atualiza a lista de tarefas
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    tasksToRemove.forEach((taskToRemove) => {
        const taskItem = document.getElementById(taskToRemove);
        if (taskItem) document.getElementById('to-do-list').removeChild(taskItem);
    });
}

const createTaskListItem = (task, checkbox) => {
    const taskList = document.getElementById('to-do-list');
    const listItem = document.createElement('li');
    listItem.id = task.id;

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'Remover item da lista';
    removeTaskButton.classList.add('remove-button');
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

    renderTasksProgressData(tasks);
};
