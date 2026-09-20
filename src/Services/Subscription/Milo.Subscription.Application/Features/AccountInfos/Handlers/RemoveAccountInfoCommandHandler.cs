using MediatR;
using Milo.Subscription.Application.Exceptions;
using Milo.Subscription.Application.Features.AccountInfos.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class RemoveAccountInfoCommandHandler : IRequestHandler<RemoveAccountInfoCommand>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly ICurrentUserService _currentUser;

        public RemoveAccountInfoCommandHandler(IAccountInfoRepository repository, ICurrentUserService currentUser)
        {
            _repository = repository;
            _currentUser = currentUser;
        }

        public async Task Handle(RemoveAccountInfoCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.AccountInfoId);

            if (value is null)
            {
                throw new NotFoundException("Hesap bilgisi bulunamadı.");
            }

            if (value.UserId != _currentUser.GetUserId())
            {
                throw new ForbiddenException("Bu hesap bilgisine erişim yetkiniz yok.");
            }

            await _repository.DeleteAsync(request.AccountInfoId);
        }
    }
}
