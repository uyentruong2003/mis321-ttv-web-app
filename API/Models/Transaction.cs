using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_ttv_web_app.API.Models
{
    public class Transaction
    {
        public DateTime date {get; set;}
        public int orderID {get; set;}
        public Transaction(int id){
            date = DateTime.Today;
            orderID = id;
        }

    }
}