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
            ProductUtility utility = new ProductUtility();
            List<Product> products = new List<Product>();
            products = utility.GetAllProducts();
            return products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{productId}")]
        public Product Get(int productId)
        {
            ProductUtility utility = new ProductUtility();
            Product product = new Product();
            product = utility.GetProductById(productId);
            return product;
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody] Product newProduct)
        {
            ProductUtility utility = new ProductUtility();
            utility.SaveToProductTable(newProduct);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{productId}")]
        public void Put(int productId,[FromBody] Product product)
        {
            ProductUtility utility = new ProductUtility();
            utility.UpdateProduct(product);
        }

    //     // DELETE api/<ProductController>/5
    //     [HttpDelete("{productId}/{machineId}")]
    }
}