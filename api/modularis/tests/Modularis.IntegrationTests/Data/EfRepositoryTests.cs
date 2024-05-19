using Modularis.SkuModule.Domain;

namespace Modularis.IntegrationTests.Data;

public class EfRepositoryTests(EfTestFixture fixture) : IClassFixture<EfTestFixture>
{
    private readonly EfRepository<Sku> repository = new(fixture.Db);

    [Fact]
    public async Task GetsAllItems()
    {
        fixture.ClearDatabase();

        var sku1 = new Sku("Sample Code 1", "Sample Name 1", 12m, 200);
        await repository.AddAsync(sku1);
        fixture.Db.Entry(sku1).State = EntityState.Detached;

        var sku2 = new Sku("Sample Code 2", "Sample Name 2", 22m, 400);
        await repository.AddAsync(sku2);
        fixture.Db.Entry(sku2).State = EntityState.Detached;

        (await repository.GetAllAsync()).Should().HaveCount(2);
    }

    [Fact]
    public async Task GetsItemById()
    {
        fixture.ClearDatabase();

        var sku1 = new Sku("Sample Code 1", "Sample Name 1", 12m, 200);
        await repository.AddAsync(sku1);
        fixture.Db.Entry(sku1).State = EntityState.Detached;

        var sku2 = new Sku("Sample Code 2", "Sample Name 2", 22m, 400);
        await repository.AddAsync(sku2);
        fixture.Db.Entry(sku2).State = EntityState.Detached;

        (await repository.GetByIdAsync(sku1.Id)).Should().NotBeNull();
        (await repository.GetByIdAsync(sku2.Id)).Should().NotBeNull();
        (await repository.GetByIdAsync(Guid.NewGuid())).Should().BeNull();
    }

    [Fact]
    public async Task AddsItemAndSetsId()
    {
        fixture.ClearDatabase();

        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);
        await repository.AddAsync(sku);
        fixture.Db.Entry(sku).State = EntityState.Detached;

        var createdItem = (await repository.GetAllAsync()).SingleOrDefault();
        createdItem.Should().NotBeNull();
        createdItem!.Id.Should().NotBeEmpty();
        createdItem.Code.Should().Be(sku.Code);
        createdItem.Name.Should().Be(sku.Name);
        createdItem.Price.Should().Be(sku.Price);
        createdItem.Stock.Should().Be(sku.Stock);
    }

    [Fact]
    public async Task UpdatesItemAfterAddingIt()
    {
        fixture.ClearDatabase();

        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);
        await repository.AddAsync(sku);
        fixture.Db.Entry(sku).State = EntityState.Detached;

        var createdItem = (await repository.GetAllAsync()).SingleOrDefault();
        createdItem.Should().NotBeNull();
        createdItem!.Should().NotBe(sku);
        createdItem!.Code = "New Sample Code";

        await repository.UpdateAsync(createdItem);

        var updatedItem = (await repository.GetAllAsync()).SingleOrDefault();
        updatedItem.Should().NotBeNull();
        updatedItem!.Id.Should().Be(createdItem.Id);
        updatedItem.Code.Should().NotBe(sku.Code);
        updatedItem.Code.Should().Be(createdItem.Code);
        updatedItem.Name.Should().Be(createdItem.Name);
        updatedItem.Price.Should().Be(createdItem.Price);
        updatedItem.Stock.Should().Be(createdItem.Stock);
    }

    [Fact]
    public async Task DeletesItemAfterAddingIt()
    {
        fixture.ClearDatabase();

        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);
        await repository.AddAsync(sku);
        fixture.Db.Entry(sku).State = EntityState.Detached;

        var createdItem = (await repository.GetAllAsync()).SingleOrDefault();
        createdItem.Should().NotBeNull();
        await repository.DeleteAsync(createdItem!);

        var deletedItem = (await repository.GetAllAsync()).SingleOrDefault();
        deletedItem.Should().BeNull();
    }
}
