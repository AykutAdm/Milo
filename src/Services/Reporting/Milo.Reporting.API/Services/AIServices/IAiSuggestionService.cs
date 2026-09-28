namespace Milo.Reporting.API.Services.AIServices
{
    public interface IAiSuggestionService
    {
        Task<string> GetSuggestionAsync(Guid userId);
    }
}
