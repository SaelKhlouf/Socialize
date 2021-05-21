using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.Core;

namespace Persistence.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<T> PostAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<DataList<T>> GetAsync(int skip, int take, Expression<Func<T, bool>> where, params Expression<Func<T, object>>[] includes);
        Task SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
    }
}
