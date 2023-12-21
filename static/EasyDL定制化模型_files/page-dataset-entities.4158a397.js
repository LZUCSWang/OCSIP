(window["webpackJsonpdataset"] = window["webpackJsonpdataset"] || []).push([
  ["page-dataset-entities"],
  {
    "17e8": function (t, e, a) {
      "use strict";
      var n = a("544d"),
        r = a.n(n);
      r.a;
    },
    "544d": function (t, e, a) {
      var n = a("95d1");
      "string" === typeof n && (n = [[t.i, n, ""]]),
        n.locals && (t.exports = n.locals);
      var r = a("499e").default;
      r("3bef5768", n, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "5f25": function (t, e, a) {
      "use strict";
      a.r(e);
      var n = function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a(
            "div",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: t.state.loading,
                  expression: "state.loading",
                },
              ],
              staticClass: "page-dataset-entities",
            },
            [
              a(
                "Portal",
                { attrs: { to: "title-append" } },
                [
                  a(
                    "eg-tooltip",
                    {
                      staticClass: "title-tip",
                      attrs: { effect: "light", placement: "right" },
                    },
                    [
                      a("SignQuestion"),
                      a(
                        "div",
                        {
                          staticClass: "tip-content",
                          attrs: { slot: "content" },
                          slot: "content",
                        },
                        [
                          a("div", { staticClass: "content-item" }, [
                            a("span", { staticClass: "tip-label" }, [
                              t._v("标注类型："),
                            ]),
                            t._v(" " + t._s(t.datasetTip.pt)),
                          ]),
                          a("div", { staticClass: "content-item" }, [
                            a("span", { staticClass: "tip-label" }, [
                              t._v("标注模版："),
                            ]),
                            t._v(" " + t._s(t.datasetTip.tt)),
                          ]),
                        ]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              t.state.tips
                ? a(
                    "the-alert",
                    { staticClass: "entities-tips", attrs: { type: "warn" } },
                    [t._v(t._s(t.state.tips))]
                  )
                : t._e(),
              t.state.loading
                ? t._e()
                : a(t.entitiesComponent, {
                    tag: "component",
                    attrs: { readOnly: t.state.readOnly },
                  }),
            ],
            1
          );
        },
        r = [],
        s = (a("45fc"), a("d3b7"), a("3ca3"), a("ddb0"), a("3835")),
        i = (a("96cf"), a("1da1")),
        o = a("8165"),
        c = a("08ba"),
        u = a("b74e"),
        p = a("f619"),
        d = a("81fe"),
        l = a("b70b"),
        f = a("488f"),
        b = a("7de8"),
        v = a("f24d"),
        m = a("3c9e"),
        O = a("69e5"),
        I = a("664a"),
        y = a("81a0"),
        h = a("ebd7"),
        g = a("2841"),
        j = a("fb4d");
      function T() {
        return w.apply(this, arguments);
      }
      function w() {
        return (
          (w = Object(i["a"])(
            regeneratorRuntime.mark(function t() {
              var e, a, n, r;
              return regeneratorRuntime.wrap(function (t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((e = Object(c["useService"])()),
                        (a = e.datasetService),
                        (n = g["utils"].useVM()),
                        (r = +n.$route.params.datasetId),
                        !g["env"].isLite)
                      ) {
                        t.next = 5;
                        break;
                      }
                      return t.abrupt(
                        "return",
                        a.handleDatasetOrSharePageChange({ id: r })
                      );
                    case 5:
                      return t.abrupt(
                        "return",
                        Promise.all([
                          a
                            .fetchDatasetInfoPro({ datasetId: r })
                            .then(function (t) {
                              return (
                                (a.state.infoReady = !0),
                                (a.state.datasetInfo = t),
                                t
                              );
                            }),
                        ])
                      );
                    case 6:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          w.apply(this, arguments)
        );
      }
      function E() {
        var t = g["utils"].useVM(),
          e = Object(o["reactive"])({
            datasetInfo: void 0,
            datasetShareInfo: void 0,
          });
        return (
          Object(i["a"])(
            regeneratorRuntime.mark(function a() {
              var n, r, i, o, c, p, l;
              return regeneratorRuntime.wrap(function (a) {
                while (1)
                  switch ((a.prev = a.next)) {
                    case 0:
                      return (a.next = 2), Object(u["f"])(T());
                    case 2:
                      if (
                        ((n = a.sent),
                        (r = Object(s["a"])(n, 2)),
                        (i = r[0]),
                        (o = r[1]),
                        !i)
                      ) {
                        a.next = 9;
                        break;
                      }
                      return (
                        t.$router.push({
                          path: Object(d["f"])("/dataset/list", t),
                        }),
                        a.abrupt("return")
                      );
                    case 9:
                      (c = Object(s["a"])(o, 2)),
                        (p = c[0]),
                        (l = c[1]),
                        (e.datasetInfo = p),
                        (e.datasetShareInfo = l);
                    case 12:
                    case "end":
                      return a.stop();
                  }
              }, a);
            })
          )(),
          e
        );
      }
      function S(t, e) {
        return x.apply(this, arguments);
      }
      function x() {
        return (
          (x = Object(i["a"])(
            regeneratorRuntime.mark(function t(e, a) {
              var n, r, s, i, o, u, d, l, f, b;
              return regeneratorRuntime.wrap(function (t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((n = Object(c["useService"])()),
                        (r = n.datasetService),
                        (s = n.labelService),
                        (i = a.state.datasetInfo),
                        (o = i.dataType),
                        (u = i.versionInfo),
                        (d = u.datasetId),
                        (l = u.importStatus),
                        (f = u.importErrorInfo),
                        (b = u.projectType),
                        ![
                          p["EDatasetImportStatus"].IMPORT_FAILED,
                          p["EDatasetImportStatus"].IMPORT_WRONG,
                        ].some(function (t) {
                          return t === l;
                        }))
                      ) {
                        t.next = 6;
                        break;
                      }
                      return t.abrupt("return", {
                        result: !1,
                        message: Object(O["a"])(b, f, { unHtml: !0 }),
                      });
                    case 6:
                      if (l !== p["EDatasetImportStatus"].IMPORT_CONFIRM) {
                        t.next = 12;
                        break;
                      }
                      return (
                        (t.next = 9),
                        Object(m["a"])(f, r.state.datasetInfo.versionInfo)
                      );
                    case 9:
                      return (
                        (t.next = 11), r.updateDatasetInfo({ datasetId: d })
                      );
                    case 11:
                      return t.abrupt("return", { result: !1 });
                    case 12:
                      return (
                        o === p["EDataType"].IMAGE
                          ? e.fetchLabelList()
                          : s.updateLabelList({ datasetId: d }, !0),
                        a.fetchTabEntityCount(),
                        t.abrupt("return", { result: !0 })
                      );
                    case 15:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          x.apply(this, arguments)
        );
      }
      var C = Object(o["defineComponent"])({
          components: {
            SignQuestion: j["a"],
            EntitiesImage: b["b"],
            EntitiesCommon: b["a"],
          },
          setup: function () {
            var t,
              e = Object(f["useStore"])(),
              a = Object(v["useToast"])(),
              n = a.succeed,
              r = a.warn,
              s = Object(b["e"])(),
              O = Object(I["e"])(),
              j = Object(c["useService"])(),
              T = j.datasetService;
            T.reset();
            var w = E(),
              x = Object(d["c"])(),
              C = x.currentComponent,
              R = x.updateComponent,
              D = Object(m["b"])(
                null === (t = w.datasetInfo) || void 0 === t
                  ? void 0
                  : t.versionInfo.datasetId
              ),
              P = Object(o["reactive"])({
                loading: !0,
                readOnly: !1,
                polling: !1,
                tips: "",
              }),
              k = Object(o["computed"])(function () {
                if (!w.datasetInfo) return {};
                var t = w.datasetInfo,
                  e = t.dataType,
                  a = t.versionInfo,
                  n = a.templateType,
                  r = a.projectType;
                return {
                  pt:
                    p["EDataType"].getLabelById(e) +
                    " > " +
                    p["EProjectType"].getLabelById(r),
                  tt: p["ETemplateType"].getLabelById(n),
                };
              });
            Object(o["watch"])(
              function () {
                return w.datasetInfo;
              },
              (function () {
                var t = Object(i["a"])(
                  regeneratorRuntime.mark(function t(a) {
                    var n, i, o;
                    return regeneratorRuntime.wrap(function (t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (a) {
                              t.next = 2;
                              break;
                            }
                            return t.abrupt("return");
                          case 2:
                            return (
                              (s.state.datasetInfo = a),
                              R(a),
                              (n = a.isPublic),
                              (i = a.versionInfo.datasetId),
                              (t.next = 8),
                              Object(y["a"])(a)
                            );
                          case 8:
                            (o = t.sent),
                              (P.readOnly = o.readOnly),
                              (P.tips = o.tips),
                              (P.loading = !1),
                              (function () {
                                var t = Object(u["h"])({
                                  dataType: a.dataType,
                                  projectType: a.versionInfo.projectType,
                                  templateType: a.versionInfo.templateType,
                                });
                                if (t) {
                                  var e = t.dataType,
                                    n = t.projectType,
                                    s = t.templateType;
                                  (a.dataType = e),
                                    (a.versionInfo.projectType = n),
                                    (a.versionInfo.templateType = s);
                                } else
                                  r("请先选择标注类型和模板类型，再查看数据");
                              })(),
                              g["env"].isLite &&
                                e &&
                                e.commit("datasets/setPublic", {
                                  datasetId: i,
                                  isPublic: n,
                                });
                          case 14:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()
            ),
              Object(o["watch"])(
                function () {
                  return T.state.datasetInfo;
                },
                function (t) {
                  if (t) {
                    var e = t.versionInfo.importStatus;
                    if (t.dataType === p["EDataType"].IMAGE) {
                      var a;
                      if (
                        e === p["EDatasetImportStatus"].IMPORTING &&
                        !P.polling
                      )
                        (P.polling = !0),
                          n("文件导入中，请稍候！"),
                          null === D ||
                            void 0 === D ||
                            null === (a = D.run()) ||
                            void 0 === a ||
                            a.then(
                              (function () {
                                var t = Object(i["a"])(
                                  regeneratorRuntime.mark(function t(e) {
                                    var a;
                                    return regeneratorRuntime.wrap(function (
                                      t
                                    ) {
                                      while (1)
                                        switch ((t.prev = t.next)) {
                                          case 0:
                                            if (e) {
                                              t.next = 3;
                                              break;
                                            }
                                            return (
                                              (P.polling = !1),
                                              t.abrupt("return")
                                            );
                                          case 3:
                                            return (t.next = 5), S(O, s);
                                          case 5:
                                            (a = t.sent),
                                              a.result
                                                ? n(
                                                    "导入完成，请刷新页面查看！"
                                                  )
                                                : a.message && r(a.message),
                                              (P.polling = !1);
                                          case 8:
                                          case "end":
                                            return t.stop();
                                        }
                                    },
                                    t);
                                  })
                                );
                                return function (e) {
                                  return t.apply(this, arguments);
                                };
                              })()
                            );
                      Object(h["a"])(t.versionInfo).then(function (t) {
                        b["c"].value = t;
                      });
                    }
                  }
                },
                { deep: !0 }
              );
            var L = Object(b["d"])(
              Object(o["computed"])(function () {
                return w.datasetInfo;
              })
            );
            return (
              Object(l["a"])(function () {
                return L.value;
              }),
              Object(o["onUnmounted"])(function () {
                D.destroy();
              }),
              {
                breadcrumbList: L,
                state: P,
                datasetTip: k,
                entitiesComponent: C,
                info: w,
              }
            );
          },
        }),
        R = C,
        D = (a("17e8"), a("2877")),
        P = Object(D["a"])(R, n, r, !1, null, "40858c7d", null);
      e["default"] = P.exports;
    },
    "81a0": function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return c;
      });
      a("45fc"), a("96cf");
      var n = a("1da1"),
        r = a("f619"),
        s = a("13a5"),
        i = a("2841"),
        o = a("6a47"),
        c = (function () {
          var t = Object(n["a"])(
            regeneratorRuntime.mark(function t(e) {
              var a, n, c, u, p, d, l, f;
              return regeneratorRuntime.wrap(function (t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (t.next = 2), Object(o["a"])();
                    case 2:
                      return (
                        (a = t.sent),
                        (n = e.isPublic),
                        (c = e.versionInfo),
                        (u = c.isEnhancing),
                        (p = c.hasEtl),
                        (d = c.etlStatus),
                        (l = c.isAdversarial),
                        (f = { readOnly: !1, tips: "" }),
                        n &&
                          ((f.readOnly = !0),
                          (f.tips = "公开数据集暂不支持编辑、删除和导入。")),
                        !i["env"].isCloud &&
                          [
                            r["EDatasetPublishToBmlStatus"].PUBLISHING,
                            r["EDatasetPublishToBmlStatus"].DONE,
                          ].some(function (t) {
                            return t === e.versionInfo.publishToBmlStatus;
                          }) &&
                          ((f.readOnly = !0),
                          (f.tips = "已发布数据集不支持任何编辑操作。")),
                        [r["EDatasetShareVisibility"].OPENSOURCE].some(
                          function (t) {
                            return t === e.versionInfo.visibility;
                          }
                        ) &&
                          ((f.readOnly = !0),
                          (f.tips = "公开数据集不支持任何编辑操作。")),
                        !i["env"].isCloud &&
                          [
                            r["EDatasetShareVisibility"].ORGANIZATION,
                            r["EDatasetShareVisibility"].GLOBAL,
                          ].some(function (t) {
                            return t === e.versionInfo.visibility;
                          }) &&
                          ((f.readOnly = !0),
                          (f.tips = "共享数据集不支持任何编辑操作。")),
                        Object(s["b"])(e.versionInfo, a) &&
                          ((f.readOnly = !0),
                          (f.tips = "数据集多人标注中不支持任何编辑操作。")),
                        u &&
                          ((f.readOnly = !0),
                          (f.tips = "数据集增强中不支持任何编辑操作。")),
                        p &&
                          d === r["EDatasetEtlStatus"].CLEANING &&
                          ((f.readOnly = !0),
                          (f.tips = "数据集清洗中不支持任何编辑操作。")),
                        l &&
                          ((f.readOnly = !0),
                          (f.tips = "数据集生成中不支持任何编辑操作。")),
                        t.abrupt("return", f)
                      );
                    case 15:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })();
    },
    "95d1": function (t, e, a) {
      var n = a("24fb");
      (e = n(!1)),
        e.push([
          t.i,
          ".page-dataset-entities .entities-tips[data-v-40858c7d]{margin:0 0 10px}.title-tip[data-v-40858c7d]{display:flex;align-items:center;color:#84868c;font-size:14px}.tip-content[data-v-40858c7d]{padding:12px}.tip-content .content-item[data-v-40858c7d]{line-height:20px}.tip-content .tip-label[data-v-40858c7d]{color:#84868c}",
          "",
        ]),
        (t.exports = e);
    },
    b70b: function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return s;
      });
      var n = a("8165"),
        r = function (t, e) {
          var a = new CustomEvent("afe:notifyRootApp", {
            detail: { key: t, payload: e },
          });
          window.dispatchEvent(a);
        };
      function s(t, e) {
        var a = null == e ? "" : t,
          s = e || t,
          i = Object(n["computed"])(s);
        Object(n["watch"])(
          i,
          function (t) {
            r("breadcrumb", { category: a, items: t });
          },
          { immediate: !0 }
        );
      }
    },
  },
]);
//# sourceMappingURL=page-dataset-entities.4158a397.js.map
