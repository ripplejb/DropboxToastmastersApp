using System.Collections.Generic;
using System.Threading.Tasks;
using Dropbox.Api;
using DropboxToastmastersApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace DropboxToastmastersApp.Controllers
{
    [Route("api/[controller]")]
    public class FilesController: ControllerBase
    {
        #region Private Member Variables

        private readonly AppData _appData;

        #endregion

        #region Constructors

        public FilesController(AppData appData)
        {
            _appData = appData;
        }

        #endregion

        [HttpGet("/api/files/{sessionId}")]
        public async Task<IEnumerable<DropBoxFile>> Get(string sessionId)
        {

            var dbx = new DropboxClient(_appData.SessionCache[sessionId]);

            var list = await dbx.Files.ListFolderAsync(string.Empty);
            
            var result = new List<DropBoxFile>();

            foreach (var metadata in list.Entries)
            {
                result.Add(new DropBoxFile
                {
                    Name = metadata.Name,
                    IsFolder = metadata.IsFolder
                    
                });
            }

            return result;
        }
    }

    public class DropBoxFile
    {
        public string Name { get; set; }
        public bool IsFolder { get; set; }

    }
}