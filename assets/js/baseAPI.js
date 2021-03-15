$(function () {
    // 开发环境服务器 
    let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 测试环境服务器 
    // let baseURL = 'http://api-breakingnews-web.itheima.net'
    // 生产环境服务器 
    // let baseURL = 'http://api-breakingnews-web.itheima.net'

    $.ajaxPrefilter(function (options) {
        options.url = baseURL + options.url

        //身份认证 
        if (options.url.indexOf('/my/' !== -1)) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // 登录拦截
        options.complete = function (res) {
            let obj = res.responseJSON
            if (obj.status === 1 && obj.message == "身份认证失败！") {
                // 清空 token 跳转
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }



    })



})