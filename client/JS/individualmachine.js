//individualmachine.js
let products = []
let machineId = 0
let currentCart = []
let currentMachineInfo = {id: 0, location: 'null', region: 'null', machineType: 0, machineStock: 0}

//Onload
async function handleOnLoad() {
    machineId = parseInt(localStorage.getItem("selectedMachineId"))
    console.log("machine id is ", machineId)
    await setCurrentMachineInfo()    
    populateMachineInfo()
    try {
        let data = await populateArray();
        console.log('Products:', data);
        populateProductTable(); // Move this line inside the try block
    } catch (error) {
        console.error('Error during onload:', error);
        // Handle the error appropriately in your application
    }
}



//DOM Manipulation
function populateProductTable() {
    console.log("populating table");

    const filteredProducts = products.filter(item => item.machineId === machineId);
    console.log("filtered products: ", filteredProducts);

    let html = `
    <table class="product-table">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < filteredProducts.length; i += 3) {
        html += '<tr>';
        for (let j = i; j < i + 3 && j < filteredProducts.length; j++) {
            if (filteredProducts[j].deleted == false) {
                const item = filteredProducts[j];
                html += `
                    <td>
                        <div class="card indiv-card" style="width: 18rem;">
                            <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
                                <h5 class="card-title">${item.name}</h5>
                                <img src="${item.imgURL}" class="card-img" alt="${item.name} Image">
                                <p class="card-text">$${(item.price).toFixed(2)}</p>
                                <p class="card-text" id="stock-amt">Stock: ${item.qtyInMachine}</p>
                                <button class="add-to-cart" onclick="handleAddItem(${item.id})">Add to Cart</button>
                                <span id="temporary-message-${item.id}" class="temporary-message"></span>
                                
                                <!-- Add dropdown button and content -->
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        More Info
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <p>Additional information: ${item.description}</p>
                                        <!-- Add more information as needed -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                `;
            }
        }
        html += '</tr>';
    }
    html += `
        </tbody>
    </table>
    `;
    document.getElementById('app').innerHTML += html;

    
}

function populateMachineInfo(){
    let html = `<h4 class="display-machine">${currentMachineInfo.machineRegion} Region > ${currentMachineInfo.machineLocation} #${currentMachineInfo.machineId}</h4>`
    document.getElementById('app').innerHTML+=html
}

//Handling
    async function handleAddItem(id) {
    // Retrieve existing items from localStorage
    var existingCartString = localStorage.getItem("currentCartArray");
    var existingCart = existingCartString ? JSON.parse(existingCartString) : [];

    // Fetch the selected product based on the given id
    const filteredProducts = products.filter(item => item.machineId === machineId);

    let check = checkStockQuanity(id, filteredProducts)
    if(check == 1){
    
    const addProduct = filteredProducts.find(item => item.id == id);

    // Add the selected product to the existing array
    existingCart.push(addProduct);

    // Convert the array to a JSON string
    var updatedCartString = JSON.stringify(existingCart);

    // Update the currentCartArray in localStorage
    localStorage.setItem("currentCartArray", updatedCartString);

    console.log("Updated Cart:", existingCart);

    const temporaryMessage = document.getElementById(`temporary-message-${id}`);
    if (temporaryMessage) {
        temporaryMessage.textContent = "Added to Cart!";
        setTimeout(() => {
            temporaryMessage.textContent = ""; // Clear the message after a short duration
        }, 2000); // Adjust the duration (in milliseconds) as needed
    }
    }

    else{
        const temporaryMessage = document.getElementById(`temporary-message-${id}`);
        if (temporaryMessage) {
        
        temporaryMessage.textContent = "Not Enough Stock";
        setTimeout(() => {
            temporaryMessage.textContent = ""; // Clear the message after a short duration
        }, 2000); // Adjust the duration (in milliseconds) as needed
    }}
}



//checking


function checkStockQuanity(id, filteredProducts){

    var existingCartString = localStorage.getItem("currentCartArray");
    var existingCart = JSON.parse(existingCartString) || [];
    console.log("existingCart:", existingCart);

    let maxCount = 0
    

        filteredProducts.forEach(item => {
            if(item.id == id){
                maxCount = item.qtyInMachine
            }
        });


        if(maxCount == 0){
            return -1
        }
        
    else{
        console.log("max Count", maxCount);
        let appearances = 0;

        existingCart.forEach(item => {
            if(item.id == id){
                appearances++
            }
        });

        if( appearances==maxCount){
            return -1 
        }
        else{return 1}
    }


}


// async function populateArray() {
//     try {
//         let response = await fetch('http://localhost:5141/api/order');
//         let data = await response.json();
//         console.log('Data fetched:', data);

//         // Assuming that the fetched data is an array of products
//         products = data

//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

async function populateArray() {
    try {
        let response = await fetch('http://localhost:5141/api/order');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log('Data fetched:', data);

        // Assuming that the fetched data is an array of products
        products = data;

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // You might want to handle the error appropriately in your application
    }
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
      console.error('Error fetching data:', error);
      throw error; // You might want to handle the error appropriately in your application
  }
  }