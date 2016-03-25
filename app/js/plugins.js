jQuery.iUtil = {
    getPosition: function(e) {
        var x = 0;
        var y = 0;
        var restoreStyle = false;
        var es = e.style;
        if (jQuery(e).css('display') == 'none') {
            oldVisibility = es.visibility;
            oldPosition = es.position;
            es.visibility = 'hidden';
            es.display = 'block';
            es.position = 'absolute';
            restoreStyle = true
        }
        var el = e;
        while (el) {
            x += el.getBoundingClientRect().left + (el.currentStyle && !jQuery.browser.opera ? parseInt(el.currentStyle.borderLeftWidth) || 0: 0);
            y += el.getBoundingClientRect().top + (el.currentStyle && !jQuery.browser.opera ? parseInt(el.currentStyle.borderTopWidth) || 0: 0);
            el = el.offsetParent
        }
        el = e;
        while (el && el.tagName && el.tagName.toLowerCase() != 'body') {
            x -= el.scrollLeft || 0;
            y -= el.scrollTop || 0;
            el = el.parentNode
        }
        if (restoreStyle) {
            es.display = 'none';
            es.position = oldPosition;
            es.visibility = oldVisibility
        }
        return {
            x: x,
            y: y
        }
    },
    getPositionLite: function(el) {
        var x = 0,
        y = 0;
        while (el) {
            x += el.getBoundingClientRect().left || 0;
            y += el.getBoundingClientRect().top || 0;
            el = el.offsetParent
        }
        return {
            x: x,
            y: y
        }
    },
    getSize: function(e) {
        var w = jQuery.css(e, 'width');
        var h = jQuery.css(e, 'height');
        var wb = 0;
        var hb = 0;
        var es = e.style;
        if (jQuery(e).css('display') != 'none') {
            wb = e.offsetWidth;
            hb = e.offsetHeight
        } else {
            oldVisibility = es.visibility;
            oldPosition = es.position;
            es.visibility = 'hidden';
            es.display = 'block';
            es.position = 'absolute';
            wb = e.offsetWidth;
            hb = e.offsetHeight;
            es.display = 'none';
            es.position = oldPosition;
            es.visibility = oldVisibility
        }
        return {
            w: w,
            h: h,
            wb: wb,
            hb: hb
        }
    },
    getSizeLite: function(el) {
        return {
            wb: el.offsetWidth || 0,
            hb: el.offsetHeight || 0
        }
    },
    getClient: function(e) {
        var h,
        w,
        de;
        if (e) {
            w = e.clientWidth;
            h = e.clientHeight
        } else {
            de = document.documentElement;
            w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
            h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight
        }
        return {
            w: w,
            h: h
        }
    },
    getScroll: function(e) {
        var t,
        l,
        w,
        h,
        iw,
        ih;
        if (e && e.nodeName.toLowerCase() != 'body') {
            t = e.scrollTop;
            l = e.scrollLeft;
            w = e.scrollWidth;
            h = e.scrollHeight;
            iw = 0;
            ih = 0
        } else {
            if (document.documentElement && document.documentElement.scrollTop) {
                t = document.documentElement.scrollTop;
                l = document.documentElement.scrollLeft;
                w = document.documentElement.scrollWidth;
                h = document.documentElement.scrollHeight
            } else if (document.body) {
                t = document.body.scrollTop;
                l = document.body.scrollLeft;
                w = document.body.scrollWidth;
                h = document.body.scrollHeight
            }
            iw = self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
            ih = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
        return {
            t: t,
            l: l,
            w: w,
            h: h,
            iw: iw,
            ih: ih
        }
    },
    getMargins: function(e, toInteger) {
        var el = jQuery(e);
        var t = el.css('marginTop') || '';
        var r = el.css('marginRight') || '';
        var b = el.css('marginBottom') || '';
        var l = el.css('marginLeft') || '';
        if (toInteger) return {
            t: parseInt(t) || 0,
            r: parseInt(r) || 0,
            b: parseInt(b) || 0,
            l: parseInt(l)
        };
        else return {
            t: t,
            r: r,
            b: b,
            l: l
        }
    },
    getPadding: function(e, toInteger) {
        var el = jQuery(e);
        var t = el.css('paddingTop') || '';
        var r = el.css('paddingRight') || '';
        var b = el.css('paddingBottom') || '';
        var l = el.css('paddingLeft') || '';
        if (toInteger) return {
            t: parseInt(t) || 0,
            r: parseInt(r) || 0,
            b: parseInt(b) || 0,
            l: parseInt(l)
        };
        else return {
            t: t,
            r: r,
            b: b,
            l: l
        }
    },
    getBorder: function(e, toInteger) {
        var el = jQuery(e);
        var t = el.css('borderTopWidth') || '';
        var r = el.css('borderRightWidth') || '';
        var b = el.css('borderBottomWidth') || '';
        var l = el.css('borderLeftWidth') || '';
        if (toInteger) return {
            t: parseInt(t) || 0,
            r: parseInt(r) || 0,
            b: parseInt(b) || 0,
            l: parseInt(l) || 0
        };
        else return {
            t: t,
            r: r,
            b: b,
            l: l
        }
    },
    getPointer: function(event) {
        var x = event.clientX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) || 0;
        var y = event.clientY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) || 0;
        return {
            x: x,
            y: y
        }
    },
    traverseDOM: function(nodeEl, func) {
        func(nodeEl);
        nodeEl = nodeEl.firstChild;
        while (nodeEl) {
            jQuery.iUtil.traverseDOM(nodeEl, func);
            nodeEl = nodeEl.nextSibling
        }
    },
    purgeEvents: function(nodeEl) {
        jQuery.iUtil.traverseDOM(nodeEl, 
        function(el) {
            for (var attr in el) {
                if (typeof el[attr] === 'function') {
                    el[attr] = null
                }
            }
        })
    },
    centerEl: function(el, axis) {
        var clientScroll = $.iUtil.getScroll();
        var windowSize = $.iUtil.getSize(el);
        if (!axis || axis == 'vertically') $(el).css({
            top: clientScroll.t + ((Math.max(clientScroll.h, clientScroll.ih) - clientScroll.t - windowSize.hb) / 2) + 'px'
        });
        if (!axis || axis == 'horizontally') $(el).css({
            left: clientScroll.l + ((Math.max(clientScroll.w, clientScroll.iw) - clientScroll.l - windowSize.wb) / 2) + 'px'
        })
    },
    fixPNG: function(el, emptyGIF) {
        var images = $('img[@src*="png"]', el || document),
        png;
        images.each(function() {
            png = this.src;
            this.src = emptyGIF;
            this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + png + "')"
        })
    }
}; [].indexOf || (Array.prototype.indexOf = function(v, n) {
    n = (n == null) ? 0: n;
    var m = this.length;
    for (var i = n; i < m; i++) if (this[i] == v) return i;
    return - 1
});
jQuery.iFisheye = {
    build: function(options) {
        return this.each(function() {
            var el = this;
            el.fisheyeCfg = {
                items: jQuery(options.items, this),
                container: jQuery(options.container, this),
                pos: jQuery.iUtil.getPosition(this),
                itemWidth: options.itemWidth,
                itemsText: options.itemsText,
                proximity: options.proximity,
                valign: options.valign,
                halign: options.halign,
                maxWidth: options.maxWidth
            };
            jQuery.iFisheye.positionContainer(el, 0);
            jQuery(window).bind('resize', 
            function() {
                el.fisheyeCfg.pos = jQuery.iUtil.getPosition(el);
                jQuery.iFisheye.positionContainer(el, 0);
                jQuery.iFisheye.positionItems(el)
            });
            jQuery.iFisheye.positionItems(el);
            // el.fisheyeCfg.items.bind('mouseover', 
            // function() {
            //     jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'block'
            // }).bind('mouseout', 
            // function() {
            //     jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'none'
            // });
            jQuery(document).bind('mousemove', 
            function(e) {
                var pointer = jQuery.iUtil.getPointer(e);
                var toAdd = 0;
                if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'center') var posx = pointer.x - el.fisheyeCfg.pos.x - (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) / 2 - el.fisheyeCfg.itemWidth / 2;
                else if (el.fisheyeCfg.halign && el.fisheyeCfg.halign == 'right') var posx = pointer.x - el.fisheyeCfg.pos.x - el.offsetWidth + el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size();
                else var posx = pointer.x - el.fisheyeCfg.pos.x;
                var posy = Math.pow(pointer.y - el.fisheyeCfg.pos.y - el.offsetHeight / 2, 2);
                el.fisheyeCfg.items.each(function(nr) {
                    distance = Math.sqrt(Math.pow(posx - nr * el.fisheyeCfg.itemWidth, 2) + posy);
                    distance -= el.fisheyeCfg.itemWidth / 2;
                    distance = distance < 0 ? 0: distance;
                    distance = distance > el.fisheyeCfg.proximity ? el.fisheyeCfg.proximity: distance;
                    distance = el.fisheyeCfg.proximity - distance;
                    extraWidth = el.fisheyeCfg.maxWidth * distance / el.fisheyeCfg.proximity;
                    this.style.width = el.fisheyeCfg.itemWidth + extraWidth + 'px';
                    this.style.height = this.style.width;
                    this.style.left = el.fisheyeCfg.itemWidth * nr + toAdd + 'px';
                    this.style.marginTop = '-'+(( extraWidth)/2)+'px';
                    // this.style.marginBottom = (el.fisheyeCfg.itemWidth + extraWidth)/2+'px';

                    toAdd += extraWidth
                });
                jQuery.iFisheye.positionContainer(el, toAdd)
            })
        })
    },
    positionContainer: function(el, toAdd) {
        // if (el.fisheyeCfg.halign) if (el.fisheyeCfg.halign == 'center') el.fisheyeCfg.container.get(0).style.left = (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) / 2 - toAdd / 2 + 'px';
        // else if (el.fisheyeCfg.halign == 'left') el.fisheyeCfg.container.get(0).style.left = -toAdd / el.fisheyeCfg.items.size() + 'px';
        // else if (el.fisheyeCfg.halign == 'right') el.fisheyeCfg.container.get(0).style.left = (el.offsetWidth - el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size()) - toAdd / 2 + 'px';
        // el.fisheyeCfg.container.get(0).style.width = el.fisheyeCfg.itemWidth * el.fisheyeCfg.items.size() + toAdd + 'px'
    },
    positionItems: function(el) {
        el.fisheyeCfg.items.each(function(nr) {
            this.style.width = el.fisheyeCfg.itemWidth + 'px';
            this.style.left = el.fisheyeCfg.itemWidth * nr + 'px'
        })
    }
};
jQuery.fn.Fisheye = jQuery.iFisheye.build;

/**
 * 以下 bind mousemove方法，绑定在document上时会与鱼眼效果冲突，因此绑定在body上边
 */
/**
 * draggable拖动方法
 * by Wesson
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
$.fn.draggable = function(options){
  var target = $(this);
  if(options&&options.handle){
    target = $(this).find(options.handle);
  }
  var _that = $(this);
  var t,zindex;
  target.hover(function(){$(this).css("cursor","move");},function(){$(this).css("cursor","default");})
  var x,y,flag = false;
  _that.mousedown(function(){
    var t = $(this);
    if(t.find('.modal-dialog').hasClass('maxty'))return false;
    if(t.find(".modal-dialog").css("z-index")<2000){
        $(".modal").find(".modal-dialog").css("z-index",0)
        t.find(".modal-dialog").css("z-index",2000);
    }
  })
  target.mousedown(function(e){//e鼠标事件
    t = $(this).parents(".modal");
    if(t.find('.modal-dialog').hasClass('maxty'))return false;
    zindex = t.find(".modal-dialog").css("z-index");
      x = e.clientX - t.find(".modal-dialog")[0].offsetLeft;
      y = e.clientY - t.find(".modal-dialog")[0].offsetTop;
      $("body").mousemove(function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
            t.addClass('Moving')
            $(this).addClass('unselection');
            _that.bind('selectstart',function(){return false;});
            t.find(".modal-dialog").css("position","absolute");
            var _x = ev.clientX - x;//获得X轴方向移动的值
            var _y = ev.clientY - y;//获得Y轴方向移动的值
            if(t.hasClass('modal')){
              t.find(".modal-dialog").css({'opacity':'0.3','left':_x+"px",'top':(_y-20)+"px",'z-index':2000})
            }else{
              t.css({'left':_x+"px",'top':_y+"px"});
            }
      });
  });

  $("body").mouseup(function(){
        $(this).unbind("mousemove");
        $(this).removeClass('unselection');
        if(t){
            t.removeClass("Moving")
            if(t.hasClass('modal')){
              t.find(".modal-dialog").css({'opacity':''})
            }else{
              t.css({'opacity':''});
            }
        }
  })
}
/**
 * resizable改变大小方法
 * by Wesson
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
$.fn.resizable = function(argument) {
  var t,target = $(this).hasClass('modal')?$(this).find(".modal-dialog"):$(this);
  var box  = $(this).hasClass('modal')?$(this).find(".modal-content"):$(this);
  var heng = $('<div class="heng"></div>');
  var shu = $('<div class="shu"></div>');
  var youxiajiao = $('<div class="youxiajiao"></div>');
  box.append(heng).append(shu).append(youxiajiao);
  var flag = false;
  $(document).delegate(".shu","mousedown",function(e){//e鼠标事件  横向移动
     target = $(this).parents(".modal-dialog");
     if(target.hasClass('maxty'))return false;
     target.removeClass("dialog-init");
      var l = target[0].getBoundingClientRect().left,t = target[0].getBoundingClientRect().top;
      target.css({
        position:"absolute",
        left:l+"px",
        // top:t+"px"
      })
      target.removeClass("dialog-init");
      t = $(this).parents(".modal")
      flag = true;
     var wx = target[0].getBoundingClientRect().left;
     var height = target[0].offsetHeight;
      $("body").bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
          $(this).addClass('unselection');
          t.bind('selectstart',function(){return false;});
          var _x = ev.clientX-wx;
          target.css({"width":_x+"px",height:height+"px"});
          t.find(".modal-content").css({"width":_x+"px",height:height+"px"});          
      });
  });
  $(document).delegate(".heng","mousedown",function(e){//e鼠标事件  竖向移动
    target = $(this).parents(".modal-dialog");
    if(target.hasClass('maxty'))return false;
    console.log(target)
    var l = target[0].getBoundingClientRect().left,t = target[0].getBoundingClientRect().top;
    target.css({
        position:"absolute",
        left:l+"px",
        // top:t+"px"
    })
    target.removeClass("dialog-init");
    t = $(this).parents(".modal")
    flag = true;
     var wy = target[0].getBoundingClientRect().top;
     var wx = target[0].getBoundingClientRect().left;
     var width = target[0].offsetWidth;
     var height = target[0].offsetHeight;
      $("body").bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
          $(this).addClass('unselection');
          t.bind('selectstart',function(){return false;});
          console.log("----"+l)
          var _y = ev.clientY - wy;//获得Y轴方向移动的值
          target.css({"height":_y+"px","width":width+"px"});    
          t.find(".modal-content").css({"height":_y+"px","width":width+"px"});       
      });
  });
  $(document).delegate(".youxiajiao","mousedown",function(e){//e鼠标事件 斜下方移动
    target = $(this).parents(".modal-dialog");
    if(target.hasClass('maxty'))return false;
    target.removeClass("dialog-init");
    var l = target[0].getBoundingClientRect().left,t = target[0].getBoundingClientRect().top;
      target.css({
        position:"absolute",
        left:l+"px",
        // top:t+"px"
      })
      target.removeClass("dialog-init");
      t = $(this).parents(".modal")
      flag = true;
     var wx = target[0].getBoundingClientRect().left;
     var wy = target[0].getBoundingClientRect().top;
      $("body").bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
          $(this).addClass('unselection');
          t.bind('selectstart',function(){return false;});
          var _x = ev.clientX - wx;//获得X轴方向移动的值
          var _y = ev.clientY - wy;//获得Y轴方向移动的值
          target.css({"width":_x+"px","height":_y+"px"});
          // console.log(t.find(".modal-content")) 
          t.find(".modal-content").css({"width":_x+"px","height":_y+"px"});            
      });
  });

  $("body").mouseup(function(){
    if(flag){
      $(this).removeClass('unselection');
        // target.addClass("dialog-init");
      $(this).unbind("mousemove");
      flag = false;
    }
  })
}