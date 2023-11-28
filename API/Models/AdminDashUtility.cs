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

                using (MySqlCommand command = new MySqlCommand("SELECT product.productId, product.productName, product.categoryId, stockdetails.machineId, stockdetails.stockQty, product.productPrice, machine.machineRegion, stockdetails.deleted FROM product JOIN stockdetails ON product.productid = stockdetails.productid JOIN machine ON stockdetails.machineid = machine.machineid;", connection))
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
                                region = reader["machineRegion"].ToString(),
                                deleted = Convert.ToByte(reader["deleted"])
                            });
                        }
                    }
                }
                connection.Close();
                return AdminDashProducts;
            }
        }

        public List<AdminDashProduct> GetAvailableStock(string filterOption)
{
    using (MySqlConnection connection = new MySqlConnection(cs))
    {
        connection.Open();

        var availableStock = new List<AdminDashProduct>();

        string query = @"SELECT 
                            product.productId,
                            product.productName,
                            product.categoryId,
                            stockdetails.machineId,
                            SUM(stockdetails.stockQty) AS TotalInventory,
                            product.productPrice,
                            machine.machineRegion
                        FROM 
                            product
                        JOIN 
                            stockdetails ON product.productid = stockdetails.productid
                        JOIN 
                            machine ON stockdetails.machineid = machine.machineid
                        WHERE 
                            (
                                (product.categoryId = (SELECT categoryId FROM category WHERE categoryName = 'Drink')) OR
                                (product.categoryId = (SELECT categoryId FROM category WHERE categoryName = 'Snack')) OR
                                (product.categoryId = (SELECT categoryId FROM category WHERE categoryName = 'Electronic'))
                            )
                            OR
                            (
                                machine.machineRegion IN ('Northwest', 'Southwest', 'Northeast', 'Southeast', 'Midwest')
                            )
                        GROUP BY
                            product.productId, product.productName, product.categoryId, stockdetails.machineId, product.productPrice, machine.machineRegion;";

        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    availableStock.Add(new AdminDashProduct
                    {
                        id = Convert.ToInt32(reader["productId"]),
                        name = reader["productName"].ToString(),
                        categoryid = Convert.ToInt32(reader["categoryId"]),
                        machineId = Convert.ToInt32(reader["machineId"]),
                        qtyInMachine = Convert.ToInt32(reader["TotalInventory"]),
                        price = Convert.ToDouble(reader["productPrice"]),
                        region = reader["machineRegion"].ToString()
                    });
                }
            }
        }

        connection.Close();
        return availableStock;
    }
}



    }
}
