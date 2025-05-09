const btnUser=document.getElementById("users");
const btnBook=document.getElementById("books");
const datosSalida=document.getElementById("datos");
const URLUSERS="http://localhost:3000/users";
const URLBOOKS="http://localhost:3000/books";


async function users() {
    try{
        const responseUser=await fetch(URLUSERS);
        if(!responseUser.ok){
            throw new Error ('Error al descargar los usuarios',responseUser.mensaje);
        }
        const userDatas=await responseUser.json();
        dhtmlUsers(userDatas);
    }catch(error){
        console.log('Error al obtener los datos',error)
    }
}

async function books() {
    try{
        const responseBooks=await fetch(URLBOOKS);
        if(!responseBooks.ok){
            throw new Error ('Error al descargar los usuarios',responseBooks.mensaje);
        }
        const booksDatas=await responseBooks.json();
        console.log(booksDatas)
        dhtmlBooks(booksDatas)
    }catch(error){
        console.log('Error al obtener los datos',error)
    }
}

btnUser.addEventListener("click",()=>{
    const usersDatas= users();
})
btnBook.addEventListener("click",()=>{
    const booksDatas= books();
})

function dhtmlUsers(user){
    datosSalida.innerHTML=user.map(u => {
        const {nombre,apellidos,correo,coleccion,wishlist}=u;
        return (`
        <div id="dataUsuarios">
            <h3>${nombre+" "+apellidos}</h3>
            <p>${correo}</p>
            <h5>Colección:</h5>
            <ul>
                ${(coleccion.map(c=>{return `<li>${c}</li>`}).join(""))}
            </ul>
            <h5>wishlist:</h5>
            <ul>
                ${(wishlist.map(wc=>{return `<li>${wc}</li>`}).join(""))}
            </ul>
        </div>
        `);       
    }).join("");
}

function dhtmlBooks(book){
    console.log("aqui")
    datosSalida.innerHTML=book.map(u => {
        const {autor,fechaPublicacion,imagen,titulo}=u;
        return (`
        <div id="dataBooks">
            <h3>${titulo}</h3>
            <img src="${imagen}" alt="${autor}"/>
            <h5>Autor: ${autor}</h5>
            <h5>Fecha de publicación: ${fechaPublicacion}</h5>
        </div>
        `);
        
    }).join("");
}