using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Categories.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Handlers
{
    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand>
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public CreateCategoryCommandHandler(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var value = _mapper.Map<Category>(request);
            await _repository.AddAsync(value);
        }
    }
}
