let tasks = [
    { id: 1, description: 'comprar pão', checked: false },
    { id: 2, description: 'passear com o cachorro', checked: false },
    { id: 3, description: 'fazer o almoço', checked: false },
]

const getCheckboxInput = ({ id, description, checked}) => {
    const checkbox = document.createElement('input'); //Define o type como 'checkbox', o id com base no id da tarefa (para garantir que o checkbox e o label fiquem conectados), e o atributo checked é definido com base no valor booleano passado (se checked for true, a caixa estará marcada).
    const label = document.createElement('label');
    const wrapper = document.createElement('div'); //une em uma div aa conts checkbox e label
    const checkboxId = `${id}-checkbox`

    checkbox.type = 'checkbox'; 
    checkbox.id = checkboxId
    checkbox.checked = checked; //se checked for true, checkbox marcada

    label.textContent = description;
    label.htmlFor = checkboxId; 

    wrapper.className = 'checkbox-label-container'

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

window.onload = function() { //assim que a janela carregar = window.onload
    tasks.forEach((task) => {
        const checkbox = getCheckboxInput(task);
        const list = document.getElementById('to-do-list');
        const toDo = document.createElement('li');

        toDo.id = task.id;
        toDo.appendChild(checkbox);

        list.appendChild(toDo);
    })
}