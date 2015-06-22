using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;



namespace fracreg.Controllers
{
    public class TreatmentDelaysController : Controller
    {
        static IList<object> data = new List<object> {
            new {id = "unknown", text = "Ukjent" },
            new {id = "less-than-three", text = "Under 3 timer" },
            new {id = "three-to-six", text = "3-6 timer" },
            new {id = "six-to-twelve", text = "6-12 timer" },
            new {id = "twelve-to-twenty-four", text = "12-24 timer" },
            new {id = "twenty-four-to-forty-eight", text = "24-48 timer" },
            new {id = "greater-than-forty-eight", text = "Mer enn 48 timer" }
        };

        public ActionResult Index()
        {
            return Json (data, JsonRequestBehavior.AllowGet);
        }
    }
}
