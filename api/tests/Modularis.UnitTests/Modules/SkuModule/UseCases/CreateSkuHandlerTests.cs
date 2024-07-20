using Modularis.SkuModule.Domain;
using Modularis.SkuModule.UseCases.Create;

namespace Modularis.UnitTests.Modules.SkuModule.UseCases;

public class CreateSkuHandlerTests
{
    private readonly Mock<IRepository<Sku>> _repositoryMock;
    private readonly CreateSkuHandler _handler;

    public CreateSkuHandlerTests()
    {
        _repositoryMock = new Mock<IRepository<Sku>>();
        _handler = new CreateSkuHandler(_repositoryMock.Object);
    }

    [Fact]
    public async Task Handle_ShouldCreateSku()
    {
        // Arrange
        var request = new CreateSkuCommand("Sample Code", "Sample Name", 12m, 200);
        var cancellationToken = new CancellationToken();

        var skuAdded = new Sku(request.Code, request.Name, request.Price, request.Stock);
        _repositoryMock.Setup(mock => mock.AddAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(skuAdded);

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);
        result.Value.Should().NotBeNull();
        result.Value!.Code.Should().Be(skuAdded.Code);
        result.Value.Name.Should().Be(skuAdded.Name);
        result.Value.Price.Should().Be(skuAdded.Price);
        result.Value.Stock.Should().Be(skuAdded.Stock);

        _repositoryMock.Verify(mock => mock.AddAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.AddAsync(It.Is<Sku>(sku => sku.Code == request.Code && sku.Name == request.Name 
            && sku.Price == request.Price && sku.Stock == request.Stock), cancellationToken), Times.Once);
    }
}
