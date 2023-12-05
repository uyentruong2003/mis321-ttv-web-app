let itemsInCart = []
let currentMachineInfo = {id: 0, location: 'null', region: 'null', machineType: 0, machineStock: 0}
let orderInfo = {
    orderId: 1,
    orderDate: ''
}

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
    <div class="receipt-box">
        <table class="table">
            <thead>
                <th id="receipt-title" colspan="2"><h3>Receipt</h3></th>
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
    let orderNumber = Date.now() //generate AND OR pull receipt number here
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
        <form id="checkout-form" onSubmit="return false">
        <h2 id="receipt-title">Card Information</h2>
        <div class="form-group">
            <label for="card-num">Card Number:</label>
            <input type="password" class="form-control" id="card-num" placeholder="XXXXXXXXXXXXXXXX (16 digits)" required pattern="[0-9]{16}">
            <small id="card-num" class="form-text text-muted">All card information is secure</small>
        </div>
        <div class="form-group">
            <label for="card-name">Cardholder Name:</label>
            <input type="text" class="form-control" id="card-name" required>
        </div>
        <div class="form-group">
            <label for="cvv-num">CVV:</label>
            <input type="password" class="form-control" id="cvv-num" placeholder="***" pattern="[0-9]{3}" required>
            <label for="exp-date">Exp Date:</label>
            <div id="exp-date" class="exp-date-container">
                <input type="text" class="form-control" id="exp-date-month" placeholder="MM" required list="month-list">
                <datalist id="month-list">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </datalist>
                <input type="text" class="form-control" id="exp-date-month" placeholder="YY" required list="year-list">
                <datalist id="year-list">
                    <option value="24">2024</option>
                    <option value="25">2025</option>
                    <option value="26">2026</option>
                    <option value="27">2027</option>
                    <option value="28">2028</option>
                    <option value="29">2029</option>
                    <option value="30">2030</option>
                </datalist>
            </div>
        </div>
        <div class="form-group">
            <label for="zip-code">Zip Code:</label>
            <input type="text" class="form-control" id="zip-code" required pattern="[0-9]{5}">
            </div>
        <div>
            <button type="submit" class="btn btn-success" style="width: 200px; margin-top: 15px;" id="submit-button" onClick="handleSubmitButton()">Submit</button>
        </div>
       
        </form>
    </div>
    `
    document.getElementById('app').innerHTML+=html
}

// Call this function when handling the checkout
async function handleCheckout() {
    try {
        // Wait for AddTransaction to complete before moving to the next step
        await AddTransaction();

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

// Validate form:
function validateForm() {
    // Check card number
    const cardNumInput = document.getElementById('card-num');
    if (!cardNumInput.checkValidity()) {
        alert('Invalid card number. Please enter a valid 16-digit number.');
        return false;
    }

    // Check cardholder name
    const cardNameInput = document.getElementById('card-name');
    if (!cardNameInput.checkValidity()) {
        alert('Please enter the cardholder name.');
        return false;
    }

    // Check CVV
    const cvvInput = document.getElementById('cvv-num');
    if (!cvvInput.checkValidity()) {
        alert('Invalid CVV. Please enter a valid 3-digit number.');
        return false;
    }

    // Check zip code
    const zipCodeInput = document.getElementById('zip-code');
    if (!zipCodeInput.checkValidity()) {
        alert('Invalid zip code. Please enter a valid 5-digit number.');
        return false;
    }

    // Additional checks for other fields if needed

    // If all checks pass, allow form submission
    return true;
}

//put in the onClick of the submit button
async function handleSubmitButton (){
    //only if all inputs are valid
    if(validateForm()==true) {
        await handleCheckout();
        await updateOrderDetails();
        window.location.href = '../HTML/ThankYou.html';
        console.log('Navigating to ThankYou.html');
    }
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
    async function getTransactionId()
    {
      let url = 'http://localhost:5141/api/Transaction/'
      try {
        let response = await fetch(url);
        let data = await response.json();
        console.log('Data fetched:', data);
   
        orderInfo = data
        console.log('current transaction: ', orderInfo)
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
        await getTransactionId();
        console.log(itemsInCart);
        itemsInCart.forEach((item) => {
            let orderDetail = {
                productId: item.id,
                machineId: item.machineId,
                orderId: orderInfo.orderId
            }
            console.log(orderDetail); //print out each orderDetail
            postOrderDetailsToTable(orderDetail);
        })

    }
    async function postOrderDetailsToTable(newOrderDetail){
        try {
            const response = await fetch("http://localhost:5141/api/OrderDetails", {
                method: "POST",
                body: JSON.stringify(newOrderDetail),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
   
            if (!response.ok) {
                throw new Error(`Failed to save product. Status: ${response.status}.`);
            }
        } catch (error) {
            console.error(error);
            // Handle the error as needed (e.g., show an error message to the user)
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