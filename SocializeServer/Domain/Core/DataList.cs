using System.Collections.Generic;

namespace Domain.Core
{
    public class DataList<T>
    {
        public List<T> Data { get; set; } = new List<T>();
        public int Count { get; set; } = 0;
    }
}
