using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Exceptions;
using Milo.Subscription.Application.Features.UserSubscriptions.Queries;
using Milo.Subscription.Application.Features.UserSubscriptions.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class GetUserSubscriptionByIdQueryHandler : IRequestHandler<GetUserSubscriptionByIdQuery, GetUserSubscriptionByIdQueryResult>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUserSubscriptionByIdQueryHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<GetUserSubscriptionByIdQueryResult> Handle(GetUserSubscriptionByIdQuery request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.UserSubscriptionId);

            if (value is null)
            {
                throw new NotFoundException("Abonelik bulunamadı.");
            }

            if (value.UserId != _currentUser.GetUserId())
            {
                throw new ForbiddenException("Bu aboneliğe erişim yetkiniz yok.");
            }

            return _mapper.Map<GetUserSubscriptionByIdQueryResult>(value);
        }
    }
}
