using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Platforms.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Platforms.Handlers
{
    public class CreatePlatformCommandHandler : IRequestHandler<CreatePlatformCommand>
    {
        private readonly IPlatformRepository _repository;
        private readonly IMapper _mapper;

        public CreatePlatformCommandHandler(IPlatformRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task Handle(CreatePlatformCommand request, CancellationToken cancellationToken)
        {
            var value = _mapper.Map<Platform>(request);
            await _repository.AddAsync(value);
        }
    }
}
