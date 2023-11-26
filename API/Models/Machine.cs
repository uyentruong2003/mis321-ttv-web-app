using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class Machine
    {
        public int machineId{get; set;}
        public string machineLocation{get; set;}
        public string machineRegion{get; set;}
        public int categoryId{get; set;}
        public int machineQty{get; set;}
        
    }
}