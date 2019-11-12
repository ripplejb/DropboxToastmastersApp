using System.Collections.Generic;
using System.Threading.Tasks;
using Dropbox.Api;
using Dropbox.Api.Files;
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

        private List<Metadata> FileList { get; set; }
        
        private async Task GetMetadatas(string path, DropboxClient dbx)
        {
            var list = await dbx.Files.ListFolderAsync(path);

            foreach (var metadata in list.Entries)
            {
                if (!metadata.IsFile)
                    FileList.Add(metadata);
                else
                {
                    await GetMetadatas(metadata.PathLower, dbx);
                }
            }
        }
        
        [HttpGet("/api/files/rearrange/{sessionId}")]
        public async Task RearrangeFiles(string sessionId)
        {
            var dbx = new DropboxClient(_appData.SessionCache[sessionId]);
            
            FileList = new List<Metadata>();

            await GetMetadatas(string.Empty, dbx);
            
            // Go through list and get list of folders and create all the folders as batch job.
        }
    }

    public class DropBoxFile
    {
        public string Name { get; set; }
        public bool IsFolder { get; set; }

    }
}