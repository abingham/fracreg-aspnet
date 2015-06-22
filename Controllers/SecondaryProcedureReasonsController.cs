using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fracreg.Controllers
{
    public class SecondaryProcedureReasonsController : Controller
    {
        class ProcedureReason
        {
            public ProcedureReason(
                int id, 
                string name, 
                IList<FacilitiesController.Facility> facilities,
                string level)
            {
                this.id = id;
                this.name = name;
                this.facilities = facilities;
                this.level = level;
            }
            public int id;
            public string name;
            public IList<FacilitiesController.Facility> facilities;
            public string level;
        }

        static FacilitiesController.Facility sentral = new FacilitiesController.Facility("sus-sentral", "SuS Sentral");
        static FacilitiesController.Facility poliklinikk = new FacilitiesController.Facility("sus-poliklinikk", "SuS Poliklinikk");
        static FacilitiesController.Facility external = new FacilitiesController.Facility("external", "External");

        static IList<ProcedureReason> reasons = new List<ProcedureReason>{
            new ProcedureReason(0, "Midlertidig beh. pol", new List<FacilitiesController.Facility>{poliklinikk, external}, "none"),
            new ProcedureReason(1, "Endelig primærfiksasjon (planlagt)", new List<FacilitiesController.Facility>{external, sentral}, "none"),
            new ProcedureReason(2, "Rutinefjerning", new List<FacilitiesController.Facility>{external, sentral}, "none"),
            new ProcedureReason(3, "Primær bløtdelsskade (inkl. oppfølgning)", new List<FacilitiesController.Facility>{sentral, external}, "none"),
            new ProcedureReason(4, "Annen (ikke kompl.)", new List<FacilitiesController.Facility>{poliklinikk, sentral, external}, "none"),
            new ProcedureReason(5, "Mislykket kons. beh. ved poliklinikk", new List<FacilitiesController.Facility>{poliklinikk, external}, "simple"),
            new ProcedureReason(6, "Mislykket kons. beh. på opstue", new List<FacilitiesController.Facility>{sentral, external}, "simple"),
            new ProcedureReason(7, "Infeksjon. overfladisk (inkl. oppfølg.)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "simple"),
            new ProcedureReason(8, "Hematom utenfor fascie", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "simple"),
            new ProcedureReason(9, "Refraktur uten ostemat. (adekv. traume)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "simple"),
            new ProcedureReason(10, "Ubehag av oste. mat.", new List<FacilitiesController.Facility>{sentral, external}, "simple"),
            new ProcedureReason(11, "Annen (lett kompl.)", new List<FacilitiesController.Facility>{poliklinikk, external}, "simple"),
            new ProcedureReason(12, "Sårruptur", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(13, "Infeksjon. dyp (inkl. oppfølgning)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(14, "Hematom under fascie", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(15, "Refraktur uten ostemat. (IKKE adekv. traume)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(16,"Implantatnær brudd", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
            new ProcedureReason(17,"Osteonekrose", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
            new ProcedureReason(18,"Sen/manglende tilheling", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(19,"Tilhelet i feil stilling (malunion)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
            new ProcedureReason(20,"Posttraumatisk artrose", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
            new ProcedureReason(21,"Ostemat skåret gjennom leddflate", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
	        new ProcedureReason(22,"Osteosyntesesvikt", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
	        new ProcedureReason(23,"Løsning av protese", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
	        new ProcedureReason(24,"Luksasjon hemiprotese", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
	        new ProcedureReason(25,"Luksasjon totalprotese", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
	        new ProcedureReason(26,"Sekondær bløtdelsskade (inkl. oppfølgning)", new List<FacilitiesController.Facility>{sentral, external}, "serious"),
	        new ProcedureReason(27,"Annen (alv. kompl.)", new List<FacilitiesController.Facility>{sentral, poliklinikk, external}, "serious"),
        };

        public ActionResult Fetch(string location, string level)
        {
            var result = reasons
                .Where (r => r.level == level)
                .Where (r => r.facilities.Select (f => f.code).Contains (location))
                .Select(r => new {id = r.id, text = r.name});
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
