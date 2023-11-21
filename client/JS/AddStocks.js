let productList = [
    {productId: 1, productName: 'Coca-Cola', categoryId: 1, productPrice: 2.50, productDescription:'Calories 100 kcal'},
    {productId: 2, productName: 'Sprite', categoryId: 1, productPrice: 2.50, productDescription:'Calories 102 kcal'},
    {productId: 3, productName: "Lay's Potato Chips", categoryId: 2, productPrice: 1.75, productDescription:'Calories 75 kcal'},
    {productId: 4, productName: 'KitKat', categoryId: 2, productPrice: 1.75, productDescription:'Calories 80 kcal'}
]

let stockdetailsList = [
    {stockId: 1, productId: 2, machineId: 1003, stockQty: 5},
    {stockId: 2, productId: 2, machineId: 1003, stockQty: 10},
    {stockId: 3, productId: 1, machineId: 1001, stockQty: 12}
]

let categoryList = [
    {categoryId: 1, categoryName: 'Beverage'},
    {categoryId: 2, categoryName: 'Snack'},
    {categoryId: 3, categoryName: 'Electronics'},
    {categoryId: 4, categoryName: 'Movie'},
    {categoryId: 5, categoryName: 'Video Game'}
]

let machineList = [
    {machineId: 1001, machineLocation: '123 Dirt Rd, Tuscaloosa, AL 35487', machineRegion: 'Southeast', machineType: 'Beverage', machineQty: 12},
    {machineId: 1002, machineLocation: '456 Smith Ave, Milpitas, CA 95035', machineRegion: 'West', machineType: 'Snack', machineQty: 10},
    {machineId: 1003, machineLocation: '78 John St, Chicago, CA 60007', machineRegion: 'Midwest', machineType: 'Snack', machineQty: 15}
]

// DASHBOARD: stockId, productName, productPrice, categoryName, machineId, machineLocation, machineRegion, stockQty

// stockdetails table: stockId, productId, machineId, stockQty, addDate
// product table: productId, productName, productPrice, categoryId, productDescription
// category table: categoryId, categoryName
// machine table: machineId, machineLocation, machineRegion, machineQty, machineType

let productName = document.getElementById('product-name');
let productCategory = document.getElementById('product-category');
let productPrice= document.getElementById('unit-price');
let productDescription = document.getElementById('description');
let selfInputProduct = document.getElementById('product-name-self-input');
let vendingMachine = document.getElementById('vending-machine')

setProductList();
setCategoryList();
setMachineList();

productName.addEventListener('change', () => {
    displaySelectedProductInfo();
    takeSelfInput();
})

productCategory.addEventListener('change', () => {
    checkMatchingType();
})

vendingMachine.addEventListener('change', () => {
    checkMatchingType();
})


//--------------------------------------------------------------------------------------------------

// STEP 1: SET DATALIST FOR SEARCHABLE DROPDOWNS:

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
        option.value = `VM${item.machineId}-${item.machineType}: ${item.machineLocation}`;
        dropdown.appendChild(option);
    });
}

// STEP 2: REGULATE PRODUCT NAME INPUT

// function to populate product info when a product is selected
function displaySelectedProductInfo() {
    productList.forEach((p) => {
        if (p.productName === productName.value) {
            productCategory.value = returnCategoryName(p.categoryId);
            productPrice.value = p.productPrice;
            productDescription.value = p.productDescription;

        }
    })
}
        // function to return category name based on a given category id
        function returnCategoryName(categoryId) {
            let category = categoryList.find((c) => c.categoryId === categoryId);
            return category ? category.categoryName : '';
        }

// function to take self input when "Other" is selected:
function takeSelfInput () {
    let selfInputSection = document.getElementById(`other-product-name`); //the div for self input section
    if (productName.value === "Other") {
        // unhide the self input section
        selfInputSection.hidden = false;
        // allow input for product category, price, and description
        productCategory.value = '';
        productCategory.readOnly = false;
        productPrice.value = '';
        productPrice.readOnly = false;
        productDescription.value = '';
        productDescription.readOnly = false;
        // required input for the new product name
        selfInputProduct.required = true;
    } else {
        // hide the self input section
        selfInputSection.hidden = true;
        // disable input
        productCategory.readOnly = true;
        productPrice.readOnly = true;
        productDescription.readOnly = true;
        // unrequire self-input product name
        selfInputProduct.required = false;
    }
}

// STEP 3: INPUT VALIDATION

// validate that self-input product hasn't appear in the dropdown list
function checkProductDup () {
    let existed = productList.find((p) => p.productName === selfInputProduct.value);
    if (existed) {
        document.getElementById('product-existed-message').hidden = false;
    } else {
        document.getElementById('product-existed-message').hidden = true;
    }
}

// validate that product category and machine type is a match
function checkMatchingType () {
    let machineType = returnMachineType(vendingMachine.value);
    if (machineType !== productCategory.value) {
        document.getElementById('unmatching-type-message').hidden = false;
    } else {
        document.getElementById('unmatching-type-message').hidden = true;
    }
}
    // function to return the machine type given the machine name
    function returnMachineType (machineName) {
        let machine = machineList.find((m) => `VM${m.machineId}-${m.machineType}: ${m.machineLocation}` === machineName);
        return machine ? machine.machineType : '';
    }

// validate that the qty added doesn't make the machine qty exceed its capacity of 75

// STEP 4: HANDLE SUBMISSION

// add the new product (if there's any) into the product