// API CALLS ======================================================================================================

// For Stocks:-----------------------------------------------------------------------------------------------------
// POST NEW STOCK:
async function saveStock(newStock) {
    try {
        const response = await fetch("http://localhost:5141/api/Stock", {
            method: "POST",
            body: JSON.stringify(newStock),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to save stock. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., show an error message to the user)
    }
}

//GET ALL STOCKS:
async function fetchStocks() {
    try{
        const response = await fetch('http://localhost:5141/api/Stock');
        if (!response.ok) {
            throw new error("Network response is not ok");
        }else {
            const data = await response.json();
            return data;
        }
    } catch (error){
        console.log(error);
    }
}

// GET STOCK BY ID:
async function fetchStockById(productId, machineId) {
    try{
        const response = await fetch(`http://localhost:5141/api/Stock/${productId}/${machineId}`);
        if (!response.ok) {
            throw new error("Network response is not ok")
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}
// PUT STOCK UPDATE:
async function updateStock(stock, productId, machineId) {
    try {
        const response = await fetch(`http://localhost:5141/api/Stock/${productId}/${machineId}`, {
            method: "PUT",
            body: JSON.stringify(stock),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to update stock. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., show an error message to the user)
    }
}


// For Machines:----------------------------------------------------------------------------------------------------
// GET ALL MACHINES:
async function fetchMachines() {
    try{
        const response = await fetch('http://localhost:5141/api/Vending');
        if (!response.ok) {
            throw new error("Network response is not ok");
        }else {
            const data = await response.json();
            return data;
        }
    } catch (error){
        console.log(error);
    }
}

// GET MACHINE BY ID:
async function fetchMachineById(machineId) {
    try{
        const response = await fetch(`http://localhost:5141/api/Vending/${machineId}`);
        if (!response.ok) {
            throw new error("Network response is not ok")
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

// PUT MACHINE UPDATE:
async function updateMachine(machine, id) {
    try {
        const response = await fetch(`http://localhost:5141/api/Vending/${id}`, {
            method: "PUT",
            body: JSON.stringify(machine),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to update machine. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., show an error message to the user)
    }
}


// For Product:------------------------------------------------------------------------------------------------
// POST NEW PRODUCT:
async function saveProduct(newProduct) {
    try {
        const response = await fetch("http://localhost:5141/api/Product", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to save product. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., show an error message to the user)
    }
}
// GET ALL PRODUCTS:
async function fetchProducts() {
    try{
        const response = await fetch('http://localhost:5141/api/Product');
        if (!response.ok) {
            throw new error("Network response is not ok");
        }else {
            const data = await response.json();
            return data;
        }
    } catch (error){
        console.log(error);
    }
}

// GET PRODUCT BY ID:
async function fetchProductById(productId) {
    try{
        const response = await fetch(`http://localhost:5141/api/Product/${productId}`);
        if (!response.ok) {
            throw new error("Network response is not ok")
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

// For Category:-------------------------------------------------------------------------------------------------
// GET ALL CATEGORIES:
async function fetchCategories() {
    try{
        const response = await fetch('http://localhost:5141/api/Category');
        if (!response.ok) {
            throw new error("Network response is not ok");
        }else {
            const data = await response.json();
            return data;
        }
    } catch (error){
        console.log(error);
    }
}

// GET CATEGORY BY ID:
async function fetchCategoryById(categoryId) {
    try{
        const response = await fetch(`http://localhost:5141/api/Category/${categoryId}`);
        if (!response.ok) {
            throw new error("Network response is not ok")
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}