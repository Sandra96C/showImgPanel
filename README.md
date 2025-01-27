# Show Img Panel

Proyecto para mostrar imágenes de manera interactiva. Esta aplicación está construida con **Angular** y utiliza **Tailwind CSS** para el diseño.

## Descripción

El proyecto `Show Img Panel` permite visualizar imágenes de manera ordenada en una interfaz de usuario limpia. 


## Características

- Interfaz limpia y moderna con **Tailwind CSS**.
- Imágenes cargadas de manera eficiente.
- Compatible con dispositivos móviles.
- Despliegue en **GitHub Pages**.

## Tecnologías utilizadas

- **Angular**: Framework de JavaScript utilizado para construir la aplicación.
- **Tailwind CSS**: Framework de diseño para crear interfaces de usuario responsivas.
- **GitHub Pages**: Plataforma para el despliegue de aplicaciones web estáticas.

## Instalación

Para instalar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
   git clone https://github.com/Sandra96C/showImgPanel.git
   cd showImgPanel

2. Instala las dependencias:   
   npm install

3. Arranca el proyecto:
   ng serve

4. Despliega el proyecto:
  ng deploy --base-href="/showImgPanel/"
  
  El proyecto estará disponible en la siguiente URL: https://sandra96c.github.io/showImgPanel/


### Rutas

- /grid: Muestra las imágenes en una cuadrícula. Cuando llegas al final, un hostListener llama nuevamente a la función para cargar más imágenes, que se añaden al final de la página.

- /columns: Muestra las imágenes en columnas, respetando el tamaño original de las imágenes (similar a MasonryJS). Sin embargo, al cargar nuevas imágenes, las columnas se actualizan, las imágenes se reordenan y las nuevas imágenes aparecen al inicio de la página.
