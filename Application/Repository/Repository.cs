using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Repository
{
	public class Repository<T> : IRepository<T> where T : BaseEntity
	{
		private readonly DataContext _context;
		private readonly DbSet<T> entities;

		public Repository(DataContext context)
		{
			_context = context;
			entities = _context.Set<T>();

		}
		public void Create(T obj)
		{
			if (obj == null)
			{
				throw new ArgumentNullException("entity");
			}
			entities.Add(obj);
		}

		public void Delete(T obj)
		{
			if (obj == null)
			{
				throw new ArgumentNullException("entity");
			}
			entities.Remove(obj);
			_context.SaveChangesAsync();
		}

		public void Edit(Guid id, T obj)
		{
			if (obj == null)
			{
				throw new ArgumentNullException("entity");
			}
			entities.FindAsync(id);
		}

		public T Get(Guid id)
		{
			return entities.SingleOrDefault(o=>o.Id == id);
		}

		public List<T> GetAll()
		{

			return entities.ToList();
		}
	}
}