let chosenProductId = parseInt(localStorage.getItem("product-id"));
let chosenMachineId = parseInt(localStorage.getItem("machine-id"));
console.log(chosenProductId, chosenMachineId); //testing
let chosenStock = {};
let chosenMachine = {};
let chosenProduct = {};

SetUpEditForm();

quantity.addEventListener('change',() => {
    CheckIfUpdatedQtyOverCap(); // make sure the newly added stock qty doesn't make the machine exceeds its qty limit of 75
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
    productCategory.value = returnCategoryName(chosenProduct.categoryId);
    productPrice.value = chosenProduct.productPrice;
    productDescription.value = chosenProduct.productDescription;

    // fetch the machine using the given machineId
    chosenMachine = await fetchMachineById(chosenMachineId);
    // fill out the vending machine input box
    vendingMachine.value = `VM${chosenMachine.machineId}-${returnCategoryName(chosenMachine.categoryId)}: ${chosenMachine.machineLocation}`;

    // fetch the stock using the given productId and machineId
    chosenStock = await fetchStockById(chosenProductId, chosenMachineId);
    console.log(chosenStock);
    // fill out the stockQty input box with current value:
    quantity.value = chosenStock.stockQty;

    // TESTING
    console.log(chosenStock);
    console.log(chosenProduct);
    console.log(chosenMachine);
}    
async function SubmitEdits() {
    //calculate the difference between the newly input stockQty and the current value
    let machineQtyDiff = parseInt(quantity.value) - chosenStock.stockQty;
    
    // Update the total inv quantity (machineQty) of this stock's corresponding machine
    chosenMachine.machineQty = chosenMachine.machineQty + machineQtyDiff;

    await updateMachine(chosenMachine, chosenMachine.machineId); // PUT call to the DB
    console.log(chosenMachine)// testing

    //update the new stockQty to the stock table:
    chosenStock.stockQty = parseInt(quantity.value); //assign the new stockQty to the current stockQty & update
    updateStock(chosenStock, chosenStock.productId,chosenStock.machineId); // PUT call to the DB
    console.log(chosenStock) //testing
}

async function CheckIfUpdatedQtyOverCap() {
    let errorMessage = document.getElementById('overcap-message');
    let stockQtyInput = parseInt(quantity.value);
    let machineId = returnMachineId(vendingMachine.value);
    // get the current inv quantity of the machine this stock is added to:
    let machine = await fetchMachineById(machineId);

    // minus the original machineQty without counting the currently edited stock
    let availableCap = 75 - (machine.machineQty- chosenStock.stockQty);

    if (stockQtyInput > availableCap && stockQtyInput !== 0 && vendingMachine.value !== '') {
        errorMessage.textContent = `You can only add ${availableCap} more items to this machine`;
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
    }
}