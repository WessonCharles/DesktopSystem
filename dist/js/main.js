!function a(t,e,o){function i(n,r){if(!e[n]){if(!t[n]){var d="function"==typeof require&&require;if(!r&&d)return d(n,!0);if(s)return s(n,!0);throw new Error("Cannot find module '"+n+"'")}var p=e[n]={exports:{}};t[n][0].call(p.exports,function(a){var e=t[n][1][a];return i(e?e:a)},p,p.exports,a,t,e,o)}return e[n].exports}for(var s="function"==typeof require&&require,n=0;n<o.length;n++)i(o[n]);return i}({1:[function(a,t,e){window.Interface={FormatDate:function(a){var t=new Date(a);return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+t.getDate()}},window.GCR={init:function(){this.loadBg(),this.setip(),this.setCurrentTime(),this.baseHandle(),this.fishdock()},loadBg:function(){var a=$("#app"),t=window.localStorage.getItem("current-bg-url")||"../imgs/background/background.jpg",e=window.localStorage.getItem("current-bg-url")?window.localStorage.getItem("current-bg-url").replace("app",".."):"../imgs/background/background.jpg";a.css("background","url('"+t+"') 50% / cover fixed");var o=this.ruleSelector(".header::before").slice(-1),i=this.ruleSelector(".sidebar::before").slice(-1);o[0].style.background="url('"+e+"') 50% / cover fixed",i[0].style.background="url('"+e+"') 50% / cover fixed"},setip:function(){var a=document.getElementById("current_ip");a.innerHTML=returnCitySN.cname+" "+returnCitySN.cip},setCurrentTime:function(){var a=document.getElementById("current_date");a.innerHTML=Interface.FormatDate(new Date)},baseHandle:function(){var a=this,t=$("#rightkey");ci_item=$("#app .bottom_tip .ci_item"),arrows_left=$("#app .containers .arrows_left"),arrows_right=$("#app .containers .arrows_right"),citems=$("#app .containers .container_item"),current_con=$("#app .bottom_tip .current_con"),contaniers=$("#app .containers"),ci_item.click(function(){var t=$(this).index();a.switchpage(t)}),arrows_left.click(function(){var t=$("#app .bottom_tip .current_con"),e=t.index();e-1>-1&&a.switchpage(e-1)}),arrows_right.click(function(){var t=$("#app .bottom_tip .current_con"),e=t.index();e+1<citems.length&&a.switchpage(e+1)}),$(window).resize(function(){var t=$("#app .bottom_tip .current_con").index(),e=$("#app .containers .container_items"),o=$("#app .containers")[0].offsetWidth;e.css({"margin-left":"-"+o*t+"px"}),a.fishdock()}),$("#app").mousemove(function(a){a.pageX<500?arrows_left.css("display","block"):arrows_left.css("display","none"),a.pageX>contaniers[0].offsetWidth-500?arrows_right.css("display","block"):arrows_right.css("display","none")}),document.oncontextmenu=function(){return!1};navigator.appName;$("#app").bind("mousedown",function(a){3!=a.which||0!=$(a.target).parents(".app").length||$(a.target).hasClass("app")||t.css("top",a.pageY-20).css("left",a.pageX).addClass("open"),1==a.which&&t.removeClass("open")})},fishdock:function(){$(document).ready(function(){var a=$("#dock");a.css({marginLeft:($("body")[0].clientWidth-a[0].clientWidth)/2}),$("#dock").Fisheye({maxWidth:35,items:"li",container:".centerd",itemWidth:40,proximity:100,halign:"center"})})},ruleSelector:function(a){function t(a){return a&&a.replace(/::/g,":")}return Array.prototype.filter.call(Array.prototype.concat.apply([],Array.prototype.map.call(document.styleSheets,function(a){return Array.prototype.slice.call(a.cssRules)})),function(e){return t(e.selectorText)===t(a)})},switchpage:function(a){var t=($("#app .bottom_tip .ci_item"),$("#app .containers .container_items")),e=$("#app .containers")[0].offsetWidth;parseInt(t.css("margin-left"))!=e*a&&t.css({"margin-left":"-"+e*a+"px"}),$("#app .bottom_tip .current_con").removeClass("current_con"),$("#app .bottom_tip .ci_item").eq(a).addClass("current_con")},modals:{ready:function(){$("body .modal .modal-dialog").addClass("dialog-init").resizable(),$("body .modal").draggable({handle:".modal-header"})},show:function(a){var t=$(".modal");console.log(t),t.each(function(a,t){var e=10*a;$(t).find(".modal-dialog").css("margin",e+"px 0px 0px "+e+"px")}),$("#rightkey").removeClass("open"),console.log(a.find(".modal-dialog")[0].offsetWidth);var e=$(window).width()/3,o=$(window).height()/2-a.find(".modal-dialog")[0].offsetHeight;0==a.find(".modal-dialog")[0].offsetWidth&&a.find(".modal-dialog").css({left:e+"px",top:o+"px"})},hide:function(){it=!1},max:function(a,t,e){a?t.addClass("maxty"):t.removeClass("maxty")&&!function(){t.css(e)}},min:function(){}}},GCR.init();var o=VueStrap.modal,i=VueStrap.tooltip,s=VueStrap.dropdown,n=VueStrap.tabs,r=VueStrap.alert;Vue.component("modal",o),Vue.component("tooltip",i),Vue.component("dropdown",s),Vue.component("tabs",n),Vue.component("alert",r);var d=0,p=(new Vue({el:"#usetting",data:function(){return{pages:["game","plat","permission","user"],zooms:{game:!1,plat:!1,permission:!1,user:!1},ismax:{game:!1,plat:!1,permission:!1,user:!1},name:{game:"游戏管理",plat:"平台管理",permission:"权限管理",user:"用户管理"},init_val:{}}},ready:function(){this.target={game:$("#game_manage"),plat:$("#plat_manage"),permission:$("#permission_manage"),user:$("#user_manage")};for(var a in this.target)this.target[a].appendTo($("body"));GCR.modals.ready()},methods:{show:function(a){var t="#"+a+"_manage";return this.zooms[a]?($("#desktop").find("li[data-target='"+a+"_manage']").addClass("flop"),setTimeout(function(){$("#desktop").find("li[data-target='"+a+"_manage']").removeClass("flop")},1e3),!1):(GCR.modals.show($(t)),this.zooms[a]=!0,d++,$(t).addClass("in").css("display","block"),void $(t).find(".modal-dialog").css("z-index",d))},close:function(a,t){var e="#"+a+"_manage";t?null:this.zooms[a]=!1,t?null:d--,$(e).removeClass("in"),$(e).find(".modal-dialog").css("z-index",""),t&&($(e).addClass("maxout"),setTimeout(function(){$(e).css({display:"none"})},500))},min:function(a){var t="#"+a+"_manage";this.close(a,"animate");var e=this.name[a],o="app/images/desktop-icons/settings.png";l.minifys.push({el:$(t),target:a+"_manage",index:a,name:e,icon:o}),l.isflop.push(!1),GCR.fishdock()},max:function(a){console.log(this.target),this.ismax[a]=!this.ismax[a];var t=this.target[a].find(".modal-dialog")[0];this.ismax[a]&&(this.init_val[a]={left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}),GCR.modals.max(this.ismax[a],this.target[a].find(".modal-dialog"),this.init_val[a])}}}),new Vue({el:"#alerts",data:function(){return{showTop:!1,type:"success",label:{success:"成功",info:"提示",danger:"危险",warning:"警告"},content:""}}})),l=(new Vue({el:"#rightmodal",data:function(){return{zoomModal:!1,ismax:!1,init_val:{left:0,height:0,top:0,width:0},bg:{imgs:["app/images/background/background.jpg","app/images/background/background-1.jpg","app/images/background/background-2.jpg","app/images/background/background-3.jpg","app/images/background/background-4.jpg","app/images/background/background-5.jpg","app/images/background/background-6.jpg","app/images/background/background-7.jpg","app/images/background/background-8.jpg","app/images/background/background-9.jpg","app/images/background/background-10.jpg"],selected:0}}},ready:function(){$("#realrightmodal").appendTo($("body")),this.target=$("#realrightmodal").find(".modal-dialog"),GCR.modals.ready(),window.localStorage.getItem("current-bg-url")&&(this.bg.selected=this.bg.imgs.indexOf(window.localStorage.getItem("current-bg-url")))},methods:{show:function(){return this.zoomModal?!1:(GCR.modals.show($("#realrightmodal")),this.zoomModal=!0,d++,void $("#realrightmodal .modal-dialog").css("z-index",d))},close:function(){this.zoomModal=!1,d--,$("#realrightmodal .modal-dialog").css("z-index","")},min:function(){$("#realrightmodal").removeClass("in").addClass("maxout"),l.minifys.push({el:$("#realrightmodal"),name:$("#realrightmodal").find(".modal-title").text(),icon:"app/images/desktop-icons/folder-document.png"}),GCR.fishdock()},max:function(){this.ismax=!this.ismax,this.ismax&&(this.init_val={left:this.target[0].offsetLeft,top:this.target[0].offsetTop,width:this.target[0].offsetWidth,height:this.target[0].offsetHeight}),GCR.modals.max(this.ismax,this.target,this.init_val)},setbg:function(a){this.bg.selected=a;var t=$("#app"),e=this.bg.imgs[a],o=this.bg.imgs[a].replace("app",".."),i=GCR.ruleSelector(".header::before").slice(-1),s=GCR.ruleSelector(".sidebar::before").slice(-1);i[0].style.background="url('"+o+"') 50% / cover fixed",s[0].style.background="url('"+o+"') 50% / cover fixed",t.css("background","url('"+e+"') 50% / cover fixed"),window.localStorage.setItem("current-bg-url",e),p.$set("content","修改桌面背景成功"),p.$set("showTop",!0)}}}),new Vue({el:"#applications",data:function(){return{apps:[{name:"赵信",icon:"app/images/app-icons/icon-1.png"},{name:"妲己",icon:"app/images/app-icons/icon-2.png"},{name:"蛮王",icon:"app/images/app-icons/icon-3.png"}],zooms:[!1,!1,!1],ismax:[!1,!1,!1],init_val:[],zoomadd:!1,ismaxadd:!1,init_valadd:{}}},ready:function(){this.target=[];for(var a=this.apps,t=0;t<a.length;t++)$("#appmodal"+t).appendTo($("body")),this.target[t]=$("#appmodal"+t).find(".modal-dialog");this.targetadd=$("#appmodal999").find(".modal-dialog"),$("#appmodal999").appendTo($("body")),GCR.modals.ready()},methods:{show:function(a){if(999==a){if(this.zoomadd){return $("#desktop").find("li[data-target='appmodal"+a+"']").addClass("flop"),setTimeout(function(){$("#desktop").find("li[data-target='appmodal"+a+"']").removeClass("flop")},1e3),!1}GCR.modals.show($("#appmodal999")),this.zoomadd=!0,d++,$("#appmodal999").addClass("in").css("display","block"),$("#appmodal999").find(".modal-dialog").css("z-index",d)}else{if(this.zooms[a]){return $("#desktop").find("li[data-target='appmodal"+a+"']").addClass("flop"),setTimeout(function(){$("#desktop").find("li[data-target='appmodal"+a+"']").removeClass("flop")},1e3),!1}GCR.modals.show($("#appmodal"+a)),this.zooms[a]=!0,d++,$("#appmodal"+a).addClass("in").css("display","block"),$("#appmodal"+a).find(".modal-dialog").css("z-index",d)}},close:function(a,t){999==a?(t?null:this.zoomadd=!1,t?null:d--,$("#appmodal999").removeClass("in"),$("#appmodal999").find(".modal-dialog").css("z-index",""),t&&($("#appmodal999").addClass("maxout"),setTimeout(function(){$("#appmodal999").css({display:"none"})},500))):(t?null:this.zooms[a]=!1,t?null:d--,$("#appmodal"+a).removeClass("in"),$("#appmodal"+a).find(".modal-dialog").css("z-index",""),t&&($("#appmodal"+a).addClass("maxout"),setTimeout(function(){$("#appmodal"+a).css({display:"none"})},500)))},min:function(a){this.close(a,"animate");var t=999==a?"增加项目":this.apps[a].name,e=999==a?"app/images/desktop-icons/folder-document.png":this.apps[a].icon;l.minifys.push({el:$("#appmodal"+a),target:"appmodal"+a,index:a,name:t,icon:e}),l.isflop.push(!1),GCR.fishdock()},max:function(a){if(999==a){this.ismaxadd=!this.ismaxadd;var t=this.targetadd[0];this.ismaxadd&&(this.init_valadd={left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}),GCR.modals.max(this.ismaxadd,this.targetadd,this.init_valadd)}else{console.log(this.target),this.ismax[a]=!this.ismax[a],console.log(this.target[0][0]),console.log(a);var t=this.target[parseInt(a)][0];this.ismax[a]&&(this.init_val[a]={left:t.offsetLeft,top:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}),GCR.modals.max(this.ismax[a],this.target[a],this.init_val[a])}}}}),new Vue({el:"#desktop",data:function(){return{apps:[{name:"app_store",icon:"app/images/desktop-icons/app_store_ios7_ios_7.png"},{name:"calendar",icon:"app/images/desktop-icons/calendar_ios7_ios_7.png"},{name:"camera",icon:"app/images/desktop-icons/camera_ios7_ios_7.png"},{name:"music",icon:"app/images/desktop-icons/music_ios7_ios_7.png"},{name:"phone",icon:"app/images/desktop-icons/phone_ios7_ios_7.png"},{name:"photos",icon:"app/images/desktop-icons/photos_ios7_ios_7.png"},{name:"safari",icon:"app/images/desktop-icons/safari_ios7_ios_7.png"},{name:"weather",icon:"app/images/desktop-icons/weather_ios7_ios_7.png"}],minifys:[],isflop:[]}},ready:function(){},methods:{toggleMin:function(a){GCR.fishdock(),a.el.css("display","block"),a.el.addClass("in").addClass("maxin").removeClass("maxout"),this.minifys.splice(this.minifys.indexOf(a),1),this.isflop.splice(this.minifys.indexOf(a),1),console.log(this.minifys)}}}))},{}],2:[function(a,t,e){a("./desktop.js")},{"./desktop.js":1}]},{},[2]);