namespace Modularis.SharedKernel;

public class Result<T> : IResult
{
    public T? Value { get; init; }

    public ResultStatus Status { get; protected set; } = ResultStatus.Ok;

    protected Result()
    {
    }

    protected Result(ResultStatus status)
    {
        Status = status;
    }

    public Result(T value)
    {
        Value = value;
    }

    public static implicit operator Result<T>(T value) => new(value);

    public static implicit operator Result<T>(Result result) => new()
    {
        Status = result.Status,
    };
}
