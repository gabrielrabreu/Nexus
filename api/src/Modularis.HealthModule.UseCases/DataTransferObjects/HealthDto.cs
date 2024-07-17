namespace Modularis.HealthModule.UseCases.DataTransferObjects;

public record HealthDto(HealthStatus Status, List<DependencyHealthDto> Dependencies);
