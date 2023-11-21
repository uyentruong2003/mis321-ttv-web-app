using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace API
{
    public class ProductUtility
    {
        private readonly string cs;
        public ProductUtility(){
            cs = new ConnectionString().cs;
        }
        public List<Product> GetAllProducts(){
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var products = new List<Product>();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM product JOIN stockdetails", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            products.Add(new Product
                            {
                                id = Convert.ToInt32(reader["productId"]),
                                name = reader["productName"].ToString(),
                                price = Convert.ToDouble(reader["productPrice"]),
                                desciption = reader["productDescription"].ToString(),
                                categoryid = Convert.ToInt32(reader["categoryId"]),
                                imgURL = reader["imgURL"].ToString(),
                                machineId = Convert.ToInt32(reader["machineId"]),
                                qtyInMachine = Convert.ToInt32(reader["stockQty"])
                            });
                        }
                    }
                }
                return products;
            }
        }
    }
}