const TablaUsuarios = document.getElementById("Table");
const ventanaCambiarUsuario = document.getElementById("ventanaCambiarUsuario");
const ventanaAgregarUsuario = document.getElementById("ventanaAgregarUsuario");
const btnAbrirAgregarUsuario = document.getElementById("abrirAgregarUsuario");
const btnCerrarAgregarUsuario = document.getElementById("btnCerrar");
const btnCerrarCambiarUsuario = document.getElementById("btnCerrarCambiar");
const btnCambiarUsuario = document.getElementById("btnCambiar");
const btnAgregarUsuario = document.getElementById("btnAgregar");
let valorBorrar;
let idCambio;

const CargarUsuarios = async() => {
    try{
        const respuesta = await fetch('https://localhost:7121/MostrarUsuarios');

        //si la respuesta es correcta 
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            console.log(datos);

            let Usuarios = '';
            datos.forEach(Usuario => {
                Usuarios += `
                <tr>
					<td>${Usuario.id}</td>
                    <td>${Usuario.nombre}</td>
                    <td>${Usuario.apellido}</td>
                    <td>${Usuario.edad}</td>
                    <td>${Usuario.telefono}</td>
                    <td>${Usuario.pais}</td>
					<td>
						<button type="button" class="btn btn-primary btn-sm btnEditar">Editar</button>
						<button type="button" class="btn btn-danger btn-sm btnEliminar">Eliminar</button>
					</td>
				</tr>
                `;
            });
            document.querySelector(".CuerpoUsuario").innerHTML = Usuarios;
        } else if(respuesta.status === 404){
            console.log('al parecer la pagina que buscas no existe');
        } else{
            console.log('al parecer hubo un error desconocido');
        }
    } catch(error){
        console.log(error);
    }
}
CargarUsuarios();

TablaUsuarios.addEventListener("click", verificarClick);
function verificarClick(e){
    if(e.target.matches(".btnEliminar")){
        let indice = e.target.parentNode.parentNode.rowIndex;
        const id = e.target.parentNode.parentNode;
        valorBorrar = id.firstElementChild.textContent;
        var respuesta = confirm("Estas seguro que deseas eliminar este usuario");
        if(respuesta == true){
            console.log("tres perror jugando maso en un piano");
            console.log(valorBorrar);
            EliminarUsuarioUnico();
            TablaUsuarios.deleteRow(indice);
        } else{
            console.log("no funciona :c");
        }
    } else if(e.target.matches(".btnEditar")){
        const id = e.target.parentNode.parentNode;
        idCambio = id.firstElementChild.textContent;
        let inputNombre = document.getElementById("cambionombre");
        inputNombre.value = id.childNodes[3].innerText;
        let inputApellido = document.getElementById("cambioapellido");
        inputApellido.value = id.childNodes[5].innerText;
        let inputEdad = document.getElementById("cambioedad");
        inputEdad.value = id.childNodes[7].innerText;
        let inputTelefono = document.getElementById("cambiotelefono");
        inputTelefono.value = id.childNodes[9].innerText;
        let inputPais = document.getElementById("cambiopais");
        inputPais.value = id.childNodes[11].innerText;
        ventanaCambiarUsuario.showModal();
    }
}

const EliminarUsuarioUnico = async() => {
    try{
        const respuesta = await fetch(`https://localhost:7121/EliminarUsuarioUnico?Id=${valorBorrar}`, {
            method: 'POST'
        });
        if(respuesta.status === 200){
            console.log("El usuario se ha eliminado correctamente");
        } else if(respuesta.status === 404){
            console.log('al parecer la pagina que buscas no existe');
        } else{
            console.log('al parecer hubo un error desconocido');
        }
    } catch(error){
        console.log(error);
    }
}

btnAgregarUsuario.addEventListener("click", () =>{
     let nombreUsuario = document.getElementById("nombre").value;
     let apellidoUsuario = document.getElementById("apellido").value;
     let edadUsuario = document.getElementById("edad").value;
     let telefonoUsuario = document.getElementById("telefono").value;
     let paisUsuario = document.getElementById("pais").value;

     const nuevoUsuario = {
        id:  0,
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        edad: edadUsuario,
        telefono: telefonoUsuario,
        pais: paisUsuario
    } 
    AgregarUsuario(nuevoUsuario);
})

const AgregarUsuario = async(nuevoUsuario) => {
    try{
        const respuesta = await fetch(`https://localhost:7121/AgregarUsuario`, {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(respuesta.status === 200){
            location.reload();
        } else if(respuesta.status === 404){
            console.log('al parecer la pagina que buscas no existe');
        } else{
            console.log('al parecer hubo un error desconocido');
        }
    } catch(error){
        console.log(error);
    }
}

btnCambiarUsuario.addEventListener("click", () =>{
     let nombreUsuario = document.getElementById("cambionombre").value;
     let apellidoUsuario = document.getElementById("cambioapellido").value;
     let edadUsuario = document.getElementById("cambioedad").value;
     let telefonoUsuario = document.getElementById("cambiotelefono").value;
     let paisUsuario = document.getElementById("cambiopais").value;

     const cambioUsuario = {
        id:  idCambio,
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        edad: edadUsuario,
        telefono: telefonoUsuario,
        pais: paisUsuario
    } 
    editarUsuario(cambioUsuario);
})

const editarUsuario = async(cambioUsuario) => {
    try{
        const respuesta = await fetch(`https://localhost:7121/CambiarUsuario`, {
            method: 'POST',
            body: JSON.stringify(cambioUsuario),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(respuesta.status === 200){
            location.reload();
        } else if(respuesta.status === 404){
            console.log('al parecer la pagina que buscas no existe');
        } else{
            console.log('al parecer hubo un error desconocido');
        }
    } catch(error){
        console.log(error);
    }
}

btnCerrarAgregarUsuario.addEventListener("click", () =>{
    ventanaAgregarUsuario.close();
})

btnCerrarCambiarUsuario.addEventListener("click", () =>{
    ventanaAgregarUsuario.close();
})    

btnAbrirAgregarUsuario.addEventListener("click", ()=>{
    ventanaAgregarUsuario.showModal();
})
