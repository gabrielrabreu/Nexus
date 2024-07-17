namespace Modularis.SkuModule.UseCases.List;

public class ListSkusHandler(IListSkusService service) : IQueryHandler<ListSkusQuery, Result<PagedList<SkuBriefDto>>>
{
    public async Task<Result<PagedList<SkuBriefDto>>> Handle(ListSkusQuery request, CancellationToken cancellationToken)
    {
        return await service.ListAsync(request.PageNumber, request.PageSize, cancellationToken);
    }
}
