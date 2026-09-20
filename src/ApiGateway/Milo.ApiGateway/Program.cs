using Elastic.Ingest.Elasticsearch;
using Elastic.Ingest.Elasticsearch.DataStreams;
using Elastic.Serilog.Sinks;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

//Cors
builder.Services.AddCors(config =>
{
    config.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

//Serilog
builder.Host.UseSerilog((context, configuration) =>
{
    var elasticUri = context.Configuration["ElasticsearchSettings:Url"]!;

    configuration
        .Enrich.FromLogContext()
        .Enrich.WithProperty("Service", "Gateway")
        .WriteTo.Console()
        .WriteTo.Elasticsearch(new[] { new Uri(elasticUri) }, opts =>
        {
            opts.DataStream = new DataStreamName("logs", "milo", "gateway");
            opts.BootstrapMethod = BootstrapMethod.Failure;
        });
});

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration);


var app = builder.Build();

app.UseCors();

app.UseSerilogRequestLogging();

await app.UseOcelot();

app.MapGet("/", () => "Hello World!");

app.Run();
