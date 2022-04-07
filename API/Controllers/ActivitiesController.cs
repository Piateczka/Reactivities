using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
	public class ActivitiesController : BaseApiController
	{
		private readonly DataContext _conext;
		public ActivitiesController(DataContext conext)
		{
			_conext = conext;

		}

		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			return await _conext.Activities.ToListAsync();
		}

		[HttpGet("{id}")] //activities/id
		public async Task<ActionResult<Activity>> GetActivity(Guid Id){
			return await _conext.Activities.FindAsync(Id);
		}

	}
}