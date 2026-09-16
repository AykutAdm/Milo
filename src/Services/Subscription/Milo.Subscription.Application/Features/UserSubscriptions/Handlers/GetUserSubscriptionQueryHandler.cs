using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Queries;
using Milo.Subscription.Application.Features.UserSubscriptions.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class GetUserSubscriptionQueryHandler : IRequestHandler<GetUserSubscriptionQuery, List<GetUserSubscriptionQueryResult>>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUserSubscriptionQueryHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<List<GetUserSubscriptionQueryResult>> Handle(GetUserSubscriptionQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.GetUserId();
            var values = await _repository.GetAllByUserIdAsync(userId);
            return _mapper.Map<List<GetUserSubscriptionQueryResult>>(values);
        }
    }
}
