using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => JsonSerializer.Serialize(Npc.Generate()));

app.MapGet("/test", () => "shiiiiiiidt");
app.Run();
