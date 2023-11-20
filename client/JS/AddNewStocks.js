let productList = [
    {productName: 'Coca-Cola', productCategory: 'Beverages', unitPrice: 2.50},
    {productName: 'Sprite', productCategory: 'Beverages', unitPrice: 2.50},
    {productName: "Lay's Potato Chips", productCategory: 'Snacks', unitPrice: 1.75},
    {productName: 'KitKat', productCategory: 'Snacks', unitPrice: 1.75}
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

setProductList(productList,"product-name-list");

// function to set the datalist for the searchable dropdowns:
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

// function to find:
function returnProductInfo(productName, productList) {
    productList.forEach((product) => {
        if (productName){
            
        }
    })
}