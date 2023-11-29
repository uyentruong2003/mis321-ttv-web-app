let itemsInCart = []
let currentMachineInfo = {id: 0, location: 'null', region: 'null', machineType: 0, machineStock: 0}

//Onload
async function handleOnLoad() {
    await setCurrentMachineInfo();
    await populateArray();
    populateReciptTable();
    populateCheckoutForm();
}

//Manipulate DOM
function populateReciptTable(){
    let total = 0
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
                    <h6>${item.name}</h6>
                </td>
                <td>
                    <h6>$${(item.price).toFixed(2)}</h6>
                </td>
            </tr>
        `
        total += parseFloat(item.price);
    })
    html+=`
                <div>
                <tr>
                    <td>
                        <h5 class="total-row">Total:</h5>
                    </td>
                    <td>
                        <h5 class="total-row">$${total.toFixed(2)}</h5>
                    </td>
                </tr>
                </div>
            </tbody>
        </table>
    `

    //Other information below the table
    let orderNumber = Date.now() //generate AND OR pull recipt number here
    localStorage.setItem("orderNumber", orderNumber)
    
    html+=`
    <div class="extra-info-box">
        <h5>Order Number: ${orderNumber}</h5>
        <h5>${currentMachineInfo.machineRegion} Region > ${currentMachineInfo.machineLocation} ID#${currentMachineInfo.machineId}</h5>
    </div>
    </div>
    `

    document.getElementById('app').innerHTML=html
}
function populateCheckoutForm(){
    let html=`
    <div class="card-info">
        <form onsubmit="return false" id="checkout-form">
        <h2 id="recipt-title">Card Information</h2>
        <div class="form-group">
            <label for="card-num">Card Number:</label>
            <input type="password" class="form-control" id="card-num" placeholder="XXXXXXXXXXXXXXXX (16 digits)">
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
            <input type="text" class="form-control" id="exp-date" placeholder="MM/YY">
        </div>
        <div class="form-group">
            <label for="zip-code">Zip Code:</label>
            <input type="card-name" class="form-control" id="zip-code">
            </div>
        <div>
            <a href="../HTML/ThankYou.html"><button type="button" class="btn btn-success" style="width: 200px;" onclick="handleCheckout()">Submit</button></a>
        </div>
        
        </form>
    </div>
    `
    document.getElementById('app').innerHTML+=html
}

// Call this function when handling the checkout
function handleCheckout() {


   AddTransaction()

   transactionStockUpdate()


    // Rest of your checkout logic
    let cardNum = document.getElementById('card-num').value;
    let cardName = document.getElementById('card-name').value;
    let cardCVV = document.getElementById('cvv-num').value;
    let cardExp = document.getElementById('exp-date').value;
    let zipCode = document.getElementById('zip-code').value;
    let myCard = { Number: cardNum, Name: cardName, CVV: cardCVV, Exp: cardExp, Zip: zipCode };

    localStorage.setItem('cardInfo', JSON.stringify(myCard));
    console.log('Card information received: ', JSON.stringify(myCard));
    document.getElementById('checkout-form').reset();

    //clear the cart after checkout
    localStorage.removeItem('currentCartArray');
}

//Data Manipulation
function populateArray(){
    var storedCartString = localStorage.getItem("currentCartArray");
    itemsInCart = JSON.parse(storedCartString)
    let i = 0
    console.log('parsed cart string: ', itemsInCart)
    
  }
  async function setCurrentMachineInfo(){
    let url = 'http://localhost:5141/api/vending/'
    let targetURL = url.concat(localStorage.getItem("selectedMachineId"))
    try {
      let response = await fetch(targetURL);
      let data = await response.json();
      console.log('Data fetched:', data);
  
      currentMachineInfo = data
      console.log('current machine: ', currentMachineInfo)
      return data;
  } catch (error) {
}
}
 
 async function AddTransaction() {
    const url = 'http://localhost:5141/api/Transaction';

    let myTransaction = {
        date: getCurrentDateTime()}

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myTransaction),
        });

        if (!response.ok) {
            throw new Error('Error updating database');
        }

        const data = await response.json();
        console.log('Transaction recorded:', data);
        
        } catch (error) {
        console.error('Error updating database:', error);
        // Handle the error appropriately in your application
        }
    }   
    
    function getCurrentDateTime() {
        let date = new Date();
        // Format the date to 'YYYY-MM-DD HH:MM:SS' format
        let formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        return formattedDate;
    }
/* 
     function createTransaction(){

        let myTransaction = {
        transactionDateTime: getCurrentDateTime()
        }

      updateDatabase(myTransaction)
    } */

   //J chillin

   async function transactionStockUpdate(){
        let UpdatedCart = formatCart(itemsInCart)
        
        //foreach item in cart 
        UpdatedCart.forEach(item => {
            updateStock(item, item.productId, item.machineId)
            let myMachine = updateMachineStock(currentMachineInfo)
            updateMachine(myMachine, myMachine.machineId)
        }) 

    }


    function formatCart(cart){

        let UpdatedCart = []
        for(let i = 0; i < cart.length; i++){
            console.log("cart", cart[i])
            UpdatedCart[i] = {}; 
            UpdatedCart[i].productId = cart[i].id
            UpdatedCart[i].machineId = cart[i].machineId
            UpdatedCart[i].stockQty = cart[i].qtyInMachine - 1
            UpdatedCart[i].lastUpdate = getCurrentDateTime()
            UpdatedCart[i].deleted = false
            console.log("Updated Cart", UpdatedCart[i])
        }
        return UpdatedCart

    }

    function updateMachineStock(machine){
        machine.machineQty = machine.machineQty - 1
        console.log("machine Updated Stock:",machine)
        return machine 
    }