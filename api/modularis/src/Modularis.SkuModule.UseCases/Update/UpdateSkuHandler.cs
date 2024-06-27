namespace Modularis.SkuModule.UseCases.Update;

public class UpdateSkuHandler(IRepository<Sku> repository) : ICommandHandler<UpdateSkuCommand, Result<SkuBriefDto>>
{
    public async Task<Result<SkuBriefDto>> Handle(UpdateSkuCommand request, CancellationToken cancellationToken)
    {
        var sku = await repository.GetByIdAsync(request.Id, cancellationToken);

        if (sku == null)
            return Result.NotFound();

        sku.Code = request.Code;
        sku.Name = request.Name;
        sku.Price = request.Price;
        sku.Stock = request.Stock;

        await repository.UpdateAsync(sku, cancellationToken);

        return new SkuBriefDto(sku.Id, sku.Code, sku.Name, sku.Price, sku.Stock);
    }
}
