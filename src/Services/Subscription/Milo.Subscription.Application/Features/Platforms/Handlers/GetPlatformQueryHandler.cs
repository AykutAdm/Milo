using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Platforms.Queries;
using Milo.Subscription.Application.Features.Platforms.Results;
using Milo.Subscription.Application.Interfaces.Repositories;

namespace Milo.Subscription.Application.Features.Platforms.Handlers
{
    public class GetPlatformQueryHandler : IRequestHandler<GetPlatformQuery, List<GetPlatformQueryResult>>
    {
        private readonly IPlatformRepository _repository;
        private readonly IMapper _mapper;

        public GetPlatformQueryHandler(IPlatformRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<GetPlatformQueryResult>> Handle(GetPlatformQuery request, CancellationToken cancellationToken)
        {
            var values = await _repository.GetAllAsync();
            return _mapper.Map<List<GetPlatformQueryResult>>(values);
        }
    }
}
