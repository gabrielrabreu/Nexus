using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.SkuModule.UseCases.List;

namespace Modularis.Infrastructure.Data.Queries;

public class ListSkusService(AppDbContext db) : IListSkusService
{
    public async Task<PagedList<SkuBriefDto>> ListAsync(int pageNumber, int pageSize, CancellationToken cancellationToken = default)
    {
        return await db.Skus
            .OrderBy(sku => sku.Code)
            .Select(sku => new SkuBriefDto(sku.Id, sku.Code, sku.Name, sku.Price, sku.Stock))
            .ToPagedListAsync(pageNumber, pageSize, cancellationToken);
    }
}
