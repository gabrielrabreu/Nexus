namespace Modularis.SkuModule.UseCases.Delete;

public record DeleteSkuCommand(Guid Id) : ICommand<Result>;
