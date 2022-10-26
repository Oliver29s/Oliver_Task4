async function consumirApi() {

    try {
        let eventsJson = await fetch('https://mh-amazing.herokuapp.com/amazing')
        todosLosEventos = await eventsJson.json()
    } catch (error) {
        console.log("error");
    }

    let eventsApi = todosLosEventos.events
    
    let upcoming = eventsApi.filter(everyEvent => everyEvent.date > todosLosEventos.date)

    let past = eventsApi.filter(everyEvent => everyEvent.date <= todosLosEventos.date)
    // primera tabla de eventos pasados
    past.map(pasadoEvento => {
        pasadoEvento.porcentaje = pasadoEvento.assistance * 100 / pasadoEvento.capacity
    })
    let ordenadoPorPorcentaje = past.sort((evento1, evento2) => evento1.porcentaje - evento2.porcentaje)
    let menor = ordenadoPorPorcentaje[0].name
    imprimirPrimeraTabla(menor, "menor_porcentaje")
    let mayor = ordenadoPorPorcentaje[ordenadoPorPorcentaje.length - 1].name
    imprimirPrimeraTabla(mayor, "mayor_porcentaje")
    let capacidadMayor = past.find(elemento => elemento.capacity >= 1000000).name
    imprimirPrimeraTabla(capacidadMayor, "mayor_capacidad")

    // primera tabla eventos futuros
    let categoriasFuture = new Set(upcoming.map(element => element.category))
    categoriasFuture = [...categoriasFuture]
    imprimirTablaFutura(categoriasFuture, "categoria_futuros")
    let categoriasPasado = new Set(past.map(element => element.category))
    categoriasPasado = [...categoriasPasado]
    imprimirTablaFutura(categoriasPasado, "categoria_pasados")
     let estimado = upcoming.map(elemento => {
        elemento.estimateAsistence = elemento.capacity
        elemento.estimateGanancia = elemento.capacity * elemento.price
    })
    let categoriaParty = upcoming.filter(item => item.category.toLowerCase() == "party" )
    console.log(categoriaParty)
    let ganaciaParty = categoriaParty.map(item=> item.estimateGanancia)
    console.log(ganaciaParty)
     let totalParty = (ganaciaParty.reduce(function(a,b){return a+b}))
     console.log(totalParty)
     let categoriaBook = upcoming.filter(item => item.category.toLowerCase() == "books" )
    console.log(categoriaBook)
    let ganaciaBook = categoriaBook.map(item=> item.estimateGanancia)
    console.log(ganaciaBook)
     let totalBook = (ganaciaBook.reduce(function(y,x){return y+x}))
     console.log(totalBook)
     let categoriaCinema = upcoming.filter(item => item.category.toLowerCase() == "cinema" )
    console.log(categoriaCinema)
    let ganaciaCinema = categoriaCinema.map(item=> item.estimateGanancia)
    console.log(ganaciaCinema)
     let totalCinema = (ganaciaCinema.reduce(function(y,x){return y+x}))
     console.log(totalCinema)
     let categoriaRace = upcoming.filter(item => item.category.toLowerCase() == "race" )
    console.log(categoriaRace)
    let ganaciaRace = categoriaRace.map(item=> item.estimateGanancia)
    console.log(ganaciaRace)
     let totalRace = (ganaciaRace.reduce(function(y,x){return y+x}))
     console.log(totalRace)
     let categoriaMuseum = upcoming.filter(item => item.category.toLowerCase() == "museum" )
     console.log(categoriaRace)
     let ganaciaMuseum = categoriaMuseum.map(item=> item.estimateGanancia)
     console.log(ganaciaRace)
      let totalMuseum = (ganaciaMuseum.reduce(function(y,x){return y+x}))
      console.log(totalMuseum)
      let categoriaConcert = upcoming.filter(item => item.category.toLowerCase() == "concert" )
     console.log(categoriaConcert)
     let ganaciaConcert = categoriaConcert.map(item=> item.estimateGanancia)
     console.log(ganaciaConcert)
      let totalConcert = (ganaciaConcert.reduce(function(y,x){return y+x}))
      console.log(totalConcert)
     
   
   




}
consumirApi()

function imprimirPrimeraTabla(propiedad, contenedor) {
    document.getElementById(contenedor).innerHTML += propiedad

}

function imprimirTablaFutura(array, contenedor) {
    document.getElementById(contenedor).innerHTML = ""
    array.forEach(elemento => {
        document.getElementById(contenedor).innerHTML +=
            `
            <tr>
                
                    <li>${elemento}</li>
                    
                
            </tr>
            
            `
    });

}


