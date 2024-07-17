namespace Modularis.SkuModule.UseCases.DataTransferObjects;

public record SkuBriefDto(Guid Id, string Code, string Name, decimal Price, int Stock);
