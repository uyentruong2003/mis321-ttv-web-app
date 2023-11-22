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
                    "INSERT INTO transaction (orderId, orderDate) " +
                    "VALUES (@id, @date)", connection))
                {
                    command.Parameters.AddWithValue("@id", transaction.orderID);
                    command.Parameters.AddWithValue("@date", transaction.date);

                    command.ExecuteNonQuery();
                }
                connection.Close();
            }

            return "Transaction added successfully";
        }
        catch (Exception ex)
        {
            // Log the exception or handle it as needed
            return $"Error: {ex.Message}";
        }
    }

    }
}