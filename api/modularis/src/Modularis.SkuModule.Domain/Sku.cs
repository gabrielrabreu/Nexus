namespace Modularis.SkuModule.Domain;

public class Sku(string code, string name, decimal price, int stock) : DomainEntityBase, IAggregateRoot
{
    public string Code { get; set; } = code;
    public string Name { get; set; } = name;
    public decimal Price { get; set; } = price;
    public int Stock { get; set; } = stock;
}
