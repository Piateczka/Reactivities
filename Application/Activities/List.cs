using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
	public class List : IRequest<List<Activity>>
	{



		public class Handler : IRequestHandler<List, List<Activity>>
		{
			private readonly DataContext _context;

			public Handler(DataContext context)
			{
				// _logger = logger;
				_context = context;

			}
			public async Task<List<Activity>> Handle(List request, CancellationToken cancellationToken)
			{


				return await _context.Activities.ToListAsync(cancellationToken);
			}
		}
	}
}