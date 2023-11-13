let itemsInCart = []

let item1 = {productName: "Doritos - Cool Ranch", productPrice: 1}
let item2 = {productName: "Diet Coke", productPrice: 1.5}
let item3 = {productName: "SmartWater", productPrice: 2.5}
itemsInCart.push(item1)
itemsInCart.push(item2)
itemsInCart.push(item3)

//onload
function handleOnLoad(){
    populateCart()
    populateContinue()
}

//DOM Manipulation
function populateCart(){
    let html=`
    <div class="table-responsive" id="cart-table">
        <table class="table align-middle">
          <thead>
            <th>
              Image
            </th>
            <th>
                Name
            </th>
            <th>
                Price
            </th>
          </thead>
          <tbody>
            <div id="cart-rows">
    `
    itemsInCart.forEach(function(item){
        html+=`
        <tr>
                    <td>
                        <h3>image</h3> //INSERT IMAGE CALL HERE
                    </td>
                    <td>
                        <h3 id="cart-rows">${item.productName}</h3>
                    </td>
                    <td>
                        <h3 id="cart-rows">${item.productPrice}</h3>
                    </td>
                </tr>
        `
    })           
    html+=`
            </div>
          </tbody>
        </table>
      </div>
    `
    document.getElementById('app').innerHTML=html
}
function populateContinue(){
    let html=`
    <div class="center-container">
        <h4 id="display-info-cart">Southeast > Vending Machine A</h4>
      </div>
      <div class="center-container">
        <a href="./Checkout.html"><button type="button" class="btn btn-success" style="width: 200px;">Checkout</button></a>
      </div>
    `
    document.getElementById('app').innerHTML+=html
}

//Handling