webpackJsonp([38],{"++tS":function(module,exports){},"+o//":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Zrlr"),r=_interopRequireDefault(t),o=e("zwoO"),n=_interopRequireDefault(o),a=e("Pf15"),s=_interopRequireDefault(a),i,u,p=e("U7vG"),c=e("SfBx"),d=e("MtoN"),l=e("mtaF"),m=l.updateProgress,f=e("9XIu"),g=e("UVna");e("7KiD");var I=(u=i=function(e){function ReadingCompleteButton(){var t,o,a;(0,r.default)(this,ReadingCompleteButton);for(var s=arguments.length,i=Array(s),u=0;u<s;u++)i[u]=arguments[u];return t=o=(0,n.default)(this,e.call.apply(e,[this].concat(i))),o.markComplete=function(){var e=o.props,t=e.itemId,r=e.courseId,n=e.userId;f.markComplete(t,r,n).then(o.refreshProgress).done()},o.refreshProgress=function(){var e=o.props,t=e.courseProgress,r=e.itemId;t.getItemProgress(r).setState(d.progressCompleted,{refreshCourseProgress:!0}),o.context.executeAction(m,{courseProgress:t})},a=t,(0,n.default)(o,a)}return(0,s.default)(ReadingCompleteButton,e),ReadingCompleteButton.prototype.render=function render(){return p.createElement("div",{className:"rc-ReadingCompleteButton horizontal-box align-items-right"},this.props.isComplete?p.createElement("div",{className:"completed"},p.createElement(c,{name:"checkmark",className:"color-success-dark"})," ",g("Complete")):p.createElement("button",{className:"primary mark-complete",onClick:this.markComplete},g("Mark as completed")))},ReadingCompleteButton}(p.Component),i.propTypes={isComplete:p.PropTypes.bool,itemId:p.PropTypes.string,courseId:p.PropTypes.string,userId:p.PropTypes.number,courseProgress:p.PropTypes.object},i.contextTypes={executeAction:p.PropTypes.func.isRequired},u);module.exports=I},"0Etx":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Zrlr"),r=_interopRequireDefault(t),o=e("zwoO"),n=_interopRequireDefault(o),a=e("Pf15"),s=_interopRequireDefault(a),i,u,p=e("U7vG"),c=e("hcbb"),d=e("PW/x"),l=e("n7sr"),m=e("z8rw"),f=e("PofJ"),g=e("IthV"),I=e("B3gN"),C=e("LxJ1"),h=e("AHB1");e("cKhg");var R=(u=i=function(e){function ReadingItem(){return(0,r.default)(this,ReadingItem),(0,n.default)(this,e.apply(this,arguments))}return(0,s.default)(ReadingItem,e),ReadingItem.prototype.componentDidMount=function componentDidMount(){var e=this.props.itemMetadata;c.setCommon({title:e.getName()+" | Coursera",description:e.get("lesson.module.description"),pageHref:window.location.href})},ReadingItem.prototype.render=function render(){var e=this.props,t=e.isComponentLoaded,r=e.itemMetadata,o=e.readingCml;return p.createElement("div",{className:"rc-ReadingItem"},p.createElement(l,{itemMetadata:r,itemType:f.Reading,showFeedback:t,isCard:!0},t?p.createElement(d,{itemMetadata:r,readingCml:o}):p.createElement(m,null)))},ReadingItem}(p.Component),i.propTypes={isComponentLoaded:p.PropTypes.bool.isRequired,itemMetadata:p.PropTypes.instanceOf(h).isRequired,readingCml:p.PropTypes.object},u),y=I(R,function(e,t){return C(e.itemMetadata).then(function(e){return{readingCml:e}})});module.exports=g(y)},"1oP7":function(module,exports,e){"use strict";exports.default={"de":true,"es":true,"fr":true,"ja":true,"ko":true,"pt":true,"ru":true,"zh":true,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":true}},"7KiD":function(module,exports,e){var t=e("++tS");"string"==typeof t&&(t=[[module.i,t,""]]);var r,o={};o.transform=void 0;var n=e("MTIv")(t,o);t.locals&&(module.exports=t.locals)},"9XIu":function(module,exports,e){"use strict";function updateSupplementProgress(e){var r=e.itemId,o=e.courseId,n=e.userId,a=e.api,s={data:{userId:n,courseId:o,itemId:r}};return t(a.post("",s))}var t=e("S2Uf"),r=e("nRzv"),o=e("MtoN"),n=r(o.supplementCompletionApi,{type:"rest"}),a=r(o.supplementStartApi,{type:"rest"}),s={markComplete:function markComplete(e,t,r){return updateSupplementProgress({itemId:e,courseId:t,userId:r,api:n})},markStarted:function markStarted(e,t,r){return updateSupplementProgress({itemId:e,courseId:t,userId:r,api:a})}};module.exports=s},B3gN:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Dd8w"),r=_interopRequireDefault(t),o=e("Zrlr"),n=_interopRequireDefault(o),a=e("zwoO"),s=_interopRequireDefault(a),i=e("Pf15"),u=_interopRequireDefault(i),p=e("U7vG"),c=function componentDataFetcher(e,t){var o,a,i=e.displayName||e.name,c=(a=o=function(o){function DataFetcherComponent(){var e,t,r;(0,n.default)(this,DataFetcherComponent);for(var a=arguments.length,u=Array(a),p=0;p<a;p++)u[p]=arguments[p];return e=t=(0,s.default)(this,o.call.apply(o,[this].concat(u))),t.displayName=i+"DataFetcher",t.state={isComponentLoaded:!1},r=e,(0,s.default)(t,r)}return(0,u.default)(DataFetcherComponent,o),DataFetcherComponent.prototype.componentDidMount=function componentDidMount(){var e=this,o=this.props,n=this.context,a=n.router,s=t(o,a.params,n).then(function(t){e.setState((0,r.default)({isComponentLoaded:!0},t))});s.catch&&s.catch(function(e){throw e}),s.done&&s.done()},DataFetcherComponent.prototype.render=function render(){return p.createElement(e,(0,r.default)({},this.props,this.state))},DataFetcherComponent}(p.Component),o.contextTypes={executeAction:p.PropTypes.func,router:p.PropTypes.object},a);return c.BaseComp=e,c};module.exports=c},LxJ1:function(module,exports,e){"use strict";var t=e("yyAP"),r=e("1CBJ");module.exports=function(e){var o=new r(e),n={includes:["asset"],fields:["openCourseAssets.v1(typeName)","openCourseAssets.v1(definition)"]};return o.getWithCourseItemId(t.supplementsApi,n).then(function(e){return e.linked["openCourseAssets.v1"][0]})}},"PW/x":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("bOdI"),r=_interopRequireDefault(t),o=e("Zrlr"),n=_interopRequireDefault(o),a=e("zwoO"),s=_interopRequireDefault(a),i=e("Pf15"),u=_interopRequireDefault(i),p,c,d=e("U7vG"),l=e("FqLJ"),m=e("SbYF"),f=e("+o//"),g=e("9XIu"),I=e("jVzB"),C=e("AHB1"),h=(c=p=function(e){function Reading(){return(0,n.default)(this,Reading),(0,s.default)(this,e.apply(this,arguments))}return(0,u.default)(Reading,e),Reading.prototype.componentDidMount=function componentDidMount(){var e=this.props,t=e.itemMetadata,r=e.courseId,o=e.userId;g.markStarted(t.getId(),r,o)},Reading.prototype.render=function render(){var e,t=m.NAME,o=m.USER_ID,n=this.props,a=n.itemMetadata,s=n.courseId,i=n.userId,u=n.fullName,p=n.isComplete,c=n.courseProgress,g=n.readingCml;return d.createElement("div",null,d.createElement(l,{cml:g,className:"rc-Reading",shouldApplyTracking:!0,variableData:(e={},(0,r.default)(e,t,u),(0,r.default)(e,o,i),e)}),d.createElement(f,{userId:i,courseId:s,isComplete:p,itemId:a.getId(),courseProgress:c}))},Reading}(d.Component),p.propTypes={itemMetadata:d.PropTypes.instanceOf(C).isRequired,isComplete:d.PropTypes.bool.isRequired,readingCml:d.PropTypes.object.isRequired,courseProgress:d.PropTypes.object.isRequired,courseId:d.PropTypes.string,userId:d.PropTypes.number,fullName:d.PropTypes.string},p.contextTypes={executeAction:d.PropTypes.func.isRequired},c);module.exports=I(h,["ProgressStore","CourseStore","ApplicationStore"],function(e,t){var r=e.ProgressStore,o=e.CourseStore,n=e.ApplicationStore;return{courseProgress:r.courseProgress,isComplete:r.isItemComplete(t.itemMetadata),courseId:o.getCourseId(),userId:n.getUserData().id,fullName:n.getUserData().fullName}})},SOfG:function(module,exports){},SbYF:function(module,exports,e){"use strict";module.exports={NAME:"NAME",USER_ID:"USER_ID",HASHED_USER_ID:"HASHED_USER_ID"}},UVna:function(module,exports,e){var t=e("1oP7"),r=t.default?t.default:{},o=e("L3lR"),n=o(r);n.getLocale=function(){return"en"},module.exports=n},cKhg:function(module,exports,e){var t=e("SOfG");"string"==typeof t&&(t=[[module.i,t,""]]);var r,o={};o.transform=void 0;var n=e("MTIv")(t,o);t.locals&&(module.exports=t.locals)},yyAP:function(module,exports,e){"use strict";module.exports={supplementsApi:"onDemandSupplements.v1"}}});
//# sourceMappingURL=en.38.e94b46788c84ba9ec959.js.map