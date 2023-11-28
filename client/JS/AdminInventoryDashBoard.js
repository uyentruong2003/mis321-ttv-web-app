// DUMMY DATA
let tempProductList = [];
 

let inventoryData = [
  {
    id: 1,
    name: 'Doritos',
    categoryid: 1,
    machineId: 7,
    qtyInMachine: 10,
    price: 2.55,
    region: 'East'
  },
  {
    id: 2,
    name: 'Coca-Cola',
    categoryid: 2,
    machineId: 9,
    qtyInMachine: 19,
    price: 1.25,
    region: 'Northeast'
  },
  {
    id: 3,
    name: 'Headphones',
    categoryid: 3,
    machineId: 4,
    qtyInMachine: 7,
    price: 2.25,
    region: 'West'
  },
  {
    id: 4,
    name: 'Mountain Dew',
    categoryid: 1,
    machineId: 8,
    qtyInMachine: 15,
    price: 1.75,
    region: 'Southwest'
  },
  {
    id: 5,
    name: 'Laptop',
    categoryid: 3,
    machineId: 5,
    qtyInMachine: 5,
    price: 899.99,
    region: 'Midwest'
  },
  {
    id: 6,
    name: 'Snickers',
    categoryid: 2,
    machineId: 6,
    qtyInMachine: 15,
    price: 1.50,
    region: 'Southeast'
  },
  {
    id: 7,
    name: 'Pepsi',
    categoryid: 1,
    machineId: 10,
    qtyInMachine: 12,
    price: 1.50,
    region: 'Northwest'
  },
  {
    id: 8,
    name: 'Wireless Mouse',
    categoryid: 3,
    machineId: 11,
    qtyInMachine: 8,
    price: 12.99,
    region: 'East'
  },
  {
    id: 9,
    name: 'Chips Ahoy',
    categoryid: 1,
    machineId: 12,
    qtyInMachine: 20,
    price: 2.00,
    region: 'Southwest'
  },
  {
    id: 10,
    name: 'Bluetooth Speaker',
    categoryid: 3,
    machineId: 13,
    qtyInMachine: 10,
    price: 29.99,
    region: 'Northeast'
  },
  // Add more items as needed
];
 
let transactions = [
  {
    categoryid: 1,
    productid: 1
  },
  {
    categoryid: 2,
    productid: 2
  },
  {
    categoryid: 3,
    productid: 3
  },
  {
    categoryid: 1,
    productid: 4
  },
  {
    categoryid: 3,
    productid: 5
  },
  // Add more transactions as needed
];
 
  // END DUMMY DATA
 
 
 
 
 
// TODO FIGURE HOW DELETE IS BEING HANDELED
 
const apiUrl = 'http://localhost:5141/api/AdminDash';
let inventoryAvailable = '';
let soldInventory = '';
let salesRevenue = '';
 
 
 
//1. API FUNCTIONALITY
 
// function fetchData(url) {
//   return fetch(url)
//       .then(response => response.json())
//       .catch(error => {
//           console.error('Error fetching data:', error);
//       });
// }

// fetchData(apiUrl)
//   .then(apiResponse => {
//     inventoryData = apiResponse; // Assign the response to inventoryData
//     populateTable(inventoryData);
//     console.log(inventoryData);
//   })
//   .catch(error => console.error('Error fetching data:', error));
 
// end 1.
 
 
// 2. POPULATE TABLE
 
function populateTable(data) {
  const tableBody = document.getElementById('tableBody');
 
  tableBody.innerHTML = '';
 
  data.forEach(item => {
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
<a href="https://www.google.com/">
<button type="button" class="btn btn-primary" style="background-color: red;">Delete</button>
</a>
</td>
    `;
 
    tableBody.appendChild(row);
  });
}
 
populateTable(inventoryData);
 
// END 2.
 
 
console.log(tempProductList);
// 3. FILTERING LOGIC
 
 
let filterChoice = '';
 
function filterData(categoryid, filterChoice) {
  const filteredItems = inventoryData.filter(item => item.categoryid == filterChoice);
  tempProductList = []; // Clear the tempProductList
  tempProductList.push(...filteredItems);
  populateTable(filteredItems);
 
  // Calculate sales revenue based on filtered items
  let totalSalesRevenue = calculateSalesRevenue(transactions, filteredItems, filterChoice);
  console.log('Total Sales Revenue for Category', filterChoice, ':', totalSalesRevenue);
 
  // Calculate total available inventory
  let totalAvailableInventory = calculateAvailableInventory(filteredItems);
  console.log('Total Available Inventory for Category', filterChoice, ':', totalAvailableInventory);
 
  // Calculate and display sold inventory
  let totalSoldInventory = calculateSoldInventory(transactions, filterChoice);
  console.log('Total Sold Inventory for Category', filterChoice, ':', totalSoldInventory);
 
  // Display the calculated values in the HTML
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: $${totalSalesRevenue.toFixed(2)}`;
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${totalSoldInventory}`;
 
  console.log(tempProductList);
}
 
function ClearFilters(){
  populateTable(inventoryData);
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: `;
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: `;
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory:`;
}
 
// END 3.
 
 
// 4. BANNER LOGIC
 
function calculateAvailableInventory(filteredItems) {
  let totalInventory = 0;
 
  filteredItems.forEach(item => {
    totalInventory += item.qtyInMachine;
  });
 
  return totalInventory;
}
 
 
function calculateSalesRevenue(transactions, inventoryData, filterCategory) {
  let salesRevenue = 0;
 
  transactions.forEach(transaction => {
    const { categoryid } = transaction;
    const matchingInventory = inventoryData.find(item => item.categoryid === categoryid && item.categoryid === filterCategory);
 
    if (matchingInventory) {
      salesRevenue += matchingInventory.price;
    }
  });
 
  return salesRevenue;
}
 
 
function calculateSoldInventory(transactions, filterCategory) {
  let soldInventory = 0;
 
  transactions.forEach(transaction => {
    if (transaction.categoryid === filterCategory) {
      soldInventory++;
    }
  });
 
  return soldInventory;
}
 
// END 4.
 
 
// 5. EDIT STOCKS LOGIC
 
function editItem(productId, machineId) {
  selectedItem = { productId, machineId };
  // Do whatever you need with the product ID and machine ID
  console.log('Edit clicked for Product ID:', productId, 'Machine ID:', machineId);
  console.log('Selected Item:', selectedItem);
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
 