using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class EnumExtensions
    {
        /// <summary>
        /// Parses a string to corresponding Enum type.
        /// Does not handle errors from parsing.
        /// </summary>
        public static T ParseEnum<T>(this string value, bool ignoreCase = true)
        {
            return (T)Enum.Parse(typeof(T), value, ignoreCase);
        }
    }
}
