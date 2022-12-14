
async function consumirApi(){

    try{
    let  eventsJson = await fetch('https://mh-amazing.herokuapp.com/amazing')
         todosLosEventos = await eventsJson.json()
         
    }catch(error){
        console.log(error);
    }

    let eventsApi = todosLosEventos.events
    
    let past = eventsApi.filter(everyEvent => everyEvent.date <= todosLosEventos.date)
    console.log(past)


    imprimirCartas( past,'events')

let categorias = new Set( past.map(element => element.category))
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
        cadaCheck.addEventListener('click',() => search( past))
    })

}
printCategories(categorias,'checks')

let arrayEventos = categorias.map(cadaCategoria => {
    let arrayFiltrado = past.filter(cadaEvento => cadaEvento.category === cadaCategoria)
    return arrayFiltrado
})

function search(array,searchText = "") {

    let checks = document.querySelectorAll('.checkbox:checked')

    let filterArray = []
    checks.forEach(cadaCategoria => {
        let newArray = array.filter(cadaEvento => cadaEvento.category.toLowerCase() === cadaCategoria.value)

        filterArray = filterArray.concat(newArray)
    })

    if (filterArray.length===0) {
        filterArray = array
    }
    filterArray = filterArray.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()))
    imprimirCartas(filterArray,'events')
}
buscador.addEventListener("keyup",function(e){
    console.log(e.target.value)
    search(past,e.target.value)
})





}

consumirApi()

function imprimirCartas(array,id) {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(event =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
            <div class="styleCards card p-1" style="width: 15rem; heigth:8rem; ">
                    <img src="${event.image}" class="card-img-top" alt="imagen1">
                    <div class="card-body">
                        <h5 class="card-title fs-6 text">${event.name}</h5>
                        <p class="card-text"></p>
                        <div class="d-flex justify-content-between">
                            <h6 class="fs-6 text">Price: ${event.price}</h6>
                        <a href="../htmls/detalles.html?id=${event.id}" class="btn btn-danger">Details.</a>

                        </div>
                    </div>
                </div>

            `
    })
}
