using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;  
using System.Collections.Generic;  
using System;  
using Microsoft.AspNetCore.Http;
using mis321_ttv_web_app;
using mis321_ttv_web_app.API.Models;
using API.Models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly string cs;
        public OrderDetailsController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<OrderDetailsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OrderDetailsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderDetailsController>
        [HttpPost]
        public void Post([FromBody] OrderDetailsRequest product)
        {
            if(product != null){
                using var con = new MySqlConnection(cs);
                con.Open();
                string stm = @"INSERT INTO orderdetails(productId, machineId, order_id) 
                                    VALUES(@productId, @machineId, @orderId)";
                using var cmd = new MySqlCommand(stm, con);
            
                cmd.Parameters.AddWithValue("@productId", product.productId);
                cmd.Parameters.AddWithValue("@machineId", product.machineId);
                cmd.Parameters.AddWithValue("@orderId", product.order_id);
                

                cmd.Prepare();
                cmd.ExecuteNonQuery();
                con.Close();
            }

        }

        // PUT api/<OrderDetailsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderDetailsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}