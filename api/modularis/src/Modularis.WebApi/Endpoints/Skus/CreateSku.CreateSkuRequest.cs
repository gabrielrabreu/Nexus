using System.ComponentModel.DataAnnotations;

namespace Modularis.WebApi.Endpoints.Skus
{
    public class CreateSkuRequest
    {
        [Required]
        public required string Code { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required decimal Price { get; set; }

        [Required]
        public required int Stock { get; set; }
    }
}
