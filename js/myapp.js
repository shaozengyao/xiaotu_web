var $$ = Dom7;
var even = 'click' || 'touchstart';

/**
 * 模块函数
 * @swiper 幻灯片
 */
var com = {
    cookies: {
        setCookie: function(name, value){
            var Days = 1; //缓存时间
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        getCookie: function(name){
            var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
            }
            else{
                return null;
            }
        },
        delCookie: function(name){
            var exp = new Date();
            var _this = com;
            exp.setTime(exp.getTime() - 1);
            var cval = _this.cookies.getCookie(name);
            if(cval != null){
                document.cookie = name + "="+cval+";expires="+exp.toGMTString();
            }
        }
    }
};
var modules = {
    user: {
        login: function(){
            com.cookies.setCookie('code', 'lijian');
        },
        checkLogin: function(){
            //com.cookies.delCookie('code');
            //com.cookies.setCookie('code', 'lijian');
            var code = com.cookies.getCookie('code') == null ? modules.user.login() : com.cookies.getCookie('code');
            if(code){
                return true;
            }
            else{
                return false;
            }
        },
        msi: function(){
            $$('.msi').on(even, function(){
                var pageUrl = $$(this).attr('data-url');
                if(modules.user.checkLogin()){
                    mainView.router.loadPage(pageUrl);
                }
                else{
                    myApp.popup('.popup-login');
                    $$('#login').attr('data-jump', pageUrl);
                }
            });
        }
    },
    swiper: function(){
        var mySwiper = myApp.swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 31,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows : true
            },
            initialSlide: 1
        });
    }
};


//初始化视图
var myApp = new Framework7({
    template7Pages: true,
    template7Data: {
        'url:about.html': {
            name: 'John Doe',
            age: 38,
            company: 'Apple',
            position: 'Developer'
        },
 
        // This context will applied for page/template with data-page="contacts"
        'page:contacts': {
            tel: '(999)-111-22-33',
            email: 'contact@john.doe'
        },
 
        // Plain data object
        'languages': {
            'frontend': [
                {
                    name:'JavaScript',
                    description: 'Dynamic computer programming language[5]. It is most commonly used as part of web browsers, whose implementations allow...'
                },
                {
                    name:'CSS',
                    description: 'Style sheet language used for describing the look and formatting of a document written in a markup language...'
                },
            ],
            'backend': [
                {
                    name: 'PHP',
                    description: 'Server-side scripting language designed for web development but also used as a general-purpose programming language...'
                },
                {
                    name: 'Ruby',
                    description: 'Dynamic, reflective, object-oriented, general-purpose programming language...'
                }
            ]
        } 
    }
});



var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

/**
 * 应用首页幻灯片
 */
modules.swiper();
$$(document).on('pageInit', '.page[data-page="appHome"]', function (e) {
    modules.swiper();
});

/**
 * 我的
 */
$$(document).on('pageInit', function (e) {
    //页面加载后
    modules.user.msi();
});



$$('.get-storage-data').on(even, function() {
    var storedData = myApp.formGetData('my-form2');
    if(storedData) {
      alert(JSON.stringify(storedData));
    }
    else {
      alert('There is no stored data for this form yet. Try to change any field');
    }
});

$$('.delete-storage-data').on(even, function() {
    var storedData = myApp.formDeleteData('my-form2');
    alert('Form data deleted');
});

$$('.save-storage-data').on(even, function() {
    var storedData = myApp.formStoreData('my-form2', {
      'name': 'John',
      'email': 'john@doe.com',
      'gender': 'female',
      'switch': ['yes'],
      'slider': 10
    });
    alert('Form data replaced, refresh browser to see changes');
});