webpackJsonp([56],{GnzG:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r.default=e,r}var r=e("U7vG"),n=_interopRequireWildcard(r),t=e("uNuf"),i=_interopRequireDefault(t),o=function DeferToClientSideRender(e){if("undefined"==typeof window)return n.createElement(i.default,{iconSize:512});return e.children&&n.cloneElement(e.children,{})};module.exports=o},uNuf:function(module,exports,e){"use strict";function _objectWithoutProperties(e,r){var n={};for(var t in e){if(r.indexOf(t)>=0)continue;if(!Object.prototype.hasOwnProperty.call(e,t))continue;n[t]=e[t]}return n}var r=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},n=e("U7vG"),t=e("Tj91"),i=function LoadingBox(e){var i=e.loadingText,o=e.iconSize,a=void 0===o?64:o,c=e.iconName,u=void 0===c?"SvgCssLoaderSignal":c,l=_objectWithoutProperties(e,["loadingText","iconSize","iconName"]);return n.createElement("div",r({className:"rc-LoadingBox vertical-box align-items-absolute-center"},l),n.createElement(t,{iconName:u,size:a,className:"color-primary"}),i&&n.createElement("p",null,i))};i.propTypes={iconName:n.PropTypes.string,loadingText:n.PropTypes.string,iconSize:n.PropTypes.number},module.exports=i}});
//# sourceMappingURL=56.7476497247e4c547d6e2.js.map