webpackJsonp([30],{"11wi":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("OyPG"),o=_interopRequireDefault(n),i=e("7Hji"),u=_interopRequireDefault(i);module.exports=function(e,t){if(e.getStore(u.default).haveCourseIdentifiersLoaded())return(0,r.default)();if(!t)throw new Error("Missing courseSlug");return(0,o.default)(t).then(function(r){var n=r.courseId,o=r.courseCertificates;if(!n)throw new Error("Missing courseId");return e.dispatch("SET_COURSE_IDENTIFIERS",{courseId:n,courseSlug:t,courseCertificates:o}),{courseId:n,courseSlug:t,courseCertificates:o}}).catch(function(n){console.error("Error getting courseId and courseCertificates from courseSlug: "+t+": ",n,n.stack);var o="",i=[];return e.dispatch("SET_COURSE_IDENTIFIERS",{courseId:"",courseSlug:t,courseCertificates:i}),(0,r.default)({courseId:"",courseSlug:t,courseCertificates:i})})}},"3GkK":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}var t=e("U7vG"),r=_interopRequireWildcard(t),n=e("41m7"),o=e("hgxZ"),i=_interopRequireDefault(o),u=e("epGi"),a=_interopRequireDefault(u),s=e("BwwG"),d=_interopRequireDefault(s),c=e("USna"),l=_interopRequireDefault(c),f=e("oTmJ"),p=_interopRequireDefault(f),g=e("Dlq9"),S=_interopRequireDefault(g),v=e("11wi"),h=_interopRequireDefault(v),m=e("mtaF"),D=e("x+4U"),I=e("WMMm"),R=e("Qsqg"),E=e("gvLH"),y=e("OKRO"),C=e("4m+H"),P=e("H1/+"),L=e("dCwQ"),O=e("vGWh"),w=e("ChEC"),x=e("9kB4"),b=e("z27h"),q=_interopRequireDefault(b),A=e("7Hji"),U=_interopRequireDefault(A),M=e("LRK0"),G=_interopRequireDefault(M),k=e("H+p1"),H=_interopRequireDefault(k),T=e("Jsh8"),N=_interopRequireDefault(T),Q=e("dqzQ"),j=_interopRequireDefault(Q),B=e("jvYB"),W=_interopRequireDefault(B),F=e("uNuf"),z=_interopRequireDefault(F),J=function DataFetcherBody(e){var t=e.children;if(!t)return null;return r.cloneElement(t,{})},K=(0,n.compose)((0,p.default)(function(){return!1}),(0,l.default)(function(e,t){return{courseSlug:e.params.courseSlug}}),(0,d.default)([G.default,U.default,j.default,q.default,H.default,N.default],function(e,t,r,n,o,i){return{s12n:n.getS12n(),course:t.getMetadata(),courseId:t.getCourseId(),isEnrolled:r.isEnrolled(),sessionId:e.getSessionId(),isEnrolledInSession:e.isEnrolled(),s12nStoreHasLoaded:n.hasLoaded(),courseStoreHasLoaded:t.hasLoaded(),sessionStoreHasLoaded:e.hasLoaded(),verificationStoreHasLoaded:o.hasLoaded(),courseMembershipStoreHasLoaded:r.hasLoaded(),computedModelStoreHasLoaded:i.hasLoaded(),courseIdentifiersHaveLoaded:t.haveCourseIdentifiersLoaded()}}),(0,S.default)(function(e,t){var r=t.courseSlug;e.executeAction(h.default,r)}),(0,a.default)(function(e){return e.courseIdentifiersHaveLoaded}),(0,a.default)(function(e){return!!e.courseId},r.createElement(W.default,null)),(0,S.default)(function(e,t){var r=t.courseId;e.executeAction(y.loadMembership,r)}),(0,a.default)(function(e){return e.courseMembershipStoreHasLoaded}),(0,a.default)(function(e){var t=e.isEnrolled;return i.default.isSuperuser()||t},r.createElement(W.default,null)),(0,S.default)(function(e,t){var r=t.courseSlug,n=t.courseId;e.executeAction(R.loadComputedModels,{courseSlug:r,courseId:n})}),(0,a.default)(function(e){return e.computedModelStoreHasLoaded}),(0,S.default)(function(e,t){var r=t.courseId,n=t.courseSlug,o=i.default.get().id,u=i.default.isAuthenticatedUser();e.executeAction(D.getCurrentSession,{courseSlug:n}),e.executeAction(P.loadCourseViewGrade,{courseId:r}),e.executeAction(O.loadUserGroupsForCourse,{courseId:r,userId:o}),e.executeAction(x.loadHonorsUserPreferences,{authenticated:u}),e.executeAction(E.loadCertificateData,{courseId:r,userId:o}),e.executeAction(m.getProgress,{authenticated:u,courseId:r,userId:o}),e.executeAction(I.loadInsightsByContextWithProgress,{contextType:"COURSE",contextId:r})}),(0,a.default)(function(e){var t=e.s12nStoreHasLoaded,r=e.courseStoreHasLoaded,n=e.sessionStoreHasLoaded;return t&&r&&n}),(0,S.default)(function(e,t){var r=t.courseId,n=t.course,o=t.s12n,u=t.sessionId,a=i.default.get().id,s=i.default.isAuthenticatedUser(),d=o&&o.getId(),c=n.isVerificationEnabled(),l=e.getStore("CourseStore");e.executeAction(C.loadCourseDeadlines,{userId:a}),l.isCumulativeGradePolicy()&&e.executeAction(w.loadCoursePresentGrade,{userId:a,courseId:r}),e.executeAction(L.loadVerificationDisplay,{authenticated:s,userId:a,courseId:r,isCourseVerificationEnabled:c,s12nId:d}),e.executeAction(O.loadUserSessionGroupForCourse,{courseId:r,userId:a,sessionId:u})}),(0,a.default)(function(e){return e.verificationStoreHasLoaded}))(J),Y=function LegacyDataFetch(e){var t=e.children,n=e.isLegacyDataLoaded;return r.createElement("div",{className:"rc-LegacyDataFetch"},r.createElement(K,null,t),!n&&r.createElement(z.default,{iconSize:512}))};module.exports=(0,n.compose)((0,d.default)([H.default],function(e){return{isLegacyDataLoaded:e.hasLoaded()}}))(Y)},"3NKR":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("hHYt"),o=_interopRequireDefault(n),i=e("7Hji"),u=_interopRequireDefault(i);module.exports=function(e){var t=(0,o.default)("/api/domains.v1",{type:"rest"});if(void 0!==e.getStore(u.default).domains)return(0,r.default)();return(0,r.default)(t.get("?fields=id,name")).then(function(t){e.dispatch("LOAD_DOMAINS",t.elements)})}},"4m+H":function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("oOBj"),n=e("CR6p"),o=e("v0ZQ"),i=e("3a1W"),u=e("zrhH"),a=u.getCurrentWeek;exports.receiveDeadlines=function(e,t){var r=t.deadlines,n=r.isEnabled,o=r.moduleDeadlines;n?e.dispatch("LOAD_COURSE_DEADLINES",{moduleDeadlines:o}):e.dispatch("DISABLE_DEADLINES")},exports.setDeadlinesIfEligible=function(e){var n=e.getStore("CourseStore"),o=e.getStore("CourseScheduleStore"),i=e.getStore("ProgressStore"),u=a(n,o,i),s=n.hasLaunched(),d=n.getCourseId(),c=e.getStore("CourseMembershipStore").isEnrolled(),l=e.getStore("SessionStore");return!r(d)&&s&&!l.isSessionsCourse()&&1===u&&c?e.executeAction(exports.enableDeadlines,{}):t()},exports.loadCourseDeadlines=function(e,i){var u=i.userId,a=e.getStore("CourseStore").hasLaunched(),s=e.getStore("CourseStore").getCourseId(),d=e.getStore("CourseMembershipStore").isEnrolled(),c=e.getStore("SessionStore");if(!d||!u||r(s)||!a)return t();if(c.isSessionsEnabled()){if(c.isEnrolled()){var l=c.getSession(),f={moduleDeadlines:l.moduleDeadlines};f.itemDeadlines=l.itemDeadlines,e.dispatch("LOAD_COURSE_DEADLINES",f)}return t()}return n.getStartTime(s).then(o).then(function(t){var r=t.elements,n=r[0];return n?e.executeAction(exports.receiveDeadlines,{deadlines:n}):e.executeAction(exports.setDeadlinesIfEligible,{})})},exports.enableDeadlines=function(e){var t=e.getStore("CourseStore").getCourseId();return n.sendStartTime(!0,t).fail(function(e){throw e}).then(o).then(function(t){var r=t.elements,n=r[0].start;return i.pushV2(["open_course_home.welcome.emit.course_deadline_set",{first_week_due_time:n}]),e.executeAction(exports.receiveDeadlines,{deadlines:r[0]})})},exports.disableDeadlines=function(e){var t=e.getStore("CourseStore").getCourseId();return n.disableDeadlines(t).then(function(){return e.dispatch("DISABLE_DEADLINES")}).fail(function(e){throw e})},exports.resetDeadlines=function(e,t){var r=t.userId,o=e.getStore("CourseStore").getCourseId();return n.resetDeadlines(o).then(function(){return e.executeAction(exports.loadCourseDeadlines,{userId:r})}).fail(function(e){throw e})}},B6Gv:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("I8Ec"),o=_interopRequireDefault(n),i=e("hHYt"),u=_interopRequireDefault(i),a=(0,u.default)("/api/onDemandCoursePresentGrades.v1",{type:"rest"});exports.getPresentGrade=function(e){var t=e.userId,n=e.courseId,i=new o.default("/"+t+"~"+n).addQueryParam("fields","grade,relevantItems,passingStateForecast");return(0,r.default)(a.get(i.toString()))}},CR6p:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("nRzv"),n=e("I8Ec"),o=e("hgxZ"),i=r("/api/onDemandDeadlineSettings.v1",{type:"rest"}),u={getStartTime:function getStartTime(e){var r=(new n).addQueryParam("q","byUserAndCourse").addQueryParam("userId",o.get().id).addQueryParam("courseId",e).toString();return t(i.get(r)).fail(function(e){console.error(e)})},sendStartTime:function sendStartTime(e,r){var n={data:{userId:o.get().id,courseId:r,start:Date.now(),isEnabled:e}};return t(i.post("",n))},disableDeadlines:function disableDeadlines(e){return u.sendStartTime(!1,e)},getResetPreview:function getResetPreview(e,r){var u=(new n).addQueryParam("q","extendPreview").addQueryParam("userId",o.get().id).addQueryParam("courseId",e).addQueryParam("extendedAt",Date.now()).toString();t(i.get(u)).then(r).fail(function(e){console.error(e)}).done()},resetDeadlines:function resetDeadlines(e){var r={data:{userId:o.get().id,courseId:e,extendedAt:Date.now()}},u=(new n).addQueryParam("action","extend").toString();return t(i.post(u,r))}};module.exports=u},ChEC:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("B6Gv");exports.loadCoursePresentGrade=function(e,n){var o=n.userId,i=n.courseId;if(e.getStore("CoursePresentGradeStore").hasLoaded())return t();return o?t(r.getPresentGrade({userId:o,courseId:i})).then(function(t){var r=t.elements[0];e.dispatch("LOAD_COURSE_PRESENT_GRADE",{presentGrade:r})}).fail(function(t){e.dispatch("LOAD_COURSE_PRESENT_GRADE_FAIL",{})}):(e.dispatch("LOAD_COURSE_PRESENT_GRADE_FAIL",{}),t())}},GQE1:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("qs8E"),o=_interopRequireDefault(n),i=e("1ms+"),u=_interopRequireDefault(i),a=e("IFU7"),s=_interopRequireDefault(a);module.exports=function(e,t){if(e.getStore(u.default).hasLoaded())return(0,r.default)();if(!t)return r.default.reject(new s.default("courseId must be provided."));return(0,o.default)(t).then(function(t){e.dispatch("LOAD_COURSE_SCHEDULE",t)})}},J32K:function(module,exports,e){"use strict";var _=e("41m7"),t=e("Laso"),r=e("Xlkb"),n=e("0nKb"),o=e("Xq77"),i=o.Sessions;module.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e).then(function(t){if(t.linked&&t.linked["onDemandSessions.v1"]&&t.linked["onDemandSessionMemberships.v1"]){var o=_(t.linked["onDemandSessions.v1"]).groupBy("courseId"),u=_(t.linked["onDemandSessionMemberships.v1"]).groupBy("sessionId"),a=Object.keys(u);t.elements.forEach(function(e){var t=o[e.courseId]||[];if(t.length){var r=t.filter(function(e){return a.indexOf(e.id)>=0});if(r.length){var n=new i(r).getLastSession();e.onDemandSessionId=n.id,e.onDemandSessionMemberships=r.map(function(e){return u[e.id]})}}})}if(t.linked&&t.linked["v1Details.v1"]&&(t.linked["courses.v1"]=_(t.linked["courses.v1"]).map(function(e){if("v1.session"===e.courseType||"v1.capstone"===e.courseType){e.v1Details=e.id;var r=_(t.linked["v1Sessions.v1"]).reduce(function(t,r){return r.courseId===e.id&&t.push(r.id.toString()),t},[]);e.v1Sessions=r}return e})),t.linked&&t.linked["v2Details.v1"]&&(t.linked["courses.v1"]=_(t.linked["courses.v1"]).map(function(e){return"v2.ondemand"===e.courseType&&(e.v2Details=_(t.linked["v2Details.v1"]).findWhere({id:e.id})),e})),t.linked&&t.linked["vcMemberships.v1"]){var s=_(t.linked["vcMemberships.v1"]).pluck("id");t.elements=_(t.elements).map(function(e){return _(s).contains(e.id)&&(e.vcMembershipId=e.id),e})}if(t.linked&&t.linked["courses.v1"]){var d=_(t.linked["courses.v1"]).pluck("id");t.elements=_(t.elements).chain().filter(function(e){return _(d).contains(e.courseId)}).compact().value()}if(t.linked&&t.linked["signatureTrackProfiles.v1"]&&_(t.elements).each(function(e){e.signatureTrackProfile=e.userId}),e.rawData)return t;if(e.withPaging)return{elements:r(n.prototype.resourceName,t),paging:t.paging};return r(n.prototype.resourceName,t)}).fail(function(t){if(e.rawData)return null;return new n})}},Laso:function(module,exports,e){var t=e("d+lr"),r=e("xdS+");module.exports=t(r)},OyPG:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("hHYt"),o=e("MtoN");module.exports=function(e){var i=new n("/api/courses.v1",{type:"rest"}),u=(new r).addQueryParam("q","slug").addQueryParam("slug",e).addQueryParam("fields","certificates").addQueryParam("showHidden",!0);return t(i.get(u.toString())).then(function(t){if("notFound"===t.errorCode)return null;var r=t.elements[0],n=r.id,i=r.certificates;return o.courseId=n,o.courseSlug=e,{courseId:n,courseCertificates:i}})}},Qsqg:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("F/ua"),o=_interopRequireDefault(n),i=e("3NKR"),u=_interopRequireDefault(i),a=e("GQE1"),s=_interopRequireDefault(a),d=e("rpiB"),c=_interopRequireDefault(d),l=e("pCyr"),f=_interopRequireDefault(l),p=e("vN2C"),g=_interopRequireDefault(p),S=e("Jsh8"),v=_interopRequireDefault(S);exports.loadComputedModels=function(e,t){var n=t.courseSlug,i=t.courseId;if(e.getStore(v.default).hasLoaded())return(0,r.default)();return r.default.all([(0,u.default)(e),(0,o.default)(e,i),(0,c.default)(e,n),(0,s.default)(e,i),(0,f.default)(e,i),(0,g.default)(e,i)]).then(function(){e.dispatch("LOAD_COMPUTED_MODELS")})}},WMMm:function(module,exports,e){"use strict";var t=e("pYUm");exports.loadInsightsByContextWithProgress=function(e,r){var n=r.contextType,o=r.contextId;t.loadInsightsByContextWithProgress(n,o).then(function(t){var r=t.elements;e.dispatch("LEARNER_LOAD_INSIGHTS",{insights:r})}).done()}},gvLH:function(module,exports,e){"use strict";var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r=e("S2Uf"),n=e("J32K"),o={showHidden:!0,fields:["courseId","grade"],includes:{vcMembership:{fields:["certificateCode","certificateCodeWithGrade","grade","grantedAt"]},course:{fields:[]}}};exports.loadCertificateData=function(e,i){var u=i.courseId,a=i.userId;if(e.getStore("CertificateStore").hasLoaded())return r();var s=void 0;return s=a?n(t({id:a+"~"+u},o,{rawData:!0})).then(function(t){e.dispatch("LOAD_MEMBERSHIPS",t)}):r().then(function(){e.dispatch("LOAD_MEMBERSHIPS",null)}),s.done(),s}},lhRp:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("nRzv"),o=new n("/api/onDemandCourseSchedules.v1");exports.getCourseSchedule=function(e){var n=new r(e).addQueryParam("fields","defaultSchedule");return t(o.get(n.toString()))}},oOBj:function(module,exports,e){"use strict";var t=e("UJwr");module.exports=function(e){return-1!==t.get("featureBlacklist","defaultDeadlines").indexOf(e)}},oTmJ:function(module,exports,e){"use strict";function _defaults(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):_defaults(e,t))}var t=e("U7vG"),r=e("jObg"),n=e("I8Ec"),o=e("obmD");module.exports=function renderOrigamiIf(e){return function(i){var u,a;return a=u=function(u){function RenderOrigamiIf(){var e,t,n;_classCallCheck(this,RenderOrigamiIf);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return e=t=_possibleConstructorReturn(this,u.call.apply(u,[this].concat(a))),t.routerWillLeave=function(e){var t=r.renderedRegions.filter(function(e){return e.view.hasUnsavedModel}).map(function(e){return e.view.hasUnsavedModel()}).reduce(function(e,t){return e||t},!1);if(!t)return!0;return!(!t||!window.confirm(o("There are unsaved changes that will be lost if you reload or leave this page.")))},n=e,_possibleConstructorReturn(t,n)}return _inherits(RenderOrigamiIf,u),RenderOrigamiIf.prototype.componentDidMount=function componentDidMount(){var e=this,t=this.context.router,o=this.props.route;r.router.navigate=r.router.navigateTo=function(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=new n(r),a=new n(window.location.toString());if(a.path()===u.path()&&a.query()===u.query())return;!0===i||i&&!0===i.trigger?i&&i.replace?t.replace(r):t.push(r):i&&i.replace?window.history.replaceState(null,null,r):window.history.pushState(null,null,r),e.context.router.setRouteLeaveHook(o,e.routerWillLeave)}},RenderOrigamiIf.prototype.componentWillReceiveProps=function componentWillReceiveProps(t,n){e(this.props)&&!e(t)&&r.trigger("close")},RenderOrigamiIf.prototype.render=function render(){return e(this.props)?t.createElement("div",null,t.createElement("div",{"data-js":"origami"}),t.createElement(i,this.props)):t.createElement(i,this.props)},RenderOrigamiIf}(t.Component),u.propTypes={children:t.PropTypes.node,route:t.PropTypes.object},u.contextTypes={router:t.PropTypes.object},a}}},olSI:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("nRzv"),o=e("hgxZ"),i=n("/api/onDemandHomeProgress.v1",{type:"rest"});exports.getHomeProgress=function(e){var n=o.get().id+"~"+e,u=new r(n).addQueryParam("fields","modulesCompleted,modulesPassed");return t(i.get(u.toString()))}},pCyr:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("I8Ec"),o=_interopRequireDefault(n),i=e("nRzv"),u=_interopRequireDefault(i);module.exports=function(e,t){var n=(0,u.default)("/api/onDemandReferences.v1",{type:"rest"}),i=(new o.default).addQueryParam("courseId",t).addQueryParam("q","courseListed").addQueryParam("fields","name,shortId,slug,content").addQueryParam("includes","assets");return(0,r.default)(n.get(i.toString())).then(function(t){e.dispatch("LOAD_REFERENCES_LIST",t.elements)})}},pYUm:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("hHYt"),n=e("I8Ec"),o=r("/api/insights.v1",{type:"rest"}),i=["description","title","authors","createdAt","ownerScope","coverImage","userPublicProfiles.v1(fullName,photoUrl)","lastUpdatedAt"],u=[].concat(i,["progressStatus"]),a=[].concat(i,["context","blockCollection","blockCollectionId"]),s=["profiles"],d={loadLatestInsightById:function loadLatestInsightById(e){var r=(new n).addQueryParam("q","getLatest").addQueryParam("id",e).addQueryParam("includes",s.join(",")).addQueryParam("fields",a.join(","));return t(o.get(r.toString()))},loadInsightsByContextWithProgress:function loadInsightsByContextWithProgress(e,r){var i=(new n).addQueryParam("q","byContext").addQueryParam("context",e+"~"+r).addQueryParam("includes",s.join(",")).addQueryParam("fields",u.join(","));return t(o.get(i.toString()))}};module.exports=d},qs8E:function(module,exports,e){"use strict";var t=e("lhRp"),r=t.getCourseSchedule,n=e("v0ZQ");module.exports=function(e){if(!e)throw new Error("`courseId` is required to get course schedule.");return r(e).then(n).then(function(e){return e.elements[0].defaultSchedule.periods})}},uNuf:function(module,exports,e){"use strict";function _objectWithoutProperties(e,t){var r={};for(var n in e){if(t.indexOf(n)>=0)continue;if(!Object.prototype.hasOwnProperty.call(e,n))continue;r[n]=e[n]}return r}var t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r=e("U7vG"),n=e("Tj91"),o=function LoadingBox(e){var o=e.loadingText,i=e.iconSize,u=void 0===i?64:i,a=e.iconName,s=void 0===a?"SvgCssLoaderSignal":a,d=_objectWithoutProperties(e,["loadingText","iconSize","iconName"]);return r.createElement("div",t({className:"rc-LoadingBox vertical-box align-items-absolute-center"},d),r.createElement(n,{iconName:s,size:u,className:"color-primary"}),o&&r.createElement("p",null,o))};o.propTypes={iconName:r.PropTypes.string,loadingText:r.PropTypes.string,iconSize:r.PropTypes.number},module.exports=o},vGWh:function(module,exports,e){"use strict";var t=e("S2Uf"),_=e("41m7"),r=e("PzzI"),n=e("ceWS"),o=e("8kuH");exports.loadUserGroupsForCourse=function(e,i){var u=i.courseId,a=i.userId;if(e.getStore("GroupSettingStore").hasLoaded())return t();return r.myCourseGroupsWithSettings(a,u).then(function(t){var r=_(t.linked["groupSettings.v1"]).map(function(e){return new o(e)}),i=t.linked["groups.v1"].map(function(e){return new n(e)}),u=t.elements;e.dispatch("LOADED_COURSE_GROUPS",{groups:i,groupSettings:r,groupMemberships:u})}).fail(function(t){e.dispatch("LOADED_COURSE_GROUPS",{})})},exports.loadUserSessionGroupForCourse=function(e,n){var o=n.courseId,i=n.userId,u=n.sessionId;if(e.getStore("GroupSettingStore").hasSessionGroupLoaded())return t();return r.getCourseSessionGroup(i,o,u).then(function(t){var r=t.elements[0];e.dispatch("LOADED_SESSION_GROUP",{sessionGroup:r})}).fail(function(t){e.dispatch("LOADED_SESSION_GROUP",{})})}},vN2C:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("hgxZ"),o=_interopRequireDefault(n),i=e("PsON"),u=_interopRequireDefault(i),a=e("olSI");module.exports=function(e,t){if(e.getStore(u.default).hasLoaded())return(0,r.default)();return o.default.isAuthenticatedUser()?(0,a.getHomeProgress)(t).then(function(t){t.elements&&t.elements.length&&e.dispatch("LOAD_HOME_PROGRESS",t.elements[0])}).fail(function(){e.dispatch("LOAD_HOME_PROGRESS",{modulesCompleted:[],modulesPassed:[]})}):(e.dispatch("LOAD_HOME_PROGRESS",{modulesCompleted:[],modulesPassed:[]}),(0,r.default)())}},"xdS+":function(module,exports,e){"use strict";var t=e("ZRPT"),r=e("9zRm"),n=e("4rvH");module.exports=function(e){return t(n.build(r.prototype.resourceName,e))}}});
//# sourceMappingURL=30.f8b2394fc9d96131f8af.js.map