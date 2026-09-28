
using Microsoft.EntityFrameworkCore;
using Milo.Reporting.API.Context;
using System.Text;
using System.Text.Json;

namespace Milo.Reporting.API.Services.AIServices
{
    public class AiSuggestionService : IAiSuggestionService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ReportingDbContext _context;

        public AiSuggestionService(HttpClient httpClient, IConfiguration configuration, ReportingDbContext context)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _context = context;
        }

        public async Task<string> GetSuggestionAsync(Guid userId)
        {
            var subscriptions = await _context.ReportingSubscriptions.Where(x => x.UserId == userId).ToListAsync();

            if (subscriptions.Count == 0)
            {
                return "Henüz aboneliğin yok, önerecek bir şey bulamadım.";
            }

            var dataText = string.Join("\n", subscriptions.Select(s => $"- {s.PlatformName} ({s.CategoryName}): {s.Price}₺ / {s.Period}"));

            var prompt = $@"Bir kullanıcının abonelik harcamalarını analiz et ve tasarruf önerileri ver.
Kullanıcının abonelikleri:
{dataText}

Kısa, net ve Türkçe öneriler ver. Gereksiz aboneliklere, aynı kategoride birden fazla servise ve yıllık plana geçmenin avantajlarına dikkat çek. En fazla 4-5 madde, samimi bir dille.";

            return await CallClaudeAsync(prompt);
        }

        private async Task<string> CallClaudeAsync(string prompt)
        {
            var apiKey = _configuration["Anthropic:ApiKey"]!;
            var model = _configuration["Anthropic:Model"]!;

            var requestBody = new
            {
                model = model,
                max_tokens = 500,
                messages = new[]
                {
                    new { role = "user", content = prompt }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages")
            {
                Content = content
            };
            request.Headers.Add("x-api-key", apiKey);
            request.Headers.Add("anthropic-version", "2023-06-01");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseJson);
            var text = doc.RootElement
                .GetProperty("content")[0]
                .GetProperty("text")
                .GetString();

            return text ?? "Öneri alınamadı.";
        }
    }
}
