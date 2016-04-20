# fis3-preprocessor-cssprefix
> 为解瘊组件化开发方式中css命名冲突问题

### fis-conf

```
// vi fis-conf.js
fis.match('/components/**.{html,htm,tmpl,less,css,js}', {
  preprocessor: fis.plugin('cssprefix')
});
```

*** 作用 ***

上面的fis配置作用在当前项目中名为components的目录下的文件，具体的作用是：
1. css、less文件里所有的class和id名都会加上以文件所在的目录名字串
2. 会自动为html、htm文件的html标签中的id class for 这三个标签的值加上以文件所在的目录名字串
3. 会替换js,tmpl文件中的'@NS:'字符为文件所在的目录名字串

*** 例 ***

在html文件中如不需要加前缀的时候可以加抑制符"``@``"
如 `<div class="@title">标题</div>div>`
编译输出为 `<div class="title">标题</div>div>`

css、html外的其它文件里，用 @NS: 会被替换为前缀，方便在js里使用。
```
var prefix = "@NS:";
$("." + prefix + "logo")
```
ES6：`$(\`.${prefix}logo\`)`

