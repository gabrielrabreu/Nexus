using Modularis.HealthModule.UseCases.Health;
using Modularis.SkuModule.UseCases.Create;

var builder = WebApplication.CreateBuilder(args);

var logger = Log.Logger = new LoggerConfiguration()
  .Enrich.FromLogContext()
  .WriteTo.Console()
  .WriteTo.DatadogLogs(
        builder.Configuration["Datadog:ApiKey"],
        source: "csharp",
        service: builder.Configuration["Datadog:Service"],
        host: builder.Configuration["Datadog:Host"],
        configuration: new DatadogConfiguration() { Url = builder.Configuration["Datadog:Url"] }
    )
  .CreateLogger();

builder.Host.UseSerilog(logger);

var microsoftLogger = new SerilogLoggerFactory(logger).CreateLogger<Program>();

microsoftLogger.LogInformation("Starting web host");

builder.Services.AddEndpointsApiExplorer();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddSwaggerGen(options =>
{
    foreach (var file in Directory.GetFiles(AppContext.BaseDirectory, "*.xml", SearchOption.AllDirectories))
        options.IncludeXmlComments(filePath: file);

    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Modularis WebApi",
        Version = "v1"
    });
});

ConfigureMediatR(builder.Services);

builder.Services.AddInfrastructureServices(microsoftLogger);

var app = builder.Build();

ConfigureEndpoints(app);

app.UseSwagger();
app.UseSwaggerUI();

SeedDatabase(app);

app.Run();

void SeedDatabase(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

void ConfigureMediatR(IServiceCollection services)
{
    var mediatRAssemblies = new[]
    {
        Assembly.GetAssembly(typeof(HealthQuery)),
        Assembly.GetAssembly(typeof(CreateSkuCommand))
    };

    services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(mediatRAssemblies!));
    services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
}

void ConfigureEndpoints(WebApplication app)
{
    var endpointBaseType = typeof(EndpointBase);

    var assembly = Assembly.GetExecutingAssembly();

    var endpointBaseTypes = assembly.GetExportedTypes()
        .Where(p => p.IsSubclassOf(endpointBaseType));

    foreach (var type in endpointBaseTypes)
        if (Activator.CreateInstance(type) is EndpointBase instance)
            instance.Configure(app);
}

public partial class Program
{
    protected Program()
    {
    }
}