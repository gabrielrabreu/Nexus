namespace Modularis.HealthModule.UseCases.Health;

public class HealthHandler(IEnumerable<IDependencyHealth> dependencyHealths) : IQueryHandler<HealthQuery, Result<HealthDto>>
{
    public async Task<Result<HealthDto>> Handle(HealthQuery request, CancellationToken cancellationToken)
    {
        var dependencyHealthTasks = dependencyHealths.Select(dependencyHealthImplementation => dependencyHealthImplementation.GetHealthAsync());
        var dependencyHealthStatusArray = await Task.WhenAll(dependencyHealthTasks);
        var dependencyHealthStatusList = dependencyHealthStatusArray.ToList();

        var overallStatus = dependencyHealthStatusList.TrueForAll(d => d.Status == HealthStatus.UP) ? HealthStatus.UP : HealthStatus.DOWN;

        return new HealthDto(overallStatus, dependencyHealthStatusList);
    }
}
