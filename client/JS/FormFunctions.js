let productList = [];
let stockList = [];
let categoryList = [];
let machineList = [];

let productName = document.getElementById('product-name');
let productCategory = document.getElementById('product-category');
let productPrice= document.getElementById('unit-price');
let productDescription = document.getElementById('description');
let selfInputProductName = document.getElementById('product-name-self-input');
let selfInputProductImageURL = document.getElementById('product-imgURL-self-input');
let vendingMachine = document.getElementById('vending-machine');
let quantity = document.getElementById('quantity');
let submitButton = document.getElementById('submit-button');

// INITIAL FORM SETUP ==============================================================
async function getFilteredStockList() {
    try {
        // fetch all stocks
        let fullStockList = await fetchStocks();
        // filter & get only the ones that are not deleted
        const filteredStockList = fullStockList.filter((item) => !item.deleted);
        // update stockList with the filtered list
        return filteredStockList;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        // Handle the error or propagate it further
        throw error;
    }
}
// set list for "product-name" searchable dropdown
function setProductList() {
    const dropdown = document.querySelector('#product-name-list');
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
// set list for "product-category" searchable dropdown
function setCategoryList() {
    const dropdown = document.querySelector('#product-category-list');
    categoryList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.categoryName;
        dropdown.appendChild(option);
    });
}
// set list for "vending-machine" searchable dropdown
function setMachineList() {
    const dropdown = document.querySelector('#vending-machine-list');
    machineList.forEach((item) => {
        let option = document.createElement('option');
        option.value = `VM${item.machineId}-${returnCategoryName(item.categoryId)}: ${item.machineLocation}`;
        dropdown.appendChild(option);
    });
}

// RETURN A PIECE OF DATA PER REQUEST ================================================
// function to return productId given the productName
function returnProductId(productName) {
    let product = productList.find((p) => p.productName === productName);
    return product ? product.productId : -1;
}
// function to return category name based on a given category id
function returnCategoryName(categoryId) {
    let category = categoryList.find((c) => c.categoryId === categoryId)
    return category ? category.categoryName : "";
}
// function to return the machine type given the machine name in this format: VM{machineId}-{categoryName}: {machineLocation}
function returnMachineCategory (machineName) {
    // Find the index of the hyphen and colon
    let hyphenIndex = machineName.indexOf('-');
    let colonIndex = machineName.indexOf(':');
    // Extract the substring between the hyphen and colon
    return machineName.substring(hyphenIndex + 1, colonIndex).trim();
}
// function to return the machineId given the machine name
function returnMachineId(machineName) {
    let machine = machineList.find ((m) => `VM${m.machineId}-${returnCategoryName(m.categoryId)}: ${m.machineLocation}` === machineName);
    return machine ? machine.machineId : '';  
}
// function to return categoryId given the categoryName
function returnCategoryId(categoryName) {
    let category = categoryList.find((c) => c.categoryName === categoryName);
    return category ? category.categoryId : -1;
}
// function to get current date and time
function getCurrentDateTime() {
    let date = new Date();
    // Format the date to 'YYYY-MM-DD HH:MM:SS' format
    let formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
}

// INPUT VALIDATION FOR BOTH FORMS ==============================================
