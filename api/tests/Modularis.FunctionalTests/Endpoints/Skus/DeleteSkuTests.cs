using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Endpoints.Skus;

public class DeleteSkuTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsNoContentGivenExistingSku()
    {
        var existingSku = await _client.EnsureExistingSku(_output);

        var route = DeleteSku.BuildRoute(existingSku.Id);

        var response = await _client.ExecuteDeleteAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureNoContent();
    }

    [Fact]
    public async Task ReturnsNotFoundGivenNonExistingSku()
    {
        var route = DeleteSku.BuildRoute(Guid.NewGuid());

        var response = await _client.ExecuteDeleteAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureNotFound();
    }
}
