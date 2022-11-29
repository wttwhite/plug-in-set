const hasClass = (el, cls) => {
  if (!el || !cls || cls.indexOf(' ') !== -1) {
    return false;
  }

  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return ` ${el.className} `.indexOf(` ${cls} `) > -1;
  }
};

const addClass = (el, cls) => {
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];

    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
};

const removeClass = (el, cls) => {
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];

    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
};

const toggleClass = (el, cls) => {
  if (hasClass(el, cls)) {
    removeClass(el, cls);
  } else {
    addClass(el, cls);
  }
};

const debounce = function (func) {
  let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  let immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let timeout, args, context, timestamp, result;

  const later = function () {
    const last = +new Date() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

const getOrigin = () => {
  let _origin = '';

  if (!window.location.origin) {
    _origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  } else {
    _origin = window.location.origin;
  }

  return _origin;
};

/**
 * @description: 隐藏敏感信息
 * @param str 需要处理的字符串
 * @param start 替换的起始位置
 * @param end 替换的截止位置
 * @param replaceStr 替换的字符串
 * @return 处理之后的字符串
 */
const hideSensitiveText = function (str, start, end) {
  let replaceStr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
  const subStrArr = str.split('');
  return [...subStrArr.slice(0, start - 1), ...subStrArr.slice(start - 1, end).fill(replaceStr), ...subStrArr.slice(end)].join('');
};

const throttle = function (func) {
  let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    noStart: false,
    noEnd: false
  };
  let context, args, result;
  let timeout = null;
  let previous = 0;

  const later = function () {
    previous = opts.noStart ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    const now = +new Date();

    if (!previous && opts.noStart) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && !opts.noEnd) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};

var regExp = {
  /* eslint-disable no-useless-escape */
  // ip (127.0.0.1)
  ip: /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
  // port (0～65535)
  port: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  // email
  email: /(^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$)|(^$)/,
  // mac地址
  macAddr: /^([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}$/,
  // 数字
  number: /^\d*$/,
  // 自然数 0 1 2 3 4
  naturalNum: /^(0|[1-9]\d*)$/,
  // 正整数 1 2 3 4
  positiveNum: /^[1-9]\d*$/,
  //  1～32个字符；不能包含 ' / \ : * ? " < > | 等特殊字符
  name: /^[^'\/\\:\*\?"<>\|]*$/,
  // 1-32个字符，只能用字母、数字、汉字、小数点、下划线、连接符、括号 「设备型号」
  deviceType: /^[a-zA-Z0-9\.\-_\(\)\u4E00-\u9FA5]*$/,
  // 字母、数字、汉字、小数点、下划线、连接符 [设备编码]
  deviceCode: /^[a-zA-Z0-9\.\-_\u4E00-\u9FA5#()\s]*$/,
  // 设备登录用户名 1～32个字符，只能用字母、数字、汉字、小数点、下划线、连接符。
  deviceUserName: /^[a-zA-Z0-9\.\-_\u4E00-\u9FA5]*$/,
  // 字母、数字的组合 「设备编号1-32位」
  numLetter: /^[\da-zA-Z]*$/,
  // 字母、数字、汉字的组合 「工号1-32」「入场播报」「出场播报」「放行播报」
  numLetterAndCN: /^[\da-zA-Z\u4E00-\u9FA5]*$/,
  // 字母、汉字的组合 「职位1-128」
  numAndCN: /^[a-zA-Z\u4E00-\u9FA5]*$/,
  // 字母、数字和除:\"之外的特殊字符 「设备账号1-32位」
  deviceAccount: /^[a-zA-Z0-9~`!@#\$%^&*()_+\-=\[\];',<.>/|?]{1,32}$/,
  // 车牌号
  licenseNumber: /^[^'\/\\:\*\?"<>\|]{1,16}$/,
  // 手机号
  phoneNum: /^\d{1,11}$/,
  // 姓名 1-128个数字、字母、汉字、间隔号（·）和空格
  personName: /^[\da-zA-Z\u4E00-\u9FA5· ]{1,128}$/,
  // 证件号码
  IDNumber: /^[0-9a-zA-Z]{0,20}$/,
  // 身份证号 18位，前17位为数字，尾号为数字或大写字母X。
  identityCard: /^\d{17}[\d|X]$/,
  // 密码为8-16位字符，至少由大写字母、小写字母、数字、特殊字符任意两种组成。
  password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/,
  // 卡号 8-18个字符，只能用数字和大写字母。
  cardNum: /^[0-9A-Z]{8,18}$/,
  // 4-8位数字 「卡密码」「胁迫密码」「超级密码」
  simplePassword: /^\d{4,8}$/,
  // UUID 32位大写英文字母、数字、连接符。
  uuid: /^[a-zA-Z\d]{8}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{4}-[a-zA-Z\d]{12}$/
};

/**
 嘉兴城市编码
 嘉兴市    330400
 嘉兴市市辖区    330401
 南湖区    330402
 秀洲区    330411
 嘉善县    330421
 海盐县    330424
 海宁市    330481
 平湖市    330482
 桐乡市    330483
 * */

/**
 * 调用高德天气接口 获取当前天气 https://lbs.amap.com/api/webservice/guide/api/weatherinfo
 * f9e1a05e3c9c043be842fdad9040a8a6
 * @param {String} cityCode 城市编码
 * @param {String} key 高德api调用key 目前用的是我个人的 实际项目中需要改成公司的
 * @param {String} extensions='base' 气象类型  base:返回实况天气 all:返回预报天气
 * @return {Object} 天气数据
 */
function getWeather() {
  let cityCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '330400';
  let key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '442b97f4e1c843da3a75a18528868070';
  let extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'base';
  return new Promise((resolve, reject) => {
    if (!key) {
      console.error('缺少高德key');
      reject('缺少高德key');
      return;
    }

    if (!cityCode) {
      console.error('缺少城市编码');
      reject('缺少城市编码');
      return;
    }

    fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${key}&extensions=${extensions}`).then(res => res.json()).then(res => {
      const {
        infocode,
        info,
        count
      } = res;

      if (infocode === '10000') {
        if (count > 0) {
          if (extensions === 'base') {
            resolve(res.lives[0]);
          } else {
            resolve(res.forecasts[0]);
          }
        } else {
          reject('无数据');
        }
      } else {
        console.error(info);
        reject(info);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

export { addClass, debounce, getOrigin, getWeather, hasClass, hideSensitiveText, regExp, removeClass, throttle, toggleClass };
