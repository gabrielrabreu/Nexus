namespace Modularis.HealthModule.UseCases.Health.Check;

public class CheckHealthHandler(IEnumerable<IDependencyHealth> dependencyHealths) : IQueryHandler<CheckHealthQuery, Result<CheckHealthDto>>
{
    public async Task<Result<CheckHealthDto>> Handle(CheckHealthQuery request, CancellationToken cancellationToken)
    {
        var dependencyHealthTasks = dependencyHealths.Select(dependencyHealthImplementation => dependencyHealthImplementation.GetHealthAsync());
        var dependencyHealthStatusArray = await Task.WhenAll(dependencyHealthTasks);
        var dependencyHealthStatusList = dependencyHealthStatusArray.ToList();

        var overallStatus = dependencyHealthStatusList.TrueForAll(d => d.Status == HealthStatus.UP) ? HealthStatus.UP : HealthStatus.DOWN;

        return new CheckHealthDto(overallStatus, dependencyHealthStatusList);
    }
}
