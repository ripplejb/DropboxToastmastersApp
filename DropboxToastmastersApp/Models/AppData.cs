using System.Collections.Generic;

namespace DropboxToastmastersApp.Models
{
    public class AppData
    {
        #region Constructors

        public AppData()
        {
            SessionCache = new Dictionary<string, string>();
        }

        #endregion

        #region Public Properties

        public Dictionary<string, string> SessionCache { get; }

        #endregion
    }
}