# 函数操作

## debounce防抖

- @param func 需要防抖的函数
- @param wait 等待时间，默认16ms
- @param immediate 是否立即执行，默认false

```javascript
debounce()
```

## throttle节流


- @param func 需要节流的函数
- @param wait 等待时间，默认16ms
- @param opts 配置项，默认{ noStart:false, noEnd:false }

```javascript
throttle()
```


## 获取浏览器ip

获取当前浏览器ip+端口

@return  ip+port

```javascript
getOrigin() // http://192.168.2.113:8081
```

## 文字脱敏

 隐藏敏感信息

- @param str 需要处理的字符串
- @param start 替换的起始位置
- @param end 替换的截止位置
- @param replaceStr 替换的字符串，默认*

@return 处理之后的字符串

```javascript
hideSensitiveText('330480184578523698', 5, 14)  // 3304**********3698
```
