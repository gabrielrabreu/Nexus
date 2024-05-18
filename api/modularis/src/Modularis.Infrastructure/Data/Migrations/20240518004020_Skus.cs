﻿#nullable disable

namespace Modularis.Infrastructure.Data.Migrations;

/// <inheritdoc />
public partial class Skus : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Sku",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                Stock = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Sku", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Sku_Code",
            table: "Sku",
            column: "Code",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Sku");
    }
}
