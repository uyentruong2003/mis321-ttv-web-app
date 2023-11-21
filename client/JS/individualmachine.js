let products = []

// let product1 = {ID: 1, Name: "Diet Coke", Price: 2, Quantity: 18, IMGURL: "./images/Diet Coke.png"}
// let product2 = {ID: 2, Name: "Cherry Coke", Price: 2.5, Quantity: 22, IMGURL: "./images/Cherry Coke.png"}
// let product3 = {ID: 3, Name: "Fanta", Price: 1.95, Quantity: 19, IMGURL: "./images/Fanta.png"}
// let product4 = {ID: 4, Name: "Sprite", Price: 2.75, Quantity: 15, IMGURL: "./images/Sprite.png"}
// let product5 = {ID: 5, Name: "Pepsi", Price: 1.75, Quantity: 25, IMGURL: "./images/Pepsi.png"}
// let product6 = {ID: 6, Name: "Diet Vanilla Coke", Price: 2.25, Quantity: 12, IMGURL: "./images/Diet Vanilla Coke.png"}

// products.push(product1)
// products.push(product2)
// products.push(product3)
// products.push(product4)
// products.push(product5)
// products.push(product6)

//Onload
async function handleOnLoad(){
    populateProductTable()
    populateArray().then(console.log(products))
}

//DOM Manipulation
function populateProductTable(){
    let html=`
    <table class="product-table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            `
    for (let i = 0; i < products.length; i += 3) {
        html += '<tr>';
        for (let j = i; j < i + 3 && j < products.length; j++) {
            const item = products[j];
            html += `
                <td>
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${item.Name}</h5>
                            <img src="${item.IMGURL}">
                            <p class="card-text">${item.Price}</p>
                            <p class="card-text">${item.Quantity}</p>
                            <button class="add-to-cart" onclick="handleAddItem(${item.ID})">Add to Cart</button>
                        </div>
                    </div>
                </td>
            `;
        }
        html += '</tr>';
    }
                
    html+=`
            </tbody>
        </table>
    `
    document.getElementById('app').innerHTML+=html
}

//Handling
function handleAddItem(id){
    //add item code
    products.forEach(function(item){
        if(item.ID == id)
            console.log(item.Name)
    })
}

//Data Manipulation
async function populateArray(){
    let response = await fetch('http://localhost:5141/api/product')
    returnArray = await response.json()
}