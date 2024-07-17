namespace Modularis.SkuModule.UseCases.Update;

public record UpdateSkuCommand(Guid Id, string Code, string Name, decimal Price, int Stock) : ICommand<Result<SkuBriefDto>>;

