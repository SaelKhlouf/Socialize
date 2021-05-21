using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Domain.Core;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _context;
        public BaseRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<T> PostAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<DataList<T>> GetAsync(int skip = 0, int take = int.MaxValue, Expression<Func<T, bool>> where = null, Expression<Func<T, object>>[] includes = null)
        {
            var query = _context.Set<T>().AsQueryable();

            if (where != null)
            {
                query = query.Where(where);
            }
            if (includes != null)
            {
                foreach (Expression<Func<T, object>> i in includes)
                {
                    query = query.Include(i);
                }
            }

            var count = await query
                .AsNoTracking()
                .CountAsync();

            var data = await query.AsNoTracking()
                .Skip(skip)
                .Take(take)
                .OrderBy(T => T.Id)
                .ToListAsync();

            return new DataList<T>
            {
                Count = count,
                Data = data
            };
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task BeginTransactionAsync()
        {
            await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _context.Database.CurrentTransaction.CommitAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
