using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly string cs;

        public OrderDetailsController()
        {
            cs = new ConnectionString().cs;
        }

        // GET: api/<OrderDetails>
        [HttpGet]
        public List<OrderDetails> Get()
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var orderDetailsList = new List<OrderDetails>();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM orderdetails", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            orderDetailsList.Add(new OrderDetails
                            {
                                ProductId = Convert.ToInt32(reader["productId"]),
                                MachineId = Convert.ToInt32(reader["machineId"]),
                                // Add other properties as needed
                            });
                        }
                    }
                }
                return orderDetailsList;
            }
        }

        // GET api/<OrderDetails>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM orderdetails WHERE orderId = @id", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            OrderDetails orderDetails = new OrderDetails
                            {
                                ProductId = Convert.ToInt32(reader["productId"]),
                                MachineId = Convert.ToInt32(reader["machineId"]),
                                // Add other properties as needed
                            };

                            return Ok(orderDetails);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }

        // POST api/<OrderDetails>
        [HttpPost]
        public IActionResult Post([FromBody] OrderDetails orderDetails)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();

                    using (MySqlCommand command = new MySqlCommand(
                        "INSERT INTO orderdetails (productId, machineId) " +
                        "VALUES (@productId, @machineId)", connection))
                    {
                        command.Parameters.AddWithValue("@productId", orderDetails.ProductId);
                        command.Parameters.AddWithValue("@machineId", orderDetails.MachineId);
                        // Add other parameters as needed

                        command.ExecuteNonQuery();
                    }
                }

                return Ok("Order details added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        // PUT api/<OrderDetails>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] OrderDetails orderDetails)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();

                    using (MySqlCommand command = new MySqlCommand(
                        "UPDATE orderdetails SET productId = @productId, machineId = @machineId " +
                        "WHERE orderId = @id", connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@productId", orderDetails.ProductId);
                        command.Parameters.AddWithValue("@machineId", orderDetails.MachineId);
                        // Add other parameters as needed

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Order details updated successfully");
                        }
                        else
                        {
                            return NotFound("Order details not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        // DELETE api/<OrderDetails>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // No changes to the Delete method
        }
    }
}
