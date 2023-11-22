using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace API
{
    public class StockUtility
    {
        private readonly string cs;
        public StockUtility(){
            cs = new ConnectionString().cs;
        }
        
        // POST REQUEST:
        public void SaveToStockTable (StockUtility newStock) {
            using var con = new MySqlConnection (cs);
            con.Open();
            using var cmd = new MySqlCommand(con);
            // Adding data to stockdetails table:
            cmd.CommandText = @"INSERT INTO stockdetails(productId, machineId, stockQty, lastUpdate) 
            VALUES(@productId, @machineId, @stockQty, @lastUpdate)";
            cmd.Parameters.AddWithValue("@productId",newStock.productId);
            cmd.Parameters.AddWithValue("@machineId",newStock.machineId);
            cmd.Parameters.AddWithValue("@stockQty",newStock.stockQty);
            cmd.Parameters.AddWithValue("@lastUpdate",newStock.lastUpdate);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }

        // GET REQUEST
        // PUT REQUEST
    }
}

        