using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Endpoints.Skus;

public class ListSkusTests(CustomWebApplicationFactory factory, ITestOutputHelper output) : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();
    private readonly ITestOutputHelper _output = output;

    [Fact]
    public async Task ReturnsOk()
    {
        var existingSku1 = await _client.EnsureExistingSku(_output);
        var existingSku2 = await _client.EnsureExistingSku(_output);
        var existingSku3 = await _client.EnsureExistingSku(_output);

        var existingSkus = new List<SkuBriefDto>() 
        { 
            existingSku1, 
            existingSku2,
            existingSku3 
        }.OrderBy(sku => sku.Code).ToList();

        var route = ListSkus.BuildRoute(1, 2);

        var response = await _client.ExecuteGetAsync(route, _output);
        response.Should().NotBeNull().And.Subject.EnsureOK();

        var result = await response.DeserializeAsync<StaticPagedList<SkuBriefDto>>(_output);
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(2)
                .And.SatisfyRespectively(
                    item1 =>
                    {
                        item1.Id.Should().Be(existingSkus[0].Id);
                    },
                    item2 =>
                    {
                        item2.Id.Should().Be(existingSkus[1].Id);
                    });
        result.PageNumber.Should().Be(1);
        result.TotalPages.Should().Be(2);
        result.TotalCount.Should().Be(3);
        result.HasPreviousPage.Should().BeFalse();
        result.HasNextPage.Should().BeTrue();
    }
}
