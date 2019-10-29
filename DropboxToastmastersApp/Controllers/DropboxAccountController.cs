using System.Threading.Tasks;
using Dropbox.Api;
using DropboxToastmastersApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace DropboxToastmastersApp.Controllers
{
    [Route("api/[controller]")]
    public class DropboxAccountController: ControllerBase
    {
        #region Private Member Variables

        private readonly AppData _appData;

        #endregion

        #region Constructors

        public DropboxAccountController(AppData appData)
        {
            _appData = appData;
        }

        #endregion
        
        #region Public Methods
        
        [HttpGet("/api/account/{sessionId}")]
        public async Task<ActionResult<UserAccount>> Get(string sessionId)
        {
            if (string.IsNullOrWhiteSpace(sessionId))
            {
                return new UnauthorizedResult();
            }

            if (!_appData.SessionCache.ContainsKey(sessionId))
            {
                return new UnauthorizedResult();
            }

            var dropboxClient = new DropboxClient(_appData.SessionCache[sessionId]);

            try
            {
                var fullAccount = await dropboxClient.Users.GetCurrentAccountAsync();
                return new ActionResult<UserAccount>(new UserAccount
                {
                    Name = fullAccount.Name.DisplayName,
                    PhotoUrl = fullAccount.ProfilePhotoUrl,
                    Token = sessionId
                });
            }
            catch
            {
                return new UnauthorizedResult();
            }
        }

        [HttpGet("/api/account/signin/{sessionId}")]
        public string SignIn(string sessionId)
        {
            var authorizeUri = DropboxOAuth2Helper.GetAuthorizeUri(OAuthResponseType.Code, "bwhwa6n4oglbqu6",
                $"{Request.Scheme}://{Request.Host}/api/account/authorize", state: sessionId);
            return authorizeUri.OriginalString;
        }

        [HttpGet("/api/account/authorize")]
        public async Task<IActionResult> Authorize([FromQuery]string code,[FromQuery]string state)
        {
            var response = await DropboxOAuth2Helper.ProcessCodeFlowAsync(code, "bwhwa6n4oglbqu6", "vlpo8i1p3bzj0u4",
                $"{Request.Scheme}://{Request.Host}/api/account/authorize");
            if (_appData.SessionCache.ContainsKey(state))
                _appData.SessionCache[state] = response.AccessToken;
            else
            {
                _appData.SessionCache.Add(state, response.AccessToken);
            }

            return RedirectPermanent($"{Request.Scheme}://{Request.Host}");
        }

        
        #endregion
    }
}