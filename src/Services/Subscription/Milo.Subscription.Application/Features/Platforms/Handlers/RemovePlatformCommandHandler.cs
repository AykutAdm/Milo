using MediatR;
using Milo.Subscription.Application.Features.Platforms.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Platforms.Handlers
{
    public class RemovePlatformCommandHandler : IRequestHandler<RemovePlatformCommand>
    {
        private readonly IPlatformRepository _repository;

        public RemovePlatformCommandHandler(IPlatformRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemovePlatformCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteAsync(request.PlatformId);
        }
    }
}
