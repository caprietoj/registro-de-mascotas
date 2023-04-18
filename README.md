# registro-de-mascotas

Aplicacion elaborada en Nodejs, que permite el registro de mascotas y luego de este registro envia un correo electronico al dueño indicandole el registro

# como instalar 
1. clone el proyecto 
2. ejecute npm install
3. cree un archivo .env con los siguientes datos:  
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=veterinaria
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password
    
# Rutas de la api
1. Crear una mascota (HTTP POST):
http://localhost:3000/api/mascotas
2. Obtener todas las mascotas (HTTP GET):
http://localhost:3000/api/mascotas
3. Obtener una mascota por ID (HTTP GET):
http://localhost:3000/api/mascotas/:id
4. Actualizar una mascota por ID (HTTP PUT):
http://localhost:3000/api/mascotas/:id
5. Eliminar una mascota por ID (HTTP DELETE):
http://localhost:3000/api/mascotas/:id
