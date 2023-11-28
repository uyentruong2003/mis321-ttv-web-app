using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class Stock
    {
        public int productId {get; set;}
        public int machineId {get; set;}
        public int stockQty {get; set;}
        public string lastUpdate {get; set;}
        public bool deleted {get; set;}
    }
}