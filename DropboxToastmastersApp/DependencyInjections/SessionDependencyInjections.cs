using DropboxToastmastersApp.Models;
using Microsoft.Extensions.DependencyInjection;

namespace DropboxToastmastersApp.DependencyInjections
{
    public static class SessionDependencyInjections
    {
        public static void AddSessionCache(this IServiceCollection services)
        {
            services.AddSingleton<AppData>();
        }
    }
}