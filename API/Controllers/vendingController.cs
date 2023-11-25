using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;  
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendingController : ControllerBase
    {
         private readonly string cs;

        public VendingController()
        {
            cs = new ConnectionString().cs;
        }

        // GET: api/<vending>
        [HttpGet]
        public List<Machine> Get()
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var machines = new List<Machine>();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM machine", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            machines.Add(new Machine
                            {
                                machineId = Convert.ToInt32(reader["machineId"]),
                                machineLocation = reader["machineLocation"].ToString(),
                                machineRegion = reader["machineRegion"].ToString(),
                                categoryId = Convert.ToInt32(reader["categoryId"]),
                            });
                        }
                    }
                }
                connection.Close();
                return machines;
            }
        }

        // GET api/<vending>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM machine WHERE machineId = @id", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Machine machine = new Machine
                            {
                                machineId = Convert.ToInt32(reader["machineId"]),
                                machineLocation = reader["machineLocation"].ToString(),
                                machineRegion = reader["machineRegion"].ToString(),
                                categoryId = Convert.ToInt32(reader["categoryId"]),
                            };
                            connection.Close();
                            return Ok(machine);
                        }
                        else
                        {
                            connection.Close();
                            return NotFound();
                        }
                    }
                }
            }
        }

        // PUT api/<vending>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Machine machine) //Yes. we need to update the machineQty so we can validate the next stock input quantity
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();

                    using (MySqlCommand command = new MySqlCommand(
                        "UPDATE machine SET machineLocation = @location, machineRegion = @region, categoryId = @type " +
                        "WHERE machineId = @id", connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@location", machine.machineLocation);
                        command.Parameters.AddWithValue("@region", machine.machineRegion);
                        command.Parameters.AddWithValue("@type", machine.categoryId);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            connection.Close();
                            return Ok("Machine updated successfully");
                        }
                        else
                        {
                            connection.Close();
                            return NotFound("Machine not found");
                        }
                    }
                    
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        // DELETE api/<vending>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            
        }
    }
}