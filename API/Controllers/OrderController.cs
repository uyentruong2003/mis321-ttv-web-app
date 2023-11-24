using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
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
    public class OrderController : ControllerBase
    {
        private readonly string cs;
        public OrderController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public List<OrderProduct> Get()
        {
            OrderUtility productutil = new OrderUtility();
            List<OrderProduct> products = new List<OrderProduct>();
            products = productutil.GetAllProducts();
            return products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public OrderProduct Get(int id)
        {
            OrderUtility produtil = new OrderUtility();
            OrderProduct myProduct = produtil.GetProductByID(id);
            return myProduct;
            
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