let products = []
let machineId = 0
let currentCart = []

//Onload
async function handleOnLoad() {
    machineId = parseInt(localStorage.getItem("selectedMachineId"))
    console.log("machine id is ", machineId)    
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
function populateProductTable(){
    console.log("populating table")
    
    const filteredProducts = products.filter(item => item.machineId === machineId);
    console.log(filteredProducts)
    
    let html=`
    <table class="product-table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            `
    for (let i = 0; i < filteredProducts.length; i += 3) {
        html += '<tr>';
        for (let j = i; j < i + 3 && j < filteredProducts.length; j++) {
            const item = filteredProducts[j];
            html += `
        <td>
            <div class="card indiv-card" style="width: 18rem;">
                <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <h5 class="card-title">${item.name}</h5>
                    <img src="${item.imgURL}" class="card-img" alt="${item.name} Image">
                    <p class="card-text">${item.price}</p>
                    <p class="card-text">${item.qtyInMachine}</p>
                    <button class="add-to-cart" onclick="handleAddItem(${item.id})">Add to Cart</button>
                </div>
            </div>
        </td>
    `;
        }
        html += '</tr>';
    }
    
                
    html+=`
            </tbody>
        </table>
    `
    document.getElementById('app').innerHTML+=html
}

//Handling
function handleAddItem(id) {
    // Retrieve existing items from localStorage
    var existingCartString = localStorage.getItem("currentCartArray");
    var existingCart = JSON.parse(existingCartString) || []; // If no items, initialize as an empty array

    // Fetch the selected product based on the given id
    const filteredProducts = products.filter(item => item.machineId === machineId);
    const addProduct = filteredProducts.find(item => item.id == id);

    // Add the selected product to the existing array
    existingCart.push(addProduct);

    // Convert the array to a JSON string
    var updatedCartString = JSON.stringify(existingCart);

    // Update the currentCartArray in localStorage
    localStorage.setItem("currentCartArray", updatedCartString);

    console.log("Updated Cart:", existingCart);
}

async function populateArray() {
    try {
        let response = await fetch('http://localhost:5141/api/product');
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

