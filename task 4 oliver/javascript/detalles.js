


async function consumirApi() {

    try {
        
        
        let ids = location.search.slice(4)
        let eventsJson = await fetch('https://mh-amazing.herokuapp.com/amazing')
        todosLosEventos = await eventsJson.json()
        console.log(todosLosEventos)
        let eventsApi = todosLosEventos.events
        
        
       let filtrarDetalles = eventsApi.filter(eventoos => eventoos.id == ids)
        let filtrarDetallesEnCartas = filtrarDetalles[0]
        imprimirCartas(filtrarDetallesEnCartas, "contenedor_informacion")
    } catch (error) {
        console.log(error);
    }

   
}
consumirApi()
function imprimirCartas(array, id) {
    document.getElementById(id).innerHTML =
        `
        <div class="card mb-3  ">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${array.image}"
                                class=" imagenn img-fluid rounded-start " alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body ">
                                <h5 class="card-title">${array.name}</h5>
                                <p class="card-text">${array.description}</p>
                                <div class="d-flex gap-3 py-3">
                                    <p class="card-text">${array.date}</p>
                                    
                                </div>
                                <div class="d-flex gap-5">
                                    <h5 class="card-text">Capacity: ${array.capacity}</h5>
                                    <h5 class="card-text">Price: ${array.price}</h5>
                                    <h5 class="card-text">Price: ${array.place}</h5>
                                </div>
                                <button class="btn btn-outline-success " type="button">Comprar</button>

                            </div>
                        </div>
                    </div>
                </div>
        `

}

