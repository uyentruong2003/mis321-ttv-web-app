using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;  
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;
using API;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminDashController : ControllerBase
    {
        private readonly string cs;
        public AdminDashController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<AdminDashController>
        [HttpGet]
        public List<AdminDashProduct> Get()
        {
            AdminDashUtility admindashtutil = new AdminDashUtility();
            List<AdminDashProduct> AdminDashProducts = new List<AdminDashProduct>();
            AdminDashProducts = admindashtutil.GetAllAdminDashProducts();
            return AdminDashProducts;
        }

        // GET api/<AdminDashController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT product.productId, product.productName, product.categoryId, stockdetails.machineId, stockdetails.stockQty, product.productPrice, machine.machineRegion FROM product JOIN stockdetails ON product.productid = stockdetails.productid JOIN machine ON stockdetails.machineid = machine.machineid;", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            AdminDashProduct AdminDashProduct = new AdminDashProduct
                            {
                                id = Convert.ToInt32(reader["productId"]),
                                name = reader["productName"].ToString(),
                                categoryid = Convert.ToInt32(reader["categoryId"]),
                                machineId = Convert.ToInt32(reader["machineId"]),
                                qtyInMachine = Convert.ToInt32(reader["stockQty"]),
                                price = Convert.ToDouble(reader["productPrice"]),
                                region = reader["machineRegion"].ToString(),
                                deleted = Convert.ToByte(reader["deleted"])
                            };
                            connection.Close();
                            return Ok(AdminDashProduct);
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

        // POST api/<AdminDashController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AdminDashController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AdminDashController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}



