using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Categories.Commands;
using Milo.Subscription.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Handlers
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public UpdateCategoryCommandHandler(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var value = await _repository.GetByIdAsync(request.CategoryId);
            _mapper.Map(request, value);
            await _repository.UpdateAsync(value);
        }
    }
}
