/**
 * Created by WillWang on 2016/11/7.
 */
//网页被卷去的高： document.body.scrollTop;
//网页可见区域高： document.body.clientHeight;  网页可见区域宽：
//document.body.offsetWidth (包括边线的宽);
//网页可见区域高： document.body.offsetHeight (包括边线的宽)


//$(window).scrollTop()这个方法是当前滚动条滚动的距离
//$(window).height()获取当前窗体的高度
//$(document).height()获取当前文档的高度


console.log("游览器高度和文档高度"+$(window).height()+"//"+$(document).height());
var animates = document.getElementsByClassName('animate');
console.log(animates);
var animateLength = animates.length;

//window.onscroll = function () {
//    console.log(window.scrollY + "//" );
//    console.log($(window).scrollTop());
//}


//js获取元素距离文档的高度
for (var i= 0;i<animates.length;i++){
    console.log("每个元素的绝对高度和自身高"+$('.animate:eq('+i+')').offset().top+ "//" + $('.animate:eq('+i+')').height());
}


//console.log($('.cont3-cont').offset().top);  第三个动画元素高度

//jQuery

$(function () {
    //$('.animate:eq(0)').addClass('animated').removeClass('animate');
    function move(){
        $('.slide_top').each(function(){
            if($(this).offset().top < $(window).scrollTop()+$(window).height()+200){
                console.log("diyici" +$(this).offset().top );

                $(this).children('.show1').removeClass('hide').addClass('shows1');
                $(this).children('.show2').removeClass('hide').addClass('shows2');
                $(this).removeClass('slide_top');
            }
        })


    }
    move();

    $(window).scroll(function () {
        //console.log("滚动距离"+$(window).scrollTop());
        //console.log("滚动+窗口高度" + ($(window).scrollTop()+$(window).height()));
        move();
    })
})