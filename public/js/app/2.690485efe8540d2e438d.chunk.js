webpackJsonp([2],{1383:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),u.d(n,"UploadModuleNgFactory",function(){return f});var t=u(1),e=u(1402),o=u(1403),i=u(7),d=u(30),a=u(18),r=u(61),s=u(249),c=u(72),m=u(60),g=u(11),p=u(194),v=u(1390),f=t["ɵcmf"](e.a,[],function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[o.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[t.LOCALE_ID,[2,i["ɵa"]]]),t["ɵmpd"](4608,d.v,d.v,[]),t["ɵmpd"](4608,d.e,d.e,[]),t["ɵmpd"](6144,a.b,null,[i.DOCUMENT]),t["ɵmpd"](4608,a.c,a.c,[[2,a.b]]),t["ɵmpd"](5120,r.d,r.a,[[3,r.d],[2,s.a],c.c]),t["ɵmpd"](512,i.CommonModule,i.CommonModule,[]),t["ɵmpd"](512,d.t,d.t,[]),t["ɵmpd"](512,d.j,d.j,[]),t["ɵmpd"](512,d.r,d.r,[]),t["ɵmpd"](512,m.n,m.n,[[2,m.s],[2,m.l]]),t["ɵmpd"](512,a.a,a.a,[]),t["ɵmpd"](256,g.f,!0,[]),t["ɵmpd"](512,g.n,g.n,[[2,g.f]]),t["ɵmpd"](512,p.e,p.e,[]),t["ɵmpd"](512,r.c,r.c,[]),t["ɵmpd"](512,e.a,e.a,[]),t["ɵmpd"](1024,m.j,function(){return[[{path:"",component:v.a}]]},[])])})},1390:function(l,n,u){"use strict";u(1),u(60);var t=u(30),e=(u(632),u(1404));u(617);n.a=class{constructor(l,n,u){this.router=l,this.uploadService=n,this.authService=u,this.authService.isLoggedIn()||this.router.navigateByUrl("/auth/signin/upload")}ngOnInit(){this.myForm=new t.h({name:new t.f(null,t.s.required),type:new t.f(null,t.s.required),country:new t.f(null,t.s.required),continent:new t.f(null,t.s.required),sourceUrl:new t.f(null,t.s.required),sourceDate:new t.f(null,t.s.required),mapboxId:new t.f(null,t.s.required)})}onSubmit(){const l=new e.a(this.myForm.value.name,this.myForm.value.type,this.myForm.value.country,this.myForm.value.continent,this.myForm.value.sourceUrl,this.myForm.value.sourceDate,this.myForm.value.mapboxId);this.uploadService.save(l).subscribe(l=>console.log(l),l=>console.error(l))}}},1402:function(l,n,u){"use strict";u(248),u(30);n.a=class{}},1403:function(l,n,u){"use strict";function t(l){return e["ɵvid"](0,[(l()(),e["ɵeld"](0,0,null,null,126,"div",[["class","container"],["style","margin-top:100px;"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n  "])),(l()(),e["ɵeld"](2,0,null,null,123,"div",[["class","col-mat-8 col-mat-offset-2"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n    "])),(l()(),e["ɵeld"](4,0,null,null,120,"mat-card",[["class","mat-card"]],null,null,null,o.d,o.a)),e["ɵdid"](5,49152,null,0,i.a,[],null,null),(l()(),e["ɵted"](-1,0,["\n      "])),(l()(),e["ɵeld"](7,0,null,0,11,"mat-card-header",[["class","mat-card-header"]],null,null,null,o.c,o.b)),e["ɵdid"](8,49152,null,0,i.d,[],null,null),(l()(),e["ɵted"](-1,2,["\n        "])),(l()(),e["ɵeld"](10,0,null,0,3,"mat-icon",[["class","mat-card-avatar mat-icon"],["mat-card-avatar",""],["role","img"]],null,null,null,d.b,d.a)),e["ɵdid"](11,16384,null,0,i.b,[],null,null),e["ɵdid"](12,638976,null,0,a.b,[e.ElementRef,a.d,[8,null]],null,null),(l()(),e["ɵted"](-1,0,["file_upload"])),(l()(),e["ɵted"](-1,2,["\n        "])),(l()(),e["ɵeld"](15,0,null,1,2,"mat-card-title",[["class","help-card-title mat-card-title"]],null,null,null,null,null)),e["ɵdid"](16,16384,null,0,i.f,[],null,null),(l()(),e["ɵted"](-1,null,["Upload Data"])),(l()(),e["ɵted"](-1,2,["\n      "])),(l()(),e["ɵted"](-1,0,["\n      "])),(l()(),e["ɵeld"](20,0,null,0,103,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),e["ɵdid"](21,16384,null,0,i.c,[],null,null),(l()(),e["ɵted"](-1,null,["\n        "])),(l()(),e["ɵeld"](23,0,null,null,99,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,u){var t=!0,o=l.component;if("submit"===n){t=!1!==e["ɵnov"](l,25).onSubmit(u)&&t}if("reset"===n){t=!1!==e["ɵnov"](l,25).onReset()&&t}if("ngSubmit"===n){t=!1!==o.onSubmit()&&t}return t},null,null)),e["ɵdid"](24,16384,null,0,r.u,[],null,null),e["ɵdid"](25,540672,null,0,r.i,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),e["ɵprd"](2048,null,r.c,null,[r.i]),e["ɵdid"](27,16384,null,0,r.o,[r.c],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](29,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](31,0,null,null,1,"label",[["for","name"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Name"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](34,0,null,null,5,"input",[["class","form-control"],["formControlName","name"],["id","name"],["type","text"],["value","Wesminster Parliamentary Constituencies"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,35)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,35).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,35)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,35)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](35,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](37,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](39,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](42,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](44,0,null,null,1,"label",[["for","type"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Type"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](47,0,null,null,5,"input",[["class","form-control"],["formControlName","type"],["id","type"],["type","text"],["value","Government"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,48)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,48).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,48)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,48)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](48,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](50,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](52,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](55,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](57,0,null,null,1,"label",[["for","country"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Country"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](60,0,null,null,5,"input",[["class","form-control"],["formControlName","country"],["id","country"],["type","text"],["value","UK"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,61)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,61).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,61)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,61)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](61,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](63,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](65,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](68,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](70,0,null,null,1,"label",[["for","country"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Continent"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](73,0,null,null,5,"input",[["class","form-control"],["formControlName","continent"],["id","continent"],["type","text"],["value","Europe"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,74)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,74).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,74)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,74)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](74,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](76,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](78,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](81,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](83,0,null,null,1,"label",[["for","sourceUrl"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Source Url"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](86,0,null,null,5,"input",[["class","form-control"],["formControlName","sourceUrl"],["id","sourceUrl"],["type","text"],["value","http://www.example.com"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,87)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,87).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,87)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,87)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](87,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](89,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](91,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](94,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](96,0,null,null,1,"label",[["for","sourceDate"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Source Date"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](99,0,null,null,5,"input",[["class","form-control"],["formControlName","sourceDate"],["id","sourceDate"],["type","text"],["value","2017-04-07"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,100)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,100).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,100)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,100)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](100,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](102,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](104,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](107,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](109,0,null,null,1,"label",[["for","mapboxId"]],null,null,null,null,null)),(l()(),e["ɵted"](-1,null,["Mapbox ID"])),(l()(),e["ɵted"](-1,null,["\n              "])),(l()(),e["ɵeld"](112,0,null,null,5,"input",[["class","form-control"],["formControlName","mapboxId"],["id","mapboxId"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0;if("input"===n){t=!1!==e["ɵnov"](l,113)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==e["ɵnov"](l,113).onTouched()&&t}if("compositionstart"===n){t=!1!==e["ɵnov"](l,113)._compositionStart()&&t}if("compositionend"===n){t=!1!==e["ɵnov"](l,113)._compositionEnd(u.target.value)&&t}return t},null,null)),e["ɵdid"](113,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["ɵprd"](1024,null,r.l,function(l){return[l]},[r.d]),e["ɵdid"](115,671744,null,0,r.g,[[3,r.c],[8,null],[8,null],[2,r.l]],{name:[0,"name"]},null),e["ɵprd"](2048,null,r.m,null,[r.g]),e["ɵdid"](117,16384,null,0,r.n,[r.m],null,null),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵted"](-1,null,["\n          "])),(l()(),e["ɵeld"](120,0,null,null,1,"button",[["class","btn btn-primary"],["type","submit"]],[[8,"disabled",0]],null,null,null,null)),(l()(),e["ɵted"](-1,null,["Submit"])),(l()(),e["ɵted"](-1,null,["\n        "])),(l()(),e["ɵted"](-1,null,["\n      "])),(l()(),e["ɵted"](-1,0,["\n    "])),(l()(),e["ɵted"](-1,null,["\n  "])),(l()(),e["ɵted"](-1,null,["\n"])),(l()(),e["ɵted"](-1,null,["\n"]))],function(l,n){var u=n.component;l(n,12,0);l(n,25,0,u.myForm);l(n,37,0,"name");l(n,50,0,"type");l(n,63,0,"country");l(n,76,0,"continent");l(n,89,0,"sourceUrl");l(n,102,0,"sourceDate");l(n,115,0,"mapboxId")},function(l,n){var u=n.component;l(n,23,0,e["ɵnov"](n,27).ngClassUntouched,e["ɵnov"](n,27).ngClassTouched,e["ɵnov"](n,27).ngClassPristine,e["ɵnov"](n,27).ngClassDirty,e["ɵnov"](n,27).ngClassValid,e["ɵnov"](n,27).ngClassInvalid,e["ɵnov"](n,27).ngClassPending);l(n,34,0,e["ɵnov"](n,39).ngClassUntouched,e["ɵnov"](n,39).ngClassTouched,e["ɵnov"](n,39).ngClassPristine,e["ɵnov"](n,39).ngClassDirty,e["ɵnov"](n,39).ngClassValid,e["ɵnov"](n,39).ngClassInvalid,e["ɵnov"](n,39).ngClassPending);l(n,47,0,e["ɵnov"](n,52).ngClassUntouched,e["ɵnov"](n,52).ngClassTouched,e["ɵnov"](n,52).ngClassPristine,e["ɵnov"](n,52).ngClassDirty,e["ɵnov"](n,52).ngClassValid,e["ɵnov"](n,52).ngClassInvalid,e["ɵnov"](n,52).ngClassPending);l(n,60,0,e["ɵnov"](n,65).ngClassUntouched,e["ɵnov"](n,65).ngClassTouched,e["ɵnov"](n,65).ngClassPristine,e["ɵnov"](n,65).ngClassDirty,e["ɵnov"](n,65).ngClassValid,e["ɵnov"](n,65).ngClassInvalid,e["ɵnov"](n,65).ngClassPending);l(n,73,0,e["ɵnov"](n,78).ngClassUntouched,e["ɵnov"](n,78).ngClassTouched,e["ɵnov"](n,78).ngClassPristine,e["ɵnov"](n,78).ngClassDirty,e["ɵnov"](n,78).ngClassValid,e["ɵnov"](n,78).ngClassInvalid,e["ɵnov"](n,78).ngClassPending);l(n,86,0,e["ɵnov"](n,91).ngClassUntouched,e["ɵnov"](n,91).ngClassTouched,e["ɵnov"](n,91).ngClassPristine,e["ɵnov"](n,91).ngClassDirty,e["ɵnov"](n,91).ngClassValid,e["ɵnov"](n,91).ngClassInvalid,e["ɵnov"](n,91).ngClassPending);l(n,99,0,e["ɵnov"](n,104).ngClassUntouched,e["ɵnov"](n,104).ngClassTouched,e["ɵnov"](n,104).ngClassPristine,e["ɵnov"](n,104).ngClassDirty,e["ɵnov"](n,104).ngClassValid,e["ɵnov"](n,104).ngClassInvalid,e["ɵnov"](n,104).ngClassPending);l(n,112,0,e["ɵnov"](n,117).ngClassUntouched,e["ɵnov"](n,117).ngClassTouched,e["ɵnov"](n,117).ngClassPristine,e["ɵnov"](n,117).ngClassDirty,e["ɵnov"](n,117).ngClassValid,e["ɵnov"](n,117).ngClassInvalid,e["ɵnov"](n,117).ngClassPending);l(n,120,0,!u.myForm.valid)})}u.d(n,"a",function(){return v});var e=u(1),o=u(619),i=u(194),d=u(104),a=u(61),r=u(30),s=u(1390),c=u(60),m=u(632),g=u(617),p=e["ɵcrt"]({encapsulation:2,styles:[],data:{}}),v=e["ɵccf"]("shape-upload",s.a,function(l){return e["ɵvid"](0,[(l()(),e["ɵeld"](0,0,null,null,1,"shape-upload",[],null,null,null,t,p)),e["ɵdid"](1,114688,null,0,s.a,[c.l,m.a,g.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[])},1404:function(l,n,u){"use strict";n.a=class{constructor(l,n,u,t,e,o,i){this.name=l,this.type=n,this.country=u,this.continent=t,this.sourceUrl=e,this.sourceDate=o,this.mapboxId=i}}}});