using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DevHubBlogsController : BaseApiCoontroller
    {
        private readonly DataContext _context;
        public DevHubBlogsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] //api/devhubblogs
        public async Task<ActionResult<List<DevHubBlog>>> GetDevHubBlogs(){
            return await _context.DevHubBlogs.ToListAsync();
        }

        [HttpGet("{id}")] //api/devhubblogs/id
        public async Task<ActionResult<DevHubBlog>> GetDevHubBlog(Guid id){
            return await _context.DevHubBlogs.FindAsync(id);
        }
    }
}