using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class SalesDataProduct
    {
        public int transactionOrderId{get; set;}
        public int productId{get; set;}
        public double productPrice{get; set;}
        public int productCategory{get; set;}
        public int machineId{get; set;}
        public string machineRegion{get; set;}
        
    }
}