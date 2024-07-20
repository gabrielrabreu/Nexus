namespace Modularis.HealthModule.UseCases.Health;

public interface IDependencyHealth
{
    Task<DependencyHealthDto> GetHealthAsync();
}
