let productList = [
    {productId: 1, productName: 'Coca-Cola', categoryId: 1, productPrice: 2.50, productDescription:'Calories 100 kcal'},
    {productId: 2, productName: 'Sprite', categoryId: 1, productPrice: 2.50, productDescription:'Calories 102 kcal'},
    {productId: 3, productName: "Lay's Potato Chips", categoryId: 2, productPrice: 1.75, productDescription:'Calories 75 kcal'},
    {productId: 4, productName: 'KitKat', categoryId: 2, productPrice: 1.75, productDescription:'Calories 80 kcal'}
]

let stockdetailsList = [
    {productId: 2, machineId: 1003, stockQty: 5, lastUpdate: '2023-11-20'},
    {productId: 2, machineId: 1003, stockQty: 10, lastUpdate: '2023-11-21'},
    {productId: 1, machineId: 1001, stockQty: 12, lastUpdate: '2023-11-30'}
]

let categoryList = [
    {categoryId: 1, categoryName: 'Beverage'},
    {categoryId: 2, categoryName: 'Snack'},
    {categoryId: 3, categoryName: 'Electronics'},
    {categoryId: 4, categoryName: 'Movie'},
    {categoryId: 5, categoryName: 'Video Game'}
]

let machineList = [
    {machineId: 1001, machineLocation: '123 Dirt Rd, Tuscaloosa, AL 35487', machineRegion: 'Southeast', categoryId: 1, machineQty: 12},
    {machineId: 1002, machineLocation: '456 Smith Ave, Milpitas, CA 95035', machineRegion: 'West', categoryId: 2, machineQty: 10},
    {machineId: 1003, machineLocation: '78 John St, Chicago, CA 60007', machineRegion: 'Midwest', categoryId: 2, machineQty: 15}
]

// DASHBOARD: stockId, productName, productPrice, categoryName, machineId, machineLocation, machineRegion, stockQty

// stockdetails table: stockId, productId, machineId, stockQty, addDate
// product table: productId, productName, productPrice, categoryId, productDescription
// category table: categoryId, categoryName
// machine table: machineId, machineLocation, machineRegion, machineQty, categoryId

let productName = document.getElementById('product-name');
let productCategory = document.getElementById('product-category');
let productPrice= document.getElementById('unit-price');
let productDescription = document.getElementById('description');
let selfInputProduct = document.getElementById('product-name-self-input');
let vendingMachine = document.getElementById('vending-machine');
let quantity = document.getElementById('quantity');
let submitButton = document.getElementById('submit-button');

setProductList();
setCategoryList();
setMachineList();

productName.addEventListener('change', () => {
    checkInputInDataList('product-name')
    displaySelectedProductInfo();
    checkMatchingCategory();
    takeSelfInput(); 
    manipulateSubmitButton();
})

selfInputProduct.addEventListener('change', () => {
    checkProductDup();
    manipulateSubmitButton();
})

productCategory.addEventListener('change', () => {
    checkInputInDataList('product-category')
    checkMatchingCategory();
    manipulateSubmitButton();
})

vendingMachine.addEventListener('change', () => {
    if(checkInputInDataList('vending-machine')){
        checkMatchingCategory();
        checkQtyLimit();
    }
    manipulateSubmitButton();    
})

quantity.addEventListener('change',() => {
    checkQtyLimit();
    manipulateSubmitButton();
})

handleSubmission();


//-=================================================================================================

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
        option.value = `VM${item.machineId}-${returnCategoryName(item.categoryId)}: ${item.machineLocation}`;
        dropdown.appendChild(option);
    });
}
        // function to return category name based on a given category id
        function returnCategoryName(categoryId) {
            let category = categoryList.find((c) => c.categoryId === categoryId);
            return category ? category.categoryName : '';
        }

//--------------------------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------------------------------------
// STEP 3: INPUT VALIDATION

// validate that self-input product hasn't appear in the dropdown list
function checkProductDup () {
    let existed = productList.find((p) => p.productName.toLowerCase() === selfInputProduct.value.toLowerCase());
    if (existed) {
        document.getElementById('product-existed-message').hidden = false;
        return false;
    } else {
        document.getElementById('product-existed-message').hidden = true;
        return true;
    }
}

// validate that product category and machine type is a match
function checkMatchingCategory () {
    let machineCategoryName = returnMachineCategory(vendingMachine.value);
    if (machineCategoryName !== productCategory.value && vendingMachine.value !== "" && productCategory.value !== "") {
        document.getElementById('unmatching-type-message').hidden = false;
        return false;
    } else {
        document.getElementById('unmatching-type-message').hidden = true;
        return true;
    }
}
    // function to return the machine type given the machine name in this format: VM{machineId}-{categoryName}: {machineLocation}
    function returnMachineCategory (machineName) {
        // Find the index of the hyphen and colon
        let hyphenIndex = machineName.indexOf('-');
        let colonIndex = machineName.indexOf(':');
        // Extract the substring between the hyphen and colon
        return machineName.substring(hyphenIndex + 1, colonIndex).trim();
    }
// validate that the qty added doesn't make the machine qty exceed its capacity of 75
function checkQtyLimit () {
    let stockQtyInput = parseInt(quantity.value);
    let machineId = returnMachineId(vendingMachine.value);
    let currentMachineQty = 0;
    //loop thru stockdetailsList to calc the current qty in the specified machine
    stockdetailsList.forEach((s) => {
        if(s.machineId === machineId) {
            currentMachineQty += s.stockQty;
        }
    })
    // assume each machine holds 75 items, check if adding this quantity will exceeds the limit:
    if (currentMachineQty + stockQtyInput > 75 && stockQtyInput !== 0 && vendingMachine.value !== 0) {
        document.getElementById('overcap-message').textContent = `You can only add ${75 - currentMachineQty} more items to this machine`;
        document.getElementById('overcap-message').hidden = false;
        return false;
    }
    else {
        document.getElementById('overcap-message').hidden = true;
        return true;
    }
}
        // function to return the machineId given the machine name
        function returnMachineId(machineName) {
            let machine = machineList.find ((m) => `VM${m.machineId}-${returnCategoryName(m.categoryId)}: ${m.machineLocation}` === machineName);
            return machine ? machine.machineId : '';  
        }

// validate that user input belongs to the predefined list
function checkInputInDataList(inputId) {
    let input = document.getElementById(inputId).value;
    let optionList = document.getElementById(`${inputId}-list`).options;
    let inList = false;
    for (i=0; i<optionList.length; i++) {
        if(input === optionList[i].value) {
            inList = true;
            i = optionList.length; // stop loop once input is found in list
        } else if (input === "") { // if there's no input yet, don't pop out the error
            inList = true;
        } else {
            inList = false;
        }
    }
    document.getElementById(`not-predefined-${inputId}-message`).hidden = inList;
    return inList;
}

//---------------------------------------------------------------------------------------
// STEP 4: HANDLE SUBMISSION


// add the new product (if there's any) into the product table
function addNewToProductTable() {
    if (productName.value === "Other") {
        let newProduct = {
            productName: selfInputProduct.value, 
            categoryId: returnCategoryId(productCategory.value), 
            productPrice: productPrice.value, 
            productDescription:productDescription.value,
            imgUrl: '#'
        }
        // POST the object to the product table
        // Re-call the GET API for all product
        // productList = ASYNC AWAIT ... ;
        productList.push(newProduct);
    }
}
        // function to return categoryId given the categoryName
        function returnCategoryId(categoryName) {
            let category = categoryList.find((c) => c.categoryName === categoryName);
            return category ? category.categoryId : -1;
        }


// add the stock into the stockdetails table
function addNewToStockTable() {
    let newStock = {
        productId: returnProductId(productName.value),
        machineId: returnMachineId(vendingMachine.value),
        stockQty: parseInt(quantity.value),
        lastUpdate: getCurrentDateTime(),
        deleted: false
    }
    // POST it to the stockdetails table
    stockdetailsList.push(newStock);

    // PUT (Update) the vendingMachine table:
    let machine = machineList.find((m) => m.machineId === newStock.machineId);
    machine.machineQty += newStock.stockQty;
}
    // function to return productId given the productName
    function returnProductId(productName) {
        let product = productList.find((p) => p.productName === productName);
        return product ? product.productId : -1;
    }

    // function to get current date and time
    function getCurrentDateTime () {
        let date = new Date();
        // Format the date to 'YYYY-MM-DD HH:MM:SS' format
        let formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        return formattedDate
    }

// add the submitted info to the database
function handleSubmission() {
    // When submit button is clicked...
    document.getElementById("add-new-stock-form").addEventListener('submit', (e) => {
        e.preventDefault();
        addNewToProductTable(); // in case "Other" is chosen, add the new product to the product table
        addNewToStockTable(); // THEN, add to stock table

        // print out to test
        console.log(stockdetailsList);
        console.log(productList);
        console.log(machineList);
    })
}

//disable and enable submit button
function manipulateSubmitButton() {
    const isProductNameValid = checkInputInDataList('product-name') && checkProductDup();
    const isProductCategoryValid = checkInputInDataList('product-category') && checkMatchingCategory();
    const isMachineValid = checkInputInDataList('vending-machine') && checkMatchingCategory() && checkQtyLimit();
    const isQuantityValid = checkQtyLimit();

    // Disable the submit button if any validation fails
    submitButton.disabled = !(isProductNameValid && isProductCategoryValid && isMachineValid && isQuantityValid);
}

// // STEP 5: API fetch calls
// async function saveStocks(stock) {
//     await fetch("", {
//         method: "POST",
//         body: JSON.stringify(stock),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
// }