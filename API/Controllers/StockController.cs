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
    public class StockController : ControllerBase
    {
        private readonly string cs;
        public StockController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<StockController>
        [HttpGet]
        public List<Stock> Get()
        {
            StockUtility utility = new StockUtility();
            List<Stock> stocks = new List<Stock>();
            stocks = utility.GetAllStocks();
            return stocks;
        }

        // GET api/<StockController>/5
        [HttpGet("{productId}/{machineId}}")]
        public Stock Get(int productId, int machineId)
        {
            StockUtility utility = new StockUtility();
            Stock stock = new Stock();
            stock = utility.GetStockById(productId, machineId);
            return stock;
        }

        // POST api/<StockController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StockController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StockController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}