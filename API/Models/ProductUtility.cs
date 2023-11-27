using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace mis321_ttv_web_app.API.Models
{
    public class ProductUtility
    {
        private readonly string cs;
        public ProductUtility(){
            cs = new ConnectionString().cs;
        }
        
    // POST REQUEST
        public void SaveToProductTable(Product newProduct) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"INSERT INTO product(productName, productPrice, categoryId, productDescription, imgURL) 
                                VALUES(@productName, @productPrice, @categoryId, @productDescription, @imgURL)";
            using var cmd = new MySqlCommand(stm, con);
        
            cmd.Parameters.AddWithValue("@productName", newProduct.productName);
            cmd.Parameters.AddWithValue("@productPrice", newProduct.productPrice);
            cmd.Parameters.AddWithValue("@categoryId", newProduct.categoryId);
            cmd.Parameters.AddWithValue("@productDescription", newProduct.productDescription);
            cmd.Parameters.AddWithValue("@imgURL", newProduct.imgURL);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }


        // GET ALL REQUEST
        public List<Product> GetAllProducts (){
            List<Product> productList = new List<Product>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
            string stm = "SELECT * FROM product"; 
            using var cmd = new MySqlCommand(stm, con); 
            using var rdr = cmd.ExecuteReader();
            while (rdr.Read()) {
                Product product = new Product {
                    productId = rdr.GetInt32("productId"),
                    productName = rdr.GetString("productName"),
                    productPrice = rdr.GetDouble("productPrice"),
                    categoryId = rdr.GetInt32("categoryId"),
                    productDescription = rdr.GetString("productDescription"),
                    imgURL = rdr.GetString("imgURL")
                };
                productList.Add(product);
            }
            con.Close();
            return productList;
        }

        // GET BY ID REQUEST
        public Product GetProductById(int productId) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT productId, productName, productPrice, categoryId, productDescription, imgURL FROM product
                                WHERE productId = @productId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@productId", productId);
            using var rdr = cmd.ExecuteReader();
            // Check if there are rows in the result set
            if (rdr.Read()) {
                // Create a Product object and populate it with data from the database
                Product product = new Product {
                    productId = rdr.GetInt32("productId"),
                    productName = rdr.GetString("productName"),
                    productPrice = rdr.GetDouble("productPrice"),
                    categoryId = rdr.GetInt32("categoryId"),
                    productDescription = rdr.GetString("productDescription"),
                    imgURL = rdr.GetString("imgURL")
                };
                con.Close(); // Close the connection after reading the data
                return product;
            } else {
                // No rows found, return null or throw an exception as appropriate
                con.Close(); // Close the connection
                return null;
            }
        }

        // PUT REQUEST
        public void UpdateProduct(Product product) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"UPDATE product SET productName = @productName, productPrice = @productPrice, categoryId = @categoryId, productDescription = @productDescription, imgURL = @imgURL
                                WHERE productId = @productId";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@productId", product.productId);
            cmd.Parameters.AddWithValue("@productName", product.productName);
            cmd.Parameters.AddWithValue("@productPrice", product.productPrice);
            cmd.Parameters.AddWithValue("@categoryId", product.categoryId);
            cmd.Parameters.AddWithValue("@productDescription", product.productDescription);
            cmd.Parameters.AddWithValue("@imgURL", product.imgURL);

            // Execute the UPDATE statement and get the number of affected rows
            int rowsAffected = cmd.ExecuteNonQuery();

            if (rowsAffected > 0) {
                // The update was successful
                con.Close(); // Close the connection after the update
            } else {
                // No rows matched the update condition, handle it as appropriate
                con.Close(); // Close the connection
                Console.WriteLine("No rows matched the update condition");
            }
        }

    }
}


        