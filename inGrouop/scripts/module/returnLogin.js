/**
 * Created by WillWang on 2017/4/18.
 */
var returmLogin = {
    temp : ' <div class="returnLogin"><div class="rt-con"> <p>返回</p> <p>登记</p> </div> </div>',
    show:function (){
        $("body").append(returmLogin.temp);
    },
    comeBack:function(){
      $(".returnLogin").on("click",function(){
          window.location.href = "login.html";

      })
    },
    init:function(){
        returmLogin.show();
        returmLogin.comeBack();
    }
};
$(function(){
   returmLogin.init();
});