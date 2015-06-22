using System;
using System.Collections.Generic;
using System.IO;
using YamlDotNet.RepresentationModel;

namespace fracreg.AOCodes
{
    public struct AOInfo {
        public string code;
        public IList<string> name;
        public string description;

        public string fullName { get { return string.Join ("/", name); } }
    }

    public class AOInfoLoader
    {
        public static IEnumerable<AOInfo> Load(string filename) {
            return Load(new StreamReader (filename));
        }

        public static IEnumerable<AOInfo> Load(TextReader input) {
            var yaml = new YamlStream();
            yaml.Load(input);
            return Classifications((YamlMappingNode)yaml.Documents [0].RootNode);
        }

        static string GetPrefix(YamlMappingNode node) {
            foreach (var entry in node) {
                string key = (string)(YamlScalarNode)entry.Key;
                if (key == "_prefix") {
                    return (string)(YamlScalarNode)entry.Value;
                }
            }
            return "";
        }

        static IEnumerable<AOInfo> Classifications(YamlMappingNode tree, string prefix="", IList<string> names = null) {
            if (names == null) {
                names = new List<string> ();
            }

            foreach (var entry in tree) {
                // yield return (string)((YamlScalarNode)entry.Key);
                var name = (string)((YamlScalarNode)entry.Key);
                if (name == "_classifications") {
                    foreach (var classification in (YamlMappingNode)entry.Value) {
                        var code = (string)((YamlScalarNode)classification.Key);
                        var desc = (string)((YamlScalarNode)classification.Value);
                        yield return new AOInfo{ code = prefix + code, 
                            name = names, 
                            description = desc };
                    }
                }
                else if (!name.StartsWith("_")) {
                    YamlMappingNode subtree = (YamlMappingNode)entry.Value;
                    var newNames = new List<string>(names);
                    newNames.Add (name);
                    var recurse = Classifications(subtree, prefix + GetPrefix(subtree), newNames);
                    foreach (var rslt in recurse) {
                        yield return rslt;
                    }
                }
            }
        }
    }
}

