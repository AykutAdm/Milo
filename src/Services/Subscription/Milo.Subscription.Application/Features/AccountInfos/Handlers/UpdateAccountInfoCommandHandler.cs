using AutoMapper;
using MediatR;
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

        public UpdateAccountInfoCommandHandler(IAccountInfoRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task Handle(UpdateAccountInfoCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.AccountInfoId);
            if (value.UserId != _currentUser.GetUserId())
            {
                throw new Exception("Bu hesap bilgisine erişim yetkiniz yok.");
            }

            _mapper.Map(request, value);
            await _repository.UpdateAsync(value);
        }
    }
}
