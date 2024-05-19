using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.WebApi.Endpoints.Skus;

namespace Modularis.FunctionalTests.Support;

public static partial class HttpClientExtensionMethods
{
    public static async Task<SkuBriefDto> EnsureExistingSku(this HttpClient client, ITestOutputHelper? output = null)
    {
        var route = CreateSku.BuildRoute();
        var request = new CreateSkuRequest
        {
            Code = "Sample Code",
            Name = "Sample Name",
            Price = 12m,
            Stock = 200
        };

        var response = await client.ExecutePostAsync(route, request, output);
        response.Should().NotBeNull().And.Subject.EnsureCreated();
        return await response.DeserializeAsync<SkuBriefDto>(output);
    }
}
