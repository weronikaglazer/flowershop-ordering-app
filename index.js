import { menuArray } from './data.js'
import { orderArray } from './data.js'
const orderItemsDiv = document.getElementById("order-items")
const orderContainerDiv = document.getElementById("order-container")
const paymentModalDiv = document.getElementById("payment-modal")
let total = 0

document.addEventListener('click', function(e){
    if (e.target.dataset.addbtn){
        handleAddToOrderClick(e.target.dataset.addbtn)
    } 
    else if (e.target.dataset.removebtn){
        handleRemoveItemClick(e.target.dataset.removebtn)
    }
    else if (e.target.id == "complete-btn"){
        handleCompleteClick()
    }
    else if(e.target.id == "pay-btn") {
        handlePayClick()
    }
    else if(e.target.id == "close-btn"){
        handleCloseModalClick()
    }
})

function handleAddToOrderClick(productId){
    const targetProduct = menuArray.filter(function(product){
        return product.id == productId
    })[0]
    orderContainerDiv.classList.remove("hidden")
    orderArray.push(targetProduct)
    renderOrder()
}

function handleRemoveItemClick(productId){
    const targetProduct = orderArray.filter(function(product){
        return product.id == productId
    })[0]
    const removedProductIndex = orderArray.indexOf(targetProduct)
    orderArray.splice(removedProductIndex, 1)
    
    if (orderArray.length === 0){
        orderContainerDiv.classList.add('hidden')
    } else {
        renderOrder()
    }
}

function handleCompleteClick(){
    paymentModalDiv.classList.remove('hidden')
    document.getElementById('complete-btn').disabled = true
}

function handlePayClick() {
    document.getElementById("payment-form").addEventListener("submit", function(e){
        e.preventDefault()
        paymentModalDiv.classList.remove('hidden')
        paymentModalDiv.style.height = "35%"
        paymentModalDiv.innerHTML = `
        <div>
            <button class="close-btn" id="close-btn">X</button>
            <h1 style="padding: 60px 0;"> Thank you for your order! </h1>
        </div>
        `
        this.submit()
    })
}

function handleCloseModalClick() {
    location.reload()
}

function getOrderHtml() {
    let price = 0
    let orderHtml = ``
    orderArray.forEach(order => {
        price += order.price
        orderHtml += `
        <div class="order-item">
            <div class="item-remove-container">
                <p class="selected-item-name">${order.name}</p>
                <button class="remove-btn" data-removebtn=${order.id}>Remove</button>
            </div>
            <div class="item-price-container">
                <p class="selected-item-price">$ ${order.price}</p>
            </div>
        </div>
        `
    })
    
    total = price
    return orderHtml
}

function getProductsHtml() {
    let productsHtml = ``
    
    menuArray.forEach(item => {
        productsHtml += `
        <div class="product">
            <h1 class="icon">${item.emoji}</h1>
            <div class="product-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="properties-array">
                    ${item.properties[0]}, ${item.properties[1]}, ${item.properties[2]}
                </p>
                <h3 class="price">$${item.price}</h3>
            </div>
            <button class="add-btn" id="add-btn" data-addbtn="${item.id}">+</button>
        </div>
        `
    })
    
    return productsHtml 
}

function renderOrder(){  
    orderItemsDiv.innerHTML = getOrderHtml()
    
    document.getElementById('total-price').innerText = '$'+total
}

function render() {
    const productsDiv = document.getElementById("products-container")
    productsDiv.innerHTML = getProductsHtml()
}

render()