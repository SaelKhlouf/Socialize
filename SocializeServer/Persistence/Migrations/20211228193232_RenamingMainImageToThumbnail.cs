using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RenamingMainImageToThumbnail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MainImageUrl",
                table: "AspNetUsers",
                newName: "Thumbnail");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Thumbnail",
                table: "AspNetUsers",
                newName: "MainImageUrl");
        }
    }
}
