namespace Modularis.SkuModule.UseCases.Create;

public class CreateSkuHandler(IRepository<Sku> repository) : ICommandHandler<CreateSkuCommand, Result<SkuBriefDto>>
{
    public async Task<Result<SkuBriefDto>> Handle(CreateSkuCommand request, CancellationToken cancellationToken)
    {
        var sku = new Sku(request.Code, request.Name, request.Price, request.Stock);
        sku = await repository.AddAsync(sku, cancellationToken);
        return new SkuBriefDto(sku.Id, sku.Code, sku.Name, sku.Price, sku.Stock);
    }
}
