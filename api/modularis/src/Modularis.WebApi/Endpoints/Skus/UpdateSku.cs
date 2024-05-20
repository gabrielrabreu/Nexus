using Modularis.SkuModule.UseCases.Update;

namespace Modularis.WebApi.Endpoints.Skus;

public class UpdateSku : EndpointBase
{
    public const string Route = "/Skus/{SkuId}";

    public static string BuildRoute(Guid SkuId) => Route.Replace("{SkuId}", SkuId.ToString());

    public override void Configure(WebApplication app)
    {
        app.MapPut(Route, HandleAsync)
            .WithOpenApi()
            .WithName(nameof(UpdateSku))
            .WithTags("Skus")
            .WithSummary("Updates Skus by its ID");
    }

    private async Task<Results<NoContent, NotFound>> HandleAsync(
        [FromBody] UpdateSkuRequest request,
        Guid skuId,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new UpdateSkuCommand(skuId, request.Code, request.Name, request.Price, request.Stock);

        var result = await mediator.Send(command, cancellationToken);

        if (result.Status == ResultStatus.NotFound)
            return TypedResults.NotFound();

        return TypedResults.NoContent();
    }
}
