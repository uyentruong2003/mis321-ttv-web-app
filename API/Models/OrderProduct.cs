using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class OrderProduct
    {
        public int id {get; set;}
        public string name {get; set;}
        public double price {get; set;}
        public string desciption {get; set;}
        public int categoryid {get; set;}
        public string imgURL {get; set;}
        public int qtyInMachine {get; set;}
        public int machineId {get; set;}
        public bool deleted {get; set;}
        
    }
}