namespace Modularis.HealthModule.UseCases.DataTransferObjects;

public record DependencyHealthDto(string Name, HealthStatus Status, string ResponseTime);