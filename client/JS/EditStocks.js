let chosenProductId = 1;
let chosenMachineId = 1;
let chosenStock = {};
let chosenMachine = {};
let chosenProduct = {};

SetUpEditForm();

quantity.addEventListener('change',() => {
    checkQtyLimit();
})

document.getElementById('edit-stock-form').addEventListener('submit',(e) => {
    e.preventDefault();
    SubmitEdits();
})



async function SetUpEditForm() {

    // fetch all the lists from DB
    stockList = await getFilteredStockList(); //get non-deleted stocks
    productList = await fetchProducts();
    machineList = await fetchMachines();
    categoryList = await fetchCategories();

    // fetch the product using the given productId
    chosenProduct = await fetchProductById(chosenProductId);
    // fill out the productName, productCategory, productPrice, and productDescription input boxes
    productName.value = chosenProduct.productName;
    productCategory.value = await returnCategoryName(chosenProduct.categoryId);
    productPrice.value = chosenProduct.productPrice;
    productDescription.value = chosenProduct.productDescription;

    // fetch the machine using the given machineId
    chosenMachine = await fetchMachineById(chosenMachineId);
    // fill out the vending machine input box
    vendingMachine.value = `VM${chosenMachine.machineId}-${returnCategoryName(chosenMachine.categoryId)}: ${chosenMachine.machineLocation}`;

    // fetch the stock using the given productId and machineId
    chosenStock = await fetchStockById(chosenProductId, chosenMachineId);
    // fill out the stockQty input box with current value:
    quantity.value = chosenStock.stockQty;

    // TESTING
    console.log(chosenStock);
    console.log(chosenProduct);
    console.log(chosenMachine);
}

    
async function SubmitEdits() {
    //calculate the difference between the newly input stockQty and the current value in the DB
    let machineQtyDiff = parseInt(quantity.value) - chosenStock.stockQty;
    
    // Update the total inv quantity (machineQty) of this stock's corresponding machine
    if (machineQtyDiff >= 0) { //if the new stockQty > the current one, add the increased amount to the machineQty
        chosenMachine.machineQty = chosenMachine.machineQty + machineQtyDiff;
    } else { // if the new stockQty < the current one, subtract the difference from the machine Qty
        chosenMachine.machineQty = chosenMachine.machineQty - machineQtyDiff;
    }
    // updateMachine(chosenMachine, chosenMachine.machineId); // PUT call to the DB
    console.log(chosenMachine)// testing

    //update the new stockQty to the stock table:
    chosenStock.stockQty = parseInt(quantity.value); //assign the new stockQty to the current stockQty & update
    // updateStock(chosenStock);
    console.log(chosenStock) //testing
}
    

