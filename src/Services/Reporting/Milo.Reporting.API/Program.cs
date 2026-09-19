using Elastic.Ingest.Elasticsearch;
using Elastic.Ingest.Elasticsearch.DataStreams;
using Elastic.Serilog.Sinks;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Milo.Reporting.API.Consumers;
using Milo.Reporting.API.Context;
using Milo.Reporting.API.Services.ReportingServices;
using Milo.Reporting.API.Services.UserServices;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//Serilog
builder.Host.UseSerilog((context, configuration) =>
{
    var elasticUri = context.Configuration["ElasticsearchSettings:Url"]!;

    configuration
        .Enrich.FromLogContext()
        .Enrich.WithProperty("Service", "Reporting")
        .WriteTo.Console()
        .WriteTo.Elasticsearch(new[] { new Uri(elasticUri) }, opts =>
        {
            opts.DataStream = new DataStreamName("logs", "milo", "reporting");
            opts.BootstrapMethod = BootstrapMethod.Failure;
        });
});

//MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ReportingDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


//Repository
builder.Services.AddScoped<IReportingRepository, ReportingRepository>();

//Service Repository
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

//RabbitMQ
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<SubscriptionCreatedConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMQ:Host"], "/", h =>
        {
            h.Username(builder.Configuration["RabbitMQ:Username"]!);
            h.Password(builder.Configuration["RabbitMQ:Password"]!);
        });

        cfg.ReceiveEndpoint("subscription-created-reporting", e =>
        {
            e.ConfigureConsumer<SubscriptionCreatedConsumer>(context);
        });
    });
});


//Jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]!))
    };
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
