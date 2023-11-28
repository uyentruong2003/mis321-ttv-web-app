using mis321_ttv_web_app.API.Models;
using MySql.Data.MySqlClient; 
using mis321_ttv_web_app;

namespace mis321_ttv_web_app.API.Models
{
    public class MachineUtility
    {
        private readonly string cs;
        public MachineUtility() {
            cs = new ConnectionString().cs;
        }
        
        // GET ALL REQUEST
        public List<Machine> GetAllMachines (){
            List<Machine> machineList = new List<Machine>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
            string stm = "SELECT * FROM machine"; 
            using var cmd = new MySqlCommand(stm, con); 
            using var rdr = cmd.ExecuteReader();
            while (rdr.Read()) {
                Machine machine = new Machine(){
                    machineId = rdr.GetInt32(0),
                    machineLocation = rdr.GetString(1),
                    machineRegion = rdr.GetString(2),
                    machineQty = rdr.GetInt32(3),
                    categoryId = rdr.GetInt32(4) 
                };
                machineList.Add(machine);
            }
            con.Close();
            return machineList;
        }

        // GET BY ID REQUEST
        public Machine GetMachineById(int machineId) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT machineId, machineLocation, machineRegion, machineQty, categoryId FROM machine
                                WHERE machineId = @machineId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@machineId", machineId);
            using var rdr = cmd.ExecuteReader();
            // Check if there are rows in the result set
            if (rdr.Read()) {
                // Create a Machine object and populate it with data from the database
                Machine machine = new Machine {
                    machineId = rdr.GetInt32(0),
                    machineLocation = rdr.GetString(1),
                    machineRegion = rdr.GetString(2),
                    machineQty = rdr.GetInt32(3),
                    categoryId = rdr.GetInt32(4) 
                };
                con.Close(); // Close the connection after reading the data
                return machine;
            } else {
                // No rows found, return null or throw an exception as appropriate
                con.Close(); // Close the connection
                return null;
            }
        }

        // PUT REQUEST
        public void UpdateMachine(Machine machine) {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"UPDATE machine SET machineLocation = @machineLocation, machineRegion = @machineRegion, categoryId = @categoryId,machineQty = @machineQty
                                WHERE machineId = @machineId";
            using var cmd = new MySqlCommand(stm,con);
            cmd.Parameters.AddWithValue("@machineId", machine.machineId);
            cmd.Parameters.AddWithValue("@machineLocation", machine.machineLocation);
            cmd.Parameters.AddWithValue("@machineRegion", machine.machineRegion);
            cmd.Parameters.AddWithValue("@categoryId", machine.categoryId);
            cmd.Parameters.AddWithValue("@machineQty", machine.machineQty);

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