namespace mis321_ttv_web_app
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString(){
            DotNetEnv.Env.Load();
            string server = Environment.GetEnvironmentVariable("SERVER");
            string database = Environment.GetEnvironmentVariable("DATABASE");
            string username = Environment.GetEnvironmentVariable("USERNAME");
            string password = Environment.GetEnvironmentVariable("PASSWORD");
            string port = Environment.GetEnvironmentVariable("PORT");
            // string server = "wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            // string database = "j426z9qzg7kj50yb";
            // string username = "jk8kpirk17rvp0o9";
            // string password = "z473g0sd6byzo8rt";
            // string port = "3306";
            
            cs = $"server={server};user={username};database={database};port={port};password={password}";
        }
    }
}