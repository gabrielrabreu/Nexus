using Modularis.HealthModule.UseCases.Health;

namespace Modularis.Infrastructure.Data;

public class DatabaseHealthImplementation(AppDbContext db) : DependencyHealth
{
    protected override string Name => "Database";

    protected override async Task<HealthStatus> GetStatusAsync()
    {
        var canConnect = await db.Database.CanConnectAsync();
        return canConnect ? HealthStatus.UP : HealthStatus.DOWN;
    }
}
