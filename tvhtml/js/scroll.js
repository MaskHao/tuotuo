var userActions = [
    '填写了一次体重值，62.0Kg。',
    '填写了一次心率值，80次/分。',
    '填写了一次血压值，收缩压120mmHg，舒张压93mmHg。',
    '填写了一次随访。',
    '填写了一次饮食记录，小麦200g，白粥100g。',
    '填写了一次饮食记录，香大米300g，豆腐干（熏干）100g，毛豆100g。',
    '填写了一次饮食记录，大米200g，猪肉100g，番茄100g。',
    '填写了一次饮食记录，可乐100g，饼干50g。',
    '填写了一次运动，慢跑30分钟。',
    '填写了一次心情，开心。',
    '填写了一次呼吸，18次/分钟。',
    '填写了一次尿量，400ml。',
    '填写了一次血氧，97%。',
    '填写了一次服务评价，医生认真细心，按照医嘱进行，血压一直稳定。',
    '填写了一次基础评估，已提交给高血压服务团队。',
    '订购了孕期糖尿病服务套餐。',
    '升级心衰服务套餐。',
    '升级糖尿病服务套餐。',
    '升级心衰服务套餐。',
    '订购了基础服务套餐。',
    '订购了慢阻肺服务套餐。',
    '填写了一次呼吸，15次/分钟。'
]
var doctsActions = [
    '制定了一份健康计划，已发送给王奇峰用户。',
    '进行了一次问诊，已发送给陈俊宏用户。',
    '填写了一张处方，头孢他啶片/1g，口服，每日两次，每次三片。',
    '发起了一次疼痛程度的评估，患者已反馈，评估得分3分，提示轻度疼痛，表示疼痛能够忍受，不影响工作生活。',
    '发起了一次焦虑抑郁症评估，患者已反馈，评估得分6分，提示可能有轻度焦虑抑郁症，建议患者及时咨询心理医生或心理医学工作者。',
    '发起了一次高血压危险程度评估，患者已反馈，评估提示低危，建议继续规范化治疗和日常生活管理。',
    '发起了一次“生活方式风险”的评估，患者已反馈，评估提示目前生活方式良好，风险低，建议继续保持良好的生活方式。',
    '发起了一次“COPD阶段性”的评估，患者已反馈，评估结果提示目前病情属于慢性稳定期，建议继续规范化的治疗和日常生活管理。',
    '发起了一次约诊，已发送给黄国云用户。',
    '发起了一次协同任务，已发送给毛敏医生。',
    '发起了一次对林嘉宏用户的查房。'
];
var users = [
    '王山米用户',
    '林亚珍用户',
    '杨德清用户',
    '袁波用户',
    '谢克希用户',
    '汪思敏用户',
    '周乐明用户',
    '林春飞用户',
    '曹平用户',
    '黄华强用户',
    '陈云杰用户',
    '张传仓用户',
    '徐洋用户',
    '方明乐用户',
    '周毅用户',
    '张培英用户',
    '王梓任用户',
    '张恒用户',
    '边楠用户',
    '刘海林用户',
    '林嘉宏用户',
    '吴华江用户'
];
var docts = [
    '常静医生',
    '黄玮医生',
    '周建中医生',
    '肖登医生',
    '王我医生',
    '张楠医生',
    '毛敏医生',
    '何靖医生',
    '朱竹青医生',
    '万里洋医生',
    '张爽医生'
]
//假日期相关   在做完setTimes计算后，当前日期比真实时间慢一个小时
var currentDate = new Date();
currentDate.setHours(currentDate.getHours() - 2);
var times = [];

function getTimeString(time){
    if(time.getMinutes() < 10){
        return time.getFullYear() + '年' + Number(time.getMonth() + 1) + '月' + time.getDate() + '日,' + time.getHours() + '：0' + time.getMinutes();
    } else {
        return time.getFullYear() + '年' + Number(time.getMonth() + 1) + '月' + time.getDate() + '日,' + time.getHours() + '：' + time.getMinutes();
    }
}

function setTimes(){
    for(var i = 0; i < 32; i++){
        currentDate.setMinutes(Number(currentDate.getMinutes() + 2));
        times.push(getTimeString(currentDate));
    }
}
setTimes();



var scrollData = [];

function productDataItem(i) {
    var userID = Math.floor(Math.random() * times.length);
    if (userID >= users.length) {
        var doctID = userID - users.length,
            doctActionID = Math.floor(Math.random() * doctsActions.length);
        //if (doctID || doctActionID > 11)
        //    console.log('doctActionID' + doctActionID);
        return {
            tit: doctsActions[doctActionID],
            time: times[i] + ' - ' + docts[doctID]
        }
    }
    var userActionID = Math.floor(Math.random() * userActions.length);
    return {
        tit: userActions[userActionID],
        time: times[i] + ' - ' + users[userID]
    }
}

function productData() {
    for (var i = 0; i < times.length; i++) {
        var item = productDataItem(i);
        scrollData.push(item);
    }
    // userActions = null;
    // doctsActions = null;
    // users = null;
    // docts = null;
}


;(function () {
    productData();
    // productData = productDataItem = null;

    var ROLLIN = "rollin",
        ROLLOUT = "rollout",
        SCROLLTIME = 10000,
        ROTATEPAGETIME = 25000;

    var body = document.body,
        star = document.querySelector('.star'),
        star2 = document.querySelector('.star2'),
        star3 = document.querySelector('.star3');

    var scrollIntervalID,
        rotatePageIntervalID,
        up = 0;

    var disCotain = document.querySelector('.dis-container'),
        careCotain = document.querySelector('.care-container');
    disCotain.style.opacity = '0';
    careCotain.style.opacity = '1';
    //scroll相关
    var container = document.querySelector('.msg-container');
    var msgsSection = container.querySelector('ul');
    msgsSection.style.top = '-12%';
    var msgs = [];



    function addClass(node, className) {
        if (node.classList) {
            node.classList.add(className);
        } else {
            var current = node.className || "";
            if ((" " + current + "").indexOf(" " + className + " ") === -1) {
                node.className = current ? ( current + " " + className) : className;
            }
        }
    }

    function removeClass(node, className) {
        if (node.classList) {
            node.classList.remove(className);
        } else {
            var current = node.className || "";
            node.className = current.replace(" " + className + " ", " ").trim();
        }
    }

    function containClass(node, className) {
        if (node.classList.contains) {
            return node.classList.contains(className);
        }
        var current = node.className || "";
        if ((" " + current + " ").indexOf(" " + className + " ") === -1)
            return false;
        else
            return true;
    }

    function animateClass(node, className, callback) {

        function onAnimateEnd() {

            // 2. 移除类名
            delClass(node, className);

            node.removeEventListener('animationend', onAnimateEnd)
            // 3. 执行回调   回调函数的作用就是移除container
            callback && callback();
        }

        // 1. 添加类名触发animation
        addClass(node, className);
        //监听动画执行完
        node.addEventListener('animationend', onAnimateEnd)

    }

    function scroll() {
        //scrollIntervalID = setInterval(function () {
        //    if (msgsSection.style.top == '0%' && Math.abs(up) >= scrollData.length
        //        || msgsSection.style.top == '88%' && Math.abs(up) >= scrollData.length + 4) {
        //        up = 1;
        //        msgsSection.style.top = '88%';
        //    }
        //    up = up - 1;
        //    if (up === 0) {
        //        msgsSection.style.visibility = 'hidden';
        //    } else {
        //        msgsSection.style.visibility = 'visible';
        //    }
        //    msgs.forEach(function (item, index) {
        //        item.style.transform = 'translateY(' + up * 100 + '%)';
        //    })
        //
        //}, SCROLLTIME);
        var msg = $(".msg");
        if (msg) {
            var li = msg.eq(0);
            TweenMax.to(msg, 2, { y: -li.height() - 20, delay: 5, onComplete: function () { TweenMax.set(msg, {y: 0});$(".ulScroll").append(li.clone());li.remove(); scroll();}});
        }
    }


    function stopScroll() {
        return clearInterval(scrollIntervalID);
    }

    function rotateHandler() {
        if (containClass(disCotain, ROLLIN) && containClass(careCotain, ROLLOUT)) {
            removeClass(disCotain, ROLLIN);
            removeClass(careCotain, ROLLOUT);
            addClass(disCotain, ROLLOUT);
            addClass(careCotain, ROLLIN);
            //stopScroll();
        } else if (containClass(disCotain, ROLLOUT) && containClass(careCotain, ROLLIN)) {
            removeClass(disCotain, ROLLOUT);
            removeClass(careCotain, ROLLIN);
            addClass(disCotain, ROLLIN);
            addClass(careCotain, ROLLOUT);
            //scroll();
        } else {
            addClass(disCotain, ROLLIN);
            addClass(careCotain, ROLLOUT);
            //scroll();
        }
    }

    function rotatePage() {
        rotatePageIntervalID = setInterval(rotateHandler, ROTATEPAGETIME);
    }

    function stopPageRotate() {
        return clearInterval(rotatePageIntervalID);
    }

    function drawStar(star) {
        var star = star.cloneNode(true);
        body.appendChild(star);
        star.style.top = getPos();
        star.style.left = getPos();
    }

    function getPos() {
        return Math.random().toFixed(3) * 100 + '%';
    }

    function drawStars() {
        var starNum = 30,
            star2Num = 20,
            star3Num = 10;
        for (var i = 0; i < starNum; i++) {
            drawStar(star);
        }
        for (var i = 0; i < star2Num; i++) {
            drawStar(star2);
        }
        for (var i = 0; i < star3Num; i++) {
            drawStar(star3);
        }
    }

    function addscrollData() {
        var appendString = '';
        for (var i = 0; i < scrollData.length; i++) {
            appendString +=
                '<li class="msg">\
                    <div class="underline"></div>\
                    <div class="tit">' + scrollData[i].tit + '</div>\
                    <div class="time">' + scrollData[i].time + '</div>\
                </li>';
        }
        msgsSection.innerHTML = appendString;
        msgs = msgsSection.querySelectorAll('li');
        msgs = [].slice.call(msgs);
    }

    function setTime(){
        console.log(222222222222222222222222);
        if(arguments.length !== 0){
            var month = arguments[0],
                date = arguments[1],
                hour = arguments[2],
                minute = arguments[3];
            currentDate.setMonth(month - 1);
            currentDate.setDate(date);
            currentDate.setHours(hour);
            currentDate.setMinutes(minute);
            times = [];
            setTimes();
            scrollData = [];
            productData();
            msgsSection.innerHTML = '';
            addscrollData();
            updateStaticData();
        }
    }

    function updateStaticData(){
        var lastSaveTime = localStorage.lastSaveTime ?  new Date(Number(localStorage.lastSaveTime)) : new Date(2016, 9, 10, 1);

        // var teamNum = getStaticData('teamNum', lastSaveTime.getTime()),
        //     userNum =  getStaticData('userNum', lastSaveTime.getTime()),
        //     monitorUsers = getStaticData('monitorUsers', lastSaveTime.getTime()),
        //     exchangeNum = getStaticData('exchangeNum', lastSaveTime.getTime()),
        //     totalMonitorNum = getStaticData('totalMonitorNum', lastSaveTime.getTime()),
        //     warningNum = getStaticData('warningNum', lastSaveTime.getTime()),
        //     suggests = getStaticData('suggests', lastSaveTime.getTime()),
        //     medicalRecord = getStaticData('medicalRecord', lastSaveTime.getTime());


        var teamNum = 82,
            userNum =  12652,
            monitorUsers = 11974,
            exchangeNum = 103080,
            totalMonitorNum = 89413,
            warningNum = 4304,
            suggests = 46,
            medicalRecord = getStaticData('medicalRecord', lastSaveTime.getTime());

        showCareData(teamNum,userNum, monitorUsers, exchangeNum, totalMonitorNum, warningNum, suggests, medicalRecord);

        localStorage.lastSaveTime = currentDate.getTime();
    }

    function showCareData(teamNum,userNum, monitorUsers, exchangeNum, totalMonitorNum, warningNum, suggests, medicalRecord){
        var template =
            '<div class="care-tit"><img src="./images-new/livedata.png" alt="" width="500" height="100"></div>\
            <div class="care r-1 c-1">\
            <div class="data">\
            <div class="tit">' + teamNum + '</div>\
            <div class="num">医生团数</div>\
            </div>\
            </div>\
            <div class="care r-1 c-2">\
            <div class="data">\
            <div class="tit">' + userNum + '</div>\
            <div class="num">总用户数</div>\
            </div>\
            </div>\
            <div class="care r-1 c-3">\
            <div class="data">\
            <div class="tit">' + monitorUsers + '</div>\
            <div class="num">监测用户</div>\
            </div>\
            </div>\
            <div class="care r-1 c-4">\
            <div class="data">\
            <div class="tit">' + exchangeNum + '</div>\
            <div class="num">交流次数</div>\
            </div>\
            </div>\
            <div class="care r-2 c-1">\
            <div class="data">\
            <div class="tit">' + totalMonitorNum + '</div>\
            <div class="num">总监测数</div>\
            </div>\
            </div>\
            <div class="care r-2 c-2">\
            <div class="data">\
            <div class="tit">' + warningNum + '</div>\
            <div class="num">处理预警量</div>\
            </div>\
            </div>\
            <div class="care r-2 c-3">\
            <div class="data">\
            <div class="tit">' + suggests + '</div>\
            <div class="num">处置建议</div>\
            </div>\
            </div>\
            <div class="care r-2 c-4">\
            <div class="data">\
            <div class="tit">' + medicalRecord +'</div>\
            <div class="num">门诊病历</div>\
            </div>\
            </div>';
        careCotain.innerHTML = template;
    }

    function getStaticData(name, lastSaveTime){
        var staticNum = Number(localStorage[name]);
        if(staticNum && lastSaveTime){
            var basicDate = new Date(Number(lastSaveTime)),
                differDay = Math.floor((currentDate - basicDate) / (1000 * 60 * 60 * 24)),
                randomNum = Math.random();
            switch (name){
                case 'teamNum':
                    for(var i = 0; i < differDay; i++){
                        if(Math.random() > 0.7)
                            ++staticNum;
                    }
                    break;
                case 'userNum':
                    staticNum = staticNum + Math.floor(40 + 20 * randomNum) * differDay;
                    break;
                case 'monitorUsers':
                    staticNum = staticNum +  Math.floor(10+ 10 * randomNum) * differDay;
                    break;
                case 'exchangeNum':
                    staticNum = staticNum + Math.floor(200 + 100 * randomNum) * differDay;
                    break;
                case 'totalMonitorNum':
                    staticNum = staticNum + Math.floor(50 + 50 * randomNum) * differDay;
                    break;
                case 'warningNum':
                    staticNum = staticNum + Math.ceil(10 + 5 * randomNum) * differDay;
                    break;
                case 'suggests':
                    staticNum = staticNum +  Math.ceil(50 + 50 * randomNum) * differDay;
                    break;
                case 'medicalRecord':
                    staticNum = staticNum + Math.ceil(40 + 30 * randomNum) * differDay;
                    break;
            }
        } else {
            var basicDate = new Date(2016, 9, 20, 1);
                differDay = Math.floor((currentDate - basicDate) / (1000 * 60 * 60 * 24)),
                randomNum = Math.random();
            switch (name){
                case 'teamNum':
                    staticNum = 31;
                    for(var i = 0; i < differDay; i++){
                        if(Math.random() > 0.7)
                            ++staticNum;
                    }
                    break;
                case 'userNum':
                    staticNum = 3158 + Math.floor(40 + 20 * randomNum) * differDay;
                    break;
                case 'monitorUsers':
                    staticNum = 787 +  Math.floor(10+ 10 * randomNum) * differDay;
                    break;
                case 'exchangeNum':
                    staticNum = 613934 + Math.floor(200 + 100 * randomNum) * differDay;
                    break;
                case 'totalMonitorNum':
                    staticNum = 15984 + Math.floor(50 + 50 * randomNum) * differDay;
                    break;
                case 'warningNum':
                    staticNum = 656 + Math.ceil(10 + 5 * randomNum) * differDay;
                    break;
                case 'suggests':
                    staticNum = 15776 +  Math.ceil(50 + 50 * randomNum) * differDay;
                    break;
                case 'medicalRecord':
                    staticNum = 131334 + Math.ceil(40 + 30 * randomNum) * differDay;
                    break;
            }
        }
        localStorage[name] = staticNum;
        return staticNum;
    }

    // updateStaticData();

    window.setTime = setTime;

    drawStars();
    addscrollData();
    updateStaticData();
    scroll();
    rotatePage();
    body.addEventListener('keydown', function (event) {
        if (event.code == "Space") {
            stopPageRotate();
            rotateHandler();
            rotatePage();
        }
    })
}());









