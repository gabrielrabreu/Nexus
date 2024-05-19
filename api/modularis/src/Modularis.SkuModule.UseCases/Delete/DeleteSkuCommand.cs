namespace Modularis.SkuModule.UseCases.Delete;

public record DeleteSkuCommand(Guid SkuId) : ICommand<Result>;
