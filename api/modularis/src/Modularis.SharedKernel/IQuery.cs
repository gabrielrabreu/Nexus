namespace Modularis.SharedKernel;

public interface IQuery<out TResponse> : IRequest<TResponse>;
