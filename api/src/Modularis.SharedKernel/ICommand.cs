namespace Modularis.SharedKernel;

public interface ICommand<out TResponse> : IRequest<TResponse>;
