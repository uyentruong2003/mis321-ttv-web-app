let productList = [
    {productName: 'Coca-Cola', productCategory: 'Beverage', unitPrice: 2.50, description:'Calories 100 kcal'},
    {productName: 'Sprite', productCategory: 'Beverage', unitPrice: 2.50, description:'Calories 102 kcal'},
    {productName: "Lay's Potato Chips", productCategory: 'Snack', unitPrice: 1.75, description:'Calories 75 kcal'},
    {productName: 'KitKat', productCategory: 'Snack', unitPrice: 1.75, description:'Calories 80 kcal'}
]

let categoryList = [
    {categoryName: 'Beverage'},
    {categoryName: 'Snack'},
    {categoryName: 'Electronics'},
    {categoryName: 'Movie'},
    {categoryName: 'Video Game'}
]

let vmList = [
    {vmID: '1001', vmLoc: '123 Dirt Rd, Tuscaloosa, AL 35487', vmRegion: 'Southeast', vmType: 'Beverage', vmCap: 12},
    {vmID: '1002', vmLoc: '456 Smith Ave, Milpitas, CA 95035', vmRegion: 'West', vmType: 'Snack', vmCap: 10},
    {vmID: '1003', vmLoc: '78 John St, Chicago, CA 60007', vmRegion: 'Midwest', vmType: 'Snack', vmCap: 15}
]

// Set Product List
setProductList(productList,"product-name-list");
// Everytime new input is made:
document.getElementById("product-name").addEventListener("change",() => {
    let productName = document.getElementById("product-name").value;
    // return the product info based on the product name
    returnProductInfo(productName, productList);
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
            document.getElementById("description").readOnly = false; // allow input

            //REQUIRE INPUT

        } else {
            otherInputSection.hidden = true; //hide the section
            document.getElementById("product-category").readOnly = true;
            document.getElementById("unit-price").readOnly = true;
            document.getElementById("description").readOnly = true;
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

// function to return the product info based on the product name:
function returnProductInfo(productName, productList) {
    productList.forEach((p) => {
        if (productName === p.productName){
            document.getElementById("product-category").value = p.productCategory;
            document.getElementById("unit-price").value = p.unitPrice;
            document.getElementById("description").value = p.description;
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