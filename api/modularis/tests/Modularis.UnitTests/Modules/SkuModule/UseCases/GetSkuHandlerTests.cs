using Modularis.SkuModule.Domain;
using Modularis.SkuModule.UseCases.Get;

namespace Modularis.UnitTests.Modules.SkuModule.UseCases;

public class GetSkuHandlerTests
{
    private readonly Mock<IReadRepository<Sku>> _repositoryMock;
    private readonly GetSkuHandler _handler;

    public GetSkuHandlerTests()
    {
        _repositoryMock = new Mock<IReadRepository<Sku>>();
        _handler = new GetSkuHandler(_repositoryMock.Object);
    }

    [Fact]
    public async Task Handle_WheSkuNotFound_ShouldReturnNotFound()
    {
        // Arrange
        var request = new GetSkuQuery(Guid.NewGuid());
        var cancellationToken = new CancellationToken();

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.NotFound);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);
    }

    [Fact]
    public async Task Handle_WhenSkuFound_ShouldReturnIt()
    {
        // Arrange
        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);

        var request = new GetSkuQuery(sku.Id);
        var cancellationToken = new CancellationToken();

        _repositoryMock.Setup(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(sku);

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);
        result.Value.Should().NotBeNull();
        result.Value!.Id.Should().Be(sku.Id);
        result.Value.Code.Should().Be(sku.Code);
        result.Value.Name.Should().Be(sku.Name);
        result.Value.Price.Should().Be(sku.Price);
        result.Value.Stock.Should().Be(sku.Stock);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);
    }
}
