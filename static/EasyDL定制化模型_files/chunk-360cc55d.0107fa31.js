(window["webpackJsonpannotate"] = window["webpackJsonpannotate"] || []).push([
  ["chunk-360cc55d"],
  {
    "0110": function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return U;
      }),
        n.d(e, "a", function () {
          return m;
        });
      var i = n("2d45");
      const r = 255,
        a = (t, e) => (n, i, a) => {
          const o = t[n];
          if (!o || !o[i]) return;
          const s = e[o[i]];
          return s ? `rgb(${s}, ${a || 0}, ${r - s})` : void 0;
        },
        o = (t) => ({
          background: t,
          border: { width: 0, color: t },
          font: { size: 0, color: "#fff", lineHeight: 1.5, background: "" },
        });
      var s = n("c7b3"),
        c = function (t, e, n, i) {
          function r(t) {
            return t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                });
          }
          return new (n || (n = Promise))(function (n, a) {
            function o(t) {
              try {
                c(i.next(t));
              } catch (e) {
                a(e);
              }
            }
            function s(t) {
              try {
                c(i["throw"](t));
              } catch (e) {
                a(e);
              }
            }
            function c(t) {
              t.done ? n(t.value) : r(t.value).then(o, s);
            }
            c((i = i.apply(t, e || [])).next());
          });
        };
      const l = (t) => ({ x: Math.floor(t.x), y: Math.floor(t.y) }),
        d = (t) => Math.round(t);
      function h(t, e, n) {
        if ("base" === t.mode) {
          const { x1: r, y1: a, x2: o, y2: l } = t.bbox,
            d = Math.floor(o - r + 1),
            h = Math.floor(l - a + 1),
            u = Object(s["a"])({ width: d, height: h, bitmap: t.bitmap }, n);
          if (!u) return;
          return i["a"](u, (t) =>
            c(this, void 0, void 0, function* () {
              const n = yield t;
              return n && e.drawImage(n, r, a), n;
            })
          );
        }
        return i["h"](() => {
          (e.globalCompositeOperation =
            "del" === t.mode ? "destination-out" : "source-over"),
            (e.imageSmoothingEnabled = !1),
            Object(s["b"])(
              e,
              { points: t.points.map(l), radius: d(t.radius) },
              n
            ),
            (e.globalCompositeOperation = "source-over");
        });
      }
      function u(t, e, n) {
        const { width: i, height: r } = t.canvas;
        return Object(s["i"])(
          t,
          { collection: e.actions, width: i, height: r, processOne: h },
          n
        );
      }
      function f(t, e, n, i) {
        switch (e) {
          case "circle": {
            const e = n;
            return Object(s["c"])(
              t,
              { radius: d(e.radius), center: l(e.center) },
              i
            );
          }
          case "polygon": {
            const e = n;
            return Object(s["g"])(t, { points: e.points.map(l) }, i);
          }
          case "line": {
            const e = n;
            return Object(s["f"])(
              t,
              { points: e.points.map(l), width: d(e.width || 2) },
              i
            );
          }
          case "brush":
            return u(t, n, i);
        }
      }
      function p(t, e) {
        const n = () =>
            new Promise((n) => {
              const { width: i, height: r } = t.canvas;
              console.time("checkEmptyBrush" + e.alias),
                u(t, e, o("rgba(255,255,255, 0)")).result.then((t) => {
                  const a = t.toDataURL(),
                    o = document.createElement("canvas");
                  (o.width = i), (o.height = r);
                  const s = a === o.toDataURL();
                  console.timeEnd("checkEmptyBrush" + e.alias),
                    n(s ? e.alias : "");
                });
            }),
          r = () => {};
        return i["b"](n, r);
      }
      const b = { brush: 1 };
      class g {
        constructor() {
          (this.dom = document.createElement("canvas")),
            (this.ctx = this.dom.getContext("2d", {
              willReadFrequently: !0,
              alpha: !1,
            })),
            (this.ctx.imageSmoothingEnabled = !1);
        }
        prepare(t) {
          const { width: e, height: n } = t;
          (this.dom.width = e),
            (this.dom.height = n),
            this.ctx.clearRect(0, 0, e, n);
        }
        assemble(t) {
          const { width: e, height: n } = t,
            i = this.ctx.getImageData(0, 0, e, n).data,
            a = [new Uint8Array(e * n), new Uint8Array(e * n)];
          for (let o = 0; o < e * n; o++) {
            const t = o << 2,
              e = i[t];
            if (!e) continue;
            const n = i[t] | i[t + 2];
            if (n !== r) continue;
            const s = i[t + 1];
            a[s] && (a[s][o] = e), (a[0][o] = e);
          }
          return a;
        }
      }
      class v {
        constructor() {
          (this.runningTask = i["g"]()), (this.canvas = new g());
        }
        serialize(t, e, n, r) {
          return (
            this.runningTask.cancel(),
            this.canvas.prepare(t),
            (this.runningTask = this.paintShapes(e, n, r)),
            i["e"](this.runningTask, (e) => {
              const { all: n, brush: i } = this.assemble(t);
              return (
                console.log(e),
                { all: n, brush: i, empty: (e || []).filter((t) => !!t) }
              );
            })
          );
        }
        paintShapes(t, e, n) {
          const r = a(e, n),
            s = [],
            c = Object.keys(t);
          for (const i of c) {
            const e = t[i],
              n = this.canvas.ctx,
              a = b[i];
            for (const t of e) {
              const e = r(i, t.alias, a);
              if (!e) {
                if ("brush" === i) {
                  const e = p(n, t);
                  e && s.push(e);
                }
                continue;
              }
              const c = f(n, i, t, o(e));
              c && s.push(c);
            }
          }
          return i["f"](s);
        }
        assemble(t) {
          console.time("read-from-image");
          const [e, n] = this.canvas.assemble(t);
          return console.timeEnd("read-from-image"), { all: e, brush: n };
        }
      }
      const m = (t, e, n, i) => {
        const r = new v();
        return r.serialize(t, e, n, i);
      };
      var y = n("9c84"),
        x = n("0ffa");
      const w = (t, e, n) => {
        const { width: i, height: r } = t,
          a = { x1: 0, y1: 0, x2: i - 1, y2: r - 1 },
          o = Object(x["h"])(e.bbox, a);
        return { bbox: o, mask: Object(y["c"])(e, o, t) };
      };
      var _ = n("f882"),
        O = n("0a4d");
      function A(t) {
        let e,
          n,
          i = 0;
        const r = [];
        let a;
        for (let s = 0; s < t.length; s++) {
          (e = t[s]), s > 2 && (e -= t[s - 2]), (a = !0);
          while (a)
            (n = 31 & e),
              (e >>= 5),
              (a = 16 & n ? -1 !== e : 0 !== e),
              a && (n |= 32),
              (n += 48),
              (r[i++] = n);
        }
        const o = r.reduce((t, e) => t + String.fromCharCode(e), "");
        return o;
      }
      function k(t) {
        let e = !1,
          n = 0,
          i = [];
        for (let r = 0; r < t.size; r++)
          t.get(r) === e ? n++ : (i.push(n), (n = 1), (e = !e));
        return i.push(n), i;
      }
      function E(t) {
        return A(k(t));
      }
      const j = (t) => ({ x: Math.round(t.x), y: Math.round(t.y) }),
        I = (t, e) => {
          const { width: n, height: i } = e,
            r = { x1: 0, y1: 0, x2: n - 1, y2: i - 1 };
          return Object(x["h"])(Object(x["e"])(t, r));
        },
        C = (t, e, n) => {
          const i = { center: j(e.center), radius: Math.floor(e.radius) },
            { width: r, height: a } = t,
            o = { x1: 0, y1: 0, x2: r - 1, y2: a - 1 },
            s = Object(x["h"])(Object(x["b"])([i.center], i.radius), o),
            c = new _["a"](r * a);
          for (let l = s.x1; l <= s.x2; l += n.precision)
            for (let t = s.y1; t <= s.y2; t += n.precision) {
              const e = Object(O["a"])(i, { x: l, y: t });
              e && c.set(l * a + t, e);
            }
          return { bbox: s, meta: i, mask: E(c) };
        },
        S = (t, e, n) => {
          const i = Object(O["d"])(e.points, e.width).map(j),
            r = I(i, t),
            { width: a, height: o } = t,
            s = new _["a"](a * o);
          for (let c = r.x1; c <= r.x2; c += n.precision)
            for (let t = r.y1; t <= r.y2; t += n.precision) {
              const e = Object(O["f"])(i, { x: c, y: t });
              e && s.set(c * o + t, e);
            }
          return { bbox: r, meta: { points: e.points.map(j) }, mask: E(s) };
        },
        T = (t, e, n) => {
          const i = e.points.map(j),
            r = I(i, t),
            { width: a, height: o } = t,
            s = new _["a"](a * o);
          for (let c = r.x1; c <= r.x2; c += n.precision)
            for (let t = r.y1; t <= r.y2; t += n.precision) {
              const e = Object(O["f"])(i, { x: c, y: t });
              e && s.set(c * o + t, e);
            }
          return { bbox: r, meta: { points: i }, mask: E(s) };
        },
        M = (t, e) => {
          const n = e.points.map(j),
            i = I(n, t),
            [r, a] = n;
          return { bbox: i, points: n, meta: { topLeft: r, bottomRight: a } };
        },
        R = (t, e) => {
          const n = e.points.map(j),
            i = I(n, t);
          return { bbox: i, meta: { points: n } };
        },
        D = (t, e) => {
          const n = e.points.map(j),
            i = I(n, t);
          return { bbox: i, meta: { points: n } };
        },
        L = (t, e) => {
          const n = [Object.assign({}, j(e.center))],
            i = I(n, t);
          return { bbox: i, meta: { points: n } };
        };
      var N = n("acc5");
      const P = (t, e) => {
          const n = Object(N["a"])(e.faces).map(j),
            i = I(n, t),
            r = { front: e.faces.front.map(j), back: e.faces.back.map(j) };
          return { bbox: i, faces: r };
        },
        z = { precision: 1 },
        B = {
          polygon: T,
          circle: C,
          line: S,
          brush: w,
          rect: M,
          quad: R,
          polyline: D,
          point: L,
          cuboid: P,
        },
        U = (t, e, n, i = z) => {
          const r = B[e];
          if (!r) throw new Error(e + " serializer not implemented");
          return r(t, n, i);
        };
    },
    "0195": function (t, e, n) {
      "use strict";
      var i = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            { staticClass: "floating-txt-new" },
            [t._t("body"), t._t("footer")],
            2
          );
        },
        r = [],
        a = n("2841"),
        o = n("8165"),
        s = Object(o["defineComponent"])({
          setup: function () {
            var t = a["utils"].useVM();
            Object(o["onMounted"])(function () {
              document.body.appendChild(t.$el);
            }),
              Object(o["onBeforeUnmount"])(function () {
                t.$el &&
                  document.body.contains(t.$el) &&
                  document.body.removeChild(t.$el);
              });
          },
        }),
        c = s,
        l = (n("4889"), n("2877")),
        d = Object(l["a"])(c, i, r, !1, null, "c773cee0", null);
      e["a"] = d.exports;
    },
    "0481": function (t, e, n) {
      "use strict";
      var i = n("23e7"),
        r = n("a2bf"),
        a = n("7b0b"),
        o = n("50c4"),
        s = n("a691"),
        c = n("65f0");
      i(
        { target: "Array", proto: !0 },
        {
          flat: function () {
            var t = arguments.length ? arguments[0] : void 0,
              e = a(this),
              n = o(e.length),
              i = c(e, 0);
            return (i.length = r(i, e, e, n, 0, void 0 === t ? 1 : s(t))), i;
          },
        }
      );
    },
    "07ac": function (t, e, n) {
      var i = n("23e7"),
        r = n("6f53").values;
      i(
        { target: "Object", stat: !0 },
        {
          values: function (t) {
            return r(t);
          },
        }
      );
    },
    "0a4d": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      }),
        n.d(e, "f", function () {
          return o;
        }),
        n.d(e, "d", function () {
          return s;
        }),
        n.d(e, "c", function () {
          return c;
        }),
        n.d(e, "e", function () {
          return l;
        }),
        n.d(e, "i", function () {
          return d;
        }),
        n.d(e, "h", function () {
          return h;
        }),
        n.d(e, "g", function () {
          return u;
        }),
        n.d(e, "b", function () {
          return p;
        });
      var i = n("6166");
      function r(t, e) {
        const n = Object(i["b"])(t.center, e);
        return n <= t.radius;
      }
      function a(t, e) {
        const { x: n, y: i } = e;
        let r = 0;
        for (let a = 0; a < t.length; a++) {
          const e = t[a],
            o = t[(a + 1) % t.length];
          if ((e.y < i && o.y < i) || (e.y >= i && o.y >= i)) continue;
          const s = ((i - e.y) / (o.y - e.y)) * (o.x - e.x) + e.x;
          s >= n && r++;
        }
        return r % 2 === 0;
      }
      function o(t, e) {
        return !a(t, e);
      }
      function s(t, e) {
        const n = [];
        for (let r = 0; r < t.length - 1; r++) {
          const a = t[r],
            o = t[(r + 1) % t.length],
            { x: s, y: c } = a,
            { x: l, y: d } = o,
            h = Object(i["b"])(a, o) || 1,
            u = (e * (d - c)) / h / 2,
            f = (e * (l - s)) / h / 2;
          n.push(
            { x: s + u, y: c - f },
            { x: s - u, y: c + f },
            { x: l - u, y: d + f },
            { x: l + u, y: d - f }
          );
        }
        return n;
      }
      function c(t, e, n) {
        const i = s(t, e);
        return o(i, n);
      }
      function l(t) {
        return t.sort((t, e) => t.x + t.y - (e.x + e.y));
      }
      function d(t) {
        const [{ x: e, y: n }, { x: i, y: r }] = t,
          a = (e + i) / 2,
          o = (n + r) / 2;
        return [
          { x: e, y: n },
          { x: a, y: n },
          { x: i, y: n },
          { x: i, y: o },
          { x: i, y: r },
          { x: a, y: r },
          { x: e, y: r },
          { x: e, y: o },
        ];
      }
      function h(t, e) {
        const n = d(t);
        return o(n, e);
      }
      function u(t, e, n) {
        return t.some((i, r) => {
          if (r >= t.length - 1) return !1;
          const a = s([i, t[r + 1]], e);
          return o(a, n);
        });
      }
      var f = n("acc5");
      function p(t, e) {
        const n = Object(f["a"])(t);
        return o(n, e);
      }
    },
    "0a8e": function (t, e, n) {
      "use strict";
      var i = n("2288"),
        r = n.n(i);
      r.a;
    },
    "0b25": function (t, e, n) {
      var i = n("a691"),
        r = n("50c4");
      t.exports = function (t) {
        if (void 0 === t) return 0;
        var e = i(t),
          n = r(e);
        if (e !== n) throw RangeError("Wrong length or index");
        return n;
      };
    },
    "0d84": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".addon-tip[data-v-6efc3e36]{position:absolute;left:0;bottom:0;width:100%;height:100%}.addon-tip .notify-point[data-v-6efc3e36]{position:absolute;right:-6px;top:-3px;width:6px;height:6px;border-radius:100%;background:#ea0000}.addon-tip[data-v-6efc3e36]  .s-tip{position:absolute;left:0;bottom:0;width:100%;height:0}.addon-tip[data-v-6efc3e36]  .s-tip .s-tip_popper_content{padding:0}.addon-tip[data-v-6efc3e36]  .s-tip .s-tip_popper{z-index:300}.addon-tip .inner-wrap[data-v-6efc3e36]{position:absolute;left:0;bottom:0;width:100%}.addon-tip .popper-wrap[data-v-6efc3e36]{padding:20px 30px}.addon-tip .popper-wrap .tip-title[data-v-6efc3e36]{text-align:center;margin:4px auto 12px;height:20px;line-height:20px;font-size:14px;color:#000;font-weight:700;white-space:nowrap}.addon-tip .popper-wrap .tip-list[data-v-6efc3e36]{text-align:left}.addon-tip .popper-wrap .tip-list .tip-item[data-v-6efc3e36]{position:relative;display:flex;align-items:center;white-space:nowrap}.addon-tip .popper-wrap .tip-list .tip-item+.tip-item[data-v-6efc3e36]{margin-top:8px}.addon-tip .popper-wrap .tip-list .tip-item .tip-point[data-v-6efc3e36]{border-radius:100%;margin-right:8px;width:6px;height:6px;background:var(--cxd-blue)}.addon-tip .popper-wrap .tip-list .tip-item .tip-content[data-v-6efc3e36]{height:22px;line-height:22px;font-size:14px;color:#333}.addon-tip .popper-wrap .btn-wrap[data-v-6efc3e36]{margin-top:16px;text-align:center}.addon-tip .popper-wrap .btn-wrap .btn-ok[data-v-6efc3e36]{height:28px;line-height:26px;font-size:12px}",
          "",
        ]),
        (t.exports = e);
    },
    "0fcc": function (t, e, n) {
      "use strict";
      var i = n("b8d4"),
        r = n.n(i);
      r.a;
    },
    "0ffa": function (t, e, n) {
      "use strict";
      n.d(e, "g", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "b", function () {
          return o;
        }),
        n.d(e, "d", function () {
          return s;
        }),
        n.d(e, "a", function () {
          return c;
        }),
        n.d(e, "k", function () {
          return l;
        }),
        n.d(e, "h", function () {
          return d;
        }),
        n.d(e, "e", function () {
          return h;
        }),
        n.d(e, "f", function () {
          return u;
        }),
        n.d(e, "i", function () {
          return f;
        }),
        n.d(e, "j", function () {
          return p;
        });
      var i = n("2441");
      const r = (t, e) => ({
          x1: Math.min(t.x1, e.x1),
          x2: Math.max(t.x2, e.x2),
          y1: Math.min(t.y1, e.y1),
          y2: Math.max(t.y2, e.y2),
        }),
        a = (t) => {
          const { x1: e, x2: n, y1: i, y2: r } = t;
          return { x: (n - e) / 2 + e, y: (r - i) / 2 + i };
        },
        o = (t, e = 0) => {
          let n = 1 / 0,
            i = 1 / 0,
            r = -1 / 0,
            a = -1 / 0;
          for (const o of t)
            (n = Math.min(o.x - e, n)),
              (i = Math.min(o.y - e, i)),
              (r = Math.max(o.x + e, r)),
              (a = Math.max(o.y + e, a));
          return { x1: n, y1: i, x2: r, y2: a };
        },
        s = (t) => {
          const { x1: e, x2: n, y1: i, y2: r } = t;
          return [
            { x: e, y: i },
            { x: n, y: i },
            { x: n, y: r },
            { x: e, y: r },
          ];
        },
        c = (t, e) => {
          const { x: n, y: i } = e;
          return {
            x1: Math.min(t.x1, n),
            y1: Math.min(t.y1, i),
            x2: Math.max(t.x2, n),
            y2: Math.max(t.y2, i),
          };
        },
        l = (t, e) => ({
          x1: Math.max(t.x1, e.x1),
          y1: Math.max(t.y1, e.y1),
          x2: Math.min(t.x2, e.x2),
          y2: Math.min(t.y2, e.y2),
        }),
        d = (t, e) => {
          const { x1: n, y1: i, x2: r, y2: a } = e ? l(t, e) : t;
          return {
            x1: Math.floor(n),
            y1: Math.floor(i),
            x2: Math.floor(r),
            y2: Math.floor(a),
          };
        },
        h = (t, e) => {
          const n = o(t);
          return e ? l(n, e) : n;
        },
        u = (t, e) => {
          const { x: n, y: i } = e,
            { x1: r, y1: a, x2: o, y2: s } = t;
          return n >= r && n < o && i >= a && i < s;
        },
        f = (t, e) => {
          if (!t.length) return [];
          const n = t.map(({ x: t, y: n }) => [t + e, n + e]),
            i = t.map(({ x: t, y: n }) => [t - e, n - e]);
          return [n.concat(i.reverse())];
        },
        p = (t, e, n) => {
          const r = "del" === n ? i["difference"] : i["union"],
            a =
              r({ regions: t, inverted: !1 }, { regions: e, inverted: !1 }) ||
              {};
          return (null === a || void 0 === a ? void 0 : a.regions) || [];
        };
    },
    1067: function (t, e, n) {
      var i = n("da3b");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("306af80a", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "110c": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      n("99af"), n("a15b"), n("13d5"), n("b64b"), n("ac1f"), n("5319");
      var i = /https?:/,
        r = function (t) {
          return t ? t.replace(i, "") : "";
        };
    },
    1344: function (t, e, n) {
      "use strict";
      e["a"] = function (t) {
        return {
          all: (t = t || new Map()),
          on: function (e, n) {
            var i = t.get(e);
            i ? i.push(n) : t.set(e, [n]);
          },
          off: function (e, n) {
            var i = t.get(e);
            i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : t.set(e, []));
          },
          emit: function (e, n) {
            var i = t.get(e);
            i &&
              i.slice().map(function (t) {
                t(n);
              }),
              (i = t.get("*")) &&
                i.slice().map(function (t) {
                  t(e, n);
                });
          },
        };
      };
    },
    "145e": function (t, e, n) {
      "use strict";
      var i = n("7b0b"),
        r = n("23cb"),
        a = n("50c4"),
        o = Math.min;
      t.exports =
        [].copyWithin ||
        function (t, e) {
          var n = i(this),
            s = a(n.length),
            c = r(t, s),
            l = r(e, s),
            d = arguments.length > 2 ? arguments[2] : void 0,
            h = o((void 0 === d ? s : r(d, s)) - l, s - c),
            u = 1;
          l < c && c < l + h && ((u = -1), (l += h - 1), (c += h - 1));
          while (h-- > 0)
            l in n ? (n[c] = n[l]) : delete n[c], (c += u), (l += u);
          return n;
        };
    },
    "16e8": function (t, e, n) {
      var i = n("bc6c");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("0323c0d0", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "170b": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("50c4"),
        a = n("23cb"),
        o = n("4840"),
        s = i.aTypedArray,
        c = i.exportTypedArrayMethod;
      c("subarray", function (t, e) {
        var n = s(this),
          i = n.length,
          c = a(t, i);
        return new (o(n, n.constructor))(
          n.buffer,
          n.byteOffset + c * n.BYTES_PER_ELEMENT,
          r((void 0 === e ? i : a(e, i)) - c)
        );
      });
    },
    "182d": function (t, e, n) {
      var i = n("f8cd");
      t.exports = function (t, e) {
        var n = i(t);
        if (n % e) throw RangeError("Wrong offset");
        return n;
      };
    },
    1898: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return d;
      });
      var i = n("49d5"),
        r = n("6166"),
        a = n("69af"),
        o = n("5c61"),
        s = n("20fd"),
        c = n("a4c5");
      const l = [
        "click",
        "contextmenu",
        "drag",
        "dragEnd",
        "label",
        "keypress",
      ];
      class d extends s["a"] {
        constructor() {
          super(...arguments),
            (this.ALL_ID = "all"),
            (this.idBase = 1),
            (this.shapes = []),
            (this.nextId = () => `${this.name}-${this.idBase++}`),
            (this.getJobClass = (t) => {
              const e = Array.isArray(t) ? t : [t];
              return [...e.map((t) => `${this.name}/${t}`), this.name, ...e];
            }),
            (this.getVisibleShapes = Object(a["c"])(
              () => [this.getAnnotations(), this.getInvisibleLabelIds()],
              (t, e) =>
                e.length
                  ? t.filter((t) => !e.includes(this.getLabelId(t))).reverse()
                  : t
            )),
            (this.getHoverShape = Object(a["c"])(
              () => [this.getVisibleShapes(), this.hoverId],
              (t, e) => {
                if (e) return t.find((t) => t.id === e);
              }
            )),
            (this.getInvisibleLabelIds = Object(a["c"])(
              () => [this.context.labels],
              (t) => t.reduce((t, e) => (e.visible ? t : t.concat(e.id)), [])
            )),
            (this.getHoverLabelJob = Object(a["c"])(
              () => [
                this.context.config.alwaysShowLabel
                  ? void 0
                  : this.getHoverShape(),
              ],
              (t) => {
                if (!t) return i["a"];
                const e = this.getLabelId(t),
                  n = this.getShapeLabelPosition(t);
                return [Object(c["b"])({ center: n }, { labelId: e })];
              }
            ));
        }
        deactivate() {
          var t, e, n;
          super.deactivate(),
            (this.editingId = void 0),
            null === (t = this.creator) || void 0 === t || t.stop(),
            null === (e = this.mover) || void 0 === e || e.stop(),
            null === (n = this.resizer) || void 0 === n || n.stop();
        }
        getAnnotations() {
          return this.shapes;
        }
        restoreShapes(t) {
          (this.hoverId = void 0),
            (this.editingId = void 0),
            (this.shapes = t.map((t) => {
              const e = this.nextId();
              return Object.assign(
                Object.assign({}, this.restoreSingleShape(t)),
                { alias: t.alias || t.id || e, id: e }
              );
            }));
        }
        activateShape(t) {
          (this.hoverId = void 0), (this.editingId = void 0);
          const e = this.shapes.find((e) => e.alias === t.alias);
          e ? ((this.editingId = e.id), this.activate()) : this.deactivate();
        }
        getRenderJobs() {
          return i["c"];
        }
        respond(t) {
          if (!this.context.config.readonly || !l.includes(t.kind)) {
            switch (t.kind) {
              case "activate-shape":
                return void this.activateShape(t.value);
              case "delete-annotation":
                return void this.deleteAnnotations(t.value);
              case "label": {
                const e = this.getEditingShape();
                if (!e) return;
                const n = e.alias || "";
                return (
                  this.context.events.emit("SET_LABEL", {
                    tool: this,
                    shape: this.name,
                    alias: n,
                    labelId: t.value,
                  }),
                  o["a"].DONE
                );
              }
            }
            if (!this.active) return this.doRespond(t);
            switch (t.kind) {
              case "hold":
                this.handleArrowKeyboard(t);
                break;
              case "press":
                switch (t.value) {
                  case "Backspace":
                  case "Delete":
                    if (!this.editingId) break;
                    return (
                      this.pushHistory(() => {
                        this.shapes = this.shapes.filter(
                          (t) => t.id !== this.getEditingId()
                        );
                      }),
                      o["a"].DONE
                    );
                }
                break;
            }
            return this.doRespond(t);
          }
        }
        handleArrowKeyboard(t) {
          if (!this.context.config.arrowKeyboardEnable) return;
          let e;
          switch (t.value) {
            case "ArrowUp":
              e = { x: 0, y: -1 };
              break;
            case "ArrowDown":
              e = { x: 0, y: 1 };
              break;
            case "ArrowLeft":
              e = { x: -1, y: 0 };
              break;
            case "ArrowRight":
              e = { x: 1, y: 0 };
              break;
          }
          e && this.doArrowKeyboard(e);
        }
        doArrowKeyboard(t) {}
        doRespond(t) {}
        getEditingId() {
          return this.editingId;
        }
        pushHistory(t) {
          const e =
            "function" === typeof t
              ? { redo: t, undo: this.snapshotFactory() }
              : t;
          e.sideEffect || e.redo(),
            this.propagateChange(),
            this.context.events.emit(
              "HISTORY",
              Object.assign(Object.assign({}, e), {
                redo: () => {
                  e.redo(), this.propagateChange();
                },
                undo: () => {
                  e.undo(), this.propagateChange();
                },
              })
            );
        }
        snapshotFactory() {
          const t = this.shapes,
            e = this.editingId;
          return () => {
            (this.shapes = t), (this.editingId = e);
          };
        }
        propagateChange() {
          this.context.events.emit("CHANGE", {
            tool: this,
            shape: this.name,
            annotations: this.getAnnotations(),
          });
        }
        getHandleRadius() {
          return Object(r["f"])(
            this.context.config.resizeHandleRadius,
            this.context.facts.coord.canvas,
            this.context.facts.coord.res
          );
        }
        getLabelId(t) {
          return (null === t || void 0 === t ? void 0 : t.alias) &&
            this.context.labelMap[this.name]
            ? this.context.labelMap[this.name][t.alias]
            : "";
        }
        getEditingShape() {
          const t = this.getEditingId();
          if (t) return this.getVisibleShapes().find((e) => e.id === t);
        }
        isVisible(t) {
          return !!t && this.getVisibleShapes().some((e) => e.id === t);
        }
        emitCreatorEvent(t, e) {
          switch (t) {
            case "creating":
              return void this.context.events.emit("SHAPE_CREATING", {
                shape: this.name,
              });
            case "created":
              if (!e) return;
              return void this.context.events.emit("SHAPE_CREATED", {
                alias: e.alias || "",
                shape: this.name,
              });
            case "abort":
              return void this.context.events.emit("SHAPE_ABORTED", {
                shape: this.name,
              });
          }
        }
        getShapeLabelPosition(t) {
          return t.center;
        }
        deleteAnnotations(t) {
          const e = "alias" in t ? t.alias : "",
            n = "labelId" in t ? t.labelId : "",
            i = this.shapes,
            r = this.shapes.filter((t) =>
              n ? this.getLabelId(t) !== n : t.alias !== e
            );
          r.length !== i.length &&
            ((this.editingId = void 0),
            this.pushHistory({
              id: `delete-annotations-${e}-${n}`,
              undo: () => {
                this.shapes = i;
              },
              redo: () => {
                this.shapes = r;
              },
            }));
        }
        restoreSingleShape(t) {
          return t;
        }
      }
    },
    "1b68": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return a;
      });
      var i = n("5530"),
        r = n("8165"),
        a = function () {
          var t = Object(r["getCurrentInstance"])().proxy,
            e = {
              source: [],
              importTime: [],
              annoTime: [],
              annotateType: 1,
              labelId: null,
              relationId: null,
              labelName: null,
              labelStatus: [],
            },
            n = Object(r["computed"])(function () {
              var n =
                  null === t || void 0 === t
                    ? void 0
                    : t.$route.query.paramFilters,
                r = Object(i["a"])({}, e);
              if (n)
                try {
                  r = Object(i["a"])(Object(i["a"])({}, e), JSON.parse(n));
                } catch (a) {}
              return r;
            });
          return { filters: n };
        };
    },
    "1d17": function (t, e, n) {
      "use strict";
      var i = n("584d"),
        r = n.n(i);
      r.a;
    },
    "1de5": function (t, e, n) {
      "use strict";
      t.exports = function (t, e) {
        return (
          e || (e = {}),
          (t = t && t.__esModule ? t.default : t),
          "string" !== typeof t
            ? t
            : (/^['"].*['"]$/.test(t) && (t = t.slice(1, -1)),
              e.hash && (t += e.hash),
              /["'() \t\n]/.test(t) || e.needQuotes
                ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"')
                : t)
        );
      };
    },
    "1de6": function (t, e, n) {
      t.exports = n.p + "img/delete.hover.299ce159.svg";
    },
    "1e34": function (t, e, n) {
      t.exports = n.p + "img/positive.52d12096.svg";
    },
    "20fd": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      class i {
        constructor() {
          (this.name = "base"), (this.active = !1);
        }
        activate(t) {
          (this.active = !0),
            (this.mode = t),
            this.setCursor(t ? t + "-active" : "active");
        }
        deactivate() {
          this.active &&
            ((this.active = !1), (this.mode = void 0), this.setCursor());
        }
        respond(t) {
          throw new Error("please implement #respond");
        }
        setCursor(t) {
          if (!t && !this.active) return;
          const e = this.getToolCursor(),
            n = t ? `${e} ${this.name}_${t} ${t}` : this.active ? e : "";
          this.context.events.emit("CURSOR", n);
        }
        getToolCursor() {
          return this.mode
            ? `${this.name}_${this.mode}-active`
            : this.name + "_active";
        }
      }
    },
    "219c": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = i.aTypedArray,
        a = i.exportTypedArrayMethod,
        o = [].sort;
      a("sort", function (t) {
        return o.call(r(this), t);
      });
    },
    2288: function (t, e, n) {
      var i = n("dab8");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("7ccb88db", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    2441: function (t, e, n) {
      /*
       * @copyright 2016 Sean Connelly (@voidqk), http://syntheti.cc
       * @license MIT
       * @preserve Project Home: https://github.com/voidqk/polybooljs
       */
      var i,
        r = n("a6dc"),
        a = n("f8a5"),
        o = n("9935"),
        s = n("a626"),
        c = n("b924"),
        l = n("34cc"),
        d = !1,
        h = a();
      function u(t, e, n) {
        var r = i.segments(t),
          a = i.segments(e),
          o = i.combine(r, a),
          s = n(o);
        return i.polygon(s);
      }
      (i = {
        buildLog: function (t) {
          return (
            !0 === t ? (d = r()) : !1 === t && (d = !1), !1 !== d && d.list
          );
        },
        epsilon: function (t) {
          return h.epsilon(t);
        },
        segments: function (t) {
          var e = o(!0, h, d);
          return (
            t.regions.forEach(e.addRegion),
            { segments: e.calculate(t.inverted), inverted: t.inverted }
          );
        },
        combine: function (t, e) {
          var n = o(!1, h, d);
          return {
            combined: n.calculate(
              t.segments,
              t.inverted,
              e.segments,
              e.inverted
            ),
            inverted1: t.inverted,
            inverted2: e.inverted,
          };
        },
        selectUnion: function (t) {
          return {
            segments: c.union(t.combined, d),
            inverted: t.inverted1 || t.inverted2,
          };
        },
        selectIntersect: function (t) {
          return {
            segments: c.intersect(t.combined, d),
            inverted: t.inverted1 && t.inverted2,
          };
        },
        selectDifference: function (t) {
          return {
            segments: c.difference(t.combined, d),
            inverted: t.inverted1 && !t.inverted2,
          };
        },
        selectDifferenceRev: function (t) {
          return {
            segments: c.differenceRev(t.combined, d),
            inverted: !t.inverted1 && t.inverted2,
          };
        },
        selectXor: function (t) {
          return {
            segments: c.xor(t.combined, d),
            inverted: t.inverted1 !== t.inverted2,
          };
        },
        polygon: function (t) {
          return { regions: s(t.segments, h, d), inverted: t.inverted };
        },
        polygonFromGeoJSON: function (t) {
          return l.toPolygon(i, t);
        },
        polygonToGeoJSON: function (t) {
          return l.fromPolygon(i, h, t);
        },
        union: function (t, e) {
          return u(t, e, i.selectUnion);
        },
        intersect: function (t, e) {
          return u(t, e, i.selectIntersect);
        },
        difference: function (t, e) {
          return u(t, e, i.selectDifference);
        },
        differenceRev: function (t, e) {
          return u(t, e, i.selectDifferenceRev);
        },
        xor: function (t, e) {
          return u(t, e, i.selectXor);
        },
      }),
        "object" === typeof window && (window.PolyBool = i),
        (t.exports = i);
    },
    "25a1": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("d58f").right,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("reduceRight", function (t) {
        return r(
          a(this),
          t,
          arguments.length,
          arguments.length > 1 ? arguments[1] : void 0
        );
      });
    },
    "25a5": function (t, e, n) {
      !(function (e, n) {
        t.exports = n();
      })(0, function () {
        "use strict";
        function t(t, i, r, a, o) {
          !(function t(n, i, r, a, o) {
            for (; a > r; ) {
              if (a - r > 600) {
                var s = a - r + 1,
                  c = i - r + 1,
                  l = Math.log(s),
                  d = 0.5 * Math.exp((2 * l) / 3),
                  h =
                    0.5 *
                    Math.sqrt((l * d * (s - d)) / s) *
                    (c - s / 2 < 0 ? -1 : 1),
                  u = Math.max(r, Math.floor(i - (c * d) / s + h)),
                  f = Math.min(a, Math.floor(i + ((s - c) * d) / s + h));
                t(n, i, u, f, o);
              }
              var p = n[i],
                b = r,
                g = a;
              for (e(n, r, i), o(n[a], p) > 0 && e(n, r, a); b < g; ) {
                for (e(n, b, g), b++, g--; o(n[b], p) < 0; ) b++;
                for (; o(n[g], p) > 0; ) g--;
              }
              0 === o(n[r], p) ? e(n, r, g) : e(n, ++g, a),
                g <= i && (r = g + 1),
                i <= g && (a = g - 1);
            }
          })(t, i, r || 0, a || t.length - 1, o || n);
        }
        function e(t, e, n) {
          var i = t[e];
          (t[e] = t[n]), (t[n] = i);
        }
        function n(t, e) {
          return t < e ? -1 : t > e ? 1 : 0;
        }
        var i = function (t) {
          void 0 === t && (t = 9),
            (this._maxEntries = Math.max(4, t)),
            (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
            this.clear();
        };
        function r(t, e, n) {
          if (!n) return e.indexOf(t);
          for (var i = 0; i < e.length; i++) if (n(t, e[i])) return i;
          return -1;
        }
        function a(t, e) {
          o(t, 0, t.children.length, e, t);
        }
        function o(t, e, n, i, r) {
          r || (r = p(null)),
            (r.minX = 1 / 0),
            (r.minY = 1 / 0),
            (r.maxX = -1 / 0),
            (r.maxY = -1 / 0);
          for (var a = e; a < n; a++) {
            var o = t.children[a];
            s(r, t.leaf ? i(o) : o);
          }
          return r;
        }
        function s(t, e) {
          return (
            (t.minX = Math.min(t.minX, e.minX)),
            (t.minY = Math.min(t.minY, e.minY)),
            (t.maxX = Math.max(t.maxX, e.maxX)),
            (t.maxY = Math.max(t.maxY, e.maxY)),
            t
          );
        }
        function c(t, e) {
          return t.minX - e.minX;
        }
        function l(t, e) {
          return t.minY - e.minY;
        }
        function d(t) {
          return (t.maxX - t.minX) * (t.maxY - t.minY);
        }
        function h(t) {
          return t.maxX - t.minX + (t.maxY - t.minY);
        }
        function u(t, e) {
          return (
            t.minX <= e.minX &&
            t.minY <= e.minY &&
            e.maxX <= t.maxX &&
            e.maxY <= t.maxY
          );
        }
        function f(t, e) {
          return (
            e.minX <= t.maxX &&
            e.minY <= t.maxY &&
            e.maxX >= t.minX &&
            e.maxY >= t.minY
          );
        }
        function p(t) {
          return {
            children: t,
            height: 1,
            leaf: !0,
            minX: 1 / 0,
            minY: 1 / 0,
            maxX: -1 / 0,
            maxY: -1 / 0,
          };
        }
        function b(e, n, i, r, a) {
          for (var o = [n, i]; o.length; )
            if (!((i = o.pop()) - (n = o.pop()) <= r)) {
              var s = n + Math.ceil((i - n) / r / 2) * r;
              t(e, s, n, i, a), o.push(n, s, s, i);
            }
        }
        return (
          (i.prototype.all = function () {
            return this._all(this.data, []);
          }),
          (i.prototype.search = function (t) {
            var e = this.data,
              n = [];
            if (!f(t, e)) return n;
            for (var i = this.toBBox, r = []; e; ) {
              for (var a = 0; a < e.children.length; a++) {
                var o = e.children[a],
                  s = e.leaf ? i(o) : o;
                f(t, s) &&
                  (e.leaf ? n.push(o) : u(t, s) ? this._all(o, n) : r.push(o));
              }
              e = r.pop();
            }
            return n;
          }),
          (i.prototype.collides = function (t) {
            var e = this.data;
            if (!f(t, e)) return !1;
            for (var n = []; e; ) {
              for (var i = 0; i < e.children.length; i++) {
                var r = e.children[i],
                  a = e.leaf ? this.toBBox(r) : r;
                if (f(t, a)) {
                  if (e.leaf || u(t, a)) return !0;
                  n.push(r);
                }
              }
              e = n.pop();
            }
            return !1;
          }),
          (i.prototype.load = function (t) {
            if (!t || !t.length) return this;
            if (t.length < this._minEntries) {
              for (var e = 0; e < t.length; e++) this.insert(t[e]);
              return this;
            }
            var n = this._build(t.slice(), 0, t.length - 1, 0);
            if (this.data.children.length)
              if (this.data.height === n.height) this._splitRoot(this.data, n);
              else {
                if (this.data.height < n.height) {
                  var i = this.data;
                  (this.data = n), (n = i);
                }
                this._insert(n, this.data.height - n.height - 1, !0);
              }
            else this.data = n;
            return this;
          }),
          (i.prototype.insert = function (t) {
            return t && this._insert(t, this.data.height - 1), this;
          }),
          (i.prototype.clear = function () {
            return (this.data = p([])), this;
          }),
          (i.prototype.remove = function (t, e) {
            if (!t) return this;
            for (
              var n, i, a, o = this.data, s = this.toBBox(t), c = [], l = [];
              o || c.length;

            ) {
              if (
                (o ||
                  ((o = c.pop()),
                  (i = c[c.length - 1]),
                  (n = l.pop()),
                  (a = !0)),
                o.leaf)
              ) {
                var d = r(t, o.children, e);
                if (-1 !== d)
                  return (
                    o.children.splice(d, 1), c.push(o), this._condense(c), this
                  );
              }
              a || o.leaf || !u(o, s)
                ? i
                  ? (n++, (o = i.children[n]), (a = !1))
                  : (o = null)
                : (c.push(o), l.push(n), (n = 0), (i = o), (o = o.children[0]));
            }
            return this;
          }),
          (i.prototype.toBBox = function (t) {
            return t;
          }),
          (i.prototype.compareMinX = function (t, e) {
            return t.minX - e.minX;
          }),
          (i.prototype.compareMinY = function (t, e) {
            return t.minY - e.minY;
          }),
          (i.prototype.toJSON = function () {
            return this.data;
          }),
          (i.prototype.fromJSON = function (t) {
            return (this.data = t), this;
          }),
          (i.prototype._all = function (t, e) {
            for (var n = []; t; )
              t.leaf
                ? e.push.apply(e, t.children)
                : n.push.apply(n, t.children),
                (t = n.pop());
            return e;
          }),
          (i.prototype._build = function (t, e, n, i) {
            var r,
              o = n - e + 1,
              s = this._maxEntries;
            if (o <= s) return a((r = p(t.slice(e, n + 1))), this.toBBox), r;
            i ||
              ((i = Math.ceil(Math.log(o) / Math.log(s))),
              (s = Math.ceil(o / Math.pow(s, i - 1)))),
              ((r = p([])).leaf = !1),
              (r.height = i);
            var c = Math.ceil(o / s),
              l = c * Math.ceil(Math.sqrt(s));
            b(t, e, n, l, this.compareMinX);
            for (var d = e; d <= n; d += l) {
              var h = Math.min(d + l - 1, n);
              b(t, d, h, c, this.compareMinY);
              for (var u = d; u <= h; u += c) {
                var f = Math.min(u + c - 1, h);
                r.children.push(this._build(t, u, f, i - 1));
              }
            }
            return a(r, this.toBBox), r;
          }),
          (i.prototype._chooseSubtree = function (t, e, n, i) {
            for (; i.push(e), !e.leaf && i.length - 1 !== n; ) {
              for (
                var r = 1 / 0, a = 1 / 0, o = void 0, s = 0;
                s < e.children.length;
                s++
              ) {
                var c = e.children[s],
                  l = d(c),
                  h =
                    ((u = t),
                    (f = c),
                    (Math.max(f.maxX, u.maxX) - Math.min(f.minX, u.minX)) *
                      (Math.max(f.maxY, u.maxY) - Math.min(f.minY, u.minY)) -
                      l);
                h < a
                  ? ((a = h), (r = l < r ? l : r), (o = c))
                  : h === a && l < r && ((r = l), (o = c));
              }
              e = o || e.children[0];
            }
            var u, f;
            return e;
          }),
          (i.prototype._insert = function (t, e, n) {
            var i = n ? t : this.toBBox(t),
              r = [],
              a = this._chooseSubtree(i, this.data, e, r);
            for (
              a.children.push(t), s(a, i);
              e >= 0 && r[e].children.length > this._maxEntries;

            )
              this._split(r, e), e--;
            this._adjustParentBBoxes(i, r, e);
          }),
          (i.prototype._split = function (t, e) {
            var n = t[e],
              i = n.children.length,
              r = this._minEntries;
            this._chooseSplitAxis(n, r, i);
            var o = this._chooseSplitIndex(n, r, i),
              s = p(n.children.splice(o, n.children.length - o));
            (s.height = n.height),
              (s.leaf = n.leaf),
              a(n, this.toBBox),
              a(s, this.toBBox),
              e ? t[e - 1].children.push(s) : this._splitRoot(n, s);
          }),
          (i.prototype._splitRoot = function (t, e) {
            (this.data = p([t, e])),
              (this.data.height = t.height + 1),
              (this.data.leaf = !1),
              a(this.data, this.toBBox);
          }),
          (i.prototype._chooseSplitIndex = function (t, e, n) {
            for (
              var i, r, a, s, c, l, h, u = 1 / 0, f = 1 / 0, p = e;
              p <= n - e;
              p++
            ) {
              var b = o(t, 0, p, this.toBBox),
                g = o(t, p, n, this.toBBox),
                v =
                  ((r = b),
                  (a = g),
                  (s = void 0),
                  (c = void 0),
                  (l = void 0),
                  (h = void 0),
                  (s = Math.max(r.minX, a.minX)),
                  (c = Math.max(r.minY, a.minY)),
                  (l = Math.min(r.maxX, a.maxX)),
                  (h = Math.min(r.maxY, a.maxY)),
                  Math.max(0, l - s) * Math.max(0, h - c)),
                m = d(b) + d(g);
              v < u
                ? ((u = v), (i = p), (f = m < f ? m : f))
                : v === u && m < f && ((f = m), (i = p));
            }
            return i || n - e;
          }),
          (i.prototype._chooseSplitAxis = function (t, e, n) {
            var i = t.leaf ? this.compareMinX : c,
              r = t.leaf ? this.compareMinY : l;
            this._allDistMargin(t, e, n, i) < this._allDistMargin(t, e, n, r) &&
              t.children.sort(i);
          }),
          (i.prototype._allDistMargin = function (t, e, n, i) {
            t.children.sort(i);
            for (
              var r = this.toBBox,
                a = o(t, 0, e, r),
                c = o(t, n - e, n, r),
                l = h(a) + h(c),
                d = e;
              d < n - e;
              d++
            ) {
              var u = t.children[d];
              s(a, t.leaf ? r(u) : u), (l += h(a));
            }
            for (var f = n - e - 1; f >= e; f--) {
              var p = t.children[f];
              s(c, t.leaf ? r(p) : p), (l += h(c));
            }
            return l;
          }),
          (i.prototype._adjustParentBBoxes = function (t, e, n) {
            for (var i = n; i >= 0; i--) s(e[i], t);
          }),
          (i.prototype._condense = function (t) {
            for (var e = t.length - 1, n = void 0; e >= 0; e--)
              0 === t[e].children.length
                ? e > 0
                  ? (n = t[e - 1].children).splice(n.indexOf(t[e]), 1)
                  : this.clear()
                : a(t[e], this.toBBox);
          }),
          i
        );
      });
    },
    "26c8": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".img-new-annotator[data-v-c009cab8]{display:flex;width:100%;height:100%}.img-new-annotator .g-image[data-v-c009cab8]{outline:none}",
          "",
        ]),
        (t.exports = e);
    },
    2954: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("4840"),
        a = n("d039"),
        o = i.aTypedArray,
        s = i.aTypedArrayConstructor,
        c = i.exportTypedArrayMethod,
        l = [].slice,
        d = a(function () {
          new Int8Array(1).slice();
        });
      c(
        "slice",
        function (t, e) {
          var n = l.call(o(this), t, e),
            i = r(this, this.constructor),
            a = 0,
            c = n.length,
            d = new (s(i))(c);
          while (c > a) d[a] = n[a++];
          return d;
        },
        d
      );
    },
    "2ae1": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return A;
      });
      var i = n("377b"),
        r = n("6166"),
        a = n("69af"),
        o = n("0a4d"),
        s = n("acc5"),
        c = n("5f6c");
      class l extends c["b"] {
        constructor(t, e, n) {
          super(t, () => 1 / 0, n),
            (this.nextId = t),
            (this.getWidth = e),
            (this.broadcast = n);
        }
        push(t) {
          if (
            ((this.nowPoint = t),
            (this.points = this.points.concat(t)),
            this.isLegalShape())
          )
            return this.finish();
          this.broadcast("creating", this.guessShape());
        }
        finish() {
          if (!this.isLegalShape) return;
          const t = this.nextId(),
            e = this.guessShape(t);
          return this.broadcast("created", e), this.stop(), e;
        }
        guessShape(t = "") {
          const e = this.getWidth(),
            n = this.isLegalShape()
              ? Object(s["f"])(Object(o["d"])(this.points, e))
              : this.points[0];
          return { id: t, alias: t, width: e, points: this.points, center: n };
        }
        isLegalShape() {
          return this.points.length >= 2;
        }
      }
      var d = n("a4c5");
      const h = "line",
        u = [h + "_shape", h],
        f = [h + "_active", "active"].concat(u),
        p = [h + "_handle", "handle"],
        b = [h + "_handle-active", "handle-active"],
        g = [h + "_draft", "draft"].concat(f),
        v = { className: u },
        m = (t, e = {}) => {
          const { points: n, width: i } = t;
          if (!n.length) return;
          const r = Object.assign(Object.assign({}, v), e);
          return {
            type: "line",
            labelId: r.labelId,
            class: r.className,
            data: { points: n, width: i },
          };
        },
        y = (t, e) => {
          if (t) return m(t, { className: f, labelId: e });
        },
        x = (t, e) => {
          if (t.length)
            return m({ points: t, width: e, alias: "" }, { className: g });
        };
      function w(t, e) {
        return t.map((t, n) => {
          const i = 0 === n;
          return Object(d["a"])(t, e, i ? b : p);
        });
      }
      const _ = (t, e) => Object(o["c"])(t.points, t.width, e);
      class O {
        constructor() {
          (this.width = 5), (this.resizerThreshold = 5);
        }
      }
      class A extends c["c"] {
        constructor() {
          super(...arguments),
            (this.name = "line"),
            (this.control = new O()),
            (this.creator = new l(
              this.nextId,
              () => this.getNowLineWidth(),
              this.emitCreatorEvent.bind(this)
            )),
            (this.mover = new c["a"](_, (t, e) => {
              const n = t.points.map((t) => ({ x: t.x + e.x, y: t.y + e.y }));
              return Object.assign(Object.assign({}, t), {
                mask: void 0,
                points: n,
                center: Object(s["f"])(Object(o["d"])(n, t.width)),
              });
            })),
            (this.resizer = new c["d"](
              (t, e) => {
                const { dom: n, res: i } = this.context.facts.coord,
                  a = Object(r["f"])(this.control.resizerThreshold, n, i),
                  o = t.points.findIndex((t) => Object(r["b"])(t, e) <= a);
                if (!(o < 0))
                  return { points: t.points, index: o, width: t.width };
              },
              (t, e) => {
                const { points: n, index: i } = t,
                  r = [...n.slice(0, i), e, ...n.slice(i + 1)];
                return {
                  points: r,
                  mask: void 0,
                  center: Object(s["f"])(Object(o["d"])(r, t.width)),
                };
              }
            )),
            (this.hitTest = _),
            (this.getColdRenderJobs = Object(a["c"])(
              () => [
                this.getVisibleShapes(),
                this.editingId,
                this.context.config.alwaysShowLabel,
                this.context.labelMap[this.name],
              ],
              (t, e, n) =>
                t.reduce((t, i) => {
                  if (i.id === e) return t;
                  const r = this.getLabelId(i),
                    a = m(i, { labelId: r });
                  return a
                    ? n
                      ? t.concat(a, Object(d["b"])(i, { labelId: r }))
                      : t.concat(a)
                    : t;
                }, [])
            )),
            (this.getHotRenderJobs = Object(a["c"])(
              () => {
                var t;
                return [
                  this.creator.getPoints(),
                  this.getEditingShape(),
                  null === (t = this.context) || void 0 === t
                    ? void 0
                    : t.config.resizeHandleRadius,
                  this.getNowLineWidth(),
                  this.context.labelMap[this.name],
                ];
              },
              (t, e, n, r) =>
                Object(i["a"])([
                  y(e, this.getLabelId(e)),
                  e ? w(e.points, n) : void 0,
                  x(t, r),
                  w(t, n),
                ])
            )),
            (this.getNowLineWidth = (t) => {
              const { dom: e, res: n } = this.context.facts.coord;
              return Object(r["f"])(t || this.control.width, e, n);
            });
        }
        getControl() {
          return this.control;
        }
        restoreSingleShape(t) {
          const e = Object(s["f"])(
            Object(o["d"])(t.points, t.width || this.control.width)
          );
          return Object.assign(Object.assign({}, t), {
            width: this.getNowLineWidth(t.width),
            center: e,
          });
        }
      }
    },
    "2d45": function (t, e, n) {
      "use strict";
      n.d(e, "g", function () {
        return s;
      }),
        n.d(e, "b", function () {
          return c;
        }),
        n.d(e, "i", function () {
          return l;
        }),
        n.d(e, "a", function () {
          return d;
        }),
        n.d(e, "e", function () {
          return h;
        }),
        n.d(e, "c", function () {
          return u;
        }),
        n.d(e, "d", function () {
          return f;
        }),
        n.d(e, "h", function () {
          return p;
        }),
        n.d(e, "f", function () {
          return b;
        });
      var i = n("49d5"),
        r = n("69af");
      class a extends Error {
        constructor() {
          super(...arguments), (this.name = "cancel");
        }
      }
      const o = (t) => ({
          cancelled: !1,
          resolved: !0,
          result: Promise.resolve(t),
          cancel: i["b"],
        }),
        s = () => o(void 0),
        c = (t, e) => {
          const n = {
            cancelled: !1,
            resolved: !1,
            result: t().then((t) => {
              if (n.cancelled) throw new a();
              return (n.resolved = !0), t;
            }),
            cancel: () => {
              n.resolved || n.cancelled || ((n.cancelled = !0), e());
            },
          };
          return n;
        },
        l = (t, e) =>
          Object.assign(Object.assign({}, t), { result: t.result.finally(e) }),
        d = (t, e) => {
          const { result: n } = t;
          return Object.assign(Object.assign({}, t), { result: e(n) });
        },
        h = (t, e) => {
          const n = d(t, (t) => t.then(e));
          return n.result;
        },
        u = (t) => {
          let e;
          return (...n) => (e && e.cancel(), (e = t(...n)), e);
        },
        f = (t, e) => (n) =>
          n.result.then(e).catch((e) => {
            if (e instanceof a) throw e;
            t(e);
          }),
        p = (t) => {
          let e = { stopped: !1 };
          const n = () =>
            Object(r["d"])(() => {
              if (!e.stopped) return t();
            }, e);
          return c(n, () => (e.stopped = !0));
        },
        b = (t) => {
          const e = () => Promise.all(t.map((t) => t.result)),
            n = () => {
              t.forEach((t) => t.cancel());
            };
          return c(e, n);
        };
    },
    "2f83": function (t, e, n) {
      "use strict";
      var i = n("16e8"),
        r = n.n(i);
      r.a;
    },
    3273: function (t, e, n) {
      t.exports = n.p + "img/move.c491419c.svg";
    },
    3280: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("e58c"),
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("lastIndexOf", function (t) {
        return r.apply(a(this), arguments);
      });
    },
    "34cc": function (t, e) {
      var n = {
        toPolygon: function (t, e) {
          function n(e) {
            if (e.length <= 0) return t.segments({ inverted: !1, regions: [] });
            function n(e) {
              var n = e.slice(0, e.length - 1);
              return t.segments({ inverted: !1, regions: [n] });
            }
            for (var i = n(e[0]), r = 1; r < e.length; r++)
              i = t.selectDifference(t.combine(i, n(e[r])));
            return i;
          }
          if ("Polygon" === e.type) return t.polygon(n(e.coordinates));
          if ("MultiPolygon" === e.type) {
            for (
              var i = t.segments({ inverted: !1, regions: [] }), r = 0;
              r < e.coordinates.length;
              r++
            )
              i = t.selectUnion(t.combine(i, n(e.coordinates[r])));
            return t.polygon(i);
          }
          throw new Error(
            "PolyBool: Cannot convert GeoJSON object to PolyBool polygon"
          );
        },
        fromPolygon: function (t, e, n) {
          function i(t, n) {
            return e.pointInsideRegion(
              [0.5 * (t[0][0] + t[1][0]), 0.5 * (t[0][1] + t[1][1])],
              n
            );
          }
          function r(t) {
            return { region: t, children: [] };
          }
          n = t.polygon(t.segments(n));
          var a = r(null);
          function o(t, e) {
            for (var n = 0; n < t.children.length; n++) {
              var a = t.children[n];
              if (i(e, a.region)) return void o(a, e);
            }
            var s = r(e);
            for (n = 0; n < t.children.length; n++) {
              a = t.children[n];
              i(a.region, e) &&
                (s.children.push(a), t.children.splice(n, 1), n--);
            }
            t.children.push(s);
          }
          for (var s = 0; s < n.regions.length; s++) {
            var c = n.regions[s];
            c.length < 3 || o(a, c);
          }
          function l(t, e) {
            for (
              var n = 0,
                i = t[t.length - 1][0],
                r = t[t.length - 1][1],
                a = [],
                o = 0;
              o < t.length;
              o++
            ) {
              var s = t[o][0],
                c = t[o][1];
              a.push([s, c]), (n += c * i - s * r), (i = s), (r = c);
            }
            var l = n < 0;
            return l !== e && a.reverse(), a.push([a[0][0], a[0][1]]), a;
          }
          var d = [];
          function h(t) {
            var e = [l(t.region, !1)];
            d.push(e);
            for (var n = 0; n < t.children.length; n++)
              e.push(u(t.children[n]));
          }
          function u(t) {
            for (var e = 0; e < t.children.length; e++) h(t.children[e]);
            return l(t.region, !0);
          }
          for (s = 0; s < a.children.length; s++) h(a.children[s]);
          return d.length <= 0
            ? { type: "Polygon", coordinates: [] }
            : 1 == d.length
            ? { type: "Polygon", coordinates: d[0] }
            : { type: "MultiPolygon", coordinates: d };
        },
      };
      t.exports = n;
    },
    "35cb": function (t, e, n) {
      var i = n("7bbf");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("2215e06c", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "377b": function (t, e, n) {
      "use strict";
      n.d(e, "e", function () {
        return i;
      }),
        n.d(e, "b", function () {
          return a;
        }),
        n.d(e, "a", function () {
          return o;
        }),
        n.d(e, "d", function () {
          return s;
        }),
        n.d(e, "c", function () {
          return c;
        });
      const i = (t, e) =>
          t.reduce((t, n) => (e.includes(n) ? t : t.concat(n)), []),
        r = (t) =>
          t.reduce((t, e) => t.concat(Array.isArray(e) ? r(e) : e), []),
        a = (t, e) =>
          t.reduce((t, n) => {
            const i = e(n);
            return i ? t.concat(i) : t;
          }, []),
        o = (t) => {
          const e = r(t);
          return e.reduce((t, e) => (e ? t.concat(e) : t), []);
        },
        s = (t, e) => {
          const n = t.indexOf(e);
          return n < 0 || t.splice(n, 1), t;
        },
        c = (t, e) => {
          const n = t.indexOf(e);
          if (n < 0) return t;
          for (let i = n; i > 0; i--) t[i] = t[i - 1];
          return (t[0] = e), t;
        };
    },
    "3a7b": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").findIndex,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("findIndex", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    "3c12": function (t, e, n) {
      "use strict";
      var i = n("aa4c"),
        r = n.n(i);
      r.a;
    },
    "3c4e": function (t, e, n) {
      "use strict";
      var i = function (t) {
        return r(t) && !a(t);
      };
      function r(t) {
        return !!t && "object" === typeof t;
      }
      function a(t) {
        var e = Object.prototype.toString.call(t);
        return "[object RegExp]" === e || "[object Date]" === e || c(t);
      }
      var o = "function" === typeof Symbol && Symbol.for,
        s = o ? Symbol.for("react.element") : 60103;
      function c(t) {
        return t.$$typeof === s;
      }
      function l(t) {
        return Array.isArray(t) ? [] : {};
      }
      function d(t, e) {
        return !1 !== e.clone && e.isMergeableObject(t) ? m(l(t), t, e) : t;
      }
      function h(t, e, n) {
        return t.concat(e).map(function (t) {
          return d(t, n);
        });
      }
      function u(t, e) {
        if (!e.customMerge) return m;
        var n = e.customMerge(t);
        return "function" === typeof n ? n : m;
      }
      function f(t) {
        return Object.getOwnPropertySymbols
          ? Object.getOwnPropertySymbols(t).filter(function (e) {
              return t.propertyIsEnumerable(e);
            })
          : [];
      }
      function p(t) {
        return Object.keys(t).concat(f(t));
      }
      function b(t, e) {
        try {
          return e in t;
        } catch (n) {
          return !1;
        }
      }
      function g(t, e) {
        return (
          b(t, e) &&
          !(
            Object.hasOwnProperty.call(t, e) &&
            Object.propertyIsEnumerable.call(t, e)
          )
        );
      }
      function v(t, e, n) {
        var i = {};
        return (
          n.isMergeableObject(t) &&
            p(t).forEach(function (e) {
              i[e] = d(t[e], n);
            }),
          p(e).forEach(function (r) {
            g(t, r) ||
              (b(t, r) && n.isMergeableObject(e[r])
                ? (i[r] = u(r, n)(t[r], e[r], n))
                : (i[r] = d(e[r], n)));
          }),
          i
        );
      }
      function m(t, e, n) {
        (n = n || {}),
          (n.arrayMerge = n.arrayMerge || h),
          (n.isMergeableObject = n.isMergeableObject || i),
          (n.cloneUnlessOtherwiseSpecified = d);
        var r = Array.isArray(e),
          a = Array.isArray(t),
          o = r === a;
        return o ? (r ? n.arrayMerge(t, e, n) : v(t, e, n)) : d(e, n);
      }
      m.all = function (t, e) {
        if (!Array.isArray(t))
          throw new Error("first argument should be an array");
        return t.reduce(function (t, n) {
          return m(t, n, e);
        }, {});
      };
      var y = m;
      t.exports = y;
    },
    "3c5d": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("50c4"),
        a = n("182d"),
        o = n("7b0b"),
        s = n("d039"),
        c = i.aTypedArray,
        l = i.exportTypedArrayMethod,
        d = s(function () {
          new Int8Array(1).set({});
        });
      l(
        "set",
        function (t) {
          c(this);
          var e = a(arguments.length > 1 ? arguments[1] : void 0, 1),
            n = this.length,
            i = o(t),
            s = r(i.length),
            l = 0;
          if (s + e > n) throw RangeError("Wrong length");
          while (l < s) this[e + l] = i[l++];
        },
        d
      );
    },
    "3fcc": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").map,
        a = n("4840"),
        o = i.aTypedArray,
        s = i.aTypedArrayConstructor,
        c = i.exportTypedArrayMethod;
      c("map", function (t) {
        return r(
          o(this),
          t,
          arguments.length > 1 ? arguments[1] : void 0,
          function (t, e) {
            return new (s(a(t, t.constructor)))(e);
          }
        );
      });
    },
    4069: function (t, e, n) {
      var i = n("44d2");
      i("flat");
    },
    4889: function (t, e, n) {
      "use strict";
      var i = n("c426"),
        r = n.n(i);
      r.a;
    },
    "497a": function (t, e, n) {
      "use strict";
      var i = n("f7f3"),
        r = n.n(i);
      r.a;
    },
    "49d5": function (t, e, n) {
      "use strict";
      n.d(e, "c", function () {
        return i;
      }),
        n.d(e, "a", function () {
          return r;
        }),
        n.d(e, "b", function () {
          return a;
        });
      const i = {},
        r = [],
        a = () => {};
    },
    "4bc7": function (t, e, n) {
      var i = n("7e41");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("565362f1", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "4dac": function (t, e, n) {
      t.exports = n.p + "img/brush.8a654044.cur";
    },
    "4fad": function (t, e, n) {
      var i = n("23e7"),
        r = n("6f53").entries;
      i(
        { target: "Object", stat: !0 },
        {
          entries: function (t) {
            return r(t);
          },
        }
      );
    },
    "4fb5": function (t, e, n) {
      "use strict";
      var i = n("35cb"),
        r = n.n(i);
      r.a;
    },
    "524c": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return c;
      });
      n("96cf");
      var i = n("1da1"),
        r = n("8165");
      function a(t) {
        var e = Object(r["ref"])(null);
        return (
          t.then(function (t) {
            return (e.value = t);
          }),
          e
        );
      }
      function o() {
        return s.apply(this, arguments);
      }
      function s() {
        return (
          (s = Object(i["a"])(
            regeneratorRuntime.mark(function t() {
              var e;
              return regeneratorRuntime.wrap(function (t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2), System.import("@baidu/afe-app-dataset")
                      );
                    case 2:
                      return (
                        (e = t.sent),
                        t.abrupt("return", {
                          useSpeedView: e.useSpeedView,
                          services: e.useService(),
                          enums: e.enums,
                          LabelPicker: e.LabelPicker,
                          useLabelPicker: e.useLabelPicker,
                          timeSeriesUtils: e.timeSeriesUtils,
                          getDatasetAbility: e.getDatasetAbility,
                        })
                      );
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          s.apply(this, arguments)
        );
      }
      function c() {
        return a(o());
      }
    },
    "584d": function (t, e, n) {
      var i = n("b979");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("7c4de884", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "58f3": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".floating-txt-new[data-v-c773cee0]{position:absolute;left:0;top:0;font-size:14px;line-height:22px;word-break:keep-all;white-space:nowrap;background-color:hsla(0,0%,100%,.6);padding:16px;text-align:left}.floating-txt-new-footer[data-v-c773cee0]{display:flex;margin-top:8px;align-items:center;flex-direction:row}",
          "",
        ]),
        (t.exports = e);
    },
    "5c61": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      const i = { DONE: "DONE", RETRIEVE: "RETRIEVE" };
    },
    "5cc6": function (t, e, n) {
      var i = n("74e8");
      i("Uint8", function (t) {
        return function (e, n, i) {
          return t(this, e, n, i);
        };
      });
    },
    "5f6c": function (t, e, n) {
      "use strict";
      n.d(e, "c", function () {
        return E;
      }),
        n.d(e, "b", function () {
          return l["b"];
        }),
        n.d(e, "a", function () {
          return l["a"];
        }),
        n.d(e, "d", function () {
          return l["c"];
        });
      var i = n("377b"),
        r = n("6166"),
        a = n("0a4d"),
        o = n("5c61"),
        s = n("69af"),
        c = n("1898"),
        l = n("fcef"),
        d = n("a4c5");
      const h = "polygon",
        u = [h + "_shape", h],
        f = [h + "_active", "active"].concat(u),
        p = [h + "_draft", "draft"].concat(f),
        b = [h + "_handle", "handle"],
        g = [h + "_handle-active", "handle-active"],
        v = [h + "_preview-line", "preview-line"],
        m = { closed: !0, className: u };
      function y(t, e = {}) {
        if (!t.points.length) return;
        const n = Object.assign(Object.assign({}, m), e);
        return {
          type: "polygon",
          labelId: n.labelId,
          class: n.className,
          data: { points: t.points, closed: n.closed },
        };
      }
      function x(t, e) {
        if (t) return y(t, { closed: !0, className: f, labelId: e });
      }
      function w(t) {
        if (!(t.length < 3))
          return y({ points: t }, { closed: !1, className: p });
      }
      function _(t, e) {
        const n = t[0] === t[t.length - 1];
        return t.map((t, i) => {
          const r = 0 === i && n;
          return Object(d["a"])(t, e, r ? g : b);
        });
      }
      const O = (t, e) => {
        if (t && e) return { type: "line", class: v, data: { points: [t, e] } };
      };
      var A = n("acc5");
      const k = (t, e) => Object(a["f"])(t.points, e);
      class E extends c["a"] {
        constructor() {
          super(...arguments),
            (this.name = "polygon"),
            (this.creator = new l["b"](
              this.nextId,
              (t) => {
                const { dom: e, res: n } = this.context.facts.coord;
                return Object(r["f"])(t, e, n);
              },
              this.emitCreatorEvent.bind(this)
            )),
            (this.mover = new l["a"](k, (t, e) => {
              const n = t.points.map((t) => ({ x: t.x + e.x, y: t.y + e.y }));
              return Object.assign(Object.assign({}, t), {
                mask: void 0,
                points: n,
                center: Object(A["f"])(n),
              });
            })),
            (this.resizer = new l["c"](
              (t, e) => {
                const n = this.getHandleRadius(),
                  i = t.points.findIndex((t) => Object(r["b"])(t, e) <= n);
                if (!(i < 0)) return { points: t.points, index: i };
              },
              (t, e) => {
                const { points: n, index: i } = t,
                  r = [...n.slice(0, i), e, ...n.slice(i + 1)];
                return { mask: void 0, points: r, center: Object(A["f"])(r) };
              }
            )),
            (this.hitTest = (t, e) => k(t, e)),
            (this.getRenderJobs = Object(s["c"])(
              () => [
                this.getHoverLabelJob(),
                this.getHotRenderJobs(),
                this.getColdRenderJobs(),
              ],
              (t, e, n) => ({ instant: t, hot: e, cold: n })
            )),
            (this.getColdRenderJobs = Object(s["c"])(
              () => [
                this.getVisibleShapes(),
                this.editingId,
                this.context.config.alwaysShowLabel,
                this.context.labelMap[this.name],
              ],
              (t, e, n) =>
                t.reduce((t, i) => {
                  if (i.id === e) return t;
                  const r = this.getLabelId(i),
                    a = y(i, { labelId: r });
                  return a
                    ? n
                      ? t.concat(a, Object(d["b"])(i, { labelId: r }))
                      : t.concat(a)
                    : t;
                }, [])
            )),
            (this.getHotRenderJobs = Object(s["c"])(
              () => {
                var t;
                return [
                  this.creator.getPoints(),
                  this.getEditingShape(),
                  null === (t = this.context) || void 0 === t
                    ? void 0
                    : t.config.resizeHandleRadius,
                  this.context.labelMap[this.name],
                ];
              },
              (t, e, n) =>
                Object(i["a"])([
                  x(e, this.getLabelId(e)),
                  e ? _(e.points, n) : void 0,
                  w(t),
                  _(t, n),
                  O(t[t.length - 1], t[0]),
                ])
            ));
        }
        doRespond(t) {
          var e;
          switch (t.kind) {
            case "hover": {
              if (this.creator.doing)
                return (
                  (this.creator.nowPoint = t.point),
                  this.setCursor(),
                  o["a"].DONE
                );
              if (this.closeToHandles(t.point))
                return this.setCursor("handle"), o["a"].DONE;
              const e = this.getShapeAtPoint(t.point);
              if (!e) return this.setCursor(), void (this.hoverId = void 0);
              const n = this.active && e.id === this.editingId;
              return (
                this.setCursor(n ? "move" : "activate"),
                (this.hoverId = n ? void 0 : e.id),
                o["a"].DONE
              );
            }
            case "click":
              return this.handleClick(t);
            case "drag": {
              const n =
                  null === (e = this.getEditingShape()) || void 0 === e
                    ? void 0
                    : e.id,
                i = [this.currentBehavior, this.resizer, this.mover].find(
                  (e) => {
                    if (!e) return;
                    const i = e.push(this.shapes, n, t);
                    return i ? ((this.shapes = i), !0) : void 0;
                  }
                );
              return (
                (this.currentBehavior = i),
                i === this.resizer && this.setCursor("resizing"),
                i ? o["a"].DONE : void 0
              );
            }
            case "dragEnd": {
              if (!this.currentBehavior) return;
              const e = this.currentBehavior.stop(t);
              return void this.handleBehaviorStop(e);
            }
            case "contextmenu": {
              const e = this.creator.stop(),
                n = this.mover.stop();
              return e || n ? o["a"].DONE : this.handleClick(t);
            }
            case "press":
              if (!this.active) return;
              return this.handlePress(t);
          }
        }
        doArrowKeyboard(t) {
          if (!this.editingId) return o["a"].DONE;
          {
            const e = this.mover.moveByArrowKey(t, this.shapes, this.editingId);
            this.handleBehaviorStop(e);
          }
        }
        handleBehaviorStop(t) {
          if (((this.currentBehavior = void 0), t && t.next)) {
            const { next: e, prev: n } = t;
            return (
              this.pushHistory({
                redo: () => (this.shapes = e),
                undo: () => (this.shapes = n),
              }),
              o["a"].DONE
            );
          }
        }
        handleClick(t) {
          const e = this.creator.doing;
          if (!e) {
            const e = this.getShapeAtPoint(t.point),
              n = null === e || void 0 === e ? void 0 : e.id;
            if (n) return (this.editingId = n), o["a"].RETRIEVE;
          }
          if (!this.active) return;
          if (this.closeToHandles(t.point)) return o["a"].DONE;
          const n = () => {
            if (this.editingId) return void (this.editingId = void 0);
            const e = this.creator.points,
              n = e.concat(t.point),
              i = this.creator.push(t.point);
            if (i)
              return (
                this.context.events.emit("HISTORY:CLEAR", "draft"),
                this.pushHistory(() => {
                  (this.shapes = this.shapes.concat(i)),
                    (this.editingId = i.id);
                }),
                i
              );
            this.pushHistory({
              group: "draft",
              undo: () => {
                this.creator.setPoints(e);
              },
              redo: () => {
                this.creator.setPoints(n);
              },
            });
          };
          if (e) {
            const t = n();
            return t && (this.editingId = t.id), o["a"].DONE;
          }
          return n;
        }
        handlePress(t) {
          const e = t.value;
          switch (e) {
            case "Enter": {
              const t = this.creator.finish();
              return t
                ? ((this.editingId = t.id),
                  this.pushHistory(() => (this.shapes = this.shapes.concat(t))),
                  o["a"].DONE)
                : o["a"].DONE;
            }
            case "Escape":
              return this.creator.stop(), o["a"].DONE;
          }
        }
        getShapeAtPoint(t) {
          return this.getVisibleShapes().find((e) => this.hitTest(e, t));
        }
        closeToHandles(t) {
          const e = this.getEditingShape();
          if (!e) return !1;
          const n = this.getHandleRadius();
          return e.points.some((e) =>
            Object(a["a"])({ center: e, radius: n }, t)
          );
        }
        restoreSingleShape(t) {
          const e = t.points.filter(A["j"]),
            n = Object(A["f"])(e);
          return Object.assign(Object.assign({}, t), { points: e, center: n });
        }
        createFormPoints(t) {
          const e = {
            id: this.nextId(),
            points: t,
            alias: this.nextId(),
            center: Object(A["f"])(t),
          };
          this.pushHistory(() => {
            (this.shapes = this.shapes.concat(e)), (this.editingId = e.id);
          }),
            this.emitCreatorEvent("created", e);
        }
      }
      n("0ffa"), n("49d5"), n("742c");
      var j = n("fa2b");
      j["a"];
    },
    "5f96": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = i.aTypedArray,
        a = i.exportTypedArrayMethod,
        o = [].join;
      a("join", function (t) {
        return o.apply(r(this), arguments);
      });
    },
    "60bd": function (t, e, n) {
      "use strict";
      var i = n("da84"),
        r = n("ebb5"),
        a = n("e260"),
        o = n("b622"),
        s = o("iterator"),
        c = i.Uint8Array,
        l = a.values,
        d = a.keys,
        h = a.entries,
        u = r.aTypedArray,
        f = r.exportTypedArrayMethod,
        p = c && c.prototype[s],
        b = !!p && ("values" == p.name || void 0 == p.name),
        g = function () {
          return l.call(u(this));
        };
      f("entries", function () {
        return h.call(u(this));
      }),
        f("keys", function () {
          return d.call(u(this));
        }),
        f("values", g, !b),
        f(s, g, !b);
    },
    6166: function (t, e, n) {
      "use strict";
      n.d(e, "f", function () {
        return o;
      }),
        n.d(e, "e", function () {
          return s;
        }),
        n.d(e, "d", function () {
          return c;
        }),
        n.d(e, "b", function () {
          return l;
        }),
        n.d(e, "c", function () {
          return h;
        }),
        n.d(e, "h", function () {
          return u;
        }),
        n.d(e, "g", function () {
          return f;
        }),
        n.d(e, "a", function () {
          return p;
        });
      var i = n("a9a6"),
        r = n("864d"),
        a = n("d03e");
      function o(t, e, n) {
        if (!n) {
          const n = e;
          return o(t, i["a"], n);
        }
        return (t * n[0][0]) / e[0][0];
      }
      function s(t, e, n) {
        if (!n) {
          const n = e;
          return s(t, i["a"], n);
        }
        const { x: a, y: o } = t,
          c = i["c"](n, i["b"](e)),
          [l, d] = r["c"]([a, o, 1], c);
        return { x: l, y: d };
      }
      function c(t, e, n) {
        const i = s({ x: t.x1, y: t.y1 }, e, n),
          r = s({ x: t.x2, y: t.y2 }, e, n);
        return { x1: i.x, x2: r.x, y1: i.y, y2: r.y };
      }
      const l = (t, e) =>
          Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)),
        d = (t, e) => Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2),
        h = (t, e, n) => {
          const i = Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2);
          if (0 === i) return d(n, t);
          const r = Object(a["b"])(
            ((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / i,
            0,
            1
          );
          return d(n, { x: t.x + r * (e.x - t.x), y: t.y + r * (e.y - t.y) });
        },
        u = (t, e) => ({ x: t.x - e.x, y: t.y - e.y }),
        f = (t, e) => ({ x: t.x + e.x, y: t.y + e.y }),
        p = (t, e) => {
          const { width: n, height: i } = t,
            r = Math.min(e.width / n, e.height / i),
            a = (e.width - n * r) / 2,
            o = (e.height - i * r) / 2,
            s = [
              [1 / r, 0, -a / r],
              [0, 1 / r, -o / r],
              [0, 0, 1],
            ];
          return s;
        };
    },
    "621a": function (t, e, n) {
      "use strict";
      var i = n("da84"),
        r = n("83ab"),
        a = n("a981"),
        o = n("9112"),
        s = n("e2cc"),
        c = n("d039"),
        l = n("19aa"),
        d = n("a691"),
        h = n("50c4"),
        u = n("0b25"),
        f = n("77a7"),
        p = n("e163"),
        b = n("d2bb"),
        g = n("241c").f,
        v = n("9bf2").f,
        m = n("81d5"),
        y = n("d44e"),
        x = n("69f3"),
        w = x.get,
        _ = x.set,
        O = "ArrayBuffer",
        A = "DataView",
        k = "prototype",
        E = "Wrong length",
        j = "Wrong index",
        I = i[O],
        C = I,
        S = i[A],
        T = S && S[k],
        M = Object.prototype,
        R = i.RangeError,
        D = f.pack,
        L = f.unpack,
        N = function (t) {
          return [255 & t];
        },
        P = function (t) {
          return [255 & t, (t >> 8) & 255];
        },
        z = function (t) {
          return [255 & t, (t >> 8) & 255, (t >> 16) & 255, (t >> 24) & 255];
        },
        B = function (t) {
          return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0];
        },
        U = function (t) {
          return D(t, 23, 4);
        },
        H = function (t) {
          return D(t, 52, 8);
        },
        F = function (t, e) {
          v(t[k], e, {
            get: function () {
              return w(this)[e];
            },
          });
        },
        K = function (t, e, n, i) {
          var r = u(n),
            a = w(t);
          if (r + e > a.byteLength) throw R(j);
          var o = w(a.buffer).bytes,
            s = r + a.byteOffset,
            c = o.slice(s, s + e);
          return i ? c : c.reverse();
        },
        W = function (t, e, n, i, r, a) {
          var o = u(n),
            s = w(t);
          if (o + e > s.byteLength) throw R(j);
          for (
            var c = w(s.buffer).bytes, l = o + s.byteOffset, d = i(+r), h = 0;
            h < e;
            h++
          )
            c[l + h] = d[a ? h : e - h - 1];
        };
      if (a) {
        if (
          !c(function () {
            I(1);
          }) ||
          !c(function () {
            new I(-1);
          }) ||
          c(function () {
            return new I(), new I(1.5), new I(NaN), I.name != O;
          })
        ) {
          C = function (t) {
            return l(this, C), new I(u(t));
          };
          for (var Y, V = (C[k] = I[k]), G = g(I), Z = 0; G.length > Z; )
            (Y = G[Z++]) in C || o(C, Y, I[Y]);
          V.constructor = C;
        }
        b && p(T) !== M && b(T, M);
        var Q = new S(new C(2)),
          J = T.setInt8;
        Q.setInt8(0, 2147483648),
          Q.setInt8(1, 2147483649),
          (!Q.getInt8(0) && Q.getInt8(1)) ||
            s(
              T,
              {
                setInt8: function (t, e) {
                  J.call(this, t, (e << 24) >> 24);
                },
                setUint8: function (t, e) {
                  J.call(this, t, (e << 24) >> 24);
                },
              },
              { unsafe: !0 }
            );
      } else
        (C = function (t) {
          l(this, C, O);
          var e = u(t);
          _(this, { bytes: m.call(new Array(e), 0), byteLength: e }),
            r || (this.byteLength = e);
        }),
          (S = function (t, e, n) {
            l(this, S, A), l(t, C, A);
            var i = w(t).byteLength,
              a = d(e);
            if (a < 0 || a > i) throw R("Wrong offset");
            if (((n = void 0 === n ? i - a : h(n)), a + n > i)) throw R(E);
            _(this, { buffer: t, byteLength: n, byteOffset: a }),
              r ||
                ((this.buffer = t),
                (this.byteLength = n),
                (this.byteOffset = a));
          }),
          r &&
            (F(C, "byteLength"),
            F(S, "buffer"),
            F(S, "byteLength"),
            F(S, "byteOffset")),
          s(S[k], {
            getInt8: function (t) {
              return (K(this, 1, t)[0] << 24) >> 24;
            },
            getUint8: function (t) {
              return K(this, 1, t)[0];
            },
            getInt16: function (t) {
              var e = K(
                this,
                2,
                t,
                arguments.length > 1 ? arguments[1] : void 0
              );
              return (((e[1] << 8) | e[0]) << 16) >> 16;
            },
            getUint16: function (t) {
              var e = K(
                this,
                2,
                t,
                arguments.length > 1 ? arguments[1] : void 0
              );
              return (e[1] << 8) | e[0];
            },
            getInt32: function (t) {
              return B(
                K(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)
              );
            },
            getUint32: function (t) {
              return (
                B(
                  K(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)
                ) >>> 0
              );
            },
            getFloat32: function (t) {
              return L(
                K(this, 4, t, arguments.length > 1 ? arguments[1] : void 0),
                23
              );
            },
            getFloat64: function (t) {
              return L(
                K(this, 8, t, arguments.length > 1 ? arguments[1] : void 0),
                52
              );
            },
            setInt8: function (t, e) {
              W(this, 1, t, N, e);
            },
            setUint8: function (t, e) {
              W(this, 1, t, N, e);
            },
            setInt16: function (t, e) {
              W(this, 2, t, P, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setUint16: function (t, e) {
              W(this, 2, t, P, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setInt32: function (t, e) {
              W(this, 4, t, z, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setUint32: function (t, e) {
              W(this, 4, t, z, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setFloat32: function (t, e) {
              W(this, 4, t, U, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setFloat64: function (t, e) {
              W(this, 8, t, H, e, arguments.length > 2 ? arguments[2] : void 0);
            },
          });
      y(C, O), y(S, A), (t.exports = { ArrayBuffer: C, DataView: S });
    },
    "649e": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").some,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("some", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    "676b": function (t, e, n) {
      var i = n("24fb"),
        r = n("1de5"),
        a = n("7ce7"),
        o = n("1e34"),
        s = n("6e42"),
        c = n("fc4e"),
        l = n("8e71"),
        d = n("4dac"),
        h = n("d30f"),
        u = n("7c04"),
        f = n("767d"),
        p = n("3273"),
        b = n("dae3"),
        g = n("a2d3");
      e = i(!1);
      var v = r(a),
        m = r(o),
        y = r(s),
        x = r(c),
        w = r(l),
        _ = r(d),
        O = r(h),
        A = r(u),
        k = r(f),
        E = r(p),
        j = r(b),
        I = r(g);
      e.push([
        t.i,
        ".vis-annotator[data-v-6da74332]{position:relative}.vis-annotator[data-v-6da74332],.vis-annotator_editor[data-v-6da74332]{width:100%;height:100%}.vis-annotator_editor.cancelled[data-v-6da74332]  .dot-predictor_active,.vis-annotator_editor.confirmed[data-v-6da74332]  .dot-predictor_active,.vis-annotator_editor.predicted[data-v-6da74332]  .dot-predictor_active,.vis-annotator_editor.predictfail[data-v-6da74332]  .dot-predictor_active{cursor:url(" +
          v +
          ") 3 0,default}.vis-annotator_editor.positive[data-v-6da74332]  .dot-predictor_active{cursor:url(" +
          m +
          "),default}.vis-annotator_editor.negative[data-v-6da74332]  .dot-predictor_active{cursor:url(" +
          y +
          "),default}.vis-annotator_editor.predicting[data-v-6da74332]  .dot-predictor_active{cursor:wait}.vis-annotator_editor[data-v-6da74332]  .mover_active{cursor:-webkit-grab;cursor:grab}.vis-annotator_editor[data-v-6da74332]  .mover_moving{cursor:-webkit-grabbing;cursor:grabbing}.vis-annotator_editor[data-v-6da74332]  .zoomer_in-active,.vis-annotator_editor[data-v-6da74332]  .zoomer_out-active{cursor:zoom-in}.vis-annotator_editor[data-v-6da74332]  .polygon_active{cursor:crosshair}.vis-annotator_editor[data-v-6da74332]  .brush_add-active{cursor:url(" +
          x +
          ") 16 16,url(" +
          w +
          ") 16 16,url(" +
          _ +
          ") 16 16,default}.vis-annotator_editor[data-v-6da74332]  .brush_del-active{cursor:url(" +
          O +
          ") 16 16,url(" +
          A +
          ") 16 16,url(" +
          k +
          ") 16 16,default}.vis-annotator_editor[data-v-6da74332]  .move{cursor:move}.vis-annotator_editor[data-v-6da74332]  .resizing{cursor:url(" +
          E +
          "),url(" +
          j +
          "),url(" +
          I +
          "),default}.vis-annotator_editor[data-v-6da74332]  .handle{cursor:pointer}.vis-annotator_editor[data-v-6da74332]  .activate{cursor:cell}.vis-annotator_loading-mask[data-v-6da74332]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center}",
        "",
      ]),
        (t.exports = e);
    },
    "69af": function (t, e, n) {
      "use strict";
      n.d(e, "c", function () {
        return o;
      }),
        n.d(e, "b", function () {
          return s;
        }),
        n.d(e, "d", function () {
          return c;
        }),
        n.d(e, "a", function () {
          return l;
        });
      var i = n("eab8");
      const r = (t, e) =>
          t.length === e.length && t.every((t, n) => e[n] === t),
        a = { shallow: !0, debug: !1 };
      function o(t, e, n = {}) {
        const o = Object.assign(Object.assign({}, a), n);
        let s,
          c = void 0;
        const l = o.eq || (o.shallow ? r : i["a"]);
        return function (...n) {
          const i = t(...n);
          return (
            (c && l(i, c)) ||
              (o.debug && console.log("changed", c, i),
              (c = i),
              (s = e.apply(this, i))),
            s
          );
        };
      }
      function s(t, e) {
        let n = void 0,
          r = void 0;
        const a = e || i["a"],
          o = (...t) => null == n || !a(t, n);
        return (...e) => (o(...e) && ((n = e), (r = t(...e))), r);
      }
      function c(t, e = { stopped: !1 }) {
        const n = new MessageChannel(),
          i = n.port2;
        return new Promise((r) => {
          (n.port1.onmessage = () => {
            n.port1.close(), n.port2.close(), e.stopped || (t(), r());
          }),
            i.postMessage("");
        });
      }
      const l = (t, e) => {
        let n;
        return () => {
          clearTimeout(n), (n = setTimeout(t, e));
        };
      };
    },
    "69f0": function (t, e, n) {
      var i = n("0d84");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("614d980a", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    "6cf4": function (t, e, n) {
      t.exports = n.p + "img/tool-hover.231de796.svg";
    },
    "6e42": function (t, e, n) {
      t.exports = n.p + "img/negative.15283cc9.svg";
    },
    "6f53": function (t, e, n) {
      var i = n("83ab"),
        r = n("df75"),
        a = n("fc6a"),
        o = n("d1e7").f,
        s = function (t) {
          return function (e) {
            var n,
              s = a(e),
              c = r(s),
              l = c.length,
              d = 0,
              h = [];
            while (l > d)
              (n = c[d++]),
                (i && !o.call(s, n)) || h.push(t ? [n, s[n]] : s[n]);
            return h;
          };
        };
      t.exports = { entries: s(!0), values: s(!1) };
    },
    7018: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return h;
      }),
        n.d(e, "c", function () {
          return u;
        }),
        n.d(e, "b", function () {
          return at;
        });
      n("a4d3"), n("e01a"), n("45fc"), n("d3b7");
      var i = n("5530"),
        r = n("d4ec"),
        a = n("bee2"),
        o = n("262e"),
        s = n("2caf"),
        c = n("9ab4"),
        l = n("2841"),
        d = (function (t) {
          Object(o["a"])(n, t);
          var e = Object(s["a"])(n);
          function n() {
            var t;
            return (
              Object(r["a"])(this, n),
              (t = e.apply(this, arguments)),
              (t.state = {
                projectType: null,
                speed: Object(i["a"])(
                  Object(i["a"])({}, new O()),
                  {},
                  { enable: !0 }
                ),
                guideline: new O(),
                magnifier: new O(),
                labelHidden: new O(),
                addonState: new A(),
              }),
              (t.initialized = !1),
              (t.animationKey = null),
              (t.handleWrapperMouseMove = function (e) {
                if (t.editorWrapper) {
                  var n = function () {
                    var n = t.editorWrapper.getBoundingClientRect(),
                      i = n.x,
                      r = n.y,
                      a = n.width,
                      o = n.height;
                    (t.state.addonState.mouse = {
                      clientX: e.clientX,
                      clientY: e.clientY,
                      x: e.clientX - i,
                      y: e.clientY - r,
                    }),
                      (t.state.addonState.rectangle = {
                        x: i,
                        y: r,
                        width: a,
                        height: o,
                      }),
                      (t.state.magnifier.visible = !0),
                      (t.state.guideline.visible = !0),
                      t.updateImageState();
                  };
                  t.animationKey && cancelAnimationFrame(t.animationKey),
                    (t.animationKey = requestAnimationFrame(n));
                }
              }),
              (t.handleWrapperMouseOut = function () {
                (t.state.guideline.visible = !1),
                  (t.state.magnifier.visible = !1);
              }),
              t
            );
          }
          return (
            Object(a["a"])(n, [
              {
                key: "initialize",
                value: function () {
                  return (
                    this.initialized || ((this.initialized = !0), _()), this
                  );
                },
              },
              {
                key: "getAnnotatorData",
                value: function () {
                  if (this.annotatorControl) {
                    var t = this.annotatorControl.contextManager.context,
                      e = t.facts,
                      n = t.resource;
                    return {
                      resCoord: e.coord.res,
                      scale: e.coord.res[0][0] / e.coord.dom[0][0],
                      src: n.src,
                      width: n.resolution.width,
                      height: n.resolution.height,
                    };
                  }
                  var i = this.editor.stateTree;
                  return {
                    resCoord: i.coord.res,
                    scale: i.interactionFactor,
                    src: i.src,
                    width: i.width,
                    height: i.height,
                  };
                },
              },
              {
                key: "updateImageState",
                value: function () {
                  if (this.editor || this.annotatorControl) {
                    var t = this.state.magnifier,
                      e = [t.enable, t.on, t.visible].some(function (t) {
                        return !t;
                      });
                    if (!e) {
                      var n = this.getAnnotatorData(),
                        i = n.resCoord,
                        r = n.scale,
                        a = n.src,
                        o = n.width,
                        s = n.height,
                        c = this.state.addonState;
                      (c.image.src = a),
                        (c.image.width = o / r),
                        (c.image.height = s / r),
                        (c.image.point = {
                          x: c.mouse.x + i[0][2] / r,
                          y: c.mouse.y + i[1][2] / r,
                        });
                    }
                  }
                },
              },
              {
                key: "syncAnnotatorConfig",
                value: function () {
                  var t = this.annotatorControl,
                    e = this.editor,
                    n = this.state;
                  n.labelHidden.enable &&
                    (t &&
                      t.updateConfig({ alwaysShowLabel: !n.labelHidden.on }),
                    e && (e.showLabel = !n.labelHidden.on));
                },
              },
              {
                key: "dispose",
                value: function () {
                  var t, e;
                  null === (t = this.editorWrapper) ||
                    void 0 === t ||
                    t.removeEventListener(
                      "mousemove",
                      this.handleWrapperMouseMove
                    ),
                    null === (e = this.editorWrapper) ||
                      void 0 === e ||
                      e.removeEventListener(
                        "mouseout",
                        this.handleWrapperMouseOut
                      );
                },
              },
              {
                key: "editor",
                get: function () {
                  return this._editor;
                },
                set: function (t) {
                  (this._editor = t), this.syncAnnotatorConfig();
                },
              },
              {
                key: "annotatorControl",
                get: function () {
                  return this._annotatorControl;
                },
                set: function (t) {
                  (this._annotatorControl = t), this.syncAnnotatorConfig();
                },
              },
              {
                key: "editorWrapper",
                get: function () {
                  return this._editorWrapper;
                },
                set: function (t) {
                  this._editorWrapper !== t &&
                    (this.dispose(),
                    (this._editorWrapper = t),
                    this._editorWrapper.addEventListener(
                      "mousemove",
                      this.handleWrapperMouseMove
                    ),
                    this._editorWrapper.addEventListener(
                      "mouseout",
                      this.handleWrapperMouseOut
                    ));
                },
              },
            ]),
            n
          );
        })(l["svc"].ServiceBase);
      d = Object(c["a"])([l["svc"].ServiceDecorator], d);
      var h = Symbol(),
        u = l["svc"].createUseService(d, h),
        f = n("8165"),
        p = n("e1ec"),
        b = n("524c");
      function g() {
        var t = u(),
          e = Object(b["a"])();
        Object(f["watch"])(
          function () {
            return e.value;
          },
          function () {
            var n;
            e.value &&
              (t.state.speed.on =
                null === (n = e.value) || void 0 === n
                  ? void 0
                  : n.useSpeedView().value);
          },
          { immediate: !0 }
        ),
          Object(f["watch"])(
            [
              function () {
                return t.state.speed.on;
              },
              function () {
                return e.value;
              },
            ],
            function () {
              e.value && (e.value.useSpeedView().value = t.state.speed.on);
            }
          );
      }
      function v() {
        var t = u(),
          e = Object(p["a"])();
        Object(f["watch"])(
          function () {
            return e.projectType;
          },
          function (e) {
            t.state.projectType = e;
          },
          { immediate: !0 }
        );
      }
      function m() {
        var t = u(),
          e = Object(b["a"])();
        Object(f["watch"])(
          [
            function () {
              return t.state.projectType;
            },
            function () {
              return e.value;
            },
          ],
          function () {
            var n = t.state.projectType;
            if (n && e.value) {
              var i = e.value.enums.EProjectType;
              (t.state.magnifier.enable = n === i.IMG_SEG),
                (t.state.guideline.enable = n === i.OBJ_DCT),
                (t.state.labelHidden.enable = [
                  i.OBJ_DCT,
                  i.IMG_SEG,
                  i.IMG_MIXED,
                  i.IMG_POINT,
                  i.IMG_POLYLINE,
                  i.IMG_CUBOID,
                ].some(function (t) {
                  return t === n;
                }));
            }
          },
          { immediate: !0 }
        );
      }
      function y() {
        var t = u();
        Object(f["watch"])(
          function () {
            return t.state.labelHidden.on;
          },
          function () {
            t.syncAnnotatorConfig();
          },
          { immediate: !0 }
        );
      }
      function x() {
        var t = u(),
          e = "ADDON_MAGNIFIER_ON",
          n = "ADDON_GUIDELINE_ON",
          i = "ADDON_LABELHIDDEN_ON";
        (t.state.magnifier.on = !!localStorage[e]),
          (t.state.guideline.on = !!localStorage[n]),
          (t.state.labelHidden.on = !!localStorage[i]),
          Object(f["watch"])(
            function () {
              return t.state.magnifier.on;
            },
            function (t) {
              t ? localStorage.setItem(e, e) : localStorage.removeItem(e);
            },
            { immediate: !0 }
          ),
          Object(f["watch"])(
            function () {
              return t.state.guideline.on;
            },
            function (t) {
              t ? localStorage.setItem(n, n) : localStorage.removeItem(n);
            },
            { immediate: !0 }
          ),
          Object(f["watch"])(
            function () {
              return t.state.labelHidden.on;
            },
            function (t) {
              t ? localStorage.setItem(i, i) : localStorage.removeItem(i);
            },
            { immediate: !0 }
          );
      }
      function w() {
        var t = u();
        Object(f["onBeforeUnmount"])(function () {
          t.dispose();
        });
      }
      function _() {
        g(), v(), m(), y(), x(), w();
      }
      var O = function t() {
          Object(r["a"])(this, t),
            (this.enable = !1),
            (this.on = !1),
            (this.visible = !1);
        },
        A = function t() {
          Object(r["a"])(this, t),
            (this.rectangle = { x: 0, y: 0, width: 0, height: 0 }),
            (this.mouse = { x: 0, y: 0, clientX: 0, clientY: 0 }),
            (this.image = {
              src: "",
              width: 0,
              height: 0,
              point: { x: 0, y: 0 },
            });
        },
        k = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              directives: [
                {
                  name: "click-outside",
                  rawName: "v-click-outside",
                  value: function () {
                    return (t.state.visible = !1);
                  },
                  expression: "() => (state.visible = false)",
                },
              ],
              staticClass: "addon-ctl",
              class: { visible: t.state.visible },
            },
            [
              n("AddonTip"),
              n(
                "the-tip",
                {
                  staticClass: "ctl-tip",
                  attrs: {
                    placement: "bottom-start",
                    visible: t.state.visible,
                  },
                },
                [
                  n(
                    "div",
                    {
                      staticClass: "inner-wrap",
                      on: {
                        click: function (e) {
                          t.state.visible = !t.state.visible;
                        },
                      },
                    },
                    [
                      n("div", { staticClass: "tool" }),
                      n("div", { staticClass: "content" }, [t._v("辅助设置")]),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "popper-wrap",
                      attrs: { slot: "popper" },
                      slot: "popper",
                    },
                    [
                      t.astate.speed.enable
                        ? n(
                            "the-checkbox",
                            {
                              model: {
                                value: t.astate.speed.on,
                                callback: function (e) {
                                  t.$set(t.astate.speed, "on", e);
                                },
                                expression: "astate.speed.on",
                              },
                            },
                            [t._v(" 极速预览模式 ")]
                          )
                        : t._e(),
                      t.astate.guideline.enable && !t.advState.enabled
                        ? n(
                            "the-checkbox",
                            {
                              model: {
                                value: t.astate.guideline.on,
                                callback: function (e) {
                                  t.$set(t.astate.guideline, "on", e);
                                },
                                expression: "astate.guideline.on",
                              },
                            },
                            [t._v(" 标注辅助线 ")]
                          )
                        : t._e(),
                      t.astate.magnifier.enable && !t.advState.enabled
                        ? n(
                            "the-checkbox",
                            {
                              model: {
                                value: t.astate.magnifier.on,
                                callback: function (e) {
                                  t.$set(t.astate.magnifier, "on", e);
                                },
                                expression: "astate.magnifier.on",
                              },
                            },
                            [t._v(" 标注放大镜 ")]
                          )
                        : t._e(),
                      t.astate.labelHidden.enable && !t.advState.enabled
                        ? n(
                            "the-checkbox",
                            {
                              model: {
                                value: t.astate.labelHidden.on,
                                callback: function (e) {
                                  t.$set(t.astate.labelHidden, "on", e);
                                },
                                expression: "astate.labelHidden.on",
                              },
                            },
                            [t._v(" 默认隐藏标签 ")]
                          )
                        : t._e(),
                    ],
                    1
                  ),
                ]
              ),
              t.astate.magnifier.enable && t.astate.magnifier.on
                ? n("AddonMagnifier", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.astate.magnifier.visible,
                        expression: "astate.magnifier.visible",
                      },
                    ],
                    attrs: { state: t.astate.addonState },
                  })
                : t._e(),
              t.astate.guideline.enable && t.astate.guideline.on
                ? n("AddonGuideline", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.astate.guideline.visible,
                        expression: "astate.guideline.visible",
                      },
                    ],
                    attrs: { state: t.astate.addonState },
                  })
                : t._e(),
            ],
            1
          );
        },
        E = [],
        j = n("fd1b"),
        I = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            { staticClass: "addon-guideline", style: t.wrapStyle },
            [
              n("div", { staticClass: "guideline x", style: t.stylex }),
              n("div", { staticClass: "guideline y", style: t.styley }),
            ]
          );
        },
        C = [],
        S = Object(f["defineComponent"])({
          props: {
            state: {
              type: Object,
              default: function () {
                return new A();
              },
            },
          },
          setup: function (t) {
            var e = Object(f["computed"])(function () {
                var e = t.state;
                return {
                  left: e.rectangle.x + "px",
                  top: e.rectangle.y + "px",
                };
              }),
              n = Object(f["computed"])(function () {
                var e = t.state;
                return {
                  width: e.rectangle.width + "px",
                  height: "1px",
                  left: 0,
                  top: e.mouse.y + "px",
                };
              }),
              i = Object(f["computed"])(function () {
                var e = t.state;
                return {
                  width: "1px",
                  height: e.rectangle.height + "px",
                  top: 0,
                  left: e.mouse.x + "px",
                };
              });
            return { wrapStyle: e, stylex: n, styley: i };
          },
        }),
        T = S,
        M = (n("eb1c"), n("2877")),
        R = Object(M["a"])(T, I, C, !1, null, "63911548", null),
        D = R.exports,
        L = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", { ref: "wrapper", staticClass: "addon-magnifier" }, [
            n("div", { ref: "rectWrapper", staticClass: "rect-wrap" }, [
              n("img", { ref: "image", staticClass: "rect-image" }),
            ]),
            n("div", { ref: "rectLabel", staticClass: "rect-label" }),
          ]);
        },
        N = [];
      n("99af"),
        n("4160"),
        n("a15b"),
        n("d81d"),
        n("a9e3"),
        n("b64b"),
        n("159b");
      function P(t) {
        return (
          Object.keys(t).forEach(function (e) {
            "number" === typeof t[e] && (t[e] = t[e] + "px");
          }),
          t
        );
      }
      function z(t) {
        return (
          t.left &&
            t.top &&
            ((t.transform = "translate3d("
              .concat(t.left, ",")
              .concat(t.top, ",0)")),
            delete t.left,
            delete t.top),
          Object.keys(t)
            .map(function (e) {
              return "".concat(e, ":").concat(t[e]);
            })
            .join(";")
        );
      }
      function B(t) {
        return { left: t.rectangle.x + "px", top: t.rectangle.y + "px" };
      }
      var U = 24;
      function H(t, e) {
        var n = t.mouse,
          i = 6,
          r = {
            left: n.x - e.width - i,
            top: n.y - e.height - i,
            width: e.width,
            height: e.height,
          },
          a = {
            left: r.left,
            top: r.top - U,
            width: e.width,
            height: U,
            "line-height": U,
          };
        return (
          n.x < e.width + i &&
            ((r.left += e.width + 2 * i), (a.left += e.width + 2 * i)),
          n.y < e.height + i + U &&
            ((r.top += e.height + 2 * i), (a.top = r.top + r.height)),
          { rect: P(r), label: P(a) }
        );
      }
      function F(t, e, n) {
        var i = t.image;
        return P({
          width: i.width * e,
          height: i.height * e,
          left: -i.point.x * e + n.width / 2,
          top: -i.point.y * e + n.height / 2,
        });
      }
      var K = Object(f["defineComponent"])({
          props: {
            state: {
              type: Object,
              default: function () {
                return new A();
              },
            },
            limit: {
              type: Object,
              default: function () {
                return { width: 120, height: 120 };
              },
            },
            scale: { type: Number, default: 2 },
          },
          setup: function (t) {
            var e = Object(f["ref"])(null),
              n = Object(f["ref"])(null),
              i = Object(f["ref"])(null),
              r = Object(f["ref"])(null);
            function a() {
              var a = t.state,
                o = t.limit,
                s = t.scale,
                c = B(a);
              e.value && (e.value.style.cssText = z(c));
              var l = H(a, o),
                d = l.rect,
                h = l.label;
              n.value && (n.value.style.cssText = z(d)),
                i.value &&
                  ((i.value.style.cssText = z(h)),
                  (i.value.textContent = "坐标: ( "
                    .concat(~~a.mouse.x, " , ")
                    .concat(~~a.mouse.y, " )")));
              var u = F(a, s, o);
              r.value &&
                ((r.value.style.cssText = z(u)), (r.value.src = a.image.src));
            }
            return (
              Object(f["watch"])(
                [
                  function () {
                    return t.state;
                  },
                  function () {
                    return t.limit;
                  },
                  function () {
                    return t.scale;
                  },
                ],
                a,
                { deep: !0 }
              ),
              { wrapper: e, rectWrapper: n, rectLabel: i, image: r }
            );
          },
        }),
        W = K,
        Y = (n("0a8e"), Object(M["a"])(W, L, N, !1, null, "1a5380c0", null)),
        V = Y.exports,
        G = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.visible
            ? n(
                "div",
                { staticClass: "addon-tip" },
                [
                  n("div", { staticClass: "notify-point" }),
                  n(
                    "the-tip",
                    { attrs: { placement: "bottom", visible: !0 } },
                    [
                      n("div", { staticClass: "inner-wrap" }),
                      n(
                        "div",
                        {
                          staticClass: "popper-wrap",
                          attrs: { slot: "popper" },
                          slot: "popper",
                        },
                        [
                          n("div", { staticClass: "tip-title" }, [
                            t._v("辅助设置增加新功能了"),
                          ]),
                          n(
                            "div",
                            { staticClass: "tip-list" },
                            t._l(t.tips, function (e, i) {
                              return n(
                                "div",
                                { key: i, staticClass: "tip-item" },
                                [
                                  n("div", { staticClass: "tip-point" }),
                                  n("div", { staticClass: "tip-content" }, [
                                    t._v(t._s(e.label)),
                                  ]),
                                ]
                              );
                            }),
                            0
                          ),
                          n(
                            "div",
                            { staticClass: "btn-wrap" },
                            [
                              n(
                                "eg-button",
                                {
                                  attrs: { type: "primary", size: "s" },
                                  on: {
                                    click: function (e) {
                                      t.visible = !1;
                                    },
                                  },
                                },
                                [t._v("知道了")]
                              ),
                            ],
                            1
                          ),
                        ]
                      ),
                    ]
                  ),
                ],
                1
              )
            : t._e();
        },
        Z = [],
        Q = (n("4de4"), "ADDON_CTL_USED"),
        J = "ADDON_CTL_USED_V2";
      function X() {
        var t = !localStorage[Q],
          e = Object(f["ref"])(!localStorage[J]);
        return (
          Object(f["watch"])(
            function () {
              return e.value;
            },
            function (t) {
              t ? localStorage.removeItem(J) : localStorage.setItem(J, J);
            }
          ),
          { v1: t, v2: e }
        );
      }
      var $ = Object(f["defineComponent"])({
          setup: function () {
            var t = u(),
              e = X(),
              n = Object(f["computed"])(function () {
                var n = [
                    { label: "极速预览模式", enable: t.state.speed.enable },
                    { label: "标注辅助线", enable: t.state.guideline.enable },
                    { label: "标注放大镜", enable: t.state.magnifier.enable },
                  ],
                  i = [
                    {
                      label: "默认隐藏标签",
                      enable: t.state.labelHidden.enable,
                    },
                  ];
                return e.v1
                  ? n.concat(i).filter(function (t) {
                      return t.enable;
                    })
                  : i.filter(function (t) {
                      return t.enable;
                    });
              });
            return { visible: e.v2, tips: n };
          },
        }),
        q = $,
        tt = (n("9c6a"), Object(M["a"])(q, G, Z, !1, null, "6efc3e36", null)),
        et = tt.exports,
        nt = Object(f["defineComponent"])({
          components: { AddonTip: et, AddonMagnifier: V, AddonGuideline: D },
          setup: function () {
            var t = u(),
              e = Object(f["reactive"])({ visible: !1 }),
              n = Object(j["a"])();
            return { state: e, astate: t.state, advState: n.state };
          },
        }),
        it = nt,
        rt = (n("2f83"), Object(M["a"])(it, k, E, !1, null, "9978f844", null)),
        at = rt.exports;
    },
    "71f0": function (t, e, n) {
      "use strict";
      var i = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.needThis
            ? n(
                "AnnotatorTip",
                { staticClass: "floating-txt-new", style: t.style },
                [
                  n("template", { slot: "body" }, [
                    t._v(" 按“ESC”取消绘制；"),
                    n("br"),
                    t._v(" 按“" + t._s(t.command) + "+鼠标滚轮”放大缩小图片；"),
                    n("br"),
                    t._v(" 按“" + t._s(t.control) + "+Z”撤销锚点"),
                    n("br"),
                  ]),
                  n(
                    "div",
                    {
                      staticClass: "floating-txt-new-opts",
                      attrs: { slot: "footer" },
                      slot: "footer",
                    },
                    [
                      n("the-link", { on: { click: t.handleNoMoreClick } }, [
                        t._v("不再提示 "),
                      ]),
                    ],
                    1
                  ),
                ],
                2
              )
            : t._e();
        },
        r = [],
        a = n("8165"),
        o = n("8ed7"),
        s = n("0195"),
        c = n("95c1"),
        l = "NO_MORE_FLOATIING_TXT",
        d = Object(a["defineComponent"])({
          components: { AnnotatorTip: s["a"] },
          props: {
            mouse: {
              type: Object,
              default: function () {
                return { x: 0, y: 0 };
              },
            },
            cacheKey: { type: String, default: "" },
          },
          setup: function (t) {
            var e = Object(c["a"])(t.mouse),
              n = Object(a["computed"])(function () {
                return l + t.cacheKey;
              }),
              i = Object(a["ref"])(!localStorage[n.value]);
            return {
              style: e,
              command: Object(o["a"])().isMac ? "Command" : "Ctrl",
              control: Object(o["a"])().isMac ? "Control" : "Ctrl",
              needThis: i,
              handleNoMoreClick: function () {
                localStorage.setItem(n.value, n.value), (i.value = !1);
              },
            };
          },
        }),
        h = d,
        u = n("2877"),
        f = Object(u["a"])(h, i, r, !1, null, null, null);
      e["a"] = f.exports;
    },
    "72f7": function (t, e, n) {
      "use strict";
      var i = n("ebb5").exportTypedArrayMethod,
        r = n("d039"),
        a = n("da84"),
        o = a.Uint8Array,
        s = (o && o.prototype) || {},
        c = [].toString,
        l = [].join;
      r(function () {
        c.call({});
      }) &&
        (c = function () {
          return l.call(this);
        });
      var d = s.toString != c;
      i("toString", c, d);
    },
    "735e": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("81d5"),
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("fill", function (t) {
        return r.apply(a(this), arguments);
      });
    },
    "742c": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return u;
      }),
        n.d(e, "b", function () {
          return f;
        }),
        n.d(e, "c", function () {
          return p;
        });
      var i = n("e0fb");
      const r = "dot-predictor",
        a = [r, r + "_positive"],
        o = [r, r + "_negative"],
        s = [r + "_focus"],
        c = [r + "_mask"],
        l = (t, e) => ({ type: "dot", class: e.className, data: t }),
        d = (t) => l(t, { className: o }),
        h = (t) => l(t, { className: a }),
        u = (t) => (t.type === i["a"].Negative ? d(t) : h(t)),
        f = (t) => ({ type: "focus", class: s, data: t }),
        p = (t, e, n) => {
          const i = e.x2 - e.x1 + 1,
            r = e.y2 - e.y1 + 1;
          return {
            cacheId: n,
            type: "bitmap",
            class: c,
            data: { bitmap: t, width: i, height: r, target: e },
          };
        };
    },
    "74e8": function (t, e, n) {
      "use strict";
      var i = n("23e7"),
        r = n("da84"),
        a = n("83ab"),
        o = n("8aa7"),
        s = n("ebb5"),
        c = n("621a"),
        l = n("19aa"),
        d = n("5c6c"),
        h = n("9112"),
        u = n("50c4"),
        f = n("0b25"),
        p = n("182d"),
        b = n("c04e"),
        g = n("5135"),
        v = n("f5df"),
        m = n("861d"),
        y = n("7c73"),
        x = n("d2bb"),
        w = n("241c").f,
        _ = n("a078"),
        O = n("b727").forEach,
        A = n("2626"),
        k = n("9bf2"),
        E = n("06cf"),
        j = n("69f3"),
        I = n("7156"),
        C = j.get,
        S = j.set,
        T = k.f,
        M = E.f,
        R = Math.round,
        D = r.RangeError,
        L = c.ArrayBuffer,
        N = c.DataView,
        P = s.NATIVE_ARRAY_BUFFER_VIEWS,
        z = s.TYPED_ARRAY_TAG,
        B = s.TypedArray,
        U = s.TypedArrayPrototype,
        H = s.aTypedArrayConstructor,
        F = s.isTypedArray,
        K = "BYTES_PER_ELEMENT",
        W = "Wrong length",
        Y = function (t, e) {
          var n = 0,
            i = e.length,
            r = new (H(t))(i);
          while (i > n) r[n] = e[n++];
          return r;
        },
        V = function (t, e) {
          T(t, e, {
            get: function () {
              return C(this)[e];
            },
          });
        },
        G = function (t) {
          var e;
          return (
            t instanceof L ||
            "ArrayBuffer" == (e = v(t)) ||
            "SharedArrayBuffer" == e
          );
        },
        Z = function (t, e) {
          return (
            F(t) && "symbol" != typeof e && e in t && String(+e) == String(e)
          );
        },
        Q = function (t, e) {
          return Z(t, (e = b(e, !0))) ? d(2, t[e]) : M(t, e);
        },
        J = function (t, e, n) {
          return !(Z(t, (e = b(e, !0))) && m(n) && g(n, "value")) ||
            g(n, "get") ||
            g(n, "set") ||
            n.configurable ||
            (g(n, "writable") && !n.writable) ||
            (g(n, "enumerable") && !n.enumerable)
            ? T(t, e, n)
            : ((t[e] = n.value), t);
        };
      a
        ? (P ||
            ((E.f = Q),
            (k.f = J),
            V(U, "buffer"),
            V(U, "byteOffset"),
            V(U, "byteLength"),
            V(U, "length")),
          i(
            { target: "Object", stat: !0, forced: !P },
            { getOwnPropertyDescriptor: Q, defineProperty: J }
          ),
          (t.exports = function (t, e, n) {
            var a = t.match(/\d+$/)[0] / 8,
              s = t + (n ? "Clamped" : "") + "Array",
              c = "get" + t,
              d = "set" + t,
              b = r[s],
              g = b,
              v = g && g.prototype,
              k = {},
              E = function (t, e) {
                var n = C(t);
                return n.view[c](e * a + n.byteOffset, !0);
              },
              j = function (t, e, i) {
                var r = C(t);
                n && (i = (i = R(i)) < 0 ? 0 : i > 255 ? 255 : 255 & i),
                  r.view[d](e * a + r.byteOffset, i, !0);
              },
              M = function (t, e) {
                T(t, e, {
                  get: function () {
                    return E(this, e);
                  },
                  set: function (t) {
                    return j(this, e, t);
                  },
                  enumerable: !0,
                });
              };
            P
              ? o &&
                ((g = e(function (t, e, n, i) {
                  return (
                    l(t, g, s),
                    I(
                      (function () {
                        return m(e)
                          ? G(e)
                            ? void 0 !== i
                              ? new b(e, p(n, a), i)
                              : void 0 !== n
                              ? new b(e, p(n, a))
                              : new b(e)
                            : F(e)
                            ? Y(g, e)
                            : _.call(g, e)
                          : new b(f(e));
                      })(),
                      t,
                      g
                    )
                  );
                })),
                x && x(g, B),
                O(w(b), function (t) {
                  t in g || h(g, t, b[t]);
                }),
                (g.prototype = v))
              : ((g = e(function (t, e, n, i) {
                  l(t, g, s);
                  var r,
                    o,
                    c,
                    d = 0,
                    h = 0;
                  if (m(e)) {
                    if (!G(e)) return F(e) ? Y(g, e) : _.call(g, e);
                    (r = e), (h = p(n, a));
                    var b = e.byteLength;
                    if (void 0 === i) {
                      if (b % a) throw D(W);
                      if (((o = b - h), o < 0)) throw D(W);
                    } else if (((o = u(i) * a), o + h > b)) throw D(W);
                    c = o / a;
                  } else (c = f(e)), (o = c * a), (r = new L(o));
                  S(t, {
                    buffer: r,
                    byteOffset: h,
                    byteLength: o,
                    length: c,
                    view: new N(r),
                  });
                  while (d < c) M(t, d++);
                })),
                x && x(g, B),
                (v = g.prototype = y(U))),
              v.constructor !== g && h(v, "constructor", g),
              z && h(v, z, s),
              (k[s] = g),
              i({ global: !0, forced: g != b, sham: !P }, k),
              K in g || h(g, K, a),
              K in v || h(v, K, a),
              A(s);
          }))
        : (t.exports = function () {});
    },
    "767d": function (t, e, n) {
      t.exports = n.p + "img/erase.07da76aa.cur";
    },
    "77a7": function (t, e) {
      var n = 1 / 0,
        i = Math.abs,
        r = Math.pow,
        a = Math.floor,
        o = Math.log,
        s = Math.LN2,
        c = function (t, e, c) {
          var l,
            d,
            h,
            u = new Array(c),
            f = 8 * c - e - 1,
            p = (1 << f) - 1,
            b = p >> 1,
            g = 23 === e ? r(2, -24) - r(2, -77) : 0,
            v = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0,
            m = 0;
          for (
            t = i(t),
              t != t || t === n
                ? ((d = t != t ? 1 : 0), (l = p))
                : ((l = a(o(t) / s)),
                  t * (h = r(2, -l)) < 1 && (l--, (h *= 2)),
                  (t += l + b >= 1 ? g / h : g * r(2, 1 - b)),
                  t * h >= 2 && (l++, (h /= 2)),
                  l + b >= p
                    ? ((d = 0), (l = p))
                    : l + b >= 1
                    ? ((d = (t * h - 1) * r(2, e)), (l += b))
                    : ((d = t * r(2, b - 1) * r(2, e)), (l = 0)));
            e >= 8;
            u[m++] = 255 & d, d /= 256, e -= 8
          );
          for (
            l = (l << e) | d, f += e;
            f > 0;
            u[m++] = 255 & l, l /= 256, f -= 8
          );
          return (u[--m] |= 128 * v), u;
        },
        l = function (t, e) {
          var i,
            a = t.length,
            o = 8 * a - e - 1,
            s = (1 << o) - 1,
            c = s >> 1,
            l = o - 7,
            d = a - 1,
            h = t[d--],
            u = 127 & h;
          for (h >>= 7; l > 0; u = 256 * u + t[d], d--, l -= 8);
          for (
            i = u & ((1 << -l) - 1), u >>= -l, l += e;
            l > 0;
            i = 256 * i + t[d], d--, l -= 8
          );
          if (0 === u) u = 1 - c;
          else {
            if (u === s) return i ? NaN : h ? -n : n;
            (i += r(2, e)), (u -= c);
          }
          return (h ? -1 : 1) * i * r(2, u - e);
        };
      t.exports = { pack: c, unpack: l };
    },
    "7bbf": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".lock-tip[data-v-4dce468f]{position:absolute;left:0;top:0;background-color:#fff;padding:4px 8px;font-size:12px;color:#fff;line-height:20px;font-weight:400;border-width:1px;max-width:66px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:none}",
          "",
        ]),
        (t.exports = e);
    },
    "7c04": function (t, e) {
      t.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADDElEQVRYCe2VX0haURzH85pOHUYuaYGwNQZtPexJAhnog7UQg0D2VGM+xR6DvQl7FKSeZLRBwWLCHgQfwhdnLAh6CAYFQx98qRGMGIgM0kLz/vG37wmuWLc/56qPCodzPef3+36+95zzO7evr/frrUAXVoCIjGhPWN8FOX0SgD4URTGHntD/QufQp9BBNGCuer3++/DwsD45OUnHx8fwIP7EuLUDWb5UQB4D/qdQKIjDw8OELBobG6OTkxNRkqQM5vv5lNqIgvhTwP/mcjlxaGjoAs4MsDYxMUG1Wk1SFOVrG9J3pwD+HG9Y3NvbEwcHBy/BVRPT09Mky7KC2KW7FXVEQPAF4P92d3dFu91+LVw1MTc3h3BqoL3Xgbg5FEJuwMvb29uSzWa7Fa6aWFxcVE28uVmZYwYqHizpaTablSwWCxdcNRGLxRr4SdAIcKC0IUj0AV5Np9Oy2WzWBVdNrK+vK9CoQMt+lSBcHWj9j4RXcP8DzZJKpYyo8dZp7uetrS3BaDQyOP8lBfgMSklMJBLK8vIyu+UoGAzqXoFQKMQqQobWZ27HgIfYvq2urioGg+ECura2RtVqlXw+H7eJ+fl5ApiV40c0A5cBBD5ATm1lZaWBhCZMEARKJpNULpfJ7XY3x1tjWp8XFhYIL8HKMMYFVoOQ8AitEQ6HNRCTyUSZTIZKpRKNj49r5lUDLeX3QdXV1cPAEtu22dlZDcRqtdLOzg778NDo6KhmPhKJIL0LFxBEPrHDEwgENJCBgQHa39+ng4MDGhkZac5Ho1EGZ3v+TtcbXxcMEQPOwhecftnv9zchiL14djqdhC8h5fN5cjgcFI/H2ZYz+Nvr9Noag5gAE9/Oz89lr9erMeFyuejo6IiKxSKDs9vudVug25IgasROpFCCksfjuWQClwvhhlQAlxE3c5tOR3MQ74eJ9NnZmaSWIKuIjY0NdkxqmPd3BOBJBsSMr2G2UqmIU1NTtLm5KQF+ivGXPPldiQHsHkx8R0/oS+jcXRHWIwKoAe0Z2n09eb3Y3grctAL/AWy5mFYzPixLAAAAAElFTkSuQmCC";
    },
    "7ce7": function (t, e, n) {
      t.exports = n.p + "img/predicted.0df79eed.svg";
    },
    "7e41": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".brush-plugins .pointer-brush[data-v-56a832d4]{pointer-events:none;position:absolute;border-radius:50%;background:hsla(0,0%,78.4%,.6);left:0;top:0}.brush-plugins .brush-controller[data-v-56a832d4]{position:absolute;top:10px;left:20px;padding:10px;border:1px solid var(--cxd-border);background:#fff}.brush-plugins .brush-controller p.bold[data-v-56a832d4]{margin-bottom:10px;font-weight:600}.brush-plugins .brush-controller_slider[data-v-56a832d4]{display:flex;font-size:16px}.brush-plugins .brush-controller_slider input[data-v-56a832d4]{width:100px;margin:0 10px}.brush-plugins .brush-controller_slider input[data-v-56a832d4]:focus{outline:none}",
          "",
        ]),
        (t.exports = e);
    },
    "81d5": function (t, e, n) {
      "use strict";
      var i = n("7b0b"),
        r = n("23cb"),
        a = n("50c4");
      t.exports = function (t) {
        var e = i(this),
          n = a(e.length),
          o = arguments.length,
          s = r(o > 1 ? arguments[1] : void 0, n),
          c = o > 2 ? arguments[2] : void 0,
          l = void 0 === c ? n : r(c, n);
        while (l > s) e[s++] = t;
        return e;
      };
    },
    "82f8": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("4d64").includes,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("includes", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    "864d": function (t, e, n) {
      "use strict";
      n.d(e, "d", function () {
        return i;
      }),
        n.d(e, "c", function () {
          return r;
        }),
        n.d(e, "b", function () {
          return a;
        }),
        n.d(e, "a", function () {
          return o;
        });
      const i = (t, e) => [t[0] * e, t[1] * e, t[2] * e],
        r = (t, e) => [a(t, e[0]), a(t, e[1]), a(t, e[2])],
        a = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2],
        o = (t, e) => [0, 1, 2].reduce((n, i) => n && t[i] === e[i], !0);
    },
    8836: function (t, e, n) {
      "use strict";
      function i(t) {
        const [e, n, i] = t;
        return Math.pow(
          (Math.pow(e, 2.2) + Math.pow(1.5 * n, 2.2) + Math.pow(0.6 * i, 2.2)) /
            (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)),
          1 / 2.2
        );
      }
      function r(t) {
        let e = 0;
        return (
          t.map((t) => {
            e += Array.isArray(t) ? r(t) : t;
          }),
          e
        );
      }
      n.d(e, "a", function () {
        return Gt;
      });
      const a = (t, e) => {
          const n = [],
            i = Math.E;
          for (let r = -(e - 1) / 2, o = 0; o < e; r++, o++) {
            n[o] = [];
            for (let a = -(e - 1) / 2, s = 0; s < e; a++, s++)
              n[o][s] =
                (1 / (2 * Math.PI * Math.pow(t, 2))) *
                Math.pow(
                  i,
                  -(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(r), 2)) /
                    (2 * Math.pow(t, 2))
                );
          }
          const a = 1 / r(n);
          for (let r = 0; r < n.length; r++)
            for (let t = 0; t < n[r].length; t++)
              n[r][t] = Math.round(a * n[r][t] * 1e3) / 1e3;
          return n;
        },
        o = (t, e, n, i) => {
          if (!i) return;
          const r = [];
          for (let a = 0, o = -(i - 1) / 2; a < i; a++, o++) {
            r[a] = [];
            for (let s = 0, c = -(i - 1) / 2; s < i; s++, c++)
              r[a][s] = 4 * (t + c) + (e + o) * n * 4;
          }
          return r;
        };
      class s {
        constructor(t) {
          (this.getPixelRGBA = (t) => {
            const e = t;
            return !this.imageData ||
              e < 0 ||
              e > this.imageData.data.length - 4
              ? [255, 255, 255, 255]
              : [
                  this.imageData.data[e],
                  this.imageData.data[e + 1],
                  this.imageData.data[e + 2],
                  this.imageData.data[e + 3],
                ];
          }),
            (this.setPixelRGB = (t, e) => {
              const n = t;
              if (
                !this.imageData ||
                n < 0 ||
                n > this.imageData.data.length - 4
              )
                return;
              const [i, r, a] = e;
              (this.imageData.data[t] = i),
                (this.imageData.data[t + 1] = r),
                (this.imageData.data[t + 2] = a);
            }),
            (this.loopPixel = (t, e) => {
              if (this.canvas)
                for (let n = 0; n < this.canvas.height; n++)
                  for (let i = 0; i < this.canvas.width; i++) {
                    const r = this.point2dataIndex({ x: i, y: n }),
                      a = o(i, n, this.canvas.width, e);
                    t(r, a);
                  }
            }),
            (this.loopAroundPixel = (t, e, n, i) => {
              if (!this.canvas) return;
              const { x: r, y: a } = this.dataIndex2Point(e),
                o = { x: Math.max(0, r - n), y: Math.max(0, a - n) },
                s = {
                  x: Math.min(this.canvas.width, r + n),
                  y: Math.min(this.canvas.height, a + n),
                };
              this.loopRectPixel(t, o, s, i);
            }),
            (this.loopRectPixel = (t, e, n, i) => {
              if (!this.canvas) return;
              const r = this.point2dataIndex(e),
                a = this.point2dataIndex(n);
              for (let s = r; s <= a; ) {
                const r = this.dataIndex2Point(s),
                  a = o(r.x, r.y, this.canvas.width, i);
                t(s, a),
                  r.x >= n.x - 1
                    ? (s = this.point2dataIndex({ x: e.x, y: r.y + 1 }))
                    : (s += 4);
              }
            }),
            (this.canvas = t);
        }
        point2dataIndex(t) {
          const { x: e, y: n } = t;
          return this.canvas
            ? 4 * (Math.floor(e) + Math.floor(n) * this.canvas.width)
            : -1;
        }
        dataIndex2Point(t) {
          if (!this.canvas) return { x: -1, y: -1 };
          const e = Math.floor(t / (4 * this.canvas.width)),
            n = (t / 4) % this.canvas.width;
          return { x: n, y: e };
        }
        teardown() {
          var t;
          null === (t = this.canvas) || void 0 === t || t.remove(),
            (this.canvas = void 0),
            (this.imageData = void 0);
        }
      }
      const c = 768;
      class l {
        constructor() {
          (this.compressRatio = 1),
            (this.compressedBorder = { width: 1 / 0, height: 1 / 0 }),
            (this.compressOne = (t) => t / this.compressRatio),
            (this.decompressOne = (t) => t * this.compressRatio),
            (this.compressX = (t) =>
              Math.min(this.compressOne(t), this.compressedBorder.width)),
            (this.compressY = (t) =>
              Math.min(this.compressOne(t), this.compressedBorder.height)),
            (this.decompressPoint = (t) => ({
              x: this.decompressOne(t.x),
              y: this.decompressOne(t.y),
            })),
            (this.compressPoint = (t) => ({
              x: this.compressX(t.x),
              y: this.compressY(t.y),
            })),
            (this.compressBorder = (t) => ({
              width: this.compressX(t.width),
              height: this.compressY(t.height),
            })),
            (this.decompressBorder = (t) => ({
              width: this.decompressOne(t.width),
              height: this.decompressOne(t.height),
            }));
        }
        compress(t, e = c) {
          const { width: n, height: i } = t,
            r = Math.max(n, i, e);
          (this.compressRatio = r / e),
            (this.compressedBorder = this.compressBorder(t));
        }
      }
      const d = ["n", "e", "s", "w", "ne", "nw", "se", "sw"],
        h = {
          n: (t, e) => t - 4 * e,
          e: (t) => t + 4,
          s: (t, e) => t + 4 * e,
          w: (t) => t - 4,
          ne: (t, e) => t - 4 * e + 4,
          nw: (t, e) => t - 4 * e - 4,
          se: (t, e) => t + 4 * e + 4,
          sw: (t, e) => t + 4 * e - 4,
        };
      class u {
        constructor(t, e, n) {
          (this.neighbors = d.map((n) => h[n](t, e))),
            (this.isBorder =
              t - 4 * e < 0 ||
              t % (4 * e) === 0 ||
              t % (4 * e) === 4 * e - 4 ||
              t + 4 * e > e * n * 4);
        }
      }
      const f = [
          [-1, 0, 1],
          [-2, 0, 2],
          [-1, 0, 1],
        ],
        p = [
          [1, 2, 1],
          [0, 0, 0],
          [-1, -2, -1],
        ],
        b = [
          [1, 0],
          [0, -1],
        ],
        g = [
          [0, 1],
          [-1, 0],
        ],
        v = [
          [-1, 0, 1],
          [-1, 0, 1],
          [-1, 0, 1],
        ],
        m = [
          [-1, -1, -1],
          [0, 0, 0],
          [1, 1, 1],
        ],
        y = {
          sobel: { x: f, y: p, len: f.length },
          roberts: { x: b, y: g, len: g.length },
          prewitt: { x: v, y: m, len: m.length },
        };
      function x(t) {
        const e = t < 0 ? t + 180 : t;
        return (e >= 0 && e <= 22.5) || (e > 157.5 && e <= 180)
          ? 0
          : e > 22.5 && e <= 67.5
          ? 45
          : e > 67.5 && e <= 112.5
          ? 90
          : 135;
      }
      const w = (t, e, n, i) => {
          let r = 0,
            a = 0;
          if (!t.isBorder)
            for (let o = 0; o < y[e].len; o++)
              for (let t = 0; t < y[e].len; t++)
                (r += i.data[n[o][t]] * y[e]["x"][o][t]),
                  (a += i.data[n[o][t]] * y[e]["y"][o][t]);
          return {
            dir: x(Math.atan2(a, r) * (180 / Math.PI)),
            grad: Math.round(Math.sqrt(r * r + a * a)),
          };
        },
        _ = (t) => {
          const e = {
            0: [
              { x: 1, y: 2 },
              { x: 1, y: 0 },
            ],
            45: [
              { x: 0, y: 2 },
              { x: 2, y: 0 },
            ],
            90: [
              { x: 0, y: 1 },
              { x: 2, y: 1 },
            ],
            135: [
              { x: 0, y: 0 },
              { x: 2, y: 2 },
            ],
          };
          return e[t];
        },
        O = (t, e, n, i) => {
          const r = _(n[t]),
            a = i[e[r[0].x][r[0].y]],
            o = i[e[r[1].x][r[1].y]];
          return a > i[t] || o > i[t] || (o === i[t] && a < i[t]);
        };
      class A {
        constructor() {
          (this.t1 = 1 / 0),
            (this.t2 = -1 / 0),
            (this.histogram = []),
            (this.total = 0),
            (this.realEdges = []),
            this.createHistogram();
        }
        createHistogram() {
          let t = 256;
          this.histogram = [];
          while (t--) this.histogram[t] = 0;
          this.total = 0;
        }
        calcWeight(t, e) {
          const n = this.histogram.reduce((t, e) => t + e, 0),
            i = t === e ? [this.histogram[t]] : this.histogram.slice(t, e),
            r = i.reduce((t, e) => t + e, 0);
          return r / n;
        }
        calcMean(t, e) {
          const n = t === e ? [this.histogram[t]] : this.histogram.slice(t, e);
          let i = 0,
            r = 0;
          return (
            n.forEach((e, n) => {
              (i += (t + n) * e), (r += e);
            }),
            i / r
          );
        }
        calcBetweenClassVariance(t, e, n, i) {
          return t * n * (e - i) * (e - i);
        }
        fastOtsu() {
          const t = 0,
            e = this.histogram.length - 1,
            n = [];
          let i,
            r,
            a,
            o,
            s = -1 / 0,
            c = 0;
          return (
            this.histogram.forEach((l, d) => {
              (i = this.calcWeight(t, d)),
                (r = this.calcWeight(d, e + 1)),
                (a = this.calcMean(t, d)),
                (o = this.calcMean(d, e + 1)),
                (n[d] = this.calcBetweenClassVariance(i, a, r, o)),
                n[d] > s && ((s = n[d]), (c = d));
            }),
            c
          );
        }
        getEdgeNeighbors(t, e, n, i) {
          const r = [],
            a = new u(t, e.width, e.height);
          for (let o = 0; o < a.neighbors.length; o++)
            e.data[a.neighbors[o]] >= n &&
              (void 0 === i || -1 === i.indexOf(a.neighbors[o])) &&
              r.push(a.neighbors[o]);
          return r;
        }
        traverseEdge(t, e, n) {
          let i = [t];
          const r = this.getEdgeNeighbors(t, e, this.t2, n);
          for (let a = 0; a < r.length; a++)
            i = i.concat(this.traverseEdge(r[a], e, n.concat(i)));
          return i;
        }
        setHistogram(t, e) {
          this.histogram[e.data[t]]++, this.total++;
        }
        setThreshold(t, e) {
          if (
            ((this.histogram.length = this.total), void 0 !== t && void 0 !== e)
          )
            return (this.t1 = t), void (this.t2 = e);
          (this.t1 = this.fastOtsu()), (this.t2 = this.t1 / 2);
        }
        firstPass(t, e) {
          if (e.data[t] > this.t1 && void 0 === this.realEdges[t]) {
            const n = this.traverseEdge(t, e, []);
            for (let t = 0; t < n.length; t++) this.realEdges[n[t]] = !0;
          }
        }
        secondPass(t) {
          return void 0 === this.realEdges[t] ? 0 : 255;
        }
      }
      const k = (t, e) =>
        Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
      class E {}
      class j extends E {
        constructor(t) {
          super(),
            (this.debugger = !0),
            (this.dirMap = []),
            (this.gradMap = []),
            (this.detected = !1),
            (this.getSortedIndexes = (t, e) => {
              let n = [];
              const i = this.pixelImageData.dataIndex2Point(e);
              let r = 0,
                a = 0;
              for (let s = 0; s < t.length; s++) {
                const e = t[s],
                  n = this.pixelImageData.dataIndex2Point(e),
                  o = k(n, i);
                (0 === a || o < a) && ((a = o), (r = e));
              }
              let o = e;
              return (
                r && ((o = r), n.push(r)),
                t.length > 1 &&
                  (n = n.concat(
                    this.getSortedIndexes(
                      t.filter((t) => t !== r),
                      o
                    )
                  )),
                n
              );
            }),
            (this.deleteInnerIndexes = (t, e) => {
              let n = [];
              const i = this.pixelImageData.dataIndex2Point(e),
                r = [!1, !1, !1, !1];
              for (let s = 0; s < t.length; s++) {
                const e = t[s],
                  n = this.pixelImageData.dataIndex2Point(e);
                n.x === i.x && n.y < i.y && (r[0] = !0),
                  n.x < i.x && n.y === i.y && (r[1] = !0),
                  n.x === i.x && n.y > i.y && (r[2] = !0),
                  n.x > i.x && n.y === i.y && (r[3] = !0);
              }
              let a = t;
              r.some((t) => !1 === t)
                ? n.push(e)
                : (a = t.filter((t) => t !== e));
              const o = t.indexOf(e) + 1;
              return (
                o < t.length &&
                  a.length &&
                  (n = n.concat(this.deleteInnerIndexes(a, t[o]))),
                n
              );
            }),
            (this.deleteFarIndexes = (t) => {
              const e = [t[0]];
              return (
                t.reduce((t, n) => {
                  const i = this.pixelImageData.dataIndex2Point(n),
                    r = this.pixelImageData.dataIndex2Point(t.slice(-1)[0]),
                    a = k(i, r);
                  return a < 50 && e.push(n), e;
                }, e),
                e
              );
            });
          const e = document.createElement("canvas");
          (this.ctx = e.getContext("2d")),
            (this.pixelImageData = new s(e)),
            (this.hysteresis = new A()),
            (this.compressor = new l()),
            t.context.events.on("INITIALIZED", () => {
              if (!this.ctx) return;
              if (!this.compressor) return;
              this.detected = !1;
              const { width: n, height: i } = t.context.resource.resolution;
              if (!n || !i) return void t.context.events.emit("ERROR");
              this.compressor.compress({ width: n, height: i });
              const { compressedBorder: r } = this.compressor;
              (e.width = r.width),
                (e.height = r.height),
                this.ctx.drawImage(
                  t.context.resource.dom,
                  0,
                  0,
                  r.width,
                  r.height
                );
              try {
                this.pixelImageData.imageData = this.ctx.getImageData(
                  0,
                  0,
                  r.width,
                  r.height
                );
              } catch (a) {
                console.log(a);
              }
            });
        }
        renderDetectionPreview(t = "") {
          if (!this.debugger) return;
          if (!this.pixelImageData.imageData) return;
          if (!this.ctx) return;
          const e = document.getElementById("detection-list");
          if (!e) return;
          const n = document.createElement("canvas"),
            i = n.getContext("2d"),
            { width: r, height: a } = this.ctx.canvas;
          (n.width = r),
            (n.height = a),
            null === i ||
              void 0 === i ||
              i.putImageData(this.pixelImageData.imageData, 0, 0);
          const o = document.createElement("p");
          (o.innerHTML = "" + t),
            null === e || void 0 === e || e.prepend(o),
            null === e || void 0 === e || e.prepend(n);
        }
        clearDetectionPreview() {
          if (!this.debugger) return;
          const t = document.getElementById("detection-list");
          if (!t) return;
          const e =
            null === t || void 0 === t ? void 0 : t.querySelectorAll("canvas");
          e.length &&
            (e.forEach((e) => {
              null === t || void 0 === t || t.removeChild(e);
            }),
            (t.innerHTML = ""));
        }
        renderScanningPreview(t) {
          if (!this.debugger) return;
          if (!this.ctx) return;
          if (!this.compressor) return;
          const e = document.createElement("canvas");
          (e.width = this.ctx.canvas.width),
            (e.height = this.ctx.canvas.height);
          const n = e.getContext("2d");
          if (!n) return;
          (n.fillStyle = "#000"),
            n.fillRect(0, 0, e.width, e.height),
            (n.strokeStyle = "#f00"),
            n.beginPath();
          for (let r = 0; r < t.length; r++) {
            const e = this.compressor.compressPoint(t[r]);
            if (r + 1 !== t.length) {
              const i = this.compressor.compressPoint(t[r + 1]);
              n.moveTo(e.x, e.y), n.lineTo(i.x, i.y), n.stroke();
            }
          }
          n.closePath();
          const i = document.getElementById("detection-list");
          i && i.prepend(e);
        }
        grayScale() {
          this.pixelImageData.imageData &&
            this.ctx &&
            (this.pixelImageData.loopPixel((t) => {
              const e = this.pixelImageData.getPixelRGBA(t),
                n = i(e);
              this.pixelImageData.setPixelRGB(t, [n, n, n]);
            }),
            this.ctx.putImageData(this.pixelImageData.imageData, 0, 0),
            this.renderDetectionPreview("灰度图"));
        }
        gaussianBlur(t = 1, e = 9) {
          if (!this.pixelImageData.imageData) return;
          if (!this.ctx) return;
          const n = a(t, e);
          this.pixelImageData.loopPixel((t, i) => {
            if (!i) return;
            let r,
              [a, o, s] = [0, 0, 0];
            for (let c = 0; c < e; c++)
              for (let t = 0; t < e; t++) {
                r = this.pixelImageData.getPixelRGBA(i[c][t]);
                const [e, l, d] = r;
                (a += e * n[c][t]), (o += l * n[c][t]), (s += d * n[c][t]);
              }
            this.pixelImageData.setPixelRGB(t, [a, o, s]);
          }, e),
            this.ctx.putImageData(this.pixelImageData.imageData, 0, 0),
            this.renderDetectionPreview("高斯模糊");
        }
        gradient(t = "sobel") {
          if (!this.pixelImageData.imageData) return;
          if (!this.ctx) return;
          const { width: e, height: n } = this.ctx.canvas,
            i = this.ctx.getImageData(0, 0, e, n);
          (this.dirMap = []),
            (this.gradMap = []),
            this.pixelImageData.loopPixel((r, a) => {
              const o = new u(r, e, n);
              if (a) {
                const { dir: e, grad: n } = w(o, t, a, i);
                (this.dirMap[r] = e),
                  (this.gradMap[r] = n),
                  this.pixelImageData.setPixelRGB(r, [n, n, n]);
              }
            }, 3),
            this.ctx.putImageData(this.pixelImageData.imageData, 0, 0),
            this.renderDetectionPreview("梯度平滑");
        }
        nonMaximumSuppress() {
          this.pixelImageData.imageData &&
            this.ctx &&
            (this.pixelImageData.loopPixel((t, e) => {
              if (e) {
                const n = O(t, e, this.dirMap, this.gradMap);
                n && this.pixelImageData.setPixelRGB(t, [0, 0, 0]);
              }
            }, 3),
            this.ctx.putImageData(this.pixelImageData.imageData, 0, 0),
            this.renderDetectionPreview("非极大值抑制"));
        }
        cannyHysteresis() {
          if (!this.pixelImageData.imageData) return;
          if (!this.ctx) return;
          if (!this.hysteresis) return;
          const { width: t, height: e } = this.ctx.canvas,
            n = this.ctx.getImageData(0, 0, t, e);
          this.pixelImageData.loopPixel((t) => {
            var e;
            null === (e = this.hysteresis) ||
              void 0 === e ||
              e.setHistogram(t, n);
          }),
            this.hysteresis.setThreshold(128, 20),
            this.pixelImageData.loopPixel((t) => {
              var e;
              null === (e = this.hysteresis) ||
                void 0 === e ||
                e.firstPass(t, n);
            }),
            this.pixelImageData.loopPixel((t) => {
              if (!this.hysteresis) return;
              const e = this.hysteresis.secondPass(t);
              this.pixelImageData.setPixelRGB(t, [e, e, e]);
            }),
            this.ctx.putImageData(this.pixelImageData.imageData, 0, 0),
            this.renderDetectionPreview("磁滞");
        }
        run(t, e, n) {
          this.detected ||
            ((this.detected = !0),
            this.clearDetectionPreview(),
            console.time("detection-time"),
            console.time("grayScale"),
            this.grayScale(),
            console.timeEnd("grayScale"),
            console.time("gaussianBlur"),
            this.gaussianBlur(t, e),
            console.timeEnd("gaussianBlur"),
            console.time("gradient"),
            this.gradient(n),
            console.timeEnd("gradient"),
            console.time("nonMaximumSuppress"),
            this.nonMaximumSuppress(),
            console.timeEnd("nonMaximumSuppress"),
            console.time("cannyHysteresis"),
            this.cannyHysteresis(),
            console.timeEnd("cannyHysteresis"),
            console.timeEnd("detection-time"));
        }
        scanning(t, e = 50) {
          if (!this.detected) return t;
          if (!this.compressor) return t;
          const { compressPoint: n, decompressPoint: i } = this.compressor,
            r = n(t),
            a = this.pixelImageData.point2dataIndex(r);
          let o = void 0;
          return (
            this.pixelImageData.loopAroundPixel(
              (t) => {
                const e = this.pixelImageData.getPixelRGBA(t);
                if (255 === e[0]) {
                  const e = this.pixelImageData.dataIndex2Point(t);
                  if (o) {
                    const t = k(e, r),
                      n = k(o, r);
                    t < n && (o = e);
                  } else o = e;
                }
              },
              a,
              e
            ),
            o ? i(o) : t
          );
        }
        scanningRect(t, e) {
          if (!this.detected) return [t, e];
          if (!this.compressor) return [t, e];
          const n = [],
            { compressPoint: i, decompressPoint: r } = this.compressor,
            a = i(t),
            o = i(e),
            s = { x: Math.min(a.x, o.x), y: Math.min(a.y, o.y) },
            c = { x: Math.max(a.x, o.x), y: Math.max(a.y, o.y) };
          if (
            (this.pixelImageData.loopRectPixel(
              (t) => {
                const e = this.pixelImageData.getPixelRGBA(t);
                255 === e[0] && n.push(t);
              },
              s,
              c
            ),
            n.length)
          ) {
            const t = n[0],
              e = this.deleteInnerIndexes(n, t),
              i = this.getSortedIndexes(e.slice(1), e[0]),
              a = this.deleteFarIndexes(i),
              o = a
                .filter((t) => !!t)
                .map((t) => r(this.pixelImageData.dataIndex2Point(t)));
            return this.renderScanningPreview(o), o;
          }
          return [t, e];
        }
        teardown() {
          (this.ctx = void 0),
            this.pixelImageData.teardown(),
            (this.hysteresis = void 0),
            (this.compressor = void 0);
        }
      }
      class I {
        constructor() {
          this.registry = {};
        }
        register(t, e) {
          const n = this.registry[t];
          return n ? n.push(e) : (this.registry[t] = [e]), () => this.registry;
        }
        run(t, e) {
          const n = this.registry[t];
          return n ? n.reduce((t, e) => e(t), e) : e;
        }
      }
      var C = n("5c61"),
        S = n("49d5"),
        T = n("377b");
      class M {
        constructor(t) {
          this.candidates = t;
        }
        *[Symbol.iterator]() {
          for (const t of this.candidates) yield t;
        }
        activate(t) {
          var e, n;
          const [i, r] = t.split(":"),
            a = this.findActivable(i);
          if (a && (r || this.currentActive !== a))
            return (
              null ===
                (n =
                  null === (e = this.currentActive) || void 0 === e
                    ? void 0
                    : e.deactivate) ||
                void 0 === n ||
                n.call(e),
              a.activate && a.activate(r),
              (this.currentActive = a),
              (this.candidates = Object(T["c"])(this.candidates, a)),
              a
            );
        }
        push(t) {
          return (
            this.candidates.push(t),
            () => {
              this.candidates = Object(T["d"])(this.candidates, t);
            }
          );
        }
        collect(t) {
          const e = {};
          for (const n of this.candidates) {
            const i = t(n);
            i && (e[n.name] = i);
          }
          return e;
        }
        execCurrent(t) {
          this.currentActive && t(this.currentActive);
        }
        forEach(t) {
          for (const e of this.candidates) t(e);
        }
        findActivable(t) {
          return this.candidates.find((e) => e.name === t && e.activate);
        }
      }
      const R = { tool: { name: "" }, process: S["b"] };
      class D {
        constructor(t) {
          (this.interceptor = new I()),
            (this.handleUserAction = (t, e) => {
              if (!this.context.initialized) return;
              let n, i, r;
              for (const l of this.tools) {
                const e = l.respond(t);
                if (e) {
                  if ("function" !== typeof e) {
                    if (e === C["a"].RETRIEVE) {
                      n = { tool: l, process: S["b"] };
                      break;
                    }
                    i = { tool: l, process: S["b"] };
                    break;
                  }
                  r = r || { tool: l, process: e };
                }
              }
              const a = n || r || i || R,
                o = [n, r].includes(a),
                { tool: s, process: c } = this.interceptor.run(
                  "response",
                  Object.assign(Object.assign({}, a), { action: e || t })
                );
              o && this.activateTool(s.name), c();
            }),
            (this.getRenderJobs = () => {
              const t = { hot: {}, cold: {}, instant: {} };
              return (
                this.tools.forEach((e) => {
                  if (!e.getRenderJobs) return;
                  const { hot: n, cold: i, instant: r } = e.getRenderJobs();
                  (t.hot[e.name] = n),
                    (t.cold[e.name] = i),
                    (t.instant[e.name] = r);
                }),
                t
              );
            }),
            (this.restoreFromBuffer = (t) => {
              (this.bufferAnnotation = t),
                this.context.events.on("INITIALIZED", () => {
                  this.bufferAnnotation && this.restore(this.bufferAnnotation);
                });
            }),
            (this.handleCtxChange = (t) => {
              (this.context = t), this.syncContext();
            }),
            (this.syncDetector = () => {
              this.tools.forEach((t) => {
                t.detector = this.detector;
              });
            }),
            (this.unlinkDetector = () => {
              this.tools.forEach((t) => {
                t.detector = void 0;
              });
            }),
            (this.unlinkAction = t.actionWatcher.link(this.handleUserAction)),
            (this.context = t.context),
            (this.detector = t.detector),
            t.context.events.on("CONTEXT_CHANGE", this.handleCtxChange),
            (this.tools = new M(t.tools)),
            this.syncContext(),
            this.syncDetector();
        }
        get events() {
          return this.context.events;
        }
        getAnnotations() {
          const t = {};
          for (const e of this.tools)
            e.getAnnotations && (t[e.name] = e.getAnnotations());
          return t;
        }
        setLabel(t) {
          this.handleUserAction({ kind: "label", value: t });
        }
        deleteAnnotations(t) {
          this.handleUserAction({ kind: "delete-annotation", value: t });
        }
        activateShape(t) {
          this.handleUserAction({ kind: "activate-shape", value: t });
        }
        restore(t) {
          if ((this.events.emit("RESTORING"), this.context.initialized)) {
            for (const e of this.tools)
              e.restoreShapes &&
                (t[e.name] ? e.restoreShapes(t[e.name]) : e.restoreShapes([]));
            this.events.emit("RESTORED");
          } else this.restoreFromBuffer(t);
        }
        teardown() {
          this.unlinkAction(),
            this.unlinkDetector(),
            (this.detector = void 0),
            (this.tools = new M([]));
        }
        pushTool(t) {
          return (t.context = this.context), this.tools.push(t);
        }
        activateTool(t) {
          const e = this.tools.activate(t),
            n = Boolean(e);
          return n && this.context.events.emit("TOOL_CHANGED", t), n;
        }
        syncContext() {
          this.tools.forEach((t) => {
            t.context = this.context;
          });
        }
      }
      var L,
        N = n("6166");
      (function (t) {
        (t[(t["MOUSE_LEFT_DOWN"] = 0)] = "MOUSE_LEFT_DOWN"),
          (t[(t["MOUSE_LEFT_UP"] = 1)] = "MOUSE_LEFT_UP"),
          (t[(t["MOUSE_MOVE"] = 2)] = "MOUSE_MOVE"),
          (t[(t["MOUSE_WHEEL"] = 3)] = "MOUSE_WHEEL"),
          (t[(t["MOUSE_OUT"] = 4)] = "MOUSE_OUT"),
          (t[(t["MOUSE_RIGHT_DOWN"] = 5)] = "MOUSE_RIGHT_DOWN"),
          (t[(t["MOUSE_RIGHT_UP"] = 6)] = "MOUSE_RIGHT_UP"),
          (t[(t["MOUSE_DBLCLICK"] = 7)] = "MOUSE_DBLCLICK"),
          (t[(t["KEY_DOWN"] = 8)] = "KEY_DOWN"),
          (t[(t["KEY_UP"] = 9)] = "KEY_UP");
      })(L || (L = {}));
      const P = 50,
        z = { kind: "dumb", once: !1 },
        B = (t, e) =>
          t.length === e.length && t.every((t, n) => t.type === e[n]),
        U = (t, e) => {
          const n = Array.isArray(t.seq[0]);
          return n ? t.seq.some((t) => B(e, t)) : B(e, t.seq);
        },
        H = [
          {
            seq: [L.MOUSE_LEFT_DOWN, L.MOUSE_LEFT_UP],
            createAction(t) {
              const { x: e, y: n } = t.payload;
              return {
                kind: "click",
                once: !0,
                point: { x: e, y: n },
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            },
          },
          ...[
            { kind: "drag", seq: [L.MOUSE_LEFT_DOWN, L.MOUSE_MOVE] },
            { kind: "rightDrag", seq: [L.MOUSE_RIGHT_DOWN, L.MOUSE_MOVE] },
          ].map((t) => ({
            seq: t.seq,
            createAction(e, n) {
              if (n.now - e.now < P) return z;
              const { payload: i } = e,
                { payload: r } = n;
              return {
                kind: t.kind,
                once: !1,
                start: i,
                current: r,
                delta: { x: r.x - i.x, y: r.y - i.y },
                altKey: n.altKey,
                metaKey: n.metaKey,
              };
            },
          })),
          ...[
            {
              kind: "dragEnd",
              seq: [
                [L.MOUSE_LEFT_DOWN, L.MOUSE_MOVE, L.MOUSE_LEFT_UP],
                [L.MOUSE_LEFT_DOWN, L.MOUSE_MOVE, L.MOUSE_OUT],
              ],
            },
            {
              kind: "rightDragEnd",
              seq: [
                [L.MOUSE_RIGHT_DOWN, L.MOUSE_MOVE, L.MOUSE_RIGHT_UP],
                [L.MOUSE_RIGHT_DOWN, L.MOUSE_MOVE, L.MOUSE_OUT],
              ],
            },
          ].map((t) => ({
            seq: t.seq,
            createAction(e, n, i) {
              if (i.now - e.now < P) {
                const { x: n, y: i } = e.payload;
                return {
                  kind: "rightDragEnd" === t.kind ? "contextmenu" : "click",
                  once: !0,
                  point: { x: n, y: i },
                  altKey: e.altKey,
                  metaKey: e.metaKey,
                };
              }
              const { payload: r } = e,
                { payload: a } = i;
              return {
                kind: t.kind,
                once: !0,
                start: r,
                current: a,
                delta: { x: a.x - r.x, y: a.y - r.y },
                altKey: i.altKey,
                metaKey: i.metaKey,
              };
            },
          })),
          {
            seq: [L.MOUSE_RIGHT_DOWN, L.MOUSE_RIGHT_UP],
            createAction(t) {
              const { payload: e } = t;
              return {
                kind: "contextmenu",
                point: { x: e.x, y: e.y },
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            },
          },
          {
            seq: [L.MOUSE_WHEEL],
            createAction(t) {
              const e = t.payload;
              return {
                kind: "wheel",
                once: !0,
                point: { x: e.x, y: e.y },
                delta:
                  "deltaX" in e ? { x: e.deltaX, y: e.deltaY } : { x: 0, y: 0 },
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            },
          },
          {
            seq: [L.MOUSE_MOVE],
            createAction(t) {
              return { kind: "hover", once: !1, point: t.payload };
            },
          },
        ],
        F = [
          {
            seq: [L.KEY_DOWN, L.KEY_UP],
            createAction(t) {
              return { kind: "press", once: !0, value: t.payload.value };
            },
          },
          {
            seq: [L.KEY_DOWN],
            createAction(t) {
              return { kind: "hold", once: !1, value: t.payload.value };
            },
          },
        ],
        K = (t, e, n) => {
          const i = (t) => Object(N["e"])(t, e, n);
          switch (t.kind) {
            case "drag":
            case "dragEnd":
            case "rightDrag":
            case "rightDragEnd": {
              const e = i(t.start),
                n = i(t.current);
              return {
                kind: t.kind,
                start: e,
                current: n,
                delta: { x: n.x - e.x, y: n.y - e.y },
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            }
            case "dblclick":
            case "click":
              return {
                kind: t.kind,
                point: i(t.point),
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            case "hover":
              return { kind: t.kind, point: i(t.point) };
            case "wheel":
              return { kind: t.kind, point: i(t.point), delta: t.delta };
            case "contextmenu":
              return {
                kind: t.kind,
                point: i(t.point),
                altKey: t.altKey,
                metaKey: t.metaKey,
              };
            default:
              return t;
          }
        };
      class W {
        constructor(t, e) {
          (this.dom = t),
            (this.context = e),
            (this.mouseQ = []),
            (this.keyboardQ = []),
            (this.listenersQ = []),
            this.context.events.on("CONTEXT_CHANGE", (t) => {
              this.context = t;
            });
        }
        link(t) {
          if (this.onChange)
            throw new Error(
              "Already linked. Currently it only supports single consumer"
            );
          return (
            (this.onChange = t),
            this.listen(),
            () => {
              (this.onChange = void 0), this.teardown();
            }
          );
        }
        teardown() {
          this.listenersQ.forEach((t) => {
            this.dom.removeEventListener(t.eventName, t.callback);
          });
        }
        listen() {
          const t = this.dom;
          t.setAttribute("tabindex", "0"),
            this.addEventListener("contextmenu", (t) => t.preventDefault()),
            this.addEventListener("wheel", (t) => {
              (t.metaKey || t.ctrlKey) &&
                (t.stopPropagation(),
                t.preventDefault(),
                this.handleMouseEvent({
                  type: L.MOUSE_WHEEL,
                  payload: this.convertToMousePayload(t),
                  altKey: t.altKey,
                  metaKey: t.metaKey,
                }));
            }),
            this.addEventListener("mousedown", (t) => {
              switch (t.button) {
                case 0:
                  return void this.handleMouseEvent({
                    type: L.MOUSE_LEFT_DOWN,
                    payload: this.convertToMousePayload(t),
                    altKey: t.altKey,
                    metaKey: t.metaKey,
                  });
                case 1:
                  return;
                case 2:
                  return void this.handleMouseEvent({
                    type: L.MOUSE_RIGHT_DOWN,
                    payload: this.convertToMousePayload(t),
                    altKey: t.altKey,
                    metaKey: t.metaKey,
                  });
              }
            }),
            this.addEventListener("mouseup", (t) => {
              switch (t.button) {
                case 0:
                  return void this.handleMouseEvent({
                    type: L.MOUSE_LEFT_UP,
                    payload: this.convertToMousePayload(t),
                    altKey: t.altKey,
                    metaKey: t.metaKey,
                  });
                case 1:
                  return;
                case 2:
                  return void this.handleMouseEvent({
                    type: L.MOUSE_RIGHT_UP,
                    payload: this.convertToMousePayload(t),
                    altKey: t.altKey,
                    metaKey: t.metaKey,
                  });
              }
            }),
            this.addEventListener("mousemove", (t) => {
              this.handleMouseEvent({
                type: L.MOUSE_MOVE,
                payload: this.convertToMousePayload(t),
                altKey: t.altKey,
                metaKey: t.metaKey,
              });
            }),
            this.addEventListener("mouseout", (t) => {
              this.handleMouseEvent({
                type: L.MOUSE_OUT,
                payload: this.convertToMousePayload(t),
                altKey: t.altKey,
                metaKey: t.metaKey,
              });
            }),
            this.addEventListener("keydown", (t) => {
              this.context.config.arrowKeyboardEnable &&
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].some(
                  (e) => e === t.key
                ) &&
                (t.preventDefault(), t.stopPropagation()),
                this.handleKeyboardEvent({
                  type: L.KEY_DOWN,
                  payload: { value: t.key },
                });
            }),
            this.addEventListener("dblclick", (t) => {
              this.handleDblClickEvent({
                type: L.MOUSE_DBLCLICK,
                payload: this.convertToMousePayload(t),
                altKey: t.altKey,
                metaKey: t.metaKey,
              });
            }),
            this.addEventListener("keyup", (t) => {
              this.handleKeyboardEvent({
                type: L.KEY_UP,
                payload: { value: t.key },
              });
            });
        }
        createQ(t, e) {
          if (!e.length) return e.concat(t);
          const n = e.length - 1,
            i = e[n],
            r = i.type === t.type;
          return r ? e.slice(0, n).concat(t) : e.concat(t);
        }
        createAction(t, e) {
          const n = e.find((e) => U(e, t));
          return n ? n.createAction(...t) : void 0;
        }
        createNextMouseQ(t) {
          return this.createQ(t, this.mouseQ);
        }
        createMouseAction(t) {
          return this.createAction(t, H);
        }
        handleMouseEvent(t) {
          const e = Object.assign(Object.assign({}, t), { now: this.now() }),
            n = this.createNextMouseQ(e),
            i = this.createMouseAction(n);
          if (!i) return void (this.mouseQ = [e]);
          this.mouseQ = i.once ? [] : n;
          const { dom: r, res: a } = this.context.facts.coord,
            o = K(i, r, a);
          Array.isArray(o)
            ? o.forEach((t) => {
                this.emit(t, i);
              })
            : this.emit(o, i);
        }
        handleDblClickEvent(t) {
          this.mouseQ = [];
          const { dom: e, res: n } = this.context.facts.coord,
            i = {
              kind: "dblclick",
              point: t.payload,
              altKey: t.altKey,
              metaKey: t.metaKey,
            },
            r = K(i, e, n);
          Array.isArray(r)
            ? r.forEach((t) => {
                this.emit(t, i);
              })
            : this.emit(r, i);
        }
        createNextKeyboardQ(t) {
          return this.createQ(t, this.keyboardQ);
        }
        createKeyboardAction(t) {
          return this.createAction(t, F);
        }
        handleKeyboardEvent(t) {
          const e = Object.assign(Object.assign({}, t), { now: this.now() }),
            n = this.createNextKeyboardQ(e),
            i = this.createKeyboardAction(n);
          i
            ? ((this.keyboardQ = i.once ? [] : n), this.emit(i))
            : (this.keyboardQ = [
                Object.assign(Object.assign({}, e), { now: this.now() }),
              ]);
        }
        emit(t, e) {
          this.onChange && "dumb" !== t.kind && this.onChange(t, e || t);
        }
        addEventListener(t, e) {
          this.dom.addEventListener(t, e),
            this.listenersQ.push({ eventName: t, callback: e });
        }
        convertToMousePayload(t) {
          return "deltaX" in t
            ? { x: t.offsetX, y: t.offsetY, deltaX: t.deltaX, deltaY: t.deltaY }
            : { x: t.offsetX, y: t.offsetY };
        }
        now() {
          return window.performance.now();
        }
      }
      const Y = (t) => {
          const e = new W(t.dom, t.context),
            n = new D({
              actionWatcher: e,
              context: t.context,
              tools: t.tools,
              detector: t.detector,
            });
          return n;
        },
        V = {
          annotationDisplayQuality: 0.8,
          resizeHandleRadius: 3,
          alwaysShowLabel: !0,
          arrowKeyboardEnable: !1,
          appearance: {},
        },
        G = (t) => Object.assign(Object.assign({}, V), t),
        Z = (t) =>
          t.map((t) =>
            Object.assign(Object.assign({}, t), { visible: !1 !== t.visible })
          );
      class Q {
        constructor(t) {
          (this.plugins = {}),
            (this.annotator = t.annotator),
            (this.renderer = t.renderer),
            (this.contextManager = t.contextManager),
            (this.detector = t.detector);
        }
        get seed() {
          return {
            annotator: this.annotator,
            renderer: this.renderer,
            contextManager: this.contextManager,
          };
        }
        get events() {
          return this.contextManager.events;
        }
        install(t) {
          const e = this.plugins[t.id];
          if (e) return e;
          const n = t.setup(this.seed);
          return (this.plugins[t.id] = n), n;
        }
        setDefaultLabel(t) {
          this.contextManager.setDefaultLabel(t);
        }
        setLabel(t) {
          this.annotator.setLabel(t);
        }
        deleteAnnotationsOfAlias(t) {
          this.annotator.deleteAnnotations({ alias: t });
        }
        deleteAnnotationsOfLabel(t) {
          this.annotator.deleteAnnotations({ labelId: t });
        }
        setLabels(t) {
          this.contextManager.updateContext({ labels: Z(t) });
        }
        setLabelMap(t) {
          this.contextManager.setLabelMaps(t);
        }
        teardown() {
          var t;
          for (const e of Object.values(this.plugins)) e.teardown();
          (this.plugins = {}),
            this.renderer.teardown(),
            this.annotator.teardown(),
            this.contextManager.teardown(),
            null === (t = this.detector) || void 0 === t || t.teardown(),
            (this.detector = void 0);
        }
        updateConfig(t) {
          this.contextManager.updateContext({
            config: G(
              Object.assign(
                Object.assign({}, this.contextManager.context.config),
                t
              )
            ),
          });
        }
        activateTool(t) {
          return this.annotator.activateTool(t);
        }
        getAnnotations() {
          const t = this.contextManager.context.resource;
          return [
            t,
            this.annotator.getAnnotations(),
            this.contextManager.context.labelMap,
          ];
        }
        restore(t) {
          return this.annotator.restore(t);
        }
        activateShape(t) {
          this.annotator.activateShape({ alias: t });
        }
      }
      var J = n("2d45"),
        X = n("a9a6"),
        $ = n("eab8");
      function q(...t) {
        const e = t.shift();
        return t.reduce((t, e) => e(t), e);
      }
      var tt = n("1344"),
        et = n("3c4e"),
        nt = n.n(et);
      const it = ["default"],
        rt = { size: 12, color: "#fff", lineHeight: 1.5, background: "" },
        at = Object.freeze({
          default: {
            background: "rgba(112, 155, 255, 0.6)",
            border: { width: 1, color: "rgba(112, 155, 255, 1)" },
            font: rt,
          },
          active: {
            background: "rgba(112, 155, 255, 0.8)",
            border: { width: 1, color: "#ffffff" },
            font: rt,
          },
          handle: {
            background: "#ffffff",
            border: { width: 1, color: "rgba(112, 155, 255, 1)" },
            font: rt,
          },
          face: {
            background: "rgba(255, 255, 255, 0)",
            border: { width: 2, color: "#ffffff" },
            font: rt,
          },
          hover: {
            background: "rgba(255, 255, 255, 0.4)",
            border: { width: 2, color: "#ffffff" },
            font: rt,
          },
          "dashed-line": {
            background: "#ffffff",
            border: { width: 2, color: "#ffffff", dashed: [2, 4] },
            font: rt,
          },
          "handle-active": {
            background: "#ffffff",
            border: { width: 3, color: "rgba(112, 155, 255, 1)" },
            font: rt,
          },
          "preview-line": {
            background: "#ffffff",
            border: { width: 1, color: "#ffffff", dashed: [2, 4] },
            font: rt,
          },
          "dot-predictor_positive": {
            background: "rgba(255, 0, 0, 1)",
            border: { width: 3, color: "rgba(255, 0, 0, 1)", dashed: [2, 4] },
            font: rt,
          },
          "dot-predictor_negative": {
            background: "rgba(0, 179, 89, 1)",
            border: { width: 3, color: "rgba(0, 179, 89, 1)", dashed: [2, 4] },
            font: rt,
          },
          "dot-predictor_focus": {
            background: "rgba(0, 0, 0, 0.6)",
            border: { width: 4, color: "rgba(245, 166, 35, 1)", dashed: [6] },
            font: rt,
          },
        });
      class ot {
        constructor(t) {
          (this.fallback = at),
            (this.custom = {}),
            (this.labels = {}),
            this.setCustom(t);
        }
        setCustom(t) {
          this.custom = this.compile(
            t,
            (t) => this.fallback[t] || this.fallback.default
          );
        }
        setLabels(t) {
          const e = {},
            n = (t) =>
              this.custom[t] || this.fallback[t] || this.fallback.default;
          for (const i of t) e[i.id] = this.compile(i.appearance, n);
          this.labels = e;
        }
        findByPriority(t, e) {
          const n = (t ? this.labels[t] : void 0) || this.custom,
            i = this.fallback,
            r = e ? (Array.isArray(e) ? e : [e]) : it,
            a = [
              [n, r],
              [i, r],
              [n, it],
              [i, it],
            ];
          for (const o of a) {
            const t = this.findInCollection(o[0], o[1]);
            if (t) return t;
          }
          return this.fallback.result;
        }
        findInCollection(t, e) {
          if (t)
            for (const n of e) {
              const e = t[n];
              if (e) return e;
            }
        }
        compile(t, e) {
          const n = {};
          if (!t) return n;
          for (const [i, r] of Object.entries(t)) {
            if (!r) continue;
            const t = e(i);
            n[i] = nt()(t, r);
          }
          return n;
        }
      }
      var st = n("864d");
      const ct = 1.5,
        lt = {
          coord: { res: X["a"], canvas: X["a"], dom: X["a"] },
          annotationDisplayQuality: 0,
          rect: { x: 0, y: 0, width: 0, height: 0 },
          hidpiNeeded: !1,
        },
        dt = (t, e, n) => {
          const i = X["a"],
            r = t.getBoundingClientRect(),
            a = Object(N["a"])(e, r),
            o = e.width > r.width * ct || e.height > r.height * ct,
            s = n.annotationDisplayQuality,
            c = [st["d"](i[0], s), st["d"](i[1], s), i[2]];
          return {
            coord: { res: a, canvas: c, dom: i },
            annotationDisplayQuality: s,
            rect: r,
            hidpiNeeded: o,
          };
        },
        ht = () => lt,
        ut = {
          type: "image",
          dom: void 0,
          src: "",
          resolution: { width: 0, height: 0, whRatio: 0 },
        },
        ft = {
          type: "video",
          dom: void 0,
          src: "",
          resolution: { width: 0, height: 0 },
        },
        pt = (t) => {
          const e = new Image(),
            n = () =>
              new Promise((n) => {
                (e.onload = () => {
                  const { width: i, height: r } = e;
                  n({
                    type: "image",
                    src: t,
                    dom: e,
                    resolution: { width: i, height: r },
                  });
                }),
                  (e.onerror = () => n(ut)),
                  (e.src = t);
              }),
            i = () => {
              e.src = "";
            };
          return J["b"](n, i);
        },
        bt = (t) => {
          const e = document.createElement("video");
          e.setAttribute("preload", "auto"), (e.autoplay = !1);
          const n = () =>
              new Promise((n) => {
                e.addEventListener("canplay", () => {
                  const { videoWidth: i, videoHeight: r } = e,
                    a = { width: i, height: r };
                  n({ type: "video", src: t, resolution: a, dom: e });
                }),
                  (e.onerror = () => n(ft)),
                  (e.src = t);
              }),
            i = () => {
              e.src = "";
            };
          return J["b"](n, i);
        },
        gt = (t) => {
          const e = t.src,
            n = "image" === t.type ? pt(e) : bt(e);
          return n;
        },
        vt = (t) => ("image" === t.type ? ut : ft);
      class mt {
        constructor(t) {
          (this.events = Object(tt["a"])()),
            (this.loadResource = J["c"](gt)),
            (this.context = {
              dom: t.dom,
              initialized: !1,
              events: this.events,
              facts: ht(),
              resource: vt(t.media),
              config: t.config,
              labels: S["a"],
              labelMap: S["c"],
              appearance: new ot(),
              initialResCoord: X["a"],
            }),
            this.context.appearance.setCustom(t.config.appearance),
            this.installListeners();
        }
        teardown() {
          this.events.emit("TEARDOWN"), this.events.all.clear();
        }
        prepareResource(t) {
          const { dom: e, config: n } = this.context;
          e.dataset.src = t.src;
          const i = t.resolution ? dt(e, t.resolution, n) : ht();
          this.updateContext({ initialized: !1, facts: i }),
            q(
              this.loadResource(t),
              J["d"](
                (t) => {
                  console.error(t), this.events.emit("ERROR", t);
                },
                (n) => {
                  if (e.dataset.src !== t.src) return;
                  const { width: i, height: r } = n.resolution;
                  (i && r) || this.events.emit("ERROR"), this.updateResource(n);
                }
              )
            );
        }
        updateResource(t) {
          this.events.emit("INITIALIZING");
          const e = Object($["a"])(
              this.context.resource.resolution,
              t.resolution
            )
              ? this.context.facts
              : dt(this.context.dom, t.resolution, this.context.config),
            n = e.coord.res;
          this.updateContext({
            resource: t,
            facts: e,
            initialResCoord: n,
            initialized: !0,
          }),
            this.events.emit("INITIALIZED"),
            this.events.emit("MEDIA_CHANGED", t);
        }
        updateContext(t) {
          var e;
          "config" in t &&
            this.context.appearance.setCustom(
              null === (e = t.config) || void 0 === e ? void 0 : e.appearance
            ),
            "labels" in t && this.updateLabels(t.labels || []),
            (this.context = Object.assign(Object.assign({}, this.context), t)),
            this.events.emit("CONTEXT_CHANGE", this.context);
        }
        setLabelMaps(t) {
          this.context.labelMap = t;
        }
        setDefaultLabel(t) {
          this.labelId = t;
        }
        installListeners() {
          this.events.on("SET_LABEL", (t) => {
            const { tool: e, shape: n, alias: i, labelId: r } = t,
              a = this.context.labelMap[n] || {},
              o = a[i],
              s = () => {
                (this.context.labelMap[n] = Object.assign(
                  Object.assign({}, a),
                  { [i]: o }
                )),
                  this.context.events.emit("CHANGE", {
                    tool: e,
                    shape: n,
                    annotations: e.getAnnotations(),
                  });
              },
              c = () => {
                (this.context.labelMap[n] = Object.assign(
                  Object.assign({}, a),
                  { [i]: r }
                )),
                  this.context.events.emit("CHANGE", {
                    tool: e,
                    shape: n,
                    annotations: e.getAnnotations(),
                  });
              };
            c(),
              this.events.emit("HISTORY", {
                group: "label:" + r,
                undo: s,
                redo: c,
              });
          }),
            this.events.on("SHAPE_CREATED", (t) => {
              if (!this.labelId) return;
              const e = this.context.labelMap[t.shape] || {};
              this.context.labelMap[t.shape] = Object.assign(
                Object.assign({}, e),
                { [t.alias]: this.labelId }
              );
            });
        }
        updateLabels(t) {
          const e = this.context.labels.map((t) => t.id),
            n = t.map((t) => t.id);
          for (const i of Object(T["e"])(e, n))
            i && this.events.emit("HISTORY:CLEAR", "label:" + i);
          this.context.appearance.setLabels(t);
        }
      }
      const yt = (t) => {
        const e = new mt(t);
        return e;
      };
      var xt = n("b3b5");
      class wt {
        constructor() {
          this.internal = { keys: [], values: [], birth: [] };
        }
        get length() {
          return this.internal.keys.length;
        }
        clear() {
          this.internal = { keys: [], values: [], birth: [] };
        }
        getValue(t) {
          const e = this.internal.keys.indexOf(t);
          if (-1 === e) return;
          const n = this.internal.values[e];
          return this.tapByIndex(e), n;
        }
        upsert(t, e) {
          const n = this.internal.keys.indexOf(t);
          -1 === n ? this.insert(t, e) : this.update(t, e);
        }
        insert(t, e) {
          const n = +new Date();
          this.internal.keys.unshift(t),
            this.internal.values.unshift(e),
            this.internal.birth.unshift(n);
        }
        update(t, e) {
          this.removeByKey(t), this.insert(t, e);
        }
        tapByIndex(t) {
          if (0 === t) {
            const e = +new Date();
            return void (this.internal.birth[t] = e);
          }
          const e = {
            key: this.internal.keys[t],
            value: this.internal.values[t],
          };
          this.removeByIndex(t), this.insert(e.key, e.value);
        }
        pop() {
          const t = this.internal.birth.pop(),
            e = this.internal.keys.pop(),
            n = this.internal.values.pop();
          return [e, n, t];
        }
        removeByKey(t) {
          const e = this.internal.keys.indexOf(t);
          return this.removeByIndex(e);
        }
        removeByIndex(t) {
          this.internal.keys.splice(t, 1),
            this.internal.values.splice(t, 1),
            this.internal.birth.splice(t, 1);
        }
        resize(t) {
          const e = this.internal.keys.length - t;
          e &&
            (this.internal.keys.splice(0, e),
            this.internal.values.splice(0, e),
            this.internal.birth.splice(0, e));
        }
        clearOutdated(t) {
          const e = this.internal.birth.length,
            n = +new Date();
          for (let i = e - 1; i >= 0; i--) {
            if (this.internal.birth[i] + t >= n) break;
            this.pop();
          }
        }
      }
      class _t {
        constructor(t) {
          (this.data = new wt()), (this.size = t.size), (this.ttl = t.ttl);
        }
        clear() {
          this.data.clear();
        }
        insert(t, e) {
          t && (this.data.upsert(t, e), this.seBalance());
        }
        insertWithFallback(t, e) {
          const n = e();
          return this.insert(t, n), n;
        }
        retrieve(t, e) {
          if (!t) return;
          this.seClearOutdated();
          const n = this.data.getValue(t);
          return n || !e ? n : this.insertWithFallback(t, e);
        }
        seBalance() {
          this.seClearOutdated();
          const t = this.data.length;
          this.size >= t || this.data.resize(this.size);
        }
        seClearOutdated() {
          this.ttl && this.data.clearOutdated(this.ttl);
        }
      }
      var Ot = n("69af");
      class At {
        constructor() {
          this.separators = {};
        }
        mount(t, e) {
          (this.host = t), this.insertSep(e);
        }
        insertSep(t) {
          const e = document.createComment(t);
          this.host.appendChild(e), (this.separators[t] = e);
        }
        insertLayer(t, e) {
          const n = e ? t : void 0,
            i = e || t;
          return i.canvas
            ? ((i.canvas.style.position = "absolute"),
              (i.canvas.style.top = "0"),
              (i.canvas.style.left = "0"),
              (i.canvas.style.width = "100%"),
              (i.canvas.style.height = "100%"),
              null == n
                ? this.host.appendChild(i.canvas)
                : this.host.insertBefore(
                    i.canvas,
                    this.separators[n].nextSibling
                  ),
              i)
            : i;
        }
        teardown() {
          Object.values(this.separators).forEach((t) => {
            t.remove();
          }),
            (this.separators = {});
        }
      }
      class kt {
        constructor(t, e, n) {
          (this.id = "unknown"),
            (this.collection = {}),
            (this.mounter = new At()),
            (this.render = (t, e) => {
              const n = Object.keys(t);
              for (const i of n) this.retrieve(i).render(t[i] || S["a"], e);
            }),
            (this.layerKlass = t),
            (this.id = e),
            (this.storage = n);
        }
        mount(t) {
          this.mounter.mount(t, this.id);
        }
        resize(t) {
          this.latestFacts = t;
          for (const e of Object.values(this.collection)) e && e.resize(t);
        }
        teardown() {
          for (const t of Object.values(this.collection)) t.teardown();
          this.mounter.teardown(), (this.collection = {});
        }
        createLayer(t) {
          const e = new this.layerKlass(this.storage, t);
          return (
            this.latestFacts && e.resize(this.latestFacts),
            this.mounter.insertLayer(this.id, e),
            (this.collection[t] = e),
            e
          );
        }
        retrieve(t) {
          const e = this.collection[t];
          return e || this.createLayer(t);
        }
        revoke(t) {
          const e = this.collection[t];
          e && (e.teardown(), delete this.collection[t]);
        }
      }
      const Et = (t, e, n) => {
          const i = new kt(t, e, n);
          return i;
        },
        jt = (t) => {
          (t.mozImageSmoothingEnabled = !1),
            (t.oImageSmoothingEnabled = !1),
            (t.webkitImageSmoothingEnabled = !1),
            (t.msImageSmoothingEnabled = !1),
            (t.imageSmoothingEnabled = !1);
        };
      class It {
        constructor(t, e) {
          (this.storage = t),
            (this.id = e),
            (this.prepare = () =>
              !!this.tmpCtx &&
              !!this.tmpCanvas &&
              (this.tmpCtx.clearRect(
                0,
                0,
                this.tmpCanvas.width,
                this.tmpCanvas.height
              ),
              !0)),
            (this.canvas = document.createElement("canvas")),
            (this.tmpCanvas = document.createElement("canvas")),
            (this.ctx = this.canvas.getContext("2d", {
              willReadFrequently: !0,
            })),
            (this.tmpCtx = this.tmpCanvas.getContext("2d", {
              willReadFrequently: !0,
            })),
            jt(this.ctx),
            jt(this.tmpCtx);
        }
        resize(t) {
          if (!this.canvas) return;
          if (!this.tmpCanvas) return;
          if (!this.ctx) return;
          const { rect: e, annotationDisplayQuality: n } = t;
          (this.canvas.width = e.width * n),
            (this.canvas.height = e.height * n),
            (this.tmpCanvas.width = e.width * n),
            (this.tmpCanvas.height = e.height * n),
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        teardown() {
          var t, e;
          this.storage.clear(),
            null === (t = this.canvas) || void 0 === t || t.remove(),
            null === (e = this.tmpCanvas) || void 0 === e || e.remove(),
            (this.canvas = void 0),
            (this.tmpCanvas = void 0),
            (this.ctx = void 0),
            (this.tmpCtx = void 0);
        }
        update() {
          if (this.canvas && this.tmpCanvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            try {
              this.ctx.drawImage(this.tmpCanvas, 0, 0);
            } catch (t) {
              console.error(t);
            }
          }
        }
        render(t, e) {}
      }
      var Ct = n("0a4d");
      function St(t) {
        const [e, n] = t.includes(":") ? t.split(":") : [t, ""];
        return [e, n];
      }
      const Tt = (t) => {
        const e = St(t)[0],
          n = window.logger || {},
          i = n.all || n[t] || n[e + ":*"];
        return Boolean(i);
      };
      function Mt(t, e, n, i) {
        if (!Tt(t)) return;
        const r = Array.from({ length: i }).fill(" ").join("");
        console.info(
          `${r}%c[${e ? t + ":" + e : t}]`,
          "background: rgb(150, 84, 84); color: #fff;",
          n
        );
      }
      function Rt(t, e, n) {
        const [i, r] = null == e ? ["", t] : [t, e],
          [a, o] = St(i);
        Mt(a || "default", o, r, n || 0);
      }
      var Dt = n("c7b3");
      class Lt extends It {
        constructor() {
          super(...arguments),
            (this.runningTask = J["g"]()),
            (this.batchTask = J["g"]()),
            (this.render = Object(Ot["b"])((t, e) => {
              Rt("rerender", this.id);
              const n = this.prepare();
              n &&
                (this.runningTask.cancel(),
                this.tmpCtx &&
                  ((this.runningTask = this.renderBatchJobs(this.tmpCtx, t, e)),
                  (this.batchTask = J["i"](this.runningTask, () => {
                    this.batchTask.cancelled ||
                      this.runningTask.cancelled ||
                      this.update();
                  }))));
            }));
        }
        renderBatchJobs(t, e, n, i) {
          const r = e.reduce((e, r) => {
            const a = this.renderSingleJob(t, r, n, i);
            return a ? e.concat(a) : e;
          }, []);
          return J["f"](r);
        }
        renderSingleJob(t, e, n, i) {
          const r = this.normalizeJob(e, n);
          if (!1 === r.visible) return;
          const a =
            null !== i && void 0 !== i ? i : this.getEntityAppearance(n, r);
          switch (r.type) {
            case "quad":
            case "polygon":
              return Object(Dt["g"])(t, r.data, a);
            case "brush":
              return Object(Dt["b"])(t, r.data, a);
            case "polyline":
            case "line":
              return Object(Dt["f"])(t, r.data, a);
            case "rect":
              return Object(Dt["h"])(t, r.data, a);
            case "dot":
              return Object(Dt["d"])(t, r.data, a);
            case "focus":
              if (!this.canvas) return;
              return Object(Dt["e"])(t, r.data, this.canvas, a);
            case "circle":
              return Object(Dt["c"])(t, r.data, a);
            case "label":
              return Object(Dt["j"])(t, r.data, a);
            case "bitmap":
              return this.renderBitmap(t, r, a);
            case "canvas":
              return this.renderCanvasJob(t, n, r, a);
            case "face":
              return Object(Dt["g"])(
                t,
                r.data,
                Object.assign(Object.assign({}, a), {
                  background: "rgba(0,0,0,0)",
                })
              );
          }
        }
        renderCanvasJob(t, e, n, i) {
          if (!this.canvas) return J["g"]();
          const r = [],
            a = (t, n, a) => {
              if ("label" !== t.type)
                return (
                  (n.globalCompositeOperation = t.reversed
                    ? "destination-out"
                    : "source-over"),
                  this.renderSingleJob(n, t, e, a)
                );
              r.push({ job: t, appearance: i });
            },
            o = Object(Dt["i"])(
              t,
              {
                collection: n.data,
                width: this.canvas.width,
                height: this.canvas.height,
                processOne: a,
              },
              i
            );
          return J["a"](o, (i) =>
            i.then((i) => {
              this.storage.insert(n.cacheId, i);
              for (const n of r)
                this.renderSingleJob(t, n.job, e, n.appearance);
            })
          );
        }
        renderBitmap(t, e, n) {
          const i = e.data.target,
            r = [
              0,
              0,
              e.data.width,
              e.data.height,
              i.x1,
              i.y1,
              i.x2 - i.x1 + 1,
              i.y2 - i.y1 + 1,
            ],
            a = this.storage.retrieve(e.cacheId);
          if (a) return void t.drawImage(a, ...r);
          const o = Object(Dt["a"])(e.data, n);
          return J["a"](o, (n) =>
            n.then((n) => {
              n && (this.storage.insert(e.cacheId, n), t.drawImage(n, ...r));
            })
          );
        }
        teardown() {
          this.runningTask.cancel(),
            this.batchTask.cancel(),
            (this.batchTask = J["g"]()),
            (this.runningTask = J["g"]()),
            super.teardown();
        }
        getEntityAppearance(t, e) {
          return t.appearance.findByPriority(e.labelId, e.class);
        }
        normalizeJob(t, e) {
          const n = e.labels,
            { resolution: i } = e.resource,
            { res: r, canvas: a } = e.facts.coord,
            o = (t) => Object(N["e"])(t, r, a),
            s = (t) => Object(N["f"])(t, r, a),
            c = (t) => {
              const e = o({ x: t.x1, y: t.y1 }),
                n = o({ x: t.x2, y: t.y2 });
              return { x1: e.x, x2: n.x, y1: e.y, y2: n.y };
            };
          switch (t.type) {
            case "brush": {
              const e = Object(N["f"])(t.data.radius, r, a),
                n = t.data.points.map(o);
              return Object.assign(Object.assign({}, t), {
                data: Object.assign(Object.assign({}, t.data), {
                  radius: e,
                  points: n,
                }),
              });
            }
            case "polyline":
            case "quad":
            case "face":
            case "polygon": {
              const e = t.data.points.map(o);
              return Object.assign(Object.assign({}, t), {
                data: Object.assign(Object.assign({}, t.data), { points: e }),
              });
            }
            case "line": {
              const e = t.data.points.map(o),
                n = t.data.width ? s(t.data.width) : void 0;
              if (!n)
                return Object.assign(Object.assign({}, t), {
                  data: { points: e, width: n },
                });
              const i = Object(Ct["d"])(e, n);
              return Object.assign(Object.assign({}, t), {
                type: "polygon",
                data: { points: i, closed: !0 },
              });
            }
            case "rect": {
              const e = t.data.map(o);
              return Object.assign(Object.assign({}, t), { data: [...e] });
            }
            case "circle": {
              const e = t.normalized ? t.data.radius : s(t.data.radius);
              return Object.assign(Object.assign({}, t), {
                data: { center: o(t.data.center), radius: e },
              });
            }
            case "dot":
              return Object.assign(Object.assign({}, t), { data: o(t.data) });
            case "focus":
              return Object.assign(Object.assign({}, t), { data: c(t.data) });
            case "bitmap": {
              const e = t.data.target
                ? c(t.data.target)
                : c({ x1: 0, y1: 0, x2: i.width - 1, y2: i.height - 1 });
              return Object.assign(Object.assign({}, t), {
                data: Object.assign(Object.assign({}, t.data), { target: e }),
              });
            }
            case "label": {
              if (!t.labelId)
                return Object.assign(Object.assign({}, t), { visible: !1 });
              const e = n.reduce(
                (e, n) => e || (n.id === t.labelId ? n.name : e),
                ""
              );
              return e
                ? Object.assign(Object.assign({}, t), {
                    visible: Boolean(e),
                    data: Object.assign(Object.assign({}, t.data), {
                      text: e,
                      position: o(t.data.position),
                    }),
                  })
                : Object.assign(Object.assign({}, t), { visible: !1 });
            }
            case "canvas":
              return t;
          }
          throw new Error("Please normalize job before rendering");
        }
      }
      var Nt = n("d03e");
      const Pt = (t, e, n, i) => {
          const r = {
              topLeft: Object(N["e"])({ x: 0, y: 0 }, n, i),
              bottomRight: Object(N["e"])({ x: t.width, y: t.height }, n, i),
            },
            a = {
              topLeft: Object(N["e"])({ x: 0, y: 0 }, i, n),
              bottomRight: Object(N["e"])({ x: e.width, y: e.height }, i, n),
            };
          return [
            Object(Nt["b"])(r.topLeft.x, 0, e.width),
            Object(Nt["b"])(r.topLeft.y, 0, e.height),
            Object(Nt["b"])(r.bottomRight.x - r.topLeft.x, 0, e.width),
            Object(Nt["b"])(r.bottomRight.y - r.topLeft.y, 0, e.height),
            Object(Nt["b"])(a.topLeft.x, 0, t.width),
            Object(Nt["b"])(a.topLeft.y, 0, t.height),
            Object(Nt["b"])(a.bottomRight.x - a.topLeft.x, 0, t.width),
            Object(Nt["b"])(a.bottomRight.y - a.topLeft.y, 0, t.height),
          ];
        },
        zt = Object(Ot["b"])(Pt);
      class Bt extends It {
        constructor() {
          super(...arguments),
            (this.dpiFactor = 1),
            (this.render = Object(Ot["c"])(
              (t, e) => {
                var n, i;
                return [
                  null === (n = this.canvas) || void 0 === n ? void 0 : n.width,
                  null === (i = this.canvas) || void 0 === i
                    ? void 0
                    : i.height,
                  e.resource,
                  e.facts,
                ];
              },
              (t, e, n, i) => {
                if (!this.ctx) return;
                if (!this.canvas) return;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                const r = {
                    width: i.rect.width * i.annotationDisplayQuality,
                    height: i.rect.height * i.annotationDisplayQuality,
                  },
                  a = zt(r, n.resolution, i.coord.canvas, i.coord.res),
                  o = a.slice(0, 4),
                  s = a.slice(4).map((t) => t * this.dpiFactor);
                return this.ctx.drawImage(n.dom, ...o.concat(s));
              }
            ));
        }
        resize(t) {
          if (!this.canvas) return;
          const { rect: e, annotationDisplayQuality: n, hidpiNeeded: i } = t;
          (this.dpiFactor = i ? 2 : 1),
            (this.canvas.width = e.width * this.dpiFactor * n),
            (this.canvas.height = e.height * this.dpiFactor * n);
        }
      }
      const Ut = { bg: [] };
      class Ht {
        constructor(t) {
          (this.coordTracker = new xt["a"](300)),
            (this.storage = new _t({ size: 100, ttl: 1e4 })),
            (this.cleaned = !1),
            (this.render = Object(Ot["c"])(
              () => {
                const t = this.context.facts.coord,
                  e = this.coordTracker.isChangedRecently(t),
                  n = this.getRenderJobs(),
                  i = n.instant || S["c"],
                  r = n.hot || S["c"],
                  a = e ? S["c"] : n.cold || S["c"];
                return [i, r, a, this.context];
              },
              (t, e, n, i) => {
                i.initialized &&
                  (this.cleaned ||
                    (this.bgLayerCollection.render(Ut, i),
                    this.coldLayerCollection.render(n, i),
                    this.hotLayerCollection.render(e, i),
                    this.instantLayerCollection.render(t, i)));
              }
            )),
            (this.handleCtxChange = (t) => {
              const e = this.context;
              (this.context = t),
                (e.facts === t.facts && e.resource === t.resource) ||
                  this.fit();
            }),
            (this.context = t.context),
            this.context.events.on("CONTEXT_CHANGE", this.handleCtxChange),
            (this.getRenderJobs = t.getRenderJobs),
            (this.bgLayerCollection = Et(Bt, "bg", this.storage)),
            (this.coldLayerCollection = Et(Lt, "cold", this.storage)),
            (this.hotLayerCollection = Et(Lt, "hot", this.storage)),
            (this.instantLayerCollection = Et(Lt, "instant", this.storage));
        }
        fit() {
          this.getAllLayerCollections().forEach((t) => {
            t.resize(this.context.facts);
          }),
            this.render();
        }
        mount(t) {
          this.getAllLayerCollections().forEach((e) => {
            e.mount(t);
          }),
            this.fit();
        }
        teardown() {
          (this.cleaned = !0),
            this.storage.clear(),
            this.getAllLayerCollections().forEach((t) => {
              t.teardown();
            });
        }
        output() {
          const t = [],
            e = document.createElement("canvas"),
            n = e.getContext("2d");
          return (
            Object.values(this.coldLayerCollection.collection).forEach((i) => {
              if (i.canvas && i.ctx) {
                const { width: r, height: a } = i.canvas,
                  o = i.ctx.getImageData(0, 0, r, a);
                if (((e.width = r), (e.height = a), n)) {
                  const i = o.data.find((t) => !!t);
                  i && (n.putImageData(o, 0, 0), t.push(e.toDataURL()));
                }
              }
            }),
            e.remove(),
            t
          );
        }
        getAllLayerCollections() {
          return [
            this.bgLayerCollection,
            this.coldLayerCollection,
            this.hotLayerCollection,
            this.instantLayerCollection,
          ];
        }
      }
      const Ft = "tz-annotator",
        Kt = (t, e) => {
          let n = [];
          const i = (e) => {
            const i = e.split(" ");
            for (const r of n) r && t.classList.remove(r);
            for (const n of i) n && t.classList.add(n);
            n = i;
          };
          return e.events.on("CURSOR", i), () => e.events.off("CURSOR", i);
        },
        Wt = (t, e) => {
          let n = document.createElement("div");
          (n.style.position = "relative"),
            (n.style.width = "100%"),
            (n.style.height = "100%"),
            (n.style.outline = "none"),
            t.mount(n),
            n.classList.add(Ft),
            (e.innerHTML = ""),
            e.appendChild(n);
          const i = () => {
            var t;
            n &&
              (null === (t = n.parentElement) ||
                void 0 === t ||
                t.removeChild(n),
              n.remove(),
              (n = null));
          };
          return { dom: n, unmount: i };
        },
        Yt = (t) => {
          let e,
            n = !1;
          const i = () => {
            n ||
              (t(),
              (e = requestAnimationFrame(() => {
                i();
              })));
          };
          i();
          const r = () => {
            (n = !0), cancelAnimationFrame(e), (e = 0);
          };
          return r;
        },
        Vt = (t) => {
          const e = new Ht(t),
            { dom: n, unmount: i } = Wt(e, t.mountPoint),
            r = Yt(() => e.render()),
            a = Kt(n, t.context);
          return {
            output: e.output.bind(e),
            mount: e.mount.bind(e),
            render: e.render.bind(e),
            teardown() {
              r(), e.teardown(), i(), a();
            },
          };
        };
      function Gt(t) {
        const e = G(t.config),
          n = Object.assign(Object.assign({}, t), { config: e }),
          i = yt(n);
        i.prepareResource(n.media);
        const r = t.edgeMode ? new j(i) : void 0,
          a = Y({
            dom: t.dom,
            context: i.context,
            tools: t.tools,
            detector: r,
          }),
          o = Vt({
            mountPoint: t.dom,
            context: i.context,
            getRenderJobs: a.getRenderJobs,
          }),
          s = new Q({
            contextManager: i,
            annotator: a,
            renderer: o,
            detector: r,
          });
        return s;
      }
    },
    8874: function (t, e, n) {
      var i = n("676b");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("a86a7e2a", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    8899: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return v;
      });
      var i,
        r = n("a9a6"),
        a = n("864d");
      (function (t) {
        (t[(t["TOP"] = 0)] = "TOP"),
          (t[(t["RIGHT"] = 1)] = "RIGHT"),
          (t[(t["BOTTOM"] = 2)] = "BOTTOM"),
          (t[(t["LEFT"] = 3)] = "LEFT");
      })(i || (i = {}));
      const o = (t, e) => (c.length + c.indexOf(e) - c.indexOf(t)) % c.length,
        s = (t, e) => o(t, e) % 2 === 1,
        c = [i.TOP, i.RIGHT, i.BOTTOM, i.LEFT],
        l = (t) => {
          const e = (c.indexOf(t) + 1) % c.length;
          return c[e];
        },
        d = [
          [0, 1, 0],
          [-1, 0, 0],
          [0, 0, 1],
        ],
        h = (t, e, n) => {
          const i = -t.width / 2,
            a = t.height / 2,
            o = [
              [1, 0, i],
              [0, -1, a],
              [0, 0, 1],
            ],
            l = r["b"](o),
            h = (c.length + c.indexOf(n) - c.indexOf(e)) % c.length,
            u = r["d"](d, h),
            f = s(e, n)
              ? [[l[0][0], l[0][1], l[1][2]], [l[1][0], l[1][1], l[0][2]], l[2]]
              : l;
          return r["c"](f, u, o);
        },
        u = (t, e, n, i) => {
          const r = h(e, n, i),
            o = a["c"]([t.x, t.y, 1], r);
          return { x: o[0], y: o[1] };
        },
        f = (t, e, n) => (i) => u(i, t, e, n),
        p = (t, e, n) => {
          const r = { width: t.width, height: t.height, dom: t },
            a = null !== e && void 0 !== e ? e : i.TOP,
            o = null !== n && void 0 !== n ? n : i.TOP;
          if (a === o) return r;
          const c = document.createElement("canvas"),
            l = c.getContext("2d");
          if (!l) return r;
          const [d, u] = s(a, o) ? [t.height, t.width] : [t.width, t.height];
          (c.width = d), (c.height = u);
          const f = h({ width: t.width, height: t.height }, a, o);
          return (
            l.setTransform(
              f[0][0],
              f[1][0],
              f[0][1],
              f[1][1],
              f[0][2],
              f[1][2]
            ),
            l.drawImage(t, 0, 0),
            l.setTransform(1, 0, 0, 1, 0, 0),
            { width: d, height: u, dom: c }
          );
        };
      class b {
        constructor(t, e) {
          (this.getImageDOM = t),
            (this.onChange = e),
            (this.prevDirection = i.TOP);
        }
        rotate() {
          const t = l(this.prevDirection);
          this.rotateTo(t);
        }
        rotateTo(t) {
          const e = this.getImageDOM();
          if (!e) return;
          const n = p(e, this.prevDirection, t),
            i = this.prevDirection;
          (this.prevDirection = t),
            this.onChange(
              Object.assign(Object.assign({}, n), { direction: t }),
              { width: e.width, height: e.height, dom: e, direction: i }
            );
        }
        teardown() {}
      }
      function g(t, e) {
        const n = {},
          i = f(e.prev, e.prev.direction, e.next.direction);
        for (const [r, a] of Object.entries(t))
          switch (r) {
            case "circle":
              n[r] = a.map((t) =>
                Object.assign(Object.assign({}, t), { center: i(t.center) })
              );
              break;
            case "polygon":
            case "line":
              n[r] = a.map((t) =>
                Object.assign(Object.assign({}, t), { points: t.points.map(i) })
              );
              break;
          }
        return n;
      }
      const v = (t = {}) => ({
        id: "image-operator",
        setup({ annotator: e, contextManager: n }) {
          const i = () => {
              if ("video" !== n.context.resource.type)
                return n.context.resource.dom;
            },
            r = (i, r) => {
              n.updateResource({
                type: "image",
                src: "",
                dom: i.dom,
                resolution: { width: i.width, height: i.height },
              });
              const a = g(e.getAnnotations(), { next: i, prev: r });
              e.restore(a), t.onChange && t.onChange(i, r);
            },
            a = new b(i, r);
          return a;
        },
      });
    },
    "8aa7": function (t, e, n) {
      var i = n("da84"),
        r = n("d039"),
        a = n("1c7e"),
        o = n("ebb5").NATIVE_ARRAY_BUFFER_VIEWS,
        s = i.ArrayBuffer,
        c = i.Int8Array;
      t.exports =
        !o ||
        !r(function () {
          c(1);
        }) ||
        !r(function () {
          new c(-1);
        }) ||
        !a(function (t) {
          new c(), new c(null), new c(1.5), new c(t);
        }, !0) ||
        r(function () {
          return 1 !== new c(new s(2), 1, void 0).length;
        });
    },
    "8e71": function (t, e) {
      t.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACVElEQVRYCe1Wv4saURA+XDxD2gMrIxJQTGOtAUkbxMrKJqy1FhFS5h+wsLESJJXmChPRYv+CNIKlRSwURMQfZdDCX0ecfLM4y+ayR+4di4TgwPCWfW/m++bbecNeXV3sosD/oAARvYTX4Ndnr+cEPt1ut3gk46wkBLzZbFIoFKLRaHQ+EkB6A18xuKZpBOkpEAichwSA+ZsvNpsNNRoN8ng8JgE7ifl8/h1nnrveEyfwKVcejUZpsVhQvV7/jUSlUqH1ek3oi284715jItlr+NYwDEv2SCRC5XLZIlAqlWi1WlE6nXb3c0jls9mMxuMxBYNBS3aWnl3A4/G4uz0B8CjclN3n81Gn0zFJ+P1+i8R9cCHFjTmZTBBOH5/UDwh8Bb/rdruW7F6vlwqFwh+yS+UCLmutxjOKmsoEEMTdPu31enQ4HCibzVoVS/KHKpd9jvkJQ563SgQEXO65rusmiUQiYZFQANdVwV9w5e1225KdK0omk4+WvVgs0hGGPDklcD6MoGu4waOVm4hf2f1vlTM47Ljf73n9DNc4r5IhyJHEY8F5OPGg4msLu3WFhAq4jOdwOEzL5ZJJfFBSQA4j0FSi3++bE+6hqyay3x/LyEPVapUJfJGcyiuCnw0Ggx/D4dCxJ/L5PAMcW62W1aQMzJ5KpWi32/F+RhnYHoAEjj1hu+dd/t4suQP4e3uuJz/bSTBQLpeTIaNjT4PfMolYLEaZTEYqdwdcWJ9IfMXKxv9h72x7TOITb8AO8ILsub4ieRh+45QY73mE+532Lu8uCvxzCvwC4jD4mHJCwRIAAAAASUVORK5CYII=";
    },
    "8ed7": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      n("c975");
      var i = function () {
        var t = navigator.userAgent,
          e = t.indexOf("Windows") > -1,
          n = t.indexOf("Mac OS") > -1;
        return { isWin: e, isMac: n };
      };
    },
    9009: function (t, e, n) {
      "use strict";
      var i = n("d736");
      n.d(e, "a", function () {
        return i["TemplateType"];
      });
    },
    9400: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return d;
      }),
        n.d(e, "a", function () {
          return h;
        });
      n("99af"), n("4de4"), n("d3b7"), n("6062"), n("3ca3"), n("ddb0");
      var i = n("2909"),
        r = n("d4ec"),
        a = n("bee2"),
        o = n("262e"),
        s = n("2caf"),
        c = n("9009"),
        l = function t() {
          Object(r["a"])(this, t);
        },
        d = {
          "brush:add": "brush",
          "brush:del": "eraser",
          "dot-predictor:rect-first": "rect-dot-predictor",
          "dot-predictor:default": "dot-predictor",
        },
        h = (function (t) {
          Object(o["a"])(n, t);
          var e = Object(s["a"])(n);
          function n(t, i) {
            var a;
            return (
              Object(r["a"])(this, n),
              (a = e.call(this)),
              (a.handleToolUpdate = function (t) {
                a.emit("update:tool", t),
                  a.svc.tryUpdateToolName(t),
                  a.svc.tryUpdateTTByToolName(t);
              }),
              (a.handleError = function () {
                a.emit("error");
              }),
              (a.vm = t),
              (a.svc = i),
              (a.templateType = c["a"].IMG_CLS),
              a.initControlEvents(),
              a.initShapeTrackerEvents(),
              a.initHistoryEvents(),
              a.initZoomerEvents(),
              a
            );
          }
          return (
            Object(a["a"])(n, [
              {
                key: "emit",
                value: function (t) {
                  for (
                    var e,
                      n = arguments.length,
                      i = new Array(n > 1 ? n - 1 : 0),
                      r = 1;
                    r < n;
                    r++
                  )
                    i[r - 1] = arguments[r];
                  (e = this.vm).$emit.apply(e, [t].concat(i));
                },
              },
              {
                key: "bindControlEvents",
                value: function (t, e) {
                  var n = this;
                  if (this.svc.annotator) {
                    var i = this.svc,
                      r = i.annotator,
                      a = i.state;
                    r.events.on(t, function () {
                      a.currentTT === n.templateType &&
                        e.apply(void 0, arguments);
                    });
                  }
                },
              },
              {
                key: "initControlEvents",
                value: function () {
                  this.bindControlEvents("ERROR", this.handleError.bind(this)),
                    this.bindControlEvents("CHANGE", this.onChange.bind(this)),
                    this.bindControlEvents(
                      "SHAPE_CREATING",
                      this.onNewStart.bind(this)
                    ),
                    this.bindControlEvents(
                      "SHAPE_CREATED",
                      this.onNewEnd.bind(this)
                    ),
                    this.bindControlEvents(
                      "SHAPE_ABORTED",
                      this.onNewStop.bind(this)
                    ),
                    this.bindControlEvents(
                      "TOOL_CHANGED",
                      this.onSetTool.bind(this)
                    );
                },
              },
              {
                key: "initShapeTrackerEvents",
                value: function () {
                  var t = this;
                  this.svc.shapeTracker &&
                    this.svc.shapeTracker.events.on("active", function (e) {
                      (t.svc.activeShape.value = e), t.onActive(e);
                    });
                },
              },
              {
                key: "initHistoryEvents",
                value: function () {
                  this.svc.history &&
                    (this.svc.history.events.on(
                      "clear:undo",
                      this.onHistoryClearUndo.bind(this)
                    ),
                    this.svc.history.events.on(
                      "add:undo",
                      this.onHistoryAddUndo.bind(this)
                    ),
                    this.svc.history.events.on(
                      "clear:redo",
                      this.onHistoryClearRedo.bind(this)
                    ),
                    this.svc.history.events.on(
                      "add:redo",
                      this.onHistoryAddRedo.bind(this)
                    ));
                },
              },
              {
                key: "initZoomerEvents",
                value: function () {
                  this.svc.zoomer &&
                    (this.svc.zoomer.events.on(
                      "reset",
                      this.onZoomerRest.bind(this)
                    ),
                    this.svc.zoomer.events.on(
                      "scale",
                      this.onZoomerScale.bind(this)
                    ));
                },
              },
              {
                key: "onChange",
                value: function (t) {
                  this.emit("annotator:change", t), this.emit("pollute");
                },
              },
              { key: "onNewStart", value: function (t) {} },
              { key: "onNewEnd", value: function (t) {} },
              { key: "onNewStop", value: function () {} },
              { key: "onActive", value: function (t) {} },
              {
                key: "onSetTool",
                value: function (t) {
                  this.handleToolUpdate(d[t] || t);
                },
              },
              {
                key: "disableTool",
                value: function (t) {
                  (this.svc.state.enableTools = Object(i["a"])(
                    new Set(
                      this.svc.state.enableTools.filter(function (e) {
                        return e !== t;
                      })
                    )
                  )),
                    (this.svc.state.disableTools = Object(i["a"])(
                      new Set(this.svc.state.disableTools.concat([t]))
                    ));
                },
              },
              {
                key: "enableTool",
                value: function (t) {
                  (this.svc.state.disableTools = Object(i["a"])(
                    new Set(
                      this.svc.state.disableTools.filter(function (e) {
                        return e !== t;
                      })
                    )
                  )),
                    (this.svc.state.enableTools = Object(i["a"])(
                      new Set(this.svc.state.enableTools.concat([t]))
                    ));
                },
              },
              {
                key: "onHistoryClearUndo",
                value: function () {
                  this.disableTool("undo");
                },
              },
              {
                key: "onHistoryAddUndo",
                value: function () {
                  this.enableTool("undo"), this.emit("pollute");
                },
              },
              {
                key: "onHistoryClearRedo",
                value: function () {
                  this.disableTool("redo");
                },
              },
              {
                key: "onHistoryAddRedo",
                value: function () {
                  this.enableTool("redo");
                },
              },
              {
                key: "onZoomerRest",
                value: function () {
                  this.disableTool("mover"),
                    this.disableTool("zoom-out"),
                    this.handleToolUpdate(this.svc.defaultShapeTool);
                },
              },
              {
                key: "onZoomerScale",
                value: function (t) {
                  1 !== t &&
                    (this.enableTool("mover"), this.enableTool("zoom-out"));
                },
              },
            ]),
            n
          );
        })(l);
    },
    "95c1": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      n("99af"), n("4160"), n("159b");
      function i(t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200;
        if (!t) return {};
        var n = t.x,
          i = t.y;
        return e + i > document.body.clientHeight
          ? {
              top: "auto",
              bottom: 0,
              transform: "translate("
                .concat(n, "px, -")
                .concat(document.body.clientHeight - i, "px)"),
            }
          : {
              bottom: "auto",
              top: 0,
              transform: "translate(".concat(n, "px, ").concat(i + 10, "px)"),
            };
      }
    },
    "95cc": function (t, e, n) {
      "use strict";
      var i = n("d308");
      function r(t, e, n) {
        var r, s, l, d;
        e = e || 1;
        for (var h = 0; h < t[0].length; h++) {
          var u = t[0][h];
          (!h || u[0] < r) && (r = u[0]),
            (!h || u[1] < s) && (s = u[1]),
            (!h || u[0] > l) && (l = u[0]),
            (!h || u[1] > d) && (d = u[1]);
        }
        var f = l - r,
          p = d - s,
          b = Math.min(f, p),
          g = b / 2;
        if (0 === b) {
          var v = [r, s];
          return (v.distance = 0), v;
        }
        for (var m = new i(void 0, a), y = r; y < l; y += b)
          for (var x = s; x < d; x += b) m.push(new o(y + g, x + g, g, t));
        var w = c(t),
          _ = new o(r + f / 2, s + p / 2, 0, t);
        _.d > w.d && (w = _);
        var O = m.length;
        while (m.length) {
          var A = m.pop();
          A.d > w.d &&
            ((w = A),
            n &&
              console.log(
                "found best %d after %d probes",
                Math.round(1e4 * A.d) / 1e4,
                O
              )),
            A.max - w.d <= e ||
              ((g = A.h / 2),
              m.push(new o(A.x - g, A.y - g, g, t)),
              m.push(new o(A.x + g, A.y - g, g, t)),
              m.push(new o(A.x - g, A.y + g, g, t)),
              m.push(new o(A.x + g, A.y + g, g, t)),
              (O += 4));
        }
        n &&
          (console.log("num probes: " + O),
          console.log("best distance: " + w.d));
        var k = [w.x, w.y];
        return (k.distance = w.d), k;
      }
      function a(t, e) {
        return e.max - t.max;
      }
      function o(t, e, n, i) {
        (this.x = t),
          (this.y = e),
          (this.h = n),
          (this.d = s(t, e, i)),
          (this.max = this.d + this.h * Math.SQRT2);
      }
      function s(t, e, n) {
        for (var i = !1, r = 1 / 0, a = 0; a < n.length; a++)
          for (var o = n[a], s = 0, c = o.length, d = c - 1; s < c; d = s++) {
            var h = o[s],
              u = o[d];
            h[1] > e !== u[1] > e &&
              t < ((u[0] - h[0]) * (e - h[1])) / (u[1] - h[1]) + h[0] &&
              (i = !i),
              (r = Math.min(r, l(t, e, h, u)));
          }
        return 0 === r ? 0 : (i ? 1 : -1) * Math.sqrt(r);
      }
      function c(t) {
        for (
          var e = 0, n = 0, i = 0, r = t[0], a = 0, s = r.length, c = s - 1;
          a < s;
          c = a++
        ) {
          var l = r[a],
            d = r[c],
            h = l[0] * d[1] - d[0] * l[1];
          (n += (l[0] + d[0]) * h), (i += (l[1] + d[1]) * h), (e += 3 * h);
        }
        return 0 === e
          ? new o(r[0][0], r[0][1], 0, t)
          : new o(n / e, i / e, 0, t);
      }
      function l(t, e, n, i) {
        var r = n[0],
          a = n[1],
          o = i[0] - r,
          s = i[1] - a;
        if (0 !== o || 0 !== s) {
          var c = ((t - r) * o + (e - a) * s) / (o * o + s * s);
          c > 1
            ? ((r = i[0]), (a = i[1]))
            : c > 0 && ((r += o * c), (a += s * c));
        }
        return (o = t - r), (s = e - a), o * o + s * s;
      }
      i.default && (i = i.default), (t.exports = r), (t.exports.default = r);
    },
    "973c": function (t, e, n) {
      var i = n("9fe1");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("6b3283ba", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    9935: function (t, e, n) {
      var i = n("c14d");
      function r(t, e, n) {
        function r(t, e) {
          return {
            id: n ? n.segmentId() : -1,
            start: t,
            end: e,
            myFill: { above: null, below: null },
            otherFill: null,
          };
        }
        function a(t, e, i) {
          return {
            id: n ? n.segmentId() : -1,
            start: t,
            end: e,
            myFill: { above: i.myFill.above, below: i.myFill.below },
            otherFill: null,
          };
        }
        var o = i.create();
        function s(t, n, i, r, a, o) {
          var s = e.pointsCompare(n, a);
          return 0 !== s
            ? s
            : e.pointsSame(i, o)
            ? 0
            : t !== r
            ? t
              ? 1
              : -1
            : e.pointAboveOrOnLine(i, r ? a : o, r ? o : a)
            ? 1
            : -1;
        }
        function c(t, e) {
          o.insertBefore(t, function (n) {
            var i = s(t.isStart, t.pt, e, n.isStart, n.pt, n.other.pt);
            return i < 0;
          });
        }
        function l(t, e) {
          var n = i.node({
            isStart: !0,
            pt: t.start,
            seg: t,
            primary: e,
            other: null,
            status: null,
          });
          return c(n, t.end), n;
        }
        function d(t, e, n) {
          var r = i.node({
            isStart: !1,
            pt: e.end,
            seg: e,
            primary: n,
            other: t,
            status: null,
          });
          (t.other = r), c(r, t.pt);
        }
        function h(t, e) {
          var n = l(t, e);
          return d(n, t, e), n;
        }
        function u(t, e) {
          n && n.segmentChop(t.seg, e),
            t.other.remove(),
            (t.seg.end = e),
            (t.other.pt = e),
            c(t.other, t.pt);
        }
        function f(t, e) {
          var n = a(e, t.seg.end, t.seg);
          return u(t, e), h(n, t.primary);
        }
        function p(r, a) {
          var s = i.create();
          function c(t, n) {
            var i = t.seg.start,
              r = t.seg.end,
              a = n.seg.start,
              o = n.seg.end;
            return e.pointsCollinear(i, a, o)
              ? e.pointsCollinear(r, a, o) || e.pointAboveOrOnLine(r, a, o)
                ? 1
                : -1
              : e.pointAboveOrOnLine(i, a, o)
              ? 1
              : -1;
          }
          function l(t) {
            return s.findTransition(function (e) {
              var n = c(t, e.ev);
              return n > 0;
            });
          }
          function d(t, i) {
            var r = t.seg,
              a = i.seg,
              o = r.start,
              s = r.end,
              c = a.start,
              l = a.end;
            n && n.checkIntersection(r, a);
            var d = e.linesIntersect(o, s, c, l);
            if (!1 === d) {
              if (!e.pointsCollinear(o, s, c)) return !1;
              if (e.pointsSame(o, l) || e.pointsSame(s, c)) return !1;
              var h = e.pointsSame(o, c),
                u = e.pointsSame(s, l);
              if (h && u) return i;
              var p = !h && e.pointBetween(o, c, l),
                b = !u && e.pointBetween(s, c, l);
              if (h) return b ? f(i, s) : f(t, l), i;
              p && (u || (b ? f(i, s) : f(t, l)), f(i, o));
            } else
              0 === d.alongA &&
                (-1 === d.alongB
                  ? f(t, c)
                  : 0 === d.alongB
                  ? f(t, d.pt)
                  : 1 === d.alongB && f(t, l)),
                0 === d.alongB &&
                  (-1 === d.alongA
                    ? f(i, o)
                    : 0 === d.alongA
                    ? f(i, d.pt)
                    : 1 === d.alongA && f(i, s));
            return !1;
          }
          var h = [];
          while (!o.isEmpty()) {
            var u = o.getHead();
            if ((n && n.vert(u.pt[0]), u.isStart)) {
              n && n.segmentNew(u.seg, u.primary);
              var p = l(u),
                b = p.before ? p.before.ev : null,
                g = p.after ? p.after.ev : null;
              function v() {
                if (b) {
                  var t = d(u, b);
                  if (t) return t;
                }
                return !!g && d(u, g);
              }
              n && n.tempStatus(u.seg, !!b && b.seg, !!g && g.seg);
              var m,
                y = v();
              if (y) {
                var x;
                if (t)
                  (x =
                    null === u.seg.myFill.below ||
                    u.seg.myFill.above !== u.seg.myFill.below),
                    x && (y.seg.myFill.above = !y.seg.myFill.above);
                else y.seg.otherFill = u.seg.myFill;
                n && n.segmentUpdate(y.seg), u.other.remove(), u.remove();
              }
              if (o.getHead() !== u) {
                n && n.rewind(u.seg);
                continue;
              }
              if (t)
                (x =
                  null === u.seg.myFill.below ||
                  u.seg.myFill.above !== u.seg.myFill.below),
                  (u.seg.myFill.below = g ? g.seg.myFill.above : r),
                  (u.seg.myFill.above = x
                    ? !u.seg.myFill.below
                    : u.seg.myFill.below);
              else if (null === u.seg.otherFill)
                (m = g
                  ? u.primary === g.primary
                    ? g.seg.otherFill.above
                    : g.seg.myFill.above
                  : u.primary
                  ? a
                  : r),
                  (u.seg.otherFill = { above: m, below: m });
              n && n.status(u.seg, !!b && b.seg, !!g && g.seg),
                (u.other.status = p.insert(i.node({ ev: u })));
            } else {
              var w = u.status;
              if (null === w)
                throw new Error(
                  "PolyBool: Zero-length segment detected; your epsilon is probably too small or too large"
                );
              if (
                (s.exists(w.prev) &&
                  s.exists(w.next) &&
                  d(w.prev.ev, w.next.ev),
                n && n.statusRemove(w.ev.seg),
                w.remove(),
                !u.primary)
              ) {
                var _ = u.seg.myFill;
                (u.seg.myFill = u.seg.otherFill), (u.seg.otherFill = _);
              }
              h.push(u.seg);
            }
            o.getHead().remove();
          }
          return n && n.done(), h;
        }
        return t
          ? {
              addRegion: function (t) {
                for (var n, i = t[t.length - 1], a = 0; a < t.length; a++) {
                  (n = i), (i = t[a]);
                  var o = e.pointsCompare(n, i);
                  0 !== o && h(r(o < 0 ? n : i, o < 0 ? i : n), !0);
                }
              },
              calculate: function (t) {
                return p(t, !1);
              },
            }
          : {
              calculate: function (t, e, n, i) {
                return (
                  t.forEach(function (t) {
                    h(a(t.start, t.end, t), !0);
                  }),
                  n.forEach(function (t) {
                    h(a(t.start, t.end, t), !1);
                  }),
                  p(e, i)
                );
              },
            };
      }
      t.exports = r;
    },
    "9a8c": function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("145e"),
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("copyWithin", function (t, e) {
        return r.call(
          a(this),
          t,
          e,
          arguments.length > 2 ? arguments[2] : void 0
        );
      });
    },
    "9ab4": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      function i(t, e, n, i) {
        var r,
          a = arguments.length,
          o =
            a < 3
              ? e
              : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, n))
              : i;
        if (
          "object" === typeof Reflect &&
          "function" === typeof Reflect.decorate
        )
          o = Reflect.decorate(t, e, n, i);
        else
          for (var s = t.length - 1; s >= 0; s--)
            (r = t[s]) &&
              (o = (a < 3 ? r(o) : a > 3 ? r(e, n, o) : r(e, n)) || o);
        return a > 3 && o && Object.defineProperty(e, n, o), o;
      }
    },
    "9c6a": function (t, e, n) {
      "use strict";
      var i = n("69f0"),
        r = n.n(i);
      r.a;
    },
    "9c84": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return q;
      }),
        n.d(e, "b", function () {
          return ht;
        }),
        n.d(e, "c", function () {
          return bt;
        });
      var i = n("6166"),
        r = n("49d5"),
        a = n("5c61"),
        o = n("69af");
      const s =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      function c(t) {
        let e = "";
        const n = s.length;
        for (let i = 0; i < t; i++)
          e += s.charAt(Math.floor(Math.random() * n));
        return e;
      }
      var l = n("1898"),
        d = n("0ffa"),
        h = n("377b"),
        u = n("f882"),
        f = n("acc5"),
        p = n("25a5"),
        b = n.n(p);
      function g(t) {
        return Math.max(t, 0);
      }
      function v(t, e) {
        const { x: n, y: i } = t,
          r = g(n - e),
          a = g(i - e),
          o = n + e,
          s = i + e,
          c = e / Math.sqrt(2);
        return [
          t,
          { x: r, y: i },
          { x: o, y: i },
          { x: n, y: a },
          { x: n, y: s },
          { x: g(n - c), y: g(i - c) },
          { x: g(n - c), y: i + c },
          { x: n + c, y: g(i - c) },
          { x: n + c, y: i + c },
        ];
      }
      function m(t, e, n) {
        return (n.y - t.y) * (e.x - t.x) > (e.y - t.y) * (n.x - t.x);
      }
      function y(t, e, n, i) {
        const r = m(t, n, i),
          a = m(e, n, i),
          o = m(t, e, n),
          s = m(t, e, i);
        return r != a && o != s;
      }
      const x = (t, e, n) => {
          const { x1: i, y1: r, x2: a, y2: o } = d["b"]([t, e], n);
          return {
            id: `${t.x}-${t.y}-${e.x}-${e.y}-${n}`,
            a: t,
            b: e,
            halfWidth: n,
            minX: i,
            minY: r,
            maxX: a,
            maxY: o,
          };
        },
        w = (t, e) => {
          const n = [];
          for (let i = 0; i < t.length - 1; i++) n.push(x(t[i], t[i + 1], e));
          return n;
        },
        _ = (t, e) => {
          const n = new b.a(),
            i = w(t, e);
          return n.load(i), n;
        };
      function O(t, e) {
        if (!d["f"](t.bbox, e)) return !1;
        switch (t.mode) {
          case "add":
          case "del": {
            const n = { minX: e.x, maxX: e.x, minY: e.y, maxY: e.y },
              r = t.rtree.search(n);
            return r.some(
              (n) => Object(i["c"])(n.a, n.b, e) <= Math.pow(t.radius, 2)
            );
          }
          case "base": {
            const n = Math.floor(t.bbox.x2 - t.bbox.x1 + 1),
              i = Math.floor(e.x - t.bbox.x1),
              r = Math.floor(e.y - t.bbox.y1),
              a = r * n + i;
            return t.bitmap.get(a);
          }
        }
      }
      function A(t, e, n) {
        switch (t.mode) {
          case "add":
          case "del": {
            const r = w(e, n),
              a = {};
            for (const e of r) {
              const n = t.rtree.search(e);
              for (const t of n) a[t.id] = t;
            }
            const o = Object.values(a);
            return (
              !!o.length &&
              o.some((t) =>
                r.some((e) => {
                  const n = y(t.a, t.b, e.a, e.b);
                  if (n) return !0;
                  const r = Object(i["c"])(t.a, t.b, e.a),
                    a = Object(i["c"])(t.a, t.b, e.b),
                    o = Math.min(a, r),
                    s = Math.pow(e.halfWidth + t.halfWidth, 2);
                  return o <= s;
                })
              )
            );
          }
          case "base":
            return e.some((e) => v(e, n).some((e) => O(t, e)));
        }
      }
      function k(t, e) {
        return (
          !t.deleted &&
          !!d["f"](t.bbox, e) &&
          t.actions.reduce((t, n) => {
            switch (n.mode) {
              case "base":
              case "add":
                return t || O(n, e);
              case "del":
                return t && !O(n, e);
            }
          }, !1)
        );
      }
      function E(t, e, n) {
        return (
          !(!t || !e.length) &&
          t.actions.reduce((t, i) => {
            switch (i.mode) {
              case "base":
              case "add":
                return t || A(i, e, n);
              case "del":
                return t;
            }
          }, !1)
        );
      }
      function j(t, e) {
        return Object(f["h"])(t) || d["c"](e);
      }
      function I(t, e) {
        const n = "del" === e.mode ? t.bbox : d["g"](t.bbox, e.bbox),
          { points: i = [], radius: r = 0 } = "base" === e.mode ? {} : e,
          a = d["i"](i, r),
          o = d["j"](t.regions || [], a, e.mode);
        return Object.assign(Object.assign({}, t), {
          actions: t.actions.concat(e),
          bbox: n,
          center: j(o, n),
          mask: void 0,
          regions: o,
        });
      }
      class C {
        push(t) {
          this.draft
            ? (this.draft = this.draft.concat(t.current))
            : (this.draft = [t.start, t.current]);
        }
        end(t, e, n) {
          if (!this.draft) return;
          const i = this.draft.concat(t.current),
            r = _(i, n);
          return (
            this.stop(),
            { mode: e, radius: n, points: i, bbox: d["b"](i, n), rtree: r }
          );
        }
        stop() {
          this.draft = void 0;
        }
      }
      class S {
        constructor(t, e) {
          (this.nextId = t),
            (this.getShapes = e),
            (this.actionCreator = new C());
        }
        push(t) {
          this.actionCreator.push(t);
        }
        end(t, e, n, i) {
          const r = this.actionCreator.end(e, n, i);
          if (!r || (!t && "del" === r.mode)) return;
          const a = "base" === r.mode ? [] : r.points;
          if (E(t, a, i)) {
            const e = I(t, r);
            return [
              this.getShapes().reduce(
                (t, n) => t.concat(n.id === e.id ? e : n),
                []
              ),
              {
                type: "add-action",
                actionId: e.actions.length - 1,
                shapeId: e.id,
              },
              null === t || void 0 === t ? void 0 : t.id,
            ];
          }
          const o = this.nextId(),
            s = d["i"](a, i),
            c = {
              id: o,
              alias: o,
              bbox: Object.assign({}, r.bbox),
              actions: [r],
              center: j(s, r.bbox),
              regions: s,
            };
          return [
            this.getShapes().concat(c),
            { type: "add-shape", actionId: 0, shapeId: c.id },
            c.id,
          ];
        }
        getDraft() {
          return this.actionCreator.draft;
        }
      }
      const T = (t) => "string" === typeof t || t instanceof String;
      function M(t) {
        let e,
          n,
          i = 0,
          r = 0,
          a = !1;
        const o = [];
        if (!T(t)) return [];
        i = 0;
        while (t[r]) {
          (n = 0), (e = 0), (a = !0);
          while (a && t[r]) {
            const i = t[r].charCodeAt(0) - 48;
            (n |= (31 & i) << (5 * e)),
              (a = !!(32 & i)),
              r++,
              e++,
              !a && 16 & i && (n |= -1 << (5 * e));
          }
          i > 2 && (n += o[i - 2]), (o[i++] = n);
        }
        return o;
      }
      function R(t, e) {
        const n = new u["a"](t);
        let i,
          r,
          a = !1,
          o = 0;
        for (i = 0; i < e.length; i++) {
          for (r = 0; r < e[i]; r++) a && n.set(o, a), o++;
          a = !a;
        }
        return n;
      }
      function D(t, e) {
        const n = M(t);
        if (1 !== n.length) return R(e, n);
      }
      class L {
        constructor() {
          (this.idBase = 1),
            (this.shapes = []),
            (this.creator = new S(this.nextId.bind(this), () => this.shapes)),
            (this.config = {
              resolution: { width: 0, height: 0 },
              radius: 0,
              mode: "add",
            }),
            (this.getShapes = Object(o["c"])(
              () => [this.shapes],
              (t) =>
                Object(h["b"])(t, (t) => {
                  if (!t.deleted)
                    return Object.assign(Object.assign({}, t), {
                      actions: t.actions.filter((t) => !t.deleted),
                    });
                })
            ));
        }
        teardown() {
          (this.editingId = void 0), (this.shapes = []);
        }
        handleDrag(t) {
          this.creator.push(t);
        }
        handleDragEnd(t) {
          const e = this.creator.end(
            this.getEditingShape(),
            t,
            this.config.mode,
            this.config.radius
          );
          if (!e) return;
          const [n, i, r] = e;
          return (this.editingId = r), (this.shapes = n), i;
        }
        getVisibleShapes(t) {
          return this.shapes.filter((e) => t.find((t) => t.id === e.id));
        }
        handleClick(t, e) {
          const n = this.getVisibleShapes(e).find((e) => k(e, t.point));
          this.editingId = null === n || void 0 === n ? void 0 : n.id;
        }
        handleHover(t, e) {
          const n = this.getVisibleShapes(e).find((e) => k(e, t.point));
          return null === n || void 0 === n ? void 0 : n.id;
        }
        syncConfig(t) {
          this.config = t;
        }
        createFromMask(t) {
          (this.editingId = void 0), (this.shapes = []);
          const e = [];
          for (const n of t) {
            const {
                resolution: { width: t, height: i },
                alias: r,
                mask: a,
                bbox: o,
              } = n,
              s = D(a, t * i);
            if (!s) continue;
            const c = { width: o.x2 - o.x1 + 1, height: o.y2 - o.y1 + 1 },
              l = new u["a"](c.width * c.height),
              d = [];
            s.ones((t) => {
              const e = { x: Math.floor(t / i), y: t % i },
                n = e.x - o.x1,
                r = e.y - o.y1;
              l.set(r * c.width + n, !0), d.push(e);
            }),
              e.push(
                this.doCreateFromBitmap(r, l, o, d[Math.floor(d.length / 2)])
              );
          }
          this.shapes = e;
        }
        createFromMergedBits(t) {
          for (const e of t) {
            const { resolution: t, bits: n, aliasPrefix: i } = e,
              { width: r, height: a } = t,
              o = {};
            for (let e = 0; e < r; e++)
              for (let t = 0; t < a; t++) {
                const i = t * r + e,
                  s = n[i];
                if (!s) continue;
                const c = "" + s,
                  l = o[c] || {
                    bitmap: new u["a"](r * a),
                    bbox: { x1: e, y1: t, x2: e, y2: t },
                    index: s,
                    firstPoint: { x: e, y: t },
                  };
                (l.bbox = Object(d["a"])(l.bbox, { x: e, y: t })),
                  l.bitmap.set(i, !0),
                  (o[c] = l);
              }
            for (const e of Object.values(o)) {
              const { bitmap: t, bbox: n } = e,
                a = { width: n.x2 - n.x1 + 1, height: n.y2 - n.y1 + 1 },
                o = new u["a"](a.width * a.height);
              t.ones((t) => {
                const e = (t % r) - n.x1,
                  i = Math.floor(t / r) - n.y1;
                o.set(i * a.width + e, !0);
              });
              const s = this.doCreateFromBitmap(
                `${i}-${e.index}`,
                o,
                n,
                e.firstPoint
              );
              this.shapes = this.shapes.concat(s);
            }
          }
        }
        createFromBitmap(t, e, n) {
          const i = this.doCreateFromBitmap(void 0, t, e, n);
          return (
            (this.shapes = this.shapes.concat(i)),
            { type: "add-shape", actionId: 0, shapeId: i.id }
          );
        }
        removeShape(...t) {
          const e = t.filter(Boolean);
          if (e.length)
            return (
              (this.shapes = this.shapes.map((t) =>
                e.includes(t.id)
                  ? Object.assign(Object.assign({}, t), { deleted: !0 })
                  : t
              )),
              { type: "del-shape", actionId: 0, shapeId: e.join(",") }
            );
        }
        setEditingId(t) {
          this.editingId = t;
        }
        getEditingId() {
          return this.editingId;
        }
        getDraftAction() {
          const t = this.creator.getDraft();
          if (t) return { points: t, radius: this.config.radius };
        }
        undo(t) {
          switch (t.type) {
            case "add-shape":
              this.editingId === t.shapeId && (this.editingId = void 0),
                (this.shapes = this.shapes.map((e) =>
                  e.id !== t.shapeId
                    ? e
                    : Object.assign(Object.assign({}, e), { deleted: !0 })
                ));
              break;
            case "del-shape": {
              const e = t.shapeId.split(",");
              this.shapes = this.shapes.map((t) =>
                e.includes(t.id)
                  ? Object.assign(Object.assign({}, t), { deleted: !1 })
                  : t
              );
              break;
            }
            case "add-action":
              this.shapes = this.shapes.map((e) => {
                if (e.id !== t.shapeId) return e;
                const n = e.actions.map((e, n) =>
                  n !== t.actionId
                    ? e
                    : Object.assign(Object.assign({}, e), { deleted: !0 })
                );
                return Object.assign(Object.assign({}, e), { actions: n });
              });
              break;
          }
        }
        redo(t) {
          switch (t.type) {
            case "add-shape":
              this.shapes = this.shapes.map((e) =>
                e.id !== t.shapeId
                  ? e
                  : Object.assign(Object.assign({}, e), { deleted: !1 })
              );
              break;
            case "del-shape":
              this.shapes = this.shapes.map((e) => {
                const n = t.shapeId.split(",");
                return n.includes(e.id)
                  ? Object.assign(Object.assign({}, e), { deleted: !0 })
                  : e;
              });
              break;
            case "add-action":
              this.shapes = this.shapes.map((e) => {
                if (e.id !== t.shapeId) return e;
                const n = e.actions.map((e, n) =>
                  n !== t.actionId
                    ? e
                    : Object.assign(Object.assign({}, e), { deleted: !1 })
                );
                return Object.assign(Object.assign({}, e), { actions: n });
              });
              break;
          }
        }
        getEditingShape() {
          if (this.editingId)
            return this.shapes.find((t) => t.id === this.editingId);
        }
        nextId() {
          return "brush-" + this.idBase++;
        }
        doCreateFromBitmap(t, e, n, i) {
          const r = this.nextId(),
            a = {
              id: r,
              alias: t || r,
              actions: [{ mode: "base", bbox: n, bitmap: e }],
              bbox: n,
              center: i || Object(d["c"])(n),
            };
          return (this.editingId = r), a;
        }
      }
      var N = n("a4c5");
      const P = "brush",
        z = [P],
        B = [P + "_base"].concat(z),
        U = [P + "_add"].concat(z),
        H = [P + "_del"].concat(z),
        F = [P + "_draft", "draft", "active"].concat(z),
        K = [P + "_active", "active"].concat(z),
        W = [P + "_editing"].concat(z);
      function Y(t, e) {
        const { x1: n, y1: i, x2: r, y2: a } = t.bbox;
        return {
          type: "bitmap",
          cacheId: e.cacheId,
          class: B,
          data: {
            width: r - n + 1,
            height: a - i + 1,
            bitmap: t.bitmap,
            target: t.bbox,
          },
        };
      }
      function V(t, e) {
        return {
          type: "brush",
          class: U,
          data: { radius: t.radius, points: t.points },
        };
      }
      function G(t, e) {
        return {
          type: "brush",
          class: H,
          reversed: !0,
          data: { radius: t.radius, points: t.points },
        };
      }
      const Z = { base: Y, add: V, del: G };
      function Q(t, e) {
        return [
          {
            type: "canvas",
            labelId: e.labelId,
            class: e.editing ? W : e.active ? K : z,
            data: t.actions
              .map((n, i) =>
                Z[n.mode](
                  n,
                  Object.assign(Object.assign({}, e), {
                    cacheId: `${t.id}-${i}-${e.labelId}${
                      e.editing ? "-editing" : ""
                    }`,
                  })
                )
              )
              .concat(e.showingLabel ? Object(N["b"])(t, e) : []),
          },
        ];
      }
      function J(t) {
        return { type: "brush", class: F, data: t };
      }
      class X {
        constructor() {
          (this.radius = 20), (this.mode = "add");
        }
      }
      const $ = "mask";
      class q extends l["a"] {
        constructor(t) {
          super(),
            (this.name = "brush"),
            (this.control = new X()),
            (this.backend = new L()),
            (this.mode = "add"),
            (this.doRespond = (t) => {
              switch (t.kind) {
                case "click":
                case "contextmenu":
                  return this.handleClick(t);
                case "drag":
                  return this.handleDrag(t);
                case "dragEnd":
                  return this.handleDragEnd(t);
                case "press":
                  return this.handleKeyPress(t);
                case "hover":
                  return this.handleHover(t);
              }
            }),
            (this.getRenderJobs = Object(o["c"])(
              () => [
                this.getInstantRenderJobs(),
                this.getHotRenderJobs(),
                this.getColdRenderJobs(),
              ],
              (t, e, n) => ({ instant: t, hot: e, cold: n })
            )),
            (this.handleHover = (t) => {
              var e;
              const n = this.backend.handleHover(t, this.getVisibleShapes()),
                i = this.isVisible(n) ? n : void 0;
              if (
                ((this.hoverId = i),
                i &&
                  i !==
                    (null === (e = this.getEditingShape()) || void 0 === e
                      ? void 0
                      : e.id))
              )
                return this.setCursor("activate"), a["a"].DONE;
              this.setCursor();
            }),
            (this.handleClick = (t) => {
              var e;
              if (
                (this.backend.handleClick(t, this.getVisibleShapes()),
                null === (e = this.getEditingShape()) || void 0 === e
                  ? void 0
                  : e.id)
              )
                return a["a"].RETRIEVE;
            }),
            (this.handleKeyPress = this.skipIfNotActive((t) => {
              switch (t.value) {
                case "Backspace":
                case "Delete": {
                  const t = this.getEditingShape(),
                    e = t ? this.backend.removeShape(t.id) : void 0;
                  return this.snapshot(e), a["a"].DONE;
                }
              }
            })),
            (this.handleDrag = this.skipIfNotActive(
              (t) => (
                this.syncState(),
                this.backend.handleDrag(t, this.control.mode),
                a["a"].DONE
              )
            )),
            (this.handleDragEnd = this.skipIfNotActive((t) => {
              const e = this.backend.handleDragEnd(t);
              if (e && "add-shape" === e.type) {
                const t = this.getEditingShape();
                this.emitCreatorEvent("created", t);
              }
              return this.snapshot(e), a["a"].DONE;
            })),
            (this.getInstantRenderJobs = Object(o["c"])(
              () => {
                const t = this.backend.getDraftAction();
                return [t, t ? r["a"] : this.getHoverLabelJob()];
              },
              (t, e) => (t ? [J(t)] : e)
            )),
            (this.getHotRenderJobs = Object(o["c"])(
              () => {
                const t = this.getEditingShape(),
                  e = Boolean(this.backend.getDraftAction()),
                  n = this.context.resource.resolution;
                return [t, e, n, this.context.labelMap[this.name]];
              },
              (t, e, n) =>
                t
                  ? Q(
                      t,
                      Object.assign(Object.assign({}, n), {
                        active: !0,
                        editing: e,
                        labelId: this.getLabelId(t),
                      })
                    )
                  : r["a"]
            )),
            (this.getColdRenderJobs = Object(o["c"])(
              () => {
                const t = this.getShapesNotEditing(),
                  e = this.context.resource.resolution;
                return [
                  t,
                  e,
                  this.context.config.alwaysShowLabel,
                  this.context.labelMap[this.name],
                ];
              },
              (t, e, n) =>
                t.reduce(
                  (t, i) =>
                    t.concat(
                      Q(
                        i,
                        Object.assign(Object.assign({}, e), {
                          showingLabel: n,
                          labelId: this.getLabelId(i),
                        })
                      )
                    ),
                  []
                )
            )),
            (this.getShapesNotEditing = Object(o["c"])(
              () => {
                const t = this.getVisibleShapes(),
                  e = this.getEditingId();
                return [t, e];
              },
              (t, e) => t.filter((t) => t.id !== e)
            )),
            t && (this.backend = t),
            this.syncState();
        }
        activate(t) {
          super.activate(t), (this.mode = this.mode || "add"), this.syncState();
        }
        deactivate() {
          super.deactivate(), this.backend.setEditingId(void 0);
        }
        restoreShapes(t) {
          const e = this.context.resource.resolution,
            n = { x1: 0, x2: e.width - 1, y1: 0, y2: e.height - 1 },
            i = [],
            r = [];
          for (const a of t)
            "mask" in a
              ? i.push({
                  alias: a.alias || a.id || c(16),
                  mask: a.mask,
                  bbox: a.bbox || n,
                  resolution: e,
                })
              : r.push({
                  resolution: e,
                  bits: a.bits,
                  aliasPrefix: a.aliasPrefix || $,
                });
          this.backend.createFromMask(i),
            this.backend.createFromMergedBits(r),
            this.backend.setEditingId(void 0);
        }
        getControl() {
          return this.control;
        }
        getAnnotations() {
          return this.backend.getShapes();
        }
        createFromBitmap(t, e, n) {
          const i = this.backend.createFromBitmap(t, e, n);
          if (!i) return;
          this.snapshot(i);
          const r = this.getVisibleShapes(),
            a = r[r.length - 1];
          return this.emitCreatorEvent("created", a), a;
        }
        syncState() {
          if (!this.context) return;
          const {
            resource: { resolution: t },
            facts: {
              coord: { dom: e, res: n },
            },
          } = this.context;
          this.backend.syncConfig({
            resolution: t,
            radius: Object(i["f"])(this.control.radius, e, n),
            mode: this.mode,
          });
        }
        skipIfNotActive(t) {
          return (...e) => {
            if (this.active && !this.context.config.readonly) return t(...e);
          };
        }
        snapshot(t, e) {
          t &&
            this.pushHistory({
              id: e,
              sideEffect: !0,
              undo: () => {
                this.backend.undo(t);
              },
              redo: () => {
                this.backend.redo(t);
              },
            });
        }
        getEditingId() {
          return this.backend.getEditingId();
        }
        deleteAnnotations(t) {
          const e = this.getAnnotations(),
            n = "alias" in t ? t.alias : "",
            i = "labelId" in t ? t.labelId : "",
            r = e.reduce((t, e) => {
              const r = i ? this.getLabelId(e) === i : e.alias === n;
              return r ? t.concat(e.id) : t;
            }, []),
            a = this.backend.removeShape(...r);
          this.backend.setEditingId(void 0),
            this.snapshot(a, `delete-annotations-${n}-${i}`);
        }
      }
      var tt = n("2d45"),
        et = n("b3b5"),
        nt = n("1344"),
        it = n("fa2b");
      const rt = (t, e) => {
        const n = e.x2 - e.x1 + 1,
          i = e.y2 - e.y1 + 1,
          r = window.atob(t),
          a = Array.from({ length: n * i });
        console.time("decode");
        for (let o = 0; o < r.length; o++) a[o] = r.charCodeAt(o);
        return (
          console.timeEnd("decode"),
          n * i !== r.length &&
            console.error(
              `Mismatched predition, expected: ${n * i}, actual: ${r.length}`
            ),
          Uint8Array.from(a)
        );
      };
      var at = n("742c"),
        ot = n("e0fb"),
        st = n("eab8"),
        ct = function (t, e, n, i) {
          function r(t) {
            return t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                });
          }
          return new (n || (n = Promise))(function (n, a) {
            function o(t) {
              try {
                c(i.next(t));
              } catch (e) {
                a(e);
              }
            }
            function s(t) {
              try {
                c(i["throw"](t));
              } catch (e) {
                a(e);
              }
            }
            function c(t) {
              t.done ? n(t.value) : r(t.value).then(o, s);
            }
            c((i = i.apply(t, e || [])).next());
          });
        };
      class lt {
        constructor(t, e, n) {
          (this.thresholdWatcher = new et["a"](100)),
            (this.events = Object(nt["a"])()),
            (this.predict = Object(tt["c"])(t.predict)),
            (this.threshold = t.threshold || 0.4),
            (this.sequential = t.sequential || !0),
            (this.dotLimit = t.dotLimit || 10),
            (this.confirm = e),
            (this.reset = n);
        }
        isThresholdChanging() {
          return this.thresholdWatcher.isChangedRecently(this.threshold);
        }
      }
      class dt extends it["a"] {
        constructor(t, e) {
          super(t),
            (this.name = "dot-predictor"),
            (this.mode = "default"),
            (this.clickList = []),
            (this.predicting = !1),
            (this.predictionId = 1),
            (this.getRenderJobs = Object(o["c"])(
              () => [
                this.active,
                this.getColdRenderJobs(),
                this.clickList,
                this.constraint,
              ],
              (t, e, n, i) => {
                if (!t) return r["c"];
                const a = i ? Object(at["b"])(i) : void 0,
                  o = n.map(at["a"]);
                return { hot: a ? o.concat(a) : o, cold: e };
              }
            )),
            (this.getColdRenderJobs = Object(o["c"])(
              () => [
                this.control.isThresholdChanging()
                  ? void 0
                  : this.getPredictionUnderThreshold(),
              ],
              (t) =>
                t
                  ? [Object(at["c"])(t.mask, t.bbox, this.getCacheId())]
                  : r["a"]
            )),
            (this.getPredictionUnderThreshold = Object(o["c"])(
              () => [this.prediction, this.control.threshold, this.getBbox()],
              (t, e, n) => {
                if (!t) return;
                const i = 100 * e,
                  r = n.x2 - n.x1 + 1,
                  a = n.y2 - n.y1 + 1,
                  o = new u["a"](r * a);
                let s = null;
                console.time("bitrize");
                for (let c = 0; c < r; c++)
                  for (let e = 0; e < a; e++) {
                    const a = e * r + c;
                    if (t[a] < i) continue;
                    o.set(a, !0);
                    const l = c + n.x1,
                      h = e + n.y1;
                    s
                      ? (s = Object(d["a"])(s, { x: l, y: h }))
                      : (s = { x1: l, y1: h, x2: l, y2: h });
                  }
                return (
                  console.timeEnd("bitrize"),
                  (s = s || n),
                  { mask: o, bbox: n, maskBbox: s }
                );
              }
            )),
            (this.getBbox = Object(o["c"])(
              () => [
                this.mode,
                this.context.resource.resolution,
                this.constraint,
              ],
              (t, e, n) => {
                const i = { x1: 0, y1: 0, x2: e.width - 1, y2: e.height - 1 };
                return n && "rect-first" === t ? Object(d["k"])(n, i) : i;
              }
            )),
            (this.getCacheId = () =>
              `${this.name}-${this.predictionId}-${this.control.threshold}`),
            (this.control = new lt(e, this.confirm.bind(this), () => {
              this.reset(), (this.lastConfirmed = void 0);
            }));
        }
        deactivate() {
          super.deactivate(), this.reset(), (this.lastConfirmed = void 0);
        }
        getControl() {
          return this.control;
        }
        doRespond(t) {
          switch (t.kind) {
            case "wheel":
            case "rightDragEnd":
              return;
            case "hover":
              return () => this.setCursor();
          }
          if (!this.isEditable()) return a["a"].DONE;
          switch (t.kind) {
            case "click": {
              const e = () => {
                (this.lastConfirmed = void 0),
                  this.markAndPredict(t.point, ot["a"].Positive);
              };
              return this.clickList.length || this.constraint
                ? (e(), a["a"].DONE)
                : e;
            }
            case "contextmenu":
              return this.clickList.length
                ? (this.markAndPredict(t.point, ot["a"].Negative), a["a"].DONE)
                : a["a"].DONE;
            case "drag":
              return this.handleDrag(t);
            case "dragEnd":
              return this.handleDragEnd(t);
            case "press":
              return this.handleKeyPress(t);
            case "label":
              return this.srcTool.respond(t), a["a"].DONE;
            case "delete-annotation":
              return (
                (this.lastConfirmed = void 0),
                this.srcTool.respond(t),
                a["a"].DONE
              );
          }
          return a["a"].DONE;
        }
        getEditingShape() {
          if (!this.lastConfirmed || this.clickList.length) return;
          const { bbox: t, firstPoint: e, alias: n } = this.lastConfirmed;
          return { bbox: t, center: e, alias: n };
        }
        handleKeyPress(t) {
          switch (t.value) {
            case "Enter":
              this.confirm();
              break;
            case "Escape":
              this.reset();
              break;
          }
          return a["a"].DONE;
        }
        handleDrag(t) {
          return (
            this.clickList.length ||
              "rect-first" !== this.mode ||
              (this.constraint || this.control.events.emit("rect:start"),
              (this.lastConfirmed = void 0),
              (this.constraint = Object(d["e"])([t.start, t.current]))),
            a["a"].DONE
          );
        }
        handleDragEnd(t) {
          if (!this.constraint || this.clickList.length) return a["a"].DONE;
          const e = Object(d["e"])([t.start, t.current]);
          if (((this.constraint = this.normalizeBbox(e)), !this.constraint))
            return (
              this.reset(),
              this.control.events.emit("error", { code: "invalid-bbox" }),
              a["a"].DONE
            );
          const n = Object(i["d"])(
            e,
            this.context.facts.coord.res,
            this.context.facts.coord.dom
          );
          return this.control.events.emit("rect:end", n), a["a"].DONE;
        }
        markAndPredict(t, e) {
          return ct(this, void 0, void 0, function* () {
            if (!this.clickList.length && e === ot["a"].Negative) return;
            if ("rect-first" === this.mode && !this.constraint) return;
            if (!this.isEditable()) return;
            if (!this.isValidPoint(t))
              return void this.control.events.emit("error", {
                code: "invalid-point",
              });
            const n = Object.assign(Object.assign({}, t), { type: e }),
              i = this.clickList,
              r = this.clickList.concat(n);
            this.clickList = r;
            let a = this.prediction;
            const o = this.prediction;
            this.pushHistory({
              group: this.name,
              redo: () => {
                (this.clickList = r),
                  (this.prediction = a),
                  (this.predicting = !1);
              },
              undo: () => {
                (this.clickList = i),
                  (this.prediction = o),
                  (this.predicting = !1);
              },
            }),
              (this.predicting = !0);
            try {
              (a = yield this.predict(r, this.getBbox())),
                (this.prediction = a),
                (this.predictionId += 1);
            } finally {
              this.predicting = !1;
            }
          });
        }
        predict(t, e) {
          return ct(this, void 0, void 0, function* () {
            this.control.events.emit("predicting");
            let n = this.prediction;
            try {
              const i = yield this.control.predict(
                t.map((t) => ({ x: t.x, y: t.y, type: t.type })),
                e
              ).result;
              n = rt(i, e);
            } catch (i) {
              console.error(i),
                this.control.events.emit("error", { code: i.message });
            }
            return this.control.events.emit("predicted"), n;
          });
        }
        isValidPoint(t) {
          return Object(d["f"])(this.getBbox(), t);
        }
        pushHistory(t) {
          t.redo(), this.context.events.emit("HISTORY", t);
        }
        reset() {
          (this.clickList = []),
            (this.prediction = void 0),
            (this.constraint = void 0),
            this.context.events.emit("HISTORY:CLEAR", this.name),
            this.control.events.emit("cancelled");
        }
        confirm() {
          const t = this.getPredictionUnderThreshold();
          if (!t) return a["a"].DONE;
          const { mask: e, bbox: n, maskBbox: i } = t;
          let r = e;
          if (!Object(st["a"])(n, i)) {
            const t = n.x2 - n.x1 + 1,
              a = i.x2 - i.x1 + 1,
              o = i.y2 - i.y1 + 1;
            (r = new u["a"](a * o)),
              e.ones((e) => {
                const o = (e % t) - i.x1 + n.x1,
                  s = Math.floor(e / t) - i.y1 + n.y1;
                r.set(s * a + o, !0);
              });
          }
          const { alias: o } = this.srcTool.createFromBitmap(
            r,
            i,
            this.clickList[0]
          );
          (this.lastConfirmed = {
            bbox: i,
            alias: o,
            firstPoint: this.clickList[0],
          }),
            this.control.events.emit("confirmed"),
            this.reset();
        }
        isEditable() {
          return !this.predicting || !this.control.sequential;
        }
        normalizeBbox(t) {
          const e = {
              x1: Math.floor(t.x1),
              x2: Math.floor(t.x2),
              y1: Math.floor(t.y1),
              y2: Math.floor(t.y2),
            },
            { x1: n, y1: i, x2: r, y2: a } = e,
            { width: o, height: s } = this.context.resource.resolution;
          if (!(n < 0 || i < 0 || r >= o || a >= s)) return e;
        }
      }
      const ht = (t, e) => {
          const n = new dt(t, e);
          return n;
        },
        ut = (t, e, n) => {
          const i = [],
            { x: r, y: a } = t;
          for (let o = 0; o < e; o++)
            for (let t = 0; t < e; t++) n({ x: r + o, y: a + t });
          return i;
        };
      function ft(t) {
        let e,
          n,
          i = 0;
        const r = [];
        let a;
        for (let s = 0; s < t.length; s++) {
          (e = t[s]), s > 2 && (e -= t[s - 2]), (a = !0);
          while (a)
            (n = 31 & e),
              (e >>= 5),
              (a = 16 & n ? -1 !== e : 0 !== e),
              a && (n |= 32),
              (n += 48),
              (r[i++] = n);
        }
        const o = r.reduce((t, e) => t + String.fromCharCode(e), "");
        return o;
      }
      function pt(t) {
        let e, n;
        const i = [];
        if (
          (t.ones((t) => {
            if (null == e || null == n) return (e = t), (n = t), void i.push(t);
            if (t - n <= 1) return void (n = t);
            const r = n - e + 1;
            i.push(r);
            const a = t - n - 1;
            i.push(a), (e = t), (n = t);
          }),
          !n || !e)
        )
          return i;
        i.push(n - e + 1);
        const r = t.size - n - 1;
        return r && i.push(r), i;
      }
      function bt(t, e, n) {
        const i = 2,
          r = new u["a"](n.width * n.height);
        for (let o = e.x1; o <= e.x2; o += i)
          for (let a = e.y1; a <= e.y2; a += i) {
            const e = { x: o, y: a };
            k(t, e) &&
              ut(e, i, ({ x: t, y: e }) => {
                const i = t * n.height + e;
                r.set(i, !0);
              });
          }
        const a = pt(r);
        return a.length < 4 ? "" : ft(a);
      }
    },
    "9fe1": function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".addon-guideline[data-v-63911548]{position:fixed;left:0;top:0;z-index:200;pointer-events:none}.addon-guideline .guideline[data-v-63911548]{position:absolute;background:#1a73e8;width:1px;height:1px}",
          "",
        ]),
        (t.exports = e);
    },
    a078: function (t, e, n) {
      var i = n("7b0b"),
        r = n("50c4"),
        a = n("35a1"),
        o = n("e95a"),
        s = n("0366"),
        c = n("ebb5").aTypedArrayConstructor;
      t.exports = function (t) {
        var e,
          n,
          l,
          d,
          h,
          u,
          f = i(t),
          p = arguments.length,
          b = p > 1 ? arguments[1] : void 0,
          g = void 0 !== b,
          v = a(f);
        if (void 0 != v && !o(v)) {
          (h = v.call(f)), (u = h.next), (f = []);
          while (!(d = u.call(h)).done) f.push(d.value);
        }
        for (
          g && p > 2 && (b = s(b, arguments[2], 2)),
            n = r(f.length),
            l = new (c(this))(n),
            e = 0;
          n > e;
          e++
        )
          l[e] = g ? b(f[e], e) : f[e];
        return l;
      };
    },
    a09e: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var i = n("1344");
      class r {
        constructor(t) {
          (this.events = Object(i["a"])()),
            (this.undoQ = []),
            (this.redoQ = []),
            (this.size = t.size);
        }
        push(t) {
          (this.undoQ =
            this.mergeLast(this.undoQ, t) || this.fixedSizePush(this.undoQ, t)),
            (this.redoQ.length = 0),
            this.events.emit("add:undo"),
            this.events.emit("clear:redo");
        }
        undo() {
          if (!this.undoQ.length) return;
          const t = this.undoQ.pop(),
            e = this.execAction("undo", t);
          return (
            this.events.emit("add:redo"),
            0 === this.undoQ.length && this.events.emit("clear:undo"),
            e
          );
        }
        redo() {
          if (!this.redoQ.length) return;
          const t = this.redoQ.pop(),
            e = this.execAction("redo", t);
          return (
            this.events.emit("add:undo"),
            0 === this.redoQ.length && this.events.emit("clear:redo"),
            e
          );
        }
        clear(t) {
          t
            ? this.clearSpecificGroup(t)
            : ((this.undoQ = []),
              (this.redoQ = []),
              this.events.emit("clear:undo"),
              this.events.emit("clear:redo"));
        }
        teardown() {
          this.clear(), this.events.all.clear();
        }
        clearSpecificGroup(t) {
          (this.redoQ = []),
            this.events.emit("clear:redo"),
            (this.undoQ = this.undoQ.filter((e) => e.group !== t)),
            this.undoQ.length || this.events.emit("clear:undo");
        }
        execAction(t, e) {
          const n = "undo" === t ? this.redoQ : this.undoQ;
          this.fixedSizePush(n, e), e[t]();
        }
        fixedSizePush(t, e) {
          t.push(e);
          const n = t.length - this.size;
          return n <= 0 || t.splice(0, n), t;
        }
        mergeLast(t, e) {
          const n = t[t.length - 1];
          if (!n) return;
          const i = e.id,
            r = n.id;
          return i && r
            ? t.slice(0, t.length - 1).concat({
                id: i,
                group: e.group,
                undo: () => {
                  n.undo(), e.undo();
                },
                redo: () => {
                  n.redo(), e.redo();
                },
              })
            : void 0;
        }
      }
      const a = { size: 30 },
        o = (t) => ({
          id: "history",
          setup({ contextManager: e }) {
            const n = new r(Object.assign(Object.assign({}, a), t));
            return (
              e.context.events.on("HISTORY", n.push.bind(n)),
              e.context.events.on("HISTORY:CLEAR", n.clear.bind(n)),
              e.context.events.on("INITIALIZED", n.clear.bind(n)),
              n
            );
          },
        });
    },
    a215: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "default", function () {
          return us;
        });
      var i = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              ref: "wrapperRef",
              staticClass: "img-new-annotator",
              on: {
                mousemove: t.syncMouse,
                click: function (e) {
                  return e.stopPropagation(), t.syncClickMouse(e);
                },
              },
            },
            [
              n("VisAnnotator", {
                staticClass: "g-image",
                attrs: {
                  src: t.src,
                  labels: t.labelCState.labels,
                  tools: t.toolState.tools,
                  plugins: t.builtinPlugins,
                  readonly: t.readonly,
                  predictStatus: t.predictStatus,
                  config: t.config,
                },
                on: {
                  error: function (e) {
                    return t.$emit("error");
                  },
                  ready: t.handleReady,
                  change: t.handleChange,
                  "update:tool": t.updateTool,
                  "shape:creating": t.handleShapeCreating,
                  "shape:created": t.handleShapeAborted,
                  "shape:aborted": t.handleShapeAborted,
                },
              }),
              t.readonly
                ? t._e()
                : n("DotPredictLoading", {
                    attrs: { predictDisabled: t.predictDisabled },
                  }),
              t.readonly
                ? t._e()
                : n("DotPredictorOp", {
                    on: {
                      confirm: t.handlePredictConfirm,
                      cancel: t.handlePredictCancel,
                    },
                  }),
              n("InvalidTip", { attrs: { isInvalid: t.isInvalid } }),
              t.readonly
                ? t._e()
                : n("BrushPlugins", {
                    attrs: {
                      tool: t.toolState.tool,
                      brushWidth: t.toolState.brushWidth,
                      eraserWidth: t.toolState.eraserWidth,
                      mouse: t.annotatorState.mouse,
                    },
                    on: {
                      "update:brushWidth": function (e) {
                        return t.$set(t.toolState, "brushWidth", e);
                      },
                      "update:brush-width": function (e) {
                        return t.$set(t.toolState, "brushWidth", e);
                      },
                      "update:eraserWidth": function (e) {
                        return t.$set(t.toolState, "eraserWidth", e);
                      },
                      "update:eraser-width": function (e) {
                        return t.$set(t.toolState, "eraserWidth", e);
                      },
                    },
                  }),
              t.readonly
                ? t._e()
                : n("LockLabelTip", {
                    attrs: { label: t.label, mouse: t.annotatorState.mouse },
                  }),
              t.deleteBtnShow
                ? n("DeleteBtn", {
                    attrs: { activeShape: t.activeShape },
                    on: { delete: t.deleteAnnotationsOfAlias },
                  })
                : t._e(),
              t.labelModalShow
                ? n("LabelModal", {
                    attrs: {
                      position: t.labelModalCState.position,
                      showCancel: t.labelModalCState.showCancel,
                      annotations: t.labelModalCState.annotations,
                    },
                    on: {
                      "label:cancel": t.handleDeleteAnnotations,
                      "label:click": function (e) {
                        return t.$emit("label:click", e);
                      },
                    },
                    model: {
                      value: t.labelModalState.show,
                      callback: function (e) {
                        t.$set(t.labelModalState, "show", e);
                      },
                      expression: "labelModalState.show",
                    },
                  })
                : t._e(),
              t.contextmenuTipShow
                ? n("ContextMenuTip", {
                    attrs: {
                      position: t.labelModalCState.position,
                      activeShape: t.activeShape,
                      label: t.label,
                    },
                  })
                : t._e(),
              t.annotatorState.floatingShow
                ? n("FloatingTxt", {
                    attrs: { mouse: t.annotatorState.clickMouse },
                  })
                : t._e(),
            ],
            1
          );
        },
        r = [],
        a =
          (n("4de4"),
          n("7db0"),
          n("0481"),
          n("d81d"),
          n("13d5"),
          n("4069"),
          n("b0c0"),
          n("a9e3"),
          n("4fad"),
          n("07ac"),
          n("3835")),
        o = n("8165"),
        s = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", { staticClass: "vis-annotator" }, [
            n("div", {
              ref: "annotatorDOM",
              staticClass: "vis-annotator_editor",
              class: t.predictStatus,
            }),
            n(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !t.ready,
                    expression: "!ready",
                  },
                ],
                staticClass: "vis-annotator_loading-mask",
              },
              [t._v(t._s(t.text.loading))]
            ),
          ]);
        },
        c = [],
        l = n("2909"),
        d = n("5530"),
        h = n("8836"),
        u = n("c75f"),
        f = n("a09e"),
        p = n("a417"),
        b = n("8899"),
        g = n("e185"),
        v = function () {
          var t = Object(o["ref"])(),
            e = Object(o["ref"])(),
            n = Object(o["ref"])(!1),
            i = function () {
              e.value && e.value.reset();
            },
            r = function () {
              e.value && e.value.zoomIn();
            },
            a = function () {
              e.value && e.value.zoomOut();
            },
            s = function (i) {
              var r = i.install(Object(g["a"])());
              (e.value = r.zoomer),
                (t.value = r.mover),
                r.zoomer.events.on("scale", function (t) {
                  if (1 === t) return !1;
                  n.value = !0;
                }),
                r.zoomer.events.on("reset", function () {
                  n.value = !1;
                });
            };
          return {
            connectZoomer: s,
            fit: i,
            zoomIn: r,
            zoomOut: a,
            moveable: n,
          };
        },
        m = function () {
          var t = Object(o["ref"])(),
            e = Object(o["ref"])(!1),
            n = Object(o["ref"])(!1),
            i = function (i) {
              var r = i.install(Object(f["a"])());
              (t.value = r),
                r.events.on("add:undo", function () {
                  e.value = !0;
                }),
                r.events.on("clear:undo", function () {
                  e.value = !1;
                }),
                r.events.on("add:redo", function () {
                  n.value = !0;
                }),
                r.events.on("clear:redo", function () {
                  n.value = !1;
                });
            },
            r = function () {
              t.value && t.value.undo();
            },
            a = function () {
              t.value && t.value.redo();
            };
          return {
            connectHistory: i,
            undo: r,
            redo: a,
            undoable: e,
            redoable: n,
          };
        },
        y = function () {
          var t = Object(o["ref"])(),
            e = function (e) {
              var n = e.install(Object(b["a"])());
              t.value = n;
            },
            n = function () {
              t.value && t.value.rotate();
            },
            i = function (e) {
              t.value && t.value.rotateTo(e);
            };
          return { connectImageOperator: e, rotate: n, rotateTo: i };
        },
        x = function () {
          var t = function (t) {
            t.install(Object(u["a"])());
          };
          return { connectAutofit: t };
        },
        w = function () {
          var t = Object(o["ref"])(),
            e = function (e) {
              var n = e.install(Object(p["a"])());
              n.events.on("active", function (e) {
                t.value = e;
              });
            };
          return { connectShapeTracker: e, activeShape: t };
        },
        _ = function () {
          var t = v(),
            e = t.fit,
            n = t.zoomIn,
            i = t.connectZoomer,
            r = t.zoomOut,
            a = t.moveable,
            o = m(),
            s = o.undo,
            c = o.redo,
            l = o.undoable,
            d = o.redoable,
            h = o.connectHistory,
            u = x(),
            f = u.connectAutofit,
            p = y(),
            b = p.connectImageOperator,
            g = p.rotate,
            _ = p.rotateTo,
            O = w(),
            A = O.connectShapeTracker,
            k = O.activeShape,
            E = function (t) {
              i(t), h(t), f(t), b(t), A(t);
            };
          return {
            install: E,
            zoomer: { fit: e, zoomIn: n, zoomOut: r, moveable: a },
            history: { undo: s, redo: c, redoable: d, undoable: l },
            imageOperator: { rotate: g, rotateTo: _ },
            activeShape: k,
          };
        },
        O = "vis-annotator",
        A = function (t) {
          var e = Object(o["inject"])(O);
          Object(o["watch"])(
            t,
            function (t) {
              t &&
                e &&
                (t.events.on("MEDIA_CHANGED", e.updateResource),
                e.syncAnnotatorControl(t));
            },
            { immediate: !0, flush: "sync" }
          );
        },
        k = function () {
          var t = Object(o["ref"])(),
            e = Object(o["ref"])(),
            n = _(),
            i = Object(o["ref"])(!1);
          return (
            Object(o["provide"])(O, {
              syncAnnotatorControl: function (e) {
                (i.value = !0), (t.value = e);
              },
              updateResource: function (t) {
                e.value = t;
              },
            }),
            { ready: i, resource: e, annotatorControl: t, builtinPlugins: n }
          );
        },
        E = {
          default: { border: { color: "rgba(255, 0, 0, 1)" } },
          brush_draft: { background: "rgba(255, 0, 0, 0.6)" },
          brush_editing: { background: "rgba(255, 0, 0, 0.6)" },
          "dot-predictor_positive": {
            background: "#41D94E",
            border: { width: 3, color: "#41D94E" },
          },
          "dot-predictor_negative": {
            background: "#F24956",
            border: { width: 3, color: "#F24956" },
          },
          "dot-predictor_focus": {
            background: "rgba(0,0,0,0.2)",
            border: { width: 2, color: "#fff" },
          },
        },
        j = function (t) {
          var e = Object(o["computed"])(function () {
              return Object(d["a"])(
                Object(d["a"])(
                  {
                    readonly: t.readonly,
                    annotationDisplayQuality: 0.8,
                    serializePrecision: 1,
                    resizeHandleRadius: 4,
                    alwaysShowLabel: !1,
                    arrowKeyboardEnable: !t.readonly,
                  },
                  t.config
                ),
                {},
                {
                  appearance: Object(d["a"])(
                    Object(d["a"])({}, E),
                    t.config.appearance
                  ),
                }
              );
            }),
            n = Object(o["computed"])(function () {
              return { type: "image", src: t.src };
            }),
            i = Object(o["computed"])(function () {
              return t.tools;
            });
          return { tools: i, media: n, config: e };
        },
        I = n("9400"),
        C = function (t, e, n) {
          var i = Object(o["ref"])(),
            r = function () {
              i.value && i.value.setLabels(n.value.labels);
            },
            a = e.config,
            s = e.media,
            c = e.tools,
            u = Object(o["computed"])(function () {
              return t.value
                ? {
                    dom: t.value,
                    media: Object(d["a"])({}, s.value),
                    tools: Object(l["a"])(c.value),
                  }
                : void 0;
            });
          return (
            Object(o["watch"])(a, function (t) {
              i.value && i.value.updateConfig(t);
            }),
            Object(o["watch"])(n, r, { flush: "post" }),
            Object(o["watch"])(
              u,
              function (t, e, n) {
                if (t) {
                  var o = Object(h["a"])(
                    Object(d["a"])(
                      Object(d["a"])({}, t),
                      {},
                      { config: a.value }
                    )
                  );
                  (i.value = o),
                    r(),
                    n(function () {
                      o.teardown();
                    });
                }
              },
              { immediate: !0 }
            ),
            i
          );
        },
        S = function (t, e) {
          Object(o["watch"])(
            e,
            function (e) {
              t.plugins && e && t.plugins.install(e);
            },
            { immediate: !0, flush: "sync" }
          );
        },
        T = function (t, e) {
          var n = Object(o["ref"])(!1),
            i = function () {
              (n.value = !0), e("ready");
            },
            r = function (t) {
              e("update:tool", I["b"][t] || t);
            };
          return (
            Object(o["watch"])(t, function (t) {
              t &&
                (t.events.on("INITIALIZING", function () {
                  n.value = !1;
                }),
                t.events.on("INITIALIZED", i),
                t.events.on("TOOL_CHANGED", r),
                t.events.on("SHAPE_CREATING", function (t) {
                  e("shape:creating", t);
                }),
                t.events.on("SHAPE_CREATED", function (t) {
                  e("shape:created", t);
                }),
                t.events.on("SHAPE_ABORTED", function (t) {
                  e("shape:aborted", t);
                }),
                t.events.on("CHANGE", function (t) {
                  e("change", t);
                }),
                t.events.on("ERROR", function () {
                  e("error");
                }));
            }),
            { ready: n }
          );
        },
        M = Object(o["defineComponent"])({
          props: {
            src: { required: !0, type: String },
            readonly: { type: Boolean, default: !1 },
            config: {
              type: Object,
              default: function () {
                return {};
              },
            },
            tools: {
              type: Array,
              default: function () {
                return [];
              },
            },
            plugins: { type: Object, default: void 0 },
            labels: {
              type: Array,
              default: function () {
                return [];
              },
            },
            labelMap: {
              type: Object,
              default: function () {
                return {};
              },
            },
            text: {
              type: Object,
              default: function () {
                return { loading: "图片载入中……" };
              },
            },
            predictStatus: { type: String, default: "" },
          },
          setup: function (t, e) {
            var n = e.emit,
              i = Object(o["ref"])(),
              r = j(t),
              a = Object(o["computed"])(function () {
                return { labels: t.labels, labelMap: t.labelMap };
              }),
              s = C(i, r, a),
              c = T(s, n),
              l = c.ready;
            return A(s), S(t, s), { annotatorDOM: i, ready: l };
          },
        }),
        R = M,
        D = (n("b85d"), n("2877")),
        L = Object(D["a"])(R, s, c, !1, null, "6da74332", null),
        N = L.exports,
        P = (n("e66a"), n("96cf"), n("1da1")),
        z = n("7018"),
        B = n("cf55"),
        U = n("8607"),
        H = function (t, e, n) {
          var i = Object(o["getCurrentInstance"])().proxy,
            r = Object(B["d"])(),
            s = Object(o["ref"])(),
            c = Object(o["reactive"])({
              mouse: { x: 0, y: 0 },
              clickMouse: { x: 0, y: 0 },
              floatingShow: !1,
            }),
            l = function (t) {
              var e = t.currentTarget;
              if (e) {
                var n = e.getBoundingClientRect(),
                  i = n.x,
                  r = n.y;
                (c.mouse.x = t.clientX - i), (c.mouse.y = t.clientY - r);
              }
            },
            d = function (t) {
              (c.clickMouse.x = t.clientX), (c.clickMouse.y = t.clientY);
            },
            h = (function () {
              var t = Object(P["a"])(
                regeneratorRuntime.mark(function t(e) {
                  return regeneratorRuntime.wrap(function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), Object(U["c"])(1);
                        case 2:
                          c.floatingShow = "polygon" === e.shape;
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              );
              return function (e) {
                return t.apply(this, arguments);
              };
            })(),
            u = function () {
              c.floatingShow = !1;
            };
          if (
            (Object(o["watch"])(e, function (t) {
              if (t) {
                var e = t.resolution,
                  n = e.width,
                  a = e.height;
                (r.state.bgHeight = a),
                  (r.state.bgWidth = n),
                  i.$emit("max:size", Math.max(n, a));
              }
            }),
            !n.value)
          ) {
            var f = Object(z["c"])();
            Object(o["watch"])(
              [t, s],
              function (t) {
                var e = Object(a["a"])(t, 2),
                  n = e[0],
                  i = e[1];
                n && i && ((f.annotatorControl = n), (f.editorWrapper = i));
              },
              { flush: "post" }
            );
          }
          return {
            wrapperRef: s,
            state: c,
            syncMouse: l,
            syncClickMouse: d,
            handleShapeCreating: h,
            handleShapeAborted: u,
          };
        },
        F = (n("4160"), n("45fc"), n("159b"), n("58e1")),
        K = n("dd03"),
        W = n("2ef0"),
        Y = function (t, e, n, i) {
          var r;
          Object(K["b"])();
          var a = n.value
              ? {}
              : (null === (r = K["c"].value) || void 0 === r
                  ? void 0
                  : r.call(K["c"])) || {},
            s = Object(o["reactive"])({
              labels: Object(o["computed"])(function () {
                var t,
                  i,
                  r,
                  o,
                  s =
                    (null === (t = a.pageState) || void 0 === t
                      ? void 0
                      : t.hiddenList) || [],
                  c = [];
                return (
                  (
                    null === a ||
                    void 0 === a ||
                    null === (i = a.pageState) ||
                    void 0 === i ||
                    null === (r = i.labelList) ||
                    void 0 === r ||
                    null === (o = r.items) ||
                    void 0 === o
                      ? void 0
                      : o.length
                  )
                    ? (c = a.pageState.labelList.items)
                    : e.annotations.value.length &&
                      (c = n.value
                        ? e.annotations.value
                        : Object(W["uniqBy"])(e.annotations.value, "name")),
                  c.map(function (t, e) {
                    var n,
                      i,
                      r = t.color || "#1A73E8",
                      a =
                        (null === (n = t.category) || void 0 === n
                          ? void 0
                          : n.style) || {},
                      o = a.background,
                      c = a.border,
                      l = a.stroke;
                    return (
                      t.color &&
                        ((o = Object(F["b"])(r, 0.6)),
                        (c = Object(F["b"])(r, 1)),
                        (l = Object(F["b"])(r, 1))),
                      {
                        name: t.name,
                        id:
                          t.id ||
                          t.label_id ||
                          (null === (i = t.category) || void 0 === i
                            ? void 0
                            : i.id) ||
                          "label".concat(e + 1),
                        segIndex: t.segIndex,
                        visible: !s.some(function (e) {
                          return e.id === t.id;
                        }),
                        appearance: {
                          default: {
                            background: o || Object(F["b"])(r, 0.6),
                            border: {
                              width: 1,
                              color: c || l || Object(F["b"])(r, 1),
                            },
                          },
                          active: {
                            background: Object(F["b"])(r, 0.8),
                            border: { width: 1, color: Object(F["b"])(r, 1) },
                          },
                        },
                      }
                    );
                  })
                );
              }),
            }),
            c = function (e) {
              var n;
              null === (n = t.value) || void 0 === n || n.setLabel(e);
            },
            l = function (e) {
              var n;
              null === (n = t.value) ||
                void 0 === n ||
                n.setDefaultLabel(e || "");
            },
            d = function (e) {
              var n;
              e &&
                (null === (n = t.value) ||
                  void 0 === n ||
                  n.deleteAnnotationsOfAlias(e));
            },
            h = function (t) {
              t.forEach(function (t) {
                d(t.alias);
              });
            },
            u = function (e) {
              var n;
              e &&
                (null === (n = t.value) ||
                  void 0 === n ||
                  n.deleteAnnotationsOfLabel(e));
            };
          return (
            Object(o["watch"])(e.label, function (t) {
              l(null === t || void 0 === t ? void 0 : t.id), t && c(t.id);
            }),
            Object(o["watch"])(
              function () {
                return s.labels;
              },
              function (e) {
                if (e) {
                  var n,
                    r =
                      (null === (n = a.pageState) || void 0 === n
                        ? void 0
                        : n.hiddenList) || [];
                  if (
                    r.some(function (t) {
                      var e;
                      return (
                        t.id ===
                        (null === (e = i.value) || void 0 === e
                          ? void 0
                          : e.labelId)
                      );
                    })
                  ) {
                    if (!t.value) return;
                    t.value.activateShape("");
                    var o = t.value.annotator.tools.currentActive.name;
                    t.value.activateTool("mover"), t.value.activateTool(o);
                  }
                }
              },
              { deep: !0 }
            ),
            Object(o["watch"])(
              function () {
                return t.value;
              },
              function (t) {
                var n;
                t &&
                  (null === (n = e.label.value) || void 0 === n
                    ? void 0
                    : n.locked) &&
                  l(e.label.value.id);
              }
            ),
            {
              cstate: s,
              setLabel: c,
              setDefaultLabel: l,
              deleteAnnotationsOfLabel: u,
              deleteAnnotationsOfAlias: d,
              handleDeleteAnnotations: h,
            }
          );
        },
        V = (n("caad"), n("2ae1")),
        G = n("aa9e"),
        Z = n("5f6c"),
        Q = n("9c84"),
        J = function () {
          var t = Object(B["d"])(),
            e = Object(o["ref"])(),
            n = function (e) {
              t.state.clickStatusTimer &&
                clearTimeout(t.state.clickStatusTimer),
                (t.state.status = e);
            },
            i = function (e) {
              n(e), t.resetPredictor();
            },
            r = function () {
              [B["b"].CONFIRMED, B["b"].CANCELLED, B["b"].RECT_START].forEach(
                function (t) {
                  e.value &&
                    e.value.events.on(t, function () {
                      i(t);
                    });
                }
              );
            },
            a = function () {
              [B["b"].PREDICTED, B["b"].PREDICTING, B["b"].CONFIRMING].forEach(
                function (t) {
                  e.value &&
                    e.value.events.on(t, function () {
                      n(t);
                    });
                }
              );
            },
            s = function (e) {
              e.code === B["a"].INVALID_POINT &&
                (t.state.error = B["a"].INVALID_POINT);
            },
            c = function () {
              e.value && e.value.events.on("error", s);
            },
            l = function () {
              e.value &&
                e.value.events.on(B["b"].RECT_END, function (e) {
                  t.state.resBbox = {
                    topLeft: { x: e.x1, y: e.y1 },
                    bottomRight: { x: e.x2, y: e.y2 },
                  };
                });
            },
            d = function (e) {
              r(), a(), c(), l(), (t.state.toolName = e);
            },
            h = function (n) {
              var i = Object(Q["b"])(n, {
                threshold: t.state.threshold / 100,
                dotLimit: 50,
                predict: t.predictFactory,
              });
              return (e.value = i.getControl()), d("rect-dot-predictor"), i;
            },
            u = function () {
              e.value && (i(B["b"].CONFIRMED), e.value.confirm());
            },
            f = function () {
              i(B["b"].CANCELLED), e.value && e.value.reset();
            },
            p = function (e) {
              t.resetPredictor(), (t.state.toolName = e);
            };
          return (
            Object(o["watch"])(
              function () {
                return t.state.threshold;
              },
              function (t) {
                e.value && (e.value.threshold = t / 100);
              }
            ),
            {
              resetDotPredictorTool: h,
              handlePredictConfirm: u,
              handlePredictCancel: f,
              setDotPredictServiceToolName: p,
            }
          );
        },
        X = function (t, e, n) {
          var i = Object(o["reactive"])({
              tools: [],
              brushWidth: 20,
              eraserWidth: 20,
              tool: n.tool,
            }),
            r = Object(o["ref"])(),
            s = Object(o["getCurrentInstance"])().proxy,
            c = J(),
            l = c.resetDotPredictorTool,
            d = c.setDotPredictServiceToolName,
            h = c.handlePredictConfirm,
            u = c.handlePredictCancel,
            f = function (t, e) {
              s.$emit("toggle:tool", { name: t, enabled: e });
            },
            p = function (t) {
              s.$emit("update:tool", t);
            },
            b = function () {
              var t = new Q["a"](),
                e = l(t);
              r.value = t.getControl();
              var n = new V["a"]();
              (n.getControl().width = 6),
                (i.tools = [t, e, new Z["c"](), new G["a"](), n]),
                f("mover", !1),
                f("zoom-out", !1),
                (i.tool && !["mover", "zoom-out"].includes(i.tool)) ||
                  p("polygon");
            };
          Object(o["watch"])(
            n.src,
            function () {
              b();
            },
            { immediate: !0 }
          );
          var g = function (e) {
            var n, a;
            if (t.value)
              switch (e) {
                case "eraser":
                  if (
                    !(null === (n = r.value) || void 0 === n
                      ? void 0
                      : n.radius)
                  )
                    return;
                  (r.value.radius = i.eraserWidth),
                    t.value.activateTool("brush:del");
                  break;
                case "brush":
                  if (
                    !(null === (a = r.value) || void 0 === a
                      ? void 0
                      : a.radius)
                  )
                    return;
                  (r.value.radius = i.brushWidth),
                    t.value.activateTool("brush:add");
                  break;
                case "rect-dot-predictor":
                  d("rect-dot-predictor"),
                    t.value.activateTool("dot-predictor:rect-first");
                  break;
                case "dot-predictor":
                  d("dot-predictor"),
                    t.value.activateTool("dot-predictor:default");
                  break;
                default:
                  t.value.activateTool(e);
              }
          };
          Object(o["watch"])(n.tool, function (t) {
            switch (t) {
              case "zoom-in":
                e.zoomer.zoomIn();
                break;
              case "zoom-out":
                e.zoomer.zoomOut();
                break;
              case "redo":
                e.history.redo();
                break;
              case "undo":
                e.history.undo();
                break;
              default:
                g(t);
            }
          });
          var v = function (t) {
            t.ctrlKey && "z" === t.key.toLowerCase() && e.history.undo();
          };
          return (
            Object(o["onMounted"])(function () {
              document.addEventListener("keydown", v);
            }),
            Object(o["onUnmounted"])(function () {
              document.removeEventListener("keydown", v);
            }),
            Object(o["watch"])(
              [
                function () {
                  return i.brushWidth;
                },
                function () {
                  return i.eraserWidth;
                },
              ],
              function (t) {
                var e,
                  n = Object(a["a"])(t, 2),
                  o = n[0],
                  s = n[1];
                (null === (e = r.value) || void 0 === e ? void 0 : e.radius) &&
                  ("eraser" === i.tool
                    ? (r.value.radius = s)
                    : (r.value.radius = o));
              }
            ),
            Object(o["watch"])(e.history.redoable, function (t) {
              f("redo", t);
            }),
            Object(o["watch"])(e.history.undoable, function (t) {
              t && s.$emit("pollute"), f("undo", t);
            }),
            Object(o["watch"])(e.zoomer.moveable, function (t) {
              f("mover", t), f("zoom-out", t), t || p("polygon");
            }),
            {
              state: i,
              activateTool: g,
              updateTool: p,
              handlePredictConfirm: h,
              handlePredictCancel: u,
            }
          );
        },
        $ =
          (n("99af"),
          n("d3b7"),
          n("2532"),
          n("5cc6"),
          n("9a8c"),
          n("a975"),
          n("735e"),
          n("c1ac"),
          n("d139"),
          n("3a7b"),
          n("d5d6"),
          n("82f8"),
          n("e91f"),
          n("60bd"),
          n("5f96"),
          n("3280"),
          n("3fcc"),
          n("ca91"),
          n("25a1"),
          n("cd26"),
          n("3c5d"),
          n("2954"),
          n("649e"),
          n("219c"),
          n("170b"),
          n("b39a"),
          n("72f7"),
          n("b85c")),
        q = n("f24d"),
        tt = n("0110"),
        et = n("d736");
      /*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
      const nt = 4,
        it = 0,
        rt = 1,
        at = 2;
      function ot(t) {
        let e = t.length;
        while (--e >= 0) t[e] = 0;
      }
      const st = 0,
        ct = 1,
        lt = 2,
        dt = 3,
        ht = 258,
        ut = 29,
        ft = 256,
        pt = ft + 1 + ut,
        bt = 30,
        gt = 19,
        vt = 2 * pt + 1,
        mt = 15,
        yt = 16,
        xt = 7,
        wt = 256,
        _t = 16,
        Ot = 17,
        At = 18,
        kt = new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0,
        ]),
        Et = new Uint8Array([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13,
        ]),
        jt = new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
        ]),
        It = new Uint8Array([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        Ct = 512,
        St = new Array(2 * (pt + 2));
      ot(St);
      const Tt = new Array(2 * bt);
      ot(Tt);
      const Mt = new Array(Ct);
      ot(Mt);
      const Rt = new Array(ht - dt + 1);
      ot(Rt);
      const Dt = new Array(ut);
      ot(Dt);
      const Lt = new Array(bt);
      function Nt(t, e, n, i, r) {
        (this.static_tree = t),
          (this.extra_bits = e),
          (this.extra_base = n),
          (this.elems = i),
          (this.max_length = r),
          (this.has_stree = t && t.length);
      }
      let Pt, zt, Bt;
      function Ut(t, e) {
        (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
      }
      ot(Lt);
      const Ht = (t) => (t < 256 ? Mt[t] : Mt[256 + (t >>> 7)]),
        Ft = (t, e) => {
          (t.pending_buf[t.pending++] = 255 & e),
            (t.pending_buf[t.pending++] = (e >>> 8) & 255);
        },
        Kt = (t, e, n) => {
          t.bi_valid > yt - n
            ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
              Ft(t, t.bi_buf),
              (t.bi_buf = e >> (yt - t.bi_valid)),
              (t.bi_valid += n - yt))
            : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += n));
        },
        Wt = (t, e, n) => {
          Kt(t, n[2 * e], n[2 * e + 1]);
        },
        Yt = (t, e) => {
          let n = 0;
          do {
            (n |= 1 & t), (t >>>= 1), (n <<= 1);
          } while (--e > 0);
          return n >>> 1;
        },
        Vt = (t) => {
          16 === t.bi_valid
            ? (Ft(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
            : t.bi_valid >= 8 &&
              ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
              (t.bi_buf >>= 8),
              (t.bi_valid -= 8));
        },
        Gt = (t, e) => {
          const n = e.dyn_tree,
            i = e.max_code,
            r = e.stat_desc.static_tree,
            a = e.stat_desc.has_stree,
            o = e.stat_desc.extra_bits,
            s = e.stat_desc.extra_base,
            c = e.stat_desc.max_length;
          let l,
            d,
            h,
            u,
            f,
            p,
            b = 0;
          for (u = 0; u <= mt; u++) t.bl_count[u] = 0;
          for (
            n[2 * t.heap[t.heap_max] + 1] = 0, l = t.heap_max + 1;
            l < vt;
            l++
          )
            (d = t.heap[l]),
              (u = n[2 * n[2 * d + 1] + 1] + 1),
              u > c && ((u = c), b++),
              (n[2 * d + 1] = u),
              d > i ||
                (t.bl_count[u]++,
                (f = 0),
                d >= s && (f = o[d - s]),
                (p = n[2 * d]),
                (t.opt_len += p * (u + f)),
                a && (t.static_len += p * (r[2 * d + 1] + f)));
          if (0 !== b) {
            do {
              u = c - 1;
              while (0 === t.bl_count[u]) u--;
              t.bl_count[u]--,
                (t.bl_count[u + 1] += 2),
                t.bl_count[c]--,
                (b -= 2);
            } while (b > 0);
            for (u = c; 0 !== u; u--) {
              d = t.bl_count[u];
              while (0 !== d)
                (h = t.heap[--l]),
                  h > i ||
                    (n[2 * h + 1] !== u &&
                      ((t.opt_len += (u - n[2 * h + 1]) * n[2 * h]),
                      (n[2 * h + 1] = u)),
                    d--);
            }
          }
        },
        Zt = (t, e, n) => {
          const i = new Array(mt + 1);
          let r,
            a,
            o = 0;
          for (r = 1; r <= mt; r++) i[r] = o = (o + n[r - 1]) << 1;
          for (a = 0; a <= e; a++) {
            let e = t[2 * a + 1];
            0 !== e && (t[2 * a] = Yt(i[e]++, e));
          }
        },
        Qt = () => {
          let t, e, n, i, r;
          const a = new Array(mt + 1);
          for (n = 0, i = 0; i < ut - 1; i++)
            for (Dt[i] = n, t = 0; t < 1 << kt[i]; t++) Rt[n++] = i;
          for (Rt[n - 1] = i, r = 0, i = 0; i < 16; i++)
            for (Lt[i] = r, t = 0; t < 1 << Et[i]; t++) Mt[r++] = i;
          for (r >>= 7; i < bt; i++)
            for (Lt[i] = r << 7, t = 0; t < 1 << (Et[i] - 7); t++)
              Mt[256 + r++] = i;
          for (e = 0; e <= mt; e++) a[e] = 0;
          t = 0;
          while (t <= 143) (St[2 * t + 1] = 8), t++, a[8]++;
          while (t <= 255) (St[2 * t + 1] = 9), t++, a[9]++;
          while (t <= 279) (St[2 * t + 1] = 7), t++, a[7]++;
          while (t <= 287) (St[2 * t + 1] = 8), t++, a[8]++;
          for (Zt(St, pt + 1, a), t = 0; t < bt; t++)
            (Tt[2 * t + 1] = 5), (Tt[2 * t] = Yt(t, 5));
          (Pt = new Nt(St, kt, ft + 1, pt, mt)),
            (zt = new Nt(Tt, Et, 0, bt, mt)),
            (Bt = new Nt(new Array(0), jt, 0, gt, xt));
        },
        Jt = (t) => {
          let e;
          for (e = 0; e < pt; e++) t.dyn_ltree[2 * e] = 0;
          for (e = 0; e < bt; e++) t.dyn_dtree[2 * e] = 0;
          for (e = 0; e < gt; e++) t.bl_tree[2 * e] = 0;
          (t.dyn_ltree[2 * wt] = 1),
            (t.opt_len = t.static_len = 0),
            (t.last_lit = t.matches = 0);
        },
        Xt = (t) => {
          t.bi_valid > 8
            ? Ft(t, t.bi_buf)
            : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
            (t.bi_buf = 0),
            (t.bi_valid = 0);
        },
        $t = (t, e, n, i) => {
          Xt(t),
            i && (Ft(t, n), Ft(t, ~n)),
            t.pending_buf.set(t.window.subarray(e, e + n), t.pending),
            (t.pending += n);
        },
        qt = (t, e, n, i) => {
          const r = 2 * e,
            a = 2 * n;
          return t[r] < t[a] || (t[r] === t[a] && i[e] <= i[n]);
        },
        te = (t, e, n) => {
          const i = t.heap[n];
          let r = n << 1;
          while (r <= t.heap_len) {
            if (
              (r < t.heap_len &&
                qt(e, t.heap[r + 1], t.heap[r], t.depth) &&
                r++,
              qt(e, i, t.heap[r], t.depth))
            )
              break;
            (t.heap[n] = t.heap[r]), (n = r), (r <<= 1);
          }
          t.heap[n] = i;
        },
        ee = (t, e, n) => {
          let i,
            r,
            a,
            o,
            s = 0;
          if (0 !== t.last_lit)
            do {
              (i =
                (t.pending_buf[t.d_buf + 2 * s] << 8) |
                t.pending_buf[t.d_buf + 2 * s + 1]),
                (r = t.pending_buf[t.l_buf + s]),
                s++,
                0 === i
                  ? Wt(t, r, e)
                  : ((a = Rt[r]),
                    Wt(t, a + ft + 1, e),
                    (o = kt[a]),
                    0 !== o && ((r -= Dt[a]), Kt(t, r, o)),
                    i--,
                    (a = Ht(i)),
                    Wt(t, a, n),
                    (o = Et[a]),
                    0 !== o && ((i -= Lt[a]), Kt(t, i, o)));
            } while (s < t.last_lit);
          Wt(t, wt, e);
        },
        ne = (t, e) => {
          const n = e.dyn_tree,
            i = e.stat_desc.static_tree,
            r = e.stat_desc.has_stree,
            a = e.stat_desc.elems;
          let o,
            s,
            c,
            l = -1;
          for (t.heap_len = 0, t.heap_max = vt, o = 0; o < a; o++)
            0 !== n[2 * o]
              ? ((t.heap[++t.heap_len] = l = o), (t.depth[o] = 0))
              : (n[2 * o + 1] = 0);
          while (t.heap_len < 2)
            (c = t.heap[++t.heap_len] = l < 2 ? ++l : 0),
              (n[2 * c] = 1),
              (t.depth[c] = 0),
              t.opt_len--,
              r && (t.static_len -= i[2 * c + 1]);
          for (e.max_code = l, o = t.heap_len >> 1; o >= 1; o--) te(t, n, o);
          c = a;
          do {
            (o = t.heap[1]),
              (t.heap[1] = t.heap[t.heap_len--]),
              te(t, n, 1),
              (s = t.heap[1]),
              (t.heap[--t.heap_max] = o),
              (t.heap[--t.heap_max] = s),
              (n[2 * c] = n[2 * o] + n[2 * s]),
              (t.depth[c] =
                (t.depth[o] >= t.depth[s] ? t.depth[o] : t.depth[s]) + 1),
              (n[2 * o + 1] = n[2 * s + 1] = c),
              (t.heap[1] = c++),
              te(t, n, 1);
          } while (t.heap_len >= 2);
          (t.heap[--t.heap_max] = t.heap[1]), Gt(t, e), Zt(n, l, t.bl_count);
        },
        ie = (t, e, n) => {
          let i,
            r,
            a = -1,
            o = e[1],
            s = 0,
            c = 7,
            l = 4;
          for (
            0 === o && ((c = 138), (l = 3)), e[2 * (n + 1) + 1] = 65535, i = 0;
            i <= n;
            i++
          )
            (r = o),
              (o = e[2 * (i + 1) + 1]),
              (++s < c && r === o) ||
                (s < l
                  ? (t.bl_tree[2 * r] += s)
                  : 0 !== r
                  ? (r !== a && t.bl_tree[2 * r]++, t.bl_tree[2 * _t]++)
                  : s <= 10
                  ? t.bl_tree[2 * Ot]++
                  : t.bl_tree[2 * At]++,
                (s = 0),
                (a = r),
                0 === o
                  ? ((c = 138), (l = 3))
                  : r === o
                  ? ((c = 6), (l = 3))
                  : ((c = 7), (l = 4)));
        },
        re = (t, e, n) => {
          let i,
            r,
            a = -1,
            o = e[1],
            s = 0,
            c = 7,
            l = 4;
          for (0 === o && ((c = 138), (l = 3)), i = 0; i <= n; i++)
            if (((r = o), (o = e[2 * (i + 1) + 1]), !(++s < c && r === o))) {
              if (s < l)
                do {
                  Wt(t, r, t.bl_tree);
                } while (0 !== --s);
              else
                0 !== r
                  ? (r !== a && (Wt(t, r, t.bl_tree), s--),
                    Wt(t, _t, t.bl_tree),
                    Kt(t, s - 3, 2))
                  : s <= 10
                  ? (Wt(t, Ot, t.bl_tree), Kt(t, s - 3, 3))
                  : (Wt(t, At, t.bl_tree), Kt(t, s - 11, 7));
              (s = 0),
                (a = r),
                0 === o
                  ? ((c = 138), (l = 3))
                  : r === o
                  ? ((c = 6), (l = 3))
                  : ((c = 7), (l = 4));
            }
        },
        ae = (t) => {
          let e;
          for (
            ie(t, t.dyn_ltree, t.l_desc.max_code),
              ie(t, t.dyn_dtree, t.d_desc.max_code),
              ne(t, t.bl_desc),
              e = gt - 1;
            e >= 3;
            e--
          )
            if (0 !== t.bl_tree[2 * It[e] + 1]) break;
          return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
        },
        oe = (t, e, n, i) => {
          let r;
          for (
            Kt(t, e - 257, 5), Kt(t, n - 1, 5), Kt(t, i - 4, 4), r = 0;
            r < i;
            r++
          )
            Kt(t, t.bl_tree[2 * It[r] + 1], 3);
          re(t, t.dyn_ltree, e - 1), re(t, t.dyn_dtree, n - 1);
        },
        se = (t) => {
          let e,
            n = 4093624447;
          for (e = 0; e <= 31; e++, n >>>= 1)
            if (1 & n && 0 !== t.dyn_ltree[2 * e]) return it;
          if (
            0 !== t.dyn_ltree[18] ||
            0 !== t.dyn_ltree[20] ||
            0 !== t.dyn_ltree[26]
          )
            return rt;
          for (e = 32; e < ft; e++) if (0 !== t.dyn_ltree[2 * e]) return rt;
          return it;
        };
      let ce = !1;
      const le = (t) => {
          ce || (Qt(), (ce = !0)),
            (t.l_desc = new Ut(t.dyn_ltree, Pt)),
            (t.d_desc = new Ut(t.dyn_dtree, zt)),
            (t.bl_desc = new Ut(t.bl_tree, Bt)),
            (t.bi_buf = 0),
            (t.bi_valid = 0),
            Jt(t);
        },
        de = (t, e, n, i) => {
          Kt(t, (st << 1) + (i ? 1 : 0), 3), $t(t, e, n, !0);
        },
        he = (t) => {
          Kt(t, ct << 1, 3), Wt(t, wt, St), Vt(t);
        },
        ue = (t, e, n, i) => {
          let r,
            a,
            o = 0;
          t.level > 0
            ? (t.strm.data_type === at && (t.strm.data_type = se(t)),
              ne(t, t.l_desc),
              ne(t, t.d_desc),
              (o = ae(t)),
              (r = (t.opt_len + 3 + 7) >>> 3),
              (a = (t.static_len + 3 + 7) >>> 3),
              a <= r && (r = a))
            : (r = a = n + 5),
            n + 4 <= r && -1 !== e
              ? de(t, e, n, i)
              : t.strategy === nt || a === r
              ? (Kt(t, (ct << 1) + (i ? 1 : 0), 3), ee(t, St, Tt))
              : (Kt(t, (lt << 1) + (i ? 1 : 0), 3),
                oe(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1),
                ee(t, t.dyn_ltree, t.dyn_dtree)),
            Jt(t),
            i && Xt(t);
        },
        fe = (t, e, n) => (
          (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
          (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
          (t.pending_buf[t.l_buf + t.last_lit] = 255 & n),
          t.last_lit++,
          0 === e
            ? t.dyn_ltree[2 * n]++
            : (t.matches++,
              e--,
              t.dyn_ltree[2 * (Rt[n] + ft + 1)]++,
              t.dyn_dtree[2 * Ht(e)]++),
          t.last_lit === t.lit_bufsize - 1
        );
      var pe = le,
        be = de,
        ge = ue,
        ve = fe,
        me = he,
        ye = {
          _tr_init: pe,
          _tr_stored_block: be,
          _tr_flush_block: ge,
          _tr_tally: ve,
          _tr_align: me,
        };
      const xe = (t, e, n, i) => {
        let r = (65535 & t) | 0,
          a = ((t >>> 16) & 65535) | 0,
          o = 0;
        while (0 !== n) {
          (o = n > 2e3 ? 2e3 : n), (n -= o);
          do {
            (r = (r + e[i++]) | 0), (a = (a + r) | 0);
          } while (--o);
          (r %= 65521), (a %= 65521);
        }
        return r | (a << 16) | 0;
      };
      var we = xe;
      const _e = () => {
          let t,
            e = [];
          for (var n = 0; n < 256; n++) {
            t = n;
            for (var i = 0; i < 8; i++)
              t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
            e[n] = t;
          }
          return e;
        },
        Oe = new Uint32Array(_e()),
        Ae = (t, e, n, i) => {
          const r = Oe,
            a = i + n;
          t ^= -1;
          for (let o = i; o < a; o++) t = (t >>> 8) ^ r[255 & (t ^ e[o])];
          return -1 ^ t;
        };
      var ke = Ae,
        Ee = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version",
        },
        je = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_MEM_ERROR: -4,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8,
        };
      const {
          _tr_init: Ie,
          _tr_stored_block: Ce,
          _tr_flush_block: Se,
          _tr_tally: Te,
          _tr_align: Me,
        } = ye,
        {
          Z_NO_FLUSH: Re,
          Z_PARTIAL_FLUSH: De,
          Z_FULL_FLUSH: Le,
          Z_FINISH: Ne,
          Z_BLOCK: Pe,
          Z_OK: ze,
          Z_STREAM_END: Be,
          Z_STREAM_ERROR: Ue,
          Z_DATA_ERROR: He,
          Z_BUF_ERROR: Fe,
          Z_DEFAULT_COMPRESSION: Ke,
          Z_FILTERED: We,
          Z_HUFFMAN_ONLY: Ye,
          Z_RLE: Ve,
          Z_FIXED: Ge,
          Z_DEFAULT_STRATEGY: Ze,
          Z_UNKNOWN: Qe,
          Z_DEFLATED: Je,
        } = je,
        Xe = 9,
        $e = 15,
        qe = 8,
        tn = 29,
        en = 256,
        nn = en + 1 + tn,
        rn = 30,
        an = 19,
        on = 2 * nn + 1,
        sn = 15,
        cn = 3,
        ln = 258,
        dn = ln + cn + 1,
        hn = 32,
        un = 42,
        fn = 69,
        pn = 73,
        bn = 91,
        gn = 103,
        vn = 113,
        mn = 666,
        yn = 1,
        xn = 2,
        wn = 3,
        _n = 4,
        On = 3,
        An = (t, e) => ((t.msg = Ee[e]), e),
        kn = (t) => (t << 1) - (t > 4 ? 9 : 0),
        En = (t) => {
          let e = t.length;
          while (--e >= 0) t[e] = 0;
        };
      let jn = (t, e, n) => ((e << t.hash_shift) ^ n) & t.hash_mask,
        In = jn;
      const Cn = (t) => {
          const e = t.state;
          let n = e.pending;
          n > t.avail_out && (n = t.avail_out),
            0 !== n &&
              (t.output.set(
                e.pending_buf.subarray(e.pending_out, e.pending_out + n),
                t.next_out
              ),
              (t.next_out += n),
              (e.pending_out += n),
              (t.total_out += n),
              (t.avail_out -= n),
              (e.pending -= n),
              0 === e.pending && (e.pending_out = 0));
        },
        Sn = (t, e) => {
          Se(
            t,
            t.block_start >= 0 ? t.block_start : -1,
            t.strstart - t.block_start,
            e
          ),
            (t.block_start = t.strstart),
            Cn(t.strm);
        },
        Tn = (t, e) => {
          t.pending_buf[t.pending++] = e;
        },
        Mn = (t, e) => {
          (t.pending_buf[t.pending++] = (e >>> 8) & 255),
            (t.pending_buf[t.pending++] = 255 & e);
        },
        Rn = (t, e, n, i) => {
          let r = t.avail_in;
          return (
            r > i && (r = i),
            0 === r
              ? 0
              : ((t.avail_in -= r),
                e.set(t.input.subarray(t.next_in, t.next_in + r), n),
                1 === t.state.wrap
                  ? (t.adler = we(t.adler, e, r, n))
                  : 2 === t.state.wrap && (t.adler = ke(t.adler, e, r, n)),
                (t.next_in += r),
                (t.total_in += r),
                r)
          );
        },
        Dn = (t, e) => {
          let n,
            i,
            r = t.max_chain_length,
            a = t.strstart,
            o = t.prev_length,
            s = t.nice_match;
          const c =
              t.strstart > t.w_size - dn ? t.strstart - (t.w_size - dn) : 0,
            l = t.window,
            d = t.w_mask,
            h = t.prev,
            u = t.strstart + ln;
          let f = l[a + o - 1],
            p = l[a + o];
          t.prev_length >= t.good_match && (r >>= 2),
            s > t.lookahead && (s = t.lookahead);
          do {
            if (
              ((n = e),
              l[n + o] === p &&
                l[n + o - 1] === f &&
                l[n] === l[a] &&
                l[++n] === l[a + 1])
            ) {
              (a += 2), n++;
              do {} while (
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                l[++a] === l[++n] &&
                a < u
              );
              if (((i = ln - (u - a)), (a = u - ln), i > o)) {
                if (((t.match_start = e), (o = i), i >= s)) break;
                (f = l[a + o - 1]), (p = l[a + o]);
              }
            }
          } while ((e = h[e & d]) > c && 0 !== --r);
          return o <= t.lookahead ? o : t.lookahead;
        },
        Ln = (t) => {
          const e = t.w_size;
          let n, i, r, a, o;
          do {
            if (
              ((a = t.window_size - t.lookahead - t.strstart),
              t.strstart >= e + (e - dn))
            ) {
              t.window.set(t.window.subarray(e, e + e), 0),
                (t.match_start -= e),
                (t.strstart -= e),
                (t.block_start -= e),
                (i = t.hash_size),
                (n = i);
              do {
                (r = t.head[--n]), (t.head[n] = r >= e ? r - e : 0);
              } while (--i);
              (i = e), (n = i);
              do {
                (r = t.prev[--n]), (t.prev[n] = r >= e ? r - e : 0);
              } while (--i);
              a += e;
            }
            if (0 === t.strm.avail_in) break;
            if (
              ((i = Rn(t.strm, t.window, t.strstart + t.lookahead, a)),
              (t.lookahead += i),
              t.lookahead + t.insert >= cn)
            ) {
              (o = t.strstart - t.insert),
                (t.ins_h = t.window[o]),
                (t.ins_h = In(t, t.ins_h, t.window[o + 1]));
              while (t.insert)
                if (
                  ((t.ins_h = In(t, t.ins_h, t.window[o + cn - 1])),
                  (t.prev[o & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = o),
                  o++,
                  t.insert--,
                  t.lookahead + t.insert < cn)
                )
                  break;
            }
          } while (t.lookahead < dn && 0 !== t.strm.avail_in);
        },
        Nn = (t, e) => {
          let n = 65535;
          for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5); ; ) {
            if (t.lookahead <= 1) {
              if ((Ln(t), 0 === t.lookahead && e === Re)) return yn;
              if (0 === t.lookahead) break;
            }
            (t.strstart += t.lookahead), (t.lookahead = 0);
            const i = t.block_start + n;
            if (
              (0 === t.strstart || t.strstart >= i) &&
              ((t.lookahead = t.strstart - i),
              (t.strstart = i),
              Sn(t, !1),
              0 === t.strm.avail_out)
            )
              return yn;
            if (
              t.strstart - t.block_start >= t.w_size - dn &&
              (Sn(t, !1), 0 === t.strm.avail_out)
            )
              return yn;
          }
          return (
            (t.insert = 0),
            e === Ne
              ? (Sn(t, !0), 0 === t.strm.avail_out ? wn : _n)
              : (t.strstart > t.block_start && (Sn(t, !1), t.strm.avail_out),
                yn)
          );
        },
        Pn = (t, e) => {
          let n, i;
          for (;;) {
            if (t.lookahead < dn) {
              if ((Ln(t), t.lookahead < dn && e === Re)) return yn;
              if (0 === t.lookahead) break;
            }
            if (
              ((n = 0),
              t.lookahead >= cn &&
                ((t.ins_h = In(t, t.ins_h, t.window[t.strstart + cn - 1])),
                (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart)),
              0 !== n &&
                t.strstart - n <= t.w_size - dn &&
                (t.match_length = Dn(t, n)),
              t.match_length >= cn)
            )
              if (
                ((i = Te(t, t.strstart - t.match_start, t.match_length - cn)),
                (t.lookahead -= t.match_length),
                t.match_length <= t.max_lazy_match && t.lookahead >= cn)
              ) {
                t.match_length--;
                do {
                  t.strstart++,
                    (t.ins_h = In(t, t.ins_h, t.window[t.strstart + cn - 1])),
                    (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart);
                } while (0 !== --t.match_length);
                t.strstart++;
              } else
                (t.strstart += t.match_length),
                  (t.match_length = 0),
                  (t.ins_h = t.window[t.strstart]),
                  (t.ins_h = In(t, t.ins_h, t.window[t.strstart + 1]));
            else
              (i = Te(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
            if (i && (Sn(t, !1), 0 === t.strm.avail_out)) return yn;
          }
          return (
            (t.insert = t.strstart < cn - 1 ? t.strstart : cn - 1),
            e === Ne
              ? (Sn(t, !0), 0 === t.strm.avail_out ? wn : _n)
              : t.last_lit && (Sn(t, !1), 0 === t.strm.avail_out)
              ? yn
              : xn
          );
        },
        zn = (t, e) => {
          let n, i, r;
          for (;;) {
            if (t.lookahead < dn) {
              if ((Ln(t), t.lookahead < dn && e === Re)) return yn;
              if (0 === t.lookahead) break;
            }
            if (
              ((n = 0),
              t.lookahead >= cn &&
                ((t.ins_h = In(t, t.ins_h, t.window[t.strstart + cn - 1])),
                (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart)),
              (t.prev_length = t.match_length),
              (t.prev_match = t.match_start),
              (t.match_length = cn - 1),
              0 !== n &&
                t.prev_length < t.max_lazy_match &&
                t.strstart - n <= t.w_size - dn &&
                ((t.match_length = Dn(t, n)),
                t.match_length <= 5 &&
                  (t.strategy === We ||
                    (t.match_length === cn &&
                      t.strstart - t.match_start > 4096)) &&
                  (t.match_length = cn - 1)),
              t.prev_length >= cn && t.match_length <= t.prev_length)
            ) {
              (r = t.strstart + t.lookahead - cn),
                (i = Te(t, t.strstart - 1 - t.prev_match, t.prev_length - cn)),
                (t.lookahead -= t.prev_length - 1),
                (t.prev_length -= 2);
              do {
                ++t.strstart <= r &&
                  ((t.ins_h = In(t, t.ins_h, t.window[t.strstart + cn - 1])),
                  (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart));
              } while (0 !== --t.prev_length);
              if (
                ((t.match_available = 0),
                (t.match_length = cn - 1),
                t.strstart++,
                i && (Sn(t, !1), 0 === t.strm.avail_out))
              )
                return yn;
            } else if (t.match_available) {
              if (
                ((i = Te(t, 0, t.window[t.strstart - 1])),
                i && Sn(t, !1),
                t.strstart++,
                t.lookahead--,
                0 === t.strm.avail_out)
              )
                return yn;
            } else (t.match_available = 1), t.strstart++, t.lookahead--;
          }
          return (
            t.match_available &&
              ((i = Te(t, 0, t.window[t.strstart - 1])),
              (t.match_available = 0)),
            (t.insert = t.strstart < cn - 1 ? t.strstart : cn - 1),
            e === Ne
              ? (Sn(t, !0), 0 === t.strm.avail_out ? wn : _n)
              : t.last_lit && (Sn(t, !1), 0 === t.strm.avail_out)
              ? yn
              : xn
          );
        },
        Bn = (t, e) => {
          let n, i, r, a;
          const o = t.window;
          for (;;) {
            if (t.lookahead <= ln) {
              if ((Ln(t), t.lookahead <= ln && e === Re)) return yn;
              if (0 === t.lookahead) break;
            }
            if (
              ((t.match_length = 0),
              t.lookahead >= cn &&
                t.strstart > 0 &&
                ((r = t.strstart - 1),
                (i = o[r]),
                i === o[++r] && i === o[++r] && i === o[++r]))
            ) {
              a = t.strstart + ln;
              do {} while (
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                i === o[++r] &&
                r < a
              );
              (t.match_length = ln - (a - r)),
                t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (
              (t.match_length >= cn
                ? ((n = Te(t, 1, t.match_length - cn)),
                  (t.lookahead -= t.match_length),
                  (t.strstart += t.match_length),
                  (t.match_length = 0))
                : ((n = Te(t, 0, t.window[t.strstart])),
                  t.lookahead--,
                  t.strstart++),
              n && (Sn(t, !1), 0 === t.strm.avail_out))
            )
              return yn;
          }
          return (
            (t.insert = 0),
            e === Ne
              ? (Sn(t, !0), 0 === t.strm.avail_out ? wn : _n)
              : t.last_lit && (Sn(t, !1), 0 === t.strm.avail_out)
              ? yn
              : xn
          );
        },
        Un = (t, e) => {
          let n;
          for (;;) {
            if (0 === t.lookahead && (Ln(t), 0 === t.lookahead)) {
              if (e === Re) return yn;
              break;
            }
            if (
              ((t.match_length = 0),
              (n = Te(t, 0, t.window[t.strstart])),
              t.lookahead--,
              t.strstart++,
              n && (Sn(t, !1), 0 === t.strm.avail_out))
            )
              return yn;
          }
          return (
            (t.insert = 0),
            e === Ne
              ? (Sn(t, !0), 0 === t.strm.avail_out ? wn : _n)
              : t.last_lit && (Sn(t, !1), 0 === t.strm.avail_out)
              ? yn
              : xn
          );
        };
      function Hn(t, e, n, i, r) {
        (this.good_length = t),
          (this.max_lazy = e),
          (this.nice_length = n),
          (this.max_chain = i),
          (this.func = r);
      }
      const Fn = [
          new Hn(0, 0, 0, 0, Nn),
          new Hn(4, 4, 8, 4, Pn),
          new Hn(4, 5, 16, 8, Pn),
          new Hn(4, 6, 32, 32, Pn),
          new Hn(4, 4, 16, 16, zn),
          new Hn(8, 16, 32, 32, zn),
          new Hn(8, 16, 128, 128, zn),
          new Hn(8, 32, 128, 256, zn),
          new Hn(32, 128, 258, 1024, zn),
          new Hn(32, 258, 258, 4096, zn),
        ],
        Kn = (t) => {
          (t.window_size = 2 * t.w_size),
            En(t.head),
            (t.max_lazy_match = Fn[t.level].max_lazy),
            (t.good_match = Fn[t.level].good_length),
            (t.nice_match = Fn[t.level].nice_length),
            (t.max_chain_length = Fn[t.level].max_chain),
            (t.strstart = 0),
            (t.block_start = 0),
            (t.lookahead = 0),
            (t.insert = 0),
            (t.match_length = t.prev_length = cn - 1),
            (t.match_available = 0),
            (t.ins_h = 0);
        };
      function Wn() {
        (this.strm = null),
          (this.status = 0),
          (this.pending_buf = null),
          (this.pending_buf_size = 0),
          (this.pending_out = 0),
          (this.pending = 0),
          (this.wrap = 0),
          (this.gzhead = null),
          (this.gzindex = 0),
          (this.method = Je),
          (this.last_flush = -1),
          (this.w_size = 0),
          (this.w_bits = 0),
          (this.w_mask = 0),
          (this.window = null),
          (this.window_size = 0),
          (this.prev = null),
          (this.head = null),
          (this.ins_h = 0),
          (this.hash_size = 0),
          (this.hash_bits = 0),
          (this.hash_mask = 0),
          (this.hash_shift = 0),
          (this.block_start = 0),
          (this.match_length = 0),
          (this.prev_match = 0),
          (this.match_available = 0),
          (this.strstart = 0),
          (this.match_start = 0),
          (this.lookahead = 0),
          (this.prev_length = 0),
          (this.max_chain_length = 0),
          (this.max_lazy_match = 0),
          (this.level = 0),
          (this.strategy = 0),
          (this.good_match = 0),
          (this.nice_match = 0),
          (this.dyn_ltree = new Uint16Array(2 * on)),
          (this.dyn_dtree = new Uint16Array(2 * (2 * rn + 1))),
          (this.bl_tree = new Uint16Array(2 * (2 * an + 1))),
          En(this.dyn_ltree),
          En(this.dyn_dtree),
          En(this.bl_tree),
          (this.l_desc = null),
          (this.d_desc = null),
          (this.bl_desc = null),
          (this.bl_count = new Uint16Array(sn + 1)),
          (this.heap = new Uint16Array(2 * nn + 1)),
          En(this.heap),
          (this.heap_len = 0),
          (this.heap_max = 0),
          (this.depth = new Uint16Array(2 * nn + 1)),
          En(this.depth),
          (this.l_buf = 0),
          (this.lit_bufsize = 0),
          (this.last_lit = 0),
          (this.d_buf = 0),
          (this.opt_len = 0),
          (this.static_len = 0),
          (this.matches = 0),
          (this.insert = 0),
          (this.bi_buf = 0),
          (this.bi_valid = 0);
      }
      const Yn = (t) => {
          if (!t || !t.state) return An(t, Ue);
          (t.total_in = t.total_out = 0), (t.data_type = Qe);
          const e = t.state;
          return (
            (e.pending = 0),
            (e.pending_out = 0),
            e.wrap < 0 && (e.wrap = -e.wrap),
            (e.status = e.wrap ? un : vn),
            (t.adler = 2 === e.wrap ? 0 : 1),
            (e.last_flush = Re),
            Ie(e),
            ze
          );
        },
        Vn = (t) => {
          const e = Yn(t);
          return e === ze && Kn(t.state), e;
        },
        Gn = (t, e) =>
          t && t.state
            ? 2 !== t.state.wrap
              ? Ue
              : ((t.state.gzhead = e), ze)
            : Ue,
        Zn = (t, e, n, i, r, a) => {
          if (!t) return Ue;
          let o = 1;
          if (
            (e === Ke && (e = 6),
            i < 0 ? ((o = 0), (i = -i)) : i > 15 && ((o = 2), (i -= 16)),
            r < 1 ||
              r > Xe ||
              n !== Je ||
              i < 8 ||
              i > 15 ||
              e < 0 ||
              e > 9 ||
              a < 0 ||
              a > Ge)
          )
            return An(t, Ue);
          8 === i && (i = 9);
          const s = new Wn();
          return (
            (t.state = s),
            (s.strm = t),
            (s.wrap = o),
            (s.gzhead = null),
            (s.w_bits = i),
            (s.w_size = 1 << s.w_bits),
            (s.w_mask = s.w_size - 1),
            (s.hash_bits = r + 7),
            (s.hash_size = 1 << s.hash_bits),
            (s.hash_mask = s.hash_size - 1),
            (s.hash_shift = ~~((s.hash_bits + cn - 1) / cn)),
            (s.window = new Uint8Array(2 * s.w_size)),
            (s.head = new Uint16Array(s.hash_size)),
            (s.prev = new Uint16Array(s.w_size)),
            (s.lit_bufsize = 1 << (r + 6)),
            (s.pending_buf_size = 4 * s.lit_bufsize),
            (s.pending_buf = new Uint8Array(s.pending_buf_size)),
            (s.d_buf = 1 * s.lit_bufsize),
            (s.l_buf = 3 * s.lit_bufsize),
            (s.level = e),
            (s.strategy = a),
            (s.method = n),
            Vn(t)
          );
        },
        Qn = (t, e) => Zn(t, e, Je, $e, qe, Ze),
        Jn = (t, e) => {
          let n, i;
          if (!t || !t.state || e > Pe || e < 0) return t ? An(t, Ue) : Ue;
          const r = t.state;
          if (
            !t.output ||
            (!t.input && 0 !== t.avail_in) ||
            (r.status === mn && e !== Ne)
          )
            return An(t, 0 === t.avail_out ? Fe : Ue);
          r.strm = t;
          const a = r.last_flush;
          if (((r.last_flush = e), r.status === un))
            if (2 === r.wrap)
              (t.adler = 0),
                Tn(r, 31),
                Tn(r, 139),
                Tn(r, 8),
                r.gzhead
                  ? (Tn(
                      r,
                      (r.gzhead.text ? 1 : 0) +
                        (r.gzhead.hcrc ? 2 : 0) +
                        (r.gzhead.extra ? 4 : 0) +
                        (r.gzhead.name ? 8 : 0) +
                        (r.gzhead.comment ? 16 : 0)
                    ),
                    Tn(r, 255 & r.gzhead.time),
                    Tn(r, (r.gzhead.time >> 8) & 255),
                    Tn(r, (r.gzhead.time >> 16) & 255),
                    Tn(r, (r.gzhead.time >> 24) & 255),
                    Tn(
                      r,
                      9 === r.level
                        ? 2
                        : r.strategy >= Ye || r.level < 2
                        ? 4
                        : 0
                    ),
                    Tn(r, 255 & r.gzhead.os),
                    r.gzhead.extra &&
                      r.gzhead.extra.length &&
                      (Tn(r, 255 & r.gzhead.extra.length),
                      Tn(r, (r.gzhead.extra.length >> 8) & 255)),
                    r.gzhead.hcrc &&
                      (t.adler = ke(t.adler, r.pending_buf, r.pending, 0)),
                    (r.gzindex = 0),
                    (r.status = fn))
                  : (Tn(r, 0),
                    Tn(r, 0),
                    Tn(r, 0),
                    Tn(r, 0),
                    Tn(r, 0),
                    Tn(
                      r,
                      9 === r.level
                        ? 2
                        : r.strategy >= Ye || r.level < 2
                        ? 4
                        : 0
                    ),
                    Tn(r, On),
                    (r.status = vn));
            else {
              let e = (Je + ((r.w_bits - 8) << 4)) << 8,
                n = -1;
              (n =
                r.strategy >= Ye || r.level < 2
                  ? 0
                  : r.level < 6
                  ? 1
                  : 6 === r.level
                  ? 2
                  : 3),
                (e |= n << 6),
                0 !== r.strstart && (e |= hn),
                (e += 31 - (e % 31)),
                (r.status = vn),
                Mn(r, e),
                0 !== r.strstart &&
                  (Mn(r, t.adler >>> 16), Mn(r, 65535 & t.adler)),
                (t.adler = 1);
            }
          if (r.status === fn)
            if (r.gzhead.extra) {
              n = r.pending;
              while (r.gzindex < (65535 & r.gzhead.extra.length)) {
                if (
                  r.pending === r.pending_buf_size &&
                  (r.gzhead.hcrc &&
                    r.pending > n &&
                    (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                  Cn(t),
                  (n = r.pending),
                  r.pending === r.pending_buf_size)
                )
                  break;
                Tn(r, 255 & r.gzhead.extra[r.gzindex]), r.gzindex++;
              }
              r.gzhead.hcrc &&
                r.pending > n &&
                (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                r.gzindex === r.gzhead.extra.length &&
                  ((r.gzindex = 0), (r.status = pn));
            } else r.status = pn;
          if (r.status === pn)
            if (r.gzhead.name) {
              n = r.pending;
              do {
                if (
                  r.pending === r.pending_buf_size &&
                  (r.gzhead.hcrc &&
                    r.pending > n &&
                    (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                  Cn(t),
                  (n = r.pending),
                  r.pending === r.pending_buf_size)
                ) {
                  i = 1;
                  break;
                }
                (i =
                  r.gzindex < r.gzhead.name.length
                    ? 255 & r.gzhead.name.charCodeAt(r.gzindex++)
                    : 0),
                  Tn(r, i);
              } while (0 !== i);
              r.gzhead.hcrc &&
                r.pending > n &&
                (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                0 === i && ((r.gzindex = 0), (r.status = bn));
            } else r.status = bn;
          if (r.status === bn)
            if (r.gzhead.comment) {
              n = r.pending;
              do {
                if (
                  r.pending === r.pending_buf_size &&
                  (r.gzhead.hcrc &&
                    r.pending > n &&
                    (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                  Cn(t),
                  (n = r.pending),
                  r.pending === r.pending_buf_size)
                ) {
                  i = 1;
                  break;
                }
                (i =
                  r.gzindex < r.gzhead.comment.length
                    ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++)
                    : 0),
                  Tn(r, i);
              } while (0 !== i);
              r.gzhead.hcrc &&
                r.pending > n &&
                (t.adler = ke(t.adler, r.pending_buf, r.pending - n, n)),
                0 === i && (r.status = gn);
            } else r.status = gn;
          if (
            (r.status === gn &&
              (r.gzhead.hcrc
                ? (r.pending + 2 > r.pending_buf_size && Cn(t),
                  r.pending + 2 <= r.pending_buf_size &&
                    (Tn(r, 255 & t.adler),
                    Tn(r, (t.adler >> 8) & 255),
                    (t.adler = 0),
                    (r.status = vn)))
                : (r.status = vn)),
            0 !== r.pending)
          ) {
            if ((Cn(t), 0 === t.avail_out)) return (r.last_flush = -1), ze;
          } else if (0 === t.avail_in && kn(e) <= kn(a) && e !== Ne)
            return An(t, Fe);
          if (r.status === mn && 0 !== t.avail_in) return An(t, Fe);
          if (
            0 !== t.avail_in ||
            0 !== r.lookahead ||
            (e !== Re && r.status !== mn)
          ) {
            let n =
              r.strategy === Ye
                ? Un(r, e)
                : r.strategy === Ve
                ? Bn(r, e)
                : Fn[r.level].func(r, e);
            if (
              ((n !== wn && n !== _n) || (r.status = mn), n === yn || n === wn)
            )
              return 0 === t.avail_out && (r.last_flush = -1), ze;
            if (
              n === xn &&
              (e === De
                ? Me(r)
                : e !== Pe &&
                  (Ce(r, 0, 0, !1),
                  e === Le &&
                    (En(r.head),
                    0 === r.lookahead &&
                      ((r.strstart = 0), (r.block_start = 0), (r.insert = 0)))),
              Cn(t),
              0 === t.avail_out)
            )
              return (r.last_flush = -1), ze;
          }
          return e !== Ne
            ? ze
            : r.wrap <= 0
            ? Be
            : (2 === r.wrap
                ? (Tn(r, 255 & t.adler),
                  Tn(r, (t.adler >> 8) & 255),
                  Tn(r, (t.adler >> 16) & 255),
                  Tn(r, (t.adler >> 24) & 255),
                  Tn(r, 255 & t.total_in),
                  Tn(r, (t.total_in >> 8) & 255),
                  Tn(r, (t.total_in >> 16) & 255),
                  Tn(r, (t.total_in >> 24) & 255))
                : (Mn(r, t.adler >>> 16), Mn(r, 65535 & t.adler)),
              Cn(t),
              r.wrap > 0 && (r.wrap = -r.wrap),
              0 !== r.pending ? ze : Be);
        },
        Xn = (t) => {
          if (!t || !t.state) return Ue;
          const e = t.state.status;
          return e !== un &&
            e !== fn &&
            e !== pn &&
            e !== bn &&
            e !== gn &&
            e !== vn &&
            e !== mn
            ? An(t, Ue)
            : ((t.state = null), e === vn ? An(t, He) : ze);
        },
        $n = (t, e) => {
          let n = e.length;
          if (!t || !t.state) return Ue;
          const i = t.state,
            r = i.wrap;
          if (2 === r || (1 === r && i.status !== un) || i.lookahead) return Ue;
          if (
            (1 === r && (t.adler = we(t.adler, e, n, 0)),
            (i.wrap = 0),
            n >= i.w_size)
          ) {
            0 === r &&
              (En(i.head),
              (i.strstart = 0),
              (i.block_start = 0),
              (i.insert = 0));
            let t = new Uint8Array(i.w_size);
            t.set(e.subarray(n - i.w_size, n), 0), (e = t), (n = i.w_size);
          }
          const a = t.avail_in,
            o = t.next_in,
            s = t.input;
          (t.avail_in = n), (t.next_in = 0), (t.input = e), Ln(i);
          while (i.lookahead >= cn) {
            let t = i.strstart,
              e = i.lookahead - (cn - 1);
            do {
              (i.ins_h = In(i, i.ins_h, i.window[t + cn - 1])),
                (i.prev[t & i.w_mask] = i.head[i.ins_h]),
                (i.head[i.ins_h] = t),
                t++;
            } while (--e);
            (i.strstart = t), (i.lookahead = cn - 1), Ln(i);
          }
          return (
            (i.strstart += i.lookahead),
            (i.block_start = i.strstart),
            (i.insert = i.lookahead),
            (i.lookahead = 0),
            (i.match_length = i.prev_length = cn - 1),
            (i.match_available = 0),
            (t.next_in = o),
            (t.input = s),
            (t.avail_in = a),
            (i.wrap = r),
            ze
          );
        };
      var qn = Qn,
        ti = Zn,
        ei = Vn,
        ni = Yn,
        ii = Gn,
        ri = Jn,
        ai = Xn,
        oi = $n,
        si = "pako deflate (from Nodeca project)",
        ci = {
          deflateInit: qn,
          deflateInit2: ti,
          deflateReset: ei,
          deflateResetKeep: ni,
          deflateSetHeader: ii,
          deflate: ri,
          deflateEnd: ai,
          deflateSetDictionary: oi,
          deflateInfo: si,
        };
      const li = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
      var di = function (t) {
          const e = Array.prototype.slice.call(arguments, 1);
          while (e.length) {
            const n = e.shift();
            if (n) {
              if ("object" !== typeof n)
                throw new TypeError(n + "must be non-object");
              for (const e in n) li(n, e) && (t[e] = n[e]);
            }
          }
          return t;
        },
        hi = (t) => {
          let e = 0;
          for (let i = 0, r = t.length; i < r; i++) e += t[i].length;
          const n = new Uint8Array(e);
          for (let i = 0, r = 0, a = t.length; i < a; i++) {
            let e = t[i];
            n.set(e, r), (r += e.length);
          }
          return n;
        },
        ui = { assign: di, flattenChunks: hi };
      let fi = !0;
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (fs) {
        fi = !1;
      }
      const pi = new Uint8Array(256);
      for (let ps = 0; ps < 256; ps++)
        pi[ps] =
          ps >= 252
            ? 6
            : ps >= 248
            ? 5
            : ps >= 240
            ? 4
            : ps >= 224
            ? 3
            : ps >= 192
            ? 2
            : 1;
      pi[254] = pi[254] = 1;
      var bi = (t) => {
        if ("function" === typeof TextEncoder && TextEncoder.prototype.encode)
          return new TextEncoder().encode(t);
        let e,
          n,
          i,
          r,
          a,
          o = t.length,
          s = 0;
        for (r = 0; r < o; r++)
          (n = t.charCodeAt(r)),
            55296 === (64512 & n) &&
              r + 1 < o &&
              ((i = t.charCodeAt(r + 1)),
              56320 === (64512 & i) &&
                ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
            (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
        for (e = new Uint8Array(s), a = 0, r = 0; a < s; r++)
          (n = t.charCodeAt(r)),
            55296 === (64512 & n) &&
              r + 1 < o &&
              ((i = t.charCodeAt(r + 1)),
              56320 === (64512 & i) &&
                ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
            n < 128
              ? (e[a++] = n)
              : n < 2048
              ? ((e[a++] = 192 | (n >>> 6)), (e[a++] = 128 | (63 & n)))
              : n < 65536
              ? ((e[a++] = 224 | (n >>> 12)),
                (e[a++] = 128 | ((n >>> 6) & 63)),
                (e[a++] = 128 | (63 & n)))
              : ((e[a++] = 240 | (n >>> 18)),
                (e[a++] = 128 | ((n >>> 12) & 63)),
                (e[a++] = 128 | ((n >>> 6) & 63)),
                (e[a++] = 128 | (63 & n)));
        return e;
      };
      const gi = (t, e) => {
        if (e < 65534 && t.subarray && fi)
          return String.fromCharCode.apply(
            null,
            t.length === e ? t : t.subarray(0, e)
          );
        let n = "";
        for (let i = 0; i < e; i++) n += String.fromCharCode(t[i]);
        return n;
      };
      var vi = (t, e) => {
          const n = e || t.length;
          if ("function" === typeof TextDecoder && TextDecoder.prototype.decode)
            return new TextDecoder().decode(t.subarray(0, e));
          let i, r;
          const a = new Array(2 * n);
          for (r = 0, i = 0; i < n; ) {
            let e = t[i++];
            if (e < 128) {
              a[r++] = e;
              continue;
            }
            let o = pi[e];
            if (o > 4) (a[r++] = 65533), (i += o - 1);
            else {
              e &= 2 === o ? 31 : 3 === o ? 15 : 7;
              while (o > 1 && i < n) (e = (e << 6) | (63 & t[i++])), o--;
              o > 1
                ? (a[r++] = 65533)
                : e < 65536
                ? (a[r++] = e)
                : ((e -= 65536),
                  (a[r++] = 55296 | ((e >> 10) & 1023)),
                  (a[r++] = 56320 | (1023 & e)));
            }
          }
          return gi(a, r);
        },
        mi = (t, e) => {
          (e = e || t.length), e > t.length && (e = t.length);
          let n = e - 1;
          while (n >= 0 && 128 === (192 & t[n])) n--;
          return n < 0 || 0 === n ? e : n + pi[t[n]] > e ? n : e;
        },
        yi = { string2buf: bi, buf2string: vi, utf8border: mi };
      function xi() {
        (this.input = null),
          (this.next_in = 0),
          (this.avail_in = 0),
          (this.total_in = 0),
          (this.output = null),
          (this.next_out = 0),
          (this.avail_out = 0),
          (this.total_out = 0),
          (this.msg = ""),
          (this.state = null),
          (this.data_type = 2),
          (this.adler = 0);
      }
      var wi = xi;
      const _i = Object.prototype.toString,
        {
          Z_NO_FLUSH: Oi,
          Z_SYNC_FLUSH: Ai,
          Z_FULL_FLUSH: ki,
          Z_FINISH: Ei,
          Z_OK: ji,
          Z_STREAM_END: Ii,
          Z_DEFAULT_COMPRESSION: Ci,
          Z_DEFAULT_STRATEGY: Si,
          Z_DEFLATED: Ti,
        } = je;
      function Mi(t) {
        this.options = ui.assign(
          {
            level: Ci,
            method: Ti,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Si,
          },
          t || {}
        );
        let e = this.options;
        e.raw && e.windowBits > 0
          ? (e.windowBits = -e.windowBits)
          : e.gzip &&
            e.windowBits > 0 &&
            e.windowBits < 16 &&
            (e.windowBits += 16),
          (this.err = 0),
          (this.msg = ""),
          (this.ended = !1),
          (this.chunks = []),
          (this.strm = new wi()),
          (this.strm.avail_out = 0);
        let n = ci.deflateInit2(
          this.strm,
          e.level,
          e.method,
          e.windowBits,
          e.memLevel,
          e.strategy
        );
        if (n !== ji) throw new Error(Ee[n]);
        if (
          (e.header && ci.deflateSetHeader(this.strm, e.header), e.dictionary)
        ) {
          let t;
          if (
            ((t =
              "string" === typeof e.dictionary
                ? yi.string2buf(e.dictionary)
                : "[object ArrayBuffer]" === _i.call(e.dictionary)
                ? new Uint8Array(e.dictionary)
                : e.dictionary),
            (n = ci.deflateSetDictionary(this.strm, t)),
            n !== ji)
          )
            throw new Error(Ee[n]);
          this._dict_set = !0;
        }
      }
      function Ri(t, e) {
        const n = new Mi(e);
        if ((n.push(t, !0), n.err)) throw n.msg || Ee[n.err];
        return n.result;
      }
      function Di(t, e) {
        return (e = e || {}), (e.raw = !0), Ri(t, e);
      }
      function Li(t, e) {
        return (e = e || {}), (e.gzip = !0), Ri(t, e);
      }
      (Mi.prototype.push = function (t, e) {
        const n = this.strm,
          i = this.options.chunkSize;
        let r, a;
        if (this.ended) return !1;
        for (
          a = e === ~~e ? e : !0 === e ? Ei : Oi,
            "string" === typeof t
              ? (n.input = yi.string2buf(t))
              : "[object ArrayBuffer]" === _i.call(t)
              ? (n.input = new Uint8Array(t))
              : (n.input = t),
            n.next_in = 0,
            n.avail_in = n.input.length;
          ;

        )
          if (
            (0 === n.avail_out &&
              ((n.output = new Uint8Array(i)),
              (n.next_out = 0),
              (n.avail_out = i)),
            (a === Ai || a === ki) && n.avail_out <= 6)
          )
            this.onData(n.output.subarray(0, n.next_out)), (n.avail_out = 0);
          else {
            if (((r = ci.deflate(n, a)), r === Ii))
              return (
                n.next_out > 0 && this.onData(n.output.subarray(0, n.next_out)),
                (r = ci.deflateEnd(this.strm)),
                this.onEnd(r),
                (this.ended = !0),
                r === ji
              );
            if (0 !== n.avail_out) {
              if (a > 0 && n.next_out > 0)
                this.onData(n.output.subarray(0, n.next_out)),
                  (n.avail_out = 0);
              else if (0 === n.avail_in) break;
            } else this.onData(n.output);
          }
        return !0;
      }),
        (Mi.prototype.onData = function (t) {
          this.chunks.push(t);
        }),
        (Mi.prototype.onEnd = function (t) {
          t === ji && (this.result = ui.flattenChunks(this.chunks)),
            (this.chunks = []),
            (this.err = t),
            (this.msg = this.strm.msg);
        });
      var Ni = Mi,
        Pi = Ri,
        zi = Di,
        Bi = Li,
        Ui = je,
        Hi = {
          Deflate: Ni,
          deflate: Pi,
          deflateRaw: zi,
          gzip: Bi,
          constants: Ui,
        };
      const Fi = 30,
        Ki = 12;
      var Wi = function (t, e) {
        let n,
          i,
          r,
          a,
          o,
          s,
          c,
          l,
          d,
          h,
          u,
          f,
          p,
          b,
          g,
          v,
          m,
          y,
          x,
          w,
          _,
          O,
          A,
          k;
        const E = t.state;
        (n = t.next_in),
          (A = t.input),
          (i = n + (t.avail_in - 5)),
          (r = t.next_out),
          (k = t.output),
          (a = r - (e - t.avail_out)),
          (o = r + (t.avail_out - 257)),
          (s = E.dmax),
          (c = E.wsize),
          (l = E.whave),
          (d = E.wnext),
          (h = E.window),
          (u = E.hold),
          (f = E.bits),
          (p = E.lencode),
          (b = E.distcode),
          (g = (1 << E.lenbits) - 1),
          (v = (1 << E.distbits) - 1);
        t: do {
          f < 15 &&
            ((u += A[n++] << f), (f += 8), (u += A[n++] << f), (f += 8)),
            (m = p[u & g]);
          e: for (;;) {
            if (
              ((y = m >>> 24),
              (u >>>= y),
              (f -= y),
              (y = (m >>> 16) & 255),
              0 === y)
            )
              k[r++] = 65535 & m;
            else {
              if (!(16 & y)) {
                if (0 === (64 & y)) {
                  m = p[(65535 & m) + (u & ((1 << y) - 1))];
                  continue e;
                }
                if (32 & y) {
                  E.mode = Ki;
                  break t;
                }
                (t.msg = "invalid literal/length code"), (E.mode = Fi);
                break t;
              }
              (x = 65535 & m),
                (y &= 15),
                y &&
                  (f < y && ((u += A[n++] << f), (f += 8)),
                  (x += u & ((1 << y) - 1)),
                  (u >>>= y),
                  (f -= y)),
                f < 15 &&
                  ((u += A[n++] << f), (f += 8), (u += A[n++] << f), (f += 8)),
                (m = b[u & v]);
              n: for (;;) {
                if (
                  ((y = m >>> 24),
                  (u >>>= y),
                  (f -= y),
                  (y = (m >>> 16) & 255),
                  !(16 & y))
                ) {
                  if (0 === (64 & y)) {
                    m = b[(65535 & m) + (u & ((1 << y) - 1))];
                    continue n;
                  }
                  (t.msg = "invalid distance code"), (E.mode = Fi);
                  break t;
                }
                if (
                  ((w = 65535 & m),
                  (y &= 15),
                  f < y &&
                    ((u += A[n++] << f),
                    (f += 8),
                    f < y && ((u += A[n++] << f), (f += 8))),
                  (w += u & ((1 << y) - 1)),
                  w > s)
                ) {
                  (t.msg = "invalid distance too far back"), (E.mode = Fi);
                  break t;
                }
                if (((u >>>= y), (f -= y), (y = r - a), w > y)) {
                  if (((y = w - y), y > l && E.sane)) {
                    (t.msg = "invalid distance too far back"), (E.mode = Fi);
                    break t;
                  }
                  if (((_ = 0), (O = h), 0 === d)) {
                    if (((_ += c - y), y < x)) {
                      x -= y;
                      do {
                        k[r++] = h[_++];
                      } while (--y);
                      (_ = r - w), (O = k);
                    }
                  } else if (d < y) {
                    if (((_ += c + d - y), (y -= d), y < x)) {
                      x -= y;
                      do {
                        k[r++] = h[_++];
                      } while (--y);
                      if (((_ = 0), d < x)) {
                        (y = d), (x -= y);
                        do {
                          k[r++] = h[_++];
                        } while (--y);
                        (_ = r - w), (O = k);
                      }
                    }
                  } else if (((_ += d - y), y < x)) {
                    x -= y;
                    do {
                      k[r++] = h[_++];
                    } while (--y);
                    (_ = r - w), (O = k);
                  }
                  while (x > 2)
                    (k[r++] = O[_++]),
                      (k[r++] = O[_++]),
                      (k[r++] = O[_++]),
                      (x -= 3);
                  x && ((k[r++] = O[_++]), x > 1 && (k[r++] = O[_++]));
                } else {
                  _ = r - w;
                  do {
                    (k[r++] = k[_++]),
                      (k[r++] = k[_++]),
                      (k[r++] = k[_++]),
                      (x -= 3);
                  } while (x > 2);
                  x && ((k[r++] = k[_++]), x > 1 && (k[r++] = k[_++]));
                }
                break;
              }
            }
            break;
          }
        } while (n < i && r < o);
        (x = f >> 3),
          (n -= x),
          (f -= x << 3),
          (u &= (1 << f) - 1),
          (t.next_in = n),
          (t.next_out = r),
          (t.avail_in = n < i ? i - n + 5 : 5 - (n - i)),
          (t.avail_out = r < o ? o - r + 257 : 257 - (r - o)),
          (E.hold = u),
          (E.bits = f);
      };
      const Yi = 15,
        Vi = 852,
        Gi = 592,
        Zi = 0,
        Qi = 1,
        Ji = 2,
        Xi = new Uint16Array([
          3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51,
          59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
        ]),
        $i = new Uint8Array([
          16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19,
          19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
        ]),
        qi = new Uint16Array([
          1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
          513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385,
          24577, 0, 0,
        ]),
        tr = new Uint8Array([
          16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23,
          23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
        ]),
        er = (t, e, n, i, r, a, o, s) => {
          const c = s.bits;
          let l,
            d,
            h,
            u,
            f,
            p,
            b = 0,
            g = 0,
            v = 0,
            m = 0,
            y = 0,
            x = 0,
            w = 0,
            _ = 0,
            O = 0,
            A = 0,
            k = null,
            E = 0;
          const j = new Uint16Array(Yi + 1),
            I = new Uint16Array(Yi + 1);
          let C,
            S,
            T,
            M = null,
            R = 0;
          for (b = 0; b <= Yi; b++) j[b] = 0;
          for (g = 0; g < i; g++) j[e[n + g]]++;
          for (y = c, m = Yi; m >= 1; m--) if (0 !== j[m]) break;
          if ((y > m && (y = m), 0 === m))
            return (r[a++] = 20971520), (r[a++] = 20971520), (s.bits = 1), 0;
          for (v = 1; v < m; v++) if (0 !== j[v]) break;
          for (y < v && (y = v), _ = 1, b = 1; b <= Yi; b++)
            if (((_ <<= 1), (_ -= j[b]), _ < 0)) return -1;
          if (_ > 0 && (t === Zi || 1 !== m)) return -1;
          for (I[1] = 0, b = 1; b < Yi; b++) I[b + 1] = I[b] + j[b];
          for (g = 0; g < i; g++) 0 !== e[n + g] && (o[I[e[n + g]]++] = g);
          if (
            (t === Zi
              ? ((k = M = o), (p = 19))
              : t === Qi
              ? ((k = Xi), (E -= 257), (M = $i), (R -= 257), (p = 256))
              : ((k = qi), (M = tr), (p = -1)),
            (A = 0),
            (g = 0),
            (b = v),
            (f = a),
            (x = y),
            (w = 0),
            (h = -1),
            (O = 1 << y),
            (u = O - 1),
            (t === Qi && O > Vi) || (t === Ji && O > Gi))
          )
            return 1;
          for (;;) {
            (C = b - w),
              o[g] < p
                ? ((S = 0), (T = o[g]))
                : o[g] > p
                ? ((S = M[R + o[g]]), (T = k[E + o[g]]))
                : ((S = 96), (T = 0)),
              (l = 1 << (b - w)),
              (d = 1 << x),
              (v = d);
            do {
              (d -= l), (r[f + (A >> w) + d] = (C << 24) | (S << 16) | T | 0);
            } while (0 !== d);
            l = 1 << (b - 1);
            while (A & l) l >>= 1;
            if (
              (0 !== l ? ((A &= l - 1), (A += l)) : (A = 0), g++, 0 === --j[b])
            ) {
              if (b === m) break;
              b = e[n + o[g]];
            }
            if (b > y && (A & u) !== h) {
              0 === w && (w = y), (f += v), (x = b - w), (_ = 1 << x);
              while (x + w < m) {
                if (((_ -= j[x + w]), _ <= 0)) break;
                x++, (_ <<= 1);
              }
              if (((O += 1 << x), (t === Qi && O > Vi) || (t === Ji && O > Gi)))
                return 1;
              (h = A & u), (r[h] = (y << 24) | (x << 16) | (f - a) | 0);
            }
          }
          return (
            0 !== A && (r[f + A] = ((b - w) << 24) | (64 << 16) | 0),
            (s.bits = y),
            0
          );
        };
      var nr = er;
      const ir = 0,
        rr = 1,
        ar = 2,
        {
          Z_FINISH: or,
          Z_BLOCK: sr,
          Z_TREES: cr,
          Z_OK: lr,
          Z_STREAM_END: dr,
          Z_NEED_DICT: hr,
          Z_STREAM_ERROR: ur,
          Z_DATA_ERROR: fr,
          Z_MEM_ERROR: pr,
          Z_BUF_ERROR: br,
          Z_DEFLATED: gr,
        } = je,
        vr = 1,
        mr = 2,
        yr = 3,
        xr = 4,
        wr = 5,
        _r = 6,
        Or = 7,
        Ar = 8,
        kr = 9,
        Er = 10,
        jr = 11,
        Ir = 12,
        Cr = 13,
        Sr = 14,
        Tr = 15,
        Mr = 16,
        Rr = 17,
        Dr = 18,
        Lr = 19,
        Nr = 20,
        Pr = 21,
        zr = 22,
        Br = 23,
        Ur = 24,
        Hr = 25,
        Fr = 26,
        Kr = 27,
        Wr = 28,
        Yr = 29,
        Vr = 30,
        Gr = 31,
        Zr = 32,
        Qr = 852,
        Jr = 592,
        Xr = 15,
        $r = Xr,
        qr = (t) =>
          ((t >>> 24) & 255) +
          ((t >>> 8) & 65280) +
          ((65280 & t) << 8) +
          ((255 & t) << 24);
      function ta() {
        (this.mode = 0),
          (this.last = !1),
          (this.wrap = 0),
          (this.havedict = !1),
          (this.flags = 0),
          (this.dmax = 0),
          (this.check = 0),
          (this.total = 0),
          (this.head = null),
          (this.wbits = 0),
          (this.wsize = 0),
          (this.whave = 0),
          (this.wnext = 0),
          (this.window = null),
          (this.hold = 0),
          (this.bits = 0),
          (this.length = 0),
          (this.offset = 0),
          (this.extra = 0),
          (this.lencode = null),
          (this.distcode = null),
          (this.lenbits = 0),
          (this.distbits = 0),
          (this.ncode = 0),
          (this.nlen = 0),
          (this.ndist = 0),
          (this.have = 0),
          (this.next = null),
          (this.lens = new Uint16Array(320)),
          (this.work = new Uint16Array(288)),
          (this.lendyn = null),
          (this.distdyn = null),
          (this.sane = 0),
          (this.back = 0),
          (this.was = 0);
      }
      const ea = (t) => {
          if (!t || !t.state) return ur;
          const e = t.state;
          return (
            (t.total_in = t.total_out = e.total = 0),
            (t.msg = ""),
            e.wrap && (t.adler = 1 & e.wrap),
            (e.mode = vr),
            (e.last = 0),
            (e.havedict = 0),
            (e.dmax = 32768),
            (e.head = null),
            (e.hold = 0),
            (e.bits = 0),
            (e.lencode = e.lendyn = new Int32Array(Qr)),
            (e.distcode = e.distdyn = new Int32Array(Jr)),
            (e.sane = 1),
            (e.back = -1),
            lr
          );
        },
        na = (t) => {
          if (!t || !t.state) return ur;
          const e = t.state;
          return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), ea(t);
        },
        ia = (t, e) => {
          let n;
          if (!t || !t.state) return ur;
          const i = t.state;
          return (
            e < 0
              ? ((n = 0), (e = -e))
              : ((n = 1 + (e >> 4)), e < 48 && (e &= 15)),
            e && (e < 8 || e > 15)
              ? ur
              : (null !== i.window && i.wbits !== e && (i.window = null),
                (i.wrap = n),
                (i.wbits = e),
                na(t))
          );
        },
        ra = (t, e) => {
          if (!t) return ur;
          const n = new ta();
          (t.state = n), (n.window = null);
          const i = ia(t, e);
          return i !== lr && (t.state = null), i;
        },
        aa = (t) => ra(t, $r);
      let oa,
        sa,
        ca = !0;
      const la = (t) => {
          if (ca) {
            (oa = new Int32Array(512)), (sa = new Int32Array(32));
            let e = 0;
            while (e < 144) t.lens[e++] = 8;
            while (e < 256) t.lens[e++] = 9;
            while (e < 280) t.lens[e++] = 7;
            while (e < 288) t.lens[e++] = 8;
            nr(rr, t.lens, 0, 288, oa, 0, t.work, { bits: 9 }), (e = 0);
            while (e < 32) t.lens[e++] = 5;
            nr(ar, t.lens, 0, 32, sa, 0, t.work, { bits: 5 }), (ca = !1);
          }
          (t.lencode = oa),
            (t.lenbits = 9),
            (t.distcode = sa),
            (t.distbits = 5);
        },
        da = (t, e, n, i) => {
          let r;
          const a = t.state;
          return (
            null === a.window &&
              ((a.wsize = 1 << a.wbits),
              (a.wnext = 0),
              (a.whave = 0),
              (a.window = new Uint8Array(a.wsize))),
            i >= a.wsize
              ? (a.window.set(e.subarray(n - a.wsize, n), 0),
                (a.wnext = 0),
                (a.whave = a.wsize))
              : ((r = a.wsize - a.wnext),
                r > i && (r = i),
                a.window.set(e.subarray(n - i, n - i + r), a.wnext),
                (i -= r),
                i
                  ? (a.window.set(e.subarray(n - i, n), 0),
                    (a.wnext = i),
                    (a.whave = a.wsize))
                  : ((a.wnext += r),
                    a.wnext === a.wsize && (a.wnext = 0),
                    a.whave < a.wsize && (a.whave += r))),
            0
          );
        },
        ha = (t, e) => {
          let n,
            i,
            r,
            a,
            o,
            s,
            c,
            l,
            d,
            h,
            u,
            f,
            p,
            b,
            g,
            v,
            m,
            y,
            x,
            w,
            _,
            O,
            A = 0;
          const k = new Uint8Array(4);
          let E, j;
          const I = new Uint8Array([
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
          ]);
          if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in))
            return ur;
          (n = t.state),
            n.mode === Ir && (n.mode = Cr),
            (o = t.next_out),
            (r = t.output),
            (c = t.avail_out),
            (a = t.next_in),
            (i = t.input),
            (s = t.avail_in),
            (l = n.hold),
            (d = n.bits),
            (h = s),
            (u = c),
            (O = lr);
          t: for (;;)
            switch (n.mode) {
              case vr:
                if (0 === n.wrap) {
                  n.mode = Cr;
                  break;
                }
                while (d < 16) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if (2 & n.wrap && 35615 === l) {
                  (n.check = 0),
                    (k[0] = 255 & l),
                    (k[1] = (l >>> 8) & 255),
                    (n.check = ke(n.check, k, 2, 0)),
                    (l = 0),
                    (d = 0),
                    (n.mode = mr);
                  break;
                }
                if (
                  ((n.flags = 0),
                  n.head && (n.head.done = !1),
                  !(1 & n.wrap) || (((255 & l) << 8) + (l >> 8)) % 31)
                ) {
                  (t.msg = "incorrect header check"), (n.mode = Vr);
                  break;
                }
                if ((15 & l) !== gr) {
                  (t.msg = "unknown compression method"), (n.mode = Vr);
                  break;
                }
                if (((l >>>= 4), (d -= 4), (_ = 8 + (15 & l)), 0 === n.wbits))
                  n.wbits = _;
                else if (_ > n.wbits) {
                  (t.msg = "invalid window size"), (n.mode = Vr);
                  break;
                }
                (n.dmax = 1 << n.wbits),
                  (t.adler = n.check = 1),
                  (n.mode = 512 & l ? Er : Ir),
                  (l = 0),
                  (d = 0);
                break;
              case mr:
                while (d < 16) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if (((n.flags = l), (255 & n.flags) !== gr)) {
                  (t.msg = "unknown compression method"), (n.mode = Vr);
                  break;
                }
                if (57344 & n.flags) {
                  (t.msg = "unknown header flags set"), (n.mode = Vr);
                  break;
                }
                n.head && (n.head.text = (l >> 8) & 1),
                  512 & n.flags &&
                    ((k[0] = 255 & l),
                    (k[1] = (l >>> 8) & 255),
                    (n.check = ke(n.check, k, 2, 0))),
                  (l = 0),
                  (d = 0),
                  (n.mode = yr);
              case yr:
                while (d < 32) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                n.head && (n.head.time = l),
                  512 & n.flags &&
                    ((k[0] = 255 & l),
                    (k[1] = (l >>> 8) & 255),
                    (k[2] = (l >>> 16) & 255),
                    (k[3] = (l >>> 24) & 255),
                    (n.check = ke(n.check, k, 4, 0))),
                  (l = 0),
                  (d = 0),
                  (n.mode = xr);
              case xr:
                while (d < 16) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                n.head && ((n.head.xflags = 255 & l), (n.head.os = l >> 8)),
                  512 & n.flags &&
                    ((k[0] = 255 & l),
                    (k[1] = (l >>> 8) & 255),
                    (n.check = ke(n.check, k, 2, 0))),
                  (l = 0),
                  (d = 0),
                  (n.mode = wr);
              case wr:
                if (1024 & n.flags) {
                  while (d < 16) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (n.length = l),
                    n.head && (n.head.extra_len = l),
                    512 & n.flags &&
                      ((k[0] = 255 & l),
                      (k[1] = (l >>> 8) & 255),
                      (n.check = ke(n.check, k, 2, 0))),
                    (l = 0),
                    (d = 0);
                } else n.head && (n.head.extra = null);
                n.mode = _r;
              case _r:
                if (
                  1024 & n.flags &&
                  ((f = n.length),
                  f > s && (f = s),
                  f &&
                    (n.head &&
                      ((_ = n.head.extra_len - n.length),
                      n.head.extra ||
                        (n.head.extra = new Uint8Array(n.head.extra_len)),
                      n.head.extra.set(i.subarray(a, a + f), _)),
                    512 & n.flags && (n.check = ke(n.check, i, f, a)),
                    (s -= f),
                    (a += f),
                    (n.length -= f)),
                  n.length)
                )
                  break t;
                (n.length = 0), (n.mode = Or);
              case Or:
                if (2048 & n.flags) {
                  if (0 === s) break t;
                  f = 0;
                  do {
                    (_ = i[a + f++]),
                      n.head &&
                        _ &&
                        n.length < 65536 &&
                        (n.head.name += String.fromCharCode(_));
                  } while (_ && f < s);
                  if (
                    (512 & n.flags && (n.check = ke(n.check, i, f, a)),
                    (s -= f),
                    (a += f),
                    _)
                  )
                    break t;
                } else n.head && (n.head.name = null);
                (n.length = 0), (n.mode = Ar);
              case Ar:
                if (4096 & n.flags) {
                  if (0 === s) break t;
                  f = 0;
                  do {
                    (_ = i[a + f++]),
                      n.head &&
                        _ &&
                        n.length < 65536 &&
                        (n.head.comment += String.fromCharCode(_));
                  } while (_ && f < s);
                  if (
                    (512 & n.flags && (n.check = ke(n.check, i, f, a)),
                    (s -= f),
                    (a += f),
                    _)
                  )
                    break t;
                } else n.head && (n.head.comment = null);
                n.mode = kr;
              case kr:
                if (512 & n.flags) {
                  while (d < 16) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  if (l !== (65535 & n.check)) {
                    (t.msg = "header crc mismatch"), (n.mode = Vr);
                    break;
                  }
                  (l = 0), (d = 0);
                }
                n.head &&
                  ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)),
                  (t.adler = n.check = 0),
                  (n.mode = Ir);
                break;
              case Er:
                while (d < 32) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                (t.adler = n.check = qr(l)), (l = 0), (d = 0), (n.mode = jr);
              case jr:
                if (0 === n.havedict)
                  return (
                    (t.next_out = o),
                    (t.avail_out = c),
                    (t.next_in = a),
                    (t.avail_in = s),
                    (n.hold = l),
                    (n.bits = d),
                    hr
                  );
                (t.adler = n.check = 1), (n.mode = Ir);
              case Ir:
                if (e === sr || e === cr) break t;
              case Cr:
                if (n.last) {
                  (l >>>= 7 & d), (d -= 7 & d), (n.mode = Kr);
                  break;
                }
                while (d < 3) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                switch (((n.last = 1 & l), (l >>>= 1), (d -= 1), 3 & l)) {
                  case 0:
                    n.mode = Sr;
                    break;
                  case 1:
                    if ((la(n), (n.mode = Nr), e === cr)) {
                      (l >>>= 2), (d -= 2);
                      break t;
                    }
                    break;
                  case 2:
                    n.mode = Rr;
                    break;
                  case 3:
                    (t.msg = "invalid block type"), (n.mode = Vr);
                }
                (l >>>= 2), (d -= 2);
                break;
              case Sr:
                (l >>>= 7 & d), (d -= 7 & d);
                while (d < 32) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if ((65535 & l) !== ((l >>> 16) ^ 65535)) {
                  (t.msg = "invalid stored block lengths"), (n.mode = Vr);
                  break;
                }
                if (
                  ((n.length = 65535 & l),
                  (l = 0),
                  (d = 0),
                  (n.mode = Tr),
                  e === cr)
                )
                  break t;
              case Tr:
                n.mode = Mr;
              case Mr:
                if (((f = n.length), f)) {
                  if ((f > s && (f = s), f > c && (f = c), 0 === f)) break t;
                  r.set(i.subarray(a, a + f), o),
                    (s -= f),
                    (a += f),
                    (c -= f),
                    (o += f),
                    (n.length -= f);
                  break;
                }
                n.mode = Ir;
                break;
              case Rr:
                while (d < 14) {
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if (
                  ((n.nlen = 257 + (31 & l)),
                  (l >>>= 5),
                  (d -= 5),
                  (n.ndist = 1 + (31 & l)),
                  (l >>>= 5),
                  (d -= 5),
                  (n.ncode = 4 + (15 & l)),
                  (l >>>= 4),
                  (d -= 4),
                  n.nlen > 286 || n.ndist > 30)
                ) {
                  (t.msg = "too many length or distance symbols"),
                    (n.mode = Vr);
                  break;
                }
                (n.have = 0), (n.mode = Dr);
              case Dr:
                while (n.have < n.ncode) {
                  while (d < 3) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (n.lens[I[n.have++]] = 7 & l), (l >>>= 3), (d -= 3);
                }
                while (n.have < 19) n.lens[I[n.have++]] = 0;
                if (
                  ((n.lencode = n.lendyn),
                  (n.lenbits = 7),
                  (E = { bits: n.lenbits }),
                  (O = nr(ir, n.lens, 0, 19, n.lencode, 0, n.work, E)),
                  (n.lenbits = E.bits),
                  O)
                ) {
                  (t.msg = "invalid code lengths set"), (n.mode = Vr);
                  break;
                }
                (n.have = 0), (n.mode = Lr);
              case Lr:
                while (n.have < n.nlen + n.ndist) {
                  for (;;) {
                    if (
                      ((A = n.lencode[l & ((1 << n.lenbits) - 1)]),
                      (g = A >>> 24),
                      (v = (A >>> 16) & 255),
                      (m = 65535 & A),
                      g <= d)
                    )
                      break;
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  if (m < 16) (l >>>= g), (d -= g), (n.lens[n.have++] = m);
                  else {
                    if (16 === m) {
                      j = g + 2;
                      while (d < j) {
                        if (0 === s) break t;
                        s--, (l += i[a++] << d), (d += 8);
                      }
                      if (((l >>>= g), (d -= g), 0 === n.have)) {
                        (t.msg = "invalid bit length repeat"), (n.mode = Vr);
                        break;
                      }
                      (_ = n.lens[n.have - 1]),
                        (f = 3 + (3 & l)),
                        (l >>>= 2),
                        (d -= 2);
                    } else if (17 === m) {
                      j = g + 3;
                      while (d < j) {
                        if (0 === s) break t;
                        s--, (l += i[a++] << d), (d += 8);
                      }
                      (l >>>= g),
                        (d -= g),
                        (_ = 0),
                        (f = 3 + (7 & l)),
                        (l >>>= 3),
                        (d -= 3);
                    } else {
                      j = g + 7;
                      while (d < j) {
                        if (0 === s) break t;
                        s--, (l += i[a++] << d), (d += 8);
                      }
                      (l >>>= g),
                        (d -= g),
                        (_ = 0),
                        (f = 11 + (127 & l)),
                        (l >>>= 7),
                        (d -= 7);
                    }
                    if (n.have + f > n.nlen + n.ndist) {
                      (t.msg = "invalid bit length repeat"), (n.mode = Vr);
                      break;
                    }
                    while (f--) n.lens[n.have++] = _;
                  }
                }
                if (n.mode === Vr) break;
                if (0 === n.lens[256]) {
                  (t.msg = "invalid code -- missing end-of-block"),
                    (n.mode = Vr);
                  break;
                }
                if (
                  ((n.lenbits = 9),
                  (E = { bits: n.lenbits }),
                  (O = nr(rr, n.lens, 0, n.nlen, n.lencode, 0, n.work, E)),
                  (n.lenbits = E.bits),
                  O)
                ) {
                  (t.msg = "invalid literal/lengths set"), (n.mode = Vr);
                  break;
                }
                if (
                  ((n.distbits = 6),
                  (n.distcode = n.distdyn),
                  (E = { bits: n.distbits }),
                  (O = nr(
                    ar,
                    n.lens,
                    n.nlen,
                    n.ndist,
                    n.distcode,
                    0,
                    n.work,
                    E
                  )),
                  (n.distbits = E.bits),
                  O)
                ) {
                  (t.msg = "invalid distances set"), (n.mode = Vr);
                  break;
                }
                if (((n.mode = Nr), e === cr)) break t;
              case Nr:
                n.mode = Pr;
              case Pr:
                if (s >= 6 && c >= 258) {
                  (t.next_out = o),
                    (t.avail_out = c),
                    (t.next_in = a),
                    (t.avail_in = s),
                    (n.hold = l),
                    (n.bits = d),
                    Wi(t, u),
                    (o = t.next_out),
                    (r = t.output),
                    (c = t.avail_out),
                    (a = t.next_in),
                    (i = t.input),
                    (s = t.avail_in),
                    (l = n.hold),
                    (d = n.bits),
                    n.mode === Ir && (n.back = -1);
                  break;
                }
                for (n.back = 0; ; ) {
                  if (
                    ((A = n.lencode[l & ((1 << n.lenbits) - 1)]),
                    (g = A >>> 24),
                    (v = (A >>> 16) & 255),
                    (m = 65535 & A),
                    g <= d)
                  )
                    break;
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if (v && 0 === (240 & v)) {
                  for (y = g, x = v, w = m; ; ) {
                    if (
                      ((A = n.lencode[w + ((l & ((1 << (y + x)) - 1)) >> y)]),
                      (g = A >>> 24),
                      (v = (A >>> 16) & 255),
                      (m = 65535 & A),
                      y + g <= d)
                    )
                      break;
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (l >>>= y), (d -= y), (n.back += y);
                }
                if (
                  ((l >>>= g), (d -= g), (n.back += g), (n.length = m), 0 === v)
                ) {
                  n.mode = Fr;
                  break;
                }
                if (32 & v) {
                  (n.back = -1), (n.mode = Ir);
                  break;
                }
                if (64 & v) {
                  (t.msg = "invalid literal/length code"), (n.mode = Vr);
                  break;
                }
                (n.extra = 15 & v), (n.mode = zr);
              case zr:
                if (n.extra) {
                  j = n.extra;
                  while (d < j) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (n.length += l & ((1 << n.extra) - 1)),
                    (l >>>= n.extra),
                    (d -= n.extra),
                    (n.back += n.extra);
                }
                (n.was = n.length), (n.mode = Br);
              case Br:
                for (;;) {
                  if (
                    ((A = n.distcode[l & ((1 << n.distbits) - 1)]),
                    (g = A >>> 24),
                    (v = (A >>> 16) & 255),
                    (m = 65535 & A),
                    g <= d)
                  )
                    break;
                  if (0 === s) break t;
                  s--, (l += i[a++] << d), (d += 8);
                }
                if (0 === (240 & v)) {
                  for (y = g, x = v, w = m; ; ) {
                    if (
                      ((A = n.distcode[w + ((l & ((1 << (y + x)) - 1)) >> y)]),
                      (g = A >>> 24),
                      (v = (A >>> 16) & 255),
                      (m = 65535 & A),
                      y + g <= d)
                    )
                      break;
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (l >>>= y), (d -= y), (n.back += y);
                }
                if (((l >>>= g), (d -= g), (n.back += g), 64 & v)) {
                  (t.msg = "invalid distance code"), (n.mode = Vr);
                  break;
                }
                (n.offset = m), (n.extra = 15 & v), (n.mode = Ur);
              case Ur:
                if (n.extra) {
                  j = n.extra;
                  while (d < j) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  (n.offset += l & ((1 << n.extra) - 1)),
                    (l >>>= n.extra),
                    (d -= n.extra),
                    (n.back += n.extra);
                }
                if (n.offset > n.dmax) {
                  (t.msg = "invalid distance too far back"), (n.mode = Vr);
                  break;
                }
                n.mode = Hr;
              case Hr:
                if (0 === c) break t;
                if (((f = u - c), n.offset > f)) {
                  if (((f = n.offset - f), f > n.whave && n.sane)) {
                    (t.msg = "invalid distance too far back"), (n.mode = Vr);
                    break;
                  }
                  f > n.wnext
                    ? ((f -= n.wnext), (p = n.wsize - f))
                    : (p = n.wnext - f),
                    f > n.length && (f = n.length),
                    (b = n.window);
                } else (b = r), (p = o - n.offset), (f = n.length);
                f > c && (f = c), (c -= f), (n.length -= f);
                do {
                  r[o++] = b[p++];
                } while (--f);
                0 === n.length && (n.mode = Pr);
                break;
              case Fr:
                if (0 === c) break t;
                (r[o++] = n.length), c--, (n.mode = Pr);
                break;
              case Kr:
                if (n.wrap) {
                  while (d < 32) {
                    if (0 === s) break t;
                    s--, (l |= i[a++] << d), (d += 8);
                  }
                  if (
                    ((u -= c),
                    (t.total_out += u),
                    (n.total += u),
                    u &&
                      (t.adler = n.check =
                        n.flags
                          ? ke(n.check, r, u, o - u)
                          : we(n.check, r, u, o - u)),
                    (u = c),
                    (n.flags ? l : qr(l)) !== n.check)
                  ) {
                    (t.msg = "incorrect data check"), (n.mode = Vr);
                    break;
                  }
                  (l = 0), (d = 0);
                }
                n.mode = Wr;
              case Wr:
                if (n.wrap && n.flags) {
                  while (d < 32) {
                    if (0 === s) break t;
                    s--, (l += i[a++] << d), (d += 8);
                  }
                  if (l !== (4294967295 & n.total)) {
                    (t.msg = "incorrect length check"), (n.mode = Vr);
                    break;
                  }
                  (l = 0), (d = 0);
                }
                n.mode = Yr;
              case Yr:
                O = dr;
                break t;
              case Vr:
                O = fr;
                break t;
              case Gr:
                return pr;
              case Zr:
              default:
                return ur;
            }
          return (
            (t.next_out = o),
            (t.avail_out = c),
            (t.next_in = a),
            (t.avail_in = s),
            (n.hold = l),
            (n.bits = d),
            (n.wsize ||
              (u !== t.avail_out &&
                n.mode < Vr &&
                (n.mode < Kr || e !== or))) &&
              da(t, t.output, t.next_out, u - t.avail_out),
            (h -= t.avail_in),
            (u -= t.avail_out),
            (t.total_in += h),
            (t.total_out += u),
            (n.total += u),
            n.wrap &&
              u &&
              (t.adler = n.check =
                n.flags
                  ? ke(n.check, r, u, t.next_out - u)
                  : we(n.check, r, u, t.next_out - u)),
            (t.data_type =
              n.bits +
              (n.last ? 64 : 0) +
              (n.mode === Ir ? 128 : 0) +
              (n.mode === Nr || n.mode === Tr ? 256 : 0)),
            ((0 === h && 0 === u) || e === or) && O === lr && (O = br),
            O
          );
        },
        ua = (t) => {
          if (!t || !t.state) return ur;
          let e = t.state;
          return e.window && (e.window = null), (t.state = null), lr;
        },
        fa = (t, e) => {
          if (!t || !t.state) return ur;
          const n = t.state;
          return 0 === (2 & n.wrap) ? ur : ((n.head = e), (e.done = !1), lr);
        },
        pa = (t, e) => {
          const n = e.length;
          let i, r, a;
          return t && t.state
            ? ((i = t.state),
              0 !== i.wrap && i.mode !== jr
                ? ur
                : i.mode === jr &&
                  ((r = 1), (r = we(r, e, n, 0)), r !== i.check)
                ? fr
                : ((a = da(t, e, n, n)),
                  a ? ((i.mode = Gr), pr) : ((i.havedict = 1), lr)))
            : ur;
        };
      var ba = na,
        ga = ia,
        va = ea,
        ma = aa,
        ya = ra,
        xa = ha,
        wa = ua,
        _a = fa,
        Oa = pa,
        Aa = "pako inflate (from Nodeca project)",
        ka = {
          inflateReset: ba,
          inflateReset2: ga,
          inflateResetKeep: va,
          inflateInit: ma,
          inflateInit2: ya,
          inflate: xa,
          inflateEnd: wa,
          inflateGetHeader: _a,
          inflateSetDictionary: Oa,
          inflateInfo: Aa,
        };
      function Ea() {
        (this.text = 0),
          (this.time = 0),
          (this.xflags = 0),
          (this.os = 0),
          (this.extra = null),
          (this.extra_len = 0),
          (this.name = ""),
          (this.comment = ""),
          (this.hcrc = 0),
          (this.done = !1);
      }
      var ja = Ea;
      const Ia = Object.prototype.toString,
        {
          Z_NO_FLUSH: Ca,
          Z_FINISH: Sa,
          Z_OK: Ta,
          Z_STREAM_END: Ma,
          Z_NEED_DICT: Ra,
          Z_STREAM_ERROR: Da,
          Z_DATA_ERROR: La,
          Z_MEM_ERROR: Na,
        } = je;
      function Pa(t) {
        this.options = ui.assign(
          { chunkSize: 65536, windowBits: 15, to: "" },
          t || {}
        );
        const e = this.options;
        e.raw &&
          e.windowBits >= 0 &&
          e.windowBits < 16 &&
          ((e.windowBits = -e.windowBits),
          0 === e.windowBits && (e.windowBits = -15)),
          !(e.windowBits >= 0 && e.windowBits < 16) ||
            (t && t.windowBits) ||
            (e.windowBits += 32),
          e.windowBits > 15 &&
            e.windowBits < 48 &&
            0 === (15 & e.windowBits) &&
            (e.windowBits |= 15),
          (this.err = 0),
          (this.msg = ""),
          (this.ended = !1),
          (this.chunks = []),
          (this.strm = new wi()),
          (this.strm.avail_out = 0);
        let n = ka.inflateInit2(this.strm, e.windowBits);
        if (n !== Ta) throw new Error(Ee[n]);
        if (
          ((this.header = new ja()),
          ka.inflateGetHeader(this.strm, this.header),
          e.dictionary &&
            ("string" === typeof e.dictionary
              ? (e.dictionary = yi.string2buf(e.dictionary))
              : "[object ArrayBuffer]" === Ia.call(e.dictionary) &&
                (e.dictionary = new Uint8Array(e.dictionary)),
            e.raw &&
              ((n = ka.inflateSetDictionary(this.strm, e.dictionary)),
              n !== Ta)))
        )
          throw new Error(Ee[n]);
      }
      function za(t, e) {
        const n = new Pa(e);
        if ((n.push(t), n.err)) throw n.msg || Ee[n.err];
        return n.result;
      }
      function Ba(t, e) {
        return (e = e || {}), (e.raw = !0), za(t, e);
      }
      (Pa.prototype.push = function (t, e) {
        const n = this.strm,
          i = this.options.chunkSize,
          r = this.options.dictionary;
        let a, o, s;
        if (this.ended) return !1;
        for (
          o = e === ~~e ? e : !0 === e ? Sa : Ca,
            "[object ArrayBuffer]" === Ia.call(t)
              ? (n.input = new Uint8Array(t))
              : (n.input = t),
            n.next_in = 0,
            n.avail_in = n.input.length;
          ;

        ) {
          0 === n.avail_out &&
            ((n.output = new Uint8Array(i)),
            (n.next_out = 0),
            (n.avail_out = i)),
            (a = ka.inflate(n, o)),
            a === Ra &&
              r &&
              ((a = ka.inflateSetDictionary(n, r)),
              a === Ta ? (a = ka.inflate(n, o)) : a === La && (a = Ra));
          while (
            n.avail_in > 0 &&
            a === Ma &&
            n.state.wrap > 0 &&
            0 !== t[n.next_in]
          )
            ka.inflateReset(n), (a = ka.inflate(n, o));
          switch (a) {
            case Da:
            case La:
            case Ra:
            case Na:
              return this.onEnd(a), (this.ended = !0), !1;
          }
          if (
            ((s = n.avail_out), n.next_out && (0 === n.avail_out || a === Ma))
          )
            if ("string" === this.options.to) {
              let t = yi.utf8border(n.output, n.next_out),
                e = n.next_out - t,
                r = yi.buf2string(n.output, t);
              (n.next_out = e),
                (n.avail_out = i - e),
                e && n.output.set(n.output.subarray(t, t + e), 0),
                this.onData(r);
            } else
              this.onData(
                n.output.length === n.next_out
                  ? n.output
                  : n.output.subarray(0, n.next_out)
              );
          if (a !== Ta || 0 !== s) {
            if (a === Ma)
              return (
                (a = ka.inflateEnd(this.strm)),
                this.onEnd(a),
                (this.ended = !0),
                !0
              );
            if (0 === n.avail_in) break;
          }
        }
        return !0;
      }),
        (Pa.prototype.onData = function (t) {
          this.chunks.push(t);
        }),
        (Pa.prototype.onEnd = function (t) {
          t === Ta &&
            ("string" === this.options.to
              ? (this.result = this.chunks.join(""))
              : (this.result = ui.flattenChunks(this.chunks))),
            (this.chunks = []),
            (this.err = t),
            (this.msg = this.strm.msg);
        });
      var Ua = Pa,
        Ha = za,
        Fa = Ba,
        Ka = za,
        Wa = je,
        Ya = {
          Inflate: Ua,
          inflate: Ha,
          inflateRaw: Fa,
          ungzip: Ka,
          constants: Wa,
        };
      const { Deflate: Va, deflate: Ga, deflateRaw: Za, gzip: Qa } = Hi,
        { Inflate: Ja, inflate: Xa, inflateRaw: $a, ungzip: qa } = Ya;
      var to = Va,
        eo = Ga,
        no = Za,
        io = Qa,
        ro = Ja,
        ao = Xa,
        oo = $a,
        so = qa,
        co = je,
        lo = {
          Deflate: to,
          deflate: eo,
          deflateRaw: no,
          gzip: io,
          Inflate: ro,
          inflate: ao,
          inflateRaw: oo,
          ungzip: so,
          constants: co,
        },
        ho = n("c2ef"),
        uo = function (t, e, n, i) {
          var r = function (i) {
              if (!t.value) return [];
              for (
                var r = t.value.getAnnotations(),
                  o = Object(a["a"])(r, 3),
                  s = o[0],
                  c = o[1],
                  l = o[2],
                  h = {},
                  u = 0,
                  f = Object.entries(c);
                u < f.length;
                u++
              ) {
                var p = Object(a["a"])(f[u], 2),
                  b = p[0],
                  g = p[1];
                h[b] = [];
                var v,
                  m = Object($["a"])(g);
                try {
                  var y = function () {
                    var t,
                      n,
                      r = v.value,
                      a = i.genMask ? i.genMask(s.resolution, b, r) : {};
                    if (!a) return "continue";
                    if (i.genMask && !a.mask) return "continue";
                    if (
                      null === (t = i.empty) || void 0 === t
                        ? void 0
                        : t.includes(r.alias)
                    )
                      return "continue";
                    var o = l && l[b] ? l[b][r.alias] : "",
                      c =
                        (null ===
                          (n = e.value.find(function (t) {
                            return t.id === o;
                          })) || void 0 === n
                          ? void 0
                          : n.name) || "",
                      u =
                        "brush" === b ? { actions: "" } : Object(d["a"])({}, r);
                    h[b].push(
                      Object(d["a"])(
                        Object(d["a"])(
                          { shape: b, name: c, id: o, label_id: o, meta: u },
                          a
                        ),
                        (null === a || void 0 === a ? void 0 : a.bbox) || {}
                      )
                    );
                  };
                  for (m.s(); !(v = m.n()).done; ) y();
                } catch (An) {
                  m.e(An);
                } finally {
                  m.f();
                }
              }
              var x = Object.values(h).flat(1 / 0);
              return n === et["TemplateType"].SEMANTIC_SEGMENT
                ? x
                : x.filter(function (t) {
                    return t.x2 > t.x1 && t.y2 > t.y1;
                  });
            },
            o = (function () {
              var n = Object(P["a"])(
                regeneratorRuntime.mark(function n() {
                  var i, o, s, c, d, h, u, f, p, b, g;
                  return regeneratorRuntime.wrap(function (n) {
                    while (1)
                      switch ((n.prev = n.next)) {
                        case 0:
                          if (t.value) {
                            n.next = 2;
                            break;
                          }
                          return n.abrupt("return", []);
                        case 2:
                          return (
                            (i = t.value.getAnnotations()),
                            (o = Object(a["a"])(i, 3)),
                            (s = o[0]),
                            (c = o[1]),
                            (d = o[2]),
                            (h = e.value.reduce(function (t, e) {
                              return (t[e.id] = e.segIndex), t;
                            }, {})),
                            (n.next = 6),
                            Object(tt["a"])(s.resolution, c, d, h)
                          );
                        case 6:
                          return (
                            (u = n.sent),
                            (f = lo.deflate(u.brush)),
                            (p = lo.deflate(u.all)),
                            (b = window.btoa(
                              String.fromCharCode.apply(
                                String,
                                Object(l["a"])(f)
                              )
                            )),
                            (g = window.btoa(
                              String.fromCharCode.apply(
                                String,
                                Object(l["a"])(p)
                              )
                            )),
                            n.abrupt("return", [
                              {
                                labels: r({ empty: u.empty }),
                                mask: { brush: b, all: g },
                              },
                            ])
                          );
                        case 12:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              );
              return function () {
                return n.apply(this, arguments);
              };
            })(),
            s = (function () {
              var t = Object(P["a"])(
                regeneratorRuntime.mark(function t() {
                  return regeneratorRuntime.wrap(function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (i.value) {
                            t.next = 2;
                            break;
                          }
                          return t.abrupt("return", []);
                        case 2:
                          if (n !== et["TemplateType"].SEMANTIC_SEGMENT) {
                            t.next = 8;
                            break;
                          }
                          return (t.next = 5), o();
                        case 5:
                          return t.abrupt("return", t.sent);
                        case 8:
                          return (t.next = 10), r({ genMask: tt["b"] });
                        case 10:
                          return t.abrupt("return", t.sent);
                        case 11:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              );
              return function () {
                return t.apply(this, arguments);
              };
            })();
          return s;
        },
        fo = function (t, e) {
          return e.reduce(function (e, n) {
            return (e["".concat(t, "-").concat(n.segIndex)] = n.id), e;
          }, {});
        },
        po = function (t, e) {
          var n = Object(q["useToast"])(),
            i = n.fail,
            r = (function () {
              var n = Object(P["a"])(
                regeneratorRuntime.mark(function n(r, o, s) {
                  var c, l, h, u, f, p, b, g, v, m, y, x, w;
                  return regeneratorRuntime.wrap(
                    function (n) {
                      while (1)
                        switch ((n.prev = n.next)) {
                          case 0:
                            if (t.value) {
                              n.next = 2;
                              break;
                            }
                            return n.abrupt("return");
                          case 2:
                            (c = t.value.getAnnotations()),
                              (l = Object(a["a"])(c, 1)),
                              (h = l[0]),
                              (u = t.value.contextManager.context.resource.src),
                              (f = {
                                polygon: {},
                                brush: {},
                                line: {},
                                circle: {},
                              }),
                              (p = {
                                polygon: [],
                                brush: [],
                                line: [],
                                circle: [],
                              }),
                              (b = function (t) {
                                var n,
                                  i,
                                  a,
                                  o,
                                  s,
                                  c,
                                  l = r[t];
                                if (!l.meta && !l.mask) return "continue";
                                var u = {},
                                  b = {
                                    x1:
                                      null !== (n = l.x1) && void 0 !== n
                                        ? n
                                        : 0,
                                    y1:
                                      null !== (i = l.y1) && void 0 !== i
                                        ? i
                                        : 0,
                                    x2:
                                      null !== (a = l.x2) && void 0 !== a
                                        ? a
                                        : h.resolution.width,
                                    y2:
                                      null !== (o = l.y2) && void 0 !== o
                                        ? o
                                        : h.resolution.height,
                                  },
                                  g = l.shape || "brush";
                                (u =
                                  "brush" === g
                                    ? Object(d["a"])(
                                        Object(d["a"])(
                                          {},
                                          b ? { bbox: b } : {}
                                        ),
                                        {},
                                        {
                                          alias: "alias-"
                                            .concat(g, "-")
                                            .concat(t + 1),
                                          mask: l.mask,
                                        }
                                      )
                                    : Object(d["a"])(
                                        Object(d["a"])(
                                          Object(d["a"])({}, l.meta),
                                          b ? { bbox: b } : {}
                                        ),
                                        {},
                                        {
                                          alias: "alias-"
                                            .concat(g, "-")
                                            .concat(t + 1),
                                          width: 5,
                                        }
                                      )),
                                  p[g].push(u),
                                  (f[g][u.alias] =
                                    l.label_id ||
                                    (null === (s = l.category) || void 0 === s
                                      ? void 0
                                      : s.id) ||
                                    (null ===
                                      (c = e.value.find(function (t) {
                                        return t.name === l.name;
                                      })) || void 0 === c
                                      ? void 0
                                      : c.id));
                              }),
                              (g = 0);
                          case 8:
                            if (!(g < r.length)) {
                              n.next = 15;
                              break;
                            }
                            if (((v = b(g)), "continue" !== v)) {
                              n.next = 12;
                              break;
                            }
                            return n.abrupt("continue", 12);
                          case 12:
                            g++, (n.next = 8);
                            break;
                          case 15:
                            if (((n.prev = 15), !o)) {
                              n.next = 22;
                              break;
                            }
                            return (
                              (n.next = 19),
                              Object(ho["c"])(o, "arraybuffer").result
                            );
                          case 19:
                            (n.t0 = n.sent), (n.next = 23);
                            break;
                          case 22:
                            n.t0 = s ? Object(ho["a"])(s) : "";
                          case 23:
                            if (
                              ((m = n.t0),
                              (y = t.value.contextManager.context.resource.src),
                              y === u)
                            ) {
                              n.next = 27;
                              break;
                            }
                            return n.abrupt("return");
                          case 27:
                            m &&
                              (m.byteLength
                                ? ((x = new Uint8Array(m)),
                                  (w = "alias-mask"),
                                  (p["brush"] = [
                                    { bits: lo.inflate(x), aliasPrefix: w },
                                  ]),
                                  (f["brush"] = e.value.length
                                    ? fo(w, e.value)
                                    : fo(w, r)))
                                : (p["brush"] = [])),
                              t.value.setLabelMap(f),
                              t.value.restore(p),
                              (n.next = 35);
                            break;
                          case 32:
                            (n.prev = 32),
                              (n.t1 = n["catch"](15)),
                              i("标注信息加载失败");
                          case 35:
                          case "end":
                            return n.stop();
                        }
                    },
                    n,
                    null,
                    [[15, 32]]
                  );
                })
              );
              return function (t, e, i) {
                return n.apply(this, arguments);
              };
            })();
          return r;
        },
        bo = function (t) {
          var e = Object(o["reactive"])({ show: !1 }),
            n = Object(o["reactive"])({
              showCancel: Object(o["computed"])(function () {
                var e;
                return (
                  "contextmenu" ===
                  (null === (e = t.value) || void 0 === e
                    ? void 0
                    : e.actionKind)
                );
              }),
              position: Object(o["computed"])(function () {
                var e,
                  n,
                  i = document.querySelector(".g-image"),
                  r =
                    (null === i || void 0 === i
                      ? void 0
                      : i.getBoundingClientRect()) || {},
                  a = r.left,
                  o = void 0 === a ? 0 : a,
                  s = r.top,
                  c = void 0 === s ? 0 : s,
                  l = document.documentElement,
                  d = l.scrollTop,
                  h = l.scrollLeft;
                return {
                  x:
                    h +
                      o +
                      (null === (e = t.value) || void 0 === e
                        ? void 0
                        : e.geo.bbox.x2) +
                      6 || 0,
                  y:
                    d +
                      c +
                      (null === (n = t.value) || void 0 === n
                        ? void 0
                        : n.geo.bbox.y1) || 0,
                };
              }),
              annotations: Object(o["computed"])(function () {
                return t.value
                  ? [{ alias: t.value.alias, id: t.value.labelId }]
                  : [];
              }),
            });
          return (
            Object(o["watch"])(t, function (t) {
              e.show = !!t && (!t.labelId || "contextmenu" === t.actionKind);
            }),
            { state: e, cstate: n }
          );
        },
        go = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.show,
                  expression: "show",
                },
              ],
              staticClass: "brush-plugins",
            },
            [
              n("div", { staticClass: "pointer-brush", style: t.pointerStyle }),
              n("div", { staticClass: "brush-controller" }, [
                n("p", { staticClass: "bold" }, [
                  t._v(t._s(t.$t(t.tool + "-size"))),
                ]),
                n("div", { staticClass: "brush-controller_slider" }, [
                  n("span", { staticClass: "brush-controller_txt" }, [
                    t._v("-"),
                  ]),
                  "brush" === t.tool
                    ? n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.localBrushWidth,
                            expression: "localBrushWidth",
                          },
                        ],
                        attrs: {
                          type: "range",
                          min: "1",
                          max: "50",
                          step: "1",
                        },
                        domProps: { value: t.localBrushWidth },
                        on: {
                          __r: function (e) {
                            t.localBrushWidth = e.target.value;
                          },
                        },
                      })
                    : "eraser" === t.tool
                    ? n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.localEraserWidth,
                            expression: "localEraserWidth",
                          },
                        ],
                        attrs: {
                          type: "range",
                          min: "1",
                          max: "50",
                          step: "1",
                        },
                        domProps: { value: t.localEraserWidth },
                        on: {
                          __r: function (e) {
                            t.localEraserWidth = e.target.value;
                          },
                        },
                      })
                    : t._e(),
                  n("span", { staticClass: "brush-controller_txt" }, [
                    t._v("+"),
                  ]),
                ]),
              ]),
            ]
          );
        },
        vo = [],
        mo = Object(o["defineComponent"])({
          props: {
            tool: { type: String, default: "brush" },
            brushWidth: { type: Number, required: !0 },
            eraserWidth: { type: Number, required: !0 },
            mouse: {
              type: Object,
              default: function () {
                return { x: 0, y: 0 };
              },
            },
          },
          setup: function (t, e) {
            var n = e.emit,
              i = Object(o["computed"])(function () {
                return ["brush", "eraser"].includes(t.tool);
              }),
              r = Object(o["computed"])({
                set: function (t) {
                  n("update:brushWidth", Number(t));
                },
                get: function () {
                  return t.brushWidth;
                },
              }),
              a = Object(o["computed"])({
                set: function (t) {
                  n("update:eraserWidth", Number(t));
                },
                get: function () {
                  return t.eraserWidth;
                },
              }),
              s = Object(o["computed"])(function () {
                if (!i.value) return {};
                var e = t.mouse,
                  n = 2 * ("brush" === t.tool ? r.value : a.value);
                return {
                  width: "".concat(n, "px"),
                  height: "".concat(n, "px"),
                  transform: "translate("
                    .concat(e.x - n / 2, "px, ")
                    .concat(e.y - n / 2, "px)"),
                };
              });
            return {
              show: i,
              localBrushWidth: r,
              localEraserWidth: a,
              pointerStyle: s,
            };
          },
        }),
        yo = mo,
        xo = (n("e044"), n("b6ba")),
        wo = Object(D["a"])(yo, go, vo, !1, null, "56a832d4", null);
      "function" === typeof xo["default"] && Object(xo["default"])(wo);
      var _o,
        Oo = wo.exports,
        Ao = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.opObj.opVisible,
                  expression: "opObj.opVisible",
                },
              ],
              staticClass: "dot-predictor-op",
              class: { "btn-visible": t.opObj.opBtnVisible },
              style: t.opObj.opStyle,
            },
            [
              t.opObj.opBtnVisible
                ? n(
                    "div",
                    { staticClass: "dot-predictor-btns" },
                    [
                      n(
                        "the-button",
                        {
                          staticClass: "confirm-btn",
                          on: {
                            click: function (e) {
                              return e.stopPropagation(), t.$emit("confirm");
                            },
                          },
                        },
                        [n("the-icon", { attrs: { name: "check" } })],
                        1
                      ),
                      n(
                        "the-button",
                        {
                          staticClass: "confirm-btn",
                          on: {
                            click: function (e) {
                              return t.$emit("cancel");
                            },
                          },
                        },
                        [n("the-icon", { attrs: { name: "times" } })],
                        1
                      ),
                    ],
                    1
                  )
                : t._e(),
              t.cstate.leftClickVisible
                ? n(
                    "AnnotatorTip",
                    { staticClass: "dot-predictor-tips" },
                    [
                      n(
                        "template",
                        { slot: "body" },
                        [
                          t._v(" 左击增加“识别区域” "),
                          n(
                            "the-link",
                            { on: { click: t.noMoreLeftClickTip } },
                            [t._v("不再提示")]
                          ),
                        ],
                        1
                      ),
                    ],
                    2
                  )
                : t._e(),
              t.cstate.rightClickVisible
                ? n(
                    "AnnotatorTip",
                    { staticClass: "dot-predictor-tips" },
                    [
                      n(
                        "template",
                        { slot: "body" },
                        [
                          t._v(" 右击可减去 “误识别区域” "),
                          n(
                            "the-link",
                            { on: { click: t.noMoreRightClickTip } },
                            [t._v("不再提示")]
                          ),
                        ],
                        1
                      ),
                    ],
                    2
                  )
                : t._e(),
            ],
            1
          );
        },
        ko = [],
        Eo = n("ade3"),
        jo = n("d574"),
        Io = n("0195");
      (function (t) {
        (t["DOT_PREDICT_LEFT_CLICK"] = "leftClickVisible"),
          (t["DOT_PREDICT_RIGHT_CLICK"] = "rightClickVisible");
      })(_o || (_o = {}));
      var Co = "DOT_PREDICT_LEFT_CLICK",
        So = "DOT_PREDICT_RIGHT_CLICK",
        To = Object(o["defineComponent"])({
          components: { AnnotatorTip: Io["a"] },
          setup: function () {
            var t,
              e,
              n,
              i =
                null === (t = Object(o["getCurrentInstance"])()) || void 0 === t
                  ? void 0
                  : t.proxy,
              r = Object(B["d"])(),
              a = Object(o["reactive"])(
                ((e = {}),
                Object(Eo["a"])(
                  e,
                  _o.DOT_PREDICT_LEFT_CLICK,
                  Object(o["ref"])(!Object(jo["a"])(Co))
                ),
                Object(Eo["a"])(
                  e,
                  _o.DOT_PREDICT_RIGHT_CLICK,
                  Object(o["ref"])(!Object(jo["a"])(So))
                ),
                e)
              ),
              s = Object(o["reactive"])({
                opVisible: Object(o["computed"])(function () {
                  return (
                    r.state.resBbox && "rect-dot-predictor" === r.state.toolName
                  );
                }),
                opBtnVisible: Object(o["computed"])(function () {
                  return (
                    r.state.dotList.length &&
                    r.state.status === B["b"].PREDICTED
                  );
                }),
                opStyle: Object(o["computed"])(function () {
                  if (!r.state.resBbox) return null;
                  var t = r.state.resBbox,
                    e = t.topLeft,
                    n = t.bottomRight,
                    i = document.querySelector(".g-image"),
                    a =
                      (null === i || void 0 === i
                        ? void 0
                        : i.getBoundingClientRect()) || {},
                    o = a.left,
                    s = void 0 === o ? 0 : o,
                    c = a.top,
                    l = void 0 === c ? 0 : c,
                    d = document.documentElement,
                    h = d.scrollLeft,
                    u = d.scrollTop,
                    f = (h + s + n.x || 0) + 6,
                    p = u + l + e.y || 0;
                  return {
                    top: "".concat(p, "px"),
                    left: "".concat(f, "px"),
                    height: "".concat(n.y - e.y, "px"),
                  };
                }),
              }),
              c = Object(o["reactive"])(
                ((n = {}),
                Object(Eo["a"])(
                  n,
                  _o.DOT_PREDICT_LEFT_CLICK,
                  Object(o["computed"])(function () {
                    return (
                      a[_o.DOT_PREDICT_LEFT_CLICK] &&
                      s.opVisible &&
                      !r.state.dotList.length
                    );
                  })
                ),
                Object(Eo["a"])(
                  n,
                  _o.DOT_PREDICT_RIGHT_CLICK,
                  Object(o["computed"])(function () {
                    return (
                      a[_o.DOT_PREDICT_RIGHT_CLICK] &&
                      s.opVisible &&
                      r.state.dotList.length
                    );
                  })
                ),
                n)
              );
            return (
              Object(o["onMounted"])(function () {
                (null === i || void 0 === i ? void 0 : i.$el) &&
                  document.body.appendChild(i.$el);
              }),
              Object(o["onUnmounted"])(function () {
                var t;
                (null === i ||
                void 0 === i ||
                null === (t = i.$el) ||
                void 0 === t
                  ? void 0
                  : t.parentNode) && i.$el.parentNode.removeChild(i.$el);
              }),
              {
                cstate: c,
                state: a,
                opObj: s,
                noMoreLeftClickTip: function () {
                  Object(jo["b"])(Co), (a[_o.DOT_PREDICT_LEFT_CLICK] = !1);
                },
                noMoreRightClickTip: function () {
                  Object(jo["b"])(So), (a[_o.DOT_PREDICT_RIGHT_CLICK] = !1);
                },
              }
            );
          },
        }),
        Mo = To,
        Ro =
          (n("497a"), Object(D["a"])(Mo, Ao, ko, !1, null, "e4021b66", null)),
        Do = Ro.exports,
        Lo = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.loadingVisible || t.predictDisabled
            ? n("div", { staticClass: "dot-predict-loading" }, [
                t.loadingVisible
                  ? n("div", {
                      staticClass: "predict-loading",
                      style: t.loadingStyle,
                    })
                  : t._e(),
                t.predictDisabled
                  ? n("div", { staticClass: "predict-disabled" })
                  : t._e(),
              ])
            : t._e();
        },
        No = [],
        Po = Object(o["defineComponent"])({
          props: { predictDisabled: { type: Boolean, default: !1 } },
          setup: function () {
            var t = Object(B["d"])(),
              e = Object(o["computed"])(function () {
                if (!t.state.resBbox || "dot-predictor" === t.state.toolName)
                  return null;
                var e = t.state.resBbox,
                  n = e.topLeft,
                  i = e.bottomRight;
                return {
                  top: "".concat(n.y, "px"),
                  left: "".concat(n.x, "px"),
                  height: "".concat(i.y - n.y, "px"),
                  width: "".concat(i.x - n.x, "px"),
                };
              });
            return {
              loadingVisible: Object(o["computed"])(function () {
                return t.state.status === B["b"].PREDICTING;
              }),
              loadingStyle: e,
            };
          },
        }),
        zo = Po,
        Bo =
          (n("a854"), Object(D["a"])(zo, Lo, No, !1, null, "270725c0", null)),
        Uo = Bo.exports,
        Ho = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.lockLabel
            ? n("div", { staticClass: "lock-tip", style: t.style }, [
                t._v(" " + t._s(t.lockLabel.name) + " "),
              ])
            : t._e();
        },
        Fo = [],
        Ko = Object(o["defineComponent"])({
          props: {
            label: { type: Object, default: void 0 },
            mouse: {
              type: Object,
              default: function () {
                return { x: 0, y: 0 };
              },
            },
          },
          setup: function (t) {
            var e = Object(o["computed"])(function () {
                var e;
                return (
                  null === (e = t.label) || void 0 === e ? void 0 : e.locked
                )
                  ? t.label
                  : void 0;
              }),
              n = Object(o["computed"])(function () {
                if (!e.value) return {};
                var n = t.mouse,
                  i = e.value.color,
                  r = void 0 === i ? "#1a73e8" : i;
                return {
                  transform: "translate("
                    .concat(n.x + 10, "px, ")
                    .concat(n.y + 10, "px)"),
                  backgroundColor: Object(F["b"])(r, 0.6),
                  borderColor: r,
                };
              });
            return { lockLabel: e, style: n };
          },
        }),
        Wo = Ko,
        Yo =
          (n("4fb5"), Object(D["a"])(Wo, Ho, Fo, !1, null, "4dce468f", null)),
        Vo = Yo.exports,
        Go = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.show,
                expression: "show",
              },
            ],
            staticClass: "delete-btn",
            style: t.stype,
            attrs: { title: "删除标注框" },
            on: {
              click: function (e) {
                return t.$emit("delete", t.activeShape.alias);
              },
            },
          });
        },
        Zo = [],
        Qo = Object(o["defineComponent"])({
          props: { activeShape: { type: Object } },
          setup: function (t) {
            var e = Object(o["computed"])(function () {
                var e = t.activeShape;
                return (
                  !!e &&
                  (!(!e.labelId || "contextmenu" === e.actionKind) || void 0)
                );
              }),
              n = Object(o["computed"])(function () {
                var e = t.activeShape;
                if (!e) return {};
                var n = e.geo.recommend || e.geo.center,
                  i = n.x,
                  r = n.y;
                return {
                  transform: "translate(".concat(i, "px, ").concat(r, "px)"),
                };
              });
            return { show: e, stype: n };
          },
        }),
        Jo = Qo,
        Xo =
          (n("1d17"), Object(D["a"])(Jo, Go, Zo, !1, null, "2bd382b5", null)),
        $o = Xo.exports,
        qo = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.visible && t.show
            ? n(
                "AnnotatorTip",
                { staticClass: "contextmenu-tip", style: t.style },
                [
                  n(
                    "template",
                    { slot: "body" },
                    [
                      t._v(" 在标注框内右击，可“修改”/“取消”标签。 "),
                      n("the-link", { on: { click: t.handleCancelClick } }, [
                        t._v("不再提示"),
                      ]),
                    ],
                    1
                  ),
                ],
                2
              )
            : t._e();
        },
        ts = [],
        es = n("95c1"),
        ns = "CONTEXTMENU_TIP",
        is = Object(o["defineComponent"])({
          components: { AnnotatorTip: Io["a"] },
          props: {
            label: { type: Object, default: void 0 },
            activeShape: { type: Object },
            position: { type: Object },
          },
          setup: function (t) {
            var e = Object(o["ref"])(!0),
              n = Object(o["computed"])(function () {
                return e.value && !Object(jo["a"])(ns);
              }),
              i = Object(o["computed"])(function () {
                var e;
                return (
                  !!t.activeShape &&
                  ("label" === t.activeShape.actionKind ||
                    ("contextmenu" !== t.activeShape.actionKind &&
                      (null === (e = t.label) || void 0 === e
                        ? void 0
                        : e.locked) &&
                      t.activeShape.labelId))
                );
              }),
              r = Object(o["computed"])(function () {
                return Object(es["a"])(t.position);
              }),
              a = function () {
                (e.value = !1), Object(jo["b"])(ns);
              };
            return { visible: n, show: i, style: r, handleCancelClick: a };
          },
        }),
        rs = is,
        as = Object(D["a"])(rs, qo, ts, !1, null, null, null),
        os = as.exports,
        ss = n("71f0"),
        cs = n("bb89"),
        ls = Object(o["defineComponent"])({
          components: {
            VisAnnotator: N,
            BrushPlugins: Oo,
            DotPredictorOp: Do,
            DotPredictLoading: Uo,
            LockLabelTip: Vo,
            DeleteBtn: $o,
            LabelModal: function () {
              return System.import("@baidu/afe-app-dataset").then(function (t) {
                return t.LabelModal;
              });
            },
            ContextMenuTip: os,
            FloatingTxt: ss["a"],
            InvalidTip: cs["a"],
          },
          props: {
            src: { type: String, required: !0 },
            tool: { type: String, default: "" },
            tools: {
              type: Array,
              default: function () {
                return [];
              },
            },
            labels: {
              type: Array,
              default: function () {
                return [];
              },
            },
            label: { type: Object, default: void 0 },
            isInvalid: { type: Boolean, default: !1 },
            readonly: { type: Boolean, default: !1 },
            loaded: { type: Boolean, default: !0 },
            labelVisibility: { type: String, default: "hover" },
            templateType: { required: !0, type: Number },
            labelModalShow: { type: Boolean, default: !1 },
            showLabel: { type: Boolean, default: !1 },
            deleteBtnShow: { type: Boolean, default: !1 },
            contextmenuTipShow: { type: Boolean, default: !1 },
            predictStatus: { type: String, default: "" },
            predictDisabled: { type: Boolean, default: !1 },
            config: {
              type: Object,
              default: function () {
                return {};
              },
            },
            labelUrl: {
              type: Object,
              default: function () {
                return {};
              },
            },
            mask: {
              type: Object,
              default: function () {
                return {};
              },
            },
          },
          setup: function (t, e) {
            var n = e.emit,
              i = Object(o["toRefs"])(t),
              r = k(),
              s = r.builtinPlugins,
              c = r.annotatorControl,
              l = r.resource,
              d = H(c, l, i.readonly),
              h = d.wrapperRef,
              u = d.state,
              f = d.syncMouse,
              p = d.syncClickMouse,
              b = d.handleShapeCreating,
              g = d.handleShapeAborted,
              v = Y(
                c,
                { label: i.label, annotations: i.labels },
                i.readonly,
                s.activeShape
              ),
              m = v.cstate,
              y = v.deleteAnnotationsOfAlias,
              x = v.handleDeleteAnnotations,
              w = v.deleteAnnotationsOfLabel,
              _ = X(
                c,
                { zoomer: s.zoomer, history: s.history },
                { tool: i.tool, src: i.src }
              ),
              O = _.state,
              A = _.activateTool,
              E = _.updateTool,
              j = _.handlePredictConfirm,
              I = _.handlePredictCancel,
              C = Object(o["ref"])(!1),
              S = uo(c, Object(o["toRef"])(m, "labels"), t.templateType, C),
              T = po(c, Object(o["toRef"])(m, "labels")),
              M = bo(s.activeShape),
              R = M.state,
              D = M.cstate;
            Object(o["watch"])(
              function () {
                return t.src;
              },
              function () {
                (C.value = !1), (s.zoomer.moveable.value = !1);
              }
            );
            var L = function () {
                var e;
                A(t.tool),
                  T(
                    t.labels,
                    (null === (e = t.labelUrl) || void 0 === e
                      ? void 0
                      : e.brush) || "",
                    t.mask.brush
                  ),
                  (C.value = !0),
                  n("initialized");
              },
              N = function () {
                var t;
                if (c.value) {
                  var e =
                      null === (t = c.value) || void 0 === t
                        ? void 0
                        : t.getAnnotations(),
                    i = Object(a["a"])(e, 3),
                    r = i[1],
                    o = i[2],
                    s = Object.entries(r).reduce(function (t, e) {
                      var n = Object(a["a"])(e, 2),
                        i = n[0],
                        r = n[1];
                      return (
                        (t[i] = r
                          .map(function (t) {
                            var e;
                            return {
                              name:
                                (null ===
                                  (e = m.labels.find(function (e) {
                                    var n;
                                    return (
                                      e.id ===
                                      (null === o ||
                                      void 0 === o ||
                                      null === (n = o[i]) ||
                                      void 0 === n
                                        ? void 0
                                        : n[t.alias])
                                    );
                                  })) || void 0 === e
                                  ? void 0
                                  : e.name) || "",
                            };
                          })
                          .filter(function (t) {
                            return t.name;
                          })),
                        t
                      );
                    }, {});
                  n("visAnnotator:change", Object.values(s).flat(1));
                }
              };
            return (
              Object(o["watch"])(
                [
                  function () {
                    return t.labels;
                  },
                  function () {
                    return t.labelUrl;
                  },
                  function () {
                    return t.mask;
                  },
                ],
                function () {
                  var e;
                  C.value &&
                    T(
                      t.labels,
                      (null === (e = t.labelUrl) || void 0 === e
                        ? void 0
                        : e.brush) || "",
                      t.mask.brush
                    );
                },
                { flush: "post" }
              ),
              {
                wrapperRef: h,
                annotatorState: u,
                toolState: O,
                updateTool: E,
                handlePredictConfirm: j,
                handlePredictCancel: I,
                labelCState: m,
                deleteAnnotationsOfAlias: y,
                handleDeleteAnnotations: x,
                activeShape: s.activeShape,
                builtinPlugins: { install: s.install },
                serialize: S,
                handleReady: L,
                handleChange: N,
                syncMouse: f,
                syncClickMouse: p,
                handleShapeCreating: b,
                handleShapeAborted: g,
                labelModalCState: D,
                labelModalState: R,
                deleteAnnotationsOfLabel: w,
              }
            );
          },
        }),
        ds = ls,
        hs = (n("3c12"), Object(D["a"])(ds, i, r, !1, null, "c009cab8", null)),
        us = hs.exports;
    },
    a2bf: function (t, e, n) {
      "use strict";
      var i = n("e8b5"),
        r = n("50c4"),
        a = n("0366"),
        o = function (t, e, n, s, c, l, d, h) {
          var u,
            f = c,
            p = 0,
            b = !!d && a(d, h, 3);
          while (p < s) {
            if (p in n) {
              if (((u = b ? b(n[p], p, e) : n[p]), l > 0 && i(u)))
                f = o(t, e, u, r(u.length), f, l - 1) - 1;
              else {
                if (f >= 9007199254740991)
                  throw TypeError("Exceed the acceptable array length");
                t[f] = u;
              }
              f++;
            }
            p++;
          }
          return f;
        };
      t.exports = o;
    },
    a2d3: function (t, e, n) {
      t.exports = n.p + "img/move.79759700.cur";
    },
    a2f1: function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          '.invalid-mask[data-v-74bffb9c]{bottom:0;right:0}.invalid-mask[data-v-74bffb9c],.invalid-tip[data-v-74bffb9c]{position:absolute;left:0;top:0}.invalid-tip[data-v-74bffb9c]{width:160px;height:160px;background-color:rgba(0,0,0,.4);color:#fff;font-size:32px;line-height:1;padding:40px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:40px}.invalid-tip[data-v-74bffb9c]:after,.invalid-tip[data-v-74bffb9c]:before{position:absolute;content:" ";width:40px;height:20px;bottom:-80px;overflow:hidden}.invalid-tip[data-v-74bffb9c]:before{left:0;border-left:0;border-right:80px solid transparent}.invalid-tip[data-v-74bffb9c]:after,.invalid-tip[data-v-74bffb9c]:before{border-top:40px solid rgba(0,0,0,.4);border-bottom:40px solid transparent}.invalid-tip[data-v-74bffb9c]:after{right:0;border-left:80px solid transparent;border-right:0}',
          "",
        ]),
        (t.exports = e);
    },
    a417: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return u;
      });
      var i = n("1344"),
        r = n("6166"),
        a = n("acc5"),
        o = n("49d5"),
        s = n("69af"),
        c = n("0ffa");
      const l = ["drag", "rightDrag"],
        d = { kind: "label", value: "" };
      class h {
        constructor(t, e) {
          (this.annotator = t),
            (this.contextManager = e),
            (this.events = Object(i["a"])()),
            (this.reset = (t) => {
              var e;
              t !==
                (null === (e = this.current) || void 0 === e
                  ? void 0
                  : e.tool.name) &&
                ((this.current = void 0), this.events.emit("active", void 0));
            }),
            (this.broadcast = Object(s["a"])(() => {
              if (!this.current) return;
              const { tool: t, action: e, shape: n } = this.current;
              this.events.emit("active", {
                tool: t.name,
                alias: n.alias,
                actionKind: e.kind,
                labelId: this.getLabelId(t, n.alias),
                geo: this.getGeo(t, n),
                mouse: this.getMouseLocation(e),
              });
            }, 100)),
            (this.watchChange = (t) => {
              this.syncShape(t.tool, d);
            }),
            (this.stopIntercept = t.interceptor.register("response", (t) => {
              const { action: e, tool: n, process: i } = t;
              if ("hover" === e.kind) return t;
              i();
              const r = { action: e, tool: n, process: o["b"] };
              return this.syncShape(n, e), r;
            })),
            e.context.events.on("TOOL_CHANGED", this.reset),
            e.context.events.on("RESTORED", this.reset),
            e.context.events.on("INITIALIZED", this.reset),
            e.context.events.on("CHANGE", this.watchChange),
            this.reset("");
        }
        teardown() {
          this.stopIntercept && this.stopIntercept(),
            (this.current = void 0),
            this.events.all.clear(),
            this.contextManager.context.events.off("TOOL_CHANGED", this.reset),
            this.contextManager.context.events.off("RESTORED", this.reset),
            this.contextManager.context.events.off("INITIALIZED", this.reset),
            this.contextManager.context.events.off("CHANGE", this.watchChange);
        }
        syncShape(t, e) {
          if (l.includes(e.kind))
            return void this.events.emit("active", void 0);
          const n = t.getEditingShape ? t.getEditingShape() : void 0;
          if (!t.name || !n)
            return (
              (this.current = void 0), void this.events.emit("active", void 0)
            );
          this.events.emit("active", void 0),
            (this.current = {
              tool: t,
              action: e,
              shape: n,
              actionKind: e.kind,
            }),
            this.broadcast();
        }
        getMouseLocation(t) {
          switch (t.kind) {
            case "click":
            case "dblclick":
            case "hover":
            case "contextmenu":
              return t.point;
            case "drag":
            case "dragEnd":
            case "rightDrag":
            case "rightDragEnd":
              return t.current;
          }
        }
        getLabelId(t, e) {
          const n = t.srcTool ? t.srcTool.name : t.name,
            i = this.contextManager.context.labelMap[n];
          return i ? i[e] : "";
        }
        getGeo(t, e) {
          const { res: n, dom: i } = this.contextManager.context.facts.coord,
            o = (t) => Object(r["e"])(t, n, i),
            s = (t) => Object(r["f"])(t, n, i),
            l = (t) => {
              const e = o({ x: t.x1, y: t.y1 }),
                n = o({ x: t.x2, y: t.y2 });
              return { x1: e.x, x2: n.x, y1: e.y, y2: n.y };
            };
          switch (t.name) {
            case "circle":
            case "point": {
              const t = o(e.center),
                n = s(e.radius);
              return {
                bbox: l(Object(c["b"])([e.center], e.radius)),
                radius: n,
                center: t,
                points: [t],
                recommend: Object(r["g"])(t, { x: 0.707 * n, y: -0.707 * n }),
              };
            }
            case "cuboid": {
              const t = Object(a["a"])(e.faces);
              return {
                bbox: l(Object(c["e"])(t)),
                radius: 1,
                center: o(e.center),
                points: t,
                recommend: o(e.faces.front[0]),
              };
            }
            case "line":
            case "polygon":
            case "polyline":
            case "quad":
            case "rect": {
              const t = e.points.map(o);
              return {
                bbox: l(Object(c["e"])(e.points)),
                radius: 1,
                center: o(e.center),
                points: t,
                recommend: t[0],
              };
            }
            case "brush": {
              const t = e.actions[0],
                n = t.points ? t.points.map(o) : [],
                i = s(t.radius || 0),
                a =
                  n.length > 1
                    ? {
                        x: n[1].x - n[0].x > 0 ? -1 : 1,
                        y: n[1].y - n[0].y > 0 ? -1 : 1,
                      }
                    : { x: 1, y: 1 },
                c = o(e.center);
              return {
                bbox: l(e.bbox),
                radius: i,
                center: c,
                points: n,
                recommend: n[0]
                  ? Object(r["g"])(n[0], { x: a.x * i, y: a.y * i })
                  : c,
              };
            }
            case "dot-predictor": {
              const t = o(e.center);
              return {
                bbox: l(e.bbox),
                radius: 0,
                center: t,
                points: [],
                recommend: t,
              };
            }
          }
          return {};
        }
      }
      const u = () => ({
        id: "shape-tracker",
        setup({ annotator: t, contextManager: e }) {
          const n = new h(t, e);
          return n;
        },
      });
    },
    a4c5: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "a", function () {
          return r;
        });
      const i = (t, e = {}) => ({
          type: "label",
          labelId: e.labelId,
          data: { position: t.center, useShapeBg: e.useShapeBg },
        }),
        r = (t, e, n) => ({
          type: "circle",
          class: n,
          normalized: !0,
          data: { center: t, radius: e },
        });
    },
    a626: function (t, e) {
      function n(t, e, n) {
        var i = [],
          r = [];
        return (
          t.forEach(function (t) {
            var a = t.start,
              o = t.end;
            if (e.pointsSame(a, o))
              console.warn(
                "PolyBool: Warning: Zero-length segment detected; your epsilon is probably too small or too large"
              );
            else {
              n && n.chainStart(t);
              for (
                var s = { index: 0, matches_head: !1, matches_pt1: !1 },
                  c = { index: 0, matches_head: !1, matches_pt1: !1 },
                  l = s,
                  d = 0;
                d < i.length;
                d++
              ) {
                var h = i[d],
                  u = h[0],
                  f = (h[1], h[h.length - 1]);
                h[h.length - 2];
                if (e.pointsSame(u, a)) {
                  if (A(d, !0, !0)) break;
                } else if (e.pointsSame(u, o)) {
                  if (A(d, !0, !1)) break;
                } else if (e.pointsSame(f, a)) {
                  if (A(d, !1, !0)) break;
                } else if (e.pointsSame(f, o) && A(d, !1, !1)) break;
              }
              if (l === s) return i.push([a, o]), void (n && n.chainNew(a, o));
              if (l === c) {
                n && n.chainMatch(s.index);
                var p = s.index,
                  b = s.matches_pt1 ? o : a,
                  g = s.matches_head,
                  v = ((h = i[p]), g ? h[0] : h[h.length - 1]),
                  m = g ? h[1] : h[h.length - 2],
                  y = g ? h[h.length - 1] : h[0],
                  x = g ? h[h.length - 2] : h[1];
                return (
                  e.pointsCollinear(m, v, b) &&
                    (g
                      ? (n && n.chainRemoveHead(s.index, b), h.shift())
                      : (n && n.chainRemoveTail(s.index, b), h.pop()),
                    (v = m)),
                  e.pointsSame(y, b)
                    ? (i.splice(p, 1),
                      e.pointsCollinear(x, y, v) &&
                        (g
                          ? (n && n.chainRemoveTail(s.index, v), h.pop())
                          : (n && n.chainRemoveHead(s.index, v), h.shift())),
                      n && n.chainClose(s.index),
                      void r.push(h))
                    : void (g
                        ? (n && n.chainAddHead(s.index, b), h.unshift(b))
                        : (n && n.chainAddTail(s.index, b), h.push(b)))
                );
              }
              var w = s.index,
                _ = c.index;
              n && n.chainConnect(w, _);
              var O = i[w].length < i[_].length;
              s.matches_head
                ? c.matches_head
                  ? O
                    ? (k(w), E(w, _))
                    : (k(_), E(_, w))
                  : E(_, w)
                : c.matches_head
                ? E(w, _)
                : O
                ? (k(w), E(_, w))
                : (k(_), E(w, _));
            }
            function A(t, e, n) {
              return (
                (l.index = t),
                (l.matches_head = e),
                (l.matches_pt1 = n),
                l === s ? ((l = c), !1) : ((l = null), !0)
              );
            }
            function k(t) {
              n && n.chainReverse(t), i[t].reverse();
            }
            function E(t, r) {
              var a = i[t],
                o = i[r],
                s = a[a.length - 1],
                c = a[a.length - 2],
                l = o[0],
                d = o[1];
              e.pointsCollinear(c, s, l) &&
                (n && n.chainRemoveTail(t, s), a.pop(), (s = c)),
                e.pointsCollinear(s, l, d) &&
                  (n && n.chainRemoveHead(r, l), o.shift()),
                n && n.chainJoin(t, r),
                (i[t] = a.concat(o)),
                i.splice(r, 1);
            }
          }),
          r
        );
      }
      t.exports = n;
    },
    a6dc: function (t, e) {
      function n() {
        var t,
          e = 0,
          n = !1;
        function i(e, n) {
          return (
            t.list.push({
              type: e,
              data: n ? JSON.parse(JSON.stringify(n)) : void 0,
            }),
            t
          );
        }
        return (
          (t = {
            list: [],
            segmentId: function () {
              return e++;
            },
            checkIntersection: function (t, e) {
              return i("check", { seg1: t, seg2: e });
            },
            segmentChop: function (t, e) {
              return (
                i("div_seg", { seg: t, pt: e }), i("chop", { seg: t, pt: e })
              );
            },
            statusRemove: function (t) {
              return i("pop_seg", { seg: t });
            },
            segmentUpdate: function (t) {
              return i("seg_update", { seg: t });
            },
            segmentNew: function (t, e) {
              return i("new_seg", { seg: t, primary: e });
            },
            segmentRemove: function (t) {
              return i("rem_seg", { seg: t });
            },
            tempStatus: function (t, e, n) {
              return i("temp_status", { seg: t, above: e, below: n });
            },
            rewind: function (t) {
              return i("rewind", { seg: t });
            },
            status: function (t, e, n) {
              return i("status", { seg: t, above: e, below: n });
            },
            vert: function (e) {
              return e === n ? t : ((n = e), i("vert", { x: e }));
            },
            log: function (t) {
              return (
                "string" !== typeof t && (t = JSON.stringify(t, !1, "  ")),
                i("log", { txt: t })
              );
            },
            reset: function () {
              return i("reset");
            },
            selected: function (t) {
              return i("selected", { segs: t });
            },
            chainStart: function (t) {
              return i("chain_start", { seg: t });
            },
            chainRemoveHead: function (t, e) {
              return i("chain_rem_head", { index: t, pt: e });
            },
            chainRemoveTail: function (t, e) {
              return i("chain_rem_tail", { index: t, pt: e });
            },
            chainNew: function (t, e) {
              return i("chain_new", { pt1: t, pt2: e });
            },
            chainMatch: function (t) {
              return i("chain_match", { index: t });
            },
            chainClose: function (t) {
              return i("chain_close", { index: t });
            },
            chainAddHead: function (t, e) {
              return i("chain_add_head", { index: t, pt: e });
            },
            chainAddTail: function (t, e) {
              return i("chain_add_tail", { index: t, pt: e });
            },
            chainConnect: function (t, e) {
              return i("chain_con", { index1: t, index2: e });
            },
            chainReverse: function (t) {
              return i("chain_rev", { index: t });
            },
            chainJoin: function (t, e) {
              return i("chain_join", { index1: t, index2: e });
            },
            done: function () {
              return i("done");
            },
          }),
          t
        );
      }
      t.exports = n;
    },
    a854: function (t, e, n) {
      "use strict";
      var i = n("1067"),
        r = n.n(i);
      r.a;
    },
    a975: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").every,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("every", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    a981: function (t, e) {
      t.exports =
        "undefined" !== typeof ArrayBuffer && "undefined" !== typeof DataView;
    },
    a9a6: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return s;
        }),
        n.d(e, "b", function () {
          return c;
        }),
        n.d(e, "d", function () {
          return l;
        });
      var i = n("864d");
      const r = [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        a = (t, e) => [t[0][e], t[1][e], t[2][e]],
        o = (t, e) => [i["d"](t[0], e), i["d"](t[1], e), i["d"](t[2], e)],
        s = (t, ...e) =>
          e.reduce(
            (t, e) => [
              [
                i["b"](t[0], a(e, 0)),
                i["b"](t[0], a(e, 1)),
                i["b"](t[0], a(e, 2)),
              ],
              [
                i["b"](t[1], a(e, 0)),
                i["b"](t[1], a(e, 1)),
                i["b"](t[1], a(e, 2)),
              ],
              [
                i["b"](t[2], a(e, 0)),
                i["b"](t[2], a(e, 1)),
                i["b"](t[2], a(e, 2)),
              ],
            ],
            t
          ),
        c = (t) => {
          const e =
              t[0][0] * t[1][1] * t[2][2] +
              t[0][1] * t[1][2] * t[2][0] +
              t[0][2] * t[1][0] * t[2][1] -
              t[0][0] * t[1][2] * t[2][1] -
              t[0][1] * t[1][0] * t[2][2] -
              t[0][2] * t[1][1] * t[2][0],
            n = [
              [
                t[1][1] * t[2][2] - t[1][2] * t[2][1],
                t[0][2] * t[2][1] - t[0][1] * t[2][2],
                t[0][1] * t[1][2] - t[0][2] * t[1][1],
              ],
              [
                t[1][2] * t[2][0] - t[1][0] * t[2][2],
                t[0][0] * t[2][2] - t[0][2] * t[2][0],
                t[0][2] * t[1][0] - t[0][0] * t[1][2],
              ],
              [
                t[1][0] * t[2][1] - t[1][1] * t[2][0],
                t[0][1] * t[2][0] - t[0][0] * t[2][1],
                t[0][0] * t[1][1] - t[0][1] * t[1][0],
              ],
            ];
          return o(n, 1 / e);
        },
        l = (t, e) =>
          e <= 1
            ? t
            : Array.from({ length: e - 1 }).reduce((e, n) => s(e, t), t);
    },
    aa4c: function (t, e, n) {
      var i = n("26c8");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("7ac770f4", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    aa9e: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return _;
      });
      var i = n("377b"),
        r = n("5c61"),
        a = n("6166"),
        o = n("69af"),
        s = n("0a4d"),
        c = n("1898"),
        l = n("fcef");
      const d = (t, e) => {
        const n = Object(a["h"])(e, t),
          i = Object(a["g"])(t, { x: n.x / 2, y: n.y / 2 }),
          r = Object(a["b"])(i, e);
        return { center: i, radius: r, mask: void 0 };
      };
      class h {
        constructor(t, e) {
          (this.getAttrs = t), (this.broadcast = e), (this.beforeStart = []);
        }
        get doing() {
          return this.start && this.now;
        }
        push(t, e, n) {
          return this.doing
            ? ((this.now = n.current), t)
            : ((this.start = n.current),
              (this.now = n.current),
              (this.beforeStart = t),
              this.broadcast(
                "creating",
                Object.assign({ id: "", alias: "" }, this.getCandidate())
              ),
              t);
        }
        stop(t) {
          if (!this.doing) return;
          if (!t) return void this.cancel();
          this.now = t.current;
          const e = this.getCandidate();
          if (!e) return;
          this.cancel();
          const n = Object.assign(Object.assign({}, e), this.getAttrs());
          return (
            this.broadcast("created", n),
            {
              prev: this.beforeStart,
              next: this.beforeStart.concat(n),
              prevId: void 0,
              nextId: n.id,
            }
          );
        }
        cancel() {
          this.start && this.now && this.broadcast("abort"),
            (this.start = void 0),
            (this.now = void 0);
        }
        getCandidate() {
          if (this.start && this.now) return d(this.start, this.now);
        }
      }
      var u = n("a4c5");
      const f = "circle",
        p = [f + "_shape", f],
        b = [f + "_active", "active"].concat(p),
        g = [f + "_draft", "draft"].concat(b),
        v = { className: p },
        m = (t, e = {}) => {
          const n = Object.assign(Object.assign({}, v), e);
          return {
            type: "circle",
            class: e.className,
            labelId: n.labelId,
            data: { center: t.center, radius: t.radius },
          };
        },
        y = (t, e) => {
          if (t) return m(t, { className: b, labelId: e });
        },
        x = (t) => m(t, { className: g }),
        w = (t, e, n) => {
          const i = Object(a["b"])(t.center, e);
          return Math.abs(i - t.radius) <= n;
        };
      class _ extends c["a"] {
        constructor() {
          super(...arguments),
            (this.name = "circle"),
            (this.creator = new h(() => {
              const t = this.nextId();
              return { id: t, alias: t };
            }, this.emitCreatorEvent.bind(this))),
            (this.mover = new l["a"](s["a"], (t, e) => {
              const n = Object(a["g"])(t.center, e);
              return Object.assign(Object.assign({}, t), {
                mask: void 0,
                center: n,
              });
            })),
            (this.resizer = new l["c"]((t, e) => {
              const n = w(t, e, this.getHandleRadius()),
                i = Object(a["h"])(t.center, Object(a["h"])(e, t.center));
              return n ? i : void 0;
            }, d)),
            (this.getRenderJobs = Object(o["c"])(
              () => [
                this.getHoverLabelJob(),
                this.getHotRenderJobs(),
                this.getColdRenderJobs(),
              ],
              (t, e, n) => ({ instant: t, hot: e, cold: n })
            )),
            (this.getHotRenderJobs = Object(o["c"])(
              () => [
                this.creator.getCandidate(),
                this.getEditingShape(),
                this.context.labelMap[this.name],
              ],
              (t, e) =>
                Object(i["a"])([y(e, this.getLabelId(e)), t ? x(t) : void 0])
            )),
            (this.getColdRenderJobs = Object(o["c"])(
              () => [
                this.getVisibleShapes(),
                this.editingId,
                this.context.config.alwaysShowLabel,
                this.context.labelMap[this.name],
              ],
              (t, e, n) =>
                t.reduce((t, i) => {
                  if (i.id === e) return t;
                  const r = this.getLabelId(i),
                    a = m(i, { labelId: r });
                  return n
                    ? t.concat(a, Object(u["b"])(i, { labelId: r }))
                    : t.concat(a);
                }, [])
            ));
        }
        doRespond(t) {
          switch (t.kind) {
            case "hover":
              return this.handleHover(t);
            case "click":
              return this.handleClick(t);
            case "contextmenu":
              return this.creator.doing
                ? (this.creator.stop(), r["a"].DONE)
                : this.handleClick(t);
            case "drag":
              return this.handleDrag(t);
            case "dragEnd":
              return this.handleDragEnd(t);
          }
        }
        doArrowKeyboard(t) {
          if (!this.editingId) return r["a"].DONE;
          {
            const e = this.mover.moveByArrowKey(t, this.shapes, this.editingId);
            this.handleBehaviorStop(e);
          }
        }
        handleBehaviorStop(t) {
          if (((this.currentBehavior = void 0), !t || !t.next)) return;
          const { next: e, prev: n, prevId: i, nextId: a } = t;
          return (
            this.pushHistory({
              redo: () => {
                (this.shapes = e), (this.editingId = a || this.editingId);
              },
              undo: () => {
                (this.shapes = n), (this.editingId = i || this.editingId);
              },
            }),
            r["a"].DONE
          );
        }
        handleClick(t) {
          const e = this.getShapeAtPoint(t.point);
          if (e) return (this.editingId = e.id), r["a"].RETRIEVE;
          this.editingId = void 0;
        }
        handleHover(t) {
          const e = this.getEditingShape();
          if (e && w(e, t.point, this.getHandleRadius()))
            return this.setCursor("handle"), r["a"].DONE;
          if (e && Object(s["a"])(e, t.point))
            return this.setCursor("move"), r["a"].DONE;
          const n = this.getShapeAtPoint(t.point);
          if (n)
            return (
              (this.hoverId = n.id), this.setCursor("activate"), r["a"].DONE
            );
          (this.hoverId = void 0), this.setCursor();
        }
        handleDrag(t) {
          var e;
          if (!this.active) return;
          const n =
              null === (e = this.getEditingShape()) || void 0 === e
                ? void 0
                : e.id,
            i = [
              this.currentBehavior,
              this.resizer,
              this.mover,
              this.creator,
            ].find((e) => {
              if (!e) return;
              const i = e.push(this.shapes, n, t);
              return i ? ((this.shapes = i), !0) : void 0;
            });
          return (this.currentBehavior = i), r["a"].DONE;
        }
        handleDragEnd(t) {
          if (!this.currentBehavior) return;
          const e = this.currentBehavior.stop(t);
          return this.handleBehaviorStop(e);
        }
        getShapeAtPoint(t) {
          return this.getVisibleShapes().find((e) => Object(s["a"])(e, t));
        }
      }
    },
    acc5: function (t, e, n) {
      "use strict";
      n.d(e, "j", function () {
        return o;
      }),
        n.d(e, "f", function () {
          return s;
        }),
        n.d(e, "g", function () {
          return c;
        }),
        n.d(e, "h", function () {
          return l;
        }),
        n.d(e, "d", function () {
          return p;
        }),
        n.d(e, "i", function () {
          return g;
        }),
        n.d(e, "c", function () {
          return m;
        }),
        n.d(e, "a", function () {
          return y;
        }),
        n.d(e, "b", function () {
          return x;
        }),
        n.d(e, "e", function () {
          return w;
        }),
        n.d(e, "l", function () {
          return _;
        }),
        n.d(e, "k", function () {
          return O;
        });
      var i = n("95cc"),
        r = n.n(i),
        a = n("0ffa");
      const o = (t) => "number" === typeof t.x && "number" === typeof t.y,
        s = (t) => {
          let e = [];
          t.reduce((t, n) => (o(n) && t.push([n.x, n.y]), e), e);
          const [n, i] = r()([e], 1);
          return { x: n, y: i };
        },
        c = (t) => {
          const [e, n] = t;
          return { x: (e.x + n.x) / 2, y: (e.y + n.y) / 2 };
        },
        l = (t) => {
          if (!t.length) return;
          let e = t[0];
          for (let r = 1; r < t.length; r++)
            e = e.length > t[r].length ? e : t[r];
          if (!e.length) return;
          const [n, i] = r()([e], 1);
          return { x: n, y: i };
        };
      var d;
      function h(t, e, n) {
        const i = (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y);
        return 0 === i ? d.Colinear : i > 0 ? d.CounterClockwise : d.Clockwise;
      }
      function u(t, e, n, i) {
        return t === d.Colinear && Object(a["f"])(Object(a["b"])([e, n]), i);
      }
      function f(t, e) {
        const [n, i] = t,
          [r, a] = e,
          o = h(n, i, r),
          s = h(n, i, a),
          c = h(r, a, n),
          l = h(r, a, i);
        return (
          (o !== s && c !== l) ||
          [
            [o, n, i, r],
            [s, n, i, a],
            [c, r, a, n],
            [l, r, a, i],
          ].some((t) => u(...t))
        );
      }
      (function (t) {
        (t[(t["Clockwise"] = 0)] = "Clockwise"),
          (t[(t["CounterClockwise"] = 1)] = "CounterClockwise"),
          (t[(t["Colinear"] = 2)] = "Colinear");
      })(d || (d = {}));
      const p = (t) => {
        const e = [
          [
            [0, 1],
            [2, 3],
          ],
          [
            [0, 3],
            [1, 2],
          ],
        ];
        if (t.length < 3) return t;
        for (const n of e) {
          const [e, i] = n,
            r = [t[e[0]], t[e[1]]],
            a = [t[i[0]], t[i[1]]];
          if (f(r, a)) return [t[e[0]], t[i[0]], t[e[1]], t[i[1]]];
        }
        return t;
      };
      function b(t) {
        const e = [],
          n = (e) => e % t.length;
        for (let i = 0; i < t.length; i++)
          e.push([t[i], t[n(i + 1)], t[n(i + 2)]]);
        return e.map((t) => h(...t));
      }
      function g(t) {
        const e = b(t);
        let n;
        for (const i of e)
          if (null != n) {
            if (i !== n) return !1;
          } else n = i;
        return !0;
      }
      function v(t) {
        var e, n;
        return (
          (null === (e = t.back[0]) || void 0 === e ? void 0 : e.x) >
          (null === (n = t.front[0]) || void 0 === n ? void 0 : n.x)
        );
      }
      function m(t) {
        const { front: e, back: n } = t,
          i = v(t),
          r = [e[1], n[1], n[2], e[2]],
          a = [e[0], n[0], n[1], e[1]],
          o = [e[0], n[0], n[3], e[3]],
          s = [e[2], n[2], n[3], e[3]],
          c = i ? [e, o, a, s, r, n] : [n, r, a, s, o, e];
        return c;
      }
      function y(t) {
        const { front: e, back: n } = t;
        if (e.length && n.length) {
          const i = v(t)
            ? [e[0], n[0], n[1], n[2], e[2], e[3]]
            : [e[1], n[1], n[0], n[3], e[3], e[2]];
          return i;
        }
        return e.concat(n);
      }
      function x(t) {
        const { front: e, back: n } = t;
        return e.concat(n);
      }
      function w(t) {
        const e = y(t);
        return s(e);
      }
      function _(t, e) {
        return { x: t.x + e.x, y: t.y + e.y };
      }
      function O(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
    },
    b39a: function (t, e, n) {
      "use strict";
      var i = n("da84"),
        r = n("ebb5"),
        a = n("d039"),
        o = i.Int8Array,
        s = r.aTypedArray,
        c = r.exportTypedArrayMethod,
        l = [].toLocaleString,
        d = [].slice,
        h =
          !!o &&
          a(function () {
            l.call(new o(1));
          }),
        u =
          a(function () {
            return [1, 2].toLocaleString() != new o([1, 2]).toLocaleString();
          }) ||
          !a(function () {
            o.prototype.toLocaleString.call([1, 2]);
          });
      c(
        "toLocaleString",
        function () {
          return l.apply(h ? d.call(s(this)) : s(this), arguments);
        },
        u
      );
    },
    b3b5: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      class i {
        constructor(t) {
          (this.changed = !1), (this.delay = t);
        }
        isChangedRecently(t) {
          const e = this.prevValue;
          return (
            (this.prevValue = t), e !== t && this.markChanged(), this.changed
          );
        }
        markChanged() {
          (this.changed = !0),
            clearTimeout(this.timer),
            (this.timer = setTimeout(() => {
              this.changed = !1;
            }, this.delay));
        }
      }
    },
    b6ba: function (t, e, n) {
      "use strict";
      var i = n("f72c"),
        r = n.n(i);
      e["default"] = r.a;
    },
    b6f9: function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          ".dot-predictor-op[data-v-e4021b66]{position:absolute;top:0;left:0;height:0;min-height:0}.dot-predictor-op.btn-visible[data-v-e4021b66]{min-height:110px}.dot-predictor-op .dot-predictor-btns[data-v-e4021b66]{display:flex;flex-direction:column}.dot-predictor-op .dot-predictor-btns .confirm-btn[data-v-e4021b66]{font-size:18px;line-height:32px;border-radius:2px;width:32px;height:32px;min-width:32px!important;padding:0 5px;text-align:center;margin-bottom:10px;margin-left:0!important}.dot-predictor-op .dot-predictor-btns[data-v-e4021b66] .s-button .s-icon{top:0;margin-right:0}.dot-predictor-op .dot-predictor-tips[data-v-e4021b66]{top:auto;bottom:0}",
          "",
        ]),
        (t.exports = e);
    },
    b85c: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      n("a4d3"), n("e01a"), n("d28b"), n("d3b7"), n("3ca3"), n("ddb0");
      var i = n("06c5");
      function r(t, e) {
        var n;
        if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
          if (
            Array.isArray(t) ||
            (n = Object(i["a"])(t)) ||
            (e && t && "number" === typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              a = function () {};
            return {
              s: a,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: a,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          s = !0,
          c = !1;
        return {
          s: function () {
            n = t[Symbol.iterator]();
          },
          n: function () {
            var t = n.next();
            return (s = t.done), t;
          },
          e: function (t) {
            (c = !0), (o = t);
          },
          f: function () {
            try {
              s || null == n["return"] || n["return"]();
            } finally {
              if (c) throw o;
            }
          },
        };
      }
    },
    b85d: function (t, e, n) {
      "use strict";
      var i = n("8874"),
        r = n.n(i);
      r.a;
    },
    b8d4: function (t, e, n) {
      var i = n("a2f1");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("160eb191", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    b924: function (t, e) {
      function n(t, e, n) {
        var i = [];
        return (
          t.forEach(function (t) {
            var r =
              (t.myFill.above ? 8 : 0) +
              (t.myFill.below ? 4 : 0) +
              (t.otherFill && t.otherFill.above ? 2 : 0) +
              (t.otherFill && t.otherFill.below ? 1 : 0);
            0 !== e[r] &&
              i.push({
                id: n ? n.segmentId() : -1,
                start: t.start,
                end: t.end,
                myFill: { above: 1 === e[r], below: 2 === e[r] },
                otherFill: null,
              });
          }),
          n && n.selected(i),
          i
        );
      }
      var i = {
        union: function (t, e) {
          return n(t, [0, 2, 1, 0, 2, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], e);
        },
        intersect: function (t, e) {
          return n(t, [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 0, 2, 1, 0], e);
        },
        difference: function (t, e) {
          return n(t, [0, 0, 0, 0, 2, 0, 2, 0, 1, 1, 0, 0, 0, 1, 2, 0], e);
        },
        differenceRev: function (t, e) {
          return n(t, [0, 2, 1, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 0, 0, 0], e);
        },
        xor: function (t, e) {
          return n(t, [0, 2, 1, 0, 2, 0, 0, 1, 1, 0, 0, 2, 0, 1, 2, 0], e);
        },
      };
      t.exports = i;
    },
    b979: function (t, e, n) {
      var i = n("24fb"),
        r = n("1de5"),
        a = n("c36d"),
        o = n("1de6");
      e = i(!1);
      var s = r(a),
        c = r(o);
      e.push([
        t.i,
        ".delete-btn[data-v-2bd382b5]{position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;background-image:url(" +
          s +
          ");background-position:50%;background-size:100%;background-repeat:no-repeat;cursor:pointer}.delete-btn[data-v-2bd382b5]:hover{background-image:url(" +
          c +
          ")}",
        "",
      ]),
        (t.exports = e);
    },
    bb89: function (t, e, n) {
      "use strict";
      var i = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.invalidVisible
            ? n("div", { staticClass: "invalid-modal" }, [
                n("div", { staticClass: "invalid-tip" }, [t._v("无效数据")]),
                n("div", {
                  staticClass: "invalid-mask",
                  on: { click: t.showInvalidTip },
                }),
              ])
            : t._e();
        },
        r = [],
        a = n("f24d"),
        o = n("8165"),
        s = Object(o["defineComponent"])({
          props: { isInvalid: { default: !1 } },
          setup: function (t) {
            var e = Object(a["useToast"])(),
              n = e.warn;
            return {
              invalidVisible: Object(o["computed"])(function () {
                return t.isInvalid;
              }),
              showInvalidTip: function () {
                n("已被标注为无效数据请取消勾选后再标注（快捷键 W ）");
              },
            };
          },
        }),
        c = s,
        l = (n("0fcc"), n("2877")),
        d = Object(l["a"])(c, i, r, !1, null, "74bffb9c", null);
      e["a"] = d.exports;
    },
    bc6c: function (t, e, n) {
      var i = n("24fb"),
        r = n("1de5"),
        a = n("e097"),
        o = n("6cf4");
      e = i(!1);
      var s = r(a),
        c = r(o);
      e.push([
        t.i,
        ".addon-ctl[data-v-9978f844]{position:relative;display:flex;align-self:center}.addon-ctl .ctl-tip[data-v-9978f844]  .s-tip_popper_arrow{display:none}.addon-ctl .ctl-tip[data-v-9978f844]  .s-tip_popper_content{padding:4px 0}.addon-ctl .ctl-tip[data-v-9978f844]  .s-tip_popper{z-index:300}.addon-ctl .inner-wrap[data-v-9978f844]{display:flex;align-items:center;cursor:pointer}.addon-ctl .inner-wrap .tool[data-v-9978f844]{width:16px;height:16px;background:url(" +
          s +
          ") no-repeat;background-size:100%;margin-right:4px}.addon-ctl .inner-wrap .content[data-v-9978f844]{height:22px;font-size:14px;color:#000;line-height:22px}.addon-ctl .inner-wrap.visible .tool[data-v-9978f844],.addon-ctl .inner-wrap:hover .tool[data-v-9978f844]{background-image:url(" +
          c +
          ")}.addon-ctl .inner-wrap.visible .content[data-v-9978f844],.addon-ctl .inner-wrap:hover .content[data-v-9978f844]{color:var(--cxd-blue)}.addon-ctl .popper-wrap[data-v-9978f844]{white-space:nowrap}.addon-ctl .popper-wrap[data-v-9978f844]  .s-checkbox{display:flex;align-items:center;width:100%;height:32px;padding:0 12px;font-size:14px}.addon-ctl .popper-wrap[data-v-9978f844]  .s-checkbox:hover{background:#eee}.addon-ctl .popper-wrap[data-v-9978f844]  .s-checkbox .s-checkbox_inner{font-size:12px}.addon-ctl .popper-wrap[data-v-9978f844]  .s-checkbox .s-checkbox_inner>.s-icon{line-height:14px;top:0}",
        "",
      ]),
        (t.exports = e);
    },
    c14d: function (t, e) {
      var n = {
        create: function () {
          var t = {
            root: { root: !0, next: null },
            exists: function (e) {
              return null !== e && e !== t.root;
            },
            isEmpty: function () {
              return null === t.root.next;
            },
            getHead: function () {
              return t.root.next;
            },
            insertBefore: function (e, n) {
              var i = t.root,
                r = t.root.next;
              while (null !== r) {
                if (n(r))
                  return (
                    (e.prev = r.prev),
                    (e.next = r),
                    (r.prev.next = e),
                    void (r.prev = e)
                  );
                (i = r), (r = r.next);
              }
              (i.next = e), (e.prev = i), (e.next = null);
            },
            findTransition: function (e) {
              var n = t.root,
                i = t.root.next;
              while (null !== i) {
                if (e(i)) break;
                (n = i), (i = i.next);
              }
              return {
                before: n === t.root ? null : n,
                after: i,
                insert: function (t) {
                  return (
                    (t.prev = n),
                    (t.next = i),
                    (n.next = t),
                    null !== i && (i.prev = t),
                    t
                  );
                },
              };
            },
          };
          return t;
        },
        node: function (t) {
          return (
            (t.prev = null),
            (t.next = null),
            (t.remove = function () {
              (t.prev.next = t.next),
                t.next && (t.next.prev = t.prev),
                (t.prev = null),
                (t.next = null);
            }),
            t
          );
        },
      };
      t.exports = n;
    },
    c1ac: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").filter,
        a = n("4840"),
        o = i.aTypedArray,
        s = i.aTypedArrayConstructor,
        c = i.exportTypedArrayMethod;
      c("filter", function (t) {
        var e = r(o(this), t, arguments.length > 1 ? arguments[1] : void 0),
          n = a(this, this.constructor),
          i = 0,
          c = e.length,
          l = new (s(n))(c);
        while (c > i) l[i] = e[i++];
        return l;
      });
    },
    c2ef: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "c", function () {
          return a;
        }),
        n.d(e, "d", function () {
          return o;
        }),
        n.d(e, "a", function () {
          return s;
        });
      n("d3b7"),
        n("ac1f"),
        n("25f0"),
        n("38cf"),
        n("5319"),
        n("5cc6"),
        n("9a8c"),
        n("a975"),
        n("735e"),
        n("c1ac"),
        n("d139"),
        n("3a7b"),
        n("d5d6"),
        n("82f8"),
        n("e91f"),
        n("60bd"),
        n("5f96"),
        n("3280"),
        n("3fcc"),
        n("ca91"),
        n("25a1"),
        n("cd26"),
        n("3c5d"),
        n("2954"),
        n("649e"),
        n("219c"),
        n("170b"),
        n("b39a"),
        n("72f7");
      var i = n("110c"),
        r = function (t) {
          var e = new Image();
          return new Promise(function (n) {
            (e.onload = function () {
              return n(e);
            }),
              (e.onerror = function () {
                return n(void 0);
              }),
              (e.src = t);
          });
        };
      function a(t, e) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "GET",
          r =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : 4e4,
          a = arguments.length > 4 ? arguments[4] : void 0,
          o = new XMLHttpRequest();
        return {
          result: new Promise(function (s, c) {
            if (
              (o.open(n, Object(i["a"])(t), !0),
              (o.responseType = e),
              (o.onload = function () {
                /^([2|3][0-9][0-9])$/.test(this.status.toString()) ||
                  c(new Error("failed")),
                  this.response ? s(this.response) : c(new Error("failed"));
              }),
              (o.onerror = c),
              (o.timeout = r),
              a)
            )
              return (
                o.setRequestHeader(
                  "Content-Type",
                  "application/json;charset=UTF-8"
                ),
                void o.send(JSON.stringify(a))
              );
            o.send();
          }),
          cancel: function () {
            o.abort();
          },
          isCancelled: function () {
            return o.readyState === XMLHttpRequest.UNSENT;
          },
        };
      }
      function o(t) {
        if ("string" === typeof t) return a(t, "text");
        var e = new FileReader(),
          n = !1;
        return (
          (e.onabort = function () {
            return (n = !0);
          }),
          {
            result: new Promise(function (n, i) {
              e.readAsText(t, "UTF-8"),
                (e.onload = function () {
                  n(this.result);
                }),
                (e.onerror = i);
            }),
            cancel: function () {
              return e.abort();
            },
            isCancelled: function () {
              return n;
            },
          }
        );
      }
      function s(t) {
        for (
          var e = "=".repeat((4 - (t.length % 4)) % 4),
            n = (t + e).replace(/-/g, "+").replace(/_/g, "/"),
            i = window.atob(n),
            r = new Uint8Array(i.length),
            a = 0;
          a < i.length;
          ++a
        )
          r[a] = i.charCodeAt(a);
        return r;
      }
    },
    c36d: function (t, e, n) {
      t.exports = n.p + "img/delete.7f240ea2.svg";
    },
    c426: function (t, e, n) {
      var i = n("58f3");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("21a0f1da", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    c75f: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var i = n("6166");
      const r = (t) => (e, n) => {
        if (!window.ResizeObserver)
          return t
            ? t(e, n)
            : (console.error(
                "Native resize observer is not available, please shim it"
              ),
              () => {});
        const i = new window.ResizeObserver((t) => {
          window.requestAnimationFrame(() => {
            const e = t[0];
            n(null === e || void 0 === e ? void 0 : e.contentRect);
          });
        });
        return i.observe(e), () => i.disconnect();
      };
      class a {
        constructor(t, e) {
          (this.dom = t), (this.updateRect = e);
        }
        observe(t) {
          this.stopObserve = t(this.dom, this.fit.bind(this));
        }
        teardown() {
          this.stopObserve && this.stopObserve();
        }
        fit(t) {
          const e = t || this.dom.getBoundingClientRect(),
            n = { width: Math.floor(e.width), height: Math.floor(e.height) };
          this.updateRect(n);
        }
      }
      const o = (t = {}) => ({
        id: "autofit",
        setup({ contextManager: e }) {
          const n = new a(e.context.dom, (t) => {
            const n = Object(i["a"])(e.context.resource.resolution, t),
              r = Object.assign(Object.assign({}, e.context.facts.coord), {
                res: n,
              }),
              a = Object.assign(Object.assign({}, e.context.facts), {
                coord: r,
                rect: t,
              });
            e.updateContext({ facts: a });
          });
          return n.observe(r(t.observe)), n;
        },
      });
    },
    c7b3: function (t, e, n) {
      "use strict";
      n.d(e, "g", function () {
        return a;
      }),
        n.d(e, "b", function () {
          return o;
        }),
        n.d(e, "c", function () {
          return s;
        }),
        n.d(e, "f", function () {
          return c;
        }),
        n.d(e, "a", function () {
          return v;
        }),
        n.d(e, "d", function () {
          return m;
        }),
        n.d(e, "e", function () {
          return x;
        }),
        n.d(e, "j", function () {
          return w;
        }),
        n.d(e, "i", function () {
          return _;
        }),
        n.d(e, "h", function () {
          return y;
        });
      const i = (t, e, n) => {
          const i = e.points;
          t.beginPath(), (t.fillStyle = n.background);
          const r = i[0];
          t.moveTo(~~r.x, ~~r.y),
            i.forEach((e) => {
              t.lineTo(~~e.x, ~~e.y);
            }),
            t.fill(),
            t.closePath();
        },
        r = (t, e, n) => {
          n.border.width &&
            (t.beginPath(),
            (t.lineWidth = n.border.width),
            (t.strokeStyle = n.border.color),
            e.points.forEach((e) => {
              t.lineTo(~~e.x, ~~e.y);
            }),
            e.closed && t.closePath(),
            t.stroke(),
            t.closePath());
        },
        a = (t, e, n) => {
          const { points: a } = e;
          a.length && (t.beginPath(), i(t, e, n), r(t, e, n), t.closePath());
        },
        o = (t, e, n) => {
          t.beginPath(),
            (t.lineWidth = 2 * e.radius),
            (t.strokeStyle = n.background),
            (t.lineCap = "round"),
            (t.lineJoin = "round"),
            e.points.forEach((e) => {
              t.lineTo(~~e.x, ~~e.y);
            }),
            t.stroke(),
            t.closePath();
        },
        s = (t, e, n) => {
          const {
              center: { x: i, y: r },
              radius: a,
            } = e,
            o = n.border.width;
          (t.lineWidth = o),
            (t.strokeStyle = n.border.color),
            (t.fillStyle = n.background),
            t.beginPath(),
            t.arc(~~i, ~~r, ~~a, 0, 2 * Math.PI),
            o && t.stroke(),
            t.fill(),
            t.closePath();
        },
        c = (t, e, n) => {
          t.beginPath(),
            (t.lineWidth = e.width || n.border.width),
            (t.strokeStyle = n.border.color),
            n.border.dashed && t.setLineDash(n.border.dashed);
          const [i, ...r] = e.points;
          t.moveTo(i.x, i.y);
          for (const a of r) t.lineTo(a.x, a.y);
          t.stroke(), t.setLineDash([]), t.closePath();
        };
      var l = n("2d45"),
        d = n("d03e");
      const h = { r: 255, g: 255, b: 255, a: 1 },
        u = /rgba?\((.*)\)/;
      function f(t) {
        const e = t.match(u),
          n = e ? e[1] : "";
        if (!n) return h;
        const i = n.split(",");
        i.length < 3 &&
          console.warn(t + " seems not a canonical rgb(...) format");
        const r = Object(d["b"])(Number.parseInt(i[0]), 0, 255),
          a = Object(d["b"])(Number.parseInt(i[1]), 0, 255),
          o = Object(d["b"])(Number.parseInt(i[2]), 0, 255),
          s = Object(d["b"])(Number.parseFloat(i[3]), 0, 1);
        return { r: r, g: a, b: o, a: s };
      }
      function p(t) {
        const e = t.split("").slice(1),
          n = 3 === e.length,
          i = n ? [e[0], e[0]].join("") : [e[0], e[1]].join(""),
          r = n ? [e[1], e[1]].join("") : [e[2], e[3]].join(""),
          a = n ? [e[2], e[2]].join("") : [e[4], e[5]].join(""),
          o = Object(d["b"])(Number.parseInt(i, 16), 0, 255),
          s = Object(d["b"])(Number.parseInt(r, 16), 0, 255),
          c = Object(d["b"])(Number.parseInt(a, 16), 0, 255),
          l = n
            ? 1
            : e.length > 6
            ? Number.parseInt(e.slice(6).join(""), 16) / 256
            : 1;
        return { r: o, g: s, b: c, a: l };
      }
      class b {
        constructor(t) {
          (this.r = h.r),
            (this.g = h.g),
            (this.b = h.b),
            (this.a = h.a),
            (this.str = t.trim()),
            this.parse();
        }
        alpha(t) {
          return (this.a = t), this;
        }
        rgba() {
          return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        }
        parse() {
          const {
            r: t,
            g: e,
            b: n,
            a: i,
          } = this.str.startsWith("rgb")
            ? f(this.str)
            : this.str.startsWith("#")
            ? p(this.str)
            : h;
          (this.r = t), (this.g = e), (this.b = n), (this.a = isNaN(i) ? 1 : i);
        }
      }
      const g = (t) => {
        const e = new b(t);
        return e;
      };
      function v(t, e) {
        const n = document.createElement("canvas"),
          i = n.getContext("2d");
        if (!i) return Object(l["g"])();
        const { width: r, height: a, bitmap: o } = t;
        (n.width = r), (n.height = a);
        let s = new Uint8ClampedArray(r * a * 4),
          c = new Uint32Array(s.buffer);
        const { r: d, g: h, b: u, a: f } = g(e.background),
          p = Math.floor(255 * f),
          b = o.asyncOnes((t) => {
            c[t] = (p << 24) | (u << 16) | (h << 8) | d;
          });
        return Object(l["a"])(b, (t) =>
          t.then(() => {
            const t = new ImageData(s, r, a);
            return (
              i.putImageData(t, 0, 0),
              (c = new Uint32Array(0)),
              (s = new Uint8ClampedArray(0)),
              n
            );
          })
        );
      }
      const m = (t, e, n) => {
          const i = e,
            r = n.border.width,
            a = 1;
          return s(
            t,
            { center: i, radius: r },
            Object.assign(Object.assign({}, n), {
              border: Object.assign(Object.assign({}, n.border), { width: a }),
            })
          );
        },
        y = (t, e, n) => {
          const [i, r] = e;
          t.beginPath(),
            t.rect(i.x, i.y, r.x - i.x, r.y - i.y),
            n.border.width &&
              ((t.lineWidth = n.border.width),
              (t.strokeStyle = n.border.color),
              t.setLineDash(n.border.dashed || []),
              t.stroke()),
            (t.fillStyle = n.background),
            t.fill(),
            t.closePath();
        },
        x = (t, e, n, i) => {
          const { x1: r, y1: o, x2: s, y2: c } = e,
            l = { x: r, y: o },
            d = { x: s, y: c },
            h = [
              { x: 0, y: 0 },
              l,
              { x: d.x, y: l.y },
              { x: d.x, y: d.y },
              { x: l.x, y: d.y },
              l,
              { x: 0, y: 0 },
              { x: 0, y: n.height },
              { x: n.width, y: n.height },
              { x: n.width, y: 0 },
              { x: 0, y: 0 },
            ];
          a(
            t,
            { points: h },
            Object.assign(Object.assign({}, i), {
              border: Object.assign(Object.assign({}, i.border), { width: 0 }),
            })
          ),
            y(
              t,
              [l, d],
              Object.assign(Object.assign({}, i), {
                background: "rgba(0, 0, 0, 0)",
              })
            );
        },
        w = (t, e, n) => {
          const {
              text: i,
              position: { x: r, y: a },
            } = e,
            o = n.font.size,
            s = ` ${i} `,
            c = n.font.lineHeight * o,
            l = i.length * o,
            d = l / 2,
            h = c / 2;
          t.beginPath(), t.rect(r - d, a - h, l, c);
          const u = e.useShapeBg ? n.background : n.font.background;
          u && ((t.fillStyle = u), t.fill()),
            (t.font = o + "px system-ui"),
            (t.fillStyle = n.font.color),
            (t.textAlign = "center"),
            (t.textBaseline = "middle"),
            t.fillText(s, r, a),
            t.closePath();
        },
        _ = (t, e, n) => {
          const { width: i, height: r, processOne: a, collection: o } = e,
            s = document.createElement("canvas"),
            c = s.getContext("2d");
          (s.width = i), (s.height = r);
          const d = g(n.background),
            h = d.a,
            u = d.alpha(1).rgba(),
            f = Object.assign(Object.assign({}, n), { background: u }),
            p = [];
          for (const l of o) {
            const t = a(l, c, f);
            t && !t.cancelled && p.push(t);
          }
          return l["a"](l["f"](p), (e) =>
            e.then(
              () => (
                (t.globalAlpha = h),
                t.drawImage(s, 0, 0),
                (t.globalAlpha = 1),
                s
              )
            )
          );
        };
    },
    ca91: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("d58f").left,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("reduce", function (t) {
        return r(
          a(this),
          t,
          arguments.length,
          arguments.length > 1 ? arguments[1] : void 0
        );
      });
    },
    cd26: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = i.aTypedArray,
        a = i.exportTypedArrayMethod,
        o = Math.floor;
      a("reverse", function () {
        var t,
          e = this,
          n = r(e).length,
          i = o(n / 2),
          a = 0;
        while (a < i) (t = e[a]), (e[a++] = e[--n]), (e[n] = t);
        return e;
      });
    },
    cf55: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "a", function () {
          return a;
        }),
        n.d(e, "c", function () {
          return g;
        }),
        n.d(e, "d", function () {
          return m;
        });
      n("d81d"), n("d3b7");
      var i,
        r,
        a,
        o = n("5530"),
        s = n("d4ec"),
        c = n("262e"),
        l = n("2caf"),
        d = n("9ab4"),
        h = n("488f"),
        u = n("c7a3"),
        f = n("c2ef"),
        p = n("2841"),
        b = 50;
      (function (t) {
        (t["Positive"] = "positive"), (t["Negative"] = "negative");
      })(i || (i = {})),
        (function (t) {
          (t["INITIALIZED"] = "initialized"),
            (t["ERROR"] = "error"),
            (t["PREDICTED"] = "predicted"),
            (t["PREDICTING"] = "predicting"),
            (t["CONFIRMED"] = "confirmed"),
            (t["CONFIRMING"] = "confirming"),
            (t["CANCELLED"] = "cancelled"),
            (t["POSITIVECLICK"] = "positive"),
            (t["NEGATIVECLICK"] = "negative"),
            (t["PREDICTFAIL"] = "predictfail"),
            (t["RECT_START"] = "rect:start"),
            (t["RECT_END"] = "rect:end");
        })(r || (r = {})),
        (function (t) {
          (t["INVALID_POINT"] = "invalid-point"),
            (t["INVALID_RECT"] = "invalid_rect"),
            (t["OVER_SIZE"] = "over_size"),
            (t["PREDICT_FAIL"] = "predict_fail");
        })(a || (a = {}));
      var g = 4096,
        v = (function (t) {
          Object(c["a"])(n, t);
          var e = Object(l["a"])(n);
          function n() {
            var t;
            return (
              Object(s["a"])(this, n),
              (t = e.apply(this, arguments)),
              (t.state = {
                datasetId: 0,
                entityId: "",
                isEncrypted: void 0,
                threshold: b,
                dotList: [],
                status: r.INITIALIZED,
                error: null,
                clickStatusTimer: null,
                bbox: null,
                resBbox: null,
                bgWidth: 0,
                bgHeight: 0,
                subTaskId: void 0,
                taskId: void 0,
                toolName: void 0,
              }),
              (t.fetchDotPredict = function () {
                var e = {
                  datasetId: t.state.datasetId,
                  id: t.state.entityId,
                  isEncrypted: t.state.isEncrypted,
                  taskId: t.state.taskId,
                  subTaskId: t.state.subTaskId,
                  clickList: t.state.dotList.map(function (t) {
                    return {
                      x: t.x,
                      y: t.y,
                      is_positive: t.type === i.Positive,
                    };
                  }),
                  box: t.state.bbox,
                };
                return p["env"].isData
                  ? u["caller"].send("entity/ritmPrediction", e)
                  : Object(f["c"])(
                      "/easydata/canghai/api",
                      "text",
                      "POST",
                      4e4,
                      Object(o["a"])({ method: "entity/ritmPrediction" }, e)
                    );
              }),
              (t.lastDotEnable = function (t) {
                if (t) {
                  var e = t.x,
                    n = t.y;
                  return e >= 0 && n >= 0;
                }
              }),
              (t.inRange = function (t, e, n) {
                return t >= e && t <= n;
              }),
              (t.bboxEnable = function (e) {
                return (
                  !!e &&
                  t.inRange(e.x1, 0, t.state.bgWidth) &&
                  t.inRange(e.x2, 0, t.state.bgWidth) &&
                  t.inRange(e.y1, 0, t.state.bgHeight) &&
                  t.inRange(e.y2, 0, t.state.bgHeight)
                );
              }),
              (t.resetPredictor = function () {
                (t.state.bbox = null),
                  (t.state.resBbox = null),
                  (t.state.status = r.INITIALIZED),
                  (t.state.error = null),
                  (t.state.dotList = []),
                  t.state.clickStatusTimer &&
                    clearTimeout(t.state.clickStatusTimer);
              }),
              (t.predictFactory = function (e, n) {
                (t.state.dotList = e), (t.state.bbox = n || null);
                var o = {
                  result: function () {
                    return Promise.resolve();
                  },
                  cancel: function () {},
                };
                if (!t.bboxEnable(t.state.bbox))
                  return (
                    (t.state.error = a.INVALID_RECT),
                    (t.state.status = r.PREDICTED),
                    o
                  );
                var s = e[e.length - 1];
                if (!t.lastDotEnable(s))
                  return (
                    (t.state.error = a.INVALID_POINT),
                    (t.state.status = r.PREDICTED),
                    o
                  );
                (t.state.status =
                  s.type === i.Positive ? r.POSITIVECLICK : r.NEGATIVECLICK),
                  (t.state.clickStatusTimer = window.setTimeout(function () {
                    t.state.status = r.PREDICTING;
                  }, 100));
                var c = t.fetchDotPredict();
                return {
                  result: c.result
                    .then(function (t) {
                      return t || "";
                    })
                    .catch(function (e) {
                      throw (
                        (clearTimeout(t.state.clickStatusTimer),
                        (t.state.status = r.PREDICTED),
                        (t.state.error = a.PREDICT_FAIL),
                        e)
                      );
                    }),
                  cancel: c.cancel,
                };
              }),
              (t.resetPredictThreshold = function () {
                t.state.threshold = b;
              }),
              t
            );
          }
          return n;
        })(h["ServiceBase"]);
      v = Object(d["a"])([h["ServiceDecorator"]], v);
      var m = function () {
        return Object(h["singleton"])(v);
      };
    },
    d03e: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return i;
      }),
        n.d(e, "a", function () {
          return r;
        });
      const i = (t, e, n) => Math.max(e, Math.min(n, t)),
        r = (t, e) => {
          if (e <= 0) throw new Error("step should > 0");
          const n = e + 1,
            i = [];
          for (let r = 0; r <= t; r += n) i.push(r);
          return i;
        };
    },
    d139: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").find,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("find", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    d308: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "default", function () {
          return i;
        });
      class i {
        constructor(t = [], e = r) {
          if (
            ((this.data = t),
            (this.length = this.data.length),
            (this.compare = e),
            this.length > 0)
          )
            for (let n = (this.length >> 1) - 1; n >= 0; n--) this._down(n);
        }
        push(t) {
          this.data.push(t), this.length++, this._up(this.length - 1);
        }
        pop() {
          if (0 === this.length) return;
          const t = this.data[0],
            e = this.data.pop();
          return (
            this.length--,
            this.length > 0 && ((this.data[0] = e), this._down(0)),
            t
          );
        }
        peek() {
          return this.data[0];
        }
        _up(t) {
          const { data: e, compare: n } = this,
            i = e[t];
          while (t > 0) {
            const r = (t - 1) >> 1,
              a = e[r];
            if (n(i, a) >= 0) break;
            (e[t] = a), (t = r);
          }
          e[t] = i;
        }
        _down(t) {
          const { data: e, compare: n } = this,
            i = this.length >> 1,
            r = e[t];
          while (t < i) {
            let i = 1 + (t << 1),
              a = e[i];
            const o = i + 1;
            if (
              (o < this.length && n(e[o], a) < 0 && ((i = o), (a = e[o])),
              n(a, r) >= 0)
            )
              break;
            (e[t] = a), (t = i);
          }
          e[t] = r;
        }
      }
      function r(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
      }
    },
    d30f: function (t, e, n) {
      t.exports = n.p + "img/erase.44fe5546.svg";
    },
    d574: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return r;
      }),
        n.d(e, "a", function () {
          return a;
        });
      var i = function (t) {
          return "EASYDL_PRO_ONCE_".concat(t);
        },
        r = function (t) {
          return window.localStorage.setItem(i(t), "yes");
        },
        a = function (t) {
          return !!window.localStorage.getItem(i(t));
        };
    },
    d5d6: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("b727").forEach,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("forEach", function (t) {
        r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    da3b: function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          '@-webkit-keyframes loading-data-v-270725c0{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes loading-data-v-270725c0{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.dot-predict-loading[data-v-270725c0],.dot-predict-loading .predict-disabled[data-v-270725c0],.dot-predict-loading .predict-loading[data-v-270725c0]{position:absolute;top:0;left:0;right:0;bottom:0}.dot-predict-loading .predict-disabled[data-v-270725c0]{cursor:not-allowed}.dot-predict-loading .predict-loading[data-v-270725c0]{cursor:wait}.dot-predict-loading .predict-loading[data-v-270725c0]:before{content:" ";width:24px;height:24px;position:absolute;left:50%;top:50%;margin-top:-12px;margin-left:-12px;border-radius:50%;border:1px solid #f5f5f5}.dot-predict-loading .predict-loading[data-v-270725c0]:after{content:" ";width:12px;height:12px;position:absolute;left:50%;top:50%;margin-top:-12px;margin-left:-12px;border-radius:100% 0 0 0;border:1px solid #4c84ff;border-width:2px 0 0 2px;transform-origin:right bottom;animation:loading-data-v-270725c0 1s infinite;-webkit-animation:loading-data-v-270725c0 1s infinite}',
          "",
        ]),
        (t.exports = e);
    },
    dab8: function (t, e, n) {
      var i = n("24fb");
      (e = i(!1)),
        e.push([
          t.i,
          '.addon-magnifier[data-v-1a5380c0]{position:fixed;z-index:200;pointer-events:none;left:0;top:0;width:0;height:0}.addon-magnifier .rect-wrap[data-v-1a5380c0]{overflow:hidden;background:#fff;border:1px solid #fff;box-shadow:0 0 3px #666}.addon-magnifier .rect-wrap[data-v-1a5380c0],.addon-magnifier .rect-wrap .rect-image[data-v-1a5380c0]{position:absolute;left:0;top:0}.addon-magnifier .rect-wrap[data-v-1a5380c0]:after,.addon-magnifier .rect-wrap[data-v-1a5380c0]:before{position:absolute;content:" ";border:none;opacity:.6;z-index:1}.addon-magnifier .rect-wrap[data-v-1a5380c0]:before{top:50%;left:0;right:0;height:1px;border-top:1px solid #fff}.addon-magnifier .rect-wrap[data-v-1a5380c0]:after{top:0;left:50%;bottom:0;width:1px;border-left:1px solid #fff}.addon-magnifier .rect-label[data-v-1a5380c0]{position:absolute;left:0;top:0;text-align:center;font-size:12px;white-space:nowrap;color:#fff;text-shadow:0 0 3px #000}',
          "",
        ]),
        (t.exports = e);
    },
    dae3: function (t, e) {
      t.exports =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADa0lEQVRYCe1VXUiTYRT+5nQtJ1YynThyDByIMkwE8yKESHS3u5CE8CYadNHFaBB6EVmChF4lWF0ERgQjERoiyehGxqD8YUhjeKGgUNRGmgz/cn+n57z2jU23paBexA48+857znN+vvO+7zeJiEyxWOxzNBoNQL8tnbWg6Hg4HI75fL44dJYPgP7M+kCxjwsLC/GCggJyOBy0t7cXh4Rh7z6TJlDoGRdVKpWEglRbW0tzc3PyNFzw6061ERS4A4jC3ACDm+nt7SWcC57GL7hvnloTSH6VG+js7BTF5Sb4aTabCdsTYz9kDNAepxHw7wOvAEPWODg1QKK/v/9QA9xEUVER9fX1EY8C8hNca9ZkKQ7w7gK0tbXFj6/ApRR3uopruOJyuTI2AKawNzY2UiAQkKfxNldC+OqAnampKWpqaqJIJIIlvUuvmrKC8/3q6mpMLpbtqVKpaGBggKeRAH4griYlTVKF3RsKhUin04nme3p6YBJyI0lKVeB6AiRKSkpyTgExwt/c3Ez87UCM80AeM2wegPBCNDQ0RNXV1eR2u9nEsg5wrUI5Tlb8MCjq6+ulmZkZ2ScVFhZKFotFwptI5eXlSVRUVEgajUYBYlgmI6kd+tNgMHhuc3NTMplMUktLizQ6Oiq1t7cLmsfjKWttbX2IhQX8WwqFYkk4sKgFyGazpU1gZGSEzUlJJBIRnJcgxv8FxlFA3Ao8uwHic6TVaslut5PT6RSHV6/XC53XRqORrFYrra2tMX0JUMsNKJH89/DwcLIB/iDxXoP0BqgBLghyhh/4Xuzu7lJbW5uIb2hooI6ODuKtwqSEzuvS0lIqLi6msTG+0UIuJ9OhAd/09HQCBpFkYmKCD9oOaJVJUhYFHCMQQA4aHBykyclJkd3r9VJdHV+IfeEJLy4u8oK/tI/S0sHwemNjQ9wE7BOTWNJJaRHpC3DPA885SJaDDfy1f8Pzeno0VjA6mFBVVUXz8/N4+XgIS80h4j8MiLkGrM/OzpLBYCC+ul1dXTAJeYnfixlTwHGFKcvLy7zvLLaMxCMYEcufYHGo1Wo1+f1+Xn4HynKGg3AP+/gJz8eAMic5hxOxCsC9vb1N4+PjUIlfav8u5og7URcKVgIrQBR4cKLJj5oMhVXAsf5Bj5o7z8tPID+B/ATyE/h/JvAHU5YY6/lA1UgAAAAASUVORK5CYII=";
    },
    e044: function (t, e, n) {
      "use strict";
      var i = n("4bc7"),
        r = n.n(i);
      r.a;
    },
    e097: function (t, e, n) {
      t.exports = n.p + "img/tool.f4fb6ae7.svg";
    },
    e0fb: function (t, e, n) {
      "use strict";
      var i;
      n.d(e, "a", function () {
        return i;
      }),
        (function (t) {
          (t["Positive"] = "positive"), (t["Negative"] = "negative");
        })(i || (i = {}));
    },
    e185: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return b;
      });
      const i = (t, e) => [
        [t[0][0], t[0][1], t[0][2] - e.x],
        [t[1][0], t[1][1], t[1][2] - e.y],
        [0, 0, 1],
      ];
      class r {
        constructor(t, e) {
          (this.moving = !1),
            (this.initialCoord = e.context.facts.coord.res),
            (this.getCurrentResCoord = () => e.context.facts.coord.res),
            (this.updateCurrentResCoord = (n) => {
              if (t.moveAfterScale && this.initialCoord[0][0] === n[0][0])
                return;
              const i = Object.assign(
                  Object.assign({}, e.context.facts.coord),
                  { res: n }
                ),
                r = Object.assign(Object.assign({}, e.context.facts), {
                  coord: i,
                });
              e.updateContext({ facts: r });
            });
          const n = () => {
            this.initialCoord = this.getCurrentResCoord();
          };
          e.context.events.on("INITIALIZED", n),
            (this.teardown = () => {
              e.context.events.off("INITIALIZED", n);
            });
        }
        start() {
          (this.moving = !0), (this.movingFrom = this.getCurrentResCoord());
        }
        move(t) {
          this.movingFrom && this.updateCurrentResCoord(i(this.movingFrom, t));
        }
        moveTo(t) {
          this.updateCurrentResCoord(i(this.initialCoord, t));
        }
        end() {
          (this.moving = !1), (this.movingFrom = void 0);
        }
      }
      var a = n("20fd");
      class o extends a["a"] {
        constructor(t, e) {
          super(), (this.mover = e), (this.name = "mover"), (this.config = t);
        }
        deactivate() {
          super.deactivate(), this.mover.end();
        }
        respond(t) {
          switch ((this.active && this.setCursor("active"), t.kind)) {
            case "drag":
              if (!this.active) return;
              return this.tryMove(t.delta);
            case "dragEnd":
              if (!this.active) return;
              return this.reset();
          }
          return this.respondGlobalDrag(t);
        }
        respondGlobalDrag(t) {
          if (this.config.globalDragEnabled)
            switch (t.kind) {
              case "rightDrag":
                return this.tryMove(t.delta);
              case "rightDragEnd":
                return this.reset();
            }
        }
        tryMove(t) {
          this.setCursor("moving"),
            this.mover.moving ? this.mover.move(t) : this.mover.start();
        }
        reset() {
          return this.setCursor(this.active ? "active" : ""), this.mover.end();
        }
      }
      var s = n("6166"),
        c = n("d03e"),
        l = n("1344");
      class d {
        constructor(t, e) {
          (this.internalValue = e), (this.normalize = t);
        }
        set value(t) {
          this.internalValue = this.normalize(t);
        }
        get value() {
          return this.internalValue;
        }
      }
      const h = (t, e, n) => {
        const i = n ? n.x : -t[0][2],
          r = n ? n.y : -t[1][2],
          a = 1 / e;
        return [
          [t[0][0] * a, t[0][1] * a, t[0][2] * a - i * a + i],
          [t[1][0] * a, t[1][1] * a, t[1][2] * a - r * a + r],
          [0, 0, 1],
        ];
      };
      class u {
        constructor(t, e) {
          (this.events = Object(l["a"])()),
            (this.reset = () => {
              this.factor.value = 1;
              const t = this.contextManager.context.initialResCoord;
              return (
                this.contextManager.context.facts.coord.res === t ||
                  (this.updateCoord(t), this.broadcast()),
                this
              );
            }),
            (this.config = t),
            (this.contextManager = e),
            (this.factor = new d(
              (e) => Object(c["b"])(e, 1, t.maxFactor),
              t.defaultFactor
            )),
            e.context.events.on("INITIALIZED", this.reset);
        }
        teardown() {
          this.contextManager.context.events.off("INITIALIZED", this.reset);
        }
        zoomIn(t) {
          this.zoom({ delta: this.config.delta, center: t });
        }
        zoomOut(t) {
          this.zoom({ delta: 1 / this.config.delta, center: t });
        }
        zoom(t) {
          const { delta: e, center: n } = t,
            i = n || this.getViewportCenter(),
            r = this.factor.value;
          if (
            ((this.factor.value = Number.parseFloat(
              (this.factor.value * e).toPrecision(4)
            )),
            r === this.factor.value)
          )
            return;
          if (1 === this.factor.value) return void this.reset();
          const a = h(
            this.contextManager.context.facts.coord.res,
            this.factor.value / r,
            i
          );
          this.updateCoord(a), this.broadcast();
        }
        getViewportCenter() {
          const { width: t, height: e } =
              this.contextManager.context.facts.rect,
            { dom: n, res: i } = this.contextManager.context.facts.coord,
            r = { x: t / 2, y: e / 2 };
          return Object(s["e"])(r, n, i);
        }
        broadcast() {
          const t = this.factor.value;
          1 === t && this.events.emit("reset"), this.events.emit("scale", t);
        }
        updateCoord(t) {
          const e = Object.assign(
              Object.assign({}, this.contextManager.context.facts.coord),
              { res: t }
            ),
            n = Object.assign(
              Object.assign({}, this.contextManager.context.facts),
              { coord: e }
            );
          this.contextManager.updateContext({ facts: n });
        }
      }
      class f extends a["a"] {
        constructor(t, e) {
          super(), (this.name = "zoomer"), (this.config = t), (this.zoomer = e);
        }
        respond(t) {
          switch (t.kind) {
            case "wheel":
              return this.mouseZoom(t);
            case "press":
              return this.handleKeyPress(t);
          }
          if (this.active)
            switch ((this.setCursor(), t.kind)) {
              case "click":
                return "in" === this.mode
                  ? this.zoomer.zoomIn(t.point)
                  : this.zoomer.zoomOut(t.point);
              case "contextmenu":
                return "out" === this.mode
                  ? this.zoomer.zoomIn(t.point)
                  : this.zoomer.zoomOut(t.point);
            }
        }
        handleKeyPress(t) {
          switch (t.value) {
            case "+":
              return void this.zoomer.zoomIn();
            case "-":
              return void this.zoomer.zoomOut();
          }
        }
        mouseZoom(t) {
          const e = t.delta.y < 0 ? 1 / this.config.delta : this.config.delta;
          return this.zoomer.zoom({ delta: e, center: t.point });
        }
      }
      const p = {
          delta: 1.1,
          defaultFactor: 1,
          maxFactor: 5,
          globalDragEnabled: !0,
          moveAfterScale: !0,
        },
        b = (t) => ({
          id: "zoomer",
          setup({ annotator: e, contextManager: n }) {
            const i = Object.assign(Object.assign({}, p), t),
              a = new u(i, n),
              s = new f(i, a),
              c = new r(i, n),
              l = new o(i, c);
            return (
              e.pushTool(s),
              e.pushTool(l),
              {
                zoomer: a,
                mover: c,
                teardown: () => {
                  a.teardown(), c.teardown();
                },
              }
            );
          },
        });
    },
    e58c: function (t, e, n) {
      "use strict";
      var i = n("fc6a"),
        r = n("a691"),
        a = n("50c4"),
        o = n("a640"),
        s = n("ae40"),
        c = Math.min,
        l = [].lastIndexOf,
        d = !!l && 1 / [1].lastIndexOf(1, -0) < 0,
        h = o("lastIndexOf"),
        u = s("indexOf", { ACCESSORS: !0, 1: 0 }),
        f = d || !h || !u;
      t.exports = f
        ? function (t) {
            if (d) return l.apply(this, arguments) || 0;
            var e = i(this),
              n = a(e.length),
              o = n - 1;
            for (
              arguments.length > 1 && (o = c(o, r(arguments[1]))),
                o < 0 && (o = n + o);
              o >= 0;
              o--
            )
              if (o in e && e[o] === t) return o || 0;
            return -1;
          }
        : l;
    },
    e66a: function (t, e) {},
    e91f: function (t, e, n) {
      "use strict";
      var i = n("ebb5"),
        r = n("4d64").indexOf,
        a = i.aTypedArray,
        o = i.exportTypedArrayMethod;
      o("indexOf", function (t) {
        return r(a(this), t, arguments.length > 1 ? arguments[1] : void 0);
      });
    },
    eab8: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      }),
        n.d(e, "b", function () {
          return r;
        });
      const i = (t, e) => {
          if (t === e) return !0;
          if (typeof t !== typeof e || null == t || null == e) return !1;
          if (null == t || "object" !== typeof t) return t === e;
          if (Array.isArray(t) && Array.isArray(e))
            return t.length === e.length && t.every((t, n) => t === e[n]);
          const n = Object.keys(t),
            i = Object.keys(e);
          return n.length === i.length && n.every((n) => t[n] === e[n]);
        },
        r = (t, e, n = "asc") => {
          const i = "asc" === n ? 1 : -1,
            r = t
              .map((t, n) => ({ score: e(t), i: n }))
              .sort((t, e) => (t.score > e.score ? i : -i));
          return r.map((e) => t[e.i]);
        };
    },
    eb1c: function (t, e, n) {
      "use strict";
      var i = n("973c"),
        r = n.n(i);
      r.a;
    },
    ebb5: function (t, e, n) {
      "use strict";
      var i,
        r = n("a981"),
        a = n("83ab"),
        o = n("da84"),
        s = n("861d"),
        c = n("5135"),
        l = n("f5df"),
        d = n("9112"),
        h = n("6eeb"),
        u = n("9bf2").f,
        f = n("e163"),
        p = n("d2bb"),
        b = n("b622"),
        g = n("90e3"),
        v = o.Int8Array,
        m = v && v.prototype,
        y = o.Uint8ClampedArray,
        x = y && y.prototype,
        w = v && f(v),
        _ = m && f(m),
        O = Object.prototype,
        A = O.isPrototypeOf,
        k = b("toStringTag"),
        E = g("TYPED_ARRAY_TAG"),
        j = r && !!p && "Opera" !== l(o.opera),
        I = !1,
        C = {
          Int8Array: 1,
          Uint8Array: 1,
          Uint8ClampedArray: 1,
          Int16Array: 2,
          Uint16Array: 2,
          Int32Array: 4,
          Uint32Array: 4,
          Float32Array: 4,
          Float64Array: 8,
        },
        S = function (t) {
          var e = l(t);
          return "DataView" === e || c(C, e);
        },
        T = function (t) {
          return s(t) && c(C, l(t));
        },
        M = function (t) {
          if (T(t)) return t;
          throw TypeError("Target is not a typed array");
        },
        R = function (t) {
          if (p) {
            if (A.call(w, t)) return t;
          } else
            for (var e in C)
              if (c(C, i)) {
                var n = o[e];
                if (n && (t === n || A.call(n, t))) return t;
              }
          throw TypeError("Target is not a typed array constructor");
        },
        D = function (t, e, n) {
          if (a) {
            if (n)
              for (var i in C) {
                var r = o[i];
                r && c(r.prototype, t) && delete r.prototype[t];
              }
            (_[t] && !n) || h(_, t, n ? e : (j && m[t]) || e);
          }
        },
        L = function (t, e, n) {
          var i, r;
          if (a) {
            if (p) {
              if (n) for (i in C) (r = o[i]), r && c(r, t) && delete r[t];
              if (w[t] && !n) return;
              try {
                return h(w, t, n ? e : (j && v[t]) || e);
              } catch (s) {}
            }
            for (i in C) (r = o[i]), !r || (r[t] && !n) || h(r, t, e);
          }
        };
      for (i in C) o[i] || (j = !1);
      if (
        (!j || "function" != typeof w || w === Function.prototype) &&
        ((w = function () {
          throw TypeError("Incorrect invocation");
        }),
        j)
      )
        for (i in C) o[i] && p(o[i], w);
      if ((!j || !_ || _ === O) && ((_ = w.prototype), j))
        for (i in C) o[i] && p(o[i].prototype, _);
      if ((j && f(x) !== _ && p(x, _), a && !c(_, k)))
        for (i in ((I = !0),
        u(_, k, {
          get: function () {
            return s(this) ? this[E] : void 0;
          },
        }),
        C))
          o[i] && d(o[i], E, i);
      t.exports = {
        NATIVE_ARRAY_BUFFER_VIEWS: j,
        TYPED_ARRAY_TAG: I && E,
        aTypedArray: M,
        aTypedArrayConstructor: R,
        exportTypedArrayMethod: D,
        exportTypedArrayStaticMethod: L,
        isView: S,
        isTypedArray: T,
        TypedArray: w,
        TypedArrayPrototype: _,
      };
    },
    f72c: function (t, e) {
      t.exports = function (t) {
        (t.options.__i18n = t.options.__i18n || []),
          t.options.__i18n.push(
            '{"brush-size":"画笔大小","eraser-size":"橡皮擦大小"}'
          ),
          delete t.options._Ctor;
      };
    },
    f7f3: function (t, e, n) {
      var i = n("b6f9");
      "string" === typeof i && (i = [[t.i, i, ""]]),
        i.locals && (t.exports = i.locals);
      var r = n("499e").default;
      r("077f7428", i, !0, { sourceMap: !1, shadowMode: !1 });
    },
    f882: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return l;
      });
      var i = n("d03e"),
        r = n("2d45");
      const a = 3,
        o = 1 << a,
        s = 32768,
        c = (t) => {
          const e = t % 4;
          return e ? t + (4 - e) : t;
        };
      class l {
        constructor(t) {
          this.rows = 1 + (t >> a);
          const e = new ArrayBuffer(c(this.rows));
          (this.bin = new Uint8Array(e)), (this.size = t);
        }
        set(t, e) {
          const n = t >> a,
            i = t % o;
          let r = 1 << i;
          e ? (this.bin[n] |= r) : ((r ^= 255), (this.bin[n] &= r));
        }
        get(t) {
          const e = t >> a,
            n = t % o,
            i = 1 << n;
          return (this.bin[e] & i) > 0;
        }
        resizeTo(t) {
          if (t <= this.size) return;
          const e = new ArrayBuffer(c(this.rows));
          (this.bin = new Uint8Array(e)), (this.size = t);
        }
        ones(t, e = { start: { row: 0 }, end: { row: this.rows + 1 } }) {
          let n = e.start.row,
            i = 0,
            r = 1;
          for (; n <= e.end.row; n++) {
            const e = this.bin[n];
            if (0 !== e)
              for (i = 0; i < o; i++)
                (r = 1 << i), (e & r) > 0 && t((n << a) + i);
          }
        }
        asyncOnes(t) {
          const e = this.makeBatches();
          this.ones(t, e.shift());
          const n = e.map((e) =>
            Object(r["h"])(() => {
              this.ones(t, e);
            })
          );
          return Object(r["f"])(n);
        }
        makeBatches(t = s) {
          if (this.rows <= t)
            return [{ start: { row: 0 }, end: { row: this.rows } }];
          const e = Object(i["a"])(this.rows, s);
          return e.map((e) => ({
            start: { row: e },
            end: { row: Math.min(e + t, this.rows) },
          }));
        }
      }
    },
    f8a5: function (t, e) {
      function n(t) {
        "number" !== typeof t && (t = 1e-10);
        var e = {
          epsilon: function (e) {
            return "number" === typeof e && (t = e), t;
          },
          pointAboveOrOnLine: function (e, n, i) {
            var r = n[0],
              a = n[1],
              o = i[0],
              s = i[1],
              c = e[0],
              l = e[1];
            return (o - r) * (l - a) - (s - a) * (c - r) >= -t;
          },
          pointBetween: function (e, n, i) {
            var r = e[1] - n[1],
              a = i[0] - n[0],
              o = e[0] - n[0],
              s = i[1] - n[1],
              c = o * a + r * s;
            if (c < t) return !1;
            var l = a * a + s * s;
            return !(c - l > -t);
          },
          pointsSameX: function (e, n) {
            return Math.abs(e[0] - n[0]) < t;
          },
          pointsSameY: function (e, n) {
            return Math.abs(e[1] - n[1]) < t;
          },
          pointsSame: function (t, n) {
            return e.pointsSameX(t, n) && e.pointsSameY(t, n);
          },
          pointsCompare: function (t, n) {
            return e.pointsSameX(t, n)
              ? e.pointsSameY(t, n)
                ? 0
                : t[1] < n[1]
                ? -1
                : 1
              : t[0] < n[0]
              ? -1
              : 1;
          },
          pointsCollinear: function (e, n, i) {
            var r = e[0] - n[0],
              a = e[1] - n[1],
              o = n[0] - i[0],
              s = n[1] - i[1];
            return Math.abs(r * s - o * a) < t;
          },
          linesIntersect: function (e, n, i, r) {
            var a = n[0] - e[0],
              o = n[1] - e[1],
              s = r[0] - i[0],
              c = r[1] - i[1],
              l = a * c - o * s;
            if (Math.abs(l) < t) return !1;
            var d = e[0] - i[0],
              h = e[1] - i[1],
              u = (s * h - c * d) / l,
              f = (a * h - o * d) / l,
              p = { alongA: 0, alongB: 0, pt: [e[0] + u * a, e[1] + u * o] };
            return (
              (p.alongA =
                u <= -t
                  ? -2
                  : u < t
                  ? -1
                  : u - 1 <= -t
                  ? 0
                  : u - 1 < t
                  ? 1
                  : 2),
              (p.alongB =
                f <= -t
                  ? -2
                  : f < t
                  ? -1
                  : f - 1 <= -t
                  ? 0
                  : f - 1 < t
                  ? 1
                  : 2),
              p
            );
          },
          pointInsideRegion: function (e, n) {
            for (
              var i = e[0],
                r = e[1],
                a = n[n.length - 1][0],
                o = n[n.length - 1][1],
                s = !1,
                c = 0;
              c < n.length;
              c++
            ) {
              var l = n[c][0],
                d = n[c][1];
              d - r > t != o - r > t &&
                ((a - l) * (r - d)) / (o - d) + l - i > t &&
                (s = !s),
                (a = l),
                (o = d);
            }
            return s;
          },
        };
        return e;
      }
      t.exports = n;
    },
    f8cd: function (t, e, n) {
      var i = n("a691");
      t.exports = function (t) {
        var e = i(t);
        if (e < 0) throw RangeError("The argument can't be less than 0");
        return e;
      };
    },
    fa2b: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      var i = n("20fd");
      class r extends i["a"] {
        constructor(t) {
          super(), (this.srcTool = t);
        }
        respond(t) {
          if (this.active) return this.doRespond(t);
        }
        doRespond(t) {}
        getEditingShape() {}
      }
    },
    fc4e: function (t, e, n) {
      t.exports = n.p + "img/brush.bfbcca9c.svg";
    },
    fcef: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return s;
      }),
        n.d(e, "a", function () {
          return c;
        }),
        n.d(e, "c", function () {
          return l;
        });
      var i = n("6166"),
        r = n("acc5"),
        a = n("49d5"),
        o = n("69af");
      class s {
        constructor(t, e, n) {
          (this.nextId = t),
            (this.domToRes = e),
            (this.broadcast = n),
            (this.points = []),
            (this.finished = !1),
            (this.getPoints = Object(o["c"])(
              () => [this.nowPoint, this.points],
              (t, e) => {
                if (!t || !e.length) return a["a"];
                const n = this.readyToClose(t) ? this.points[0] : t;
                return this.points.concat(n);
              }
            ));
        }
        get doing() {
          return this.points.length > 0;
        }
        setPoints(t) {
          t.length || this.broadcast("abort"), (this.points = t);
        }
        push(t) {
          if (this.readyToClose(t)) return this.finish();
          if (this.isClosePoint(t)) return;
          const e = !this.doing;
          (this.nowPoint = t),
            (this.points = this.points.concat(t)),
            e && this.broadcast("creating", this.guessShape());
        }
        stop() {
          return (
            !!this.doing &&
            (this.nowPoint && this.broadcast("abort"),
            (this.points = []),
            (this.nowPoint = void 0),
            !0)
          );
        }
        finish() {
          if (!this.isLegalShape()) return;
          const t = this.nextId(),
            e = this.guessShape(t);
          return this.broadcast("created", e), this.stop(), e;
        }
        guessShape(t = "") {
          return {
            id: t,
            alias: t,
            points: this.points,
            center: Object(r["f"])(this.points),
          };
        }
        readyToClose(t) {
          return !!this.isLegalShape() && this.isClosePoint(t);
        }
        isClosePoint(t) {
          return (
            !!this.doing && Object(i["b"])(this.points[0], t) < this.domToRes(5)
          );
        }
        isLegalShape() {
          return this.points.length >= 3;
        }
      }
      class c {
        constructor(t, e) {
          (this.hitTest = t), (this.mutate = e);
        }
        get doing() {
          return !!this.beforeMove;
        }
        push(t, e, n) {
          if (t.length && e)
            return this.doing ? this.move(n.delta) : this.start(t, e, n.start);
        }
        start(t, e, n) {
          const i = t.find((t) => t.id === e && this.hitTest(t, n));
          if (i) return (this.id = e), (this.beforeMove = t), t;
          this.stop();
        }
        move(t) {
          if (!this.beforeMove) return this.beforeMove;
          const e = this.beforeMove.find((t) => t.id === this.id);
          if (!e) return this.beforeMove;
          const n = this.mutate(e, t);
          return this.beforeMove.reduce(
            (t, e) => (e.id === n.id ? t.concat(n) : t.concat(e)),
            []
          );
        }
        stop(t) {
          if (!this.doing) return;
          const e = this.beforeMove,
            n = t ? this.move(t.delta) : this.beforeMove;
          return (
            (this.id = void 0),
            (this.beforeMove = void 0),
            n ? { next: n, prev: e } : void 0
          );
        }
        moveByArrowKey(t, e, n) {
          this.stop(), (this.beforeMove = e), (this.id = n);
          const i = this.move(t);
          return i ? { next: i, prev: e } : void 0;
        }
      }
      class l {
        constructor(t, e) {
          (this.getFixed = t), (this.doResize = e);
        }
        get doing() {
          return !!this.fixed;
        }
        push(t, e, n) {
          if (e)
            return this.doing
              ? this.resize(n.current)
              : this.start(t, e, n.start);
        }
        start(t, e, n) {
          const i = t.find((t) => t.id === e);
          if (!i) return;
          const r = this.getFixed(i, n);
          return r
            ? ((this.id = e), (this.beforeResize = t), (this.fixed = r), t)
            : void 0;
        }
        stop(t) {
          if (!this.doing) return;
          const e = t ? this.resize(t.current) : void 0,
            n = this.beforeResize;
          return (
            (this.id = void 0),
            (this.fixed = void 0),
            (this.beforeResize = void 0),
            e ? { next: e, prev: n } : void 0
          );
        }
        resize(t) {
          if (this.fixed && this.beforeResize && this.id)
            return this.beforeResize.reduce((e, n) => {
              if (n.id === this.id) {
                const i = this.doResize(this.fixed, t);
                return e.concat(Object.assign(Object.assign({}, n), i));
              }
              return e.concat(n);
            }, []);
        }
        finish() {
          this.stop();
        }
      }
    },
    fd1b: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return l;
      });
      n("b680");
      var i = n("8165"),
        r = n("1b68"),
        a = n("e1ec");
      n("a4d3"), n("e01a"), n("d3b7");
      function o(t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : Symbol();
        return function () {
          var n = Object(i["inject"])(e, null);
          return n || ((n = t()), Object(i["provide"])(e, n)), n;
        };
      }
      var s = function (t) {
          return void 0 === t ? "" : "".concat((100 * t).toFixed(2));
        },
        c = function () {
          var t = Object(a["a"])(),
            e = Object(r["a"])(),
            n = e.filters,
            o = Object(i["computed"])(function () {
              return t.isAdversarialDataset;
            }),
            c = Object(i["reactive"])({
              file: void 0,
              enabled: o,
              isAdversarial: !!o.value && 1 !== n.value.adversarialType,
            }),
            l = Object(i["reactive"])({
              advTip: Object(i["computed"])(function () {
                if (c.file)
                  return 1 !== c.file.ssim || c.file.psnr
                    ? void 0
                    : "对该图片攻击未成功，说明该模型在当前场景具有一定的安全性和鲁棒性";
              }),
              ssimPercent: Object(i["computed"])(function () {
                if (c.file) return s(c.file.ssim);
              }),
            });
          return {
            state: c,
            cstate: l,
            switchMode: function (t) {
              c.isAdversarial = t;
            },
          };
        },
        l = o(c);
    },
  },
]);
//# sourceMappingURL=chunk-360cc55d.0107fa31.js.map
