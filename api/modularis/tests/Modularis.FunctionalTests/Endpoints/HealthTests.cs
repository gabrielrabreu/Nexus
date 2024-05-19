using Modularis.FunctionalTests.Support;
using Modularis.HealthModule.UseCases.DataTransferObjects;
using Modularis.WebApi.Endpoints;

namespace Modularis.FunctionalTests.Endpoints;

public class HealthTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsOk()
    {
        var route = Health.BuildRoute();
        var response = await _client.ExecuteGetAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureOK();

        var result = await response.DeserializeAsync<HealthDto>(_output);
        result.Should().NotBeNull();
        result.Status.Should().Be(HealthStatus.UP);
    }
}
