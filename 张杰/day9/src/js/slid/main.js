require(['jquery', 'bscroll', 'swiper', 'handlebars'], function($, bscroll, swiper, handlebars) {
    var tySwiper = new swiper('.swiper-container', {
        autoplay: {
            loop: true,
            delay: 1000
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            var tpl = $('#piy').html();
            var tempalte = handlebars.compile(tpl);
            var html = tempalte(data);
            $('#ul').append(html);
        }
    })
    var listScroll = new bscroll('.content', {
        click: true,
        scrollY: true,
        probeType: 2
    });
    var parent = $('.text');
    listScroll.on('scroll', function() {
        //console.log(this.y, this.maxScrollY);
        if (this.y < this.maxScrollY - 40) {
            parent.attr('up', '释放加载更多')
        } else if (this.y < this.maxScrollY - 20) {
            parent.attr('up', '上拉加载')
        } else if (this.y > 40) {
            parent.attr('down', '释放刷新')
        }
    });
    listScroll.on('touchEnd', function() {
        if (parent.attr('down') === '释放刷新') {
            location.reload();
        } else if (parent.attr('up') === '释放加载更多') {
            //console.log('加载下一页数据')
            $.ajax({
                url: '/xl/list',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    var tpl = $('#piy').html();
                    var tempalte = handlebars.compile(tpl);
                    var html = tempalte(data);
                    $('#ul').append(html);
                }
            })
        }
    })

})