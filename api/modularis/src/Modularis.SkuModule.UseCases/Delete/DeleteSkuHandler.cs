namespace Modularis.SkuModule.UseCases.Delete;

public class DeleteSkuHandler(IRepository<Sku> repository) : ICommandHandler<DeleteSkuCommand, Result>
{
    public async Task<Result> Handle(DeleteSkuCommand request, CancellationToken cancellationToken)
    {
        var sku = await repository.GetByIdAsync(request.SkuId, cancellationToken);

        if (sku == null)
            return Result.NotFound();

        await repository.DeleteAsync(sku, cancellationToken);

        return Result.Success();
    }
}
