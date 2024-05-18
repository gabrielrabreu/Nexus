namespace Modularis.HealthModule.UseCases.Health;

public record DependencyHealthDto(string Name, HealthStatus Status, string ResponseTime);