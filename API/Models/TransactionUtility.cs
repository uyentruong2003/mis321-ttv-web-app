using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;  
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;
namespace API.Models
{
    public class TransactionUtility
    {
        private readonly string cs;
        public TransactionUtility(){
            cs = new ConnectionString().cs;
        }

        public string PostTransaction(Transaction transaction)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand(
                        "INSERT INTO transaction (orderDate, orderID) " +
                        "VALUES (@orderDate, @orderID)", connection))
                    {
                        command.Parameters.AddWithValue("@orderDate", DateTime.Now);
                        command.Parameters.AddWithValue("@orderID", transaction.orderID);

                        command.Prepare();
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }

                return "Transaction added successfully";
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in PostTransaction: {ex.Message}");

                // Return a more informative error message
                return $"Error adding transaction: {ex.Message}";
            }
        }
    
        public List<Transaction> GetAllTransactions()
        {
            List<Transaction> transactions = new List<Transaction>();

            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("SELECT * FROM transaction", connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                transactions.Add(new Transaction
                                {
                                    date = Convert.ToDateTime(reader["orderDate"]),
                                    orderID = Convert.ToInt32(reader["orderID"])
                                    // Add other properties as needed
                                });
                            }
                        }
                    }
                    connection.Close();
                }

                return transactions;
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in GetAllTransactions: {ex.Message}");

                // Return an empty list or handle the error appropriately
                return new List<Transaction>();
            }
        }


    }
}