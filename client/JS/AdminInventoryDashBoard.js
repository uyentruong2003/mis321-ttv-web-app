// TODO FIGURE HOW DELETE IS BEING HANDELED

const apiUrl = 'http://localhost:5141/api/AdminDash';



function fetchData(url) {
  return fetch(url)
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

const inventoryData = [
    // {
    //   productId: 1,
    //   name: 'Doritos',
    //   category: 'Snack',
    //   machineId: 'SE12',
    //   quantity: 10,
    //   unitPrice: 2.99,
    //   region: 'SE'
    // },
    // {
    //   productId: 2,
    //   name: 'Sun Chips',
    //   category: 'Snack',
    //   machineId: 'SE12',
    //   quantity: 9,
    //   unitPrice: 2.50,
    //   region: 'SE'
    // },
    // Add more items as needed
  ];

  // populateTable(inventoryData);
  
  // Function to populate the table with data
  function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
  
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <th scope="row">${item.productId}</th>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.machineId}</td>
        <td>${item.quantity}</td>
        <td>${item.unitPrice}</td>
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

  function populateTable(data) {
    const tableBody = document.getElementById('tableBody');

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
        `;

        tableBody.appendChild(row);
    });
}


// function filterData(category) {
//   tableBody.innerHTML = '';
//   const filteredData = inventoryData.filter(item => item.category === category);
//   populateTable(filteredData);
  
// }

function filterData(categoryNumber) {
  fetchData(`${apiUrl}?filter=${categoryNumber}`)
      .then(filteredData => {
          populateTable(filteredData);
          updateBannerAndInventory(filteredData);
      });
}


fetchData(apiUrl)
.then(apiResponse => {
    // Call the function to populate the table with the fetched data
    populateTable(apiResponse);
});

function updateBannerAndInventory(data) {
  const totalInventory = data.reduce((acc, item) => acc + item.qtyInMachine, 0);
  inventoryAvailableNumber.textContent = totalInventory;
}
  
  // Call the function to populate the table with the inventory data
  // populateTable(inventoryData);
  