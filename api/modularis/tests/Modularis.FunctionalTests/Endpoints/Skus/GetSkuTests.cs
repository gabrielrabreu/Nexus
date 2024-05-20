using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Endpoints.Skus;

public class GetSkuTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsOkGivenExistingSku()
    {
        var existingSku = await _client.EnsureExistingSku(_output);

        var route = GetSku.BuildRoute(existingSku.Id);

        var response = await _client.ExecuteGetAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureOK();

        var result = await response.DeserializeAsync<SkuBriefDto>(_output);
        result.Should().NotBeNull();
        result.Id.Should().Be(existingSku.Id);
        result.Code.Should().Be(existingSku.Code);
        result.Name.Should().Be(existingSku.Name);
        result.Price.Should().Be(existingSku.Price);
        result.Stock.Should().Be(existingSku.Stock);
    }

    [Fact]
    public async Task ReturnsNotFoundGivenNonExistingSku()
    {
        var route = GetSku.BuildRoute(Guid.NewGuid());

        var response = await _client.ExecuteGetAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureNotFound();
    }
}
