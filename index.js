let tasks = [
    { id: 1, description: 'comprar pão', checked: false },
    { id: 2, description: 'passear com o cachorro', checked: false },
    { id: 3, description: 'fazer o almoço', checked: false },
]

const getCheckboxInput = ({ id, description, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div'); //une em uma div aa conts checkbox e label

    checkbox.type = 'checkbox'; 
    checkbox.id = `${id}-checkbox`;
    checkbox.checked = task.checked; //se checked for true, checkbox marcada
}

window.onload = function() { //assim que a janela carregar = window.onload
    tasks.forEach((task) => {
        const list = document.getElementById('to-do-list');
        const toDo = document.createElement('li');

        toDo.textContent = task.description;

        list.appendChild(toDo);
    })
}