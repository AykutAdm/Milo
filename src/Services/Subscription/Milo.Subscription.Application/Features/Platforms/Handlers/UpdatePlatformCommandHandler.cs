using AutoMapper;
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
    public class UpdatePlatformCommandHandler : IRequestHandler<UpdatePlatformCommand>
    {
        private readonly IPlatformRepository _repository;
        private readonly IMapper _mapper;

        public UpdatePlatformCommandHandler(IPlatformRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task Handle(UpdatePlatformCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.PlatformId);
            _mapper.Map(request, value);
            await _repository.UpdateAsync(value);
        }
    }
}
