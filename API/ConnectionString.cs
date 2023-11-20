namespace mis321_ttv_web_app
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString(){
            string server = "wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "j426z9qzg7kj50yb";
            string username = "jk8kpirk17rvp0o9";
            string password = "z473g0sd6byzo8rt";
            string port = "3306";
            
            cs = $"server={server};user={username};database={database};port={port};password={password}";
        }
    }
}