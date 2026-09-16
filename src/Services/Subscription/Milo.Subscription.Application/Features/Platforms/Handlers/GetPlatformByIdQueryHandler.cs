using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Platforms.Queries;
using Milo.Subscription.Application.Features.Platforms.Results;
using Milo.Subscription.Application.Interfaces.Repositories;

namespace Milo.Subscription.Application.Features.Platforms.Handlers
{
    public class GetPlatformByIdQueryHandler : IRequestHandler<GetPlatformByIdQuery, GetPlatformByIdQueryResult>
    {
        private readonly IPlatformRepository _repository;
        private readonly IMapper _mapper;

        public GetPlatformByIdQueryHandler(IPlatformRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GetPlatformByIdQueryResult> Handle(GetPlatformByIdQuery request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.PlatformId);
            return _mapper.Map<GetPlatformByIdQueryResult>(value);
        }
    }
}
