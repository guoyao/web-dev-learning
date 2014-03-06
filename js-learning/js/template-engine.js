/**
 * Author: guoyao
 * Time: 03-05-2014 17:35
 * Blog: http://www.guoyao.me
 */
(function (document) {
    var templateRegion = document.getElementById("templateRegion"),
        template = document.getElementById("template").innerHTML;

    var guiTemplate = (function () {
        function template(tmpl, data) {
            var funcBody = 'var result = "";\n',
                htmlPattern = /<([^>]*)>/g,
                func,
                index;

            tmpl = tmpl.replace(/\r|\n/g, "").replace(/\s{2,}/g, " ");
            tmpl.replace(htmlPattern, function (match, $1, matchIndex) {
                if (match.indexOf("<%=") !== -1) {
                    funcBody += "result += " + match.replace(/<%=\s*|\s*%>/g, "") + ";\n";
                } else {
                    index = tmpl.indexOf("<", matchIndex + match.length);
                    if (index !== -1) {
                        funcBody += 'result += "' + match + '";\n' + 'result += "' + tmpl.substring(matchIndex + match.length, index) + '";\n';
                    } else {
                        funcBody += "result += " + '"' + match + '";\n';
                    }
                }
                return match;
            });

            funcBody += "return result;";
            console.log(funcBody);

            func = new Function(funcBody);
            return func.call(data);
        }
        return {
          template: template
        };
    })();

    templateRegion.innerHTML = guiTemplate.template(template, {
        name: "guoyao",
        age: 26,
        fn: function () {
            return 1111;
        }
    });
})(document);