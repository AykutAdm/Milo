using AutoMapper;
using MassTransit;
using MediatR;
using Milo.Messaging.Events;
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
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly IPlatformRepository _platformRepository;

        public CreateUserSubscriptionCommandHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser, IPlatformRepository platformRepository, IPublishEndpoint publishEndpoint)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
            _platformRepository = platformRepository;
            _publishEndpoint = publishEndpoint;
        }

        public async Task Handle(CreateUserSubscriptionCommand request, CancellationToken cancellationToken)
        {
            var value = _mapper.Map<UserSubscription>(request);
            value.UserId = _currentUser.GetUserId();
            await _repository.AddAsync(value);


            //PlatformName and CategoryName informations
            var platform = await _platformRepository.GetByIdAsync(value.PlatformId);

            //Event Publish
            var createdEvent = new SubscriptionCreatedEvent
            {
                UserId = value.UserId,
                PlatformId = value.PlatformId,
                PlatformName = platform!.PlatformName,
                CategoryName = platform.Category.CategoryName,
                Price = value.Price,
                RenewalDate = value.RenewalDate,
                Period = value.Period
            };

            await _publishEndpoint.Publish(createdEvent, cancellationToken);
        }
    }
}
