let currentMachineInfo = {machineId: 0, machineLocation: 'null', machineRegion: 'null', machineType: 0, machineStock: 0}

let orderInfo = []
//onload
async function handleOnLoad() {
    await getTransactionIds()
    await setCurrentMachineInfo()
    populateThankYou()   
}

//DOM Manipulation
function populateThankYou() {
    let cardInfoString = localStorage.getItem("cardInfo");
    let cardInfo;

    try {
        cardInfo = JSON.parse(cardInfoString);
        console.log(cardInfo);
    } catch (error) {
        console.error('Error parsing cardInfo:', error);
        // Handle the error appropriately
        return;
    }

    let firstName = cardInfo.Name ? cardInfo.Name.split(' ')[0] : 'Valued Customer';
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    console.log('all orders: ', orderInfo)
    let html = `
    <div class="thank-you-box">
        <h1>Thank You for Your Purchase, ${firstName}!</h1>
        <p>We appreciate your business. If you have any questions, feel free to contact us.</p>
        <p>Order ID: ${orderInfo.orderID}</p>
        <p>(#${currentMachineInfo.machineId})${currentMachineInfo.machineRegion} Region > ${currentMachineInfo.machineLocation}</p>
    </div>
    `;

    document.getElementById('app').innerHTML += html;
}


//Data Manipulation
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

  async function getTransactionIds()
  { 
    let url = 'http://localhost:5141/api/Transaction/'
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log('Data fetched:', data);
  
      orderInfo = data
      console.log('current machine: ', orderInfo)
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle the error appropriately in your application
  }
  }