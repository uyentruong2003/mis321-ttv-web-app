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
// dashboard table: stockId, productName, productPrice, categoryName, machineId, machineLocation, machineRegion, stockQty
// stockdetails table: stockId, productId, machineId, stockQty, addDate
// product table: productId, productName, productPrice, categoryId, productDescription
// category table: categoryId, categoryName
// machine table: machineId, machineLocation, machineRegion, machineQty, machineType

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

// Set Stock List
setProductList(productList,"product-name-list");
// Everytime new input is made:
document.getElementById("product-name").addEventListener("change",() => {
    let productName = document.getElementById("product-name").value;
    // return the product info based on the product name
    returnProductInfo(productName);
    // check if the product category matches the machine type
    validateVmType();
    // display self-input if "Other" is chosen
    takeSelfInput();
})

// Validate new input in the other-product-name section
document.getElementById('product-name-self-input').addEventListener("change", () => {
    validateSelfInput();
})


// Set VM List
setVmList(machineList, "vending-machine-list");
// Everytime new input is made:
document.getElementById('vending-machine').addEventListener("change",() => {
    // check if the machine type matches the product category
    validateVmType();
    // check if adding the qty exceeds the cap of each machine
    validateStockQty();
})

console.log(returnMachineType('BeverageVM #1001 - 123 Dirt Rd, Tuscaloosa, AL 35487'));

//----------------------FUNCTIONS----------------------

// function to add the "Other" product into the list & update the database
// function to add the stock into the stock database (consider the Other case)
// function to validate the quantity of stocks added

function addNewProductFromOtherInput() {
    // add the Other product
    let newProduct = {
        productName:"",
        categoryId: 1,
        productPrice: 1,
        productDescription:""
    }
    // add this to the product table
}

function validateStockQty() {
    let stockQtyInput = parseInt(document.getElementById('quantity').value);
    let machineName = document.getElementById('vending-machine').value;
    let machineId = returnMachineId(machineName);
    let currentmachineQty = 0;
    //loop thru stockdetailsList to calc the current qty in the specified machine
    stockdetailsList.forEach((s) => {
        if(s.machineId === machineId) {
            currentmachineQty += s.machineQty;
        }
    })
    // assume each machine holds 75 items, check if adding this quantity will exceeds the limit:
    if (currentmachineQty + stockQtyInput > 75) {
        document.getElementById('overcap-message').hidden = false;
        document.getElementById('overcap-message').textContent = `You can only add ${75 - currentmachineQty} more items to this machine`;
    }
}

// function to validate self-input product:
function validateSelfInput() {
    let newProductName = document.getElementById('product-name-self-input');
    // check if the name has already existed
    let contains = false;
    productList.forEach((item) => {
        if (newProductName.value.toLowerCase() === item.productName.toLowerCase()) {
            contains = true;
        }
    })
    document.getElementById('product-existed-message').hidden = !contains;
}

// function to hide/ unhide the self input section depending on if the Other option is selected
function takeSelfInput() {
    let dropdownInput = document.getElementById("product-name"); //the searchable dropdown input
    let otherInputSection = document.getElementById(`other-product-name`); //the div for self input section
        if (dropdownInput.value === "Other") {
            otherInputSection.hidden = false; //unhide the section
            document.getElementById("product-category").readOnly = false; // allow input
            setCategoryList(categoryList,"product-category-list"); //create searchable dropdown
            document.getElementById("unit-price").readOnly = false; // allow input
            document.getElementById("productDescription").readOnly = false; // allow input

            // required input for other specification
            document.getElementById('product-name-self-input').required = true;
            
        } else {
            otherInputSection.hidden = true; //hide the section
            document.getElementById("product-category").readOnly = true; //read-only on
            document.getElementById("unit-price").readOnly = true; //read-only on
            document.getElementById("productDescription").readOnly = true; //read-only on
            document.getElementById('product-name-self-input').required = false;
        }
}

//function to validate vm:
function validateVmType() {
    let machineName = document.getElementById('vending-machine');
    let machineType = returnMachineType(machineName.value);
    let productCategory = document.getElementById('product-category');
    if (machineType !== productCategory.value && machineName.value !== "" && productCategory !== "") {
        document.getElementById('unmatching-type-message').hidden = false; //unhide the message
    } else {
        document.getElementById('unmatching-type-message').hidden = true; //hide the message
    }
}

//retrieve machine type from machine name chosen
function returnMachineType(machineName) {
    let machineType = "";
    machineList.forEach((item) => {
        if (machineName.value === item.machineType + "VM #" + item.machineId + " - "+item.machineLocation) {
            machineType = item.machineType; 
        }
    })
    return machineType;
}

//retrieve machine Id from machine name chosen
function returnMachineId(machineName) {
    let machineId = 0;
    machineList.forEach((item) => {
        if (machineName.value === item.machineType + "VM #" + item.machineId + " - "+item.machineLocation) {
            machineId = item.machineId; 
        }
    })
    return machineId;
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

// function to return the product category based on the category Id:
function returnProductCategory(categoryId) {
    let productCategory = '';
    categoryList.forEach((c) => {
        if (categoryId === c.categoryId){
            productCategory =  c.categoryName;
        }
    })
    return productCategory;
}

// function to return the product info based on the product name:
function returnProductInfo(productName) {
    productList.forEach((p) => {
        if (productName === p.productName){
            document.querySelector("#product-category").value = returnProductCategory(p.categoryId);
            document.querySelector("#unit-price").value = p.productPrice;
            document.querySelector("#description").value = p.productDescription;
        }
    })
}

// function to set the datalist for the product category's searchable dropdowns (in case input for new product):
function setCategoryList(categoryList, dataListId){
    const dropdown = document.querySelector(`#${dataListId}`);
    categoryList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.categoryName;
        dropdown.appendChild(option);
    });
}

// function to set the datalist for the vending machine's searchable dropdowns:
function setVmList (machineList, dataListId) {
    const dropdown = document.querySelector(`#${dataListId}`);
    machineList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.machineType + "VM #" + item.machineId + " - "+item.machineLocation
        dropdown.appendChild(option);
    });
}

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
    }
    // POST it to the stockdetails table
    stockdetailsList.push(newStock);
}
    // function to return productId given the productName
    function returnProductId(productName) {
        let product = productList.find((p) => p.productName === productName);
        return product ? product.productId : -1;
    }

    // function to get current date and time
    function getCurrentDateTime () {
        let date = Date(Date.now());
        return date.toString();
    }

function handleSubmission() {
        // When submit button is clicked...
        document.getElementById("add-new-stock-form").addEventListener('submit', (e) => {
            e.preventDefault();
            addNewToProductTable(); // in case "Other" is chosen, add the new product to the product table
            addNewToStockTable(); // THEN, add to stock table
        })
}