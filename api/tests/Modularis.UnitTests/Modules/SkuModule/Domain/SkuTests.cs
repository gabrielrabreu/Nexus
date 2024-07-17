using Modularis.SkuModule.Domain;

namespace Modularis.UnitTests.Modules.SkuModule.Domain;

public class SkuTests
{
    [Fact]
    public void Constructor_ShouldSetProperties()
    {
        // Arrange
        var code = "Sample Code";
        var name = "Sample Name";
        var price = 12m;
        var stock = 200;

        // Act
        var sku = new Sku(code, name, price, stock);

        // Assert
        sku.Code.Should().Be(code);
        sku.Name.Should().Be(name);
        sku.Price.Should().Be(price);
        sku.Stock.Should().Be(stock);
    }
}
