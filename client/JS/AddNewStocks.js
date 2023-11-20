let productList = [
    {name: 'Coca-Cola', productCategory: 'Beverages', unitPrice: 2.50, description:'Calories 100 kcal'},
    {name: 'Sprite', productCategory: 'Beverages', unitPrice: 2.50, description:'Calories 102 kcal'},
    {name: "Lay's Potato Chips", productCategory: 'Snacks', unitPrice: 1.75, description:'Calories 75 kcal'},
    {name: 'KitKat', productCategory: 'Snacks', unitPrice: 1.75, description:'Calories 80 kcal'}
]

let categoryList = [
    {name: 'Beverages'},
    {name: 'Snacks'},
    {name: 'Electronics'},
    {name: 'Movies'},
    {name: 'Video Games'}
]

let vendingMachineList = [
    {name: 'Vending Machine #1', vmLoc: '123 Dirt Rd, Tuscaloosa, AL 35487', vmRegion: 'Southeast', vmType: 'Beverages'},
    {name: 'Vending Machine #2', vmLoc: '456 Smith Ave, Milpitas, CA 95035', vmRegion: 'West', vmType: 'Snacks'},
    {name: 'Vending Machine #3', vmLoc: '78 John St, Chicago, CA 60007', vmRegion: 'Midwest', vmType: 'Snacks'}
]

// Set Product List
setDataList(productList,"product-name-list");
// Return the product info based on the product name
document.getElementById("product-name").addEventListener("change",() => {
    let productName = document.getElementById("product-name").value;
    returnProductInfo(productName, productList);
})

// Set Vending Machine List
setDataList(vendingMachineList, "vending-machine-list");
// Validate if the machine type is matching with the product category
validateVendingMachineInput();
document.getElementById("vending-machine").addEventListener("change",() => {

})

function validateVendingMachineInput() {
    let vmType = document.getElementById('vending-machine').value;
    let productCategory = document.getElementById('vending-machine').value;
    if (vmType !== productCategory){
        document.getElementById('vending-machine').value = none;
        document.getElementById('error-message-vm-input').hidden = false;
    } else {
        document.getElementById('vending-machine').value = vmType;
    }
}
// function to set the datalist for the product name's searchable dropdowns:
function setDataList(dataList, dataListId){
    const dropdown = document.querySelector(`#${dataListId}`);
    dataList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.name;
        dropdown.appendChild(option);
    });
    // add an option for Other
    let option = document.createElement('option');
    option.value = 'Other';
    dropdown.appendChild(option);
}

// function to return the product info based on the product name:
function returnProductInfo(name, productList) {
    productList.forEach((p) => {
        if (name === p.name){
            document.getElementById("product-category").value = p.productCategory;
            document.getElementById("unit-price").value = p.unitPrice;
            document.getElementById("description").value = p.description;
        }
    })
}