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
            
            cs = $"server={server};user={username};database={database};port={port};password={password}";
        }
    }
}