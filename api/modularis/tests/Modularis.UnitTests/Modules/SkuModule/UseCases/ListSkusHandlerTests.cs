using Modularis.SkuModule.UseCases.DataTransferObjects;
using Modularis.SkuModule.UseCases.List;

namespace Modularis.UnitTests.Modules.SkuModule.UseCases;

public class ListSkusHandlerTests
{
    private readonly Mock<IListSkusService> _serviceMock;
    private readonly ListSkusHandler _handler;

    public ListSkusHandlerTests()
    {
        _serviceMock = new Mock<IListSkusService>();
        _handler = new ListSkusHandler(_serviceMock.Object);
    }

    [Fact]
    public async Task Handle_ShouldReturnPagedList()
    {
        // Arrange
        var pagedList = new PagedList<SkuBriefDto>([], 0, 1, 2);

        var request = new ListSkusQuery(1, 2);
        var cancellationToken = new CancellationToken();

        _serviceMock.Setup(mock => mock.ListAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(pagedList);

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);
        result.Value.Should().NotBeNull();
        result.Value.Should().Be(pagedList);

        _serviceMock.Verify(mock => mock.ListAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()), Times.Once);
        _serviceMock.Verify(mock => mock.ListAsync(request.PageNumber, request.PageSize, cancellationToken), Times.Once);
    }
}
