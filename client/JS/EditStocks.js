let chosenProductId = 1;
let chosenMachineId = 1;
let chosenStock = {};
let chosenMachine = {};
let chosenProduct = {};

UpdateForm();

quantity.addEventListener('change',() => {
    checkQtyLimit();
})

document.getElementById('edit-stock-form').addEventListener('submit',(e) => {
    e.preventDefault();
    SubmitEdits();
})



async function UpdateForm() {
    stockList = await fetchStocks();
    chosenProduct = await fetchProductById(chosenProductId);
    productName.value = chosenProduct.productName;
    productCategory.value = await returnCategoryName(chosenProduct.categoryId);
    productPrice.value = chosenProduct.productPrice;
    productDescription.value = chosenProduct.productDescription;

    chosenMachine = await fetchMachineById(chosenMachineId);
    vendingMachine.value = `VM${chosenMachine.machineId}-${await returnCategoryName(chosenMachine.categoryId)}: ${chosenMachine.machineLocation}`;

    chosenStock = await fetchStockById(chosenProductId, chosenMachineId);
    quantity.value = chosenStock.stockQty;

    console.log(chosenStock);
    console.log(chosenProduct);
    console.log(chosenMachine);
}

    
async function SubmitEdits() {
    //update the machine quantity of items:
    let machineQtyDiff = parseInt(quantity.value) - chosenStock.stockQty;
    if (machineQtyDiff >= 0) { //if the new stockQty is increased, add the increased amount to the machineQty
        chosenMachine.machineQty = chosenMachine.machineQty + machineQtyDiff;
    } else {
        chosenMachine.machineQty = chosenMachine.machineQty - machineQtyDiff;
    }
    // updateMachine(chosenMachine, chosenMachine.machineId); // PUT call to the DB
    console.log(chosenMachine)// testing

    //update the stock table:
    chosenStock.stockQty = parseInt(quantity.value); //assign the new stockQty to the current stockQty & update
    // updateStock(chosenStock);
    console.log(chosenStock) //testing
}
    

