using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
	public class ActivitiesController : BaseApiController
	{


		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{

			return await Mediator.Send(new List());

			

		}

		[HttpGet("{id}")] //activities/id
		public async Task<ActionResult<Activity>> GetActivity(Guid Id)
		{
			return await Mediator.Send(new Details { Id = Id });
		}

		[HttpPost]
		public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
		{
			return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity)
		{
			activity.Id = id;
			return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteActivity(Guid id)
		{
			return Ok(await Mediator.Send(new Delete.Command { Id = id }));
		}

	}
}