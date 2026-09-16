using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class RemoveUserSubscriptionCommandHandler : IRequestHandler<RemoveUserSubscriptionCommand>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly ICurrentUserService _currentUser;

        public RemoveUserSubscriptionCommandHandler(IUserSubscriptionRepository repository, ICurrentUserService currentUser)
        {
            _repository = repository;
            _currentUser = currentUser;
        }

        public async Task Handle(RemoveUserSubscriptionCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.UserSubscriptionId);
            if (value.UserId != _currentUser.GetUserId())
            {
                throw new Exception("Bu aboneliği silme yetkiniz yok.");
            }

            await _repository.DeleteAsync(request.UserSubscriptionId);
        }
    }
}
