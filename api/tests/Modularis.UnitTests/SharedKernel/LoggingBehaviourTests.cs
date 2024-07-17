﻿namespace Modularis.UnitTests.SharedKernel;

public class LoggingBehaviourTests
{
    public record SampleResponse(Guid Id);

    public record SampleRequest : IRequest<SampleResponse>;

    private readonly Mock<ILogger<Mediator>> _loggerMock;
    private readonly Mock<RequestHandlerDelegate<SampleResponse>> _nextMock;
    private readonly LoggingBehaviour<SampleRequest, SampleResponse> _behaviour;

    public LoggingBehaviourTests()
    {
        _loggerMock = new Mock<ILogger<Mediator>>();
        _nextMock = new Mock<RequestHandlerDelegate<SampleResponse>>();
        _behaviour = new LoggingBehaviour<SampleRequest, SampleResponse>(_loggerMock.Object);
    }

    [Fact]
    public async Task Process_ShouldLogRequestAndResponse()
    {
        // Arrange
        var request = new SampleRequest();
        var response = new SampleResponse(Guid.NewGuid());
        var cancellationToken = new CancellationToken();

        _nextMock.Setup(handler => handler()).ReturnsAsync(response);

        // Act
        var result = await _behaviour.Handle(request, _nextMock.Object, cancellationToken);

        // Assert
        result.Should().Be(response);
        _nextMock.Verify(handler => handler(), Times.Once);
    }
}
