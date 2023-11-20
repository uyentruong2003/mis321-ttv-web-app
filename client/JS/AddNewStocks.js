let productList = [
    {productName: 'Coca-Cola', productCategory: 'Beverages', unitPrice: 2.50, description:'Calories 100 kcal'},
    {productName: 'Sprite', productCategory: 'Beverages', unitPrice: 2.50, description:'Calories 102 kcal'},
    {productName: "Lay's Potato Chips", productCategory: 'Snacks', unitPrice: 1.75, description:'Calories 75 kcal'},
    {productName: 'KitKat', productCategory: 'Snacks', unitPrice: 1.75, description:'Calories 80 kcal'}
]

let categoryList = [
    {categoryName: 'Beverages'},
    {categoryName: 'Snacks'},
    {categoryName: 'Electronics'},
    {categoryName: 'Movies'},
    {categoryName: 'Video Games'}
]

let vendingMachineList = [
    {vmName: 'Vending Machine #1', vmLoc: '123 Dirt Rd, Tuscaloosa, AL 35487', vmRegion: 'Southeast'},
    {vmName: 'Vending Machine #2', vmLoc: '456 Smith Ave, Milpitas, CA 95035', vmRegion: 'West'},
    {vmName: 'Vending Machine #3', vmLoc: '78 John St, Chicago, CA 60007', vmRegion: 'Midwest'}
]

// Set Product List
setProductList(productList,"product-name-list");
// Return the product info based on the product name
document.getElementById("product-name").addEventListener("change",() => {
    let productName = document.getElementById("product-name").value;
    returnProductInfo(productName, productList);
})

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