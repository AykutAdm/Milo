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
    public class RemoveCategoryCommandHandler : IRequestHandler<RemoveCategoryCommand>
    {
        private readonly ICategoryRepository _repository;

        public RemoveCategoryCommandHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemoveCategoryCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteAsync(request.CategoryId);
        }
    }
}
