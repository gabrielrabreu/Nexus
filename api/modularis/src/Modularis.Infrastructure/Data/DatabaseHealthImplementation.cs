namespace Modularis.Infrastructure.Data;

public class DatabaseHealthImplementation(AppDbContext db) : IDependencyHealth
{
    public async Task<DependencyHealthDto> GetHealthAsync()
    {
        var stopwatch = Stopwatch.StartNew();
        var canConnect = await db.Database.CanConnectAsync();
        stopwatch.Stop();

        var status = canConnect ? HealthStatus.UP : HealthStatus.DOWN;
        var responseTime = stopwatch.Elapsed.ToString("c");
        
        return new DependencyHealthDto("Database", status, responseTime);
    }
}
