;(function(){
    var container = document.querySelector('.doc-container'),
        teamNum = 1,
        templates = [],
        animateIntervalID = '';

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

    function productTemplate(i){
        var template =
            ' <div class="item">\
                    <div class="wrap">\
                    <span class="avatar"><img src= '+ docMsgs[i].avatar +' alt="" width="389" height="389"></span>\
                <span class="msg">\
                <div class="tit-wrap"><span class="name">' + docMsgs[i].name +'</span><span class="tit">'+ docMsgs[i].tit +'</span></div>\
                <p class="content">'+ docMsgs[i].intro +'</p>\
            <div class="hos">\
                <span class="hos-name">\
                <img src="./images-new/hos.png" alt="">\
                <span class="name">' + docMsgs[i].hos + '</span>\
                </span>\
                <span class="others"><img src= '+ docMsgs[i].teamImg +' alt=""></span>\
                </div>\
                </span>\
                </div>\
                </div>\
                <div class="item">\
                <div class="wrap">\
                <span class="avatar"><img src='+ docMsgs[i + 1].avatar +' alt="" width="389" height="389"></span>\
                <span class="msg">\
                <div class="tit-wrap"><span class="name">' + docMsgs[i + 1].name +'</span><span class="tit">'+ docMsgs[i + 1].tit +'</span></div>\
                <p class="content">'+ docMsgs[i + 1].intro +'</p>\
            <div class="hos">\
                <span class="hos-name">\
                <img src="./images-new/hos.png" alt="">\
                <span class="name">' + docMsgs[i + 1].hos + '</span>\
                </span>\
                <span class="others"><img src='+ docMsgs[i + 1].teamImg +' alt=""></span>\
                </div>\
                </span>\
                </div>\
                </div>';

        return template;
    }
    function getNodes(){
        for(var j = 0; j < docMsgs.length; j = j + 2){
            var node = document.createElement('div');
            addClass(node, 'msg-wrap');
            node.innerHTML = productTemplate(j)
            templates.push(node);
        }
    }
    function animate(){
        if(teamNum >= docMsgs.length / 2)   teamNum = 0;
        var currentNode = container.children[0],
            nextNode = templates[teamNum];
            container.appendChild(nextNode);
        if(currentNode == nextNode) console.log('11111');
        if(currentNode != nextNode && !containClass(currentNode, ROLLIN) && !containClass(currentNode, ROLLOUT)){
            nextNode.style.opacity = '0';
            // nextNode.style.transform = 'rotate3d(0,1,0,180deg)';
            animateClass(currentNode, ROLLOUT, function () {
                currentNode.style.opacity = '0';
                removeClass(currentNode, ROLLOUT);
                console.log(container.children);
                container.removeChild(currentNode);
            })
            animateClass(nextNode, ROLLIN, function () {
                removeClass(nextNode, ROLLIN);
                nextNode.style.opacity = '1';
            })
            teamNum = teamNum + 1;
        }
    }
    function rotatePage(){
        return animateIntervalID = setInterval(animate, ANIMATETIME);
    }
    function stopRotatePage(){
        return clearInterval(animateIntervalID);
    }
    function main(){
        getNodes();
        container.appendChild(templates[0]);
        var body = document.body;
        // rotatePage();
        setTimeout(rotatePage, 10000);
        body.addEventListener('keyup', function (event) {
            if(event.code == 'Space'){
                stopRotatePage();
                animate();
                rotatePage();
            }
        })
    }
    main();
}())