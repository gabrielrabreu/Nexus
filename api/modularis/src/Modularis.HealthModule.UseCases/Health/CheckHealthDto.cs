namespace Modularis.HealthModule.UseCases.Health.Check;

public record CheckHealthDto(HealthStatus Status, List<DependencyHealthDto> Dependencies);
