"use strict";(self.webpackChunkapp_delivery_ng=self.webpackChunkapp_delivery_ng||[]).push([["src_app_landing_landing_module_ts"],{9321:(ln,T,o)=>{o.r(T),o.d(T,{LandingModule:()=>d});var g=o(4666),b=o(2712),s=o(4042),A=o(207),u=o(640),_=o(7047),n=o(2560),y=o(2856),j=o(3630),N=o(8817),f=o(3662);function h(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"button",8),n.NdJ("click",function(){n.CHM(t);const a=n.oxw();return n.KtG(a.actionLanding())}),n._uU(1),n.qZA()}if(2&i){const t=n.oxw();n.xp6(1),n.Oqu(null==t.banner?null:t.banner.callToAction)}}function D(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"button",9),n.NdJ("click",function(){n.CHM(t);const a=n.oxw();return n.KtG(a.nextBanner())}),n._uU(1),n.qZA()}if(2&i){const t=n.oxw();n.xp6(1),n.Oqu(null==t.banner?null:t.banner.callToNext)}}class M{constructor(e,t){this.pwa=e,this.layoutState=t,this.emitBanner=new n.vpe,this.showImage=!1}ngOnInit(){}actionLanding(){if(this.banner.action.finish)return this.emitBanner.emit(0),void localStorage.setItem("landing-banner","true");this.banner.action&&this.banner.action()}nextBanner(){this.emitBanner.emit(this.banner.next)}}M.\u0275fac=function(e){return new(e||M)(n.Y36(y.I),n.Y36(N.m))},M.\u0275cmp=n.Xpm({type:M,selectors:[["app-banner"]],inputs:{banner:"banner"},outputs:{emitBanner:"emitBanner"},decls:9,vars:7,consts:[[1,"container-banner"],[1,"banner"],[1,"container-image-banner",3,"ngClass"],["alt","",1,"image-banner",3,"src"],[1,"text-banner"],[1,"container-buttons"],["class","button-banner button-action",3,"click",4,"ngIf"],["class","button-banner button-next",3,"click",4,"ngIf"],[1,"button-banner","button-action",3,"click"],[1,"button-banner","button-next",3,"click"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2),n._UZ(3,"img",3),n.qZA(),n.TgZ(4,"p",4),n._uU(5),n.qZA(),n.TgZ(6,"div",5),n.YNc(7,h,2,1,"button",6),n.YNc(8,D,2,1,"button",7),n.qZA()()()),2&e&&(n.Udp("background",null==t.banner?null:t.banner.background),n.xp6(2),n.Q6J("ngClass","banner-"+t.banner.id),n.xp6(1),n.MGl("src","./",t.banner.image,"",n.LSH),n.xp6(2),n.Oqu(null==t.banner?null:t.banner.text),n.xp6(2),n.Q6J("ngIf",t.banner.callToAction),n.xp6(1),n.Q6J("ngIf",t.banner.callToNext))},dependencies:[g.mk,g.O5],styles:['.container-banner[_ngcontent-%COMP%]{height:100vh;display:flex;align-items:center;justify-content:center;padding:15px}.banner[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center;row-gap:15px}.banner[_ngcontent-%COMP%]   .text-banner[_ngcontent-%COMP%]{color:#373737;font-size:.9rem;margin-top:-20px}.container-image-banner[_ngcontent-%COMP%]{min-height:300px}.container-image-banner.banner-2[_ngcontent-%COMP%]{position:relative}.container-image-banner.banner-2[_ngcontent-%COMP%]:before{position:absolute;content:"";width:10px;height:10px;background-color:red}.container-image-banner[_ngcontent-%COMP%]   .image-banner[_ngcontent-%COMP%]{width:300px}.container-buttons[_ngcontent-%COMP%]{display:flex;gap:15px}.container-buttons[_ngcontent-%COMP%]   .button-banner[_ngcontent-%COMP%]{padding:8px 15px;border-radius:5px;color:#fff}.container-buttons[_ngcontent-%COMP%]   .button-action[_ngcontent-%COMP%]{background:#5551ff}.container-buttons[_ngcontent-%COMP%]   .button-next[_ngcontent-%COMP%]{background:#373737}']});var O=o(8987),z=o(1379);class p{}p.\u0275fac=function(e){return new(e||p)},p.\u0275cmp=n.Xpm({type:p,selectors:[["app-alert-local-closed"]],decls:15,vars:2,consts:[[1,"container-alert"],["src","data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQxIiB2aWV3Qm94PSIwIDAgMTQwIDE0MSI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNDQUM1RDAiIGQ9Ik00NC42NDEgOC41MDFMNTkuMDY1IDguNTAxIDU5LjA2NSAxNC43MjQgNDQuNjQxIDE0LjcyNHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTggLTE3MCkgdHJhbnNsYXRlKDAgMTM4KSB0cmFuc2xhdGUoNDgpIHRyYW5zbGF0ZSg3MCAzMikgdHJhbnNsYXRlKDEwLjg4OSA3Ljc3OCkgcm90YXRlKC03IDUxLjg1MyAxMS42MTIpIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjRUZFREYwIiBkPSJNNDIuOTQzIDEuNTU2aDE2LjI0NGMxLjY1NyAwIDMgMS4zNDMgMyAzdi45OTJjMCAxLjY1Ny0xLjM0MyAzLTMgM0g0Mi45NDNjLTEuNjU3IDAtMy0xLjM0My0zLTN2LS45OTJjMC0xLjY1NyAxLjM0My0zIDMtM3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTggLTE3MCkgdHJhbnNsYXRlKDAgMTM4KSB0cmFuc2xhdGUoNDgpIHRyYW5zbGF0ZSg3MCAzMikgdHJhbnNsYXRlKDEwLjg4OSA3Ljc3OCkgcm90YXRlKC03IDUxLjA2NSA1LjA1MikiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNFRkVERjAiIGQ9Ik01OS41IDEyLjQ2OWMxMC41ODIgMCAyMC40NDQgMy4wODUgMjguNzM1IDguNDA1LTMuMzg2IDMuMzMtNS43MSA3Ljc4NC02LjMzNCAxMi44NjItMS40NjYgMTEuOTM4IDcuMDIzIDIyLjgwNCAxOC45NjEgMjQuMjcgMy45MTYuNDggNy43MTctLjExIDExLjEwOS0xLjU0Mi41MyAzLjAxNC44MDcgNi4xMTYuODA3IDkuMjgzIDAgMjkuNDI0LTIzLjg1MyA1My4yNzgtNTMuMjc4IDUzLjI3OC0yOS40MjUgMC01My4yNzgtMjMuODU0LTUzLjI3OC01My4yNzggMC0yOS40MjUgMjMuODUzLTUzLjI3OCA1My4yNzgtNTMuMjc4eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOCAtMTcwKSB0cmFuc2xhdGUoMCAxMzgpIHRyYW5zbGF0ZSg0OCkgdHJhbnNsYXRlKDcwIDMyKSB0cmFuc2xhdGUoMTAuODg5IDcuNzc4KSByb3RhdGUoLTcgNTkuNSA2NS43NDcpIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0FDNUQwIiBkPSJNNTkuNSAyMi40MmM4LjYzIDAgMTYuNjcgMi41MjIgMjMuNDI0IDYuODctLjQ4NyAxLjQxNi0uODM0IDIuOTAyLTEuMDIzIDQuNDQ2LTEuNDY2IDExLjkzOCA3LjAyMyAyMi44MDQgMTguOTYxIDI0LjI3LjQzNC4wNTMuODY2LjA5MyAxLjI5Ni4xMi40NCAyLjQ3NC42NyA1LjAyLjY3IDcuNjIgMCAyMy45My0xOS4zOTkgNDMuMzI4LTQzLjMyOCA0My4zMjgtMjMuOTMgMC00My4zMjgtMTkuMzk4LTQzLjMyOC00My4zMjcgMC0yMy45MyAxOS4zOTktNDMuMzI4IDQzLjMyOC00My4zMjh6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE4IC0xNzApIHRyYW5zbGF0ZSgwIDEzOCkgdHJhbnNsYXRlKDQ4KSB0cmFuc2xhdGUoNzAgMzIpIHRyYW5zbGF0ZSgxMC44ODkgNy43NzgpIHJvdGF0ZSgtNyA1OS41IDY1Ljc0NykiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01OC40NzQgMjMuNzE0YzguODU3IDAgMTcuMDU4IDIuODA5IDIzLjc2MSA3LjU4NC0uMjA0LjgzMi0uMzYxIDEuNjg1LS40NjggMi41NTYtMS4zOSAxMS4zMTYgNi4xNjYgMjEuNjY5IDE3LjEyNiAyMy45NjUuMzggMi4yNC41NzggNC41NDMuNTc4IDYuODkyIDAgMjIuNjQzLTE4LjM1NSA0MC45OTgtNDAuOTk3IDQwLjk5OC0yMi42NDMgMC00MC45OTgtMTguMzU1LTQwLjk5OC00MC45OTggMC0yMi42NDIgMTguMzU1LTQwLjk5NyA0MC45OTgtNDAuOTk3eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOCAtMTcwKSB0cmFuc2xhdGUoMCAxMzgpIHRyYW5zbGF0ZSg0OCkgdHJhbnNsYXRlKDcwIDMyKSB0cmFuc2xhdGUoMTAuODg5IDcuNzc4KSByb3RhdGUoLTcgNTguNDc0IDY0LjcxMSkiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNFQUUzRTMiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTU0LjQ4NyAyOC42MjNjLjgyIDAgMS40OTIuNjM1IDEuNTUyIDEuNDRsLjAwNC4xMTZ2My44ODljMCAuODU5LS42OTYgMS41NTUtMS41NTYgMS41NTUtLjgyIDAtMS40OTEtLjYzNC0xLjU1LTEuNDRsLS4wMDUtLjExNXYtMy44OWMwLS44NTguNjk2LTEuNTU1IDEuNTU1LTEuNTU1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOCAtMTcwKSB0cmFuc2xhdGUoMCAxMzgpIHRyYW5zbGF0ZSg0OCkgdHJhbnNsYXRlKDcwIDMyKSB0cmFuc2xhdGUoMTAuODg5IDcuNzc4KSByb3RhdGUoLTcgNTQuNDg3IDMyLjEyMykiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNFQUUzRTMiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTYyLjQ5IDkzLjc5NmMuODIgMCAxLjQ5Mi42MzQgMS41NTEgMS40NGwuMDA0LjExNXYzLjg5YzAgLjg1OC0uNjk2IDEuNTU1LTEuNTU1IDEuNTU1LS44MiAwLTEuNDkyLS42MzUtMS41NTItMS40NGwtLjAwNC0uMTE2di0zLjg4OWMwLS44NTkuNjk3LTEuNTU1IDEuNTU2LTEuNTU1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOCAtMTcwKSB0cmFuc2xhdGUoMCAxMzgpIHRyYW5zbGF0ZSg0OCkgdHJhbnNsYXRlKDcwIDMyKSB0cmFuc2xhdGUoMTAuODg5IDcuNzc4KSByb3RhdGUoLTcgNjIuNDkgOTcuMjk2KSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0VBRTNFMyIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOTIuOTc0IDU5LjE1MWMuODYgMCAxLjU1Ni42OTcgMS41NTYgMS41NTYgMCAuODItLjYzNSAxLjQ5Mi0xLjQ0IDEuNTUxbC0uMTE2LjAwNGgtMy44M2MtLjg1OCAwLTEuNTU1LS42OTYtMS41NTUtMS41NTUgMC0uODIuNjM1LTEuNDkyIDEuNDQtMS41NTJsLjExNi0uMDA0aDMuODN6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE4IC0xNzApIHRyYW5zbGF0ZSgwIDEzOCkgdHJhbnNsYXRlKDQ4KSB0cmFuc2xhdGUoNzAgMzIpIHRyYW5zbGF0ZSgxMC44ODkgNy43NzgpIHJvdGF0ZSgtNyA5MS4wNiA2MC43MDcpIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjRUFFM0UzIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0yNy43NDMgNjcuMTZjLjg1OSAwIDEuNTU1LjY5NyAxLjU1NSAxLjU1NiAwIC44Mi0uNjM0IDEuNDkyLTEuNDQgMS41NTFsLS4xMTUuMDA1aC0zLjgzYy0uODU5IDAtMS41NTUtLjY5Ny0xLjU1NS0xLjU1NiAwLS44Mi42MzQtMS40OTIgMS40NC0xLjU1MWwuMTE1LS4wMDRoMy44M3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTggLTE3MCkgdHJhbnNsYXRlKDAgMTM4KSB0cmFuc2xhdGUoNDgpIHRyYW5zbGF0ZSg3MCAzMikgdHJhbnNsYXRlKDEwLjg4OSA3Ljc3OCkgcm90YXRlKC03IDI1LjgyOCA2OC43MTYpIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0FDNUQwIiBkPSJNNjMuOTI4IDQwLjEyMWMuNDMgMCAuNzc4LjM0OC43NzguNzc4bDEuNTMgMjUuMjU2Yy4wMTcuMTExLjAyNS4yMjUuMDI1LjM0VjY2LjU2NmMtLjAzOSAxLjI1Ni0xLjA2OCAyLjI2Mi0yLjMzMyAyLjI2Mi0xLjI4OSAwLTIuMzM0LTEuMDQ0LTIuMzM0LTIuMzMzbC4wMDIuMDdoLS4wMDJsLjAwMS0uMDI0di0uMDQ2YzAtLjExNS4wMDgtLjIyOS4wMjQtLjM0TDYzLjE1IDQwLjlsLjAwNy0uMTA2Yy4wNTEtLjM4LjM3Ny0uNjcyLjc3LS42NzJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE4IC0xNzApIHRyYW5zbGF0ZSgwIDEzOCkgdHJhbnNsYXRlKDQ4KSB0cmFuc2xhdGUoNzAgMzIpIHRyYW5zbGF0ZSgxMC44ODkgNy43NzgpIHJvdGF0ZSgzMyA2My45MjggNTQuNDc1KSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0NBQzVEMCIgZD0iTTY5LjIzNCA1Ny4wODJjLjQzIDAgLjc3OC40NS43NzggMS4wMDRsMS41MzEgMzIuNjI1Yy4wMTYuMTQxLjAyNC4yODYuMDI0LjQzM3YuMDkxYy0uMDM4IDEuNjIzLTEuMDY4IDIuOTIzLTIuMzMzIDIuOTIzLTEuMjg5IDAtMi4zMzQtMS4zNS0yLjMzNC0zLjAxNGwuMDAyLjA5LS4wMDIuMDAxLjAwMS0uMDI4di0uMDYzYzAtLjE0Ny4wMDgtLjI5Mi4wMjMtLjQzM2wxLjUzMi0zMi42MjUuMDA2LS4xMjZjLjA0OC0uNDk1LjM3NS0uODc4Ljc3Mi0uODc4eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOCAtMTcwKSB0cmFuc2xhdGUoMCAxMzgpIHRyYW5zbGF0ZSg0OCkgdHJhbnNsYXRlKDcwIDMyKSB0cmFuc2xhdGUoMTAuODg5IDcuNzc4KSBzY2FsZSgxIC0xKSByb3RhdGUoNDcgMjQzLjE0NyAwKSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZBMDA1MCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOTkuNjEgMTQuOTEyYy05LjAyNyAwLTE2LjMzMyA3LjMwNS0xNi4zMzMgMTYuMzMzIDAgOS4wMjcgNy4zMDUgMTYuMzMzIDE2LjMzMyAxNi4zMzMgOS4wMjggMCAxNi4zMzQtNy4zMDUgMTYuMzM0LTE2LjMzMyAwLTkuMDI3LTcuMzA2LTE2LjMzMy0xNi4zMzQtMTYuMzMzem0tLjc4MyAyMC4yNWwtMy43MDkgMy43MWMtLjQxOC40MTctLjk3NS42NDgtMS41NjYuNjQ4LTEuMjI1IDAtMi4yMTYtLjk5LTIuMjE2LTIuMjE2IDAtLjU5Mi4yMy0xLjE0OC42NDgtMS41NjdsMy43MS0zLjcwOGMuNDMyLS40MzMuNDMyLTEuMTM1IDAtMS41NjhsLTMuNzEtMy43MDhjLS40MTgtLjQxOS0uNjQ4LS45NzUtLjY0OC0xLjU2NyAwLTEuMjI1Ljk5LTIuMjE2IDIuMjE2LTIuMjE2LjU5MSAwIDEuMTQ4LjIzIDEuNTY2LjY0OWwzLjcwOSAzLjcwOWMuNDMzLjQzMiAxLjEzNC40MzIgMS41NjcgMGwzLjcwOC0zLjcxYy40Mi0uNDE4Ljk3Ni0uNjQ4IDEuNTY3LS42NDggMS4yMjUgMCAyLjIxNi45OSAyLjIxNiAyLjIxNiAwIC41OTItLjIzIDEuMTQ4LS42NDggMS41NjdsLTMuNzEgMy43MDhjLS40MzIuNDMzLS40MzIgMS4xMzUgMCAxLjU2OGwzLjcxIDMuNzA4Yy40MTguNDE5LjY0OC45NzUuNjQ4IDEuNTY3IDAgMS4yMjQtLjk5IDIuMjE2LTIuMjE2IDIuMjE2LS41OTEgMC0xLjE0OC0uMjMtMS41NjctLjY0OWwtMy43MDgtMy43MDljLS40MzMtLjQzMy0xLjEzNC0uNDMyLTEuNTY3IDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE4IC0xNzApIHRyYW5zbGF0ZSgwIDEzOCkgdHJhbnNsYXRlKDQ4KSB0cmFuc2xhdGUoNzAgMzIpIHRyYW5zbGF0ZSgxMC44ODkgNy43NzgpIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=","alt",""],[1,"container-buttons"],[1,"button-cancel","button-dialog",3,"mat-dialog-close"],[1,"button-accept","button-dialog",3,"mat-dialog-close"]],template:function(e,t){1&e&&(n.TgZ(0,"mat-dialog-content")(1,"div",0),n._UZ(2,"img",1),n.TgZ(3,"h2"),n._uU(4,"Cerrado por el momento"),n.qZA(),n.TgZ(5,"p"),n._uU(6,"El local se encuentra cerrado, solamente podras ver el menu. "),n._UZ(7,"br"),n._uU(8," \xbfQuieres continuar?"),n.qZA()(),n.TgZ(9,"mat-dialog-actions")(10,"div",2)(11,"button",3),n._uU(12,"No"),n.qZA(),n.TgZ(13,"button",4),n._uU(14,"Si, continuar"),n.qZA()()()()),2&e&&(n.xp6(11),n.Q6J("mat-dialog-close",!1),n.xp6(2),n.Q6J("mat-dialog-close",!0))},dependencies:[u.ZT,u.xY,u.H8],styles:[".container-alert[_ngcontent-%COMP%]{text-align:center;padding:10px 0}.container-alert[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{padding-top:10px}.container-buttons[_ngcontent-%COMP%]{width:100%;text-align:center;display:flex;justify-content:space-between;column-gap:25px;padding-top:20px}.button-dialog[_ngcontent-%COMP%]{display:inline-block;width:100%;padding:8px;border:none;border-radius:25px;cursor:pointer}.button-dialog.button-accept[_ngcontent-%COMP%]{background:#fa0050;color:#fff}.button-cancel[_ngcontent-%COMP%]{background:#ccc}"]});var S=o(3242),w=o(4489),v=o(8701);function Z(i,e){1&i&&(n.TgZ(0,"p",11),n._UZ(1,"i",12),n._uU(2," Acepta transferencia"),n.qZA())}function Y(i,e){if(1&i&&(n.TgZ(0,"p",13),n._uU(1),n.ALo(2,"currency"),n.O4$(),n.TgZ(3,"svg",14),n._UZ(4,"path",15),n.qZA()()),2&i){const t=n.oxw();n.xp6(1),n.AsE("",t.local.shipping.delivery.delivery_time," min \xb7 Env\xedo ",n.lcZ(2,2,t.local.shipping.delivery.delivery_cost)," ")}}class C{constructor(e,t,c,a,l,L,gn){this.router=e,this.layoutState=t,this.localData=c,this.themeService=a,this.previewCategory=l,this.matDialog=L,this.cartService=gn}ngOnInit(){}redirectLocal(){this.localData.resetData(),setTimeout(()=>{this.layoutState.state.menuMobile=!1,this.layoutState.updateState(),this.themeService.stateTheme.next(!1),this.previewCategory.category_id=void 0,this.previewCategory.productsByCategory.next([]),this.router.navigate([this.local?.name_url])},100)}preRedirect(){this.localData.islocalOpen(this.local?.schedules)?this.redirectLocal():this.matDialog.open(p,{width:window.innerWidth>1024?"55%":"95%",panelClass:"shadow-2"}).afterClosed().subscribe(t=>{t&&this.redirectLocal()})}getTimeFromString(e){if(!e)return{hours:0,minutes:0};const[t,c]=e?.split(/[ap]m/)[0].split(":");return{hours:parseInt(t,10),minutes:parseInt(c,10)}}}function U(i,e){1&i&&n._UZ(0,"div"),2&i&&n.Gre("circle circle-",e.$implicit,"")}function E(i,e){1&i&&n._UZ(0,"app-card-local",15),2&i&&n.Q6J("local",e.$implicit)}function P(i,e){1&i&&(n.TgZ(0,"div",16)(1,"div",17)(2,"div",18),n._UZ(3,"img",19),n.qZA(),n.TgZ(4,"h2",20),n._uU(5,"No se encontraron tiendas"),n.qZA()()())}function k(i,e){1&i&&(n.TgZ(0,"div",23),n._UZ(1,"p-skeleton",24),n.qZA())}C.\u0275fac=function(e){return new(e||C)(n.Y36(s.F0),n.Y36(N.m),n.Y36(S.T),n.Y36(j.O),n.Y36(w.F),n.Y36(u.uw),n.Y36(v.N))},C.\u0275cmp=n.Xpm({type:C,selectors:[["app-card-local"]],inputs:{local:"local"},decls:13,vars:6,consts:[[1,"container-card-local","shadow-3","hover:shadow-5","cursor-pointer"],[3,"click"],[1,"card-local"],[1,"container-image-local"],["alt","",3,"src"],[1,"container-info"],[1,"local-name"],["class","local-transfer",4,"ngIf"],["class","local-envio",4,"ngIf"],[1,"open-local",3,"ngClass"],[1,"pi","pi-circle-fill"],[1,"local-transfer"],[1,"pi","pi-credit-card"],[1,"local-envio"],["width","24","height","24","xmlns","http://www.w3.org/2000/svg","fill","#4c4a5c","viewBox","0 0 16 16",1,"sc-1w30n3a-2","fRyoXh"],["d","M10.788 4.5a.384.384 0 0 0-.386.381c0 .21.173.381.386.381h1.919L8.335 9.685 5.944 7.476a.39.39 0 0 0-.54.014l-3.294 3.364a.378.378 0 0 0 .009.539.39.39 0 0 0 .545-.01l3.03-3.094 2.391 2.207a.39.39 0 0 0 .54-.012l4.604-4.658v1.92c0 .211.173.382.386.382.213 0 .386-.17.386-.381V4.88a.384.384 0 0 0-.386-.381h-2.826Z"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0)(1,"div",1),n.NdJ("click",function(){return t.preRedirect()}),n.TgZ(2,"div",2)(3,"div",3),n._UZ(4,"img",4),n.qZA(),n.TgZ(5,"div",5)(6,"p",6),n._uU(7),n.qZA(),n.YNc(8,Z,3,0,"p",7),n.YNc(9,Y,5,4,"p",8),n.qZA()()(),n.TgZ(10,"span",9),n._UZ(11,"i",10),n._uU(12),n.qZA()()),2&e&&(n.xp6(4),n.Q6J("src",t.local.image,n.LSH),n.xp6(3),n.Oqu(t.local.name),n.xp6(1),n.Q6J("ngIf",null==t.local.pay_methods?null:t.local.pay_methods.transfer),n.xp6(1),n.Q6J("ngIf",null==t.local.shipping?null:t.local.shipping.delivery),n.xp6(1),n.Q6J("ngClass",t.localData.islocalOpen(t.local.schedules)?"open ":"closed"),n.xp6(2),n.hij(" ",t.localData.islocalOpen(t.local.schedules)?"Abierto":"Cerrado",""))},dependencies:[g.mk,g.O5,g.H9],styles:[".container-card-local[_ngcontent-%COMP%]{position:relative;background:#fff;border-radius:5px;padding:12px;min-height:100.4px}.card-local[_ngcontent-%COMP%]{display:flex;align-items:self-start;column-gap:10px}.container-image-local[_ngcontent-%COMP%]{width:50px;height:50px;display:grid;place-items:center;border-radius:5px;border:1px solid rgb(88,80,101)}@media (min-width: 992px){.container-image-local[_ngcontent-%COMP%]{width:100px;height:100px}}.container-image-local[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:5px;width:100%;height:100%;object-fit:cover}.container-info[_ngcontent-%COMP%]{font-weight:400}.container-info[_ngcontent-%COMP%]   .local-name[_ngcontent-%COMP%]{font-weight:700;padding:0 0 4px}.container-info[_ngcontent-%COMP%]   .local-transfer[_ngcontent-%COMP%]{display:flex;column-gap:5px;align-items:center;font-size:12px;color:#4c4a5c}.container-info[_ngcontent-%COMP%]   .local-envio[_ngcontent-%COMP%]{color:#4c4a5c;padding:8px 0 2px;font-size:12px;display:flex;align-items:center}.container-info[_ngcontent-%COMP%]   .button-horarios[_ngcontent-%COMP%]{position:absolute;bottom:5px;right:5px;font-size:12px}.open-local[_ngcontent-%COMP%]{position:absolute;top:12px;right:12px;font-size:10px;border-radius:5px;padding:5px;display:flex;align-items:center;column-gap:5px;background:rgba(219,219,219,.4901960784)}.open-local[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:10px}.open-local.open[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#5bf55b}.open-local.closed[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#f74d4d}"]});const Q=function(){return[1,2,3,4]};function F(i,e){1&i&&(n.TgZ(0,"div",21),n.YNc(1,k,2,0,"div",22),n.qZA()),2&i&&(n.xp6(1),n.Q6J("ngForOf",n.DdM(1,Q)))}const G=function(){return[1,2]};class I{constructor(e,t){this.http=e,this.recentsService=t,this.recentsCharged=!1,this.getRecents()}ngOnInit(){this.recentsService.getRecents().subscribe()}getRecents(){this.recentsService.recents$.subscribe(e=>{void 0!==e&&(this.recentsCharged=!0),this.locals=e})}}I.\u0275fac=function(e){return new(e||I)(n.Y36(O.eN),n.Y36(z.l))},I.\u0275cmp=n.Xpm({type:I,selectors:[["app-recents"]],decls:25,vars:5,consts:[[1,"container-box-landing"],[1,"box-landing"],["src","./assets/logos/logo-de.png","alt","",1,"logo-box-landing"],[1,"container-text-landing","mobile"],[1,"text-landing","mobile"],[1,"first-text"],[1,"text-landing","desktop"],["matRipple","",1,"icon-like","border-round-3xl"],[1,"pi","pi-thumbs-up"],[3,"class",4,"ngFor","ngForOf"],[1,"mb-2"],[1,"container-recents"],[3,"local",4,"ngFor","ngForOf"],["class","",4,"ngIf"],["class","flex flex-column gap-2",4,"ngIf"],[3,"local"],[1,""],[1,"w-full","h-full"],[1,"overflow-hidden"],["src","/assets/images/no-results.svg","alt","",1,"w-full","max-w-27rem","block","object-contain","m-auto"],[1,"text-center","text-2xl","text-800"],[1,"flex","flex-column","gap-2"],["class","skeleton",4,"ngFor","ngForOf"],[1,"skeleton"],["width","100%","height","5rem"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0)(1,"div",1),n._UZ(2,"img",2),n.TgZ(3,"div",3)(4,"h4",4)(5,"span",5),n._uU(6,"Ordena en segundos!"),n.qZA(),n._UZ(7,"br"),n._uU(8," Explora tus locales y haz tu pedido. "),n.qZA(),n.TgZ(9,"h4",6)(10,"span",5),n._uU(11,"Ordena en segundos con Deli!"),n.qZA(),n._UZ(12,"br"),n._uU(13," Explora tus locales favoritos y haz tu pedido de forma r\xe1pida y sencilla "),n._UZ(14,"br"),n._uU(15," Descarga nuestra aplicaci\xf3n m\xf3vil o de escritorio para obtener todas nuestras funcionalidades. "),n.qZA()(),n.TgZ(16,"div",7),n._UZ(17,"i",8),n.qZA()(),n.YNc(18,U,1,3,"div",9),n.qZA(),n.TgZ(19,"h1",10),n._uU(20,"Recientes"),n.qZA(),n.TgZ(21,"div",11),n.YNc(22,E,1,1,"app-card-local",12),n.YNc(23,P,6,0,"div",13),n.YNc(24,F,2,2,"div",14),n.qZA()),2&e&&(n.xp6(18),n.Q6J("ngForOf",n.DdM(4,G)),n.xp6(4),n.Q6J("ngForOf",t.locals),n.xp6(1),n.Q6J("ngIf",t.recentsCharged&&!(null!=t.locals&&t.locals.length)),n.xp6(1),n.Q6J("ngIf",!t.locals&&!t.recentsCharged))},dependencies:[g.sg,g.O5,b.O,A.wG,C],styles:[".container-box-landing[_ngcontent-%COMP%]{width:100%;overflow:hidden;box-shadow:0 2px 20px -3px #4a4a4a;background:#ffffff;position:relative;margin-bottom:15px;border-radius:15px;padding:15px 0 15px 15px}.container-box-landing[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]{position:absolute;border-radius:50%;background:#4338ca}.container-box-landing[_ngcontent-%COMP%]   .circle-1[_ngcontent-%COMP%]{top:50%;width:82px;transform:translateY(-50%);height:88px;right:-27px}.container-box-landing[_ngcontent-%COMP%]   .circle-2[_ngcontent-%COMP%]{width:40px;height:40px;bottom:-17px;left:-10px}.box-landing[_ngcontent-%COMP%]{width:100%;height:auto;display:flex;text-align:center;justify-content:space-between}.box-landing[_ngcontent-%COMP%]   .icon-like[_ngcontent-%COMP%]{width:50px;color:#d7d7d7;z-index:99;display:grid;place-items:center}.box-landing[_ngcontent-%COMP%]   .icon-like[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:22px}.logo-box-landing[_ngcontent-%COMP%]{object-fit:contain;width:50px}@media (min-width: 420px){.logo-box-landing[_ngcontent-%COMP%]{display:initial}}.container-text-landing[_ngcontent-%COMP%]{display:grid;place-items:center}.container-text-landing[_ngcontent-%COMP%]   .text-landing[_ngcontent-%COMP%]{font-size:12px;font-weight:400}@media (min-width: 576px){.container-text-landing[_ngcontent-%COMP%]   .text-landing.mobile[_ngcontent-%COMP%]{display:none}}.container-text-landing[_ngcontent-%COMP%]   .text-landing.desktop[_ngcontent-%COMP%]{display:none}@media (min-width: 576px){.container-text-landing[_ngcontent-%COMP%]   .text-landing.desktop[_ngcontent-%COMP%]{display:initial}}.container-text-landing[_ngcontent-%COMP%]   .first-text[_ngcontent-%COMP%]{font-weight:700;font-size:14px}.container-recents[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;gap:10px;padding:10px 0}.skeleton[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}.input-style[_ngcontent-%COMP%]{padding:10px;border:2px solid #ccc;border-radius:5px;font-size:16px;color:#555;outline:none}.input-style[_ngcontent-%COMP%]:focus{border-color:#007bff;box-shadow:0 0 0 .2rem #007bff40}"]});var J=o(2424),B=o(8568);function R(i,e){if(1&i&&(n.TgZ(0,"li",29),n._uU(1),n.qZA()),2&i){const t=e.$implicit;n.xp6(1),n.Oqu(t)}}const H=function(){return["Preguntas frecuentes","Politica de cookies","Notificar un problema"]};function K(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"div",11)(1,"div",12)(2,"div",13)(3,"button",14),n.NdJ("click",function(){n.CHM(t);const a=n.oxw();return n.KtG(a.menuLanding=!1)}),n._UZ(4,"i",15),n.qZA()(),n.TgZ(5,"div",16)(6,"div",17)(7,"header")(8,"div",18),n._UZ(9,"img",19),n.qZA(),n.TgZ(10,"h1",20),n._uU(11,"Gracias por su visita"),n.qZA()(),n.TgZ(12,"ul",21),n.YNc(13,R,2,1,"li",22),n.qZA()(),n.TgZ(14,"div",23)(15,"h2",24),n._uU(16,"Quiero una tienda deli para mi comercio"),n.qZA(),n.TgZ(17,"div",25)(18,"a",26),n._uU(19," Comenzar ahora "),n.qZA()()(),n.TgZ(20,"div",27)(21,"a",28),n._uU(22," Acceso clientes "),n.qZA()()()()()}2&i&&(n.Q6J("@enterRight",void 0),n.xp6(13),n.Q6J("ngForOf",n.DdM(2,H)))}function W(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"div",30),n.NdJ("click",function(){n.CHM(t);const a=n.oxw();return n.KtG(a.menuLanding=!1)}),n.qZA()}2&i&&n.Q6J("@fadeIn",void 0)}class x{constructor(e){this.layout=e,this.menuLanding=!1}}function X(i,e){1&i&&n._UZ(0,"app-header-landing")}function q(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"app-banner",12),n.NdJ("emitBanner",function(a){n.CHM(t);const l=n.oxw(2);return n.KtG(l.updateCurrentBanner(a))}),n.qZA()}if(2&i){const t=n.oxw(2);n.Q6J("banner",t.model[0])}}function V(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"app-banner",12),n.NdJ("emitBanner",function(a){n.CHM(t);const l=n.oxw(2);return n.KtG(l.updateCurrentBanner(a))}),n.qZA()}if(2&i){const t=n.oxw(2);n.Q6J("banner",t.model[1])}}function $(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"app-banner",12),n.NdJ("emitBanner",function(a){n.CHM(t);const l=n.oxw(2);return n.KtG(l.updateCurrentBanner(a))}),n.qZA()}if(2&i){const t=n.oxw(2);n.Q6J("banner",t.model[2])}}function nn(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"app-banner",12),n.NdJ("emitBanner",function(a){n.CHM(t);const l=n.oxw(2);return n.KtG(l.updateCurrentBanner(a))}),n.qZA()}if(2&i){const t=n.oxw(2);n.Q6J("banner",t.model[3])}}function tn(i,e){if(1&i){const t=n.EpF();n.TgZ(0,"div",13),n.NdJ("click",function(){const l=n.CHM(t).$implicit,L=n.oxw(2);return n.KtG(L.updateCurrentBanner(l))}),n.qZA()}if(2&i){const t=e.$implicit,c=n.oxw(2);n.ekj("dot-active",c.currentBanner===t)}}x.\u0275fac=function(e){return new(e||x)(n.Y36(B.P))},x.\u0275cmp=n.Xpm({type:x,selectors:[["app-header-landing"]],decls:11,vars:2,consts:[[1,"header-landing","bg-white","shadow-4","mb-3"],[1,"container","d-flex","justify-content-between"],[1,"menu-icon"],[1,"cursor-pointer",3,"click"],[1,"container-bars"],[1,"bar-1","bar"],[1,"bar-2","bar"],[1,"bar-3","bar"],["src","./assets/logos/logo-de.png","width","50px","alt","",1,"logo-landing"],["class","overflow-auto pt-4 z-2 w-8 md:w-20rem h-full bg-white menu-landing fixed top-0 left-0",4,"ngIf"],["class","overlay fadein fixed z-1 top-0 left-0 w-full h-full bg-black-alpha-30",3,"click",4,"ngIf"],[1,"overflow-auto","pt-4","z-2","w-8","md:w-20rem","h-full","bg-white","menu-landing","fixed","top-0","left-0"],[1,"relative","p-3","h-full"],[1,"absolute","button-close"],[1,"cursor-pointer","font-bold","hover:text-red-300",3,"click"],[1,"pi","pi-times","text-3xl"],[1,"h-full","flex","flex-column","justify-content-between"],[1,""],[1,"w-5"],["loading","lazy","src","./assets/logos/logo-de.png","alt","",1,"h-full","w-full","object-contain"],[1,"text-900"],[1,"mt-4"],["class","p-2 text-base cursor-pointer hover:text-primary-400 transition-duration-200",4,"ngFor","ngForOf"],[1,"banner","mt-4","w-full","p-3","bg-bluegray-600","border-round-xl","shadow-2"],[1,"text-white","mb-3"],[1,"w-full","flex","justify-content-end"],["routerLink","login/register","mat-ripple","",1,"p-2","px-3","border-round","bg-white","hover:text-primary","transition-duration-200"],[1,"mt-2","w-full"],["mat-ripple","","routerLink","/admin",1,"w-full","block","text-center","p-2","px-3","bg-primary","border-round","shadow-2"],[1,"p-2","text-base","cursor-pointer","hover:text-primary-400","transition-duration-200"],[1,"overlay","fadein","fixed","z-1","top-0","left-0","w-full","h-full","bg-black-alpha-30",3,"click"]],template:function(e,t){1&e&&(n.TgZ(0,"header",0)(1,"div",1)(2,"div",2)(3,"button",3),n.NdJ("click",function(){return t.menuLanding=!0}),n.TgZ(4,"div",4),n._UZ(5,"div",5)(6,"div",6)(7,"div",7),n.qZA()()(),n._UZ(8,"img",8),n.qZA()(),n.YNc(9,K,23,3,"div",9),n.YNc(10,W,1,1,"div",10)),2&e&&(n.xp6(9),n.Q6J("ngIf",t.menuLanding),n.xp6(1),n.Q6J("ngIf",t.menuLanding))},dependencies:[s.rH,g.sg,g.O5,A.wG],styles:[".header-landing[_ngcontent-%COMP%]{padding:9px 20px}.header-landing[_ngcontent-%COMP%]   .logo-landing[_ngcontent-%COMP%]{width:50px}.button-close[_ngcontent-%COMP%]{top:-6px;right:25px}.container-bars[_ngcontent-%COMP%]{width:25px;display:flex;flex-direction:column;row-gap:4px}.container-bars[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{background:rgba(0,0,0,.8784313725);transition:transform .5s;width:100%;height:4px;border-radius:10px}.menu-icon[_ngcontent-%COMP%]{display:grid;place-items:center}"],data:{animation:[_.J,J.rU]}});const en=function(){return[1,2,3,4]};function on(i,e){if(1&i&&(n.TgZ(0,"div",5),n._UZ(1,"img",6),n.TgZ(2,"div",7)(3,"div",8),n.YNc(4,q,1,1,"app-banner",9),n.YNc(5,V,1,1,"app-banner",9),n.YNc(6,$,1,1,"app-banner",9),n.YNc(7,nn,1,1,"app-banner",9),n.qZA()(),n.TgZ(8,"div",10),n.YNc(9,tn,1,2,"div",11),n.qZA()()),2&i){const t=n.oxw();n.xp6(3),n.Q6J("ngSwitch",t.currentBanner),n.xp6(1),n.Q6J("ngSwitchCase",1),n.xp6(1),n.Q6J("ngSwitchCase",2),n.xp6(1),n.Q6J("ngSwitchCase",3),n.xp6(1),n.Q6J("ngSwitchCase",4),n.xp6(2),n.Q6J("ngForOf",n.DdM(6,en))}}function an(i,e){1&i&&(n.TgZ(0,"div",14),n._UZ(1,"app-recents"),n.qZA())}class m{constructor(e,t,c,a){this.pwa=e,this.themeService=t,this.layoutState=c,this.routeService=a,this.currentBanner=1,this.model=[{id:1,image:"assets/images/Order food.gif",text:"\xa1Deli, la manera m\xe1s r\xe1pida y f\xe1cil para tus antojos! \xa1Pide ahora y disfruta de la mejor comida en la comodidad de tu hogar!",callToAction:"Instalar",callToNext:"Comenzar",action:()=>this.pwa.promptInstall(),next:2},{id:2,image:"assets/images/2.gif",text:"\xa1Descubre la mejor comida en tu \xe1rea con la aplicaci\xf3n de Deli! Simplemente ingresa la URL proporcionada por tu restaurante favorito y obt\xe9n acceso a su selecci\xf3n de comida.",callToAction:null,callToNext:"Continuar",action:null,next:3},{id:3,text:"Compra lo que necesitas de manera r\xe1pida. Agrega tus productos al carrito de compras y procede al checkout para completar los datos de tu pedido.",image:"assets/images/3.gif",callToNext:"Siguiente",callToAction:null,action:null,next:4},{id:4,image:"assets/images/4.gif",text:"Una vez que hayas realizado el checkout, la aplicaci\xf3n te redireccionar\xe1 autom\xe1ticamente a WhatsApp con un mensaje generado que incluir\xe1 los detalles de tu pedido.",background:"",callToNext:null,callToAction:"Finalizar",action:{finish:!0},next:0}],this.currentBanner=localStorage.getItem("landing-banner")?0:1,this.layoutState.state.header=!1,this.layoutState.state.navigation=!1,this.layoutState.updateState()}ngOnInit(){this.routeService.setCurrent("landing")}updateCurrentBanner(e){console.log(e),this.currentBanner=e}}m.\u0275fac=function(e){return new(e||m)(n.Y36(y.I),n.Y36(j.O),n.Y36(N.m),n.Y36(f.N))},m.\u0275cmp=n.Xpm({type:m,selectors:[["app-main-landing"]],decls:5,vars:3,consts:[[1,""],[1,"content"],[4,"ngIf"],["class","banner",4,"ngIf"],["class","landing container","id","landing",4,"ngIf"],[1,"banner"],["src","./assets/logos/logo-de.png","alt","",1,"logo-landing"],[1,"container-banners"],[1,"banner-landing",3,"ngSwitch"],[3,"banner","emitBanner",4,"ngSwitchCase"],[1,"dots"],["class","dot",3,"dot-active","click",4,"ngFor","ngForOf"],[3,"banner","emitBanner"],[1,"dot",3,"click"],["id","landing",1,"landing","container"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0)(1,"div",1),n.YNc(2,X,1,0,"app-header-landing",2),n.YNc(3,on,10,7,"div",3),n.YNc(4,an,2,0,"div",4),n.qZA()()),2&e&&(n.xp6(2),n.Q6J("ngIf",!t.currentBanner),n.xp6(1),n.Q6J("ngIf",t.currentBanner),n.xp6(1),n.Q6J("ngIf",!t.currentBanner))},dependencies:[g.sg,g.O5,g.RF,g.n9,M,I,x],styles:[".content[_ngcontent-%COMP%]{padding:0;position:relative}.landing[_ngcontent-%COMP%]{padding:0 12px}.logo-landing[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;width:60px}.dots[_ngcontent-%COMP%]{position:absolute;bottom:50px;left:50%;transform:translate(-50%);display:flex;align-items:center;gap:7px}.dots[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:5px;background:#373737}.dots[_ngcontent-%COMP%]   .dot.dot-active[_ngcontent-%COMP%]{background:#5551ff}"],data:{animation:[_.J]}});const cn=[{path:"",component:m}];class r{}r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=n.oAB({type:r}),r.\u0275inj=n.cJS({imports:[s.Bz.forChild(cn),s.Bz]});class d{}d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=n.oAB({type:d}),d.\u0275inj=n.cJS({imports:[s.Bz,g.ez,r,b.m,A.si,u.Is]})}}]);
//# sourceMappingURL=src_app_landing_landing_module_ts.b84951f5a84da93b.js.map