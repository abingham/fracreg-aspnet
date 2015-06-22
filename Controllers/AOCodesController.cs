using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

using fracreg.AOCodes;

namespace fracreg.Controllers
{
    public class AOCodesController : Controller
    {
        // TODO: When/how often is the controller instantiated? I assume once for the app, but perhaps not...
        IEnumerable<AOInfo> aoInfos;

        public AOCodesController() {
            aoInfos = AOInfoLoader.Load ("static/ao_codes.yaml");
        }
      
        public ActionResult Infos()
        {
            // Info on all ao-codes: [{id = ..., text = ...}]
            return Json (
                aoInfos.Select(i => new { id = i.code, text = i.fullName }),
                JsonRequestBehavior.AllowGet);
        }

        public ActionResult Info(string ao_code)
        {
            // Info on a single ao-code: {id = ..., text = ...}
            var info = aoInfos.Where (i => i.code == ao_code).First();
            return Json (
                new { id = info.code, text = info.fullName },
                JsonRequestBehavior.AllowGet);
        }

        public ActionResult Image(string ao_code)
        {
            string filename = string.Format ("static/ao_images/{0}.jpg", ao_code);
            return new System.Web.Mvc.FileStreamResult (
                new FileStream (filename, FileMode.Open), 
                "image/jpeg");    
        }
    }
}
