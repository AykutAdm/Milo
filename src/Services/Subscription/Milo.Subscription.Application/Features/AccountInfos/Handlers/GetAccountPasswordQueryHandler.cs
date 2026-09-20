using MediatR;
using Milo.Subscription.Application.Exceptions;
using Milo.Subscription.Application.Features.AccountInfos.Queries;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class GetAccountPasswordQueryHandler : IRequestHandler<GetAccountPasswordQuery, string>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IEncryptionService _encryptionService;

        public GetAccountPasswordQueryHandler(IAccountInfoRepository repository, ICurrentUserService currentUserService, IEncryptionService encryptionService)
        {
            _repository = repository;
            _currentUserService = currentUserService;
            _encryptionService = encryptionService;
        }

        public async Task<string> Handle(GetAccountPasswordQuery request, CancellationToken cancellationToken)
        {
            var account = await _repository.GetByIdAsync(request.AccountInfoId);

            if (account is null)
            {
                throw new NotFoundException("Hesap bulunamadı.");
            }

            if (account.UserId != _currentUserService.GetUserId())
            {
                throw new ForbiddenException("Bu hesaba erişim yetkiniz yok.");
            }

            return _encryptionService.Decrypt(account.Password);
        }
    }
}
