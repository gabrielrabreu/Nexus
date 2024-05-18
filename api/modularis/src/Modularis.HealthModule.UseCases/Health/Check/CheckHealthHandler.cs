namespace Modularis.HealthModule.UseCases.Health.Check;

public class CheckHealthHandler : IQueryHandler<CheckHealthQuery, Result<CheckHealthDto>>
{
    public async Task<Result<CheckHealthDto>> Handle(CheckHealthQuery request, CancellationToken cancellationToken)
    {
        return new CheckHealthDto("Healthy", DateTime.UtcNow);
    }
}
