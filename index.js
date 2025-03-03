const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

// Cargar chalk dinámicamente
let chalk;
import('chalk').then((module) => {
    chalk = module.default;
}).catch((err) => {
    console.error('Error cargando chalk:', err);
});

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Cargar tareas desde el archivo JSON
function loadTasks() {
    if (!fs.existsSync(TASKS_FILE)) {
        // Si el archivo no existe, créalo con un arreglo vacío
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
        return [];
    }

    // Lee el archivo
    const data = fs.readFileSync(TASKS_FILE, 'utf8');

    // Si el archivo está vacío, retorna un arreglo vacío
    if (!data.trim()) {
        return [];
    }

    // Intenta parsear el JSON
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(chalk.red('Error al parsear tasks.json:'), error.message);
        return [];
    }
}

// Guardar tareas en el archivo JSON
function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Mostrar las tareas en la terminal
function listTasks(tasks) {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No hay tareas pendientes.'));
    } else {
        tasks.forEach((task, index) => {
            const status = task.completed ? chalk.green('✓') : chalk.red('✗');
            console.log(`${index + 1}. [${status}] ${task.title}`);
        });
    }
}

// Función principal
async function main() {
    let tasks = loadTasks();

    while (true) {
        const { action } = await prompts({
            type: 'select',
            name: 'action',
            message: '¿Qué quieres hacer?',
            choices: [
                { title: 'Listar tareas', value: 'list' },
                { title: 'Agregar tarea', value: 'add' },
                { title: 'Marcar como completada', value: 'complete' },
                { title: 'Eliminar tarea', value: 'delete' },
                { title: 'Salir', value: 'exit' }
            ]
        });

        if (action === 'list') {
            listTasks(tasks);
        } else if (action === 'add') {
            const { title } = await prompts({
                type: 'text',
                name: 'title',
                message: 'Ingresa el título de la tarea:'
            });
            tasks.push({ title, completed: false });
            saveTasks(tasks);
            console.log(chalk.green('Tarea agregada con éxito.'));
        } else if (action === 'complete') {
            listTasks(tasks);
            const { index } = await prompts({
                type: 'number',
                name: 'index',
                message: 'Ingresa el número de la tarea completada:',
                validate: value => value > 0 && value <= tasks.length ? true : 'Número de tarea inválido.'
            });
            tasks[index - 1].completed = true;
            saveTasks(tasks);
            console.log(chalk.green('Tarea marcada como completada.'));
        } else if (action === 'delete') {
            listTasks(tasks);
            const { index } = await prompts({
                type: 'number',
                name: 'index',
                message: 'Ingresa el número de la tarea a eliminar:',
                validate: value => value > 0 && value <= tasks.length ? true : 'Número de tarea inválido.'
            });
            tasks.splice(index - 1, 1);
            saveTasks(tasks);
            console.log(chalk.green('Tarea eliminada con éxito.'));
        } else if (action === 'exit') {
            console.log(chalk.blue('Saliendo...'));
            break;
        }
    }
}

main(); // Ejecutar la función principal