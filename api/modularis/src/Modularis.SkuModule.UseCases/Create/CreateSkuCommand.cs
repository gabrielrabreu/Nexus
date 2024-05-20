namespace Modularis.SkuModule.UseCases.Create;

public record CreateSkuCommand(string Code, string Name, decimal Price, int Stock) : ICommand<Result<SkuBriefDto>>;
