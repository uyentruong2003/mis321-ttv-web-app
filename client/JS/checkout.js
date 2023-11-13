let itemsInCart = []
let total = 0

let item1 = {productName: "Doritos - Cool Ranch", productPrice: 1}
let item2 = {productName: "Diet Coke", productPrice: 1.5}
let item3 = {productName: "SmartWater", productPrice: 2.5}
itemsInCart.push(item1)
itemsInCart.push(item2)
itemsInCart.push(item3)

//Onload
function handleOnLoad(){
    populateReciptTable()
    populateCheckoutForm()
}

//Manipulate DOM
function populateReciptTable(){
    let html=`
    <div class="recipt-box">
        <table class="table">
            <thead>
                <th id="recipt-title" colspan="2"><h3>Recipt</h3></th>
                <!-- <th>Price</th> -->
            </thead>
            <tbody>
    `
    itemsInCart.forEach(function(item){
        html+=`
        <div>
            <tr>
                <td>
                    <h6>${item.productName}</h6>
                </td>
                <td>
                    <h6>${item.productPrice}</h6>
                </td>
            </tr>
        `
    })
    itemsInCart.forEach(function(item){
        total+=item.productPrice
    })
    html+=`
                <div>
                <tr>
                    <td>
                        <h5 class="total-row">Total:</h5>
                    </td>
                    <td>
                        <h5 class="total-row">${total}</h5>
                    </td>
                </tr>
                </div>
            </tbody>
        </table>
    `

    //Other information below the table
    let orderNumber = 1234567890 //generate AND OR pull recipt number here
    let machineLocation = "Hewson 1st Floor - Commons"
    
    html+=`
    <div class="extra-info-box">
        <h5>Order Number: ${orderNumber}</h5>
        <h5>${machineLocation}</h5>
    </div>
    </div>
    `

    document.getElementById('app').innerHTML=html
}
function populateCheckoutForm(){
    let html=`
    <div class="card-info">
        <form onsubmit="return false">
        <h2 id="recipt-title">Card Information</h2>
        <div class="form-group">
            <label for="card-num">Card Number:</label>
            <input type="text" class="form-control" id="card-num" placeholder="XXXX XXXX XXXX XXXX">
            <small id="card-num" class="form-text text-muted">on god all card information is secure</small>
        </div>
        <div class="form-group">
            <label for="card-name">Cardholder Name:</label>
            <input type="card-name" class="form-control" id="card-name">
        </div>
        <div class="form-group">
            <label for="cvv-num">CVV:</label>
            <input type="password" class="form-control" id="cvv-num" placeholder="***">
            <label for="exp-date">Exp Date:</label>
            <input type="password" class="form-control" id="exp-date" placeholder="MMYY">
        </div>
        <div class="form-group">
            <label for="zip-code">Zip Code:</label>
            <input type="card-name" class="form-control" id="zip-code">
            </div>
        <div>
            <button type="button" class="btn btn-success" style="width: 200px;" onclick="handleCheckout()">Submit</button>
        </div>
        
        </form>
    </div>
    `
    document.getElementById('app').innerHTML+=html
}

//Handling
function handleCheckout(){
    let cardNum = document.getElementById('card-num').value
    let cardName = document.getElementById('card-name').value
    let cardCVV = document.getElementById('cvv-num').value
    let cardExp = document.getElementById('exp-date').value
    let zipCode = document.getElementById('zip-code').value
    let myCard = {Number: cardNum, Name: cardName, CVV: cardCVV, Exp: cardExp, Zip: zipCode}
    
    //do whatever with the card object
    console.log(JSON.stringify(myCard))
}