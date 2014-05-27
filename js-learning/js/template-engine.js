/**
 * Author: guoyao
 * Time: 03-05-2014 17:35
 * Blog: http://www.guoyao.me
 */
(function (document) {
    var templateRegion = document.getElementById("templateRegion"),
        template = document.getElementById("template").innerHTML;

//    var guiTemplate = (function () {
//        function template(tmpl, data) {
//            var funcBody = 'var result = "";\n',
//                htmlPattern = /<([^>]*)>/g,
//                func,
//                index;
//
//            tmpl = tmpl.replace(/\r|\n/g, "").replace(/\s{2,}/g, " ");
//            tmpl.replace(htmlPattern, function (match, $1, matchIndex) {
//                if (match.indexOf("<%=") !== -1) {
//                    funcBody += "result += " + match.replace(/<%=\s*|\s*%>/g, "") + ";\n";
//                } else {
//                    index = tmpl.indexOf("<", matchIndex + match.length);
//                    if (index !== -1) {
//                        funcBody += 'result += "' + match + '";\n' + 'result += "' + tmpl.substring(matchIndex + match.length, index) + '";\n';
//                    } else {
//                        funcBody += "result += " + '"' + match + '";\n';
//                    }
//                }
//                return match;
//            });
//
//            funcBody += "return result;";
//            console.log(funcBody);
//
//            func = new Function(funcBody);
//            return func.call(data);
//        }
//        return {
//          template: template
//        };
//    })();
    
    var guiTemplate = (function () {
        function template(tmpl, data) {
            var funcBody = 'var result = "";',
                func;

            tmpl = tmpl.replace(/\r|\n/g, "").replace(/"/g, '\\"'); //转义"号
            funcBody += ' result += "' + tmpl + '";'; 
            funcBody = funcBody.replace(/<%=\s*([^>]*)\s*%>/g, function(match, $1) {
                return '" + ' + $1.replace(/\\"/g, '"') + ' + "'; //替换的同时，恢复<%=%>中被转义的"号
            });
            funcBody = funcBody.replace(/<%\s*([^>]*)\s*%>/g, function(match, $1) {
                return '";' + $1.replace(/\\"/g, '"') + 'result += "'; //替换的同时，恢复<%=%>中被转义的"号
            });

            funcBody += " return result;";
            console.log(funcBody);

            func = new Function(funcBody);
            return func.call(data);
        }
        return {
          template: template
        };
    })();


    templateRegion.innerHTML = guiTemplate.template(template, {
        name: 'guoyao',
        age: 26,
        gender: 'male',
        children: [
            {
                name: 'child 1',
                age: 5,
                gender: 'female'
            },
            {
                name: 'child 2',
                age: 3,
                gender: 'male'
            }
        ]
    });
})(document);