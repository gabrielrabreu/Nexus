﻿namespace Modularis.FunctionalTests.Support;

public static class HttpResponseMessageExtensionMethods
{
    public static async Task<T> DeserializeAsync<T>(this HttpResponseMessage response, ITestOutputHelper? output = null)
    {
        var stringResponse = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<T>(stringResponse, Constants.DefaultJsonOptions);
        output?.WriteLine("Result: {0}", result);
        return result ?? throw new HttpRequestException($"Error deserializing response body. Response body: {stringResponse}");
    }

    public static void EnsureOK(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    public static void EnsureCreated(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }

    public static void EnsureNoContent(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }

    public static void EnsureNotFound(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    public static void EnsureLocation(this HttpResponseMessage response, string location, ITestOutputHelper? output = null)
    {
        output?.WriteLine("Location: {0}", response.Headers.Location);
        response.Headers.Location.Should().Be(location);
    }
}
