const apiUrl = 'http://localhost:3000/produtos'

async function getOrderByChild(order,callback){
    console.log(order)
    const resp = await fetch(apiUrl+'?order='+order)
    const data = await resp.json()
    if (resp.status !== 200) throw Error(data.message);
    callback(data)
}

async function getFilterByChild(filter,value,callback){
    console.log([filter,value])
    const query = `?field=${filter}&search=${value}`
    const resp = await fetch(apiUrl+query)
    const data = await resp.json()
    if (resp.status !== 200) throw Error(data.message);
    callback(data)
}

async function getMostExpensive(setValue,list){
    const resp = await fetch(apiUrl+'?order=preco&reverse=1')
    const data = await resp.json()
    if (resp.status !== 200) throw Error(data.message);
    setValue([...data])
   return true;

}

function getMostCheap(callback){
    getOrderByChild("preco",callback)
}

async function getPriceRange(value,callback){
    const query = `/filter_price/?greater=0&less=${value}`
    const resp = await fetch(apiUrl+query)
    const data = await resp.json()
    if (resp.status !== 200) throw Error(data.message);
    callback(data)
}

export {getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange}
