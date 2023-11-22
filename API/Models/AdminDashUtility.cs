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
                return AdminDashProducts;
                connection.close();
            }
        }

        
        public void SaveToStockTable (AdminDashUtility newStock) {
            using var con = new MySqlConnection (cs);
            con.Open();
            using var cmd = new MySqlCommand(con);
            // Adding data to stockdetails table:
            cmd.CommandText = @"INSERT INTO stockdetails(productId, machineId, stockQty, lastUpdate) 
            VALUES(@productId, @machineId, @stockQty, @lastUpdate)";
            cmd.Parameters.AddWithValue("@id",exercise.id);
            cmd.Parameters.AddWithValue("@activityName",exercise.activityName);
            cmd.Parameters.AddWithValue("@activityType",exercise.activityType);
            cmd.Parameters.AddWithValue("@distance",exercise.distance);
            cmd.Parameters.AddWithValue("@dateCompleted",exercise.dateCompleted);
            cmd.Parameters.AddWithValue("@pinned",exercise.pinned);
            cmd.Parameters.AddWithValue("@deleted",exercise.deleted);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}
// let stockdetailsList = [
//     {productId: 2, machineId: 1003, stockQty: 5, lastUpdate: '2023-11-20'},
//     {productId: 2, machineId: 1003, stockQty: 10, lastUpdate: '2023-11-21'},
//     {productId: 1, machineId: 1001, stockQty: 12, lastUpdate: '2023-11-30'}
// ]