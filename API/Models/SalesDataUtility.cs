using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace API
{
    public class SalesDataUtility
    {
        private readonly string cs;
        public SalesDataUtility(){
            cs = new ConnectionString().cs;
        }
        
public List<SalesDataProduct> GetAllSalesDataProducts()
{
    using (MySqlConnection connection = new MySqlConnection(cs))
    {
        connection.Open();

        var salesData = new List<SalesDataProduct>();
using (MySqlCommand command = new MySqlCommand("SELECT t.orderId AS transactionOrderId, p.productId AS productId, p.productPrice AS productPrice, p.categoryId AS productCategory, od.machineId AS machineId, m.machineRegion AS machineRegion FROM `j426z9qzg7kj50yb`.`transaction` t INNER JOIN `j426z9qzg7kj50yb`.`orderdetails` od ON t.orderId = od.orderId INNER JOIN `j426z9qzg7kj50yb`.`product` p ON od.productId = p.productId INNER JOIN `j426z9qzg7kj50yb`.`machine` m ON od.machineId = m.machineId;", connection))

        {
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    salesData.Add(new SalesDataProduct
                    {
                        transactionOrderId = Convert.ToInt32(reader["transactionOrderId"]),
                        productId = Convert.ToInt32(reader["productId"]),
                        productPrice = Convert.ToDouble(reader["productPrice"]),
                        productCategory = Convert.ToInt32(reader["productCategory"]),
                        machineId = Convert.ToInt32(reader["machineId"]),
                        machineRegion = reader["machineRegion"].ToString()
                    });
                }
            }
        }
    
    connection.Close();
    return salesData;
    }
}

    }
}