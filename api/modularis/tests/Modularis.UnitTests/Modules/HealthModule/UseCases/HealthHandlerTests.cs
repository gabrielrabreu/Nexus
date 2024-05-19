using Modularis.HealthModule.UseCases.DataTransferObjects;
using Modularis.HealthModule.UseCases.Health;

namespace Modularis.UnitTests.Modules.HealthModule.UseCases;

public class HealthHandlerTests
{
    private readonly Mock<IDependencyHealth> _dependencyMock1;
    private readonly Mock<IDependencyHealth> _dependencyMock2;
    private readonly HealthHandler _handler;

    public HealthHandlerTests()
    {
        _dependencyMock1 = new Mock<IDependencyHealth>();
        _dependencyMock2 = new Mock<IDependencyHealth>();
        _handler = new HealthHandler([_dependencyMock1.Object, _dependencyMock2.Object]);
    }

    [Fact]
    public async Task Handle_AllDependenciesUp_ReturnsWithStatusUp()
    {
        // Arrange
        var request = new HealthQuery();
        var cancellationToken = new CancellationToken();

        _dependencyMock1.Setup(d => d.GetHealthAsync()).ReturnsAsync(new DependencyHealthDto("DependencyMock1", HealthStatus.UP, "15"));
        _dependencyMock2.Setup(d => d.GetHealthAsync()).ReturnsAsync(new DependencyHealthDto("DependencyMock2", HealthStatus.UP, "25"));

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);
        result.Value.Should().NotBeNull();
        result.Value!.Status.Should().Be(HealthStatus.UP);
        result.Value.Dependencies.Should().HaveCount(2);
    }

    [Fact]
    public async Task Handle_AnyDependencyDown_ReturnsWithStatusDown()
    {
        // Arrange
        var request = new HealthQuery();
        var cancellationToken = new CancellationToken();

        _dependencyMock1.Setup(d => d.GetHealthAsync()).ReturnsAsync(new DependencyHealthDto("DependencyMock1", HealthStatus.UP, "15"));
        _dependencyMock2.Setup(d => d.GetHealthAsync()).ReturnsAsync(new DependencyHealthDto("DependencyMock2", HealthStatus.DOWN, "25"));

        // Act
        var result = await _handler.Handle(request, cancellationToken);

        // Assert
        result.Should().NotBeNull();
        result.Status.Should().Be(ResultStatus.Ok);
        result.Value.Should().NotBeNull();
        result.Value!.Status.Should().Be(HealthStatus.DOWN);
        result.Value.Dependencies.Should().HaveCount(2);
    }
}
