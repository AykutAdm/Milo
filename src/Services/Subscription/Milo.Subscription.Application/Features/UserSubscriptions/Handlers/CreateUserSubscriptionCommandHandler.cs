using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;
using Milo.Subscription.Domain.Entities;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class CreateUserSubscriptionCommandHandler : IRequestHandler<CreateUserSubscriptionCommand>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public CreateUserSubscriptionCommandHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task Handle(CreateUserSubscriptionCommand request, CancellationToken cancellationToken)
        {
            var value = _mapper.Map<UserSubscription>(request);
            value.UserId = _currentUser.GetUserId();
            await _repository.AddAsync(value);
        }
    }
}
