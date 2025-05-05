const nombreAlimento = document.getElementById("nombre-alimento");
const tipoAlimento = document.getElementById("tipo-alimento");
const cantidad = document.getElementById("cantidad");
const tipoUnidad = document.getElementById("tipo-unidad");
const tablaNutrientes = document.querySelector(".tabla-nutrientes");
const calorias = document.getElementById("calorias");
const azucares = document.getElementById("azucares");
const grasasTotales = document.getElementById("grasas-totales");
const grasasSaturadas = document.getElementById("grasas-saturadas");
const sodio = document.getElementById("sodio");
const edulcorante = document.getElementById("leyenda-edulcorante");
const cafeina = document.getElementById("leyenda-cafeina");

const button = document.getElementById("button");
const clearButton = document.getElementById("clear-button");

const body = document.querySelector("body");

const arrayInputsValues = [azucares, grasasTotales, grasasSaturadas, sodio];
const clearInputsValues = document.querySelectorAll("input");
const clearSelectValues = document.querySelectorAll("select");


 tipoAlimento.addEventListener("change", () =>{
    if(tipoAlimento.value === "Bebida Analcohólica"){
        tipoUnidad.value = "ml";
    } else{
        tipoUnidad.value = "g"
    }
 })

 button.disabled = true;
 button.classList.add("disabled");
 

 arrayInputsValues.forEach((arrayInputValue) =>{
    const crearAlerta = document.createElement("div");
    crearAlerta.classList.add("alerta");
    arrayInputValue.parentNode.insertBefore(crearAlerta, arrayInputValue.nextSibling);
 });

 arrayInputsValues.forEach((arrayInputValue, idx) => {
    arrayInputValue.addEventListener("input", function () {
        const valorString = arrayInputValue.value;
        let valorNum = parseFloat(valorString.replace(/,/g, '.'));

        const alertasArray = document.querySelectorAll(".alerta");
        const button = document.querySelector("#button");

        if (!/^[0-9,.]+$/.test(valorString)) {
            arrayInputValue.value = valorString.replace(/[^0-9,.]/g, ''); 
            valorNum = parseFloat(arrayInputValue.value.replace(/,/g, '.'));
        }

        if (isNaN(valorNum)) {
            alertasArray[idx].innerText = "Ingrese un número válido.";
            alertasArray[idx].classList.add("active");
            button.disabled = true;
            button.classList.add("disabled");
            arrayInputValue.classList.add("error");
        } else if (valorNum >= 10 && (valorString.includes(",") || valorString.includes("."))) {
            alertasArray[idx].innerText = "Valores mayores a 10 no deben declararse con coma.";
            alertasArray[idx].classList.add("active");
            button.disabled = true;
            button.classList.add("disabled");
            arrayInputValue.classList.add("error");
        } else if (valorNum < 10 && (valorString.includes(".") || valorString.includes(",,"))) {
            alertasArray[idx].innerText = "Emplea UNA sola coma y no puntos.";
            alertasArray[idx].classList.add("active");
            button.disabled = true;
            button.classList.add("disabled");
            arrayInputValue.classList.add("error");
        } else {
            alertasArray[idx].classList.remove("active");
            arrayInputValue.classList.remove("error");
        }
    });
});



calorias.addEventListener("input",() =>{
    calorias.value = calorias.value.replace(/[^\d]/g, '');
});



let trueStamps = [];
let trueLeyends = [];

clearButton.addEventListener("click", clearValues);
button.addEventListener("click", getValues);

// CALCULAR SELLOS 

function getValues(){
    
    button.disabled = true;
    button.classList.add("disabled");
    
    let hasStamp = false;

    caloriasVal = Number(calorias.value); // Kcal en porción //
    azucaresVal = Number(azucares.value.replace(",", ".")) * 4; // Kcal de azucares//
    grasasTotVal = Number(grasasTotales.value.replace(",", ".")) * 9; // Kcal de grasasTot //
    grasasSatVal = Number(grasasSaturadas.value.replace(",",".") * 9); // Kcal de grasasSat en 100g//
    sodioVal = Number(sodio.value.replace(",", ".")); //mgNa//

     //AZUCARES//

     if(azucaresVal >= (caloriasVal * 0.1) && azucaresVal != 0){
         trueStamps.push(0);
         hasStamp = true;
     } else{
        console.log("No posee sello de azucares");
     }

    //GRASAS TOTALES//


     if(grasasTotVal >= (caloriasVal * 0.3) && grasasTotVal != 0){
        trueStamps.push(1)
         hasStamp = true;
     } else{
      console.log("No posee sello de grasas totales");
     }

    //GRASAS SATURADAS//


     if(grasasSatVal >= (caloriasVal * 0.1) && grasasSatVal != 0){
        trueStamps.push(2)
         hasStamp = true;
     } else{
      console.log("No posee sello de grasas saturadas");
     }

     //SODIO//

     if(tipoAlimento.value === "Bebida Analcohólica" && caloriasVal === 0 && (sodioVal * 100) / cantidad.value >= 40){
        trueStamps.push(3);
     } else if((sodioVal / caloriasVal) >= 1 || (sodioVal * 100) / cantidad.value >= 300){
        trueStamps.push(3)
     }else{
      console.log("No posee sello de sodio");
     }

     //CALORIAS//

     if(tipoAlimento.value === "Bebida Analcohólica" && (caloriasVal * 100) / cantidad.value >= 25 && hasStamp){
        trueStamps.push(4)
        hasStamp = false;
     } else if((caloriasVal * 100) / cantidad.value >= 275 && hasStamp){
            trueStamps.push(4)
             hasStamp = false;
      } else{
         console.log("No posee sello de calorías");
         }

     //LEYENDAS//

     if(edulcorante.value === "SI"){
      trueLeyends.push(5);
     } else{
      console.log("No posee leyenda edulcorante");
     }
     if(cafeina.value === "SI"){
      trueLeyends.push(6);
     } else{
      console.log("No posee leyenda edulcorante");
     }

      printResult(trueStamps,trueLeyends);
 }

// IMPRIMIR SELLOS

  function printResult(trueStamps,trueLeyends){
    
    let crearMensaje = document.createElement("div");
    crearMensaje.classList.add("mensaje");
    crearMensaje.classList.add("transition-class");
    crearMensaje.innerHTML = `<button class='close-button' id='close-button'><i class="fa-solid fa-xmark"></i></button>
    <h4>Resultado de analisis de nutrientes: ${nombreAlimento.value}</h4>
    <hr>
<div class='mensaje-container'>
    <p>Contiene los siguientes sellos</p>
        <div class="sellos">
        ${trueStamps.map((trueStamp) =>
         `<img src='/images/${trueStamp}.png' class='sello'>`
       ).join('')}
        </div>
    <p>Contiene las siguientes leyendas</p>
        <div class="leyendas">
        ${trueLeyends.map((trueLeyend) =>
        `<img src="/images/${trueLeyend}.png" class='leyenda'>`
         ).join('')}
        </div>
</div>`
   
   body.appendChild(crearMensaje);
   void crearMensaje.offsetWidth;
   crearMensaje.classList.add('active');
   const closeButton = document.getElementById("close-button");
   closeButton.addEventListener("click", () => {
       sellosViejos = document.querySelector(".sellos");
       sellosViejos.innerHTML = "";
       leyendasViejas = document.querySelector(".leyendas");
       leyendasViejas.innerHTML = "";
   
       crearMensaje.classList.add("leave"); 
       setTimeout(() => {
           crearMensaje.classList.remove("active", "leave"); 
           crearMensaje.remove();
       }, 300); 
   
       trueStamps.length = 0;
       trueLeyends.length = 0;
       button.disabled = false;
       button.classList.remove("disabled");
   });
  }
  //BORRAR VALORES INPUTS
  
  function clearValues(){

    clearInputsValues.forEach((clearInputValue) =>{
        clearInputValue.value = "";
    })

    clearSelectValues.forEach((clearSelectValue) =>{
        clearSelectValue.selectedIndex = 0;
    })

  }
  
  document.addEventListener("submit", e =>{
    e.preventDefault();
  })

  tablaNutrientes.addEventListener("input", e =>{

    if(tablaNutrientes.checkValidity()){
        if(![...document.querySelectorAll(".active")].length > 0){
            button.disabled = false;
            button.classList.remove("disabled");
        }
    } else{
        button.disabled = true;
        button.classList.add("disabled");
    }

  })