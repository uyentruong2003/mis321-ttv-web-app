let itemsInCart = []
let currentMachineInfo = {id: 0, location: 'null', region: 'null', machineType: 0, machineStock: 0}
//let orderInfo = []

//Onload
async function handleOnLoad() {
    await setCurrentMachineInfo();
    await populateArray();
    populateReciptTable();
    populateCheckoutForm();
    console.log("Items in cart after handleOnLoad:", itemsInCart);
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
            <small id="card-num" class="form-text text-muted">All card information is secure</small>
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
            <button type="submit" class="btn btn-success" style="width: 200px;" id="submit-button" onClick="handleSubmitButton()">Submit</button>
        </div>
        
        </form>
    </div>
    `
    document.getElementById('app').innerHTML+=html
    //../HTML/ThankYou.html
}

// Call this function when handling the checkout
async function handleCheckout() {
    try {
        // Wait for AddTransaction to complete before moving to the next step
        await AddTransaction();

        // Wait for updateOrderDetails to complete before moving to the next step
        //await updateOrderDetails();

        let cardNum = document.getElementById('card-num').value;
        let cardName = document.getElementById('card-name').value;
        let cardCVV = document.getElementById('cvv-num').value;
        let cardExp = document.getElementById('exp-date').value;
        let zipCode = document.getElementById('zip-code').value;
        let myCard = { Number: cardNum, Name: cardName, CVV: cardCVV, Exp: cardExp, Zip: zipCode };

        // Set the cardInfo in localStorage
        localStorage.setItem('cardInfo', JSON.stringify(myCard));

        // Clear the cart after checkout
        localStorage.removeItem('currentCartArray');
        console.log('Cleared array');

    } catch (error) {
        console.error('Error during checkout:', error);
        // Handle the error appropriately in your application
    }
}

//put in the onClick of the submit button
async function handleSubmitButton (){
    await handleCheckout();
    window.location.href = '../HTML/ThankYou.html';
    console.log('Navigating to ThankYou.html');
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
    // update machine qty
    await transactionStockUpdate()
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
        //add to the orderdetails table
        updateOrderDetails()
        
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
    async function getTransactionIds()
    { 
      let url = 'http://localhost:5141/api/Transaction/'
      try {
        let response = await fetch(url);
        let data = await response.json();
        console.log('Data fetched:', data);
    
        orderInfo = data
        console.log('current machine: ', orderInfo)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle the error appropriately in your application
    }
    }

   async function transactionStockUpdate(){
        let UpdatedCart = formatCart(itemsInCart)
        console.log(UpdatedCart)
        //foreach item in cart 
        UpdatedCart.forEach(item => {
            item.qtyInMachine = item.qtyInMachine-1
            updateStock(item, item.productId, item.machineId)

            let myMachine = updateMachineStock(currentMachineInfo)
            updateMachine(myMachine, myMachine.machineId)
        }) 

    }

    async function updateOrderDetails() {
        await getTransactionIds();
        
        for (const item of itemsInCart) {
            console.log(item)
            try {
                const data = {
                    productId: item.id,
                    machineId: item.machineId,
                    order_id: orderInfo.orderID
                };
    
                const response = await fetch("http://localhost:5141/api/OrderDetails", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to save stock. Status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
                // Handle the error as needed (e.g., show an error message to the user)
                throw error; // Propagate the error to the higher level
            }
        }
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