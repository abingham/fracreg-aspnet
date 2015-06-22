using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fracreg.Controllers
{
    public class FacilitiesController : Controller
    {
        public class Facility
        {
            public Facility(string code, string name)
            {
                this.code = code;
                this.name = name;
            }
            public string code;
            public string name;
        }

        public ActionResult Index()
        {
            var facilities = new List<object>();

            facilities.Add(new Facility("sus-sentral", "SuS Sentral"));
            facilities.Add(new Facility("sus-poliklinikk", "SuS Poliklinikk"));
            return Json(facilities, JsonRequestBehavior.AllowGet);
        }
    }
}
