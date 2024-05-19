﻿namespace Modularis.FunctionalTests.Support;

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
                services
                    .RemoveAll<DbContextOptions<AppDbContext>>()
                    .AddDbContext<AppDbContext>((sp, options) =>
                    {
                        options.UseSqlite($"Data Source={CorrelationId}.sqlite");
                    });
            });
    }
}
