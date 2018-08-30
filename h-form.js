(function(window){

var utils = {
	children: function(elem){
		var node = elem.firstChild;
		var children = [];
		for(;node;node=node.nextSibling){
			if(node.nodeType === 1){
				children.push(node);
			}
		}
		return children;
	},
	/*-------------class------------*/
	addClass:function(el,value){
		var classes = this._classesToArray(value),
		curValue,cur,j,clazz,finalValue;

		if(classes.length>0){
			curValue = el.getAttribute && el.getAttribute('class') || '';
			cur = ' '+this._stripAndCollapse(curValue)+' ';

			if(cur){
				var j=0;
				while( (clazz = classes[j++]) ){
					if ( cur.indexOf( ' ' + clazz + ' ' ) < 0 ) {
						cur += clazz + ' ';
					}
				}

				finalValue = this._stripAndCollapse(cur);
				if(curValue !== finalValue){
					el.setAttribute('class',finalValue);
				}
			}
		}
	},
	removeClass:function(el,value){
		var classes = this._classesToArray(value),
		curValue,cur,j,clazz,finalValue;

		if(classes.length>0){
			curValue = el.getAttribute && el.getAttribute('class') || '';
			cur = ' '+this._stripAndCollapse(curValue)+' ';

			if(cur){
				var j=0;
				while( (clazz = classes[j++]) ){
					if ( cur.indexOf( ' ' + clazz + ' ' ) > -1 ) {
						cur = cur.replace(' '+clazz+' ' ,' ');
					}
				}

				finalValue = this._stripAndCollapse(cur);
				if(curValue !== finalValue){
					el.setAttribute('class',finalValue);
				}
			}
		}
	},
	hasClass:function(el,value){
		var className = ' '+value+' ';
		var curValue = el.getAttribute && el.getAttribute('class') || '';
		var cur = ' '+this._stripAndCollapse(curValue)+' ';

		if(cur.indexOf(className) > -1){
			return true;
		}
		return false;
	},
	_stripAndCollapse:function(value){
		//var htmlwhite = ( /[^\x20\t\r\n\f]+/g );
		var htmlwhite = ( /[^\s]+/g );
		var arr = value.match(htmlwhite)||[];
		return arr.join(' ');
	},
	_classesToArray:function(value){
		if ( Array.isArray( value ) ) {
			return value;
		}
		if ( typeof value === "string" ) {
			//var htmlwhite = ( /[^\x20\t\r\n\f]+/g );
			var htmlwhite = ( /[^\s]+/g );
			return value.match( htmlwhite ) || [];
		}
		return [];
	},
	/*---------------css-----------*/
	css:function(el,name,value){
		if(!el) return;

		// 取值
		if(typeof name === 'string' && value === undefined){
			var styles = this.getStyle(el);
			var val = this.curCSS(el,name,styles);
			return val;
		}

		// 赋值		
		var type = typeof name,
		i;
		if(type === 'string'){
			this.style(el,name,value);
		}else if(type === 'object'){
			for(i in name){
				this.style(el,i,name[i]);
			}
		}
	},
	style:function(el,name,value){
		var type = typeof value,
			style = el.style;
		if ( value !== undefined ) {

			if(type === 'number'){
				value += this.cssNumber[name]?'':'px';
			}

			style[ name ] = value;
		}
	},
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},
	getStyle:function(el){
		var view = el.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( el );
	},
	curCSS:function(el,type,styles){
		var val;
		if(styles){
			val = styles.getPropertyValue(type) || styles[type];
		}
		return val;
	},
	/*---------------事件-----------*/
	on: function(element, type, handler){
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}else {
			element["on" + type] = handler;
		}
	},
	off: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.detachEvent("on"+type, handler);
		}else{
			element["on" + type] = null;
		}
	}
};


/*内置的验证规则*/
var validators = {
	required: function(value) { //非空校验
		if(value === '' || value === null) {
			return false;
		}
		return true;
	},
	email: function(value) { //邮箱
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return reg.test(value);
	},
	identity: function(value) { //身份证
		function idCardUpdate(g) {
			var b;
			var f = /^(\d){15}$/;
			if (f.test(g)) {
				var e = 0;
				var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
				g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
				for (var c = 0; c < g.length; c++) {
				  e += parseInt(g.substr(c, 1)) * a[c]
				}
				g += d[e % 11];
				b = g
			} else {
				b = "#"
			}
			return b
		}

		var f = 0;
		var a;
		var e = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙",
			21: "辽宁",
			22: "吉林",
			23: "黑龙",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		};
		if (value.length == 15) {
			a = idCardUpdate(value)
		} else {
			a = value
		}
		if (!/^\d{17}(\d|x)$/i.test(a)) {
			return false
		}
		a = a.replace(/x$/i, "a");
		if (e[parseInt(a.substr(0, 2))] == null) {
			return false
		}
		var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
		var h = new Date(c.replace(/-/g, "/"));
		if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
			return false
		}
		for (var b = 17; b >= 0; b--) {
			f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
		}
		if (f % 11 != 1) {
			return false
		}
		return true
	},
	passport: function(value) { //护照
		var reg = /^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g|E|e]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/;
  		return reg.test(value);
	},
	phone: function(value) { //电话
		var l = value.length;
		var reg = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
		return ( l == 11 && reg.test(value) );
	},
	password: function(value) { //密码：不少于8位，包含大小写字母、数字、特殊符号至少三种。
		var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*?=+()[\]{}:~,.-]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*?=+()[\]{}:~,.-]+$)(?![0-9\\W_!@#$%^&*?=+()[\]{}:~,.-]+$)[a-zA-Z0-9\\W_!@#$%^&*?=+()[\]{}:~,.-]{8,}$/;
    	return reg.test(value);
	},
	hk: function(value) { //港澳居民通行证（回乡证）
		var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
  		return  a.test(value);
	},
	taiw: function(value) { //台湾居民通行证
		var a = /^[0-9]{8}$/;
		var b = /^[0-9]{10}$/;
		return (a.test(value)) || (b.test(value));
	},
	hkt: function(value) {
		return validators.hk(value) || validators.taiw(value);
	}
}


/*----------------ValidForm 构造函数----------------------
数据格式：
var data = {
  name: '',
  pass: '',
  checkPass: '',
  age: ''
}

规则格式：
var rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, validator: checkAge, trigger: 'blur' }
  ]
}
内置规则的字段必须写在第一个，如：
  {requried: true, xxx}
  {phone: true, xxx} 等
*/
function ValidForm(id, data, rules) {
	this.el = document.getElementById('test');
	this.fields = [];
	this.data = data || null;
	this.rules = rules || null;
	if(this.el) this.initFields();
}

ValidForm.prototype.initFields = function() {
	var _children = utils.children(this.el);
	var formItemList = [];
	for(var i=0,l=_children.length; i<l; i++) {
		if( utils.hasClass(_children[i], 'h-form-item') && _children[i].getAttribute('prop') ) {
			formItemList.push(_children[i]);
		}
	}
	for(var i=0,l=formItemList.length; i<l; i++) {
		this.fields.push( new FormItem(formItemList[i], this) );
	}
}

ValidForm.prototype.validate = function(callback) {
	var valid = true;
	for(var i=0,l=this.fields.length; i<l; i++) {
		var _v = this.fields[i].validate('');
		this.data[this.fields[i].prop] = this.fields[i].getFieldValue();
		valid = valid && _v;
	}
	if(typeof callback === 'function') {
		callback(valid, this.data);
	}
}

ValidForm.prototype.reset = function() {
	for(var i=0,l=this.fields.length; i<l; i++) {
		this.fields[i].reset();
	}
}

ValidForm.prototype.setValue = function(data) {
	for(var prop in data) {
		this[prop] = data[prop];
	}
}

/*----------------FormItem 构造函数----------------------*/
function FormItem(el, form) {
	this.el = el;
	this.form = form;
	if(!form.rules || form.rules.length === 0) return;
	this.prop = el.getAttribute('prop');
	this.rule = form.rules[this.prop];
	this.content = this.el.getElementsByClassName('h-form-item--content')[0];
	if(!this.content) return;
	this.input = this.createInput(this.content.getElementsByTagName('input'));
	if(!this.input) return;
	this.fieldValue = this.getFieldValue();
	this.resetFlag = false;

	this.render();
	this.bindInput();
}

FormItem.prototype.createInput = function(inputList) {
	return new ValidInput(inputList);
}

FormItem.prototype.getFieldValue = function() {
	return this.input.getValue();
}

FormItem.prototype.setFieldValue = function(value) {
	this.input.setValue(value);
}

/*若是必填，添加"*"标志 */
FormItem.prototype.render = function() {
	if(!this.rule || this.rule.length === 0) return;
	var required = false;
	for(var i=0,l=this.rule.length; i<l; i++) {
		if(this.rule[i].required) {
			required = true;
			break;
		}
	}

	if(required) {
		utils.addClass(this.el, 'is-required');
	}
}

FormItem.prototype.bindInput = function() {
	var that = this;
	if(!that.rule || that.rule.length === 0) return;

	//checkbox 特殊处理：设置 change 事件监听
	if(that.input.type === 'checkbox' || that.input.type === 'radio') {
		this.input.on('change', function(e) {
			that.validate('');
		});
		return;
	}

	var shouldBindBlur = false;
	var shouldBindInput = false;
	for(var i=0,l=that.rule.length; i<l; i++) {
		if(!that.rule[i].trigger) { //若未设置 trigger, 默认绑定 blur 事件
			that.rule[i].trigger = 'blur';
		}
		if(that.rule[i].trigger === 'blur') shouldBindBlur = true;
		if(that.rule[i].trigger === 'input') shouldBindInput = true;
	}

	//判断是否绑定 blur 事件
	if(shouldBindBlur) {
		this.input.on('blur', function() {
			that.validate('blur');
		});
	}

	//判断是否绑定 input 事件
	if(shouldBindInput) {
		this.input.on('input', function() {
			that.validate('input');
		});
	}
}

/*执行验证*/
FormItem.prototype.validate = function(trigger) {
	var rule = getFilteredRule(trigger, this.rule);
	var value = this.getFieldValue();
	if(rule === null || rule.length === 0) return true;

	//----------验证----------
	var that = this;
	return that._tmpCheck(value, rule, function(message) {
		if(message !== '') { //未通过验证
			that.showErrorTag(message);
			utils.addClass(that.el, 'is-error');
		}else { //通过验证
			that.showErrorTag(message);
			utils.removeClass(that.el, 'is-error');
		}
	})
}

FormItem.prototype.showErrorTag = function(message) {
	if(!this.errorTag) { //第一次校验
		if(message !== '') { //未通过
			var errorTag = document.createElement('div');
			errorTag.setAttribute('class', 'h-form-item--error h-anim h-anim-top-in');
			errorTag.textContent = message;
			this.content.appendChild(errorTag);
			this.errorTag = errorTag;
		}
	}else {
		if(message !== '') { //未通过
			utils.removeClass(this.errorTag, 'h-anim-top-out');
			utils.addClass(this.errorTag, 'h-anim-top-in');
			utils.css(this.errorTag, 'display', 'block');
			if(this.errorTag.textContent !== message) {
				this.errorTag.textContent = message;
			}
		}else { //通过
			utils.removeClass(this.errorTag, 'h-anim-top-in');
			utils.addClass(this.errorTag, 'h-anim-top-out');
			var that = this;
			setTimeout(function() {
				utils.css(that.errorTag, 'display', 'none');
			}, 200);
			
		}
	}
}

/*重置*/
FormItem.prototype.reset = function() {
	this.input.setValue('');
	utils.css(this.errorTag, 'display', 'none');
	utils.removeClass(this.el, 'is-error');
}

/*根据 trigger类型(blur/input) 选出对应的 rule*/
function getFilteredRule(trigger, rule) {
	if(!rule) return null;
	if(trigger === '') return rule;
	var _rule = [];
	for(var i=0,l=rule.length; i<l; i++) {
		if(rule[i].trigger === trigger) {
			_rule.push(rule[i]);
		}
	}
	return _rule;
}

/*验证函数, 返回 Boolean 值通知是否验证通过*/
FormItem.prototype._tmpCheck = function(value, rule, callback) {
	for(var i=0,l=rule.length; i<l; i++) {
		var r = rule[i];
		var validator = getValidator(r).bind(this.form);
		if(!validator) continue;
		if( validator(value) ) { // 通过验证
			if(i === l-1) {
				callback('');
				return true;
			}
		}else { // 未通过验证
			callback(r.message);
			return false;
		}
	}
}

/*获取验证函数 validator*/
function getValidator(rule) {
	if(typeof rule.validator === 'function') {
		return rule.validator;
	}
	var checkType = Object.keys(rule)[0];
	if(rule[checkType]) {
		return validators[checkType];
	}
	return function(){};
}

/*----------------ValidInput 构造函数----------------------*/
function ValidInput(inputList) {
	this.el = inputList;
	this.type = inputList[0] && inputList[0].type;
	this.value = '';
	this.currentEl = null;
}
ValidInput.prototype.getValue = function() {
	if(this.type === 'checkbox') {
		if(this.el.length === 1) { //为 Switch，返回的 value 为 Boolean
			if(this.el[0].checked) return true;
			return false;
		}else if(this.el.length > 1) { //为 Checkbox 集合，返回的 value 为 Array
			var valueArray = [];
			for(var i=0,l=this.el.length; i<l; i++) {
				if(this.el[i].checked) valueArray.push(this.el[i].value);
			}
			if(valueArray.length === 0) return '';
			return valueArray;
		}
	}
	else if(this.type === 'radio') {
		for(var i=0,l=this.el.length; i<l; i++) {
			if(this.el[i].checked) return this.el[i].value;
		}
	}
	else if(this.el.length === 1) {
		return this.el[0].value;
	}
	return '';
}
ValidInput.prototype.setValue = function(value) {
	if(this.type === 'checkbox') {
		if(this.el.length === 1) { //为 Switch, value 为 Boolean
			this.el[0].checked = !!value;
		}else if(this.el.length > 1) { //为 Checkbox 集合
			for(var i=0,l=this.el.length; i<l; i++) {
				if(this.el[i].checked) {
					this.el[i].checked = false;
				}
				for(var j=0; j<value.length; j++) {
					if(this.el[i].value === value[j]) this.el[i].checked = true;
				}
			}
		}
	}
	else if(this.type === 'radio') {
		for(var i=0,l=this.el.length; i<l; i++) {
			if(this.el[i].checked) {
				this.el[i].checked = false;
			}
			if(typeof value === 'string' && value !== '') {
				if(this.el[i].value === value) this.el[i].checked = true;
			}
		}
	}
	else if(this.el.length === 1) {
		this.el[0].value = value;
	}
}
ValidInput.prototype.on = function(type, handler) {
	for(var i=0,l=this.el.length; i<l; i++) {
		utils.on(this.el[i], type, handler);
	}
}
ValidInput.prototype.off = function() {
	
}


/*----------------对外接口----------------------*/
var validForm = window.validForm = {
	init: function(id, data, rules) {
		var obj = new ValidForm(id, data, rules);
		for(var prop in obj.data) {
			defineProp(obj, prop);
		}
		return obj;
	}
};

function defineProp(obj, prop) {
	Object.defineProperty(obj, prop, {
		get: function() {
			for(var i=0,l=this.fields.length; i<l; i++) {
				if(this.fields[i].prop === prop) {
					return this.fields[i].getFieldValue();
				}
			}
			return '';
		},

		set: function(value) {
			for(var i=0,l=this.fields.length; i<l; i++) {
				if(this.fields[i].prop === prop) {
					//this.fields[i].reset(); //赋值前先重置
					this.fields[i].setFieldValue(value);
				}
			}
		}
	})
}

})(window);