
// function to set the datalist for the searchable dropdowns:
function setDataList(dataList, id){
    const dropdown = document.querySelector(`#${id}`);
    dataList.forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        dropdown.appendChild(option);
    });
}


let productNameList = ["Coca-Cola","Sprite","SmartWater","Lay's Potato Chip"];
setDataList(productNameList, 'product-name-list');

let vmList = ["vm111","vm121","vm122","vm123"];
setDataList(vmList, 'vending-machine-list');

let productCategoryList = ["drink","snack","earphone","stationery"];
setDataList(productCategoryList, 'product-category-list');

// need a fetch api to get the list of the productNameList and the Vending Machine List and the product category list

// function to handle submit button:
function handleSubmitBtn(){
    // create an object and store the user input
    const newStock = {
        productName: "productName",
        productCategory: "productCategory",
        vendingMachineId: "vmId",
        quantity: 1,
        description: "description"
    }
    // submit the obj to the database
}