namespace Modularis.WebApi.Endpoints
{
    public class Login : EndpointBase
    {
        public const string Route = "/Login";

        public static string BuildRoute() => Route;

        public override void Configure(WebApplication app)
        {
            app.MapPost(Route, HandleAsync)
                .WithOpenApi()
                .WithName(nameof(Login))
                .WithTags("Login");
        }

        private Ok<LoginResponse> HandleAsync([FromBody] LoginRequest request)
        {
            return TypedResults.Ok(new LoginResponse()
            {
                Id = "1",
                Username = request.Email,
                Email = request.Email,
                AvatarUrl = "https://i.pinimg.com/originals/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
                AccessToken = "5efb5f8a-212b-4b22-a201-ba2958005342",
            });
        }
    }
}
