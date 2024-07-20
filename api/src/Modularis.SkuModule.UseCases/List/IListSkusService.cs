namespace Modularis.SkuModule.UseCases.List;

public interface IListSkusService
{
    Task<PagedList<SkuBriefDto>> ListAsync(int pageNumber, int pageSize, CancellationToken cancellationToken = default);
}
