namespace Modularis.SkuModule.UseCases.Get;

public class GetSkuHandler(IReadRepository<Sku> repository) : IQueryHandler<GetSkuQuery, Result<SkuBriefDto>>
{
    public async Task<Result<SkuBriefDto>> Handle(GetSkuQuery request, CancellationToken cancellationToken)
    {
        var sku = await repository.GetByIdAsync(request.Id, cancellationToken);

        if (sku == null)
            return Result.NotFound();

        return new SkuBriefDto(sku.Id, sku.Code, sku.Name, sku.Price, sku.Stock);
    }
}
