# h-form
JavaScript 表单插件，设计风格仿照了 element-ui

### [在线演示](http://www.hcbook.cc/demo/h-form/index.html)

## 简单使用
```
//Html 格式
<form class="h-form" id="test">
  
  <div class="h-form-item" prop="email"> <!-- 确保有 prop 字段-->
    <label class="h-form-item--label">邮箱</label>
    <div class="h-form-item--content"> <!-- input 确保在 h-form-item--content 内就行，可以对 input 进行包裹 -->
      <input class="h-input--inner" type="" name="">
    </div>
  </div>

  <div class="h-form-item" prop="phone">
    <label class="h-form-item--label">邮箱</label>
    <div class="h-form-item--content">
      <input class="h-input--inner" type="" name="">
    </div>
  </div>


</form>


```

```
// 验证规则
var rules = {
    email: [
      { required: true, message: '请输入邮箱' },
      { email: true, message: '请输入正确的邮箱', trigger: 'input' },
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { phone: true, message: '请输入正确的手机号码' },
    ]
}

//初始化
// 参数: @String:FormId, @Object:rules
var mForm = validForm.init('test', rules);

//提交
mForm.validate(function(valid, data) {
  if(valid) {
    alert('submit success!');
    console.log(data);
  }else {
    console.log('submit error');
  }
})
```

```
//自定义验证规则

var data = {
    password: '',  //密码
    repassword: '' //再次输入密码
}

//自定义的验证函数，返回 Boolean 值判断验证是否通过
var checkpass = function(value) {
	// 函数里的 this 指向对应的 ValidForm 实例，this[prop] 能获得 prop 的最新值
	if(value === this.password) {
		return true;
	}
	return false;
}

var rules = {
	repassword: [
		{ validator: checkpass, message: '两次密码不一致' }
	]
}

```