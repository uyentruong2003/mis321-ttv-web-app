let productList = [
    {productId: 1, productName: 'Coca-Cola', categoryId: 1, productPrice: 2.50, productDescription:'Calories 100 kcal'},
    {productId: 2, productName: 'Sprite', categoryId: 1, productPrice: 2.50, productDescription:'Calories 102 kcal'},
    {productId: 3, productName: "Lay's Potato Chips", categoryId: 2, productPrice: 1.75, productDescription:'Calories 75 kcal'},
    {productId: 4, productName: 'KitKat', categoryId: 2, productPrice: 1.75, productDescription:'Calories 80 kcal'}
]

// dashboard table: 
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

let vmList = [
    {vmID: '1001', vmLoc: '123 Dirt Rd, Tuscaloosa, AL 35487', vmRegion: 'Southeast', vmType: 'Beverage', vmCap: 12},
    {vmID: '1002', vmLoc: '456 Smith Ave, Milpitas, CA 95035', vmRegion: 'West', vmType: 'Snack', vmCap: 10},
    {vmID: '1003', vmLoc: '78 John St, Chicago, CA 60007', vmRegion: 'Midwest', vmType: 'Snack', vmCap: 15}
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
setVmList(vmList, "vending-machine-list");
// Everytime new input is made:
document.getElementById('vending-machine').addEventListener("change",() => {
    // check if the machine type matches the product category
    validateVmType();
})

//----------------------FUNCTIONS----------------------

// function to add the "Other" product into the list & update the database
// function to add the stock into the stock database (consider the Other case)
// function to validate the quantity of stocks added

function handleSubmission() {
    
    // submit the obj to the stock database
    console.log(newStock);
    // addNewStock(newStock, "#"); --> THEN, re-render in admin dashboard
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
    let vmChosen = document.getElementById('vending-machine');
    let vmType = "";
    vmList.forEach((item) => {
        if (vmChosen.value === item.vmType + "VM #" + item.vmID + " - "+item.vmLoc) {
            vmType = item.vmType; 
        }
    })
    let productCategory = document.getElementById('product-category');
    if (vmType !== productCategory.value && vmChosen.value !== "" && productCategory !== "") {
        document.getElementById('unmatching-type-message').hidden = false; //unhide the message
    } else {
        document.getElementById('unmatching-type-message').hidden = true; //hide the message
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
            document.getElementById("product-category").value = returnProductCategory(p.categoryId);
            document.getElementById("unit-price").value = p.productPrice;
            document.getElementById("productDescription").value = p.productDescription;
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
function setVmList (vmList, dataListId) {
    const dropdown = document.querySelector(`#${dataListId}`);
    vmList.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.vmType + "VM #" + item.vmID + " - "+item.vmLoc
        dropdown.appendChild(option);
    });
}