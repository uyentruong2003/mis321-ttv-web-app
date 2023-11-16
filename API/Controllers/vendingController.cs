using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class vendingController : ControllerBase
    {
        // GET: api/<vending>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            string[] myArray = {"machine 1", "machine2", "machine3"};
            return new string[] { "value1", "value2" };
        }

        // GET api/<vending>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<vending>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<vending>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<vending>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
