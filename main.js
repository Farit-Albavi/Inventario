let ide = 0,
    cantProduct = 0,
    ganancias = 0,
    prodVendidos = 0
const formInputs = document.querySelectorAll("input")
const contadorVentas = document.getElementById("cntVentas")
const contadorGanancias = document.getElementById("cntGanancias")
const productContainer = document.getElementById("productContainer")
const productList = document.getElementById("productList")
const cntProdVendidos = document.getElementById("cntProdVendidos")
const sobraProductos = document.getElementById("ctnProdSobrante")
let arrayProducts = []

const errName = document.getElementById("errName")
const errPrice = document.getElementById("errPrice")
const errStock = document.getElementById("errStock")

class Producto {
    constructor(name, price, stock) {
        this.name = name
        this.price = price
        this.stock = stock
    }
}

//Panel de imputs
let btnIn = document.getElementById('form').addEventListener("submit", function (e) {
    e.preventDefault();

    //instanciamos un objeto con los valores de formInputs como parametro
    let producto = new Producto(formInputs[0].value, formInputs[1].value, formInputs[2].value)

    //Validacion de campos vacios o negativos
    const isValidName = validateField(formInputs[0], errName);
    const isValidPrice = validateField(formInputs[1], errPrice);
    const isValidStock = validateField(formInputs[2], errStock);

    //Si ningun campo esta vacio, accion =>
    if (isValidName && isValidPrice && isValidStock) {
        arrayProducts.push(producto)
        productContainer.classList.remove("hidden")
        addCard()

        //Info de la cantidad de productos cargados
        cantProduct += Number(formInputs[2].value)
        contadorVentas.textContent = cantProduct

        //reseteo de imputs
        document.getElementById("form").reset()

        //id del producto/tarjeta del producto
        ide++
    }
    console.log(arrayProducts);
});


//Funcion para crear la estructura de una tarjeta y añadirla al html
function addCard() {
    //Col-3 de boostrap
    const col = document.createElement("div")
    col.classList.add("col-3")

    //Creamos un card
    const card = document.createElement("div")
    card.classList.add("card")

    //Creamos el body del card
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    //creamos elementos del body
    const nombreProducto = document.createElement("h2")
    const h3tittle = document.createElement("h3")
    nombreProducto.textContent = "Producto: "
    h3tittle.textContent = arrayProducts[ide].name.charAt(0).toUpperCase() + arrayProducts[ide].name.slice(1)
    const stockTitle = document.createElement("h6")

    //mostrar stock
    stockTitle.textContent = "Cantidad en stock: "
    const stockinfo = document.createElement("h2")
    stockinfo.textContent = arrayProducts[ide].stock
    stockTitle.appendChild(stockinfo)

    //venta de productos
    const parrafo = document.createElement("p")
    parrafo.classList.add("card-text")
    parrafo.textContent = "Indique la cantidad vendida: "
    const inpt = document.createElement("input")
    inpt.classList.add("input-group-text", "m-auto")
    inpt.value = 0;
    inpt.type = "number"
    const btnVentas = document.createElement("button")
    btnVentas.classList.add("btn", "btn-secondary", "m-auto", "mt-3", "btn-ctrl")
    btnVentas.textContent = "Vender"

    //añadimos elementos al body
    cardBody.appendChild(nombreProducto)
    cardBody.appendChild(h3tittle)
    cardBody.appendChild(stockTitle)
    cardBody.appendChild(parrafo)
    cardBody.appendChild(inpt)
    cardBody.appendChild(btnVentas)

    //se arma el esqueleto de la tarjeta
    productList.appendChild(col)
    col.appendChild(card)
    card.appendChild(cardBody)

    //agregar id a cada boton "Vender"
    btnVentas.id = ide.toString();
    cardAction(cardBody, btnVentas, inpt, stockinfo)
}

function cardAction(cardBody, btnVentas, inpt, stockinfo) {
    cardBody.addEventListener("click", e => {

        if (e.target.classList.contains("btn-ctrl")) {
            if (arrayProducts[btnVentas.id].stock >= Number(inpt.value)) {
                arrayProducts[btnVentas.id].stock = calcularStockSobrante(arrayProducts[btnVentas.id].stock, inpt.value)
                stockinfo.textContent = arrayProducts[btnVentas.id].stock
                ganancias += calcularGanancias(inpt.value, arrayProducts[btnVentas.id].price)
                prodVendidos += Number(inpt.value)
                contadorGanancias.textContent = ganancias
                cntProdVendidos.textContent = prodVendidos
                sobraProductos.textContent = calcularStockSobrante(cantProduct, prodVendidos)
                // Eliminar la tarjeta si el stock es 0
                if (arrayProducts[btnVentas.id].stock === 0) {
                    deleteCard(cardBody, btnVentas)
                    deleteProduct(btnVentas)
                    reasignarIds(btnVentas)
                }
            } else {
                // No hay suficiente stock para realizar la venta
                alert("No hay suficiente stock para realizar esta venta.");
            }
        }
        console.log(btnVentas.id);
    })
}

//funcion para remover la tarjeta cuando el stock es 0
function deleteCard(cardBody, btnVentas) {
    const cardToRemove = cardBody.parentElement.parentElement
    cardToRemove.remove()
    checkStock()
}

//Funcion que borra un objeto Producto del array
function deleteProduct(btnVentas) {
    arrayProducts.splice(btnVentas.id, 1)
}

//Funcion que reasigna id's
function reasignarIds(btnVentas) {
    for (let currentId = btnVentas.id; currentId < arrayProducts.length; currentId++) {
        let nextButtonId = parseInt(currentId) + 1;
        let nextButton = document.getElementById(nextButtonId);
        nextButton.id = currentId
        ide = arrayProducts.length
    }
}

//Funcion para modificar para que cuando el array sea de 0 elementos agregue la clase hidden
function checkStock() {
    const stocks = arrayProducts.map(product => product.stock)
    const allSold = stocks.every(stock => stock === 0)
    if (allSold) {
        productContainer.classList.add("hidden")
    }
}

function calcularStockSobrante(x, y) {
    return Math.max(x - y, 0)
}

function calcularGanancias(cantidad, precio) {
    return Number(cantidad) * Number(precio)
}

//Funcion que valida los campos de entrada
function validateField(field, errorMessage) {
    if (field.value === "") {
        field.classList.add("is-invalid");
        errorMessage.textContent = "Este campo no puede estar vacío.";
        return false;
    } else if (field.value < 0) {
        field.classList.add("is-invalid");
        errorMessage.textContent = "Ingrese un número mayor a 0.";
        return false;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        return true;
    }
}



/*  
Para depurar
info en consola de las variables
console.log("-------------------------------------");
console.log("Id del producto: " + btnVentas.id);
console.log("Stock inicial del producto nro " + btnVentas.id + ": " + arrayProducts[btnVentas.id].stock);
console.log("Cantidad vendida: " + inpt.value);
console.log("Nuevo valor en stock: " + arrayProducts[btnVentas.id].stock);
console.log("Ganancias:  " + inpt.value + " * " + arrayProducts[btnVentas.id].price + " = " + venta)    
*/