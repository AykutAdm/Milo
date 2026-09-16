using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.AccountInfos.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;
using Milo.Subscription.Domain.Entities;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class CreateAccountInfoCommandHandler : IRequestHandler<CreateAccountInfoCommand>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public CreateAccountInfoCommandHandler(IAccountInfoRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task Handle(CreateAccountInfoCommand request, CancellationToken cancellationToken)
        {
            var value = _mapper.Map<AccountInfo>(request);
            value.UserId = _currentUser.GetUserId();
            await _repository.AddAsync(value);
        }
    }
}
