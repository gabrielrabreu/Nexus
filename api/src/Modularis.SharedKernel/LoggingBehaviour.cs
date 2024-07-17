namespace Modularis.SharedKernel;

public class LoggingBehaviour<TRequest, TResponse>(ILogger<Mediator> logger) : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        logger.LogInformation("Handling {RequestName}", typeof(TRequest).Name);

        var sw = Stopwatch.StartNew();

        var response = await next();

        logger.LogInformation("Handled {RequestName} in {Ms} ms", typeof(TRequest).Name, sw.ElapsedMilliseconds);

        sw.Stop();

        return response;
    }
}
