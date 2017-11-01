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
];
var AVATARPATH = './images-new/images-new-avatar/';
var docMsgs = [
    {
        name: '高凌云',
        avatar: AVATARPATH + '高凌云' + '.jpg',
        tit: '主管医生（高血压、冠心病）',
        intro: '副主任医师，副教授，博士后。2006年毕业于第三军医大学，获内科学博士学位。主持并参与多项课，发表中英文论文20余篇。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '顾俊',
        avatar: AVATARPATH + '顾俊' + '.jpg',
        tit: '主管医生（心血管疾病）',
        intro: '医学硕士，住院医师。参与翻译专著1本，发表学术文章4篇。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '何泉',
        avatar: AVATARPATH + '何泉' + '.jpg',
        tit: '主管医生（高血压）',
        intro: '副主任医师，副教授，医学博士。中华医学会心电生理和起搏分会青年委员、中国生物医学工程学会心律分会房颤工作委员会委员。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '向睿',
        avatar: AVATARPATH + '向睿' + '.jpg',
        tit: '主管医生（心血管疾病）',
        intro: '医学博士，中共党员，发表SCI 1篇，国内核心期刊CSCD 2篇。参与完成心血管介入手术2000余例。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '张冬颖',
        avatar: AVATARPATH + '张冬颖' + '.jpg',
        tit: '主管医生（高血压、冠心病）',
        intro: '副主任医师，医学博士，副教授，硕士生导师。瑞典卡罗林斯卡医学院博士学位。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '肖骅 ',
        avatar: AVATARPATH + '肖骅' + '.jpg',
        tit: '主管医生（心血管疾病）',
        intro: '副教授，副主任医师，医学博士，硕士生导师。担任重庆医科大学附属第一医院九三学社副主任委员，中华医学会重庆心血管分会青年委员。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '张楠 ',
        avatar: AVATARPATH + '张楠' + '.jpg',
        tit: '主管医生（心血管疾病）',
        intro: '医学博士，住院医师，主要研究方向为冠心病与microRNA分子机制。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '段兴连 ',
        avatar: AVATARPATH + '段兴连' + '.jpg',
        tit: '医学顾问 （心血管疾病）',
        intro: '医学硕士，住院医生。',
        hos: '聚悦健康',
        teamImg: 'tt.png'
    },
    {
        name: '杨云静 ',
        avatar: AVATARPATH + '杨云静' + '.jpg',
        tit: '医学顾问 （心血管疾病）',
        intro: '住院医师，在读内科学博士学位。 参与多项国家级、国际合作和市级科研项目研究。发表SCI论文及中文文章4篇。',
        hos: '聚悦健康',
        teamImg: 'tt.png'
    },
    {
        name: '廖宏',
        avatar: AVATARPATH + '廖宏' + '.jpg',
        tit: '健康顾问 （护理）',
        intro: '2015年毕业于中南大学，2012年12月取得护士职业资格证书。2012年8月到2016年4月在重庆市第四人民医院泌尿外科工作。',
        hos: '聚悦健康',
        teamImg: 'tt.png'
    },
    {
        name: '张晓刚 ',
        avatar: AVATARPATH + '张晓刚' + '.jpg',
        tit: '首席专家（冠心病、高血压）',
        intro: '主任医师，教授，医学博士，硕士生导师，擅长治疗冠心病、高血压病。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
    {
        name: '张冬颖',
        avatar: AVATARPATH + '张冬颖' + '.jpg',
        tit: '主管医生（高血压、冠心病）',
        intro: '副主任医师，医学博士，副教授，硕士生导师。瑞典卡罗林斯卡医学院博士学位。',
        hos: '重庆医科大学附属第一医院',
        teamImg: 'tt.png'
    },
];

//假日期相关   在做完setTimes计算后，当前日期比真实时间慢一个小时
var currentDate = new Date();
currentDate.setHours(currentDate.getHours() - 2);
var times = [];

function getTimeString(time) {
    if (time.getMinutes() < 10) {
        return time.getFullYear() + '-' + Number(time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':0' + time.getMinutes();
    } else {
        return time.getFullYear() + '-' + Number(time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
    }
}

function setTimes() {
    for (var i = 0; i < 32; i++) {
        currentDate.setMinutes(Number(currentDate.getMinutes() + 2));
        times.push(getTimeString(currentDate));
    }
}

setTimes();
console.log(times);


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

console.log(scrollData);
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

    var disCotain = document.querySelector('.chart-container'),
        careCotain = document.querySelector('.care-container');
    disCotain.style.opacity = '0';
    careCotain.style.opacity = '1';
    //scroll相关
    var msgContainer = document.querySelector('.msg-container');
    var msgsSection = msgContainer.querySelector('ul');
    msgsSection.style.top = '-12%';
    var msgs = [];

    var docContainer = document.querySelector('.doc-container');
    var docSection = docContainer.querySelector('ul');


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
        var msg = $(".msg");
        if (msg) {
            var li = msg.eq(0);
            var s = new TimelineMax();
            s.to(msg, 2, {
                y: -li.height() - 20, delay: 5, onComplete: function () {
                    s.set(msg, {y: 0});
                    $(".msg-container .ulScroll").append(li.clone());
                    li.remove();
                    scroll();
                }
            });
        }

    }

    function docScroll() {
        var doc = $(".doc");
        if (doc) {
            var li = doc.eq(0);
            var t = new TimelineMax();
            t.to(doc, 3, {
                y: -li.height() - 54, delay: 3, onComplete: function () {
                    t.set(doc, {y: 0});
                    $(".doc-container .ulScroll").append(li.clone());
                    li.remove();
                    docScroll();
                }
            })
        }
    }


    function stopScroll() {
        return clearInterval(scrollIntervalID);
    }

    //切换显示状态
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

    //自动切换显示状态
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

    function addDocScrollData() {
        var content = '';
        for (var i = 0; i < docMsgs.length; i++) {
            content += ' <li class="doc"> ' +
                '<div class="avatar" style="background-image: url(' + docMsgs[i].avatar + ')"></div>' +
                '<p class="content">' + docMsgs[i].intro + '</p>' +
                '<div class="doc-msg">' +
                '<p class="doc-name">' + docMsgs[i].name + '</p>' +
                '<span class="doc-job">' + docMsgs[i].tit + '</span>' +
                '</div>' +
                '<div class="doc-hos">' +
                '<img class="hos-img" src="images-new/hos.png" height="38" width="40"/>' +
                '<span class="hos-name">' + docMsgs[i].hos + '</span>' +
                '</div>' +
                '</li>'
        }
        docSection.innerHTML = content;
    }

    function setTime() {
        if (arguments.length !== 0) {
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
            docSection.innerHTML = '';
            addDocScrollData();
            updateStaticData();
        }
    }

    function updateStaticData() {
        var lastSaveTime = localStorage.lastSaveTime ? new Date(Number(localStorage.lastSaveTime)) : new Date(2016, 9, 10, 1);
        var teamNum = 82,
            userNum = 12652,
            monitorUsers = 11974,
            exchangeNum = 103080,
            totalMonitorNum = 89413,
            warningNum = 4304,
            suggests = 46,
            medicalRecord = getStaticData('medicalRecord', lastSaveTime.getTime());

        showCareData(teamNum, userNum, monitorUsers, exchangeNum, totalMonitorNum, warningNum, suggests, medicalRecord);

        localStorage.lastSaveTime = currentDate.getTime();
    }

    //doc-container 模板
    function showCareData(teamNum, userNum, monitorUsers, exchangeNum, totalMonitorNum, warningNum, suggests, medicalRecord) {
        var template =
            '<div class="care-tit"><img src="./images-new/care-banner.png" height="189" width="446"/></div>\
            <div class="care r-1 c-1">\
            <div class="data">\
            <div class="num">医生团数</div>\
            <div class="tit">' + teamNum + '</div>\
            </div>\
            </div>\
            <div class="care r-1 c-2">\
            <div class="data">\
            <div class="num">总用户数</div>\
            <div class="tit">' + userNum + '</div>\
            </div>\
            </div>\
            <div class="care r-1 c-3">\
            <div class="data">\
            <div class="num">监测用户</div>\
            <div class="tit">' + monitorUsers + '</div>\
            </div>\
            </div>\
            <div class="care r-1 c-4">\
            <div class="data">\
            <div class="num">交流次数</div>\
            <div class="tit">' + exchangeNum + '</div>\
            </div>\
            </div>\
            <div class="care r-2 c-1">\
            <div class="data">\         \
               <div class="num">总监测数</div>\
            <div class="tit">' + totalMonitorNum + '</div>\
            </div>\
            </div>\
            <div class="care r-2 c-2">\
            <div class="data">\  \
            <div class="num">处理预警量</div>\
            <div class="tit">' + warningNum + '</div>\
            </div>\
            </div>\
            <div class="care r-2 c-3">\
            <div class="data">\
            <div class="num">处置建议</div>\
            <div class="tit">' + suggests + '</div>\
            </div>\
            </div>\
            <div class="care r-2 c-4">\
            <div class="data">\
            <div class="num">门诊病历</div>\
            <div class="tit">' + medicalRecord + '</div>\
            </div>\
            </div>';
        careCotain.innerHTML = template;
    }

    function getStaticData(name, lastSaveTime) {
        var staticNum = Number(localStorage[name]);
        if (staticNum && lastSaveTime) {
            var basicDate = new Date(Number(lastSaveTime)),
                differDay = Math.floor((currentDate - basicDate) / (1000 * 60 * 60 * 24)),
                randomNum = Math.random();
            switch (name) {
                case 'teamNum':
                    for (var i = 0; i < differDay; i++) {
                        if (Math.random() > 0.7)
                            ++staticNum;
                    }
                    break;
                case 'userNum':
                    staticNum = staticNum + Math.floor(40 + 20 * randomNum) * differDay;
                    break;
                case 'monitorUsers':
                    staticNum = staticNum + Math.floor(10 + 10 * randomNum) * differDay;
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
                    staticNum = staticNum + Math.ceil(50 + 50 * randomNum) * differDay;
                    break;
                case 'medicalRecord':
                    staticNum = staticNum + Math.ceil(40 + 30 * randomNum) * differDay;
                    break;
            }
        } else {
            var basicDate = new Date(2016, 9, 20, 1);
            differDay = Math.floor((currentDate - basicDate) / (1000 * 60 * 60 * 24)),
                randomNum = Math.random();
            switch (name) {
                case 'teamNum':
                    staticNum = 31;
                    for (var i = 0; i < differDay; i++) {
                        if (Math.random() > 0.7)
                            ++staticNum;
                    }
                    break;
                case 'userNum':
                    staticNum = 3158 + Math.floor(40 + 20 * randomNum) * differDay;
                    break;
                case 'monitorUsers':
                    staticNum = 787 + Math.floor(10 + 10 * randomNum) * differDay;
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
                    staticNum = 15776 + Math.ceil(50 + 50 * randomNum) * differDay;
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
    addDocScrollData();
    updateStaticData();
    scroll();
    docScroll();
    rotatePage();
    body.addEventListener('keydown', function (event) {
        if (event.code == "Space") {
            stopPageRotate();
            rotateHandler();
            rotatePage();
        }
    })
}());









