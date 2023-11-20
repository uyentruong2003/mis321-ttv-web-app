// TODO FIGURE HOW DELETE IS BEING HANDELED
const inventoryData = [
    {
      productId: 1,
      name: 'Doritos',
      category: 'Drink',
      machineId: 'SE12',
      quantity: 10,
      unitPrice: 2.99,
      region: 'SE'
    },
    {
      productId: 2,
      name: 'Sun Chips',
      category: 'Snack',
      machineId: 'SE12',
      quantity: 9,
      unitPrice: 2.50,
      region: 'SE'
    },
    // Add more items as needed
  ];
  
  // Function to populate the table with data
  function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
  
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

  function filterData(category) {
    tableBody.innerHTML = '';
    const filteredData = inventoryData.filter(item => item.category === category);
    populateTable(filteredData);
}

function UpdateSalesDataBanner(){
  
}
  
  // Call the function to populate the table with the inventory data
  populateTable(inventoryData);
  