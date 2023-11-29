let itemsInCart = []
let currentMachineInfo = {id: 0, location: 'null', region: 'null', machineType: 0, machineStock: 0}
//onload
async function handleOnLoad() {
  try {
    await setCurrentMachineInfo();
    await populateArray();
    populateCart();
    populateContinue();
  } catch (error) {
    console.error('Error in handleOnLoad:', error);
    // Handle the error appropriately, e.g., display an error message to the user
  }
}

//DOM Manipulation
function populateCart(){
    let html=`
    <div class="table-responsive" id="cart-table">
        <table class="table align-middle">
          <thead>
            <th>
              Image
            </th>
            <th>
                Name
            </th>
            <th>
                Price
            </th>
            <th>
              Remove
            </th>
          </thead>
          <tbody>
            <div id="cart-rows">
    `
    itemsInCart.forEach(function(item){
        html+=`
        <tr>
                    <td>
                        <img src="${item.imgURL}" class="cart-img">
                    </td>
                    <td>
                        <h3 id="cart-rows">${item.name}</h3>
                    </td>
                    <td>
                        <h3 id="cart-rows">$${(item.price).toFixed(2)}</h3>
                    </td>
                    <td>
                      <button onclick="handleRemove(${item.id})" type="button" class="btn btn-danger">Remove</button>
                    </td>
                </tr>
        `
    })           
    html+=`
            </div>
          </tbody>
        </table>
      </div>
    `
    document.getElementById('app').innerHTML=html
}
// function populateContinue(){
//     let html=`
//     <div class="center-container">
//         <h4 id="display-info-cart">(ID#${currentMachineInfo.machineId}) ${currentMachineInfo.machineRegion} Region > ${currentMachineInfo.machineLocation}</h4>
//       </div>
//       <div class="center-container">
//         <a href="./Checkout.html"><button type="button" class="btn btn-success" style="width: 200px;">Checkout</button></a>
//       </div>
//     `
//     document.getElementById('app').innerHTML+=html
// }

function populateContinue() {
  let html = `
      <div class="center-container">
          <h4 id="display-info-cart">(ID#${currentMachineInfo.machineId}) ${currentMachineInfo.machineRegion} Region > ${currentMachineInfo.machineLocation}</h4>
      </div>
  `;

  if (itemsInCart.length > 0) {
      html += `
          <div class="center-container">
              <a href="./Checkout.html"><button type="button" class="btn btn-success" style="width: 200px;">Checkout</button></a>
          </div>
      `;
  } else {
    console.log('empty cart message')
      html += `
          <div class="center-container">
              <p id="empty-cart-message">Your cart is empty. Please add items to continue.</p>
          </div>
      `;
  }

  document.getElementById('app').innerHTML += html;
}

//Handling
function handleRemove(id) {
  for (let i = 0; i < itemsInCart.length; i++) {
    if (itemsInCart[i].id === id) {
      itemsInCart.splice(i, 1);
      break; // Stop the loop after deleting the first occurrence
    }
  }
  localStorage.setItem("currentCartArray", JSON.stringify(itemsInCart));
  handleOnLoad();
}

//Data Manipulation
// function populateArray(){
//   var storedCartString = localStorage.getItem("currentCartArray");
//   itemsInCart = JSON.parse(storedCartString)
//   let i = 0
//   console.log('parsed cart string: ', itemsInCart)
  
// }

function populateArray() {
  var storedCartString = localStorage.getItem("currentCartArray");

  try {
    // Check if storedCartString is truthy and parseable
    itemsInCart = storedCartString ? JSON.parse(storedCartString) : [];
    console.log('parsed cart string: ', itemsInCart);
  } catch (error) {
    console.error('Error parsing cart data:', error);
    // Handle the error appropriately, e.g., set itemsInCart to an empty array
    itemsInCart = [];
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