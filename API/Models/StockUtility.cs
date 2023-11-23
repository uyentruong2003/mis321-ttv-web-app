using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace API
{
    public class StockUtility
    {
        // private readonly string cs;
        // public StockUtility(){
        //     cs = new ConnectionString().cs;
        // }
        
        // // POST REQUEST:
        // public void SaveToStockTable (StockUtility newStock) {
        //     using var con = new MySqlConnection (cs);
        //     con.Open();
        //     using var cmd = new MySqlCommand(con);
        //     // Adding data to stockdetails table:
        //     cmd.CommandText = @"INSERT INTO stockdetails(productId, machineId, stockQty, lastUpdate) 
        //     VALUES(@productId, @machineId, @stockQty, @lastUpdate)";
        //     cmd.Parameters.AddWithValue("@productId",newStock.productId);
        //     cmd.Parameters.AddWithValue("@machineId",newStock.machineId);
        //     cmd.Parameters.AddWithValue("@stockQty",newStock.stockQty);
        //     cmd.Parameters.AddWithValue("@lastUpdate",newStock.lastUpdate);
        //     cmd.Prepare();
        //     cmd.ExecuteNonQuery();
        //     con.Close();
        // }

        // GET REQUEST
        public List<Stock> GetAllStocks (){
            List<Stock> stockList = new List<Stock>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
                string stm = "SELECT * FROM Stocks"; 
                using var cmd = new MySqlCommand(stm, con); 
                using MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read()) {
                    Stock stock = new Stock(){productId = rdr.GetString(0), machineId = rdr.GetString(1),stockQty = rdr.GetInt32(2), lastUpdate = rdr.GetString(3)};
                    stockList.Add(stock);
                }
            return stockList;
            con.Close();
        }
    }
        // PUT REQUEST
        public void UpdateStock (Stock stock) {
            using var con = new MySqlConnection (cs);
            con.Open();
            using var cmd = new MySqlCommand(con);
            // Updating the data in the table where id= stock.id:
            cmd.CommandText = @"UPDATE Stock SET stockQty = @stockQty, lastUpdate = @lastUpdate 
            WHERE productId = @productId AND machineId = @machineId";
            cmd.Parameters.AddWithValue("@productId",stock.productId);
            cmd.Parameters.AddWithValue("@machineId",stock.machineId);
            cmd.Parameters.AddWithValue("@stockQty",stock.stockQty);
            cmd.Parameters.AddWithValue("@lastUpdate",stock.lastUpdate);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close(); 
        }
    }
}


        