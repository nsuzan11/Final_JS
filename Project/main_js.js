let cart= document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'BVB Puma Jersey',
        tag: 'dortmund',
        price: 80.35,
        total_in:0
    },
    {
        name: 'Adidas Predator mutator',
        tag: 'adidas_predator',
        price: 250.65,
        total_in:0
    },
    {
        name: 'Adidas football pads',
        tag: 'football_pad',
        price: 80.35,
        total_in:0
    }
]


for (let i=0; i<cart.length; i++) {
    cart[i].addEventListener('click',() =>{
        cartN(products[i]);
        totalcost(products[i]);
    })
}

function ifexists(){
    let prodN = localStorage.getItem('cartN');

    if (prodN) {
        document.querySelector('.cart span').textContent = prodN;
    }
}

function cartN(product){
    let prodN = localStorage.getItem('cartN');

    prodN = parseInt(prodN);

    if( prodN ) {
        prodN = parseInt(prodN);
        localStorage.setItem('cartN' , prodN + 1);
        document.querySelector('.cart span').textContent = prodN + 1;
    }
    else {
        prodN = parseInt(prodN);
        localStorage.setItem('cartN', 1);
        document.querySelector('.cart span').textContent = 1;   
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    console.log(cartItems);
    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    }
    else{
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }
  
    }
  
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalcost(product){
    
    let cartCost = localStorage.getItem("totalcost");
    console.log("My cartCost is",cartCost);
    
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price);
    }else{
        localStorage.setItem("totalcost", product.price);
    }
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalcost");


    if( cartItems && productContainer) {
    
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        
        <div class="product" >
            <ion-icon name="close-circle-outline"></ion-icon>
            <span style = "padding-left:300px" ><img src="./Image/${item.tag}.jpg" width="50px" height="50px"></span>
            <span>${item.name}</span>

            <span class="price" style = "padding-left:200px">$${item.price}</span>
            <span class="quantity" style = "padding-left:80px">
            ${item.inCart}
            </span>
            <span class="total" style = "padding-left:140px">
                $${item.inCart * item.price}
                 
            </span>
        </div>
            

        `
    });


    productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <span class="basketTotalTitle">
            Basket Total
            </span>
            <span class="basketTotal" style = "padding-left:580px">
                $${cartCost}
            </span>
        </div>
    `
}
}

ifexists();
displayCart();