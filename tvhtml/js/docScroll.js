var AVATARPATH = './images-new/images-new-avatar/';
var docMsgs = [
    {
        name: '高凌云',
        avatar: AVATARPATH + '高凌云' +  '.jpg',
        tit:'主管医生（高血压、冠心病）',
        intro:'副主任医师，副教授，博士后。2006年毕业于第三军医大学，获内科学博士学位。主持并参与多项课，发表中英文论文20余篇。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '顾俊',
        avatar: AVATARPATH + '顾俊' +  '.jpg',
        tit:'主管医生（心血管疾病）',
        intro:'医学硕士，住院医师。参与翻译专著1本，发表学术文章4篇。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '何泉',
        avatar: AVATARPATH + '何泉' +  '.jpg',
        tit:'主管医生（高血压）',
        intro:'副主任医师，副教授，医学博士。中华医学会心电生理和起搏分会青年委员、中国生物医学工程学会心律分会房颤工作委员会委员。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '向睿',
        avatar: AVATARPATH + '向睿' +  '.jpg',
        tit:'主管医生（心血管疾病）',
        intro:'医学博士，中共党员，发表SCI 1篇，国内核心期刊CSCD 2篇。参与完成心血管介入手术2000余例。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '张冬颖',
        avatar: AVATARPATH + '张冬颖' +  '.jpg',
        tit:'主管医生（高血压、冠心病）',
        intro:'副主任医师，医学博士，副教授，硕士生导师。瑞典卡罗林斯卡医学院博士学位。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '肖骅 ',
        avatar: AVATARPATH + '肖骅' +  '.jpg',
        tit:'主管医生（心血管疾病）',
        intro:'副教授，副主任医师，医学博士，硕士生导师。担任重庆医科大学附属第一医院九三学社副主任委员，中华医学会重庆心血管分会青年委员。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '张楠 ',
        avatar: AVATARPATH + '张楠' +  '.jpg',
        tit:'主管医生（心血管疾病）',
        intro:'医学博士，住院医师，主要研究方向为冠心病与microRNA分子机制。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '段兴连 ',
        avatar: AVATARPATH + '段兴连' +  '.jpg',
        tit:'医学顾问 （心血管疾病）',
        intro:'医学硕士，住院医生。',
        hos:'聚悦健康',
        teamImg:'tt.png'
    },
    {
        name: '杨云静 ',
        avatar: AVATARPATH + '杨云静' +  '.jpg',
        tit:'医学顾问 （心血管疾病）',
        intro:'住院医师，在读内科学博士学位。 参与多项国家级、国际合作和市级科研项目研究。发表SCI论文及中文文章4篇。',
        hos:'聚悦健康',
        teamImg:'tt.png'
    },
    {
        name: '廖宏',
        avatar: AVATARPATH + '廖宏' +  '.jpg',
        tit:'健康顾问 （护理）',
        intro:'2015年毕业于中南大学，2012年12月取得护士职业资格证书。2012年8月到2016年4月在重庆市第四人民医院泌尿外科工作。',
        hos:'聚悦健康',
        teamImg:'tt.png'
    },
    {
        name: '张晓刚 ',
        avatar: AVATARPATH + '张晓刚' +  '.jpg',
        tit:'首席专家（冠心病、高血压）',
        intro:'主任医师，教授，医学博士，硕士生导师，擅长治疗冠心病、高血压病。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    },
    {
        name: '张冬颖',
        avatar: AVATARPATH + '张冬颖' +  '.jpg',
        tit:'主管医生（高血压、冠心病）',
        intro:'副主任医师，医学博士，副教授，硕士生导师。瑞典卡罗林斯卡医学院博士学位。',
        hos:'重庆医科大学附属第一医院',
        teamImg:'tt.png'
    }
];
var animateIntervalID;
(function () {
    console.log(2222)
    var container = document.querySelector('.doc-container'),
        teamNum = 1,
        templates = [];

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
            removeClass(node, className);

            node.removeEventListener('animationend', onAnimateEnd)
            // 3. 执行回调   回调函数的作用就是移除container
            callback && callback();
        }

        // 1. 添加类名触发animation
        addClass(node, className);
        //监听动画执行完
        node.addEventListener('animationend', onAnimateEnd)

    }

    function productTemplate(i) {
        var template =
            ' <div class="item">\
                    <div class="wrap">\
                    <span class="avatar"><img src= ' + docMsgs[i].avatar + ' alt="" width="389" height="389"></span>\
                <span class="msg">\
                <div class="tit-wrap"><span class="name">' + docMsgs[i].name + '</span><span class="tit">' + docMsgs[i].tit + '</span></div>\
                <p class="content">' + docMsgs[i].intro + '</p>\
            <div class="hos">\
                <span class="hos-name">\
                <img src="./images-new/hos.png" alt="">\
                <span class="name">' + docMsgs[i].hos + '</span>\
                </span>\
                <span class="others"><img src= ' + docMsgs[i].teamImg + ' alt=""></span>\
                </div>\
                </span>\
                </div>\
                </div>\
                <div class="item">\
                <div class="wrap">\
                <span class="avatar"><img src=' + docMsgs[i + 1].avatar + ' alt="" width="389" height="389"></span>\
                <span class="msg">\
                <div class="tit-wrap"><span class="name">' + docMsgs[i + 1].name + '</span><span class="tit">' + docMsgs[i + 1].tit + '</span></div>\
                <p class="content">' + docMsgs[i + 1].intro + '</p>\
            <div class="hos">\
                <span class="hos-name">\
                <img src="./images-new/hos.png" alt="">\
                <span class="name">' + docMsgs[i + 1].hos + '</span>\
                </span>\
                <span class="others"><img src=' + docMsgs[i + 1].teamImg + ' alt=""></span>\
                </div>\
                </span>\
                </div>\
                </div>';

        return template;
    }

    function getNodes() {
        for (var j = 0; j < docMsgs.length; j = j + 2) {
            var node = document.createElement('div');
            addClass(node, 'msg-wrap');
            node.innerHTML = productTemplate(j)
            templates.push(node);
        }
        console.log(templates);
    }

    function animate() {
        if (teamNum >= docMsgs.length / 2)   teamNum = 0;
        var currentNode = container.children[0],

            nextNode = templates[teamNum];
        debugger
        console.log(currentNode)
        container.appendChild(nextNode);
        if (currentNode == nextNode) console.log('11111');
        if (currentNode != nextNode) {
            nextNode.style.opacity = '0';
            animateClass(currentNode, ROLLOUT, function () {
                currentNode.style.opacity = '0';
                container.removeChild(currentNode);
            })
            animateClass(nextNode, ROLLIN, function () {
                nextNode.style.opacity = '1';
            })
            teamNum = teamNum + 1;
        }
    }

    function rotatePage() {
        animateIntervalID = setInterval(animate, ANIMATETIME);
    }

    function stopRotatePage() {
        return clearInterval(animateIntervalID);
    }

    function SwitchDoctor(i) {
        var msg = $('.msg-wrap');
        var j = i + 1 > msg.length - 1 ? 0 : i + 1;
        TweenMax.set(msg.eq(i), {"rotationY": 0});
        TweenMax.set(msg.eq(j), {"rotationY": 90});
        TweenMax.to(msg.eq(i), 2, {"rotationY": 90, "opacity": 0, delay: 8});
        TweenMax.to(msg.eq(j), 2, {  "rotationY": 0, "opacity": 1, delay: 10, onComplete: function () { SwitchDoctor(j) }});
    }


    function main() {
        getNodes();
        for(var j = 0; j < templates.length; j++){
            container.appendChild(templates[j]);
            if(j != 0){
                $('.msg-wrap').eq(j).css("opacity", "0");
            }
        }
        // container.appendChild(templates[0]);
        // container.appendChild(templates[1]);

        var body = document.body;
        SwitchDoctor(0);
        //rotatePage();
        //body.addEventListener('keyup', function (event) {
        //    if (event.code == 'Space') {
        //        stopRotatePage();
        //        animate();
        //        rotatePage();
        //    }
        //})
    }

    main();
}())