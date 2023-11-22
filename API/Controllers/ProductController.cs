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
        public Product Get(int id)
        {
            ProductUtility produtil = new ProductUtility();
            Product myProduct = produtil.GetProductByID(id);
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
