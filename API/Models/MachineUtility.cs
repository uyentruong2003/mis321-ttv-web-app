namespace API.Models
{
    public class MachineUtility
    {

        // GET ALL REQUEST
        public List<Machine> GetAllMachines (){
            List<Machine> machineList = new List<Machine>();
            using var con = new MySqlConnection(cs); 
            con.Open(); 
            string stm = "SELECT * FROM machine"; 
            using var cmd = new MySqlCommand(stm, con); 
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()) {
                Machine machine = new Machine(){
                    machineId = rdr.GetInt32(0),
                    machineLocation = rdr.GetString(1),
                    machineRegion = rdr.GetString(2),
                    machineType = rdr.GetString(3),
                    machineQty = rdr.GetInt32(4) 
                };
                machineList.Add(machine);
            }
            con.Close();
            return machineList;
        }

        // GET BY ID REQUEST
        public Machine GetMachineById(int productId, int machineId) {
            using var con = new MySqlConnection(cs);
            con.Open();
            
            using var cmd = new MySqlCommand(con);
            cmd.CommandText = @"SELECT machineId, machineLocation, machineRegion, machineType,machineQty FROM machine
                                WHERE machineId = @machineId";
            cmd.Parameters.AddWithValue("@machineId", machineId);
            using var reader = cmd.ExecuteReader();
            // Check if there are rows in the result set
            if (reader.Read()) {
                // Create a Machine object and populate it with data from the database
                Machine machine = new Machine {
                    machineId = rdr.GetInt32(0),
                    machineLocation = rdr.GetString(1),
                    machineRegion = rdr.GetString(2),
                    machineType = rdr.GetString(3),
                    machineQty = rdr.GetInt32(4) 
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
            using var cmd = new MySqlCommand(con);
            
            // Updating the data in the table where productId and machineId = machine.productId and machine.machineId:
            cmd.CommandText = @"UPDATE machine SET machineQty = @machineQty, lastUpdate = @lastUpdate, deleted = @deleted
                                WHERE machineId = @machineId";

            cmd.Parameters.AddWithValue("@machineId", machine.machineId);
            cmd.Parameters.AddWithValue("@machineQty", machine.machineQty);
            cmd.Parameters.AddWithValue("@lastUpdate", machine.lastUpdate);
            cmd.Parameters.AddWithValue("@deleted", machine.deleted);

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