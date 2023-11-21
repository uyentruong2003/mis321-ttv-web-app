// TODO FIGURE HOW DELETE IS BEING HANDELED

const apiUrl = 'http://localhost:5141/api/Product';


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
  
  // Function to populate the table with data
  // function populateTable(data) {
  //   const tableBody = document.getElementById('tableBody');
  
  //   data.forEach(item => {
  //     const row = document.createElement('tr');
  
  //     row.innerHTML = `
  //       <th scope="row">${item.productId}</th>
  //       <td>${item.name}</td>
  //       <td>${item.category}</td>
  //       <td>${item.machineId}</td>
  //       <td>${item.quantity}</td>
  //       <td>${item.unitPrice}</td>
  //       <td>${item.region}</td>
  //       <td>
  //         <a href="EditStocks.html">
  //           <button type="button" class="btn btn-primary" style="background-color: yellowgreen;">Edit</button>
  //         </a>
  //         <a href="https://www.google.com/">
  //           <button type="button" class="btn btn-primary" style="background-color: red;">Delete</button>
  //         </a>
  //       </td>
  //     `;
  
  //     tableBody.appendChild(row);
  //   });
  // }

  function populateTable(data) {
    const tableBody = document.getElementById('tableBody');

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.desciption}</td>
            <td>${item.categoryid}</td>
            <td><img src="${item.imgURL}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
        `;

        tableBody.appendChild(row);
    });
}

fetchData(apiUrl)
.then(apiResponse => {
    // Call the function to populate the table with the fetched data
    populateTable(apiResponse);
});
  
  // Call the function to populate the table with the inventory data
  // populateTable(inventoryData);
  