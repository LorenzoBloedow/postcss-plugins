"use strict";var e=require("postcss-value-parser"),r=require("@csstools/cascade-layer-name-parser");const t=r.parse("csstools-implicit-layer")[0];function collectCascadeLayerOrder(e){const o=new Map,n=new Map,s=[];e.walkAtRules((e=>{var a;if("layer"!==e.name.toLowerCase())return;{let r=e.parent;for(;r;){if("atrule"!==r.type||"layer"!==r.name.toLowerCase()){if(r===e.root())break;return}r=r.parent}}let l;if(e.nodes)l=normalizeLayerName(e.params,1);else{if(!e.params.trim())return;l=e.params}let i=r.parse(l);if(null!=(a=i)&&a.length){{let r=e.parent;for(;r&&"atrule"===r.type&&"layer"===r.name.toLowerCase();){const e=n.get(r);e?(i=i.map((r=>e.concat(r))),r=r.parent):r=r.parent}}if(r.addLayerToModel(s,i),e.nodes){const r=i[0].concat(t);o.set(e,r),n.set(e,i[0])}}}));for(const e of o.values())r.addLayerToModel(s,[e]);const a=new WeakMap;for(const[e,r]of o)a.set(e,s.findIndex((e=>r.equal(e))));return a}function cascadeLayerNumberForNode(e,r){return e.parent&&"atrule"===e.parent.type&&"layer"===e.parent.name.toLowerCase()?r.has(e.parent)?r.get(e.parent):-1:1/0}function normalizeLayerName(e,r){return e.trim()?e:"csstools-anon-layer--"+r++}const o=/(!\s*)?postcss-custom-properties:\s*off\b/i,n=new WeakMap;function isBlockIgnored(e){if(!e||!e.nodes)return!1;if(n.has(e))return n.get(e);const r=e.some((e=>isIgnoreComment(e,o)));return n.set(e,r),r}const s=/(!\s*)?postcss-custom-properties:\s*ignore\s+next\b/i;function isDeclarationIgnored(e){return!!e&&(!!isBlockIgnored(e.parent)||isIgnoreComment(e.prev(),s))}function isIgnoreComment(e,r){return!!e&&"comment"===e.type&&r.test(e.text)}const a=new Set(["layer"]);function isProcessableRule(e){if(!isHtmlRule(e)&&!isRootRule(e))return!1;let r=e.parent;for(;r;){if("atrule"===r.type&&!a.has(r.name.toLowerCase()))return!1;r=r.parent}return!0}const l=/^html$/i,i=/^:root$/i;function isHtmlRule(e){return e.selectors.some((e=>l.test(e)))&&e.nodes&&e.nodes.length}function isRootRule(e){return e.selectors.some((e=>i.test(e)))&&e.nodes&&e.nodes.length}const c=/^var$/i;function isVarFunction(e){return"function"===e.type&&c.test(e.value)&&Object(e.nodes).length>0}function removeCyclicReferences(e,r){const t=new Set;let o=r;for(;e.size>0;)try{toposort(Array.from(e.keys()),o);break}catch(r){if(!r._graphNode)throw r;e.delete(r._graphNode),t.add(r._graphNode),o=o.filter((e=>-1===e.indexOf(r._graphNode)))}return t}function toposort(e,r){let t=e.length;const o=new Array(t),n={};let s=t;const a=makeOutgoingEdges(r),l=makeNodesHash(e);for(;s--;)n[s]||visit(e[s],s,new Set);return o;function visit(e,r,s){if(s.has(e)){const r=new Error("Cyclic dependency"+JSON.stringify(e));throw r._graphNode=e,r}if(!l.has(e))return;if(n[r])return;n[r]=!0;let i=a.get(e)||new Set;if(i=Array.from(i),r=i.length){s.add(e);do{const e=i[--r];visit(e,l.get(e),s)}while(r);s.delete(e)}o[--t]=e}}function makeOutgoingEdges(e){const r=new Map;for(let t=0,o=e.length;t<o;t++){const o=e[t];r.has(o[0])||r.set(o[0],new Set),r.has(o[1])||r.set(o[1],new Set),r.get(o[0]).add(o[1])}return r}function makeNodesHash(e){const r=new Map;for(let t=0,o=e.length;t<o;t++)r.set(e[t],t);return r}function getCustomPropertiesFromRoot(r){const t=new Map,o=new Map,n=new Map,s=new Map,a=new Map,l=collectCascadeLayerOrder(r);r.walkRules((e=>{isProcessableRule(e)&&(isBlockIgnored(e)||(isHtmlRule(e)?e.each((e=>{if("decl"!==e.type)return;if(!e.variable||isDeclarationIgnored(e))return;if("initial"===e.value.toLowerCase().trim())return;const r=cascadeLayerNumberForNode(e,l),o=s.get(e.prop)??-1;r&&r>=o&&(s.set(e.prop,r),t.set(e.prop,e.value))})):isRootRule(e)&&e.each((e=>{if("decl"!==e.type)return;if(!e.variable||isDeclarationIgnored(e))return;if("initial"===e.value.toLowerCase().trim())return;const r=cascadeLayerNumberForNode(e,l),t=a.get(e.prop)??-1;r&&r>=t&&(a.set(e.prop,r),o.set(e.prop,e.value))}))))}));for(const[e,r]of t.entries())n.set(e,r);for(const[e,r]of o.entries())n.set(e,r);const i=[],c=new Map;for(const[r,t]of n.entries()){const o=e(t);e.walk(o.nodes,(e=>{if(isVarFunction(e)){const[t]=e.nodes.filter((e=>"word"===e.type));i.push([t.value,r])}})),c.set(r,e(t))}return removeCyclicReferences(c,i),c}function transformValueAST(r,t){if(r.nodes&&r.nodes.length){const o=new Map;r.nodes.forEach((e=>{o.set(e,r)})),e.walk(r.nodes,(e=>{"nodes"in e&&e.nodes.length&&e.nodes.forEach((r=>{o.set(r,e)}))})),e.walk(r.nodes,(r=>{if(!isVarFunction(r))return;const[n,...s]=r.nodes.filter((e=>"div"!==e.type)),{value:a}=n,l=o.get(r);if(!l)return;const i=l.nodes.indexOf(r);if(-1===i)return;let c=!1;s&&e.walk(s,(e=>{if(isVarFunction(e)){const[r]=e.nodes.filter((e=>"word"===e.type));if(t.has(r.value))return;return c=!0,!1}}));let u=[];if(t.has(a)){var p;u=(null==(p=t.get(a))?void 0:p.nodes)??[]}else{if(!s.length||c)return;u=r.nodes.slice(r.nodes.indexOf(s[0]))}u.length?(l.nodes.splice(i,1,...u),l.nodes.forEach((e=>o.set(e,l)))):(l.nodes.splice(i,1,{type:"comment",value:"",sourceIndex:r.sourceIndex,sourceEndIndex:r.sourceEndIndex}),l.nodes.forEach((e=>o.set(e,l))))}),!0)}return r.toString()}var transformProperties=(r,t,o)=>{if(isTransformableDecl(r)&&!isDeclarationIgnored(r)){const a=r.value;let l=transformValueAST(e(a),t);const i=new Set;for(;l.includes("--")&&l.toLowerCase().includes("var(")&&!i.has(l);){i.add(l);l=transformValueAST(e(l),t)}if(l!==a){if(parentHasExactFallback(r,l))return void(o.preserve||r.remove());if(o.preserve){var n;const e=r.cloneBefore({value:l});hasTrailingComment(e)&&null!=(n=e.raws)&&n.value&&(e.raws.value.value=e.value.replace(u,"$1"),e.raws.value.raw=e.raws.value.value+e.raws.value.raw.replace(u,"$2"))}else{var s;r.value=l,hasTrailingComment(r)&&null!=(s=r.raws)&&s.value&&(r.raws.value.value=r.value.replace(u,"$1"),r.raws.value.raw=r.raws.value.value+r.raws.value.raw.replace(u,"$2"))}}}};const isTransformableDecl=e=>!e.variable&&e.value.includes("--")&&e.value.toLowerCase().includes("var("),hasTrailingComment=e=>{var r,t;return"value"in Object(Object(e.raws).value)&&"raw"in((null==(r=e.raws)?void 0:r.value)??{})&&u.test((null==(t=e.raws.value)?void 0:t.raw)??"")},u=/^([\W\w]+)(\s*\/\*[\W\w]+?\*\/)$/;function parentHasExactFallback(e,r){if(!e||!e.parent)return!1;let t=!1;const o=e.parent.index(e);return e.parent.each(((n,s)=>n!==e&&(!(s>=o)&&void("decl"===n.type&&n.prop.toLowerCase()===e.prop.toLowerCase()&&n.value===r&&(t=!0))))),t}const creator=r=>{const t=!("preserve"in Object(r))||Boolean(null==r?void 0:r.preserve);if("importFrom"in Object(r))throw new Error('[postcss-custom-properties] "importFrom" is no longer supported');if("exportTo"in Object(r))throw new Error('[postcss-custom-properties] "exportTo" is no longer supported');return{postcssPlugin:"postcss-custom-properties",prepare:()=>{let r=new Map;return{Once:e=>{r=getCustomPropertiesFromRoot(e)},Declaration:o=>{let n=r;if(t&&o.parent){let t=!1;o.parent.each((s=>{o!==s&&"decl"===s.type&&s.variable&&!isDeclarationIgnored(s)&&(t||(n=new Map(r),t=!0),"initial"!==s.value.toLowerCase().trim()?n.set(s.prop,e(s.value)):n.delete(s.prop))}))}transformProperties(o,n,{preserve:t})}}}}};creator.postcss=!0,module.exports=creator;
