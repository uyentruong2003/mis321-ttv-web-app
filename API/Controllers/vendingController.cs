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
        public List<Machines> Get()
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                var machines = new List<Machines>();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM machine", connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            machines.Add(new Machines
                            {
                                machineId = Convert.ToInt32(reader["machineId"]),
                                machineLocation = reader["machineLocation"].ToString(),
                                machineRegion = reader["machineRegion"].ToString(),
                                machineType = Convert.ToInt32(reader["categoryId"]),
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
                            Machines machine = new Machines
                            {
                                machineId = Convert.ToInt32(reader["machineId"]),
                                machineLocation = reader["machineLocation"].ToString(),
                                machineRegion = reader["machineRegion"].ToString(),
                                machineType = Convert.ToInt32(reader["categoryId"]),
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

        // POST api/<vending>
        [HttpPost]
        public IActionResult Post([FromBody] Machines machine) //we have no plans to add machines on the app
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();

                    using (MySqlCommand command = new MySqlCommand(
                        "INSERT INTO machine (machineLocation, machineRegion, machineType) " +
                        "VALUES (@location, @region, @type)", connection))
                    {
                        command.Parameters.AddWithValue("@location", machine.machineLocation);
                        command.Parameters.AddWithValue("@region", machine.machineRegion);
                        command.Parameters.AddWithValue("@type", machine.machineType);

                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
                
                return Ok("Machine added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


        // PUT api/<vending>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Machines machine) //will it be possible to edit a machine?
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();

                    using (MySqlCommand command = new MySqlCommand(
                        "UPDATE machine SET machineLocation = @location, machineRegion = @region, machineType = @type " +
                        "WHERE machineId = @id", connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@location", machine.machineLocation);
                        command.Parameters.AddWithValue("@region", machine.machineRegion);
                        command.Parameters.AddWithValue("@type", machine.machineType);

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