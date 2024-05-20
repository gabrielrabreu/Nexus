namespace Modularis.SkuModule.UseCases.Update;

public class UpdateSkuHandler(IRepository<Sku> repository) : ICommandHandler<UpdateSkuCommand, Result>
{
    public async Task<Result> Handle(UpdateSkuCommand request, CancellationToken cancellationToken)
    {
        var sku = await repository.GetByIdAsync(request.Id, cancellationToken);

        if (sku == null)
            return Result.NotFound();

        sku.Code = request.Code;
        sku.Name = request.Name;
        sku.Price = request.Price;
        sku.Stock = request.Stock;

        await repository.UpdateAsync(sku, cancellationToken);

        return Result.Success();
    }
}
