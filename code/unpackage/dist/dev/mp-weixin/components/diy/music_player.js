(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/diy/music_player"],{"0440":function(t,e,n){"use strict";var r=n("e23d"),o=n.n(r);o.a},"3dca":function(t,e,n){"use strict";(function(t){n("66fd");function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */o=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(S){c=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new T(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return A()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var u=I(a,n);if(u){if(u===f)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=h(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,a),i}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var f={};function d(){}function y(){}function p(){}var v={};c(v,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(E([])));g&&g!==e&&n.call(g,a)&&(v=g);var x=p.prototype=d.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function o(i,a,u,s){var c=h(t[i],t,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==r(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,u,s)}),(function(t){o("throw",t,u,s)})):e.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return o("throw",t,u,s)}))}s(c.arg)}var i;this._invoke=function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return i=i?i.then(r,r):r()}}function I(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,I(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=h(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function b(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function E(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:A}}function A(){return{value:void 0,done:!0}}return y.prototype=p,c(x,"constructor",p),c(p,"constructor",y),y.displayName=c(p,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(L.prototype),c(L.prototype,u,(function(){return this})),t.AsyncIterator=L,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new L(l(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(x),c(x,s,"Generator"),c(x,a,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=E,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(b),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),b(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;b(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function i(t,e,n,r,o,i,a){try{var u=t[i](a),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function u(t){i(a,r,o,u,s,"next",t)}function s(t){i(a,r,o,u,s,"throw",t)}u(void 0)}))}}e["a"]={props:{musicList:{type:Array,default:[]}},data:function(){return{audio:null,playState:!1,playProgress:0,playMode:"cycle",playVolume:80,playIndex:0,playTime:0,totalDuration:0,currentTime:0,noPlayAudioIndexList:[],getPlayProgressTimer:null,getAudioInfoTimer:null}},mounted:function(){var e=this;this.audio=t.createInnerAudioContext(),this.audio.onCanplay((function(){e.getAudioInfo()})),this.audio.onEnded((function(){e.changeMusic("next")})),this.audio.onSeeked((function(){setTimeout((function(){e.currentTime=e.audio.currentTime}),100),e.getPlayProgress()})),this.getPlayProgress()},watch:{musicList:function(){this.playIndex=0,this.getVideoData(this.$fullUrl(this.musicList[this.playIndex].audio_frequency))},playIndex:function(){this.getVideoData(this.$fullUrl(this.musicList[this.playIndex].audio_frequency))}},methods:{getAudioInfo:function(){var t=this;this.getAudioInfoTimer=setInterval((function(){t.audio.duration&&(t.totalDuration=t.audio.duration,console.log("总时长"+t.totalDuration),clearInterval(t.getAudioInfoTimer))}),200),this.playVolume=100*this.audio.volume,this.playState&&this.playMusic()},playMusic:function(){this.audio.play(),this.playState=!0},pauseMusic:function(){this.audio.pause(),this.playState=!1},setVolume:function(t){this.audio.volume=t/100},changeMusic:function(t){switch(this.playMode){case"cycle":"prev"===t?this.playIndex--:this.playIndex++,this.playIndex>this.musicList.length-1&&(this.playIndex=0),this.playIndex<0&&(this.playIndex=this.musicList.length-1);break;case"singleCycle":this.audio.seek(0),this.playMusic();break;case"random":this.noPlayAudioIndexList.length<1&&this.initRandomNoPlayIndexList(),this.playIndex=this.noPlayAudioIndexList[0],this.noPlayAudioIndexList.splice(0,1);break}},changePlayMode:function(t){this.playMode=t,"random"===t&&this.initRandomNoPlayIndexList()},transformSecondsToMinute:function(t){var e=Math.floor(t/60),n=Math.floor(t%60);return"".concat(e<10?"0"+e:e,":").concat(n<10?"0"+n:n)},initRandomNoPlayIndexList:function(){this.noPlayAudioIndexList=[];for(var t=0;t<this.musicList.length;t++)t!==this.playIndex&&this.noPlayAudioIndexList.push(t);for(var e=this.noPlayAudioIndexList.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),r=[this.noPlayAudioIndexList[n],this.noPlayAudioIndexList[e]];this.noPlayAudioIndexList[e]=r[0],this.noPlayAudioIndexList[n]=r[1]}},getVideoData:function(e){var n=this;return a(o().mark((function r(){return o().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.downloadFile({url:e,success:function(t){200===t.statusCode&&(n.audio.src=t.tempFilePath)}});case 1:case"end":return r.stop()}}),r)})))()},seek:function(t){clearInterval(this.getPlayProgressTimer),this.audio.seek(this.totalDuration*(t.detail.value/100))},sliderChanging:function(){clearInterval(this.getPlayProgressTimer)},getPlayProgress:function(){var t=this;this.getPlayProgressTimer=setInterval((function(){t.currentTime=t.audio.currentTime,t.playProgress=t.audio.currentTime/t.totalDuration*100}),1e3)}},computed:{calcTotalDuration:function(){return this.transformSecondsToMinute(this.totalDuration)},calcPlayDuration:function(){return this.transformSecondsToMinute(this.currentTime)}},beforeDestroy:function(){this.audio.destroy()}}}).call(this,n("543d")["default"])},e23d:function(t,e,n){},ee10:function(t,e,n){"use strict";var r;n.r(e);var o,i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.musicList.length>0?t.$fullUrl(t.musicList[t.playIndex].cover):null);t.$mp.data=Object.assign({},{$root:{m0:n}})},a=[],u=n("3dca"),s=u["a"],c=(n("0440"),n("f0c5")),l=Object(c["a"])(s,i,a,!1,null,"f8248882",null,!1,r,o);e["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/diy/music_player-create-component',
    {
        'components/diy/music_player-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ee10"))
        })
    },
    [['components/diy/music_player-create-component']]
]);
