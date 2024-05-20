using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Endpoints.Skus;

public class UpdateSkuTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsNoContentGivenExistingSku()
    {
        var existingSku = await _client.EnsureExistingSku(_output);

        var route = UpdateSku.BuildRoute(existingSku.Id);
        var request = new UpdateSkuRequest
        {
            Code = "New Sample Code",
            Name = "New Sample Name",
            Price = 22m,
            Stock = 400
        };

        var response = await _client.ExecutePutAsync(route, request, _output);
        response.Should().NotBeNull().And.Subject.EnsureNoContent();
    }

    [Fact]
    public async Task ReturnsNotFoundGivenNonExistingSku()
    {
        var route = UpdateSku.BuildRoute(Guid.NewGuid());
        var request = new UpdateSkuRequest
        {
            Code = "New Sample Code",
            Name = "New Sample Name",
            Price = 22m,
            Stock = 400
        };

        var response = await _client.ExecutePutAsync(route, request, _output);
        response.Should().NotBeNull().And.Subject.EnsureNotFound();
    }
}
