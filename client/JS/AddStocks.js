// handle dropdowns and self input when Other is chosen
let productNameList = ["Coca-Cola","Sprite","SmartWater","Lay's Potato Chip"];
setDataList(productNameList,'product-name');
document.getElementById('product-name').addEventListener('change',()=>{
    displaySelfInputSection('product-name');
})

let vmList = ["vm111","vm121","vm122","vm123"];
setDataList(vmList, 'vm-id');
document.getElementById('vm-id').addEventListener('change',()=>{
    displaySelfInputSection('vm-id');
})

let productCategoryList = ["drink","snack","earphone","stationery"];
setDataList(productCategoryList, 'product-category');
document.getElementById('product-category').addEventListener('change',()=>{
    displaySelfInputSection('product-category');
})


//handle submit button
document.getElementById('submit-button').addEventListener('submit',(event) =>{
    event.preventDefault();
    handleSubmitButton();
})


//-----------------FUNCTIONS------------------------

// function to set the datalist for the searchable dropdowns:
function setDataList(dataSource, formComponentId){
    const dropdown = document.querySelector(`#${formComponentId}-list`);
    dataSource.forEach((item) => {
        let option = document.createElement('option');
        option.value = item;
        dropdown.appendChild(option);
    });
    // add an option for Other
    let option = document.createElement('option');
    option.value = 'Other';
    dropdown.appendChild(option);
}

// function to hide/ unhide the self input section depending on if the Other option is selected
function displaySelfInputSection(formComponentId) {
        let dropdownInput = document.getElementById(`${formComponentId}`); //the searchable dropdown input
        let otherInputSection = document.getElementById(`other-${formComponentId}`); //the div for self input section
            if (dropdownInput.value === "Other") {
                otherInputSection.hidden = false; //unhide the section
            } else {
                otherInputSection.hidden = true; //hide the section
            }
}

// Function to replace "Other" with the self-input value when "Other" is chosen from dropdown
function handleSelfInputForOther(formComponentId) {
    // if statement
    let value = document.getElementById(`${formComponentId}`).value === "Other" ? 
    document.getElementById(`${formComponentId}-self-input`).value : 
    document.getElementById(`${formComponentId}`).value
    // Add the new product/category/vending machine into the corresponding table in the database
    
    return value;
}

function addNewProductName(){

}

// POST api to add new data row to the corresponding database table
async function addToDB(newObj,apiLink) {
    await fetch(apiLink, { //api link for stock
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}



// function to handle submit button:
function handleSubmitButton(){
    // create an object and store the user input
    let newStock = {
        productName: handleSelfInputForOther('product-name'),
        productCategory: handleSelfInputForOther('product-category'),
        vendingMachineId: handleSelfInputForOther('vm-id'),
        quantity: document.getElementById('quantity').value,
        description: document.getElementById('description').value
    }
    // submit the obj to the stock database
    console.log(newStock);
    // addNewStock(newStock, "#"); --> THEN, re-render in admin dashboard
}


// need a fetch api to get the list of the productNameList and the Vending Machine List and the product category list
// product name determine the price and description
// vending machine determines the product category