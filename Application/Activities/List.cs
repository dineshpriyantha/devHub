using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<DevHubBlog>> {}

        public class Handler : IRequestHandler<Query, List<DevHubBlog>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;                
            }

            public async Task<List<DevHubBlog>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.DevHubBlogs.ToListAsync();
            }
        }
    }
}