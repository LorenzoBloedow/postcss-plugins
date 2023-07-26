"use strict";var e=require("path"),o=require("@csstools/css-tokenizer"),r=require("@csstools/css-parser-algorithms");const s=/^([a-z0-9.+-]+:)?\/\//i;function rebase(o,r,t,i){if(o.startsWith("data:"))return!1;if(s.test(o))return!1;try{const e=new URL(o);if(e.port||e.protocol)return!1}catch{}const n=e.posix.join(r.replace(new RegExp(`^${t}`),i),o);return e.posix.normalize(e.posix.relative(i,n))}function serializeString(e){let o="";for(const r of e){const e=r.codePointAt(0);if(void 0!==e)switch(e){case 0:o+=String.fromCodePoint(65533);break;case 127:o+=`\\${e.toString(16)}`;break;case 34:case 39:case 92:o+=`\\${r}`;break;default:if(1<=e&&e<=31){o+=`\\${e.toString(16)} `;break}o+=r}else o+=String.fromCodePoint(65533)}return o}const t=/url\(/i,i=/url/i,creator=()=>({postcssPlugin:"postcss-rebase-url",prepare(){const s=new WeakSet;return{Declaration(n,{result:a}){var l;if(s.has(n))return;const{from:u,to:c}=a.opts;if(!c||!u)return;const p=e.posix.parse(e.posix.resolve(c)).dir,f=null==(l=n.source)?void 0:l.input.from;if(!f)return;const v=e.posix.parse(e.posix.resolve(f)).dir,d=e.posix.parse(e.posix.resolve(u)).dir;if(console.log("to\n ",p),console.log("from\n ",v),console.log("fromEntryPoint\n ",d),!t.test(n.value))return;const g=r.parseCommaSeparatedListOfComponentValues(o.tokenize({css:n.value})),m=r.replaceComponentValues(g,(e=>{if(r.isTokenNode(e)&&e.value[0]===o.TokenType.URL){const o=rebase(e.value[4].value,v,d,p);if(o)return e.value[4].value=o,e.value[1]=`url(./${serializeString(o)})`,e}if(r.isFunctionNode(e)&&i.test(e.getName()))for(const s of e.value)if(!r.isWhitespaceNode(s)&&!r.isCommentNode(s)&&r.isTokenNode(s)&&s.value[0]===o.TokenType.String){const o=rebase(s.value[4].value,v,d,p);if(o)return s.value[4].value=o,s.value[1]=`"./${serializeString(o)}"`,e;break}})),k=r.stringify(m);k!==n.value&&(n.value=k,s.add(n))}}}});creator.postcss=!0,module.exports=creator;
