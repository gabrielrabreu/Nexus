using Modularis.SkuModule.Domain;
using Modularis.SkuModule.UseCases.Delete;

namespace Modularis.UnitTests.Modules.SkuModule.UseCases;

public class DeleteSkuHandlerTests
{
    private readonly Mock<IRepository<Sku>> _repositoryMock;
    private readonly DeleteSkuHandler _handler;

    public DeleteSkuHandlerTests()
    {
        _repositoryMock = new Mock<IRepository<Sku>>();
        _handler = new DeleteSkuHandler(_repositoryMock.Object);
    }

    [Fact]
    public async Task Handle_WheSkuNotFound_ShouldReturnNotFound()
    {
        // Arrange
        var request = new DeleteSkuCommand(Guid.NewGuid());
        var cancellationToken = new CancellationToken();

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.NotFound);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);
        _repositoryMock.Verify(mock => mock.DeleteAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Handle_WhenSkuFound_ShouldDeleteSku()
    {
        // Arrange
        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);

        var request = new DeleteSkuCommand(sku.Id);
        var cancellationToken = new CancellationToken();

        _repositoryMock.Setup(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(sku);

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);

        _repositoryMock.Verify(mock => mock.DeleteAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.DeleteAsync(sku, cancellationToken), Times.Once);
    }
}
