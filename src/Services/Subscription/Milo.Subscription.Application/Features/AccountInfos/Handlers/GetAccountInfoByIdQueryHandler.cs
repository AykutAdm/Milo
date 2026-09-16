using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.AccountInfos.Queries;
using Milo.Subscription.Application.Features.AccountInfos.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;

namespace Milo.Subscription.Application.Features.AccountInfos.Handlers
{
    public class GetAccountInfoByIdQueryHandler : IRequestHandler<GetAccountInfoByIdQuery, GetAccountInfoByIdQueryResult>
    {
        private readonly IAccountInfoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetAccountInfoByIdQueryHandler(IAccountInfoRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<GetAccountInfoByIdQueryResult> Handle(GetAccountInfoByIdQuery request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.AccountInfoId);
            if (value.UserId != _currentUser.GetUserId())
            {
                throw new Exception("Bu hesap bilgisine erişim yetkiniz yok.");
            }

            return _mapper.Map<GetAccountInfoByIdQueryResult>(value);
        }
    }
}
