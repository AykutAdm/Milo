using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class UpdateUserSubscriptionCommandHandler : IRequestHandler<UpdateUserSubscriptionCommand>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public UpdateUserSubscriptionCommandHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task Handle(UpdateUserSubscriptionCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.UserSubscriptionId);

            if (value.UserId != _currentUser.GetUserId())
            {
                throw new Exception("Bu aboneliği güncelleme yetkiniz yok.");
            }

            _mapper.Map(request, value);
            await _repository.UpdateAsync(value);
        }
    }
}
