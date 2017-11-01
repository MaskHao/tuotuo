// add event handler        addEvenListener兼容
var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

// inner variables
var dragItems;
updateDataTransfer();
var dropAreas = document.querySelectorAll('[droppable=true]');
console.log(dropAreas.length);

// preventDefault (stops the browser from redirecting off to the text)  阻止默认事件
function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

// update event handlers
function updateDataTransfer() {
    dragItems = document.querySelectorAll('[draggable=true]');
    for (var i = 0; i < dragItems.length; i++) {
        addEvent(dragItems[i], 'dragstart', function (event) {
            event.dataTransfer.setData('obj_id', this.id);
            return false;
        });
    }
}

addEvent(dropAreas, 'dragover', function (event) {
    if (event.preventDefault) event.preventDefault();
    return false;
});

// dragleave event handler
addEvent(dropAreas, 'dragleave', function (event) {
    if (event.preventDefault) event.preventDefault();
    return false;
});

addEvent(dropAreas, 'dragenter', cancel);

// drop event handler
addEvent(dropAreas, 'drop', function (event) {
    if (event.preventDefault) event.preventDefault();

    // get dropped object
    var iObj = event.dataTransfer.getData('obj_id');
    var oldObj = document.getElementById(iObj);

    // get its image src
    var oldSrc = oldObj.childNodes[0].src;
    var cls = oldObj.className;

    console.log("id="+iObj+"//className="+cls);//拖动元素的id名
    oldObj.className += 'hidden';
    var oldThis = this;
    setTimeout(function() {
        oldObj.parentNode.removeChild(oldObj); // remove object from DOM
        oldThis.innerHTML += '<a id="'+iObj+'" class="'+cls+'" draggable="true"><img src="'+oldSrc+'" /></a>';

        updateDataTransfer();

    }, 500);

    return false;
});

