define(['jquery', 'handlebars'], function($, handlebars) {
    return function(id, data, ul) {
        var tpl = $(id).html();
        var tempalte = handlebars.compile(tpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        handlebars.registerHelper('limit', function(param, options) {
            if (param < 5) {
                //符合条件
                return options.fn(this);
            } else {
                //不符合
                return options.inverse(this)
            }
        })
        var html = tempalte(JSON.parse(data));
        $(ul).html(html);
    }

})