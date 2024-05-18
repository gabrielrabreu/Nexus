namespace Modularis.HealthModule.UseCases.Health;

public abstract class DependencyHealth : IDependencyHealth
{
    protected abstract string Name { get; }

    public async Task<DependencyHealthDto> GetHealthAsync()
    {
        var stopwatch = Stopwatch.StartNew();
        var status = await GetStatusAsync();
        stopwatch.Stop();
        var responseTime = stopwatch.Elapsed.ToString("c");
        return new DependencyHealthDto(Name, status, responseTime);
    }

    protected abstract Task<HealthStatus> GetStatusAsync();
}
