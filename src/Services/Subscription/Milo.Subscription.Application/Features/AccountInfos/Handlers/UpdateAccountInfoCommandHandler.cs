using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Exceptions;
using Milo.Subscription.Application.Features.AccountInfos.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class UpdateAccountInfoCommandHandler : IRequestHandler<UpdateAccountInfoCommand>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;
        private readonly IEncryptionService _encryptionService;

        public UpdateAccountInfoCommandHandler(IAccountInfoRepository repository, IMapper mapper, ICurrentUserService currentUser, IEncryptionService encryptionService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
            _encryptionService = encryptionService;
        }

        public async Task Handle(UpdateAccountInfoCommand request, CancellationToken cancellationToken)
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

            _mapper.Map(request, value);

            if (!string.IsNullOrEmpty(request.Password))
                value.Password = _encryptionService.Encrypt(request.Password);

            value.UserId = _currentUser.GetUserId();
            await _repository.UpdateAsync(value);
        }
    }
}
