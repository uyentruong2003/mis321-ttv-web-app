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
    public class ProductController : ControllerBase
    {
        private readonly string cs;
        public ProductController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public List<Product> Get()
        {
            ProductUtility productutil = new ProductUtility();
            List<Product> products = new List<Product>();
            products = productutil.GetAllProducts();
            return products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT * FROM product WHERE productId = @id", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Product product = new Product
                            {
                                id = Convert.ToInt32(reader["productId"]),
                                name = reader["productName"].ToString(),
                                price = Convert.ToDouble(reader["productPrice"]),
                                desciption = reader["productDescription"].ToString(),
                                categoryid = Convert.ToInt32(reader["categoryId"]),
                                imgURL = reader["imgURL"].ToString(),
                            };

                            return Ok(product);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
