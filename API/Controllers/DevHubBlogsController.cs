using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DevHubBlogsController : BaseApiCoontroller
    {
        [HttpGet] //api/devhubblogs
        public async Task<ActionResult<List<DevHubBlog>>> GetDevHubBlogs(){
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/devhubblogs/id
        public async Task<ActionResult<DevHubBlog>> GetDevHubBlog(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
    }
}