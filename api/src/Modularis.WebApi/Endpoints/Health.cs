using Modularis.HealthModule.UseCases.DataTransferObjects;
using Modularis.HealthModule.UseCases.Health;

namespace Modularis.WebApi.Endpoints
{
    public class Health : EndpointBase
    {
        public const string Route = "/Health";

        public static string BuildRoute() => Route;

        public override void Configure(WebApplication app)
        {
            app.MapGet(Route, HandleAsync)
                .WithOpenApi()
                .WithName(nameof(Health))
                .WithTags("Health")
                .WithSummary("Checks the health status of the application");
        }

        private async Task<Ok<HealthDto>> HandleAsync(IMediator mediator, CancellationToken cancellationToken)
        {
            var query = new HealthQuery();
            var result = await mediator.Send(query, cancellationToken);
            return TypedResults.Ok(result.Value);
        }
    }
}
