Luis Ruben Velasquez Garcia  
Carnet 24011341  
Tarea - Gestor de tareas pendientes  
Curso - Desarrollo de APIs NodeJS  

# Gestor de Tareas Pendientes (CLI)

Esta es una aplicación de línea de comandos (CLI) desarrollada en Node.js que te permite gestionar tareas pendientes. Puedes agregar, listar, marcar como completadas y eliminar tareas. Las tareas se almacenan en un archivo `tasks.json` para que persistan incluso después de cerrar la aplicación.

## Instalación

1. Clona este repositorio o descarga los archivos en tu computadora.
2. Navega a la carpeta del proyecto:
   ```bash
   cd tarea2GestorTareasPendientes


## Funcionalidades  
• Agregar tarea: Permite agregar una nueva tarea a la lista.  
• Listar tareas: Muestra todas las tareas pendientes y completadas.  
• Marcar como completada: Permite marcar una tarea como completada.  
• Eliminar tarea: Elimina una tarea de la lista.  
• Salir: Cierra la aplicación.  

Si seleccionas Agregar tarea, se te pedirá que ingreses el título de la tarea.  
Si seleccionas Listar tareas, verás todas las tareas con su estado (completada o pendiente).  
Si seleccionas Marcar como completada, podrás elegir una tarea para marcarla como completada.  
Si seleccionas Eliminar tarea, podrás eliminar una tarea de la lista.  
Si seleccionas Salir, el programa se cerrará.  

### Dependencias utilizadas  
prompts: Para interactuar con el usuario desde la terminal.  
chalk: Para mejorar la visualización de los mensajes en la terminal.  