using Modularis.SkuModule.Domain;
using Modularis.SkuModule.UseCases.Update;

namespace Modularis.UnitTests.Modules.SkuModule.UseCases;

public class UpdateSkuHandlerTests
{
    private readonly Mock<IRepository<Sku>> _repositoryMock;
    private readonly UpdateSkuHandler _handler;

    public UpdateSkuHandlerTests()
    {
        _repositoryMock = new Mock<IRepository<Sku>>();
        _handler = new UpdateSkuHandler(_repositoryMock.Object);
    }

    [Fact]
    public async Task Handle_WheSkuNotFound_ShouldReturnNotFound()
    {
        // Arrange
        var request = new UpdateSkuCommand(Guid.NewGuid(), "Sample Code", "Sample Name", 12m, 200);
        var cancellationToken = new CancellationToken();

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.NotFound);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);
        _repositoryMock.Verify(mock => mock.UpdateAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Handle_WhenSkuFound_ShouldUpdateSku()
    {
        // Arrange
        var sku = new Sku("Sample Code", "Sample Name", 12m, 200);

        var request = new UpdateSkuCommand(Guid.NewGuid(), "New Sample Code", "New Sample Name", 22m, 400);
        var cancellationToken = new CancellationToken();

        _repositoryMock.Setup(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(sku);

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);

        _repositoryMock.Verify(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.GetByIdAsync(request.Id, cancellationToken), Times.Once);

        _repositoryMock.Verify(mock => mock.UpdateAsync(It.IsAny<Sku>(), It.IsAny<CancellationToken>()), Times.Once);
        _repositoryMock.Verify(mock => mock.UpdateAsync(sku, cancellationToken), Times.Once);
    }
}
