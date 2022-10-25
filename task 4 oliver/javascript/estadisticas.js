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
        elemento.estimate = elemento.capacity
    })
   let ganacia = upcoming.map(item => item.price * item.estimate )
   console.log(ganacia)

    let arrayVacio = []
   let ganaciaEstimada = upcoming.filter(function(item){
        if(item.category.includes("party")){
            let x = item.estimate * 2
            return x.push()
        }
   })
   console.log(arrayVacio)




}
consumirApi()

function imprimirPrimeraTabla(propiedad, contenedor) {
    document.getElementById(contenedor).innerHTML = propiedad

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


