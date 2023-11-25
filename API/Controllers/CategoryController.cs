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
    public class CategoryController : ControllerBase
    {
        // GET: api/<CategoryController>
        [HttpGet]
        public List<Category> Get()
        {
            CategoryUtility utility = new CategoryUtility();
            List<Category> categorys = new List<Category>();
            categorys = utility.GetAllCategorys();
            return categorys;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int categoryId)
        {
            CategoryUtility utility = new CategoryUtility();
            Category category = new Category();
            category = utility.GetCategoryById(categoryId);
            return category;
        }

        // // POST api/<CategoryController>
        // [HttpPost]
        // public void Post([FromBody] Category newCategory)
        // {
        //     CategoryUtility utility = new CategoryUtility();
        //     utility.SaveToCategoryTable(newCategory);
        // }

        // // PUT api/<CategoryController>/5
        // [HttpPut("{id}")]
        // public void Put(int id, [FromBody] string category)
        // {
        //     CategoryUtility utility = new CategoryUtility();
        //     utility.UpdateCategory(category);
        // }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
