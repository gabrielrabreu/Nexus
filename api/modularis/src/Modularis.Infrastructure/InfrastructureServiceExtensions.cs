using Modularis.HealthModule.UseCases.Health;
using Modularis.SkuModule.UseCases.List;

namespace Modularis.Infrastructure;

public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, ILogger logger)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer("name=ConnectionStrings:SqlServer"));

        services.AddScoped(typeof(IReadRepository<>), typeof(EfRepository<>));
        services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

        services.AddScoped<IDependencyHealth, DatabaseHealthImplementation>();

        services.AddScoped<IListSkusService, ListSkusService>();

        logger.LogInformation("{Project} services registered", "Infrastructure");

        return services;
    }
}
