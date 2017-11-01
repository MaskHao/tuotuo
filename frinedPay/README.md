[TOC]
# 聚悦健康用户端跳转H5页面微信、支付宝对接文档
 > **提示:** 由于用户端接口采用微信/支付宝旧接口，此文档对ZFB/WX新旧接口对比(由于微信支付采用微信公众号支付此处不采用weixinH5支付接口)
## 支付流程
```flow
st=>start: H5的friendPay页面
e=>end: end
op1=>operation: 点击支付
cond=>condition: 是否已支付？
cond1=>condition: 支付方式为微信？
cond2=>condition: 微信游览器?
cond3=>condition: 微信游览器?
sub=>subroutine: 提示用户微信中打开
sub2=>subroutine: 跳转friendPay-ZFB页面提示用户游览器中打开
io=>inputoutput: 支付...
io2=>inputoutput: 支付...
io3=>inputoutput: 已支付
st->op1->cond
cond(yes)->io3->e
cond(no)->cond1
cond1(yes)->cond2
cond2(yes)->io->e s'd'f's'd'f'
cond2(no)->sub->cond1
cond1(no)->cond3
cond3(yes)->sub2->io2->e
cond3(no)->io2->e
```
## 微信支付
> `备注:`此处采用的是[公众号支付方式](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_3)，要区分测试公众号和正式公众号

1.开发准备
- 设置支付目录
	`请确保实际支付时的请求目录与后台配置的目录一致，否则将无法成功唤起微信支付。`
	在微信商户平台（pay.weixin.qq.com）设置您的公众号支付支付目录，设置路径：商户平台-->产品中心-->开发配置，如图7.7所示。公众号支付在请求支付的时候会校验请求来源是否有在商户平台做了配置，所以必须确保支付目录已经正确的被配置，否则将验证失败，请求支付不成功。
- 设置授权域名
	开发公众号支付时，在统一下单接口中要求必传用户openid，而获取openid则需要您在公众平台设置获取openid的域名(`注意测试和正式域名`),只有被设置过的域名才是一个有效的获取openid的域名，否则将获取失败

2.开发流程	
![enter image description here](https://pay.weixin.qq.com/wiki/doc/api/img/chapter7_4_1.png)

3.前端调用接口

- 用户打开微信通过跳转该链接获取用户code，区分测试/正式 appId，redirect_uri:编码后的本地地址

    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';

- 通过以下接口(post),参数code,取用户的openId,
```
测试：'http://test.joyjk.com:8081/wechat/oauth'
正式:'http://www.juyuejk.com:8081/wechat/oauth'

```
-  通过openId调用以下方法，获取用户的支付回调参数

     var searchData = {
                        orderId: FriendPay.data.orderId,
                        payWayCode: 'WXZF',
                        payType: 'wap',
                        calltype: FriendPay.data.calltype,
                        returnUrl: window.location.href,
                        extra: {
                            openId: openId,
                            tradeType: 'JSAPI',
                            ip: returnCitySN.cip,
                            showUrl: window.location.href
                        }
                    };
    $.post('uniqueComservice2/base.do?do=httpInterface&module=orderService&method=choosePayWayUpgrade&flag=2', JSON.stringify(searchData ) ,function(data){})

4.判断是否为微信内打开

    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

微信内打开着执行公众号支付方法

    function onBridgeReady() {
      WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": appId,     //公众号名称，由商户传入
                "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": nonceStr, //随机串
                "package": package,
                "signType": signType,         //微信签名方式：
                "paySign": paySign //微信签名
            },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }

非微信则提示用户在微信中打开


**************
## 支付宝支付
> **参考** [支付宝H5支付流程](https://docs.open.alipay.com/203)

1.开发准备: 
-   支付宝开放平台已注册并实名认证，且创建应用
> `备注：创建应用的应用状态为"开发中"，则无法在线上正式调用接口`


-  对应的应用已经配置完毕且已上线


2.后端准备
-  下载SDK(已封装了签名&验签、HTTP接口请求等基础功能)
-   调用接口(亲友支付功能采用旧接口，此处API采用页面跳转类无需生成form表单)


3.调用流程：
 ![enter image description here](https://img.alicdn.com/top/i1/LB1inZBKFXXXXa6apXXXXXXXXXX)

4.前端调用接口

	   (post):module=orderService&method=choosePayWayUpgrade

接口(post):module=orderService&method=choosePayWayUpgrade 获取回调参数,encodeURIComponent()对参数进行编码拼接字符串。

5.判断是否为微信内打开
 - 微信中无法打开支付宝收款是微信浏览器限制所致，若非微信内核有浏览器，则直接跳转
	   
	    window.location.href =  'https://mapi.alipay.com/gateway.do?' + 拼接后的回调参数
- 微信游览器打开
	跳转至friendPay-ZFB页面（回调参数需要编码）提示用户在其他游览器中打开，执行
	

    window.location.href =  'https://mapi.alipay.com/gateway.do?' + 地址栏获取的编码参数








  