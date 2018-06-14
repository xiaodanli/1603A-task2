//主模块
require(["jquery", "handlebars", "template"], function($, handlebars, template) {
    //本地取值
    var num = window.localStorage.getItem('user') || 0;
    //如果不为空
    if (num) {
        $('#ul').show();
    }
    $.ajax({
        url: '/api/list',
        datatype: 'json',
        success: function(data) {
            // console.log(JSON.parse(data));
            template('#tpl', data, "#ul")
        }
    });
    $('header').on('click', function() {
        location.href = '../loig.html'
    })
})