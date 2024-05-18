namespace Modularis.SharedKernel;

public class Result : Result<Result>
{
    public Result() : base() { }

    protected internal Result(ResultStatus status) : base(status) { }

    public static Result Success()
    {
        return new Result();
    }

    public static Result<T> Success<T>(T value)
    {
        return new Result<T>(value);
    }

    public static Result Error()
    {
        return new Result(ResultStatus.Error);
    }

    public static Result NotFound()
    {
        return new Result(ResultStatus.NotFound);
    }
}
