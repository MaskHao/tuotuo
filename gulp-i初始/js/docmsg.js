var animateIntervalID;
(function () {
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
    }

    function animate() {
        if (teamNum >= docMsgs.length / 2)   teamNum = 0;
        var currentNode = container.children[0],
            nextNode = templates[teamNum];
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