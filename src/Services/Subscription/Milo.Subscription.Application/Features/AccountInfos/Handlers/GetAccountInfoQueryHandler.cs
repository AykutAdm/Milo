using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.AccountInfos.Queries;
using Milo.Subscription.Application.Features.AccountInfos.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class GetAccountInfoQueryHandler : IRequestHandler<GetAccountInfoQuery, List<GetAccountInfoQueryResult>>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetAccountInfoQueryHandler(IAccountInfoRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<List<GetAccountInfoQueryResult>> Handle(GetAccountInfoQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.GetUserId();
            var values = await _repository.GetAllByUserIdAsync(userId);
            return _mapper.Map<List<GetAccountInfoQueryResult>>(values);
        }
    }
}
