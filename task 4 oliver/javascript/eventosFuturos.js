



async function consumirApi(){

    try{
    let  eventsJson = await fetch('https://mh-amazing.herokuapp.com/amazing ')
         todosLosEventos = await eventsJson.json()
         
    }catch(error){
        console.log(error);
    }

    let eventsApi = todosLosEventos.events
    
    let upcoming = eventsApi.filter(everyEvent => everyEvent.date > todosLosEventos.date)
    console.log(upcoming)


    imprimirCartas( upcoming,'events')

let categorias = new Set( upcoming.map(element => element.category))
categorias = [...categorias]
let printCategories = (array,id) => {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(cat =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
            <label class="d-flex align-items-center p-1" for="${cat}">${cat}
                <input class="d-flex align-items-center m-1 checkbox" type="checkbox" id="${cat.toLowerCase()}" name="letter" value="${cat.toLowerCase()}">
            </label>
            `
    })
    let checks = document.querySelectorAll('.checkbox')
    checks.forEach(cadaCheck => {
        cadaCheck.addEventListener('click',() => search( upcoming))
    })

}
printCategories(categorias,'checks')

let arrayEventos = categorias.map(cadaCategoria => {
    let arrayFiltrado = eventsApi.filter(cadaEvento => cadaEvento.category === cadaCategoria)
    return arrayFiltrado
})

function search(array) {

    let checks = document.querySelectorAll('.checkbox:checked')

    let filterArray = []
    checks.forEach(cadaCategoria => {
        let newArray = array.filter(cadaEvento => cadaEvento.category.toLowerCase() === cadaCategoria.value)

        filterArray = filterArray.concat(newArray)
    })

    if (filterArray.length===0) {
        filterArray = array
    }
    imprimirCartas(filterArray,'events')
}






}

consumirApi()

function imprimirCartas(array,id) {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(event =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
            <div class="styleCards card p-1" style="width: 15rem; ">
                    <img src="${event.image}" class="card-img-top" alt="imagen1">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text"></p>
                        <div class="d-flex justify-content-between">
                            <h6>Price: ${event.price}</h6>
                        <a href="../htmls/detalles.html?id=${event.id}" class="btn btn-danger">Mas info.</a>

                        </div>
                    </div>
                </div>

            `
    })
}
