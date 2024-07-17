using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Endpoints.Skus;

public class CreateSkuTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsOk()
    {
        var route = CreateSku.BuildRoute();
        var request = new CreateSkuRequest
        {
            Code = "Sample Code",
            Name = "Sample Name",
            Price = 12m,
            Stock = 200
        };

        var response = await _client.ExecutePostAsync(route, request, _output);
        response.Should().NotBeNull().And.Subject.EnsureCreated();

        var result = await response.DeserializeAsync<SkuBriefDto>(_output);
        result.Should().NotBeNull();
        result.Id.Should().NotBeEmpty();
        result.Code.Should().Be(request.Code);
        result.Name.Should().Be(request.Name);
        result.Price.Should().Be(request.Price);
        result.Stock.Should().Be(request.Stock);
        response.EnsureLocation(GetSku.BuildRoute(result.Id), _output);
    }
}
