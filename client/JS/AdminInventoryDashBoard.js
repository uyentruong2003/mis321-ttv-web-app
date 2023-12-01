// DUMMY DATA
let tempProductList = [];
 

// let inventoryData = [
//   {
//     id: 1,
//     name: 'Doritos',
//     categoryid: 1,
//     machineId: 7,
//     qtyInMachine: 10,
//     price: 2.55,
//     region: 'Northwest'
//   },
//   {
//     id: 2,
//     name: 'Coca-Cola',
//     categoryid: 2,
//     machineId: 9,
//     qtyInMachine: 19,
//     price: 1.25,
//     region: 'Northeast'
//   },
//   {
//     id: 3,
//     name: 'Headphones',
//     categoryid: 3,
//     machineId: 4,
//     qtyInMachine: 7,
//     price: 2.25,
//     region: 'Southeast'
//   },
//   {
//     id: 4,
//     name: 'Mountain Dew',
//     categoryid: 1,
//     machineId: 8,
//     qtyInMachine: 15,
//     price: 1.75,
//     region: 'Southwest'
//   },
//   {
//     id: 5,
//     name: 'Laptop',
//     categoryid: 3,
//     machineId: 5,
//     qtyInMachine: 5,
//     price: 899.99,
//     region: 'Midwest'
//   },
//   {
//     id: 6,
//     name: 'Snickers',
//     categoryid: 2,
//     machineId: 6,
//     qtyInMachine: 15,
//     price: 1.50,
//     region: 'Southeast'
//   },
//   {
//     id: 7,
//     name: 'Pepsi',
//     categoryid: 1,
//     machineId: 10,
//     qtyInMachine: 12,
//     price: 1.50,
//     region: 'Northwest'
//   },
//   {
//     id: 8,
//     name: 'Wireless Mouse',
//     categoryid: 3,
//     machineId: 11,
//     qtyInMachine: 8,
//     price: 12.99,
//     region: 'Northeast'
//   },
//   {
//     id: 9,
//     name: 'Chips Ahoy',
//     categoryid: 1,
//     machineId: 12,
//     qtyInMachine: 20,
//     price: 2.00,
//     region: 'Southwest'
//   },
//   {
//     id: 10,
//     name: 'Bluetooth Speaker',
//     categoryid: 3,
//     machineId: 13,
//     qtyInMachine: 10,
//     price: 29.99,
//     region: 'Northeast'
//   },
//   // Add more items as needed
// ];
 
// let transactions = [
//   {
//     categoryid: 1,
//     productid: 1
//   },
//   {
//     categoryid: 2,
//     productid: 2
//   },
//   {
//     categoryid: 3,
//     productid: 3
//   },
//   {
//     categoryid: 1,
//     productid: 4
//   },
//   {
//     categoryid: 3,
//     productid: 5
//   },
//   // Add more transactions as needed
// ];
 
  // END DUMMY DATA
 
 
 
// TODO FIGURE HOW DELETE IS BEING HANDELED
 
const apiUrl = 'http://localhost:5141/api/AdminDash';
const salesDataURL = 'http://localhost:5141/api/SalesData'
let inventoryAvailable = '';
let soldInventory = '';
let salesRevenue = 3.5;
let salesData = [];
let adminsalesData =[];


function HandleOnLoad(){
  fetchData(apiUrl)
  .then(apiResponse => {
    inventoryData = apiResponse; // Assign the response to inventoryData
    populateTable(inventoryData);
    console.log(inventoryData);
  })
  .catch(error => console.error('Error fetching data:', error));
  
  fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse;
    GetSalesRevenue(salesData); // Calculate sales revenue after fetching sales data
    getSoldInventory(salesData);
    console.log(salesData);
  })
  .catch(error => console.error('Error fetching sales data:', error))
}

HandleOnLoad();
 
 
//1. API FUNCTIONALITY
 
function fetchData(url) {
  return fetch(url)
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}




  fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse; // Assign the response to inventoryData
    CreateSalesDataList(salesData)
    // console.log(salesData)
  })
  .catch(error => console.error('Error fetching data:', error));
 
// end 1.
 
 
// 2. POPULATE TABLE
 
function populateTable(data) {
  const tableBody = document.getElementById('tableBody');
 
  tableBody.innerHTML = '';
 
  data.forEach(item => {
    if (item.deleted !== 1) {
    const row = document.createElement('tr');
 
    row.innerHTML = `
<td>${item.id}</td>
<td>${item.name}</td>
<td>${item.categoryid}</td>
<td>${item.machineId}</td>
<td>${item.qtyInMachine}</td>
<td>${item.price}</td>
<td>${item.region}</td>
<td>
<a href="EditStocks.html">
<button type="button" class="btn btn-primary" style="background-color: yellowgreen;" onclick="editItem(${item.id}, ${item.machineId})">Edit</button>
</a>
<a href="#">
<button type="button" class="btn btn-primary" style="background-color: red;" onclick="deleteItem(${item.id})">Delete</button>
</a>
</td>
    `;
 // ../HTML/EditStocks.html
    tableBody.appendChild(row);
    }
  });
  let totalAvailableInventory = calculateAvailableInventory(inventoryData);
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;

  let totalRevenue = GetSalesRevenue(salesData);
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${totalRevenue}`;
}
 
// populateTable(inventoryData);

 
// END 2.


//3. HANDLE DELETE

function deleteItem(productId) {
  // Send an API request to update the 'deleted' property to 1 for the given product
  const deleteUrl = `http://localhost:5141/api/AdminDash/${productId}`;

  fetch(deleteUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deleted: 1 }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // If the update is successful, refresh the page
      location.reload();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
}

// end 3
 
 
console.log(tempProductList);
// 3. FILTERING LOGIC
 
 
let filterChoice = '';
 
function filterData(categoryid, filterChoice) {
  const filteredItems = inventoryData.filter(item => item.categoryid == filterChoice);
  tempProductList = [];
  tempProductList.push(...filteredItems);
  populateTable(filteredItems);
  GetSalesRevenue(filteredItems);

  // Calculate total available inventory
  // let totalAvailableInventory = calculateAvailableInventory(filteredItems);
  // console.log('Total Available Inventory for Category', filterChoice, ':', totalAvailableInventory);

  // // Display the calculated values in the HTML
  // // document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: $${calculateSalesRevenue(transactions, filteredItems, filterChoice).toFixed(2)}`;
  // document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
  // // document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${calculateSoldInventory(transactions, filterChoice)}`;

  console.log(tempProductList);
}




function filterByRegion(region) {
  const filteredItems = inventoryData.filter(item => item.region === region);
  tempProductList = [];
  tempProductList.push(...filteredItems);
  populateTable(filteredItems);
  // totalAvailableInventory = calculateAvailableInventory(filteredItems);
  // console.log('Total Available Inventory for Category', region, ':', totalAvailableInventory);
  // document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
  // // document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: 2.00`;
  // document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${salesRevenue}`;
  // // GetSalesRevenue(salesData); // Calculate sales revenue after fetching sales data
  // // getSoldInventory(salesData);


}
 
function ClearFilters(){
  populateTable(inventoryData);
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${salesRevenue}`;
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;;
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory:`;
}
 
// END 3.
 
 
// 4. BANNER LOGIC
 

function CreateSalesDataList(){

  salesData.forEach(item => {
    adminsalesData.push({
    productPrice: item.productPrice,
    machineRegion : item.machineRegion
    
  });
});
console.log(adminsalesData);
}

// CreateSalesDataList();


function populateTempArray(){
  inventoryData.forEach(item => {
    tempProductList.push({
      id: item.id,
      name: item.name,
      categoryid: item.categoryid,
      machineId: item.machineId,
      qtyInMachine: item.qtyInMachine,
      price: item.price,
      region: item.region
    });
  });
  }


function calculateAvailableInventory(filteredItems) {
  let inventoryAvailable = 0;
 
  filteredItems.forEach(item => {
    inventoryAvailable += item.qtyInMachine;
  });
 
  return inventoryAvailable;
}
 
 
function GetSalesRevenue(salesData){
  salesRevenue = 0;
  // salesData.forEach(item => {
  //   salesRevenue += item.productPrice;
  // });
  // console.log(salesRevenue);
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: 3.5`;
  
}

function getSoldInventory(salesData){
  let soldInventory = 0;
  salesData.forEach(item => {
    soldInventory++;
  });
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${soldInventory}`;
}


 
// END 4.
 
 
// 5. EDIT STOCKS LOGIC
 
// get corresponding fetchById url:
function editItem(productId, machineId) {
  localStorage.setItem("product-id",productId);
  localStorage.setItem("machine-id",machineId);
  console.log(idList); //testing
}


 
// END 5.
 
function populateTempArray(){
inventoryData.forEach(item => {
  tempProductList.push({
    id: item.id,
    name: item.name,
    categoryid: item.categoryid,
    machineId: item.machineId,
    qtyInMachine: item.qtyInMachine,
    price: item.price,
    region: item.region
  });
});
}
 
  // TEMPORARY PRODUCT LIST
 