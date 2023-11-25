using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class Product
    {
        public int productId {get; set;}
        public string productName {get; set;}
        public double productPrice {get; set;}
        public int categoryId {get; set;}
        public string productDescription {get; set;}
        public string imgURL {get; set;}
    }
}