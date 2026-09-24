using Elastic.Ingest.Elasticsearch;
using Elastic.Ingest.Elasticsearch.DataStreams;
using Elastic.Serilog.Sinks;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Milo.Notification.API.Consumers;
using Milo.Notification.API.Context;
using Milo.Notification.API.Services.NotificationServices;
using Milo.Notification.API.Services.UserServices;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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
        .Enrich.WithProperty("Service", "Notification")
        .WriteTo.Console()
        .WriteTo.Elasticsearch(new[] { new Uri(elasticUri) }, opts =>
        {
            opts.DataStream = new DataStreamName("logs", "milo", "notification");
            opts.BootstrapMethod = BootstrapMethod.Failure;
        });
});



//PostgreSQL
builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


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


//Repository
builder.Services.AddScoped<INotificationService, NotificationService>();

//Service Repository
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();


builder.Services.AddHttpContextAccessor();

builder.Services.AddMassTransit(x =>
{
    //Save Consumer
    x.AddConsumer<SubscriptionCreatedConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMQ:Host"], "/", h =>
        {
            h.Username(builder.Configuration["RabbitMQ:Username"]!);
            h.Password(builder.Configuration["RabbitMQ:Password"]!);
        });

        // Set consumer to lissen which queue
        cfg.ReceiveEndpoint("subscription-created-notification", e =>
        {
            e.ConfigureConsumer<SubscriptionCreatedConsumer>(context);
        });
    });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors();

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
