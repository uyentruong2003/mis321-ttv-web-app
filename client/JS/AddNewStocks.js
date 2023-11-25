let productList = [];
let stockdetailsList = [];
let categoryList = [];
let machineList = [];

async function SetUpForm() {
    productList = fetchProducts();
    stockdetailsList = await fetchStocks();
    categoryList = await fetchCategories();
    machineList = await fetchMachines();
    console.log(productList);
    console.log(stockdetailsList);
    console.log(categoryList);
    console.log(machineList);
    setProductList();
    setCategoryList();
    setMachineList();
}

SetUpForm();

productName.addEventListener('change', () => {
    checkInputInDataList('product-name')
    displaySelectedProductInfo();
    checkMatchingCategory();
    takeSelfInput(); 
    manipulateSubmitButton();
})

selfInputProduct.addEventListener('change', () => {
    checkProductDup();
    manipulateSubmitButton();
})

productCategory.addEventListener('change', () => {
    checkInputInDataList('product-category')
    checkMatchingCategory();
    manipulateSubmitButton();
})

vendingMachine.addEventListener('change', () => {
    if(checkInputInDataList('vending-machine')){
        checkMatchingCategory();
        checkQtyLimit();
    }
    manipulateSubmitButton();    
})

quantity.addEventListener('change',() => {
    checkQtyLimit();
    manipulateSubmitButton();
})

handleSubmission();

//-=================================================================================================
// let productList = [
//     {productId: 1, productName: 'Coca-Cola', categoryId: 1, productPrice: 2.50, productDescription:'Calories 100 kcal'},
//     {productId: 2, productName: 'Sprite', categoryId: 1, productPrice: 2.50, productDescription:'Calories 102 kcal'},
//     {productId: 3, productName: "Lay's Potato Chips", categoryId: 2, productPrice: 1.75, productDescription:'Calories 75 kcal'},
//     {productId: 4, productName: 'KitKat', categoryId: 2, productPrice: 1.75, productDescription:'Calories 80 kcal'}
// ]

// let stockdetailsList = [
//     {productId: 2, machineId: 1003, stockQty: 5, lastUpdate: '2023-11-20'},
//     {productId: 2, machineId: 1003, stockQty: 10, lastUpdate: '2023-11-21'},
//     {productId: 1, machineId: 1001, stockQty: 12, lastUpdate: '2023-11-30'}
// ]

// let categoryList = [
//     {categoryId: 1, categoryName: 'Beverage'},
//     {categoryId: 2, categoryName: 'Snack'},
//     {categoryId: 3, categoryName: 'Electronics'},
//     {categoryId: 4, categoryName: 'Movie'},
//     {categoryId: 5, categoryName: 'Video Game'}
// ]

// let machineList = [
//     {machineId: 1001, machineLocation: '123 Dirt Rd, Tuscaloosa, AL 35487', machineRegion: 'Southeast', categoryId: 1, machineQty: 12},
//     {machineId: 1002, machineLocation: '456 Smith Ave, Milpitas, CA 95035', machineRegion: 'West', categoryId: 2, machineQty: 10},
//     {machineId: 1003, machineLocation: '78 John St, Chicago, CA 60007', machineRegion: 'Midwest', categoryId: 2, machineQty: 15}
// ]

// DASHBOARD: stockId, productName, productPrice, categoryName, machineId, machineLocation, machineRegion, stockQty
// stockdetails table: stockId, productId, machineId, stockQty, addDate
// product table: productId, productName, productPrice, categoryId, productDescription
// category table: categoryId, categoryName
// machine table: machineId, machineLocation, machineRegion, machineQty, categoryId



