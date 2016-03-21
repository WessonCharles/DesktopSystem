/**
 * 时间转换方法
 * @param {[type]} strTime [description]
 */

window.Interface = {
  FormatDate:function(strTime){
    var date = new Date(strTime);
    return date.getFullYear()+"-"+((date.getMonth()+1)<10?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+date.getDate();
  },

}

window.GCR = {
    init:function(){
      this.setip();
      this.setCurrentTime();
      this.baseHandle();
      this.fishdock();
    },
    setip:function(){
      var ele = document.getElementById("current_ip");
      ele.innerHTML = returnCitySN["cname"]+" "+returnCitySN["cip"];
    },
    setCurrentTime:function(){
      var date = document.getElementById("current_date");
      date.innerHTML = Interface.FormatDate(new Date());
    },
    baseHandle:function(){
      var _this = this;
      var rightkeymenu = $("#rightkey");
          ci_item = $("#app .containers .bottom_tip .ci_item"),
          arrows_left = $("#app .containers .arrows_left"),
          arrows_right = $("#app .containers .arrows_right"),
          citems = $("#app .containers .container_item"),
          current_con = $("#app .containers .bottom_tip .current_con"),
          contaniers = $("#app .containers");

      $("#modaltest").click(function(){
        event.stopPropagation();
        // $("#myModal").modal({backdrop: 'static'});
        rightkeymenu.removeClass('open');
      })

      ci_item.click(function(){
           var idx = $(this).index();
          _this.switchpage(idx);
      })

      arrows_left.click(function(){
        var curcon = $("#app .containers .bottom_tip .current_con");
        var index = curcon.index();
        if((index-1)>-1){
          _this.switchpage(index-1);
        }
      })
      arrows_right.click(function(){
        var curcon = $("#app .containers .bottom_tip .current_con");
        var index = curcon.index();
        if((index+1)<citems.length){
          _this.switchpage(index+1);
        }
      })

      $(window).resize(function(){
          var index = $("#app .containers .bottom_tip .current_con").index();
          var box = $("#app .containers .container_items"),
          w = $("#app .containers")[0].offsetWidth;
          box.css({"margin-left":"-"+w*index+"px"})
      })


      $("#app").mousemove(function(e){
        if(e.pageX<500){
          arrows_left.css("display","block");
        }else{
          arrows_left.css("display","none");
        }

        if(e.pageX>contaniers[0].offsetWidth-500){
          arrows_right.css("display","block");
        }else{
          arrows_right.css("display","none");
        }
      })


      /*
      禁用右键
       */
      document.oncontextmenu=function(){//屏蔽浏览器右键事件
        return false;
      };
      var isIE = navigator.appName;
      //判断是否是IE浏览器
      // if(isIE=="Microsoft Internet Explorer"){
      //添加IE右击事件
      $("#app").bind("mousedown",function (event){
        // rightkeymenu.removeClass('open')
        if(event.which==3){
           rightkeymenu.css("top",event.pageY-20).css("left",event.pageX).addClass("open");
        }
        if(event.which ==1){
          rightkeymenu.removeClass("open");
        }

      });
    },
    fishdock:function(){
        setTimeout(function(){
          $('#dock').Fisheye({
            maxWidth: 18,
            items: 'li',
            // itemsText: 'span',
            container: '.centerd',
            itemWidth: 40,
            proximity: 100,
            halign : 'center'
          })
        })

    },
    ruleSelector:function(selector){
      /**
       * 获取伪类的方法
       * @param  {[type]} selector [description]
       * @return {[type]}          [description]
       */
      function uni(selector) {
        return selector.replace(/::/g, ':')
      }
      return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function(x) {
        return Array.prototype.slice.call(x.cssRules);
      })), function(x) {
        return uni(x.selectorText) === uni(selector);
      });
    },
    switchpage:function(idx){
      var cis = $("#app .containers .bottom_tip .ci_item"),
      box = $("#app .containers .container_items"),
      w = $("#app .containers")[0].offsetWidth;
      if(parseInt(box.css("margin-left"))!=w*idx){
        box.css({"margin-left":"-"+w*idx+"px"})
      }
      $("#app .containers .bottom_tip .current_con").removeClass('current_con');
      $("#app .containers .bottom_tip .ci_item").eq(idx).addClass('current_con');
    },
    modals:{
      show:function(it){
        var modals = $(".modal");
        console.log(modals)
        modals.each(function(i,ele){
          var v = i*10;
          $(ele).find(".modal-dialog").css("margin",v+"px "+"0px 0px "+v+"px");
        })
        $("#rightkey").removeClass('open');
        console.log(it.find(".modal-dialog")[0].offsetWidth)
        var l = ($(window).width())/3,
        t = ($(window).height())/2-it.find(".modal-dialog")[0].offsetHeight;

        it.find(".modal-dialog").css({
          left:l+"px",
          top:t+"px"
        })
      },
      hide:function(){
        it = false;
      },
      max:function(flag,el,initval){
        flag?el.addClass("maxty"):(el.removeClass('maxty')&&!(function(){
          el.css(initval)
        }));
      },
      min:function(){

      }
    }
};
GCR.init();

/**
*注册modal组件
**/
var modal = VueStrap.modal,
    tooltip = VueStrap.tooltip,
    dropdown = VueStrap.dropdown;
// console.log(modal)
Vue.component('modal',modal);
Vue.component('tooltip',tooltip);
Vue.component('dropdown',dropdown)

/**
*实例化用户下拉框
**/

var startmenu = new Vue({
  el:"#usetting"
})

/**
**实例化右键菜单modal
**/
var rkmodal = new Vue({
  el:"#rightmodal",
  data:function(){
    return {
      zoomModal:false,
      ismax:false,
      init_val:{
        left:0,
        height:0,
        top:0,
        width:0
      }
    }
  },
  ready:function(){
    $("#realrightmodal").appendTo($("body"));
    this['target'] = $("#realrightmodal").find(".modal-dialog");
    $("body .modal .modal-dialog").addClass("dialog-init").resizable();
    $("body .modal").draggable({handle:'.modal-header'});
  },
  methods:{
    show:function(){
      GCR.modals.show($("#realrightmodal"));
      this.zoomModal = true;

      // rightkeymenu.removeClass('open')
    },
    close:function(){
      this.zoomModal = false;
    },
    min:function(){
      $("#realrightmodal").removeClass('in').css("display","none");//与关闭操作相同，并加入到desktop最小化列表中
      desks.minifys.push({
        el:$("#realrightmodal"),
        // show:false,
        name:$("#realrightmodal").find(".modal-title").text(),
        icon:'app/images/desktop-icons/folder-document.png'
      });
      GCR.fishdock();
    },
    max:function(){
      this.ismax = !this.ismax;
      if(this.ismax){//经过上述转换以后说明ismax是放大时候的状态，因此，要记录原始的width height left top等
        this.init_val = {
          left:this.target[0].offsetLeft,
          top:this.target[0].offsetTop,
          width:this.target[0].offsetWidth,
          height:this.target[0].offsetHeight
        }
      }
      GCR.modals.max(this.ismax,this.target,this.init_val);
    }
  }
})

// var app = new Vue({
//   el:"#app1",
//   data:function(){
//     return {
//       zoomModal:false
//     }
//   },
//   ready:function(){
//     $("#appmodal").appendTo($("body"));
//   },
//   methods:{
//     show:function(){
//       this.zoomModal = true;
//       // rightkeymenu.removeClass('open')
//     },
//     close:function(){
//       this.zoomModal = false;
//     },
//     min:function(){

//     },
//     max:function(){

//     }
//   }
// })
// console.log(app)
// app.$watch('zoomModal',function(n,o){
//   console.log("new",n)
//   console.log("old",o)
// })


/**
*加载desktop列表
**/

var desks = new Vue({
  el:"#desktop",
  data:function(){
    return {
      apps:[
        {name:"app_store",icon:"app/images/desktop-icons/app_store_ios7_ios_7.png"},
        {name:"calendar",icon:"app/images/desktop-icons/calendar_ios7_ios_7.png"},
        {name:"camera",icon:"app/images/desktop-icons/camera_ios7_ios_7.png"},
        {name:"music",icon:"app/images/desktop-icons/music_ios7_ios_7.png"},
        {name:"phone",icon:"app/images/desktop-icons/phone_ios7_ios_7.png"},
        {name:"photos",icon:"app/images/desktop-icons/photos_ios7_ios_7.png"},
        {name:"safari",icon:"app/images/desktop-icons/safari_ios7_ios_7.png"},
        {name:"weather",icon:"app/images/desktop-icons/weather_ios7_ios_7.png"}
      ],
      minifys:[]
    }
  },
  ready:function(){
    
  },
  methods:{
    toggleMin:function(item){
      // if(item.show){
        item.el.addClass('in').css("display","block");
        this.minifys.splice(this.minifys.indexOf(item),1);

        console.log(this.minifys)
      // }
    }
  }
})

/**
*实例化apps的modal
**/
var apps = new Vue({
  el:"#applications",
  data:function(){
    return {
      apps:[
        {name:"赵信",icon:"app/images/app-icons/icon-1.png"},
        {name:"妲己",icon:"app/images/app-icons/icon-2.png"},
        {name:"蛮王",icon:"app/images/app-icons/icon-3.png"}
      ],
      zooms:[false,false,false],
      ismax:[false,false,false],
      init_val:[]
    }
  },
  ready:function(){
    this['target'] = [];
    var apps = this.apps;
    for(var i=0;i<apps.length;i++){
      $("#appmodal"+i).appendTo($("body"));
      this.target[i] = $("#appmodal"+i).find(".modal-dialog");
    }
    $("body .modal .modal-dialog").addClass("dialog-init").resizable();
    $("body .modal").draggable({handle:'.modal-header'});
  },
  methods:{
    show:function(index){
      console.log(index)
      GCR.modals.show($("#appmodal"+index));
      this.zooms[index] = true;
      console.log(this)
      $("#appmodal"+index).addClass('in').css("display","block");
      // rightkeymenu.removeClass('open')
    },
    close:function(index){
      this.zooms[index] = false;
      $("#appmodal"+index).removeClass('in').css("display","none");
    },
    min:function(index){
      this.close(index);//与关闭操作相同，并加入到desktop最小化列表中
      desks.minifys.push({
        el:$("#appmodal"+index),
        index:index,
        // show:false,
        name:this.apps[index].name,
        icon:this.apps[index].icon
      });
      GCR.fishdock();
    },
    max:function(index){
      console.log(this.target)
      this.ismax[index] = !this.ismax[index];
      console.log(this.target[0][0])
      console.log(index)
      var _target = this.target[parseInt(index)][0];
      if(this.ismax[index]){//经过上述转换以后说明ismax是放大时候的状态，因此，要记录原始的width height left top等
        this.init_val[index] = {
          left:_target.offsetLeft,
          top:_target.offsetTop,
          width:_target.offsetWidth,
          height:_target.offsetHeight
        }
      }
      GCR.modals.max(this.ismax[index],this.target[index],this.init_val[index]);
    }
  }
})




/**
 * 可设置#app,.header::before,.sidebar::before的背景图
 * @type {[type]}
 */
// var pseudo = ruleSelector("header::before").slice(-1);
// pseudo.forEach(function(rule){
//   rule.style.background = "some pic";
// })

/**
 * 点击下方tip切换页面
 */









