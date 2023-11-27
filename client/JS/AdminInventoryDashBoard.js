// TODO FIGURE HOW DELETE IS BEING HANDELED

const apiUrl = 'http://localhost:5141/api/AdminDash';
let inventoryAvailable = '';
let soldInventory = '';
let salesRevenue = '';

let transactions = [

{
  categoryid : 1,
  productid : 1
},
{
  categoryid : 2,
  productid : 2
}
]

function fetchData(url) {
  return fetch(url)
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

let inventoryData = [
    // {
    // id : 1,
    // name : 'doritos',
    // categoryid : 1,
    // machineId : 7,
    // qtyInMachine : 10,
    // price : 2.55,
    // region : 'East'
    // },
    // {
    // id : 2,
    // name : 'Headphones',
    // categoryid : 3,
    // machineId : 4,
    // qtyInMachine : 7,
    // price : 2.25,
    // region : 'West'
    // },
    // {
    // id : 3,
    // name : 'coke',
    // categoryid : 2,
    // machineId : 9,
    // qtyInMachine : 19,
    // price : 1.25,
    // region : 'Northeast'
    // },
    // Add more items as needed
  ];

  populateTable(inventoryData);
  
  // Function to populate the table with data
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
            <button type="button" class="btn btn-primary" style="background-color: yellowgreen;">Edit</button>
          </a>
          <a href="https://www.google.com/">
            <button type="button" class="btn btn-primary" style="background-color: red;">Delete</button>
          </a>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }







// fetchData(apiUrl)
// .then(apiResponse => {
//   inventoryData.push(apiResponse);
//     // Call the function to populate the table with the fetched data
//     populateTable(apiResponse);
//     console.log(inventoryData)
// });

fetchData(apiUrl)
  .then(apiResponse => {
    inventoryData = apiResponse; // Assign the response to inventoryData
    populateTable(inventoryData);
    console.log(inventoryData);
  })
  .catch(error => console.error('Error fetching data:', error));


let filterChoice = '';

// function filterData(categoryid, filterChoice){
//   const filteredItems = [];
//   inventoryData.forEach(item =>{
//     // console.log(item);
//       if(item.categoryid == filterChoice){
//         filteredItems.push(item);
//       }
// })
// populateTable(filteredItems);
// let totalSalesRevenue = calculateSalesRevenue(transactions, filteredItems, filterChoice);
//   console.log('Total Sales Revenue for Category', filterChoice, ':', totalSalesRevenue);
//   document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: $${totalSalesRevenue.toFixed(2)}`;
// }

function filterData(categoryid, filterChoice) {
  const filteredItems = inventoryData.filter(item => item.categoryid == filterChoice);
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
}


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

// let totalSalesRevenue = calculateSalesRevenue(transactions, inventoryData);
// console.log('Total Sales Revenue:', totalSalesRevenue);
