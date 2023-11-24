using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace API
{
    public class AdminDashUtility
    {
        private readonly string cs;
        public AdminDashUtility(){
            cs = new ConnectionString().cs;
        }
        public List<AdminDashProduct> GetAllAdminDashProducts(){
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var AdminDashProducts = new List<AdminDashProduct>();

                using (MySqlCommand command = new MySqlCommand("SELECT product.productId, product.productName, product.categoryId, stockdetails.machineId, stockdetails.stockQty, product.productPrice, machine.machineRegion FROM product JOIN stockdetails ON product.productid = stockdetails.productid JOIN machine ON stockdetails.machineid = machine.machineid;", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            AdminDashProducts.Add(new AdminDashProduct
                            {
                                id = Convert.ToInt32(reader["productId"]),
                                name = reader["productName"].ToString(),
                                categoryid = Convert.ToInt32(reader["categoryId"]),
                                machineId = Convert.ToInt32(reader["machineId"]),
                                qtyInMachine = Convert.ToInt32(reader["stockQty"]),
                                price = Convert.ToDouble(reader["productPrice"]),
                                region = reader["machineRegion"].ToString()
                            });
                        }
                    }
                }
                connection.Close();
                return AdminDashProducts;
            }
        }
    }
}
