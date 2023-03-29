let ide = 0,
    cantProduct = 0,
    venta = 0,
    prodVendidos = 0;
const inputs = document.querySelectorAll("input")
const mostrarVentas = document.getElementById("cntVentas")
const mostrarGanancias = document.getElementById("cntGanancias")
const productContainer = document.getElementById("productContainer")
const productContainer1 = document.getElementById("productContainer1")
const cntProdVendidos = document.getElementById("cntProdVendidos")
const ctnProdSobrante = document.getElementById("ctnProdSobrante")
let arrayProducts = []

class Producto {
    constructor(name, price, stock) {
        this.name = name
        this.price = price
        this.stock = stock
    }
}


let btnIn = (_a = document.getElementById('btnIn')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
    e.preventDefault();

    //instanciamos un objeto con los valores de los inputs como parametro
    let p = new Producto(inputs[0].value, inputs[1].value, inputs[2].value)

    //Validacion de campos vacios
    if (p.name == "") {
        inputs[0].classList.add("is-invalid")
    } else {
        inputs[0].classList.remove("is-invalid")
        inputs[0].classList.add("is-valid")
    }
    if (p.price == "") {
        inputs[1].classList.add("is-invalid")
    } else {
        inputs[1].classList.remove("is-invalid")
        inputs[1].classList.add("is-valid")
    }
    if (p.stock == "") {
        inputs[2].classList.add("is-invalid")
    } else {
        inputs[2].classList.remove("is-invalid")
        inputs[2].classList.add("is-valid")
    }

    //Si ningun campo esta vacio, accion =>
    if (p.name !== "" && p.price !== "" && p.stock !== "") {
        arrayProducts.push(p)
        productContainer.classList.remove("hidden")
        addCard()

        //Info de la cantidad de productos cargados
        cantProduct += Number(inputs[2].value)
        mostrarVentas.textContent = cantProduct

        //reseteo de imputs
        inputs[0].value = ""
        inputs[1].value = ""
        inputs[2].value = ""

        ide++
    }

});

function addCard() {
    //Creamos la estructura de la tarjeta
    const divCol = document.createElement("div")
    divCol.classList.add("col-3")
    const divCard = document.createElement("div")
    divCard.classList.add("card")
    const divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body")
    //Creamos estructura del body de la tarjeta
    const nombreProducto = document.createElement("h2")
    const title = document.createElement("h3")
    //Mostrar nombre del producto
    nombreProducto.textContent = "Producto: "
    title.textContent = arrayProducts[ide].name.charAt(0).toUpperCase() + arrayProducts[ide].name.slice(1)
    const stockTittle = document.createElement("h6")
    //mostrar stock
    stockTittle.textContent = "Cantidad en stock: "
    const stockinfo = document.createElement("h2")
    stockinfo.textContent = arrayProducts[ide].stock
    stockTittle.appendChild(stockinfo)
    //venta de productos
    const parr = document.createElement("p")
    parr.classList.add("card-text")
    parr.textContent = "Indique la cantidad vendida: "
    const inpt = document.createElement("input")
    inpt.classList.add("input-group-text", "m-auto")
    inpt.value = 0, inpt.type = "number"
    const btnVentas = document.createElement("button")
    btnVentas.classList.add("btn", "btn-secondary", "m-auto", "mt-3", "btn-ctrl")
    btnVentas.textContent = "Vender"
    btnVentas.setAttribute("id", "btnOut")
    //se arma el esqueleto de la tarjeta
    productContainer1.appendChild(divCol)
    divCol.appendChild(divCard)
    divCard.appendChild(divCardBody)
    divCardBody.appendChild(nombreProducto)
    divCardBody.appendChild(title)
    divCardBody.appendChild(stockTittle)
    divCardBody.appendChild(parr)
    divCardBody.appendChild(inpt)
    divCardBody.appendChild(btnVentas)

    btnVentas.id = "" + ide
    cardAction(divCardBody, btnVentas, inpt, stockinfo)
}



function cardAction(divCardBody, btnVentas, inpt, stockinfo) {
    divCardBody.addEventListener("click", e => {
        if (e.target.classList.contains("btn-ctrl")) {
            arrayProducts[btnVentas.id].stock = calcularStockSobrante(arrayProducts[btnVentas.id].stock, inpt.value)
            stockinfo.textContent = arrayProducts[btnVentas.id].stock
            venta += calcularGanancias(inpt, btnVentas)
            mostrarGanancias.textContent = venta
            prodVendidos += Number(inpt.value)
            cntProdVendidos.textContent = prodVendidos
            ctnProdSobrante.textContent = Number(cantProduct) - Number(prodVendidos)
        }

        // if (arrayProducts[btnVentas.id].stock == 0) {}

    })
}

function calcularStockSobrante(x, y) {
    return x - y
}

function calcularGanancias(inpt, btnVentas) {
    return Number(inpt.value) * Number(arrayProducts[btnVentas.id].price)
}


// //info en consola de las variables
// console.log("-------------------------------------");
// console.log("Id del producto: " + btnVentas.id);
// console.log("Stock inicial del producto nro " + btnVentas.id + ": " + arrayProducts[btnVentas.id].stock);
// console.log("Cantidad vendida: " + inpt.value);
// console.log("Nuevo valor en stock: " + arrayProducts[btnVentas.id].stock);
// console.log("Ganancias:  " + inpt.value + " * " + arrayProducts[btnVentas.id].price + " = " + venta)