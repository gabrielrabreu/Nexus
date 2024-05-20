using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace Modularis.FunctionalTests.Support;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly string CorrelationId = Guid.NewGuid().ToString();

    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        var host = builder.Build();
        host.Start();
        return host;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder
            .ConfigureServices(services =>
            {
                services.ConfigureHttpJsonOptions(options =>
                {
                    var converterToRemove = options.SerializerOptions.Converters
                        .OfType<JsonStringEnumConverter>()
                        .FirstOrDefault();
                    if (converterToRemove != null)
                    {
                        options.SerializerOptions.Converters.Remove(converterToRemove);
                    }
                });

                services.Configure<JsonOptions>(options =>
                {
                    var converterToRemove = options.JsonSerializerOptions.Converters
                        .OfType<JsonStringEnumConverter>()
                        .FirstOrDefault();
                    if (converterToRemove != null)
                    {
                        options.JsonSerializerOptions.Converters.Remove(converterToRemove);
                    }
                });

                services
                    .RemoveAll<DbContextOptions<AppDbContext>>()
                    .AddDbContext<AppDbContext>((sp, options) =>
                    {
                        options.UseSqlite($"Data Source={CorrelationId}.sqlite");
                    });
            });
    }
}
