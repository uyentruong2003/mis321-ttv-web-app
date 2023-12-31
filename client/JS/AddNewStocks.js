

SetUpAddForm();

//WHEN PRODUCT NAME IS CHANGED:
productName.addEventListener('change',() => {
    // check if the user input is from dropdown list provided
    CheckIfInputFromList('product-name');
    // display info of the product selected
    DisplaySelectedProductInfo().then( async () => {
        // if "Other" is chosen, pop out self-input section
        RouteIfOtherProduct();
        // check if the stock of this product in the select machine already existed
        CheckIfStockExisted();
        // check if the product category is matched with the vending machine category:
        CheckIfCategoryMatched();
        // disable the submit button when error(s) occur
        await SetSubmitButtonStatus();
    })
})

//WHEN SELF-INPUT PRODUCT NAME IS CHANGED:
selfInputProductName.addEventListener('change', async() => {
    // check if the self input existed already:
    CheckIfInputProductExisted();
    // disable the submit button when error(s) occur
    await SetSubmitButtonStatus();
})

//WHEN PRODUCT CATEGORY IS CHANGED:
productCategory.addEventListener('change', async() => {
    // check if the user input is from dropdown list provided
    CheckIfInputFromList('product-category');
    // check if the product category is matched with the vending machine category:
    CheckIfCategoryMatched();
    // disable the submit button when error(s) occur
    await SetSubmitButtonStatus();
})

//WHEN VENDING MACHINE IS CHANGED:
vendingMachine.addEventListener('change',async () => {
    // check if the user input is from dropdown list provided
    CheckIfInputFromList('vending-machine');
    // check if the stock of this product in the select machine already existed
    CheckIfStockExisted();
    // check if the added qty makes the qty of the selected machine exceeds the 75 cap
    CheckIfAddedQtyOverCap();
    // check if the product category is matched with the vending machine category:
    CheckIfCategoryMatched();
    // disable the submit button when error(s) occur
    await SetSubmitButtonStatus();
})

// WHEN QUANTITY IS CHANGED:
quantity.addEventListener('change', () => {
    // check if the added qty makes the qty of the selected machine exceeds the 75 cap
    CheckIfAddedQtyOverCap().then(() => {
        // disable the submit button when error(s) occur
        SetSubmitButtonStatus();
    })
})

// WHEN FORM IS SUBMITTED:
document.getElementById("add-new-stock-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        saveToProductTable().then(async () => {
            await saveToStockTable();
            window.location.href = "./AdminInventoryDashBoard.html";
        })
    } catch (error) {
        // Handle or log the error as needed
        console.error('Error in form submission:', error);
    }
});

// Functions:------------------------------------------
async function SetUpAddForm () {
    stockList = await getFilteredStockList(); //get non-deleted stocks
    productList = await fetchProducts();
    machineList = await fetchMachines();
    categoryList = await fetchCategories();

    // set the datalist for searchable dropdowns
    setMachineList();
    setProductList();
    setCategoryList();
    
    //testing
    console.log(stockList);
    console.log(productList);
    console.log(machineList);
    console.log(categoryList);
}
function RouteIfOtherProduct() {
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
async function DisplaySelectedProductInfo() {
    let selectedProduct = productList.find((p) => p.productName === productName.value);
    if (selectedProduct) {
        productCategory.value = await returnCategoryName(selectedProduct.categoryId);
        productPrice.value = selectedProduct.productPrice;
        productDescription.value = selectedProduct.productDescription;
    }
}
function CheckIfInputProductExisted() {
    let existed = productList.find((p) => p.productName.toLowerCase() === selfInputProductName.value.toLowerCase());
    let errorMessage = document.getElementById('product-existed-message');
    if(existed) {
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
    }
}
function CheckIfInputFromList (inputId) {
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
}
function CheckIfCategoryMatched() {
    let errorMessage = document.getElementById('unmatching-type-message');
    let mCategory = returnMachineCategory(vendingMachine.value);
    if(productCategory.value !== mCategory && productCategory.value !== '' && vendingMachine.value !== ''){
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
    }
}
function CheckIfStockExisted() {
    let selectedProductId = returnProductId(productName.value);
    let selectedMachineId = returnMachineId(vendingMachine.value);
    let errorMessage = document.getElementById('existed-stock-message');
    existed = stockList.find((s) => s.productId === selectedProductId && s.machineId === selectedMachineId);
    if(existed){
        errorMessage.hidden = false;
        errorMessage.innerText = `Stock of product "${productName.value}" has already existed in vending machine "${vendingMachine.value}". Please edit existed stock's qty instead of adding new.`
    } else{
        errorMessage.hidden = true;
    }
}
async function CheckIfAddedQtyOverCap() {
    let errorMessage = document.getElementById('overcap-message');
    let stockQtyInput = parseInt(quantity.value);
    let machineId = returnMachineId(vendingMachine.value);
    // get the current inv quantity of the machine this stock is added to:
    let machine = await fetchMachineById(machineId);

    let avalaibleCap = 75 - machine.machineQty;

    if (stockQtyInput > avalaibleCap && stockQtyInput !== 0 && vendingMachine.value !== '') {
        errorMessage.textContent = `You can only add ${avalaibleCap} more items to this machine`;
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
    }
}
async function SetSubmitButtonStatus() {
    // get all the errorMessages:
    let errorMessages = [
        document.getElementById('product-existed-message'),
        document.getElementById('not-predefined-product-name-message'),
        document.getElementById('not-predefined-product-category-message'),
        document.getElementById('not-predefined-vending-machine-message'),
        document.getElementById('overcap-message'),
        document.getElementById('unmatching-type-message'),
        document.getElementById('existed-stock-message')
    ];
    // Check if any error message is visible
    let isErrorVisible = errorMessages.some((errorMessage) => !errorMessage.hidden);

    // Disable or enable the submit button based on the error status
    submitButton.disabled = isErrorVisible;
}
async function saveToProductTable() {
    try {
        if (productName.value === "Other") {
            let newProduct = {
                productName: selfInputProductName.value,
                productPrice: parseFloat(productPrice.value),
                categoryId: returnCategoryId(productCategory.value),
                productDescription: productDescription.value,
                imgURL: selfInputProductImageURL.value,
            };
            console.log(newProduct);
            // save new product to DB
            await saveProduct(newProduct);
            // re-fetch product just in case the user chose to self-input product
            productList = await fetchProducts();
        }
    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
}
async function saveToStockTable() {
    try {
        // in case the user input a new product:
        let finalProductName = productName.value === "Other" ? selfInputProductName.value : productName.value;
        let newStock = {
            productId: returnProductId(finalProductName),
            machineId: returnMachineId(vendingMachine.value),
            stockQty: parseInt(quantity.value),
            lastUpdate: getCurrentDateTime(),
            deleted: false,
        };

        console.log(newStock);
        // save new stock to DB
        await saveStock(newStock);
        // increase the machineQty of the selected machine
        await increaseMachineQty(newStock);
    } catch (error) {
        console.error('Error saving stock:', error);
        throw error;
    }
}
async function increaseMachineQty(newStock) {
    // find the machine that needs to be updated
    let updatedMachine = machineList.find((m) => m.machineId === newStock.machineId);
    console.log(updatedMachine); //testing
    // update the machineQty to keep up with quantity cap
    updatedMachine.machineQty = updatedMachine.machineQty + newStock.stockQty;
    console.log("after", updatedMachine.machineQty); //testing
    // PUT (Update) the vendingMachine table
    await updateMachine(updatedMachine, updatedMachine.machineId);
}





//-=================================================================================================
// let productList = [
//     {productId: 1, productName: 'Coca-Cola', categoryId: 1, productPrice: 2.50, productDescription:'Calories 100 kcal'},
//     {productId: 2, productName: 'Sprite', categoryId: 1, productPrice: 2.50, productDescription:'Calories 102 kcal'},
//     {productId: 3, productName: "Lay's Potato Chips", categoryId: 2, productPrice: 1.75, productDescription:'Calories 75 kcal'},
//     {productId: 4, productName: 'KitKat', categoryId: 2, productPrice: 1.75, productDescription:'Calories 80 kcal'}
// ]

// let stockdetailsList = [
//     {productId: 2, machineId: 1003, stockQty: 5, lastUpdate: '2023-11-20'},
//     {productId: 2, machineId: 1003, stockQty: 10, lastUpdate: '2023-11-21'},
//     {productId: 1, machineId: 1001, stockQty: 12, lastUpdate: '2023-11-30'}
// ]

// let categoryList = [
//     {categoryId: 1, categoryName: 'Beverage'},
//     {categoryId: 2, categoryName: 'Snack'},
//     {categoryId: 3, categoryName: 'Electronics'},
//     {categoryId: 4, categoryName: 'Movie'},
//     {categoryId: 5, categoryName: 'Video Game'}
// ]

// let machineList = [
//     {machineId: 1001, machineLocation: '123 Dirt Rd, Tuscaloosa, AL 35487', machineRegion: 'Southeast', categoryId: 1, machineQty: 12},
//     {machineId: 1002, machineLocation: '456 Smith Ave, Milpitas, CA 95035', machineRegion: 'West', categoryId: 2, machineQty: 10},
//     {machineId: 1003, machineLocation: '78 John St, Chicago, CA 60007', machineRegion: 'Midwest', categoryId: 2, machineQty: 15}
// ]

// DASHBOARD: stockId, productName, productPrice, categoryName, machineId, machineLocation, machineRegion, stockQty
// stockdetails table: stockId, productId, machineId, stockQty, addDate
// product table: productId, productName, productPrice, categoryId, productDescription
// category table: categoryId, categoryName
// machine table: machineId, machineLocation, machineRegion, machineQty, categoryId