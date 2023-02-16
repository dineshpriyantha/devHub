using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<DevHubBlog>
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Query, DevHubBlog>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<DevHubBlog> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.DevHubBlogs.FindAsync(request.Id);
            }
        }
    }
}