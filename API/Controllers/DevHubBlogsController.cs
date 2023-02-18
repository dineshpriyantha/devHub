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
        public async Task<ActionResult<DevHubBlog>> GetDevHubBlogs(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateDevHubBlogs(DevHubBlog devHub)
        {
            return Ok(await Mediator.Send(new Create.Command {DevHubBlog = devHub}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDevHubBlogs(Guid id, DevHubBlog devHub)
        {
            devHub.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{DevHubBlog = devHub}));
        }
    }
}