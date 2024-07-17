using Modularis.SkuModule.Domain;

namespace Modularis.IntegrationTests.Data.Queries;

public class ListSkusServiceTests(EfTestFixture fixture) : IClassFixture<EfTestFixture>
{
    private readonly EfRepository<Sku> repository = new(fixture.Db);
    private readonly ListSkusService service = new(fixture.Db);

    [Fact]
    public async Task ListSkusWithPagination()
    {
        fixture.ClearDatabase();

        await repository.AddAsync(new Sku("Sample Code 1", "Sample Name 1", 12m, 200));
        await repository.AddAsync(new Sku("Sample Code 2", "Sample Name 2", 22m, 400));
        await repository.AddAsync(new Sku("Sample Code 3", "Sample Name 3", 32m, 600));

        var result = await service.ListAsync(1, 2);

        result.Items.Should().HaveCount(2);
        result.Items.Should().SatisfyRespectively(
            item1 => { item1.Code.Should().Be("Sample Code 1"); },
            item2 => { item2.Code.Should().Be("Sample Code 2"); });
        result.PageNumber.Should().Be(1);
        result.TotalPages.Should().Be(2);
        result.TotalCount.Should().Be(3);
        result.HasPreviousPage.Should().BeFalse();
        result.HasNextPage.Should().BeTrue();
    }
}
