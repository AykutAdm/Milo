using AutoMapper;
using MassTransit.Courier.Contracts;
using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Queries;
using Milo.Subscription.Application.Features.UserSubscriptions.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Handlers
{
    public class GetUpcomingRenewalsQueryHandler : IRequestHandler<GetUpcomingRenewalsQuery, List<GetUpcomingRenewalsQueryResult>>
    {
        private readonly IUserSubscriptionRepository _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUpcomingRenewalsQueryHandler(IUserSubscriptionRepository repository, IMapper mapper, ICurrentUserService currentUser)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<List<GetUpcomingRenewalsQueryResult>> Handle(GetUpcomingRenewalsQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.GetUserId();

            var subscriptions = await _repository.GetAllByUserIdAsync(userId);

            var today = DateTime.UtcNow.Date;

            var limit = today.AddDays(request.Days);

            var upcoming = subscriptions.Where(x => x.RenewalDate.Date >= today && x.RenewalDate.Date <= limit).OrderBy(x => x.RenewalDate).ToList();

            return _mapper.Map<List<GetUpcomingRenewalsQueryResult>>(upcoming);
        }
    }
}
