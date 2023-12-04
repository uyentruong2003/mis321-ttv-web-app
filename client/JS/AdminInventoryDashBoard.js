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
let salesRevenue = 0;
let salesData = [];
let adminsalesData =[];
let regionSalesRevenue = 0;
let regionSoldInventory = 0;
let deletedItems = [];
 
 
async function HandleOnLoad(){
  await fetchData(apiUrl)
  .then(apiResponse => {
    inventoryData = apiResponse; // Assign the response to inventoryData
    populateTable(inventoryData);
    console.log(inventoryData);
  })
  .catch(error => console.error('Error fetching data:', error));
 
  await fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse;
 
  })
  .catch(error => console.error('Error fetching sales data:', error))
  GetSalesRevenue(salesData); // Calculate sales revenue after fetching sales data
  getSoldInventory(salesData);
    console.log(salesData);
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
  let tempName = '';
  const tableBody = document.getElementById('tableBody');
 
  tableBody.innerHTML = '';
 
  data.forEach(item => {
    if (item.categoryid === 1) {
      tempName = 'Drink';
    } else if (item.categoryid === 2) {
      tempName = 'Snack';
    }
 
    if (item.deleted !== 1) {
      const row = document.createElement('tr');
 
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${tempName}</td>
        <td>${item.machineId}</td>
        <td>${item.qtyInMachine}</td>
        <td>${item.price}</td>
        <td>${item.region}</td>
        <td>
          <a href="EditStocks.html">
            <button type="button" class="btn btn-primary" style="background-color: yellowgreen;" onclick="editItem(${item.id}, ${item.machineId})">Edit Quantity</button>
          </a>
          <a href="#">
          <button type="button" class="btn btn-primary" style="background-color: yellowgreen;" onclick="#">Delete</button></a>
        </td>
      `;
 
      // Append the row to the table
      tableBody.appendChild(row);
    } else {
      // Store deleted items in the array
      deletedItems.push(item);
    }
  });
 
  // Use deletedItems array for further processing if needed
  console.log('Deleted Items:', deletedItems);
 
  let totalAvailableInventory = calculateAvailableInventory(inventoryData);
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
}
 
 
 
 
function populateDeletedItemsTable(deletedItems) {
 
  tableBody.innerHTML = '';
 
  deletedItems.forEach(item => {
    const row = document.createElement('tr');
 
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.categoryid === 1 ? 'Drink' : 'Snack'}</td>
      <td>${item.machineId}</td>
      <td>${item.qtyInMachine}</td>
      <td>${item.price}</td>
      <td>${item.region}</td>
      <td>
          <a href="EditStocks.html">
            <button type="button" class="btn btn-primary" style="background-color: yellowgreen;" onclick="editItem(${item.id}, ${item.machineId})">Edit Quantity</button>
          </a>
          <a href="#">
          </a>
        </td>
        <td>
          <a href="#">
           
          </a>
          <a href="#">
          <button type="button" class="btn btn-primary" style="background-color: yellowgreen;" onclick="#">Restore</button>
          </a>
        </td>
    `;
 
    // Append the row to the deleted items table
    tableBody.appendChild(row);
  });
}
 
populateTable(inventoryData);
 
 
// END 2.
 
 
//3. HANDLE DELETE
 
async function deleteItem(productId) {
 
}
 
// end 3
 
 
console.log(tempProductList);
// 3. FILTERING LOGIC
 
 
let filterChoice = '';
 
async function filterData(categoryid, filterChoice) {
  const filteredItems = inventoryData.filter(item => item.categoryid == filterChoice);
  tempProductList = [];
  tempProductList.push(...filteredItems);
  populateTable(filteredItems);
 
  // Calculate total available inventory
  let totalAvailableInventory = calculateAvailableInventory(filteredItems);
  console.log('Total Available Inventory for Category', filterChoice, ':', totalAvailableInventory);
 
  // Calculate sales revenue based on the filtered category
  let salesRevenue = 0;
  if (filterChoice == 1) {
    salesRevenue = await FilterSoldInventoryDrink(); // Calculate sales revenue for Drink category
  } else if (filterChoice == 2) {
    salesRevenue = await FilterSoldInventorySnack(); // Calculate sales revenue for Snack category
  }
 
  // Display the calculated values in the HTML
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${salesRevenue.toFixed(2)}`;
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
 
  FindSoldInventoryByCategory(categoryid)
}
 
async function FilterSoldInventorySnack() {
  let snackRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.productCategory === 2) {
      snackRevenue += item.productPrice;
    }
  });
  return snackRevenue;
}
 
async function FilterSoldInventoryDrink() {
  let drinkRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.productCategory === 1) {
      drinkRevenue += item.productPrice;
    }
  });
  return drinkRevenue;
}
 
async function FilterSoldInventoryWest() {
  let westRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.machineRegion === 'West') {
      westRevenue += item.productPrice;
    }
  });
  console.log(westRevenue);
  return westRevenue;
}
 
async function FilterSoldInventoryMidWest() {
  let MidWestRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.machineRegion === 'MidWest') {
      MidWestRevenue += item.productPrice;
    }
  });
  console.log(MidWestRevenue);
  return MidWestRevenue;
}
 
async function FilterSoldInventorySouthWest() {
  let SouthWestRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.machineRegion === 'SouthWest') {
      SouthWestRevenue += item.productPrice;
    }
  });
  console.log(SouthWestRevenue);
  return westRevenue;
}
 
async function FilterSoldInventoryEast() {
  let eastRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.machineRegion === 'east') {
      eastRevenue += item.productPrice;
    }
  });
  console.log(eastRevenue);
  return eastRevenue;
}
 
async function FilterSoldInventoryNorthEast() {
  let NorthEastRevenue = 0;
  await CreateSalesDataList(salesData);
  salesData.forEach(item => {
    if (item.machineRegion === 'Northeast') {
      eastRevenue += item.productPrice;
    }
  });
  console.log('Revenue',NorthEastRevenue);
  return NorthEastRevenue;
}
 
 
 
 
 
 
async function filterByRegion(region) {
  // Fetch sales data again
  await fetchData(salesDataURL)
    .then(apiResponse => {
      salesData = apiResponse;
    })
    .catch(error => console.error('Error fetching sales data:', error));
 
  const filteredItems = inventoryData.filter(item => item.region === region);
  tempProductList = [];
  tempProductList.push(...filteredItems);
  populateTable(filteredItems);
 
  // Calculate total available inventory
  let totalAvailableInventory = calculateAvailableInventory(filteredItems);
  console.log('Total Available Inventory for Region', region, ':', totalAvailableInventory);
  document.getElementById('availableInventoryDisplay').textContent = `Available Inventory: ${totalAvailableInventory}`;
 
  // Calculate sales revenue based on the filtered region
  regionSalesRevenue = 0;
  regionSoldInventory = 0;
 
  // Log the ids for debugging
  console.log('Filtered Item IDs:', filteredItems.map(item => item.id));
  console.log('Sales Data IDs:', salesData.map(item => item.productid));
 
  // Iterate through salesData and sum the revenue for the filtered region
  salesData.forEach(item => {
    // Use findIndex to find the index of the item in filteredItems
      regionSalesRevenue += item.productPrice;
      regionSoldInventory++;
   
  });
 
  // Display the calculated values in the HTML
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${regionSoldInventory}`;
  FindRevenueByRegion(region);
  FindSoldInventoryByRegion(region)
}
 
async function ClearFilters() {
  location.reload();
}
 
// END 3.
 
 
// 4. BANNER LOGIC
 
 
 function CreateSalesDataList(){
 
  salesData.forEach(item => {
    adminsalesData.push({
    productCategory : item.productCategory,
    productPrice: item.productPrice,
    machineRegion : item.machineRegion
   
  });
});
console.log(adminsalesData);
}
 
 
function FindRevenueByRegion(machineRegion){
  filteredSalesRevenue = 0;
 
  fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse; // Assign the response to inventoryData
    CreateSalesDataList(salesData)
    console.log(salesData)
  })
  .catch(error => console.error('Error fetching data:', error));
 
 
  salesData.forEach(item => {
    if(item.machineRegion === machineRegion){
      filteredSalesRevenue+= item.productPrice;
    }
   
  });
  console.log(filteredSalesRevenue);
  if(filteredSalesRevenue != 'undefined'){
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${filteredSalesRevenue}`;
}
else{document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: 0`;}
}
 
function FindSoldInventoryByRegion(machineRegion){
  filteredSoldInventory = 0;
 
  fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse; // Assign the response to inventoryData
    CreateSalesDataList(salesData)
    console.log(salesData)
  })
  .catch(error => console.error('Error fetching data:', error));
 
 
  salesData.forEach(item => {
    if(item.machineRegion === machineRegion){
      filteredSoldInventory += 1;
    }
   
  });
  console.log(filteredSoldInventory);
  if(filteredSoldInventory != 'undefined'){
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${filteredSoldInventory}`;
}
else{document.getElementById('soldInventoryNumber').textContent = `Sales Revenue: 0`;}
}
 
 
function FindSoldInventoryByCategory(productCategory){
  filteredCatSoldInventory = 0;
  fetchData(salesDataURL)
  .then(apiResponse => {
    salesData = apiResponse; // Assign the response to inventoryData
    CreateSalesDataList(salesData)
    console.log(salesData)
  })
  .catch(error => console.error('Error fetching data:', error));
 
 
  salesData.forEach(item => {
    if(item.productCategory === productCategory){
      filteredCatSoldInventory += 1;
    }
   
  });
  console.log(filteredCatSoldInventory);
  if(filteredCatSoldInventory != 'undefined'){
  document.getElementById('soldInventoryNumber').textContent = `Sold Inventory: ${filteredCatSoldInventory}`;
}
else{document.getElementById('soldInventoryNumber').textContent = `Sales Revenue: 0`;}
}
 
// CreateSalesDataList();
 
 
 
 
 
function calculateAvailableInventory(filteredItems) {
  let inventoryAvailable = 0;
 
  filteredItems.forEach(item => {
    inventoryAvailable += item.qtyInMachine;
  });
 
  return inventoryAvailable;
}
 
 
function GetSalesRevenue(salesData){
  salesRevenue = 0;
  salesData.forEach(item => {
    salesRevenue += item.productPrice;
  });
  console.log(salesRevenue);
  document.getElementById('salesRevenueDisplay').textContent = `Sales Revenue: ${salesRevenue}`;
 
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
 
 
 
 
 
 
 
 
 
 
 
 
 
  // DELETING A STOCK
 
async function DeleteStock() {
  try {
      // Perform the delete operation
      await deleteStock(chosenProductId, chosenMachineId);
      // Optionally, redirect or display a success message
      console.log('Stock deleted successfully');
  } catch (error) {
      console.error('Error deleting stock:', error);
      // Handle the error or display an error message
  }
}
 
async function deleteStock(productId, machineId) {
  try {
      const response = await fetch(`http://localhost:5141/api/Stock/${productId}/${machineId}`, {
          method: 'DELETE',
      });
 
      if (!response.ok) {
          throw new Error(`Failed to delete stock. Status: ${response.status}`);
      }
  } catch (error) {
      console.error(error);
      throw error; // Propagate the error to the calling function if needed
  }
}