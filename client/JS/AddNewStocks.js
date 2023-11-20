let productList = [
    {productName: 'Coca-Cola', productCategory: 'Beverage', unitPrice: 2.50, description:'Calories 100 kcal'},
    {productName: 'Sprite', productCategory: 'Beverage', unitPrice: 2.50, description:'Calories 102 kcal'},
    {productName: "Lay's Potato Chips", productCategory: 'Snack', unitPrice: 1.75, description:'Calories 75 kcal'},
    {productName: 'KitKat', productCategory: 'Snack', unitPrice: 1.75, description:'Calories 80 kcal'}
]

let categoryList = [
    {categoryName: 'Beverage'},
    {categoryName: 'Snack'},
    {categoryName: 'Electronics'},
    {categoryName: 'Movie'},
    {categoryName: 'Video Game'}
]

let vmList = [
    {vmID: '1001', vmLoc: '123 Dirt Rd, Tuscaloosa, AL 35487', vmRegion: 'Southeast', vmType: 'Beverage', vmCap: 10},
    {vmID: '1002', vmLoc: '456 Smith Ave, Milpitas, CA 95035', vmRegion: 'West', vmType: 'Snack', vmCap: 15},
    {vmID: '1003', vmLoc: '78 John St, Chicago, CA 60007', vmRegion: 'Midwest', vmType: 'Snack', vmCap: 12}
]

// Set Product List
setProductList(productList,"product-name-list");
// Return the product info based on the product name
document.getElementById("product-name").addEventListener("change",() => {
    let productName = document.getElementById("product-name").value;
    returnProductInfo(productName, productList);
    // check if the product category matches the machine type everytime new input is made
    validateVmType();
})

// Set VM List
setVmList(vmList, "vending-machine-list");
document.getElementById('vending-machine').addEventListener("change",() => {
    // check if the product category matches the machine type everytime new input is made
    validateVmType();
})

//----------------------FUNCTION----------------------

//function to validate vm:
function validateVmType() {
    let vmChosen = document.getElementById('vending-machine');
    let vmType = "";
    vmList.forEach((item) => {
        if (vmChosen.value === item.vmType + "VM #" + item.vmID + " - "+item.vmLoc) {
            vmType = item.vmType; 
        }
    })
    let productCategory = document.getElementById('product-category');
    if (vmType !== productCategory.value && vmChosen.value !== "" && productCategory !== "") {
        document.getElementById('warning-message').hidden = false; //unhide the message
    } else {
        document.getElementById('warning-message').hidden = true; //hide the message
    }
}
// function to set the datalist for the product name's searchable dropdowns:
function setProductList(productList, dataListId){
    const dropdown = document.querySelector(`#${dataListId}`);
    productList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.productName;
        dropdown.appendChild(option);
    });
    // add an option for Other
    let option = document.createElement('option');
    option.value = 'Other';
    dropdown.appendChild(option);
}

function setVmList (vmList, dataListId) {
    const dropdown = document.querySelector(`#${dataListId}`);
    vmList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.vmType + "VM #" + item.vmID + " - "+item.vmLoc
        dropdown.appendChild(option);
    });
}
// function to return the product info based on the product name:
function returnProductInfo(productName, productList) {
    productList.forEach((p) => {
        if (productName === p.productName){
            document.getElementById("product-category").value = p.productCategory;
            document.getElementById("unit-price").value = p.unitPrice;
            document.getElementById("description").value = p.description;
        }
    })
}