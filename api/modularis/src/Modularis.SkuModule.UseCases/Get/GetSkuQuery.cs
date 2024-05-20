namespace Modularis.SkuModule.UseCases.Get;

public record GetSkuQuery(Guid Id) : IQuery<Result<SkuBriefDto>>;
