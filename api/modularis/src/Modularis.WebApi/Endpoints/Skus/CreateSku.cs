using Modularis.SkuModule.UseCases.Create;
using Modularis.SkuModule.UseCases.DataTransferObjects;

namespace Modularis.WebApi.Endpoints.Skus;

public class CreateSku : EndpointBase
{
    public const string Route = "/Skus";

    public static string BuildRoute() => Route;

    public override void Configure(WebApplication app)
    {
        app.MapPost(Route, HandleAsync)
            .WithOpenApi()
            .WithName(nameof(CreateSku))
            .WithTags("Skus")
            .WithSummary("Creates Sku");
    }

    private async Task<Created<SkuBriefDto>> HandleAsync(
        [FromBody] CreateSkuRequest request,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new CreateSkuCommand(request.Code, request.Name, request.Price, request.Stock);
        var result = await mediator.Send(command, cancellationToken);
        return TypedResults.Created(GetSku.BuildRoute(result.Value!.Id), result.Value);
    }
}
