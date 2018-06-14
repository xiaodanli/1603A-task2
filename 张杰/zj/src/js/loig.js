require(["jquery", "handlebars"], function($, handlebars) {
    //点击登录时向客户端发送ajax请求
    $('#btn').on('click', function() {
        var user = $('#user').val();
        var pwd = $('#pwd').val();
        //非空验证
        if (!user || !pwd) {
            alert('账号或密码不能为空!')
        } else {
            $.ajax({
                url: '/loig/list',
                datatype: 'json',
                type: 'post',
                data: { //发送数据
                    user: user,
                    pwd: pwd
                },
                success: function(data) { //接收数据
                    // console.log(JSON.parse(data));
                    //console.log(data);
                    if (JSON.parse(data).code === 1) {
                        console.log('登录成功');
                        //本地存值
                        window.localStorage.setItem('user', JSON.parse(data).code)
                        location.href = '../index.html';
                    }
                }
            });
        }

    });

});