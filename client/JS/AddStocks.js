
// function to set the datalist for the searchable dropdowns:
function setDataList(dataSource, formComponentId){
    const dropdown = document.querySelector(`#${formComponentId}-list`);
    dataSource.forEach((item) => {
        let option = document.createElement('option');
        option.value = item;
        dropdown.appendChild(option);
    });
    // An option for Other
    let option = document.createElement('option');
    option.value = 'Other';
    dropdown.appendChild(option);
}

function displaySelfInputSection(formComponentId) {
        //handle self input if "Other" is chosen
        let dropdownInput = document.getElementById(`${formComponentId}`);
        let otherInputSection = document.getElementById(`other-${formComponentId}`);
        // let selfInput = document.getElementById(`${formComponentId}-self-input`);
            if (dropdownInput.value === "Other") {
                otherInputSection.hidden = false; //unhide the section
            } else {
                otherInputSection.hidden = true;
            }
}

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
document.getElementById('submit-button').addEventListener('click',(event) =>{
    event.preventDefault();
    handleSubmitButton();
})

// handle the self input for other
function handleSelfInputForOther(formComponentId) {
    return document.getElementById(`${formComponentId}`).value === "Other" ? 
    document.getElementById(`${formComponentId}-self-input`).value : 
    document.getElementById(`${formComponentId}`).value

    // Add the new product/category/vending machine into the corresponding table in the database using 
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
    // submit the obj to the database
    console.log(newStock);
}


// need a fetch api to get the list of the productNameList and the Vending Machine List and the product category list
