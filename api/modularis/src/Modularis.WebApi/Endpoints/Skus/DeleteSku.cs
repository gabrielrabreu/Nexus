using Modularis.SkuModule.UseCases.Delete;

namespace Modularis.WebApi.Endpoints.Skus;

public class DeleteSku : EndpointBase
{
    public const string Route = "/Skus/{SkuId}";

    public static string BuildRoute(Guid SkuId) => Route.Replace("{SkuId}", SkuId.ToString());

    public override void Configure(WebApplication app)
    {
        app.MapDelete(Route, HandleAsync)
            .WithOpenApi()
            .WithName(nameof(DeleteSku))
            .WithTags("Skus")
            .WithSummary("Deletes Skus by its ID");
    }

    private async Task<Results<NoContent, NotFound>> HandleAsync(
        Guid skuId,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new DeleteSkuCommand(skuId);

        var result = await mediator.Send(command, cancellationToken);

        if (result.Status == ResultStatus.NotFound)
            return TypedResults.NotFound();

        return TypedResults.NoContent();
    }
}
