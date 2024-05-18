using Modularis.HealthModule.UseCases.Health.Check;

namespace Modularis.WebApi.Health
{
    public class CheckHealth : EndpointBase
    {
        public const string Route = "/Health";

        public static string BuildRoute() => Route;

        public override void Configure(WebApplication app)
        {
            app.MapGet(Route, HandleAsync)
                .WithOpenApi()
                .WithName(nameof(CheckHealth))
                .WithTags("Health")
                .WithSummary("Checks the health status of the application");
        }

        private async Task<Ok<CheckHealthDto>> HandleAsync(IMediator mediator, CancellationToken cancellationToken)
        {
            var query = new CheckHealthQuery();
            var result = await mediator.Send(query, cancellationToken);
            return TypedResults.Ok(result.Value);
        }
    }
}
