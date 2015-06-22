using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fracreg.Controllers
{
    class Procedure
    {
        public int id;
        public string side;
        public string procedures;
        public string date;
        public int hour;
        public string delay;
        public string ao_code;
        public string dislocation;
        public string open_fracture_classification;
        public IList<string> pathology;
        public string pathology_description;
    }

    public class PreviousProceduresController : Controller
    {
        static IDictionary<string, List<Procedure>> procedures = new Dictionary<string, List<Procedure>> { {"sus-sentral", new List<Procedure> () {
                    new Procedure {
                        id = 0, 
                        side = "venstre", 
                        procedures = "Inserted pin, proximal femur", 
                        date = "2003-10-04", 
                        hour = 12, 
                        delay = "less-than-three", 
                        ao_code = "31A1",
                        dislocation = "lumbal", 
                        open_fracture_classification = "type-1",
                        pathology = new List<string> (){ "metastasis" }, 
                        pathology_description = "Some notes"
                    },
                    new Procedure {
                        id = 1,
                        side = "høyre",
                        procedures = "Added plate, femoral shaft",
                        date = "2010-03-14", 
                        hour = 3,
                        delay = "six-to-twelve", 
                        ao_code = "32A2",
                        dislocation = "hofte", 
                        open_fracture_classification = "type-3b",
                        pathology = new List<string> (){ "local-infection", "irradiated-bone" }, 
                        pathology_description = "more notes"
                    }
                }
            },
            //        (2,
            //            "venstre", "Cement, distal femur",
            //            "2012-09-23", 19,
            //            "greater-than-forty-eight", "33A3",
            //            None, None,
            //            [], ""),}},
            {"sus-poliklinikk", new List<Procedure>() {
                    new Procedure {
                        id = 0, 
                        side = "venstre", 
                        procedures = "Fractured distal femur", 
                        date = "2003-09-04", 
                        hour = 10, 
                        delay = "less-than-three", 
                        ao_code = "33A3",
                        dislocation = null, 
                        open_fracture_classification = "type-2",
                        pathology = new List<string>(){}, 
                        pathology_description = ""    
                }}} 
        };

        public ActionResult Fetch(string facility)
        {
            return Json(procedures[facility], JsonRequestBehavior.AllowGet);
        }
    }
}
