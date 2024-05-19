namespace Modularis.SkuModule.UseCases.List;

public record ListSkusQuery(int PageNumber, int PageSize) : IQuery<Result<PagedList<SkuBriefDto>>>;
