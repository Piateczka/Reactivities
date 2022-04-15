namespace Application.Repository
{
    public interface IRepository<T>
    {
         void Create(T obj);
		 void Delete(T obj);
		 List<T> GetAll();

		 T Get(Guid id);

		 void Edit(Guid id, T obj);
		 






    }
}