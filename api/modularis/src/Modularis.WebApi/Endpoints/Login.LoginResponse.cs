namespace Modularis.WebApi.Endpoints
{
    public class LoginResponse
    {
        public required string Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string AvatarUrl { get; set; }
        public required string AccessToken { get; set; }
    }
}
