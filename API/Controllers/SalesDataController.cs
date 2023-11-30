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
    public class SalesDataController : ControllerBase
    {
        private readonly string cs;
        public SalesDataController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<SalesDataController>
        [HttpGet]
        public List<SalesDataProduct> Get()
        {
            SalesDataUtility SalesDatatutil = new SalesDataUtility();
            List<SalesDataProduct> SalesDataProducts = new List<SalesDataProduct>();
            SalesDataProducts = SalesDatatutil.GetAllSalesDataProducts();
            return SalesDataProducts;
        }

        // GET api/<SalesDataController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand("SELECT t.orderId AS transactionOrderId, p.productId AS productId, p.productPrice AS productPrice, p.categoryId AS productCategory, od.machineId AS machineId, m.machineRegion AS machineRegion FROM `j426z9qzg7kj50yb`.`transaction` t INNER JOIN `j426z9qzg7kj50yb`.`orderdetails` od ON t.orderId = od.orderId INNER JOIN `j426z9qzg7kj50yb`.`product` p ON od.productId = p.productId INNER JOIN `j426z9qzg7kj50yb`.`machine` m ON od.machineId = m.machineId;", connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            SalesDataProduct SalesDataProduct = new SalesDataProduct
                            {
                                transactionOrderId = Convert.ToInt32(reader["transactionOrderId"]),
                                productId = Convert.ToInt32(reader["productId"]),
                                productPrice = Convert.ToDouble(reader["productPrice"]),
                                productCategory = Convert.ToInt32(reader["productCategory"]),
                                machineId = Convert.ToInt32(reader["machineId"]),
                                machineRegion = reader["machineRegion"].ToString()
                            };
                            connection.Close();
                            return Ok(SalesDataProduct);
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

        // POST api/<SalesDataController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SalesDataController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SalesDataController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}