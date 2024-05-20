using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.SkuModule.UseCases.List;

namespace Modularis.WebApi.Endpoints.Skus;

public class ListSkus : EndpointBase
{
    public const string Route = "/Skus";

    public static string BuildRoute(int pageNumber, int pageSize)
            => $"{Route}?{nameof(ListSkusRequest.PageNumber)}={pageNumber}" +
                      $"&{nameof(ListSkusRequest.PageSize)}={pageSize}";

    public override void Configure(WebApplication app)
    {
        app.MapGet(Route, HandleAsync)
            .WithOpenApi()
            .WithName(nameof(ListSkus))
            .WithTags("Skus")
            .WithSummary("Lists Skus with pagination");
    }

    private async Task<Ok<PagedList<SkuBriefDto>>> HandleAsync(
        [AsParameters] ListSkusRequest request,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var query = new ListSkusQuery(request.PageNumber, request.PageSize);
        var result = await mediator.Send(query, cancellationToken);
        return TypedResults.Ok(result.Value);
    }
}
