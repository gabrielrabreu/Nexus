namespace Modularis.FunctionalTests.Support;

public static class Constants
{
    public static readonly JsonSerializerOptions DefaultJsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
}
