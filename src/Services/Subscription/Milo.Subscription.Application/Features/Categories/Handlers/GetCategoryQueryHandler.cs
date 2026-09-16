using AutoMapper;
using MediatR;
using Milo.Subscription.Application.Features.Categories.Queries;
using Milo.Subscription.Application.Features.Categories.Results;
using Milo.Subscription.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Handlers
{
    public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, List<GetCategoryQueryResult>>
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public GetCategoryQueryHandler(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<GetCategoryQueryResult>> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            var values = await _repository.GetAllAsync();
            return _mapper.Map<List<GetCategoryQueryResult>>(values);
        }
    }
}
