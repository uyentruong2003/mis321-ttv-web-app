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

// GET LISTS FROM DATABASE:
async function getFilteredStockList() {
    stockList = await fetchStocks();
    // filter & get only the ones that is not deleted
    let filteredStockList = [];
    stockList.forEach((item) => {
        if (item.deleted === false){
            filteredStockList.push(item);
        }
    })
    stockList = filteredStockList;
}

// function to return category name based on a given category id
function returnCategoryName(categoryId) {
    let category = categoryList.find((c) => c.categoryId === categoryId)
    return category ? category.categoryName : "";
}

// SET DATALIST FOR SEARCHABLE DROPDOWNS ==============================================================
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


// REGULATE PRODUCT NAME INPUT =================================================================================

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
        // required input for the new product name & immage
        selfInputProductName.required = true;
        selfInputProductImageURL.required = true;
    } else {
        // hide the self input section
        selfInputSection.hidden = true;
        // disable input
        productCategory.readOnly = true;
        productPrice.readOnly = true;
        productDescription.readOnly = true;
        // unrequire self-input product name
        selfInputProductName.required = false;
        selfInputProductImageURL.required = false;
    }
}

// INPUT VALIDATION ===================================================================================================

// validate that self-input product hasn't appear in the dropdown list
function checkProductDup () {
    let existed = productList.find((p) => p.productName.toLowerCase() === selfInputProductName.value.toLowerCase());
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
    let machineCategory = returnMachineCategory(vendingMachine.value);
    if (machineCategory !== productCategory.value && vendingMachine.value !== "" && productCategory.value !== "") {
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
    //loop thru stockList to calc the current qty in the specified machine
    stockList.forEach((s) => {
        if(s.machineId === machineId) {
            currentMachineQty = currentMachineQty + s.stockQty;
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

// HANDLE SUBMISSION ==========================================================================================

// add the new product (if there's any) into the product table
async function addNewToProductTable() {
    try{
        if (productName.value === "Other") {
            let newProduct = {
                productName: selfInputProductName.value, 
                categoryId: returnCategoryId(productCategory.value), 
                productPrice: productPrice.value, 
                productDescription:productDescription.value,
                imgURL: selfInputProductImageURL.value,
            }
            // POST the object to the product table
            await saveProduct(newProduct)
        }
    } catch(error) {
        console.log(error)
    }
}
        // function to return categoryId given the categoryName
        async function returnCategoryId(categoryName) {
            categoryList = await fetchCategories();
            let category = categoryList.find((c) => c.categoryName === categoryName);
            return category ? category.categoryId : -1;
        }


// add the stock into the stockdetails table
async function addNewToStockTable() {
    try{
        productList= await fetchProducts();
        let newStock = {
            productId: returnProductId(productName.value),
            machineId: returnMachineId(vendingMachine.value),
            stockQty: parseInt(quantity.value),
            lastUpdate: getCurrentDateTime(),
            deleted: false
        }
        routeStockAdded(newStock);
        increaseMachineQty(newStock);

    }catch(error){
        console.log(error);
    }
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

async function routeStockAdded(newStock) {
    stockList = await fetchProducts();
    // if stock already exists, only update the existed stock with PUT; else, POST it to the stockdetails table
    existedStock = stockList.find((s) => s.productId === newStock.productId && s.machineId === newStock.productId);
    if (existedStock) {
        newStock.stockQty += existedStock.stockQty; //add newStock to its existed stockQty
        await updateStock(newStock, newStock.productId, newStock.machineId);
    } else {
        await saveStock(newStock);
    }
}

async function increaseMachineQty(newStock) {
     machineList = await fetchMachines();
    // PUT (Update) the vendingMachine table:
     let updatedMachine = machineList.find((m) => m.machineId === newStock.machineId);
     updatedMachine.machineQty += newStock.stockQty; // update the machineQty to keep up with quantity cap
     await updateMachine(updatedMachine, updatedMachine.machineId);
}



// add the submitted info to the database
async function handleSubmission() {
    try{
        // When submit button is clicked...
        document.getElementById("add-new-stock-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            // in case "Other" is chosen, add the new product to the product table
            // THEN, add to stock table
            if (productName === "Other") {
                await addNewToProductTable()
            }
            await addNewToStockTable();

            // print out to test
            stockList = await fetchStocks()
            productList = await fetchProducts()
            machineList = await fetchMachines()

            console.log(stockList);
            console.log(machineList);
            console.log(productList);
        })
    }catch (error) {
        console.log(error)
    }
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

