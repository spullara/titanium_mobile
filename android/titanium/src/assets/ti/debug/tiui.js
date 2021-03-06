/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

Titanium.uiProxy = window.TitaniumUI;

var MenuItem = function() {
	this.obj; // reference to Java object
	this._callback;

	/**
	 * @tiapi(method=true,name=UI.MenuItem.isRoot,since=0.4) Determines if this menu item is the root item
	 * @tiresult[boolean] true, if the menuitem is the root menuitem; otherwise, false.
	 */
	this.isRoot = function() {
		return this.obj.isRoot();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.isSeparator,since=0.4) Determine if this menu item is a separator
	 * @tiapi Android doesn't have the concept of a separator, so these items are ignored.
	 * @tiresult[boolean] true, if a menu separator; otherwise, false.
	 */
	this.isSeparator = function() {
		return this.obj.isSeparator(); // Valid data, but ignored by Android
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.isItem,since=0.4) Determine if this menu item is a menu item
	 * @tiresult[boolean] true, if a menu item; otherwise, false.
	 */
	this.isItem = function() {
		return this.obj.isItem();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.isSubMenu,since=0.4) Determin if this menu item represents a sub-menu
	 * @tiresult[boolean] true, if a sub-menu; otherwise, false.
	 */
	this.isSubMenu = function() {
		return this.obj.isSubMenu();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.isEnabled,since=0.4) Determine enabled state of menu item.
	 * @tiresult[boolean] true, if the menu item is enabled; otherwise, false.
	 */
	this.isEnabled = function() {
		return this.obj.isEnabled();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.addSeparator,since=0.4) Add a separator to a menu
	 * @tiresult[MenuItem] the separator menu item.
	 */
	this.addSeparator = function() {
		var m = new MenuItem;
		m.obj = this.obj.addSeparator();
		return m;
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.addItem,since=0.4) Add a menu item
	 * @tiarg[string,label] Menu item label
	 * @tiarg[function,callback] Function to invoke when menu item is selected
	 * @tiarg[string,icon] Path to icon.
	 * @tiresult[MenuItem] the new menu item.
	 */
	this.addItem = function(label, callback, icon) {
		var m = new MenuItem();
		this._callback = callback;
		m.obj = this.obj.addItem(label, registerCallback(this, this._callback), icon);
		return m;
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.addSubMenu,since=0.4) Add a sub menu
	 * @tiarg[string,label] Sub menu label
	 * @tiarg[string,icon] Path to icon
	 * @tiresult[MenuItem] The sub menu item.
	 */
	this.addSubMenu = function(label, icon) {
		var m = new MenuItem();
		m.obj = this.obj.addSubMenu(label, icon);
		return m;
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.enable,since=0.4) enable a menu item
	 */
	this.enable = function() {
		this.obj.enable();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.disable,since=0.4) disable a menu item
	 */
	this.disable = function() {
		this.obj.disable();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.setLabel,since=0.4) Set the label on this menu item.
	 * @tiarg[string,label] the new label
	 */
	this.setLabel = function(label) {
		this.obj.setLabel(label);
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.getLabel,since=0.4) Get the current label
	 * @tiresult[string, label] The label
	 */
	this.getLabel = function() {
		return this.obj.getLabel();
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.setIcon,since=0.4) Set a new icon for the menu item
	 * @tiarg[string,path] Path to new icon
	 */
	this.setIcon = function(icon) {
		this.obj.setIcon(icon);
	};
	/**
	 * @tiapi(method=true,name=UI.MenuItem.getIcon,since=0.4) Get the current icon path
	 * @tiresult[string,path] Path to current icon.
	 */
	this.getIcon = function() {
		return this.obj.getIcon();
	};
	this.setCallback = function(f) {
		_callback = f;
		this.obj.setCallback(registerCallback(this, f));
	};
};

var OptionDialog = function(proxy) {
	this.proxy = proxy;

	/**
	 * @tiapi(method=true,name=UI.OptionDialog.setTitle,since=0.4) Set the title
	 * @tiarg[string,title] The title to set on the dialog
	 */
	this.setTitle = function(title) {
		this.proxy.setTitle(title);
	};
	/**
	 * @tiapi(method=true,name=UI.OptionDialog.setOptions,since=0.4) Set the list of options
	 * @tiarg[string array,options] an array of string values to display
	 */
	this.setOptions = function(options) {
		var o = transformObjectValue(options, []);
		if (typeOf(o) !== 'array') {
			o = [ options ];
		}
		this.proxy.setOptions(o);
	};
	/**
	 * @tiapi(method=true,name=UI.OptionDialog.addEventListener,since=0.4) Add a listener. Currently supports 'click'
	 * @tiarg[string,eventName] Name of event.
	 * @tiarg[function,listener] Function to handle the event callback
	 * @tiresult[int] id used to remove the added listener
	 */
	this.addEventListener = function(eventName, listener) {
		if (eventName !== "click") {
			throw new Error("OptionDialog only handles click events. Use event name 'click'");
		}

		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.OptionDialog.removeEventListener,since=0.5) Remove listener added for the 'click' event.
	 * @tiarg[string,eventName] name of the event to listen for.
	 * @tiarg[int,listenerId] id returned by addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		if (eventName !== "click") {
			throw new Error("OptionDialog only handles click events. Use event name 'click'");
		}

		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.OptionDialog.show,since=0.4) Show this dialog.
	 */
	this.show = function() {
		this.proxy.show();
	};
	// Noop, iPhone only methods
	this.setDestructive = function(id) {

	};
	this.setCancel = function(id) {

	}
};

var AlertDialog = function(proxy) {
	this.proxy = proxy;

	/**
	 * @tiapi(method=true,name=UI.AlertDialog.setTitle,since=0.4) Set the title
	 * @tiarg[string,title] title for dialog
	 */
	this.setTitle = function(title) {
		this.proxy.setTitle(title);
	};
	/**
	 * @tiapi(method=true,name=UI.AlertDialog.setMessage,since=0.4) Set the dialog message
	 * @tiarg[string,message] message to display in the dialog
	 */
	this.setMessage = function(msg) {
		alert("setting msg: " + msg);
		this.proxy.setMessage(msg);
	};
	/**
	 * @tiapi(method=true,name=UI.AlertDialog.setButtonNames,since=0.4) Text to display on each button
	 * @tiarg[string array,names] One to three names to apply to buttons. Android only supports up to 3 buttons.
	 */
	this.setButtonNames = function(names) {
		var n = transformObjectValue(names, []);
		if (typeOf(n) !== 'array') {
			n = [ names ];
		}
		this.proxy.setButtons(n);
	};
	/**
	 * @tiapi(method=true,name=UI.AlertDialog.addEventListener,since=0.4) Add a listener for the 'click' event.
	 * @tiarg[string,eventName] name of the event to listen for
	 * @tiarg[function,listener] function to call when button is clicked.
	 * @tiresult[int] id used to remove the added listener
	 */
	this.addEventListener = function(eventName, listener) {
		if (eventName !== "click") {
			throw new Error("AlertDialog only handles click events. Use event name 'click'");
		}

		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.AlertDialog.removeEventListener,since=0.5) Remove listener added for the 'click' event.
	 * @tiarg[string,eventName] name of the event to listen for.
	 * @tiarg[int,listenerId] id returned by addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		if (eventName !== "click") {
			throw new Error("AlertDialog only handles click events. Use event name 'click'");
		}

		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.AlertDialog.show,since=0.4) Show the alert dialog
	 */
	this.show = function() {
		this.proxy.show();
	}
};

var ActivityIndicator = function(proxy) {
	this.proxy = proxy;

	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.setMessage,since=0.4) Message to display
	 * @tiarg[string,msg] The message
	 */
	this.setMessage = function(msg) {
		this.proxy.setMessage(msg);
	};
	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.setMin,since=0.4) Set minimum value to accept on determinant indicators.
	 * @tiarg[int,n] the minimum value
	 */
	this.setMin = function(n) {
		this.proxy.setMin(n);
	};
	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.setMax,since=0.4) Set maximum value to accept on determinant indicators.
	 * @tiarg[int,n] the maximum value
	 */
	this.setMax = function(n) {
		this.proxy.setMax(n);
	};
	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.setValue,since=0.6) Set the current indicator position between min and max
	 * @tiarg[int,n] the position
	 */
	this.setValue = function(n) {
		this.proxy.setPosition(n);
	};
	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.show,since=0.4) Show the indicator
	 */
	this.show = function() {
		this.proxy.show();
	};
	/**
	 * @tiapi(method=true,name=UI.ActivityIndicator.hide,since=0.4) Hide the indicator
	 */
	this.hide = function() {
		this.proxy.hide();
	};
	// See below for setLocation
};

var EmailDialog = function(proxy) {
	this.proxy = proxy;
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.setSubject,since=0.6) Set the subject line in the intent
	 * @tiarg[string,subject] the subject text
	 */
	this.setSubject = function(subject) {
		if (isUndefined(subject)) {
			subject = null;
		}
		proxy.setSubject(subject);
	};
	// Internal use method
	this.toStringArray = function(addrs) {
		var sa = [];
		if (!isUndefined(addrs)) {
			if (typeOf(addrs) === 'string') {
				Titanium.API.debug("addrs is string");
				sa.push(addrs);
			} else if (typeOf(addrs) === 'array') {
				Titanium.API.debug("addrs is array");
				for (addr in addrs) {
					if (typeOf(addrs[addr]) === 'string') {
						sa.push(addrs[addr]);
					}
				}
			}
		}
		return sa;
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.setToRecipients,since=0.6) Set a list of email addresses on the To: line.
	 * @tiarg[array,addrs] The list of addresses as strings. Also allows for a single string address
	 */
	this.setToRecipients = function(addrs) {
		addrs = this.toStringArray(addrs);
		for (addr in addrs) {
			this.proxy.addTo(addrs[addr]);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.setCcRecipients,since=0.6) Set a list of email addresses on the Cc: line.
	 * @tiarg[array,addrs] The list of addresses as strings. Also allows for a single string address
	 */
	this.setCcRecipients = function(addrs) {
		addrs = this.toStringArray(addrs);
		for (addr in addrs) {
			this.proxy.addCc(addrs[addr]);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.setBccRecipients,since=0.6)
	 * @tiarg[array,addrs] The list of addresses as strings. Also allows for a single string address
	 */
	this.setBccRecipients = function(addrs) {
		addrs = this.toStringArray(addrs);
		for (addr in addrs) {
			this.proxy.addBcc(addrs[addr]);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.setMessageBody,since=0.6) Set the message body text.
	 * @tiarg[string,msg] the message text.
	 */
	this.setMessageBody = function(msg) {
		this.proxy.setMessage(msg);
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.addAttachment,since=0.6) Allows adding a single attachment to the message
	 * @tiarg[object,attachment] Supports a path or an Image blob.
	 */
	this.addAttachment = function(attachment) {
		var a = {};
		if (!isUndefined(attachment)) {
			Titanium.API.debug("Attachment type: " + typeOf(attachment));
			if (typeOf(attachment) != 'string') {
				if(!isUndefined(attachment.url)) {
					a.file = String(attachment.url);
				}
			} else {
				a.file = attachment;
			}
			this.proxy.addAttachment(Titanium.JSON.stringify(a));
		}
	};
	/**
	 * @tiapi(method=true,name=UI.EmailDialog.open,since=0.6) Open the dialog, no configuration allowed after opening.
	 */
	this.open = function() {
		this.proxy.open();
	};
};

var TitaniumNotifier = function(proxy) {
	this.proxy = proxy; // reference to Java object
	this._callback; //

	/**
	 * @tiapi(method=true,name=UI.Notifier.setTitle,since=0.4) Set the title for a notification
	 * @tiapi Android currently uses Toast, so title is not displayed.
	 * @tiarg[string,title] The title
	 */
	this.setTitle = function(title) {
		this.proxy.setTitle(title);
	};
	/**
	 * @tiapi(method=true,name=UI.Notifier.setMessage,since=0.4) Set the message
	 * @tiarg[string,message] The message
	 */
	this.setMessage = function(message) {
		this.proxy.setMessage(message);
	};
	/**
	 * @tiapi(method=true,name=UI.Notifier.setIcon,since=0.4) Set an icon for the notification
	 * @tiapi Android currently uses Toast, icon will not display.
	 * @tiarg[string,iconUrl] The path to the icon
	 */
	this.setIcon = function(iconUrl) {
		this.proxy.setIcon(iconUrl);
	};
	/**
	 * @tiapi(method=true,name=UI.Notifier.setDelay,since=0.4) Set how long notification is displayed.
	 * @tiapi Android uses one or greater for long delay, zero for short delay
	 * @tiarg[int,delay] Period to delay.
	 */
	this.setDelay = function(delay) {
		this.proxy.setDelay(delay);
	};
	this.setCallback = function(callback) {
		this._callback = callback;
		this.proxy.setCallback(registerCallback(this, _callback));
	};
	/**
	 * @tiapi(method=true,name=UI.Notifier.show,since=0.4) Show the notifier
	 * @tiarg[boolean,animate] currently ignored on android
	 * @tiarg[boolean,autohide] currently ignored on android
	 */
	this.show = function(animate, autohide) {

		this.proxy.show(transformObjectValue(animate, false),
				transformObjectValue(autohide, true));
	};
	/**
	 * @tiapi(method=true,name=UI.Notifier.hide,since=0.4) Hide the notifier
	 * @tiarg[boolean,animate] ignored on Android
	 */
	this.hide = function(animate) {
		this.proxy.hide(transformObjectValue(animate, false));
	}
};

var ImageView = function(proxy) {
	this.proxy = proxy; // reference to Java object

	this.setURL = function(url) {
		if (!isUndefined(url)) {
			this.proxy.setURL(proxy);
		}
	};

	this.setScale = function(scale) {
		this.setScale(scale);
	};
};

var TableView = function(proxy) {
	this.proxy = proxy; // reference to Java object
	this._callback;

	/**
	 * @tiapi(method=true,name=UI.TableView.setData,since=0.5) set options data describing view
	 * @tiarg[string,data] options data
	 */
	this.setData = function(data) {
		this.proxy.setData(Titanium.JSON.stringify(data));
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.setRowHeight,since=0.5) set the height of each row
	 * @tiarg[string,rowHeight] height of row
	 */
	this.setRowHeight = function(height) {
		this.proxy.setRowHeight(height);
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.getIndexByName,since=0.6) the current index of the first
	 * @tiapi row with the given name, searching from 0.
	 * @tiarg[int,index] index of the first row with name or -1 if not found.
	 */
	this.getIndexByName = function(name) {
		return this.proxy.getIndexByName(name);
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.addEventListener,since=0.6) Add a listener for to this view. Support 'focused' and 'unfocused'
	 * @tiarg[string,eventName] The event name
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] id used when removing the listener
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.removeEventListener,since=0.6) Remove a previously added listener
	 * @tiarg[string,eventName] The event name
	 * @tiarg[int,listenerId] id returned from addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.insertRowAfter,since=0.6) insert a row after the given index
	 * @tiarg[int,index] row index of an existing row
	 * @tiarg[object,options] row data
	 */
	this.insertRowAfter = function(index, options) {
		if (isUndefined(options)) {
			options = {};
		}
		this.proxy.insertRowAfter(index, Titanium.JSON.stringify(options));
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.insertRowBefore,since=0.6) insert a row before the given index
	 * @tiarg[int,index] row index of an existing row
	 * @tiarg[object,options] row data
	 */
	this.insertRowBefore = function(index, options) {
		if (isUndefined(options)) {
			options = {};
		}
		this.proxy.insertRowBefore(index, Titanium.JSON.stringify(options));
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.deleteRow,since=0.6) delete row at the given index
	 * @tiarg[int,index] row index of an existing row
	 */
	this.deleteRow = function(index) {
		this.proxy.deleteRow(index);
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.UpdateRow,since=0.6) update the row at the given index
	 * @tiarg[int,index] row index of an existing row
	 * @tiarg[object,options] row data
	 */
	this.updateRow = function(index, options) {
		if (isUndefined(options)) {
			options = {};
		}
		this.proxy.updateRow(index, Titanium.JSON.stringify(options));
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.appendRow,since=0.7.0) append a row at the end of the table.
	 * @tiarg[object,rowData] JSON compatible data
	 * @tiarg[object,options] options for append
	 */
	this.appendRow = function(rowData, options) {
		if (!isUndefined(rowData)) {
			if (isUndefined(options)) {
				options = {};
			}
			this.proxy.appendRow(Titanium.JSON.stringify(rowData), Titanium.JSON.stringify(options));
		}
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.getRowCount,since=0.6) the number of rows in the table.
	 * @tiresult[int] row count
	 */
	this.getRowCount = function() {
		return this.proxy.getRowCount();
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.getIndexByName,since=0.6) return the index of an existing row by name
	 * @tiarg[String,name] row name
	 * @tireslt[int,options] row index
	 */
	this.getIndexByName = function(name) {
		if(isUndefined(name)) {
			name = null;
		}
		return this.proxy.getIndexByName(name);
	};
	/**
	 * @tiapi(method=true,name=UI.TableView.getName,since=0.6) get tableview name
	 * @tiresult[String] table view name
	 */
	this.getName = function() {
		return this.proxy.getName();
	};
	this.setName = function(name) {
		if(!isUndefined(name)) {
			this.proxy.setName(name);
		}
	};
	this.setIsPrimary = function(primary) {
		this.proxy.setIsRoot(primary);
	};
	this.close = function() {
		this.proxy.close();
	};
	this.setFontWeight = function(fontWeight) {
		if (!isUndefined(fontWeight)) {
			this.proxy.setFontWeight(fontWeight);
		}
	};
	this.setFontSize = function(fontSize) {
		if (!isUndefined(fontSize)) {
			this.proxy.setFontSize(fontSize);
		}
	};
	this.setCallback = function(callback) {
		this._callback = callback;
		this.proxy.setCallback(registerCallback(this, this._callback));
	};
};

var WebView = function(proxy) {
	this.proxy = proxy; // reference to Java object
	this.getName = function() {
		return this.proxy.getName();
	};
	/**
	 * @tiapi(method=true,name=UI.currentView.addEventListener,since=0.6) Add a listener for to this view. Support 'focused' and 'unfocused'
	 * @tiarg[string,eventName] The event name
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] id used when removing the listener
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.currentView.removeEventListener,since=0.6) Remove a previously added listener
	 * @tiarg[string,eventName] The event name
	 * @tiarg[int,listenerId] id returned from addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
};

var UserWindow = function(proxy) {
	this.proxy = proxy; // reference to java object
	this._window; // the DOM window

	this.setWindowId = function(name) { //TODO: Is this to be exposed or not? -blain
		this.proxy.setWindowId(name);
	}
	/**
	 * @tiapi(method=true,name=UI.UserWindow.setURL,since=0.4) Sets the url for the window
	 * @tiarg[string,url] url to HTML file.
	 */
	this.setURL = function(url) {
		this.proxy.setUrl(url);
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.setTitle,since=0.4) Sets the window title
	 * @tiarg[string,title] The title for the window
	 */
	this.setTitle = function(title) {
		this.proxy.setTitle(title);
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.setTitleImage,since=0.4) Set an image in the title area
	 * @tiarg[string,imageUrl] url to image
	 */
	this.setTitleImage = function(imageUrl) {
		this.proxy.setTitleImage(imageUrl);
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.setFullscreen,since=0.4) Set the window to take over the full screen
	 * @tiapi In the beta release of Android this method cannot override the state set in tiapp.xml
	 * @tiarg[boolean,fullscreen] true, if the image should be fullscreen; otherwise, false.
	 */
	this.setFullscreen = function(fullscreen) {
		this.proxy.setFullscreen(fullscreen);
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.setType,since=0.4) Set type of window. Current types are 'single' and 'tabbed'
	 * @tiapi tabbed windows should not be used except for the initial view.
	 * @tiarg[string,type] WINDOW_NORMAL or WINDOW_TABBED
	 */
	this.setType = function(type) {
		this.proxy.setType(type);
	}
	/**
	 * @tiapi(method=true,name=UI.UserWindow,since=0.4) open the window
	 * @tiarg[hash,options,optional=true] Options used to configure window before opening.
	 */
	this.open = function(options) {
		this._window = this.proxy.open(); // Handle options later
		// append to windows
		return this._window;
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.close,since=0.4) close this window
	 * @tiarg[hash,options,optional=true] Ignored on Android in the beta.
	 */
	this.close = function(options) {
		this.proxy.close();
		// Remove from windows
		this._window = null;
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.addEventListener,since=0.4) Add a listener for to this window. Support 'focused' and 'unfocused'
	 * @tiarg[string,eventName] The event name
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] id used when removing the listener
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.removeEventListener,since=0.4) Remove a previously added listener
	 * @tiarg[string,eventName] The event name
	 * @tiarg[int,listenerId] id returned from addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};

	// View methods in 0.6.0

	/**
	 * @tiapi(method=true,name=UI.UserWindow.addView,since=0.6) add a view at the end of the view list
	 * @tiarg[View,view] The view object
	 */
	this.addView = function(view) {
		this.proxy.addView(view.proxy);
	};

	/**
	 * @tiapi(method=true,name=UI.UserWindow.getViews,since=0.6) an array of view proxies
	 * @tiresult[array] the views
	 */
	this.getViews = function() {
		var views = [];
		var count = this.proxy.getViewCount();
		for(i = 0; i < count; i++) {
			v = {};
			v.window = this.proxy;
			v.key = this.proxy.getViewKey(i);
			v.index = i;
			v.name = this.proxy.getViewName(v.key);
			v.addEventListener = function(eventName, listener) {
				return this.window.addViewEventListener(this.key, eventName, registerCallback(this, listener));
			};
			v.removeEventListener = function(eventName, listenerId) {
				this.window.removeViewEventListener(this.key, eventName, listenerId);
			};

			views[i] = v;
		}
		return views;
	};

	/**
	 * @tiapi(method=true,name=UI.UserWindow.setActiveViewIndex,since=0.6) The index of the view to display in the window
	 * @tiarg[int,index] The index of the view in the array returned by getViews()
	 * @tiarg[object, options] options
	 */
	this.setActiveViewIndex = function(index, options) {
		if (isUndefined(options)) {
			options = null;
		} else {
			options = Titanium.JSON.stringify(options);
		}
		this.proxy.setActiveViewIndex(index, options);
	};

	/**
	 * @tiapi(method=true,name=UI.UserWindow.showView,since=0.6) locate a view in the views array and display in the window
	 * @tiarg[View,view] The view object
	 * @tiarg[object, options] options
	 */
	this.showView = function(view, options) {
		if (isUndefined(options)) {
			options = null;
		} else {
			options = Titanium.JSON.stringify(options);
		}
		if(!isUndefined(view.key)) {
			this.proxy.showViewByKey(view.key, options);
		} else {
			this.proxy.showView(view.proxy, options);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.UserWindow.getViewByName,since=0.6) locate a view in the views array by name
	 * @tiarg[String,name] The view name
	 * @tiresult[object, view] the view
	 */
	this.getViewByName = function(name) {
		var v = null;
		if (!isUndefined(name)) {
			var views = this.getViews();

			for(i = 0; i < views.length; i++) {
				var view = views[i];
				Titanium.API.debug("*** Name: " + name + " vName: " + view.name);
				if (!isUndefined(view.name)) {
					if (name == view.name) {
						v = view;
						break;
					}
				}
			}
		}
		return v;
	};

	/**
	 * @tiapi(method=true,name=UI.UserWindow.getActiveViewIndex,since=0.6) return the position of the current view in the views array.
	 * @tiresult[int] the view index.
	 */
	this.getActiveViewIndex = function() {
		return this.proxy.getActiveViewIndex();
	};

	// IPhone only methods
	this.setNavBarColor = function (color) {

	};
	this.setLeftNavButton = function(button) {

	};
	this.setRightNavButton = function(button) {

	};
	this.showNavBar = function(options) {

	};
	this.hideNavBar = function(options) {

	};
	this.setBarColor = function(options) {

	};
	this.setTitleControl = function(button) {

	};
	this.setToolbar = function() {

	};
};

UserWindow.prototype.__defineGetter__("window", function() {
	return this._window;
});

var Button = function(proxy) {
	this.proxy = proxy;
	/**
	 * @tiapi(method=true,name=UI.Button.addEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.Button.removeEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
};

var DatePicker = function(proxy) {
	this.proxy = proxy;

	this.setValue = function(value, options) {
		// send date using getTime()
	};

	/**
	 * @tiapi(method=true,name=UI.DatePicker.addEventListener,since=0.7.0) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		var l = function(e) {
			var d = new Date(0);
			d.setTime(e.value);
			listener({ value : d});
		}
		return this.proxy.addEventListener(eventName, registerCallback(this, l));
	};
	/**
	 * @tiapi(method=true,name=UI.DatePicker.removeEventListener,since=0.7.0) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
};

var Picker = function(proxy) {
	this.proxy = proxy;

	this.setData = function(value, options) {
	};

	/**
	 * @tiapi(method=true,name=UI.Picker.addEventListener,since=0.7.0) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.Picker.removeEventListener,since=0.7.0) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventName, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};

	this.setColumnData = function(col, data) {
		this.proxy.setColumnData(col, Titanium.JSON.stringify(data));
	};

	this.getSelectedRow = function(col) {
		return this.proxy.getSelectedRow(col);
	};

	this.setData = function(data) {
		this.proxy.setData(Titanium.JSON.stringify(data));
	};

	this.selectRow = function(col, row) {
		this.proxy.selectRow(col, row);
	}
};

var Switch = function(proxy) {
	this.proxy = proxy;

	/**
	 * @tiapi(method=true,name=UI.Switch.addEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.Switch.removeEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventname, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.Switch.setValue,since=0.7.0) set the value.
	 * @tiarg[boolean,value] value to set the switch too
	 */
	this.setValue = function(value) {
		if (!isUndefined(value)) {
			this.proxy.setValue(value);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.Switch.getValue,since=0.7.0) get the value.
	 * @tiresult[boolean] value of the switch
	 */
	this.getValue = function() {
		return this.proxy.getValue();
	};
};

/**
 * @tiapi(property=true,name=UI.Switch.value,since=0.7.0) get/set the switch value
 */
Switch.prototype.__defineGetter__("value", function() {
	return this.getValue;
});

Switch.prototype.__defineSetter__("value", function(value) {
	this.setValue(value);
});

var Slider = function(proxy) {
	this.proxy = proxy;
	/**
	 * @tiapi(method=true,name=UI.Slider.addEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.Slider.removeEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventname, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.Slider.setValue,since=0.7.0) set the value.
	 * @tiarg[int,value] value to set the slider too
	 */
	this.setValue = function(value) {
		if (!isUndefined(value)) {
			this.proxy.setValue(value);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.Slider.getValue,since=0.7.0) get the value.
	 * @tiresult[int] value of the slider
	 */
	this.getValue = function() {
		return this.proxy.getValue();
	};
};

/**
 * @tiapi(property=true,name=UI.Slider.value,since=0.7.0) get/set the slider value
 */
Slider.prototype.__defineGetter__("value", function() {
	return this.getValue;
});

Slider.prototype.__defineSetter__("value", function(value) {
	this.setValue(value);
});

var TextArea = function(proxy) {
	this.proxy = proxy;
	/**
	 * @tiapi(method=true,name=UI.TextArea.focus,since=0.6) Bring focus to a control. Does not auto display soft-keyboard
	 */
	this.focus = function() {
		this.proxy.focus();
	}
	/**
	 * @tiapi(method=true,name=UI.TextArea.blur,since=0.6) Closed soft keyboard if it's display. Android doesn't seem to actual clearing of focus for Text controls.
	 */
	this.blur = function() {
		this.proxy.blur();
	}
	/**
	 * @tiapi(method=true,name=UI.TextArea.addEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.TextArea.removeEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventname, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.TextArea.setValue,since=0.7.0) set the value.
	 * @tiarg[string,value] value to set the slider too
	 */
	this.setValue = function(value) {
		if (!isUndefined(value)) {
			this.proxy.setValue(value);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.TextArea.getValue,since=0.7.0) get the value.
	 * @tiresult[string] value of the slider
	 */
	this.getValue = function() {
		return this.proxy.getValue();
	};
};

/**
 * @tiapi(property=true,name=UI.TextField.value,since=0.7.0) get/set the text field value
 */
TextArea.prototype.__defineGetter__("value", function() {
	return this.getValue;
});

TextArea.prototype.__defineSetter__("value", function(value) {
	this.setValue(value);
});

var TextField = function(proxy) {
	this.proxy = proxy;
	/**
	 * @tiapi(method=true,name=UI.TextField.focus,since=0.6) Bring focus to a control. Does not auto display soft-keyboard
	 */
	this.focus = function() {
		this.proxy.focus();
	}
	/**
	 * @tiapi(method=true,name=UI.TextField.blur,since=0.6) Closed soft keyboard if it's display. Android doesn't seem to actual clearing of focus for Text controls.
	 */
	this.blur = function() {
		this.proxy.blur();
	}
	/**
	 * @tiapi(method=true,name=UI.TextField.addEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listener] The event listener
	 * @tiresult[int] listenerId used to unregister the event.
	 */
	this.addEventListener = function(eventName, listener) {
		return this.proxy.addEventListener(eventName, registerCallback(this, listener));
	};
	/**
	 * @tiapi(method=true,name=UI.TextField.removeEventListener,since=0.6) Add a listener.
	 * @tiarg[string,eventName] The name of the event. Supports:
	 * @tiarg[function,listenerId] The event listener id returned by addEventListener
	 */
	this.removeEventListener = function(eventname, listenerId) {
		this.proxy.removeEventListener(eventName, listenerId);
	};
	/**
	 * @tiapi(method=true,name=UI.TextField.setValue,since=0.7.0) set the value.
	 * @tiarg[string,value] value to set the slider too
	 */
	this.setValue = function(value) {
		if (!isUndefined(value)) {
			this.proxy.setValue(value);
		}
	};
	/**
	 * @tiapi(method=true,name=UI.TextField.getValue,since=0.7.0) get the value.
	 * @tiresult[string] value of the slider
	 */
	this.getValue = function() {
		return this.proxy.getValue();
	};
};

/**
 * @tiapi(property=true,name=UI.TextField.value,since=0.7.0) get/set the text field value
 */
TextField.prototype.__defineGetter__("value", function() {
	return this.getValue;
});

TextField.prototype.__defineSetter__("value", function(value) {
	this.setValue(value);
});

Titanium.UI = {
	/**
	 * @tiapi(property=true,name=UI.WINDOW_TABBED,since=0.4) Used in UserWindow.setType for a tabbed window
	 * @tiapi Android currently does not support tabbed windows except as the root/initial window.
	 */
	WINDOW_TABBED : 'tabbed',
	/**
	 * @tiapi(property=true,name=UI.WINDOW_NORMAL,since=0.4) Used in UserWindow.setType for a single window
	 */
	WINDOW_NORMAL : 'single',
	/**
	 * @tiapi(method=true,name=UI.createWindow,since=0.4) Create a new window
	 * @tiarg[hash,options,optional=true] Options for configuring window
	 * @tiresult[UserWindow] the new window
	 */
	createWindow : function(options) {
		var w = new UserWindow(Titanium.uiProxy.createWindow());
		if (!isUndefined(options)) {
			var url = options['url'];
			var fullscreen = options['fullscreen'];
			var type = options['type'];
			var title = options['title'];
			var titleImage = options['titleImage'];

			if (!isUndefined(url)) {
				w.setURL(url);
			}
			if (!isUndefined(fullscreen)) {
				w.setFullscreen(fullscreen);
			}
			if (!isUndefined(type)) {
				w.setType(type);
			}
			if (!isUndefined(title)) {
				w.setTitle(title);
			}
			if (!isUndefined(titleImage)) {
				w.setTitleImage(titleImage);
			}
		}

		return w;
	},
	/**
	 * @tiapi(method=true,name=UI.createMenu,since=0.4) Create a new root menu item
	 * @tiresult[MenuItem] the new root menu item
	 */
	createMenu : function() {
		var m = new MenuItem;
		m.obj = Titanium.uiProxy.createMenu(); // Consider a hash of menus
		return m;
	},
	createTrayMenu : function() {
		//TODO implement UI.createTrayMenu
	},
	/**
	 * @tiapi(method=true,name=UI.setMenu,since=0.4) Associate a menu with the current window
	 * @tiarg[MenuItem,m] A root menu item
	 */
	setMenu : function(m) {
		Titanium.uiProxy.setMenu(m.obj);
	},
	getMenu : function() {
		Titanium.uiProxy.getMenu(); //Not sure what this should/will do
	},
	setContextMenu : function() {
		//TODO implement UI.setContextMenu
	},
	getContextMenu : function() {
		//TODO implement UI.getContextMenu
	},
	setIcon : function() {
		//TODO implement UI.setIcon
	},
	windows : function() {
		//TODO implement UI.windows as value
	},
	/**
	 * @tiapi(method=true,name=UI.createAlertDialog,since=0.4) Create an alert dialog
	 * @tiarg[hash,options,optional=true] options for configuring alert dialog
	 * @tiresult[AlertDialog] the dialog.
	 */
	createAlertDialog : function(options) {
		var dlg = new AlertDialog(Titanium.uiProxy.createAlertDialog());

		if (! isUndefined(options)) {
			title = options['title'];
			message = options['message'];
			buttonNames = options['buttonNames'];

			if (!isUndefined(title)) {
				dlg.setTitle(title);
			}
			if (!isUndefined(message)) {
				dlg.setMessage(message);
			}
			if (!isUndefined(buttonNames)) {
				dlg.setButtonNames(buttonNames);
			}
		}

		return dlg;
	},
	/**
	 * @tiapi(method=true,name=UI.createOptionDialog,since=0.4) Create an option dialog
	 * @tiarg[hash,options,optional=true] options for configuring option dialog
	 * @tiresult[OptionDialog] the dialog.
	 */
	createOptionDialog : function(options) {
		var dlg = new OptionDialog(Titanium.uiProxy.createOptionDialog());

		if (! isUndefined(options)) {
			title = options['title'];
			optionValues = options['options'];

			if (!isUndefined(title)) {
				dlg.setTitle(title);
			}
			if (!isUndefined(buttonNames)) {
				dlg.setOptions(optionValues);
			}
		}

		return dlg;
	},
	/**
	 * @tiapi(method=true,name=UI.createActivityIndicator,since=0.4) Create an activity indicator
	 * @tiarg[hash,options,optional=true] options for configuring the activiy indicator
	 * @tiresult[ActivityIndicator] the dialog.
	 */
	createActivityIndicator : function(options) {
		var ind = new ActivityIndicator(Titanium.uiProxy.createProgressDialog());
		ind.setLocation(1); // Dialog
		if (!isUndefined(options)) {
			var message = options['message'];
			var loc = options['location'];
			var type = options['type'];
			var minVal = options['min'];
			var maxVal = options['max'];
			var value = options['value'];

			if (!isUndefined(message)) {
				ind.setMessage(message);
			}
			if (!isUndefined(loc)) {
				ind.setLocation(loc);
			}
			if (!isUndefined(type)) {
				ind.setType(type);
			}
			if (!isUndefined(minVal)) {
				ind.setMin(minVal);
			}
			if (!isUndefined(maxVal)) {
				ind.setMax(maxVal);
			}
			if (!isUndefined(value)) {
				ind.setValue(value);
			}
		}
		return ind;
	},
	/**
	 * @tiapi(method=true,name=UI.createProgressBar,since=0.4) Create an activity indicator
	 * @tiarg[hash,options,optional=true] options for configuring the activiy indicator
	 * @tiresult[ActivityIndicator] the dialog.
	 */
	createProgressBar : function(options) {
		var ind = new ActivityIndicator(Titanium.uiProxy.createProgressDialog());
		ind.setLocation(0); // StatusBar

		if (!isUndefined(options)) {
			var message = options['message'];
			var loc = options['location'];
			var type = options['type'];
			var minVal = options['min'];
			var maxVal = options['max'];
			var value = options['value'];

			if (!isUndefined(message)) {
				ind.setMessage(message);
			}
			if (!isUndefined(loc)) {
				ind.setLocation(loc);
			}
			if (!isUndefined(type)) {
				ind.setType(type);
			}
			if (!isUndefined(minVal)) {
				ind.setMin(minVal);
			}
			if (!isUndefined(maxVal)) {
				ind.setMax(maxVal);
			}
			if (!isUndefined(value)) {
				ind.setValue(value);
			}
		}
		return ind;
	},
	/**
	 * @tiapi(method=true,name=UI.createImageView,since=0.7.0) Create an image view
	 * @tiarg[object, options] a dictionary/hash of options
	 * @tiresult[ImageView] the image view.
	 */
	createImageView : function(options) {
		var iv = new ImageView(Titanium.uiProxy.createImageView());
		if (isUndefined(options)) {
			options = {};
		}
		iv.proxy.processOptions(Titanium.JSON.stringify(options));
		return iv;
	},
	/**
	 * @tiapi(method=true,name=UI.createTableView,since=0.5) Create a table view
	 * @tiarg[object, options] a dictionary/hash of options
	 * @tiresult[TableView] the table view.
	 */
	createTableView : function(options, callback) {
		 var tv = new TableView(Titanium.uiProxy.createTableView());
		 if (isUndefined(options)) {
			 options = {}
		 }
		 tv.proxy.processOptions(Titanium.JSON.stringify(options));
		 tv.setCallback(callback);
		 return tv;
	},
	/**
	 * @tiapi(method=true,name=UI.createWebView,since=0.6) Create a web view
	 * @tiarg[object, options] a dictionary/hash of options
	 * @tiresult[WebView] the web view.
	 */
	createWebView : function(options) {
		 var wv = new WebView(Titanium.uiProxy.createWebView());
		 if (isUndefined(options)) {
			 options = {};
		 }
		 wv.proxy.processOptions(Titanium.JSON.stringify(options));
		 return wv;
	},
	/**
	 * @tiapi(method=true,name=UI.createEmailDialog,since=0.6) Create an email dialog. Uses ACTION_SEND.
	 * @tiarg[object, options] a dictionary/hash of options
	 * @tiresult[EmailDialog] the dialog.
	 */
	createEmailDialog : function(options) {
		var dlg = new EmailDialog(Titanium.uiProxy.createEmailDialog());
		if (!isUndefined(options)) {
			var subject = options["subject"];
			var to = options["toRecipients"];
			var cc = options["ccRecipients"];
			var bcc = options["bccRecipients"];
			var msg = options["messageBody"];
			var attachment = options["attachment"];

			if (!isUndefined(subject)) {
				dlg.setSubject(subject);
			}
			if (!isUndefined(to)) {
				dlg.setToRecipients(to);
			}
			if (!isUndefined(cc)) {
				dlg.setCcRecipients(cc);
			}
			if (!isUndefined(bcc)) {
				dlg.setBccRecipients(bcc);
			}
			if (!isUndefined(msg)) {
				dlg.setMessageBody(msg);
			}
			if (!isUndefined(attachment)) {
				dlg.addAttachment(attachment);
			}
		}

		return dlg;
	},
	/**
	 * @tiapi(method=true,name=UI.createButton,since=0.6) Create a native button
	 * @tiarg[object, options] a set of configuration options for the button
	 * @tiresult[Button] the button.
	 */
	createButton : function(options) {
		var c = new Button(Titanium.uiProxy.createButton(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	/**
	 * @tiapi(method=true,name=UI.createSwitch,since=0.6) Create a native toggle
	 * @tiarg[object, options] a set of configuration options for the switch/toggle.
	 * @tiresult[Switch] the Switch.
	 */
	createSwitch : function(options) {
		var c = new Switch(Titanium.uiProxy.createSwitch(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	/**
	 * @tiapi(method=true,name=UI.createSlider,since=0.6) Create a native Slider
	 * @tiarg[object, options] a set of configuration options for the Slider.
	 * @tiresult[Slider] the Slider.
	 */
	createSlider : function(options) {
		var c = new Slider(Titanium.uiProxy.createSlider(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	/**
	 * @tiapi(method=true,name=UI.createTextArea,since=0.6) Create a native text editor
	 * @tiarg[object, options] a set of configuration options for the text.
	 * @tiresult[TextArea] the TextArea.
	 */
	createTextArea : function(options) {
		var c = new TextArea(Titanium.uiProxy.createTextArea(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_GO,since=0.6) Displays the Go button.
	 */
	RETURNKEY_GO : 0,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_GOOGLE,since=0.6) Displays the Go button. (Soft keyboard doesn't allow for text change yet)
	 */
	RETURNKEY_GOOGLE : 1,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_JOIN,since=0.6)  Displays the Go button. (Soft keyboard doesn't allow for text change yet)
	 */
	RETURNKEY_JOIN : 2,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_NEXT,since=0.6) Displays the Next button.
	 */
	RETURNKEY_NEXT : 3,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_ROUTE,since=0.6) Displays the Go button. (Soft keyboard doesn't allow for text change yet)
	 */
	RETURNKEY_ROUTE : 4,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_SEARCH,since=0.6) Displays the Search button.
	 */
	RETURNKEY_SEARCH : 5,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_YAHOO,since=0.6)  Displays the Go button. (Soft keyboard doesn't allow for text change yet)
	 */
	RETURNKEY_YAHOO : 6,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_DONE,since=0.6) Displays the Done button.
	 */
	RETURNKEY_DONE : 7,
	/**
	 * @tiapi(property=true,name=UI.RETURNKEY_EMERGENCY_CALL,since=0.6)  Displays the Go button. (Soft keyboard doesn't allow for text change yet)
	 */
	RETURNKEY_EMERGENCY_CALL : 8,

	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_ASCII,since=0.6) Full ASCII keyboard
	 */
	KEYBOARD_ASCII : 0,
	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_NUMBERS_PUNCTUATION,since=0.6) Full ASCII keyboard with Numbers and Punctuation visible.
	 */
	KEYBOARD_NUMBERS_PUNCTUATION : 1,
	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_URL,since=0.6) ASCII keyboard with URL keys like '.com'
	 */
	KEYBOARD_URL : 2,
	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_NUMBER_PAD,since=0.6) Current same as KEYBOARD_NUMBERS_PUNCTUATION
	 */
	KEYBOARD_NUMBER_PAD : 3,
	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_PHONE_PAD,since=0.6) Phone dialpad keys
	 */
	KEYBOARD_PHONE_PAD : 4,
	/**
	 * @tiapi(property=true,name=UI.KEYBOARD_EMAIL_ADDRESS,since=0.6) ASCII keyboard with email keys like '@'.
	 */
	KEYBOARD_EMAIL_ADDRESS : 5,

	INPUT_BORDERSTYLE_NONE : 0,
	INPUT_BORDERSTYLE_ROUNDED : 1,
	INPUT_BORDERSTYLE_BEZEL : 2,
	INPUT_BORDERSTYLE_LINE : 3,

	INPUT_BUTTONMODE_ONFOCUS : 0,
	INPUT_BUTTONMODE_ALWAYS : 1,
	INPUT_BUTTONMODE_NEVER : 2,

	/**
	 * @tiapi(method=true,name=UI.createTextField,since=0.6) Create a native text field
	 * @tiarg[object, options] a set of configuration options for the text.
	 * @tiresult[TextField] the TextField.
	 */
	createTextField : function(options) {
		var c = new TextField(Titanium.uiProxy.createTextField(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	/**
	 * @tiapi(method=true,name=UI.getTabs,since=0.6.2) get a list of the tabs
	 * @tiresult[object] array of tab objects
	 */
	getTabs : function() {
		var tabs = [];
		var json = Titanium.uiProxy.getTabs();

		if (!isUndefined(json)) {
			tabs = eval('(' + json + ')');
		}

		for(i = 0; i < tabs.length; i++) {
			tabs.setBadge = function(value){}; // Add method for iPhone compatibility.
		}

		return tabs;
	},
	/**
	 * @tiapi(method=true,name=UI.getTagByName,since=0.6.2) get the tab that corresponds to the window id/name listed in tiapp.xml
	 * @tiarg[string, name] the tab name.
	 * @tiresult[Tab] the tab or null.
	 */
	getTabByName : function(name) {
		var tab = {};

		if (!isUndefined(name)) {
			var json = Titanium.uiProxy.getTabByName(name);
			tab = eval('(' + json + ')');
		}
		tab.setBadge = function(value){}; // Add method for iPhone compatibility.
		return tab;
	},
	/**
	 * @tiapi(method=true,name=UI.setActiveTab,since=0.6.2) switch to new tab
	 * @tiarg[object, Tab] The tab to switch to
	 */
	setActiveTab : function(tabInfo) {
		if (!isUndefined(tabInfo)) {
			Titanium.uiProxy.setActiveTab(Titanium.JSON.stringify(tabInfo));
		}
	},
	/**
	 * @tiapi(method=true,name=UI.addEventListener,since=0.6.2) add application level listener
	 * @tiarg[string, eventName] the name of the event.
	 * @tiarg[function, eventHander] the handler for the event
	 * @tiresult[int] the listener id used to remove the event..
	 */
	addEventListener : function(eventName, eventHandler) {
		return Titanium.uiProxy.addEventListener(eventName, registerCallback(this, eventHandler));

	},
	/**
	 * @tiapi(method=true,name=UI.removeEventListener,since=0.6.2) remove application level listener
	 * @tiarg[string, eventName] the name of the event.
	 * @tiarg[int, listenerId] id of listener to remove as returned from addEventListener.
	 */
	removeEventListener : function(eventName, listenerId) {
		Titanium.uiProxy.removeEventListener(eventName, listenerId);
	},

	//TODO Documentation
	createDatePicker : function(options) {
		if (isUndefined(options)) {
			options = {};
		}
		var o = {};
		for (k in options) {
			var v = options[k];
			if (k == 'value' || k == 'minDate' || k == 'maxDate') {
				v = v.getTime(); // Get ms since epoch
			}
			o[k] = v;
		}
		var c = new DatePicker(Titanium.uiProxy.createDatePicker(Titanium.JSON.stringify(o)));
		c.proxy.open();
		return c
	},

	createModalDatePicker : function(options) {
		if (isUndefined(options)) {
			options = {};
		}
		var o = {};
		for (k in options) {
			var v = options[k];
			if (k == 'value' || k == 'minDate' || k == 'maxDate') {
				v = v.getTime(); // Get ms since epoch
			}
			o[k] = v;
		}

		var dlg = new DatePicker(Titanium.uiProxy.createModalDatePicker(Titanium.JSON.stringify(o)));
		dlg.show = function() { this.proxy.show(); };
		dlg.hide = function() { this.proxy.hide(); };
		dlg.proxy.open();

		return dlg;
	},

	createPicker : function(options) {
		if(isUndefined(options)) {
			options = {};
		}

		var c = new Picker(Titanium.uiProxy.createPicker(Titanium.JSON.stringify(options)));
		c.proxy.open();
		return c;
	},

	createModalPicker : function(options) {
		if(isUndefined(options)) {
			options = {};
		}

		var dlg = new Picker(Titanium.uiProxy.createModalPicker(Titanium.JSON.stringify(options)));
		dlg.show = function() { this.proxy.show(); };
		dlg.hide = function() { this.proxy.hide(); };
		dlg.proxy.open();

		return dlg;
	},

	// createNotification is below. It needs the property currentWindow
	// iPhone only methods
	createToolbar : function(options) {
		return null;
	},
	setTabBadge : function(id) {
		// do nothing
	},
	setStatusBarColor : function(color) {
		// do nothing
	}
};
Titanium.UI.createAlert = Titanium.UI.createAlertDialog; //TODO remove

/**
 * @tiapi(method=true,name=UI.currentWindow,since=0.4) the current UserWindow
 * @tiresult[UserWindow] this window.
 */
Titanium.UI._currentWindow = null;
Titanium.UI.__defineGetter__("currentWindow", function(){
	// Can't set this from the native side, so set on first access
	if (Titanium.UI._currentWindow == null) {
		Titanium.UI._currentWindow = new UserWindow(Titanium.uiProxy.getCurrentWindow());
	}
	return Titanium.UI._currentWindow;
});
/**
 * @tiapi(method=true,name=UI.currentView,since=0.6) the current View in the current window.
 * @tiresult[View] the view.
 */
Titanium.UI.__defineGetter__("currentView", function() {
	var view = null;
	var index = Titanium.UI.currentWindow.getActiveViewIndex();
	if (index > -1) {
		view = Titanium.UI.currentWindow.getViews()[index];
	}
	return view;
});

Titanium.UI.ActivityIndicator = {
	/**
	 * @tiapi(property=true,name=UI.ActivityIndicator.STATUS_BAR,since=0.4) Display activity indicator in status bar
	 */
	STATUS_BAR : 0,
	/**
	 * @tiapi(property=true,name=UI.ActivityIndicator.DIALOG,since=0.4) Display activity indicator as a dialog
	 */
	DIALOG : 1,
	/**
	 * @tiapi(property=true,name=UI.ActivityIndicator.INDETERMINANT,since=0.4) Show activity as indeterminant
	 */
	INDETERMINANT : 0,
	/**
	 * @tiapi(property=true,name=UI.ActivityIndicator.DETERMINANT,since=0.4) Show activity as determinant
	 */
	DETERMINANT : 1
};

Titanium.UI.Android = {
	AnimationStyle : {
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.FADE,since=0.6.2) Fade the current view out while fading the new view in.
		 */
		FADE : 'fade-in',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.SLIDE_FROM_TOP,since=0.6.2) Slide new view from top pushing current view off bottom.
		 */
		SLIDE_FROM_TOP : 'slide-from-top',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.SLIDE_FROM_LEFT,since=0.6.2) Slide the new view from left pushing the current view off right.
		 */
		SLIDE_FROM_LEFT : 'slide-from-left',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.SLIDE_FROM_RIGHT,since=0.6.2) Slide the new view from right pushing the current view off left.
		 */
		SLIDE_FROM_RIGHT : 'slide-from-right',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.SLIDE_FROM_BOTTOM,since=0.6.2) Slide the new view from bottom pushing the current view off top.
		 */
		SLIDE_FROM_BOTTOM : 'slide-from-bottom',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.SCALE,since=0.6.2) Scale the new view in while scaling the current view out.
		 */
		SCALE : 'scale-in',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.WINK,since=0.6.2) Scale the current view out then scale the new view in.
		 */
		WINK : 'wink-in',
		/**
		 * @tiapi(property=true,name=UI.Android.AnimationStyle.HEADLINES,since=0.6.2) Scale, fade, rotate the current view out then scale, fade, rotate the new view in.
		 */
		HEADLINES : 'headlines'
	}
};

Titanium.UI.Android.SystemIcon = {
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.ACTION,since=0.4) icon
	 */
	ACTION : 'ti:Ti:default_icon',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.CAMERA,since=0.4) icon
	 */
	CAMERA : 'ti:Sys:ic_menu_camera',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.COMPOSE,since=0.4) icon
	 */
	COMPOSE: 'ti:Sys:ic_menu_compose',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.BOOKMARKS,since=0.4) icon
	 */
	BOOKMARKS : 'ti:Ti:default_icon',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.SEARCH,since=0.4) icon
	 */
	SEARCH : 'ti:Sys:ic_menu_search',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.ADD,since=0.4) icon
	 */
	ADD : 'ti:Sys:ic_menu_add',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.TRASH,since=0.4) icon
	 */
	TRASH : 'ti:Sys:ic_menu_delete',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.ORGANIZE,since=0.4) icon
	 */
	ORGANIZE : 'ti:Sys:ic_menu_archive',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.REPLY,since=0.4) icon
	 */
	REPLY : 'ti:Ti:default_icon',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.STOP,since=0.4) icon
	 */
	STOP : 'ti:Sys:ic_menu_stop',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.REFRESH,since=0.4) icon
	 */
	REFRESH : 'ti:Sys:ic_menu_refresh',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.PLAY,since=0.4) icon
	 */
	PLAY : 'ti:Sys:ic_media_play',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.FAST_FORWARD,since=0.4) icon
	 */
	FAST_FORWARD : 'ti:Sys:ic_media_ff',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.PAUSE,since=0.4) icon
	 */
	PAUSE : 'ti:Sys:ic_media_pause',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.REWIND,since=0.4) icon
	 */
	REWIND : 'ti:Sys:ic_media_rew',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.EDIT,since=0.4) icon
	 */
	EDIT : 'ti:Sys:ic_menu_edit',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.CANCEL,since=0.4) icon
	 */
	CANCEL : 'ti:Sys:ic_menu_close_clear_cancel',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.SAVE,since=0.4) icon
	 */
	SAVE : 'ti:Sys:ic_menu_save',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.DONE,since=0.4) icon
	 */
	DONE : 'ti:Sys:ic_menu_mark',
	// Android Only?
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.BACK,since=0.4) icon
	 */
	BACK : 'ti:Sys:ic_menu_back',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.FORWARD,since=0.4) icon
	 */
	FORWARD : 'ti:Sys:ic_menu_forward',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.HELP,since=0.4) icon
	 */
	HELP : 'ti:Sys:ic_menu_help',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.HOME,since=0.4) icon
	 */
	HOME : 'ti:Sys:ic_menu_home',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.NEXT,since=0.4) icon
	 */
	NEXT : 'ti:Sys:ic_media_next',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.PREFERENCES,since=0.4) icon
	 */
	PREFERENCES : 'ti:Sys:ic_menu_preferences',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.PREVIOUS,since=0.4) icon
	 */
	PREVIOUS : 'ti:Sys:ic_media_previous',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.REVERT,since=0.4) icon
	 */
	REVERT : 'ti:Sys:ic_menu_revert',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.SEND,since=0.4) icon
	 */
	SEND : 'ti:Sys:ic_menu_send',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.SHARE,since=0.4) icon
	 */
	SHARE : 'ti:Sys:ic_menu_share',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.VIEW,since=0.4) icon
	 */
	VIEW : 'ti:Sys:ic_menu_view',
	/**
	 * @tiapi(property=true,name=UI.Android.SystemIcon.ZOOM,since=0.4) icon
	 */
	ZOOM : 'ti:Sys:ic_menu_zoom'
};

Titanium.UI.DatePicker = {
	/**
	 * @tiapi(property=true,name=UI.DatePicker.MODE_DATE,since=0.7.0) Date
	 */
	MODE_DATE : 0,
	/**
	 * @tiapi(property=true,name=UI.DatePicker.MODE_TIME,since=0.7.0) Time
	 */
	MODE_TIME : 1,
	/**
	 * @tiapi(property=true,name=UI.DatePicker.MODE_DATE,since=0.7.0) Date and Time
	 */
	MODE_DATE_AND_TIME : 2
};

/**
 * @tiapi(method=true,name=UI.ActivityIndicator.setLocation,since=0.4) Set the location of the activity indicator
 * @tiarg[int,location] STATUS_BAR or DIALOG
 */
ActivityIndicator.prototype.setLocation = function(loc) {
	if (! (loc == Titanium.UI.ActivityIndicator.STATUS_BAR ||
			loc == Titanium.UI.ActivityIndicator.DIALOG)) {
		throw new Error("Unsupported indicator location.");
	}
	this.proxy.setLocation(loc);
};
/**
 * @tiapi(method=true,name=UI.ActivityIndicator.setType,since=0.4) Set the type of activity indicator
 * @tiarg[int,type] INDETERMINANT or DETERMINANT
 */
ActivityIndicator.prototype.setType = function(type) {
	if (!(type == Titanium.UI.ActivityIndicator.DETERMINANT ||
			type == Titanium.UI.ActivityIndicator.INDETERMINANT)) {
		throw new Error("Unsupported indicator type.");
	}
	this.proxy.setType(type);
};

/**
 * @tiapi(method=true,name=UI.createNotification,since=0.4) Create a notification object
 * @tiarg[hash,options,optional=true] Configuration options
 * @tiresult[Notifier] the notifier.
 */
Titanium.UI.createNotification = function(options)
{
	proxy = Titanium.uiProxy.createNotification();
	notifier = null;
	if (proxy != null) {
		notifier = new TitaniumNotifier(proxy);
		if (options != null) {
			var title = options['title'];
			var message = options['message'];
			var color = options['color'];
			var delay = options['delay'];
			var transparency = options['transparency'];

			if (!isUndefined(title)) {
				notifier.setTitle(title);
			}
			if (!isUndefined(message)) {
				notifier.setMessage(message);
			}
			if (!isUndefined(color)) {
				notifier.setColor(color);
			}
			if (!isUndefined(delay)) {
				notifier.setDelay(delay);
			}
			if (!isUndefined(transparency)) {
				notifier.setTransparency(transparency);
			}
		}
	} else {
		Titanium.API.warn("Unable to create proxy, returning null.");
	}
	return notifier;
};

Titanium.UI.iPhone = {
	BORDERED : -1,
	StatusBar : {
		OPAQUE_BLACK : -1
	},
	setStatusBarStyle : function(x) {

	},
	SystemButton : {
		PAUSE : -1,
		REWIND : -1,
		PLAY : -1,
		FIXED_SPACE : -1,
		FLEXIBLE_SPACE : -1,
	},
	SystemButtonStyle : {
		PLAIN : -1
	},
	AnimationStyle : {
		FLIP_FROM_LEFT : -1,
		FLIP_FROM_RIGHT : -1,
		CURL_UP : -1,
		CURL_DOWN : -1
	},
	RowAnimationStyle : {
		LEFT : -1,
		RIGHT : -1,
		UP : -1,
		DOWN : -1
	}
};

