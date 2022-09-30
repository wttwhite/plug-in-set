//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'PageListBox',
  props: {
    hasSearch: {
      type: Boolean,
      default: false
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "page-list-box" },
    [
      _vm.hasSearch
        ? _c("div", { staticClass: "page-top-search" }, [_vm._t("search")], 2)
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "page-container" },
        [
          _vm._t("btnLine"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "page-container-second" },
            [_vm._t("default")],
            2
          ),
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "footer" }, [_vm._t("footer")], 2),
      _vm._v(" "),
      _vm._t("other"),
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-25ee48ac_0", { source: ".page-list-box[data-v-25ee48ac] {\n  width: 100%;\n  height: 100%;\n  border: 1px;\n  padding: 1px;\n  display: flex;\n  flex-direction: column;\n  background: #f4f8fd;\n}\n.page-top-search[data-v-25ee48ac] {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 36px 10px 18px 10px;\n}\n.page-container[data-v-25ee48ac] {\n  flex: 1;\n  width: calc(100% - 64px);\n  height: 0;\n  margin: 16px 32px 0 32px;\n  overflow: auto;\n  background: #f2f3f4;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.page-container[data-v-25ee48ac]  .page-list-btn {\n  padding: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.page-container .page-container-second[data-v-25ee48ac] {\n  flex: 1;\n  height: 0;\n}\n.footer[data-v-25ee48ac] {\n  width: 100%;\n  height: 60px;\n  padding-right: 32px;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  border: none;\n}\n.page-top-search[data-v-25ee48ac]  .el-form-item {\n  margin-left: 32px;\n}\n.page-top-search[data-v-25ee48ac]  .el-date-editor.el-input,\n.page-top-search[data-v-25ee48ac]  .el-date-editor.el-input__inner,\n.page-top-search[data-v-25ee48ac]  .el-input,\n.page-top-search[data-v-25ee48ac]  .el-select,\n.page-top-search[data-v-25ee48ac]  .el-date-picker {\n  width: 240px;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["D:\\acode-basecode\\插件\\demo\\packages\\pageListBox\\src\\index.vue","index.vue"],"names":[],"mappings":"AA6BA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AC5BA;AD8BA;EAIA,mBAAA;EAEA,kBAAA;EACA,4BAAA;AC/BA;ADiCA;EACA,OAAA;EACA,wBAAA;EACA,SAAA;EACA,wBAAA;EACA,cAAA;EACA,mBAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;AC9BA;AD+BA;EACA,YAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;AC7BA;AD+BA;EACA,OAAA;EACA,SAAA;AC7BA;ADgCA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,sBAAA;EACA,aAAA;EACA,yBAAA;EACA,mBAAA;EACA,YAAA;AC7BA;ADiCA;EACA,iBAAA;AC9BA;ADgCA;;;;;EAKA,YAAA;AC9BA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"page-list-box\">\r\n    <div class=\"page-top-search\" v-if=\"hasSearch\">\r\n      <slot name=\"search\"></slot>\r\n    </div>\r\n    <div class=\"page-container\">\r\n      <slot name=\"btnLine\"></slot>\r\n      <div class=\"page-container-second\">\r\n        <slot></slot>\r\n      </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n      <slot name=\"footer\"></slot>\r\n    </div>\r\n    <slot name=\"other\"></slot>\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'PageListBox',\r\n  props: {\r\n    hasSearch: {\r\n      type: Boolean,\r\n      default: false,\r\n    },\r\n  },\r\n}\r\n</script>\r\n<style lang=\"scss\" scoped>\r\n.page-list-box {\r\n  width: 100%;\r\n  height: 100%;\r\n  border: 1px;\r\n  padding: 1px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background: #f4f8fd;\r\n}\r\n.page-top-search {\r\n  //   width: calc(100% - 64px);\r\n  // margin: 16px 32px 0 32px;\r\n  // margin-bottom: 16px;\r\n  background: #ffffff;\r\n  // box-shadow: 0px 0px 10px 0px rgba(8, 90, 213, 0.15);\r\n  border-radius: 8px;\r\n  padding: 36px 10px 18px 10px;\r\n}\r\n.page-container {\r\n  flex: 1;\r\n  width: calc(100% - 64px);\r\n  height: 0;\r\n  margin: 16px 32px 0 32px;\r\n  overflow: auto;\r\n  background: #f2f3f4;\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  ::v-deep .page-list-btn {\r\n    padding: 8px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n  }\r\n  .page-container-second {\r\n    flex: 1;\r\n    height: 0;\r\n  }\r\n}\r\n.footer {\r\n  width: 100%;\r\n  height: 60px;\r\n  padding-right: 32px;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n  border: none;\r\n}\r\n\r\n.page-top-search {\r\n  ::v-deep .el-form-item {\r\n    margin-left: 32px;\r\n  }\r\n  ::v-deep .el-date-editor.el-input,\r\n  ::v-deep .el-date-editor.el-input__inner,\r\n  ::v-deep .el-input,\r\n  ::v-deep .el-select,\r\n  ::v-deep .el-date-picker {\r\n    width: 240px;\r\n  }\r\n}\r\n</style>\r\n",".page-list-box {\n  width: 100%;\n  height: 100%;\n  border: 1px;\n  padding: 1px;\n  display: flex;\n  flex-direction: column;\n  background: #f4f8fd;\n}\n\n.page-top-search {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 36px 10px 18px 10px;\n}\n\n.page-container {\n  flex: 1;\n  width: calc(100% - 64px);\n  height: 0;\n  margin: 16px 32px 0 32px;\n  overflow: auto;\n  background: #f2f3f4;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.page-container ::v-deep .page-list-btn {\n  padding: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.page-container .page-container-second {\n  flex: 1;\n  height: 0;\n}\n\n.footer {\n  width: 100%;\n  height: 60px;\n  padding-right: 32px;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  border: none;\n}\n\n.page-top-search ::v-deep .el-form-item {\n  margin-left: 32px;\n}\n.page-top-search ::v-deep .el-date-editor.el-input,\n.page-top-search ::v-deep .el-date-editor.el-input__inner,\n.page-top-search ::v-deep .el-input,\n.page-top-search ::v-deep .el-select,\n.page-top-search ::v-deep .el-date-picker {\n  width: 240px;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-25ee48ac";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var index = {
  install: Vue => {
    Vue.component(__vue_component__.name, __vue_component__);
  }
};

export { index as default };
