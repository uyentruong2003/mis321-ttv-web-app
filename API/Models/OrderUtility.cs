//OrderUtility
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;
using API;

namespace API
{
    public class OrderUtility
    {
        private readonly string cs;
        public OrderUtility()
        {
            cs = new ConnectionString().cs;
        }

        public List<OrderProduct> GetAllProducts()
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var products = new List<OrderProduct>();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM product JOIN stockdetails ON product.productId = stockdetails.productId", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            products.Add(new OrderProduct
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

        public OrderProduct GetProductByID(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM product JOIN stockdetails ON product.productId = stockdetails.productId WHERE product.productId = @id", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            OrderProduct product = new OrderProduct
                            {
                                id = Convert.ToInt32(reader["productId"]),
                                name = reader["productName"].ToString(),
                                price = Convert.ToDouble(reader["productPrice"]),
                                desciption = reader["productDescription"].ToString(),
                                categoryid = Convert.ToInt32(reader["categoryId"]),
                                imgURL = reader["imgURL"].ToString(),
                                machineId = Convert.ToInt32(reader["machineId"]),
                                qtyInMachine = Convert.ToInt32(reader["stockQty"])
                            };
                            connection.Close();
                            return product;
                        }
                        else
                        {
                            connection.Close();
                            return null;
                        }
                    }
                }
            }
        }
    }
}
