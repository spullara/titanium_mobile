/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TitaniumJSConstants.h"

//Due to memory and CPU time, all the prettyprinting of the javascript has been stripped out of the strings.
//But to keep them still readable, the string is stored in such a way to keep the prettyprinting.

NSString * const titaniumJavascriptInjection =
@"<script>"
"Ti={_TOKEN:'%@',"		//Note to self. Store top._TOKENS[token] = window in order to redirect to subviews.
	"_JSON:function(object){"
		"var type = typeof object;"
		"switch (type) {"
			"case 'undefined': case 'function': case 'unknown': return undefined;"
			"case 'number': case 'boolean': return object;"
			"case 'string': return '\"'+object.replace(/%%/g,'%%25').replace(/#/g,'%%23').replace(/\"/g,'%%5C%%22').replace(/\\n/g,'%%5Cn').replace(/\\r/g,'%%5Cr')+'\"';"
		"}"
		"if((object===null) || (object.nodeType==1)) return 'null';"
		"if(typeof(object.toJson)=='function')return object.toJson();"
		"if(object.constructor.toString().indexOf('Date') != -1) {"
			"return 'new Date(' + object.getTime() + ')';"
		"}"
		"if(object.constructor.toString().indexOf('Array') != -1) {"
			"var res='[';var pre='';var len=object.length;"
			"for(var i=0;i<len;i++){"
				"var value = object[i];"
				"if(value !== undefined)value=this._JSON(value);"
				"if(value !== undefined){res+=pre+value;pre=', ';}"
			"}"
			"return res + ']';"
		"}"
		"var objects = [];"
		"for (var prop in object)"
		"{"
			"var value = object[prop];"
			"if (value !== undefined){value = this._JSON(value);}"
			"if (value !== undefined){objects.push(this._JSON(prop) + ': ' + value);}"
		"}"
		"return '{' + objects.join(', ') + '}';"
	"},"
	"_NET:window.XMLHttpRequest,"
	"_TICMD:function(objectName,functionName,argList){"
		"var result=null;"
		"var thisURL=null;"
		"var argString='';"
		"var seperatorString='';"
		"var len=argList.length;"
		"for(var i=0;i<len;i++){"
			"var value=argList[i];"
			"if (value !== undefined){value = Ti._JSON(value);}"
			"if (value == undefined){value = 'null';}"
			"argString+=seperatorString+value;"
			"seperatorString=',';"
		"}"
		"var nextURL='/_TICMD/%@/'+objectName+'/'+functionName+'?'+argString;"
		"while(nextURL!=null){"
			"result=null;"
			"thisURL=nextURL;"
			"nextURL=null;"
			"var xhReq=new Ti._NET();"
			"try{"
				"xhReq.open('GET',thisURL,false);"
				"xhReq.send(null);"
				"eval(xhReq.responseText);"
			"}catch(E){"
				"console.error('Error executing '+functionName+', error:'+E);"
				"throw E;"
				//"alert('TICMD EXCEPTION: '+E+'('+nextURL+')('+typeof(xhReq.responseText)+')');"
			"}"
		"}"
		"return result;"
	"},"
	"_ADDEVT:function(type,expression,bubbling){"	/* ADDEVT is the add event function prototype. It's here for speed reasons. */
		"var listeners=this._EVT[type];"
		"if(listeners==undefined)this._EVT[type]=[expression];"
		"else listeners.push(expression);"
		"return expression;"
	"},"
	"_REMEVT:function(type,expression,bubbling){"	/* ADDEVT is the add event function prototype. It's here for speed reasons. */
		"var listeners=this._EVT[type];if(listeners==undefined)return;"
		"var i;var listenerCount=listeners.length;"
		"for(i=0;i<listenerCount;i++){"
		"if(listeners[i]===expression){"
			"listeners.splice(i,1); return true;"
		"}};"
	"return false;},"
	"_ONEVT:function(event){"
		"var listeners=this._EVT[event.type];if(listeners==undefined)return;"
		"event.target=self;"
		"var i;var listenerCount=listeners.length;"
		"for(i=0;i<listenerCount;i++)"
			"{listeners[i](event);}"
	"},"
	"_DOTOUCH:false,"
	"_TOUCHLOAD:function(ev){Ti._DOTOUCH=false;ev._NODEF=ev.preventDefault;ev.preventDefault=function(){Ti._DOTOUCH=true;this._NODEF();};},"
	"_INVOC:function(ivc,args){return Ti._TICMD(ivc,'_RUN',args);},"
	"toString:function(){return '[Titanium object]';},"
	"platform:'iphone',"
	"version:'%s',"
"};Titanium=Ti;"
"Ti.userAgent=navigator.userAgent+' Titanium/'+Ti.version;"
"document.addEventListener('click',function(e){"
	"var targ = e.target;"
	"if (targ.nodeType == 3) targ = targ.parentNode;"
	"if (Ti.Platform && targ.target == 'ti:systembrowser') { Ti.Platform.openURL(targ.href); return false; }"
"},true);"
"(function(){function _rm(a,b,c){a[b]=function(){c.apply(this,arguments)}}_rm(console,'debug',function(a){Ti.API.debug(a)});_rm(console,'log',function(a){Ti.API.log(a)});_rm(console,'info',function(a){Ti.API.info(a)});_rm(console,'warn',function(a){Ti.API.warn(a)});_rm(console,'error',function(a){Ti.API.error(a)})})();"
"document.addEventListener('touchstart',Ti._TOUCHLOAD,true);"
//"document.addEventListener('touchmove',Ti._TOUCHLOAD,true);"
//"document.addEventListener('touchend',Ti._TOUCHLOAD,true);"
//"document.addEventListener('touchcancel',Ti._TOUCHLOAD,true);"
"%@"
"</script>";



/*
 * @tiapi(method=False,property=True,name=platform,since=0.4,type=string) titanium platform name property
 */
/*
 * @tiapi(method=False,property=True,name=version,since=0.4,type=string) titanium platform version property
 */
/*
 * @tiapi(method=False,property=True,name=userAgent,since=0.4,type=string) titanium platform userAgent property
 */
