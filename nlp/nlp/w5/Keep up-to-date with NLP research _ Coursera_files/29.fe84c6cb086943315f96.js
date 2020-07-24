webpackJsonp([29],{"11wi":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("OyPG"),o=_interopRequireDefault(n),u=e("7Hji"),i=_interopRequireDefault(u);module.exports=function(e,t){if(e.getStore(i.default).haveCourseIdentifiersLoaded())return(0,r.default)();if(!t)throw new Error("Missing courseSlug");return(0,o.default)(t).then(function(r){var n=r.courseId,o=r.courseCertificates;if(!n)throw new Error("Missing courseId");return e.dispatch("SET_COURSE_IDENTIFIERS",{courseId:n,courseSlug:t,courseCertificates:o}),{courseId:n,courseSlug:t,courseCertificates:o}}).catch(function(n){console.error("Error getting courseId and courseCertificates from courseSlug: "+t+": ",n,n.stack);var o="",u=[];return e.dispatch("SET_COURSE_IDENTIFIERS",{courseId:"",courseSlug:t,courseCertificates:u}),(0,r.default)({courseId:"",courseSlug:t,courseCertificates:u})})}},"3GkK":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}var t=e("U7vG"),r=_interopRequireWildcard(t),n=e("41m7"),o=e("hgxZ"),u=_interopRequireDefault(o),i=e("epGi"),a=_interopRequireDefault(i),s=e("BwwG"),d=_interopRequireDefault(s),c=e("USna"),l=_interopRequireDefault(c),f=e("oTmJ"),p=_interopRequireDefault(f),S=e("Dlq9"),g=_interopRequireDefault(S),v=e("11wi"),m=_interopRequireDefault(v),h=e("mtaF"),D=e("x+4U"),I=e("WMMm"),R=e("Qsqg"),E=e("gvLH"),C=e("OKRO"),y=e("4m+H"),L=e("H1/+"),P=e("dCwQ"),q=e("vGWh"),x=e("ChEC"),w=e("9kB4"),O=e("z27h"),A=_interopRequireDefault(O),U=e("7Hji"),M=_interopRequireDefault(U),G=e("LRK0"),b=_interopRequireDefault(G),H=e("H+p1"),k=_interopRequireDefault(H),T=e("Jsh8"),Q=_interopRequireDefault(T),N=e("dqzQ"),B=_interopRequireDefault(N),W=e("Dt9V"),j=_interopRequireDefault(W),F=e("jvYB"),z=_interopRequireDefault(F),J=e("uNuf"),K=_interopRequireDefault(J),V=function DataFetcherBody(e){var t=e.children;if(!t)return null;return r.cloneElement(t,{})},Z=(0,n.compose)((0,p.default)(function(){return!1}),(0,l.default)(function(e,t){return{courseSlug:e.params.courseSlug}}),(0,d.default)([b.default,M.default,B.default,A.default,k.default,j.default,Q.default],function(e,t,r,n,o,u,i){return{s12n:n.getS12n(),course:t.getMetadata(),courseId:t.getCourseId(),isEnrolled:r.isEnrolled(),sessionId:e.getSessionId(),isEnrolledInSession:e.isEnrolled(),s12nStoreHasLoaded:n.hasLoaded(),courseStoreHasLoaded:t.hasLoaded(),sessionStoreHasLoaded:e.hasLoaded(),verificationStoreHasLoaded:o.hasLoaded(),courseMembershipStoreHasLoaded:r.hasLoaded(),computedModelStoreHasLoaded:i.hasLoaded(),courseIdentifiersHaveLoaded:t.haveCourseIdentifiersLoaded(),courseViewGradeStoreHasLoaded:u.hasLoaded()}}),(0,g.default)(function(e,t){var r=t.courseSlug;e.executeAction(m.default,r)}),(0,a.default)(function(e){return e.courseIdentifiersHaveLoaded}),(0,a.default)(function(e){return!!e.courseId},r.createElement(z.default,null)),(0,g.default)(function(e,t){var r=t.courseId;e.executeAction(C.loadMembership,r)}),(0,a.default)(function(e){return e.courseMembershipStoreHasLoaded}),(0,a.default)(function(e){var t=e.isEnrolled;return u.default.isSuperuser()||t},r.createElement(z.default,null)),(0,g.default)(function(e,t){var r=t.courseSlug,n=t.courseId;e.executeAction(R.loadComputedModels,{courseSlug:r,courseId:n})}),(0,a.default)(function(e){return e.computedModelStoreHasLoaded}),(0,g.default)(function(e,t){var r=t.courseId,n=t.courseSlug,o=u.default.get().id,i=u.default.isAuthenticatedUser();e.executeAction(D.getCurrentSession,{courseSlug:n}),e.executeAction(L.loadCourseViewGrade,{courseId:r}),e.executeAction(q.loadUserGroupsForCourse,{courseId:r,userId:o}),e.executeAction(w.loadHonorsUserPreferences,{authenticated:i}),e.executeAction(E.loadCertificateData,{courseId:r,userId:o}),e.executeAction(h.getProgress,{authenticated:i,courseId:r,userId:o}),e.executeAction(I.loadInsightsByContextWithProgress,{contextType:"COURSE",contextId:r})}),(0,a.default)(function(e){var t=e.s12nStoreHasLoaded,r=e.courseStoreHasLoaded,n=e.sessionStoreHasLoaded,o=e.courseViewGradeStoreHasLoaded;return t&&r&&n&&o}),(0,g.default)(function(e,t){var r=t.courseId,n=t.course,o=t.s12n,i=t.sessionId,a=u.default.get().id,s=u.default.isAuthenticatedUser(),d=o&&o.getId(),c=n.isVerificationEnabled(),l=e.getStore("CourseStore");e.executeAction(y.loadCourseDeadlines,{userId:a}),l.isCumulativeGradePolicy()&&e.executeAction(x.loadCoursePresentGrade,{userId:a,courseId:r}),e.executeAction(P.loadVerificationDisplay,{authenticated:s,userId:a,courseId:r,isCourseVerificationEnabled:c,s12nId:d}),e.executeAction(q.loadUserSessionGroupForCourse,{courseId:r,userId:a,sessionId:i})}),(0,a.default)(function(e){return e.verificationStoreHasLoaded}))(V),Y=function LegacyDataFetch(e){var t=e.children,n=e.isLegacyDataLoaded;return r.createElement("div",{className:"rc-LegacyDataFetch"},r.createElement(Z,null,t),!n&&r.createElement(K.default,{iconSize:512}))};module.exports=(0,n.compose)((0,d.default)([k.default],function(e){return{isLegacyDataLoaded:e.hasLoaded()}}))(Y)},"3NKR":function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("hHYt"),o=_interopRequireDefault(n),u=e("7Hji"),i=_interopRequireDefault(u);module.exports=function(e){var t=(0,o.default)("/api/domains.v1",{type:"rest"});if(void 0!==e.getStore(i.default).domains)return(0,r.default)();return(0,r.default)(t.get("?fields=id,name")).then(function(t){e.dispatch("LOAD_DOMAINS",t.elements)})}},"4m+H":function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("oOBj"),n=e("CR6p"),o=e("v0ZQ"),u=e("3a1W"),i=e("zrhH"),a=i.getCurrentWeek;exports.receiveDeadlines=function(e,t){var r=t.deadlines,n=r.isEnabled,o=r.moduleDeadlines;n?e.dispatch("LOAD_COURSE_DEADLINES",{moduleDeadlines:o}):e.dispatch("DISABLE_DEADLINES")},exports.setDeadlinesIfEligible=function(e){var n=e.getStore("CourseStore"),o=e.getStore("CourseScheduleStore"),u=e.getStore("ProgressStore"),i=a(n,o,u),s=n.hasLaunched(),d=n.getCourseId(),c=e.getStore("CourseMembershipStore").isEnrolled(),l=e.getStore("SessionStore");return!r(d)&&s&&!l.isSessionsCourse()&&1===i&&c?e.executeAction(exports.enableDeadlines,{}):t()},exports.loadCourseDeadlines=function(e,u){var i=u.userId,a=e.getStore("CourseStore").hasLaunched(),s=e.getStore("CourseStore").getCourseId(),d=e.getStore("CourseMembershipStore").isEnrolled(),c=e.getStore("SessionStore");if(!d||!i||r(s)||!a)return t();if(c.isSessionsEnabled()){if(c.isEnrolled()){var l=c.getSession(),f={moduleDeadlines:l.moduleDeadlines};f.itemDeadlines=l.itemDeadlines,e.dispatch("LOAD_COURSE_DEADLINES",f)}return t()}return n.getStartTime(s).then(o).then(function(t){var r=t.elements,n=r[0];return n?e.executeAction(exports.receiveDeadlines,{deadlines:n}):e.executeAction(exports.setDeadlinesIfEligible,{})})},exports.enableDeadlines=function(e){var t=e.getStore("CourseStore").getCourseId();return n.sendStartTime(!0,t).fail(function(e){throw e}).then(o).then(function(t){var r=t.elements,n=r[0].start;return u.pushV2(["open_course_home.welcome.emit.course_deadline_set",{first_week_due_time:n}]),e.executeAction(exports.receiveDeadlines,{deadlines:r[0]})})},exports.disableDeadlines=function(e){var t=e.getStore("CourseStore").getCourseId();return n.disableDeadlines(t).then(function(){return e.dispatch("DISABLE_DEADLINES")}).fail(function(e){throw e})},exports.resetDeadlines=function(e,t){var r=t.userId,o=e.getStore("CourseStore").getCourseId();return n.resetDeadlines(o).then(function(){return e.executeAction(exports.loadCourseDeadlines,{userId:r})}).fail(function(e){throw e})}},B6Gv:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("I8Ec"),o=_interopRequireDefault(n),u=e("hHYt"),i=_interopRequireDefault(u),a=(0,i.default)("/api/onDemandCoursePresentGrades.v1",{type:"rest"});exports.getPresentGrade=function(e){var t=e.userId,n=e.courseId,u=new o.default("/"+t+"~"+n).addQueryParam("fields","grade,relevantItems,passingStateForecast");return(0,r.default)(a.get(u.toString()))}},CR6p:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("nRzv"),n=e("I8Ec"),o=e("hgxZ"),u=r("/api/onDemandDeadlineSettings.v1",{type:"rest"}),i={getStartTime:function getStartTime(e){var r=(new n).addQueryParam("q","byUserAndCourse").addQueryParam("userId",o.get().id).addQueryParam("courseId",e).toString();return t(u.get(r)).fail(function(e){console.error(e)})},sendStartTime:function sendStartTime(e,r){var n={data:{userId:o.get().id,courseId:r,start:Date.now(),isEnabled:e}};return t(u.post("",n))},disableDeadlines:function disableDeadlines(e){return i.sendStartTime(!1,e)},getResetPreview:function getResetPreview(e,r){var i=(new n).addQueryParam("q","extendPreview").addQueryParam("userId",o.get().id).addQueryParam("courseId",e).addQueryParam("extendedAt",Date.now()).toString();t(u.get(i)).then(r).fail(function(e){console.error(e)}).done()},resetDeadlines:function resetDeadlines(e){var r={data:{userId:o.get().id,courseId:e,extendedAt:Date.now()}},i=(new n).addQueryParam("action","extend").toString();return t(u.post(i,r))}};module.exports=i},ChEC:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("B6Gv");exports.loadCoursePresentGrade=function(e,n){var o=n.userId,u=n.courseId;if(e.getStore("CoursePresentGradeStore").hasLoaded())return t();return o?t(r.getPresentGrade({userId:o,courseId:u})).then(function(t){var r=t.elements[0];e.dispatch("LOAD_COURSE_PRESENT_GRADE",{presentGrade:r})}).fail(function(t){e.dispatch("LOAD_COURSE_PRESENT_GRADE_FAIL",{})}):(e.dispatch("LOAD_COURSE_PRESENT_GRADE_FAIL",{}),t())}},GQE1:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("qs8E"),o=_interopRequireDefault(n),u=e("1ms+"),i=_interopRequireDefault(u),a=e("IFU7"),s=_interopRequireDefault(a);module.exports=function(e,t){if(e.getStore(i.default).hasLoaded())return(0,r.default)();if(!t)return r.default.reject(new s.default("courseId must be provided."));return(0,o.default)(t).then(function(t){e.dispatch("LOAD_COURSE_SCHEDULE",t)})}},J32K:function(module,exports,e){"use strict";var _=e("41m7"),t=e("Laso"),r=e("Xlkb"),n=e("0nKb"),o=e("Xq77"),u=o.Sessions;module.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e).then(function(t){if(t.linked&&t.linked["onDemandSessions.v1"]&&t.linked["onDemandSessionMemberships.v1"]){var o=_(t.linked["onDemandSessions.v1"]).groupBy("courseId"),i=_(t.linked["onDemandSessionMemberships.v1"]).groupBy("sessionId"),a=Object.keys(i);t.elements.forEach(function(e){var t=o[e.courseId]||[];if(t.length){var r=t.filter(function(e){return a.indexOf(e.id)>=0});if(r.length){var n=new u(r).getLastSession();e.onDemandSessionId=n.id,e.onDemandSessionMemberships=r.map(function(e){return i[e.id]})}}})}if(t.linked&&t.linked["v1Details.v1"]&&(t.linked["courses.v1"]=_(t.linked["courses.v1"]).map(function(e){if("v1.session"===e.courseType||"v1.capstone"===e.courseType){e.v1Details=e.id;var r=_(t.linked["v1Sessions.v1"]).reduce(function(t,r){return r.courseId===e.id&&t.push(r.id.toString()),t},[]);e.v1Sessions=r}return e})),t.linked&&t.linked["v2Details.v1"]&&(t.linked["courses.v1"]=_(t.linked["courses.v1"]).map(function(e){return"v2.ondemand"===e.courseType&&(e.v2Details=_(t.linked["v2Details.v1"]).findWhere({id:e.id})),e})),t.linked&&t.linked["vcMemberships.v1"]){var s=_(t.linked["vcMemberships.v1"]).pluck("id");t.elements=_(t.elements).map(function(e){return _(s).contains(e.id)&&(e.vcMembershipId=e.id),e})}if(t.linked&&t.linked["courses.v1"]){var d=_(t.linked["courses.v1"]).pluck("id");t.elements=_(t.elements).chain().filter(function(e){return _(d).contains(e.courseId)}).compact().value()}if(t.linked&&t.linked["signatureTrackProfiles.v1"]&&_(t.elements).each(function(e){e.signatureTrackProfile=e.userId}),e.rawData)return t;if(e.withPaging)return{elements:r(n.prototype.resourceName,t),paging:t.paging};return r(n.prototype.resourceName,t)}).fail(function(t){if(e.rawData)return null;return new n})}},Laso:function(module,exports,e){var t=e("d+lr"),r=e("xdS+");module.exports=t(r)},OyPG:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("hHYt"),o=e("MtoN");module.exports=function(e){var u=new n("/api/courses.v1",{type:"rest"}),i=(new r).addQueryParam("q","slug").addQueryParam("slug",e).addQueryParam("fields","certificates").addQueryParam("showHidden",!0);return t(u.get(i.toString())).then(function(t){if("notFound"===t.errorCode)return null;var r=t.elements[0],n=r.id,u=r.certificates;return o.courseId=n,o.courseSlug=e,{courseId:n,courseCertificates:u}})}},Qsqg:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("F/ua"),o=_interopRequireDefault(n),u=e("3NKR"),i=_interopRequireDefault(u),a=e("GQE1"),s=_interopRequireDefault(a),d=e("rpiB"),c=_interopRequireDefault(d),l=e("pCyr"),f=_interopRequireDefault(l),p=e("vN2C"),S=_interopRequireDefault(p),g=e("Jsh8"),v=_interopRequireDefault(g);exports.loadComputedModels=function(e,t){var n=t.courseSlug,u=t.courseId;if(e.getStore(v.default).hasLoaded())return(0,r.default)();return r.default.all([(0,i.default)(e),(0,o.default)(e,u),(0,c.default)(e,n),(0,s.default)(e,u),(0,f.default)(e,u),(0,S.default)(e,u)]).then(function(){e.dispatch("LOAD_COMPUTED_MODELS")})}},WMMm:function(module,exports,e){"use strict";var t=e("pYUm");exports.loadInsightsByContextWithProgress=function(e,r){var n=r.contextType,o=r.contextId;t.loadInsightsByContextWithProgress(n,o).then(function(t){var r=t.elements;e.dispatch("LEARNER_LOAD_INSIGHTS",{insights:r})}).done()}},gvLH:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Dd8w"),r=_interopRequireDefault(t),n=e("S2Uf"),o=e("J32K"),u={showHidden:!0,fields:["courseId","grade"],includes:{vcMembership:{fields:["certificateCode","certificateCodeWithGrade","grade","grantedAt"]},course:{fields:[]}}};exports.loadCertificateData=function(e,t){var i=t.courseId,a=t.userId;if(e.getStore("CertificateStore").hasLoaded())return n();var s=void 0;return s=a?o((0,r.default)({id:a+"~"+i},u,{rawData:!0})).then(function(t){e.dispatch("LOAD_MEMBERSHIPS",t)}):n().then(function(){e.dispatch("LOAD_MEMBERSHIPS",null)}),s.done(),s}},lhRp:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("nRzv"),o=new n("/api/onDemandCourseSchedules.v1");exports.getCourseSchedule=function(e){var n=new r(e).addQueryParam("fields","defaultSchedule");return t(o.get(n.toString()))}},oOBj:function(module,exports,e){"use strict";var t=e("UJwr");module.exports=function(e){return-1!==t.get("featureBlacklist","defaultDeadlines").indexOf(e)}},oTmJ:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Zrlr"),r=_interopRequireDefault(t),n=e("zwoO"),o=_interopRequireDefault(n),u=e("Pf15"),i=_interopRequireDefault(u),a=e("U7vG"),s=e("jObg"),d=e("I8Ec"),c=e("obmD");module.exports=function renderOrigamiIf(e){return function(t){var n,u;return u=n=function(n){function RenderOrigamiIf(){var e,t,u;(0,r.default)(this,RenderOrigamiIf);for(var i=arguments.length,a=Array(i),d=0;d<i;d++)a[d]=arguments[d];return e=t=(0,o.default)(this,n.call.apply(n,[this].concat(a))),t.routerWillLeave=function(e){var t=s.renderedRegions.filter(function(e){return e.view.hasUnsavedModel}).map(function(e){return e.view.hasUnsavedModel()}).reduce(function(e,t){return e||t},!1);if(!t)return!0;return!(!t||!window.confirm(c("There are unsaved changes that will be lost if you reload or leave this page.")))},u=e,(0,o.default)(t,u)}return(0,i.default)(RenderOrigamiIf,n),RenderOrigamiIf.prototype.componentDidMount=function componentDidMount(){var e=this,t=this.context.router,r=this.props.route;s.router.navigate=s.router.navigateTo=function(n){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=new d(n),i=new d(window.location.toString());if(i.path()===u.path()&&i.query()===u.query())return;!0===o||o&&!0===o.trigger?o&&o.replace?t.replace(n):t.push(n):o&&o.replace?window.history.replaceState(null,null,n):window.history.pushState(null,null,n),e.context.router.setRouteLeaveHook(r,e.routerWillLeave)}},RenderOrigamiIf.prototype.componentWillReceiveProps=function componentWillReceiveProps(t,r){e(this.props)&&!e(t)&&s.trigger("close")},RenderOrigamiIf.prototype.render=function render(){return e(this.props)?a.createElement("div",null,a.createElement("div",{"data-js":"origami"}),a.createElement(t,this.props)):a.createElement(t,this.props)},RenderOrigamiIf}(a.Component),n.propTypes={children:a.PropTypes.node,route:a.PropTypes.object},n.contextTypes={router:a.PropTypes.object},u}}},olSI:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("I8Ec"),n=e("nRzv"),o=e("hgxZ"),u=n("/api/onDemandHomeProgress.v1",{type:"rest"});exports.getHomeProgress=function(e){var n=o.get().id+"~"+e,i=new r(n).addQueryParam("fields","modulesCompleted,modulesPassed");return t(u.get(i.toString()))}},pCyr:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("I8Ec"),o=_interopRequireDefault(n),u=e("nRzv"),i=_interopRequireDefault(u);module.exports=function(e,t){var n=(0,i.default)("/api/onDemandReferences.v1",{type:"rest"}),u=(new o.default).addQueryParam("courseId",t).addQueryParam("q","courseListed").addQueryParam("fields","name,shortId,slug,content").addQueryParam("includes","assets");return(0,r.default)(n.get(u.toString())).then(function(t){e.dispatch("LOAD_REFERENCES_LIST",t.elements)})}},pYUm:function(module,exports,e){"use strict";var t=e("S2Uf"),r=e("hHYt"),n=e("I8Ec"),o=r("/api/insights.v1",{type:"rest"}),u=["description","title","authors","createdAt","ownerScope","coverImage","userPublicProfiles.v1(fullName,photoUrl)","lastUpdatedAt"],i=[].concat(u,["progressStatus"]),a=[].concat(u,["context","blockCollection","blockCollectionId"]),s=["profiles"],d={loadLatestInsightById:function loadLatestInsightById(e){var r=(new n).addQueryParam("q","getLatest").addQueryParam("id",e).addQueryParam("includes",s.join(",")).addQueryParam("fields",a.join(","));return t(o.get(r.toString()))},loadInsightsByContextWithProgress:function loadInsightsByContextWithProgress(e,r){var u=(new n).addQueryParam("q","byContext").addQueryParam("context",e+"~"+r).addQueryParam("includes",s.join(",")).addQueryParam("fields",i.join(","));return t(o.get(u.toString()))}};module.exports=d},qs8E:function(module,exports,e){"use strict";var t=e("lhRp"),r=t.getCourseSchedule,n=e("v0ZQ");module.exports=function(e){if(!e)throw new Error("`courseId` is required to get course schedule.");return r(e).then(n).then(function(e){return e.elements[0].defaultSchedule.periods})}},uNuf:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("Dd8w"),r=_interopRequireDefault(t),n=e("+6Bu"),o=_interopRequireDefault(n),u=e("U7vG"),i=e("Tj91"),a=function LoadingBox(e){var t=e.loadingText,n=e.iconSize,a=void 0===n?64:n,s=e.iconName,d=void 0===s?"SvgCssLoaderSignal":s,c=(0,o.default)(e,["loadingText","iconSize","iconName"]);return u.createElement("div",(0,r.default)({className:"rc-LoadingBox vertical-box align-items-absolute-center"},c),u.createElement(i,{iconName:d,size:a,className:"color-primary"}),t&&u.createElement("p",null,t))};a.propTypes={iconName:u.PropTypes.string,loadingText:u.PropTypes.string,iconSize:u.PropTypes.number},module.exports=a},vGWh:function(module,exports,e){"use strict";var t=e("S2Uf"),_=e("41m7"),r=e("PzzI"),n=e("ceWS"),o=e("8kuH");exports.loadUserGroupsForCourse=function(e,u){var i=u.courseId,a=u.userId;if(e.getStore("GroupSettingStore").hasLoaded())return t();return r.myCourseGroupsWithSettings(a,i).then(function(t){var r=_(t.linked["groupSettings.v1"]).map(function(e){return new o(e)}),u=t.linked["groups.v1"].map(function(e){return new n(e)}),i=t.elements;e.dispatch("LOADED_COURSE_GROUPS",{groups:u,groupSettings:r,groupMemberships:i})}).fail(function(t){e.dispatch("LOADED_COURSE_GROUPS",{})})},exports.loadUserSessionGroupForCourse=function(e,n){var o=n.courseId,u=n.userId,i=n.sessionId;if(e.getStore("GroupSettingStore").hasSessionGroupLoaded())return t();return r.getCourseSessionGroup(u,o,i).then(function(t){var r=t.elements[0];e.dispatch("LOADED_SESSION_GROUP",{sessionGroup:r})}).fail(function(t){e.dispatch("LOADED_SESSION_GROUP",{})})}},vN2C:function(module,exports,e){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var t=e("S2Uf"),r=_interopRequireDefault(t),n=e("hgxZ"),o=_interopRequireDefault(n),u=e("PsON"),i=_interopRequireDefault(u),a=e("olSI");module.exports=function(e,t){if(e.getStore(i.default).hasLoaded())return(0,r.default)();return o.default.isAuthenticatedUser()?(0,a.getHomeProgress)(t).then(function(t){t.elements&&t.elements.length&&e.dispatch("LOAD_HOME_PROGRESS",t.elements[0])}).fail(function(){e.dispatch("LOAD_HOME_PROGRESS",{modulesCompleted:[],modulesPassed:[]})}):(e.dispatch("LOAD_HOME_PROGRESS",{modulesCompleted:[],modulesPassed:[]}),(0,r.default)())}},"xdS+":function(module,exports,e){"use strict";var t=e("ZRPT"),r=e("9zRm"),n=e("4rvH");module.exports=function(e){return t(n.build(r.prototype.resourceName,e))}}});
//# sourceMappingURL=29.fe84c6cb086943315f96.js.map