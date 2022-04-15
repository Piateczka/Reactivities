using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Details : IRequest<Activity>
	{
		public Guid Id { get; set; }

		public class Handler : IRequestHandler<Details, Activity>
		{
			private readonly DataContext _context;

			public Handler(DataContext context)
			{
				_context = context;

			}
			public async Task<Activity> Handle(Details request, CancellationToken cancellationToken)
			{
				return await _context.Activities.FindAsync(request.Id);
			}
		}
	}
}