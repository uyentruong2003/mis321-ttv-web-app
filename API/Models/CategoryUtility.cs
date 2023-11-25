using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace mis321_ttv_web_app.API.Models
{
    public class CategoryUtility
    {
        private readonly string cs;
        public CategoryUtility() {
            cs = new ConnectionString().cs;
        }
        
        // GET ALL REQUEST
        public List<Category> GetAllCategorys (){
            List<Category> categoryList = new List<Category>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
            string stm = "SELECT * FROM category"; 
            using var cmd = new MySqlCommand(stm, con); 
            using var rdr = cmd.ExecuteReader();
            while (rdr.Read()) {
                Category category = new Category(){
                    categoryId = rdr.GetInt32(0),
                    categoryName = rdr.GetString(1)
                };
                categoryList.Add(category);
            }
            con.Close();
            return categoryList;
        }

        // GET BY ID REQUEST
        public Category GetCategoryById(int categoryId) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT categoryId, categoryName FROM category
                                WHERE categoryId = @categoryId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@categoryId", categoryId);
            using var rdr = cmd.ExecuteReader();
            // Check if there are rows in the result set
            if (rdr.Read()) {
                // Create a Category object and populate it with data from the database
                Category category = new Category {
                    categoryId = rdr.GetInt32(0),
                    categoryName = rdr.GetName(1)
                };
                con.Close(); // Close the connection after reading the data
                return category;
            } else {
                // No rows found, return null or throw an exception as appropriate
                con.Close(); // Close the connection
                return null;
            }
        }

        // PUT REQUEST
        public void UpdateCategory(Category category) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"UPDATE category SET categoryId = @categoryId, categoryName = @categoryName
                            WHERE categoryId = @categoryId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@categoryId", category.categoryId);
            cmd.Parameters.AddWithValue("@categoryName", category.categoryName);
            // Execute the UPDATE statement and get the number of affected rows
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0) {
                // The update was successful
                con.Close(); // Close the connection after the update
            } else {
                // No rows matched the update condition, handle it as appropriate
                con.Close(); // Close the connection
                Console.WriteLine("No rows matched the update condition");
            }
        }
    }
}