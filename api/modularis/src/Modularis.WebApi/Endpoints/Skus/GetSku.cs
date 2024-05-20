using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.SkuModule.UseCases.Get;

namespace Modularis.WebApi.Endpoints.Skus;

public class GetSku : EndpointBase
{
    public const string Route = "/Skus/{SkuId}";

    public static string BuildRoute(Guid SkuId) => Route.Replace("{SkuId}", SkuId.ToString());

    public override void Configure(WebApplication app)
    {
        app.MapGet(Route, HandleAsync)
            .WithOpenApi()
            .WithName(nameof(GetSku))
            .WithTags("Skus")
            .WithSummary("Gets Skus by its ID");
    }

    private async Task<Results<Ok<SkuBriefDto>, NotFound>> HandleAsync(
        Guid skuId,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var query = new GetSkuQuery(skuId);

        var result = await mediator.Send(query, cancellationToken);

        if (result.Status == ResultStatus.NotFound)
            return TypedResults.NotFound();

        return TypedResults.Ok(result.Value);
    }
}
