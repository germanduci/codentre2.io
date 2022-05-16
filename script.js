///CLASES Y CONSTRUCTORES///

class ticket{
    constructor(pasajero,tramTime,origin,destination,id){        
        this.pasajero=pasajero;
        this.tramTime=tramTime;
        this.origin=origin;
        this.destination=destination;
        this.id=id;        
    }
}

class locations{
    constructor(location){
        this.location=location;
    }
}
///BLUE
const sectorC = new locations("Sector C Test Labs");
const sectorB = new locations("Sector B Coolant Reserve");
const area9 = new locations("Area 9 Central Transit Hub");
///RED
const level3 = new locations("Level 3 Dormitories");
const sectorG = new locations("Sector G Hydro Electric");
const area3 = new locations("Area 3 Medium Security Facilities");
const freight = new locations("Freight Yard");
///GREEN
const level1 = new locations("Main Facility Entrance");
const sectorE = new locations("Sector E Biodome Complex");
const area7 = new locations("Area 7 Recreational Facilities");
const sectorA = new locations("Sector A Training Facilities");
///YELLOW
const sectorD = new locations("Sector D Administration");
const high = new locations("High Altitude Launch Center");
const sectorF = new locations("Sector F Lambda Complex");



const blueLineTram = [sectorC,sectorB,area9];
const redLineTram = [level3,sectorG,area3,freight];
const greenLineTram = [level1,sectorE,area7,sectorA];
const yellowLineTram = [sectorD,high,sectorF];


///CONTENEDORES DE OBJETOS///
const sectors=[sectorA,sectorB,sectorC,
    sectorD,sectorE,sectorF,sectorG,level1,
    level3,area3,area7,area9,freight,high]

const tramLines=[blueLineTram,redLineTram,greenLineTram,yellowLineTram];


///LOCAL STORAGE INIT///
let tickets = []
if(localStorage.getItem('Tickets')){
    tickets = JSON.parse(localStorage.getItem('tickets'))
}else{
localStorage.setItem('Tickes',JSON.stringify(tickets));
}

///DOM GENERAL///
let blueTram = document.getElementById("blueTram");
let redTram = document.getElementById("redTram");
let greenTram = document.getElementById("greenTram");
let yellowTram = document.getElementById("yellowTram");
let tituloLinea = document.getElementById("tituloLinea");
let detalleLinea = document.getElementById("detalleLinea");
let tramTicket = document.getElementById("requestTicket");
let tramSelect = document.getElementById("tramSelect")
let tramOrigin = document.getElementById("tramOrigin");
let tramDestination = document.getElementById("tramDestination");
let myTickets = document.getElementById("myTickets");
let showTickets = document.getElementById("showTickets")

///EVENTS LISTENERS///

///los siguientes muestran información de la línea de Tram.
blueTram.addEventListener('submit', (event) => {    
    event.preventDefault(); 
    blueLine();    
})
redTram.addEventListener('submit', (event) => {    
    event.preventDefault(); 
    redLine();    
})
greenTram.addEventListener('submit', (event) => {    
    event.preventDefault(); 
    greenLine();    
})
yellowTram.addEventListener('submit', (event) => {    
    event.preventDefault(); 
    yellowLine();    
})

//crear ticket nuevo
tramTicket.addEventListener('submit', (event) => {
    event.preventDefault();
    let id = Math.ceil(Math.random()*10000);
    let formData = new FormData(event.target)
    const ordenTicket = new ticket (formData.get('pasajero'),formData.get('tramTime'),formData.get('origin'),
    formData.get('ending'),id) 
    tickets.push(ordenTicket);
    localStorage.setItem('ticket',JSON.stringify(tickets));   
    tramTicket.reset();
})

//Ver tickets generados
myTickets.addEventListener('click', () => { 
    let ticketStorage = JSON.parse(localStorage.getItem('ticket'))
    ticketStorage.forEach(ticket => {        
        showTickets.innerHTML+=`
                <tr class="table-success">
                    <th scope="row">${ticket.pasajero}</th>
                    <td>${ticket.tramTime}</td>
                    <td>${ticket.origin}</td>
                    <td>${ticket.destination}</td>
                    <td>${ticket.id}</td>
                </tr>        
        `
    })
})

///FUNCIONES PARA COMPLETAR DATOS O MODIFICAR EL DOM
function populateTram(){
    sectors.forEach(locations => {
        tramOrigin.innerHTML+=`<option value="${locations.location}">${locations.location}</option>`
        tramDestination.innerHTML+=`<option value="${locations.location}">${locations.location}</option>`
    }) 
}

function blueLine(){    
    tituloLinea.innerText=`Blue Line Tram`
    tituloLinea.className=`text-info`
    detalleLinea.innerText=`Blue Line Tram runs between:
    1. Sector C Test Labs
    2. Sector B Coolant Reserve
    3. Area 9 Central Transit Hub`
}

function redLine(){    
    tituloLinea.innerText=`Red Line Tram`
    tituloLinea.className=`text-warning`
    detalleLinea.innerText=`Red Line Tram runs between:
    1. Level 3 Dormitories
    2. Sector G Hydro Electric
    3. Area 3 Medium Security Facilities
    4. Freight Yard`
}

function greenLine(){
    tituloLinea.innerText=`Blue Line Tram`
    tituloLinea.className=`text-success`
    detalleLinea.innerText=`Green Line Tram runs between:
    1. Level 1 Main Facility Entrance
    2. Sector E Biodome Complex
    3. Area 7 Recreational Facilities
    4. Sector A Training Facility`

}

function yellowLine(){    
    tituloLinea.innerText=`Yellow Line Tram`
    tituloLinea.className=`text-warning`
    detalleLinea.innerText=`Yellow Line Tram runs between:
    1. Sector D Administration
    2. High Altitude Launch Center
    3. Sector F Lambda Complex`
}

///EJECUCION///
populateTram();








