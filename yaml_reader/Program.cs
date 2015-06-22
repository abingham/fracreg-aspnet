using System;
using fracreg.AOCodes;

namespace yaml_reader
{
    public class MainClass {
        public static void Main (string[] args)
        {
            var filename = args [0];
            foreach (var aoInfo in AOInfoLoader.Load(filename)) {
                Console.WriteLine (string.Format ("{0}, {1}, {2}", 
                    aoInfo.code, 
                    aoInfo.fullName, 
                    aoInfo.description));
            }
        }
    }
}
