/**
 * Compile 阶段插件接口
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象 [fis3/lib/file.js]
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 **/

/**
 * fis-conf.js
 * fis.match('/components/**.{html,htm,tmpl,less,css,js}', {
 *   preprocessor: fis.plugin('cssprefix')
 * });
 */

/**
 * 上面的fis配置作用在当前项目中名为components的目录下的文件，具体的作用是：
 * 1. css、less文件里所有的class和id名都会加上以文件所在的目录名字串
 * 2. 会自动为html、htm文件的html标签中的id class for 这三个标签的值加上以文件所在的目录名字串
 * 3. 会替换js,tmpl文件中的'@NS:'字符为文件所在的目录名字串
 */

/**
 * 在html文件中如不需要加前缀的时候可以加抑制符"@"
 * 如<div class="@title">标题</div>
 * 编译输出为<div class="title">标题</div>
 */

/**
 * css、html外的其它文件里，用 @NS: 会被替换为前缀，方便在js里使用。
 * var prefix = "@NS:";
 * $("." + prefix + "logo")
 * ES6：$(`.${prefix}logo`)
 */

function addPrefix(conten,prefix){
    return conten.replace(/(<[a-z]+)(.*?)(\/>|>)/g,function(){
        var tagStr = arguments[2].replace(/((?:id|class|for)\s*=\s*(["|']))((?:\w+\s*)*)(\2)/g,function () {
            var propertyStr = arguments[3].split(/\b/).map(function(item,index,input){
                return /^\s*$/.test(item) ? item : prefix+ item;
            }).join("");
            return arguments[1]+propertyStr+arguments[4];
        });
        return arguments[1]+tagStr+arguments[3];
    });
}

module.exports = function (content, file, options) {
    var paths = file.subpathNoExt.split("/"),

        // 模块名，作为命名空间
        componentName = paths[paths.length-2].replace(/[^a-zA-Z0-9_-]/g,''),

        // 前缀
        prefix = 'x' + componentName.toUpperCase() + "-";

        if(file.isCssLike){
            content = content.replace(/([.#])(?=[^{}]*\{)/ig,"$1" + prefix).replace(new RegExp('([.#])' + prefix + '@', 'g'), '$1');
        }else {
            content = addPrefix(content,prefix).replace(/\@NS\:/g, prefix);
        }
        return content;
}
