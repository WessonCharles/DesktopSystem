/**
 * 时间转换方法
 * @param {[type]} strTime [description]
 */

window.Interface = {
  FormatDate:function(strTime){
    var date = new Date(strTime);
    return date.getFullYear()+"-"+((date.getMonth()+1)<10?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+date.getDate();
  },
  oneAnimationEnd:function(el,callback){
  //动画执行完毕后要执行的事件，适用于只执行一次动画的场景，并且不影响其他功能的情况下使用
  //以及使用其他方法代替setTimeout方法 避免内存消耗
      el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        callback(el)
      });
  },
  setCookie:function(name,value,d){
    var Days = d||30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
  },
  //读取cookies
  getCookie:function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
  },
  //删除cookies
  delCookie:function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/;";
  } 

}
window.GCR = {
    init:function(){
      this.loadBg();
      this.setip();
      this.setCurrentTime();
      this.baseHandle();
      this.fishdock();
    },
    loadBg:function(){
      var app = $("#app"),
          bg = window.localStorage.getItem("current-bg-url")||'app/images/background/background.jpg',
          cssbg = window.localStorage.getItem("current-bg-url")?window.localStorage.getItem("current-bg-url").replace("app",".."):'../images/background/background.jpg';
      app.css("background","url('"+bg+"') 50% / cover fixed");

      var pseheader = this.ruleSelector(".header::before").slice(-1),
          pselogin = this.ruleSelector("#login::before").slice(-1),
          pseside = this.ruleSelector(".sidebar::before").slice(-1);
      pseheader[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
      pselogin[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
      pseside[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
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
          ci_item = $("#app .bottom_tip .ci_item"),
          arrows_left = $("#app .containers .arrows_left"),
          arrows_right = $("#app .containers .arrows_right"),
          citems = $("#app .containers .container_item"),
          current_con = $("#app .bottom_tip .current_con"),
          contaniers = $("#app .containers");

      // $("#modaltest").click(function(){
      //   event.stopPropagation();
      //   // $("#myModal").modal({backdrop: 'static'});
      //   rightkeymenu.removeClass('open');
      // })
      /**
      *顶部标签切换
      **/
      ci_item.click(function(){
           var idx = $(this).index();
          _this.switchpage(idx);
      })
      /**
      *向左侧滑动按钮
      **/
      arrows_left.click(function(){
        var curcon = $("#app .bottom_tip .current_con");
        var index = curcon.index();
        if((index-1)>-1){
          _this.switchpage(index-1);
        }
      })
      /**
      *向右侧滑动按钮
      **/
      arrows_right.click(function(){
        var curcon = $("#app .bottom_tip .current_con");
        var index = curcon.index();
        if((index+1)<citems.length){
          _this.switchpage(index+1);
        }
      })

      /**
      *改变窗口大小时，动态更改左边距和dock栏的位置，做适应
      **/
      $(window).resize(function(){
          var index = $("#app .bottom_tip .current_con").index();
          var box = $("#app .containers .container_items"),
          w = $("#app .containers")[0].offsetWidth;
          box.css({"margin-left":"-"+w*index+"px"})
          _this.fishdock();
      })

      /**
      *鼠标在页面左侧时，显示向左滑动按钮，反之显示向右滑动按钮
      **/
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
      //添加右击事件
      $("#app").bind("mousedown",function (event){
        // rightkeymenu.removeClass('open')
        if(event.which==3&&$(event.target).parents(".app").length==0&&!$(event.target).hasClass('app')){
           rightkeymenu.css("top",event.pageY-20).css("left",event.pageX).addClass("open");
        }
        if(event.which ==1){
          rightkeymenu.removeClass("open");
        }

      });
    },
    fishdock:function(){
        // $(document).ready(function(){
        setTimeout(function(){
          var sidebar = $("#dock");
          sidebar.css({
            marginLeft:($("body")[0].clientWidth-sidebar[0].clientWidth)/2
          })
          $('#dock').Fisheye({
            maxWidth: 35,
            items: 'li',
            // itemsText: 'span',
            container: '.centerd',
            itemWidth: 40,
            proximity: 100,
            halign : 'center'
          })
        },0)
    },
    ruleSelector:function(selector){
      /**
       * 获取伪类的方法
       * @param  {[type]} selector [description]
       * @return {[type]}          [description]
       */
      function uni(selector) {
        return selector&&selector.replace(/::/g, ':')
      }
      return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function(x) {
        return Array.prototype.slice.call(x.cssRules);
      })), function(x) {
        return uni(x.selectorText) === uni(selector);
      });
    },
    switchpage:function(idx){
      /**
      *切换页面
      **/
      var cis = $("#app .bottom_tip .ci_item"),
      box = $("#app .containers .container_items"),
      w = $("#app .containers")[0].offsetWidth;
      if(parseInt(box.css("margin-left"))!=w*idx){
        box.css({"margin-left":"-"+w*idx+"px"})
      }
      $("#app .bottom_tip .current_con").removeClass('current_con');
      $("#app .bottom_tip .ci_item").eq(idx).addClass('current_con');
    },
    modals:{
      ready:function(){
        $("body .modal .modal-dialog").addClass("dialog-init").resizable();
        $("body .modal").draggable({handle:'.modal-header'});
      },
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
        if(it.find(".modal-dialog")[0].offsetWidth==0){
          it.find(".modal-dialog").css({
            left:l+"px",
            top:t+"px",
            height:$(window).height()/2
          })
          it.find(".modal-dialog .modal-content").css({
            height:$(window).height()/2-it.find(".modal-dialog .modal-header")[0].offsetHeight
          })
        }
      },
      hide:function(){
        it = false;
      },
      max:function(flag,el,initval){
        flag?el.addClass("maxty"):el.removeClass('maxty');
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
    dropdown = VueStrap.dropdown,
    tabs = VueStrap.tabs,
    alert = VueStrap.alert;

Vue.component('modal',modal);
Vue.component('tooltip',tooltip);
Vue.component('dropdown',dropdown);
Vue.component('tabs',tabs);
Vue.component('alert',alert);
var zindex = 0;

/**
*是否登录
**/
var islogin = Interface.getCookie("logininfo")?true:false;
// var out = new Vue({
//   el:"#app",
//   data:function(){
//     return {
//       islogin:islogin,
//       form:{
//         email:"",
//         password:""
//       }
//     }
//   },
//   methods:{
//     login:function(){
//       console.log("@3241");
//       console.log(this.form)
//       if(this.form.email=="11@qq.com"&&this.form.password=="11"){
//         this.islogin = true;
//         Interface.setCookie("logininfo",this.form.email,1)
//       }
//     }
//   }
// });
// console.log(out)

var login = new Vue({
  el:"#login",
  data:function(){
    return {
      islogin:islogin,
      form:{
        email:"",
        password:""
      }
    }
  },
  methods:{
    login:function(){
      console.log("@3241");
      console.log(this.form)
      if(this.form.email=="11@qq.com"&&this.form.password=="11"){
        console.log("2341")
        this.islogin = true;
        Interface.setCookie("logininfo",this.form.email,1)
      }
    }
  }
})

login.$watch("islogin",function(n){
  console.log(n)
})

/**
*实例化用户下拉框
**/

var startmenu = new Vue({
  el:"#usetting",
  data:function(){
    return {
      pages:['setting','task','note','game','plat','permission','user'],
      zooms:{
        'setting':false,
        'task':false,
        'note':false,
        'game':false,
        'plat':false,
        'permission':false,
        'user':false
      },
      ismax:{
        'setting':false,
        'task':false,
        'note':false,
        'game':false,
        'plat':false,
        'permission':false,
        'user':false
      },
      name:{
        'setting':"修改个人设置",
        'task':"我的任务管理(日历管理)",
        'note':"记事本",
        'game':"游戏管理",
        'plat':"平台管理",
        'permission':"权限管理",
        'user':"用户管理"
      },
      init_val:{},
    }
  },
  ready:function(){
    this.target = {};
    for(var i =0;i<this.pages.length;i++){
      this.target[this.pages[i]] = $("#"+this.pages[i]+"_manage")
    }
    for(var t in this.target){
      this.target[t].appendTo($("body"));
    }
    // $("#plat_manage").appendTo($("body"));
    GCR.modals.ready();
  },
  methods:{
    show:function(key){
      var tstr = "#"+key+"_manage";
      if(this.zooms[key]){
        $("#desktop").find("li[data-target='"+key+"_manage']").addClass('flop');
        Interface.oneAnimationEnd($("#desktop").find("li[data-target='"+key+"_manage']"),function(e){
          e.removeClass('flop');
          desks.toggleMin(key+"_manage",true);
        })
        return false;
      }
      
      GCR.modals.show($(tstr));
      this.zooms[key] = true;
      zindex++;
      $(tstr).addClass('in').css("display","block");
      $(tstr).find(".modal-dialog").css("z-index",zindex);
    },
    close:function(key,p){
      var tstr = "#"+key+"_manage";
      !p?this.zooms[key] = false:null;
      !p?zindex--:null;
      $(tstr).removeClass('in');
      $(tstr).find(".modal-dialog").css("z-index","");
      if(p){
        $(tstr).addClass("zoomOutDown",function(){
          $(this).css({"display":"none"});
        });
      }
    },
    min:function(key){
      var tstr = "#"+key+"_manage";
      this.close(key,"animate");//与关闭操作相同，并加入到desktop最小化列表中
      var name = this.name[key];
      var icon ='app/images/desktop-icons/settings.png';
      desks.minifys.push({
        el:$(tstr),
        target:key+"_manage",
        index:key,
        // show:false,
        name:name,
        icon:icon,
      });
      desks.isflop.push(false);
      GCR.fishdock();
    },
    max:function(key){
      console.log(this.target)
      this.ismax[key] = !this.ismax[key];
      var _target = this.target[key].find(".modal-dialog")[0];
      if(this.ismax[key]){//经过上述转换以后说明ismax是放大时候的状态，因此，要记录原始的width height left top等
        this.init_val[key] = {
          left:_target.offsetLeft,
          top:_target.offsetTop,
          width:_target.offsetWidth,
          height:_target.offsetHeight
        }
      }
      GCR.modals.max(this.ismax[key],this.target[key].find(".modal-dialog"),this.init_val[key]);
      
    }
  }
})

/**
*实例化通知组件
**/
var alerts = new Vue({
  el:"#alerts",
  data:function(){
    return {
      showTop:false,
      type:'success',
      label:{
        'success':'成功',
        'info':'提示',
        'danger':'危险',
        'warning':'警告'
      },
      content:''
    }
  }
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
      },
      //关于背景的一些data
      bg:{
        imgs:["app/images/background/background.jpg",
              "app/images/background/background-1.jpg",
              "app/images/background/background-2.jpg",
              "app/images/background/background-3.jpg",
              "app/images/background/background-4.jpg",
              "app/images/background/background-5.jpg",
              "app/images/background/background-6.jpg",
              "app/images/background/background-7.jpg",
              "app/images/background/background-8.jpg",
              "app/images/background/background-9.jpg",
              "app/images/background/background-10.jpg"],
        selected:0
      }
    }
  },
  ready:function(){
    var _this = this;
    $("#realrightmodal").appendTo($("body"));
    this['target'] = $("#realrightmodal").find(".modal-dialog");
    GCR.modals.ready();
    if(window.localStorage.getItem("current-bg-url")){
      this.bg.selected = this.bg.imgs.indexOf(window.localStorage.getItem("current-bg-url"));
    }
  },
  methods:{
    show:function(){
      console.log(this.zoomModal)
      if(this.zoomModal){
        var _this = this;
        $("#desktop").find("li[data-target='realrightmodal']").addClass('flop');
        Interface.oneAnimationEnd($("#desktop").find("li[data-target='realrightmodal']"),function(e){
          e.removeClass('flop');
         _this.zoomModal = true;
         desks.toggleMin("realrightmodal",true);
        });
        $("#rightkey").removeClass('open');
        return false;
      } 
      GCR.modals.show($("#realrightmodal"));
      this.zoomModal = true;
      zindex++;
      $("#realrightmodal").addClass('in').css("display","block");
      $("#realrightmodal .modal-dialog").css("z-index",zindex);
      $("#rightkey").removeClass('open');
    },
    close:function(p){
      if(!p||p!="animate"){
        this.zoomModal=false;
        zindex--
      }
      $("#realrightmodal").removeClass('in');
      console.log(this.zoomModal)
      $("#realrightmodal .modal-dialog").css("z-index","");
      if(p&&p=="animate"){
        $("#realrightmodal").addClass("zoomOutDown",function(){
          $(this).css({"display":"none"});
        });
      }
    },
    min:function(){
      this.close("animate");//与关闭操作相同，并加入到desktop最小化列表中
      desks.minifys.push({
        el:$("#realrightmodal"),
        target:'realrightmodal',
        // show:false,
        name:$("#realrightmodal").find(".modal-title").text(),
        icon:'app/images/desktop-icons/folder-document.png'
      });
      desks.isflop.push(false);
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
    },
    setbg:function(index){
      this.bg.selected = index;
      // console.log(this.preimg)
      var app = $("#app"),
          bg = this.bg.imgs[index],
          cssbg = this.bg.imgs[index].replace("app","..");
      app.css("background","url('"+bg+"') 50% / cover fixed");
      var pseheader = GCR.ruleSelector(".header::before").slice(-1),
          pselogin = GCR.ruleSelector("#login::before").slice(-1),
          pseside = GCR.ruleSelector(".sidebar::before").slice(-1);
      pseheader[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
      pselogin[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
      pseside[0].style.background = "url('"+cssbg+"') 50% / cover fixed";
      window.localStorage.setItem("current-bg-url", bg);
      alerts.$set('content', "修改桌面背景成功");
      alerts.$set('showTop',true);
    }
  }
})

rkmodal.$set("preimg",[]);//图片预加载，防止360浏览器切换背景时闪烁，但是貌似没什么卵用
for(i=0;i<rkmodal.bg.imgs.length;i++){
    var img = new Image();
    img.src = rkmodal.bg.imgs[i];
    img.onload = function(){
      this.width = 1920;
      this.height = 1200;
    }
    rkmodal["preimg"].push(img); 
}
console.log(rkmodal)

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
      init_val:[],
      /*以下为ADD APP 按钮单独写的部分属性*/
      zoomadd:false,
      ismaxadd:false,
      init_valadd:{}
    }
  },
  ready:function(){
    this['target'] = [];
    var apps = this.apps;
    for(var i=0;i<apps.length;i++){
      $("#appmodal"+i).appendTo($("body"));
      this.target[i] = $("#appmodal"+i).find(".modal-dialog");
    }
    this.targetadd = $("#appmodal999").find(".modal-dialog");
    $("#appmodal999").appendTo($("body"))
    GCR.modals.ready();
  },
  methods:{
    show:function(index){
      if(index==999){
        if(this.zoomadd){
          var _this = this;
          $("#desktop").find("li[data-target='appmodal"+index+"']").addClass('flop');
          Interface.oneAnimationEnd($("#desktop").find("li[data-target='appmodal"+index+"']"),function(e){
            e.removeClass('flop');
             _this.zoomadd = true;
             desks.toggleMin("appmodal"+index,true);
          });
          return false;
        }
        GCR.modals.show($("#appmodal999"));
        this.zoomadd = true;
        zindex++;
        $("#appmodal999").addClass('in').css("display","block");
        $("#appmodal999").find(".modal-dialog").css("z-index",zindex);
      }else{
        if(this.zooms[index]){
          var _this = this;
          $("#desktop").find("li[data-target='appmodal"+index+"']").addClass('flop');
          Interface.oneAnimationEnd($("#desktop").find("li[data-target='appmodal"+index+"']"),function(e){
            e.removeClass('flop');
            desks.toggleMin("appmodal"+index,true);
          });
          return false;
        }
        

        GCR.modals.show($("#appmodal"+index));
        this.zooms[index] = true;
        zindex++;
        $("#appmodal"+index).addClass('in').css("display","block");
        $("#appmodal"+index).find(".modal-dialog").css("z-index",zindex);
      }
    },
    close:function(index,p){
      if(index==999){
        !p?this.zoomadd = false:null;
      }else{
        !p?this.zooms[index] = false:null;
      }
      !p?zindex--:null;
      $("#appmodal"+index).removeClass('in');
      $("#appmodal"+index).find(".modal-dialog").css("z-index","");
      if(p){
        $("#appmodal"+index).addClass("zoomOutDown",function(){
          $(this).css({"display":"none"});
        });
      }
    },
    min:function(index){
      this.close(index,"animate");//与关闭操作相同，并加入到desktop最小化列表中
      var name = index==999?"增加项目":this.apps[index].name;
      var icon = index==999?'app/images/desktop-icons/folder-document.png':this.apps[index].icon;
      desks.minifys.push({
        el:$("#appmodal"+index),
        target:"appmodal"+index,
        index:index,
        // show:false,
        name:name,
        icon:icon,
      });
      desks.isflop.push(false);
      GCR.fishdock();
    },
    max:function(index){
      if(index==999){
        this.ismaxadd = !this.ismaxadd;
        var _target = this.targetadd[0];
        if(this.ismaxadd){//经过上述转换以后说明ismax是放大时候的状态，因此，要记录原始的width height left top等
          this.init_valadd = {
            left:_target.offsetLeft,
            top:_target.offsetTop,
            width:_target.offsetWidth,
            height:_target.offsetHeight
          }
        }
        GCR.modals.max(this.ismaxadd,this.targetadd,this.init_valadd);
      }else{
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
  }
})

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
      minifys:[],
      isflop:[]//数组个数与minifys相等
    }
  },
  ready:function(){

  },
  methods:{
    toggleMin:function(item,trigger){
        GCR.fishdock();
        var el = trigger?item:item.el;
        zindex++;
        if(trigger){
          for(var i=0;i<this.minifys.length;i++){
            if(this.minifys[i].target==item){
              this.minifys[i].el.css("display","block").css("z-index",zindex);
              this.minifys[i].el.addClass('in').addClass("zoomInUp").removeClass("zoomOutDown");
              this.minifys.splice(i,1);
              this.isflop.splice(i,1);
              break;
            }
          }
        }else{
         item.el.css("display","block").css("z-index",zindex);
         item.el.addClass('in').addClass("zoomInUp").removeClass("zoomOutDown");
         this.minifys.splice(this.minifys.indexOf(item),1);
         this.isflop.splice(this.minifys.indexOf(item),1)
        }
    }
  }
})
