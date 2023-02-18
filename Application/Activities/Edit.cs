using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public DevHubBlog DevHubBlog { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var blog = await _context.DevHubBlogs.FindAsync(request.DevHubBlog.Id);
                // blog.Title = request.DevHubBlog.Title ?? blog.Title; sawp this code and use mapper object

                _mapper.Map(request.DevHubBlog, blog); // need to add service to the program class

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}