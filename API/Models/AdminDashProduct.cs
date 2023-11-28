using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class AdminDashProduct
    {
        public int id {get; set;}
        public string name {get; set;}
        public int categoryid {get; set;}
        public int machineId {get; set;}
        public int qtyInMachine {get; set;}
        public double price {get; set;}
        public string region {get; set;}
        public byte deleted {get; set;}
        
    }
}