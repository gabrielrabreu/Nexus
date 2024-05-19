namespace Modularis.SkuModule.UseCases.Get;

public record GetSkuQuery(Guid SkuId) : IQuery<Result<SkuBriefDto>>;
