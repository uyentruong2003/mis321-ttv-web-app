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
    public class TransactionController : ControllerBase
    {
        // GET: api/<TransactionController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<TransactionController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TransactionController>
        [HttpPost]
        public IActionResult Post([FromBody] Transaction transaction) 
        {
        TransactionUtility transutil = new TransactionUtility();
        string result = transutil.PostTransaction(transaction);

        // You can return an appropriate status code and result message
         return Ok(result);
        }


        // PUT api/<TransactionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TransactionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
