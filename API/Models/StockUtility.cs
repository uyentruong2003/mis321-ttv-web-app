using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;  
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;

namespace API
{
    public class StockUtility
    {
        private readonly string cs;
        public StockUtility(){
            cs = new ConnectionString().cs;
        }
        
    // POST REQUEST
        public void SaveToStockTable(Stock newStock) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"INSERT INTO stockdetails(productId, machineId, stockQty, lastUpdate, deleted) 
                                VALUES(@productId, @machineId, @stockQty, @lastUpdate, @deleted)";
            using var cmd = new MySqlCommand(stm, con);
        
            cmd.Parameters.AddWithValue("@productId", newStock.productId);
            cmd.Parameters.AddWithValue("@machineId", newStock.machineId);
            cmd.Parameters.AddWithValue("@stockQty", newStock.stockQty);
            cmd.Parameters.AddWithValue("@lastUpdate", newStock.lastUpdate);
            cmd.Parameters.AddWithValue("@deleted", newStock.deleted);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }


        // GET ALL REQUEST
        public List<Stock> GetAllStocks (){
            List<Stock> stockList = new List<Stock>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
            string stm = "SELECT * FROM stockdetails"; 
            using var cmd = new MySqlCommand(stm, con); 
            using var rdr = cmd.ExecuteReader();
            while (rdr.Read()) {
                Stock stock = new Stock(){
                    productId = rdr.GetInt32(0),
                    machineId = rdr.GetInt32(1),
                    stockQty = rdr.GetInt32(2),
                    lastUpdate = rdr.GetDateTime(3).ToString("yyyy-MM-dd HH:mm:ss"),
                    deleted = rdr.GetBoolean(4) 
                };
                stockList.Add(stock);
            }
            con.Close();
            return stockList;
        }

        // GET BY ID REQUEST
        public Stock GetStockById(int productId, int machineId) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT productId, machineId, stockQty, lastUpdate FROM stockdetails
                                WHERE productId = @productId AND machineId = @machineId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@productId", productId);
            cmd.Parameters.AddWithValue("@machineId", machineId);
            using var rdr = cmd.ExecuteReader();
            // Check if there are rows in the result set
            if (rdr.Read()) {
                // Create a Stock object and populate it with data from the database
                Stock stock = new Stock {
                    productId = rdr.GetInt32("productId"),
                    machineId = rdr.GetInt32("machineId"),
                    stockQty = rdr.GetInt32("stockQty"),
                    lastUpdate = rdr.GetDateTime("lastUpdate").ToString("yyyy-MM-dd HH:mm:ss"),
                    deleted = rdr.GetBoolean("deleted")
                };
                con.Close(); // Close the connection after reading the data
                return stock;
            } else {
                // No rows found, return null or throw an exception as appropriate
                con.Close(); // Close the connection
                return null;
            }
        }

        // PUT REQUEST
        public void UpdateStock(Stock stock) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"UPDATE stockdetails SET stockQty = @stockQty, lastUpdate = @lastUpdate, deleted = @deleted
                                WHERE productId = @productId AND machineId = @machineId";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@productId", stock.productId);
            cmd.Parameters.AddWithValue("@machineId", stock.machineId);
            cmd.Parameters.AddWithValue("@stockQty", stock.stockQty);
            cmd.Parameters.AddWithValue("@lastUpdate", stock.lastUpdate);
            cmd.Parameters.AddWithValue("@deleted", stock.deleted);

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


        