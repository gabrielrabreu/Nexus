using Modularis.SkuModule.Domain;

namespace Modularis.Infrastructure.Data.Config;

public class SkuConfiguration : IEntityTypeConfiguration<Sku>
{
    public void Configure(EntityTypeBuilder<Sku> builder)
    {
        builder.ToTable(nameof(Sku));

        builder.HasKey(sku => sku.Id);

        builder.Property(sku => sku.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(s => s.Code)
            .IsUnique();

        builder.Property(sku => sku.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(sku => sku.Price)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(sku => sku.Stock)
            .IsRequired();
    }
}
