import n from"path";const creator=()=>{const onceHandler=e=>o=>{var l,t,i,r;let u=null==(l=o.source)||null==(t=l.input)?void 0:t.from;u&&(u=n.relative(process.cwd(),u));let s="";s+=e,s+=`\n  index      : ${(null==(i=o.parent)?void 0:i.index(o))??"N/A"}`,s+=`\n  nodes      : ${null==(r=o.nodes)?void 0:r.length}`,s+=`\n  input.from : ${u??"N/A"}`,console.log(s+"\n")},documentHandler=e=>o=>{var l,t,i;let r=null==(l=o.source)||null==(t=l.input)?void 0:t.from;r&&(r=n.relative(process.cwd(),r));let u="";u+=e,u+=`\n  nodes      : ${null==(i=o.nodes)?void 0:i.length}`,u+=`\n  input.from : ${r??"N/A"}`,console.log(u+"\n")},atRuleHandler=e=>o=>{var l,t,i,r;let u=null==(l=o.source)||null==(t=l.input)?void 0:t.from;u&&(u=n.relative(process.cwd(),u));let s="";s+=e,s+=`\n  name       : ${o.name}`,s+=`\n  params     : ${o.params}`,s+=`\n  index      : ${(null==(i=o.parent)?void 0:i.index(o))??"N/A"}`,s+=`\n  nodes      : ${null==(r=o.nodes)?void 0:r.length}`,s+=`\n  raw        : ${JSON.stringify(o.raws)}`,s+=`\n  input.from : ${u??"N/A"}`,console.log(s+"\n")},ruleHandler=e=>o=>{var l,t,i,r;let u=null==(l=o.source)||null==(t=l.input)?void 0:t.from;u&&(u=n.relative(process.cwd(),u));let s="";s+=e,s+=`\n  selector   : ${o.selector}`,s+=`\n  index      : ${(null==(i=o.parent)?void 0:i.index(o))??"N/A"}`,s+=`\n  nodes      : ${null==(r=o.nodes)?void 0:r.length}`,s+=`\n  raw        : ${JSON.stringify(o.raws)}`,s+=`\n  input.from : ${u??"N/A"}`,console.log(s+"\n")},commentHandler=e=>o=>{var l,t,i;let r=null==(l=o.source)||null==(t=l.input)?void 0:t.from;r&&(r=n.relative(process.cwd(),r));let u="";u+=e,u+=`\n  text       : ${o.text}`,u+=`\n  index      : ${(null==(i=o.parent)?void 0:i.index(o))??"N/A"}`,u+=`\n  raw        : ${JSON.stringify(o.raws)}`,u+=`\n  input.from : ${r??"N/A"}`,console.log(u+"\n")},declHandler=e=>o=>{var l,t,i;let r=null==(l=o.source)||null==(t=l.input)?void 0:t.from;r&&(r=n.relative(process.cwd(),r));let u="";u+=e,u+=`\n  prop       : ${o.prop}`,u+=`\n  value      : ${o.value}`,u+=`\n  index      : ${(null==(i=o.parent)?void 0:i.index(o))??"N/A"}`,u+=`\n  raw        : ${JSON.stringify(o.raws)}`,u+=`\n  input.from : ${r??"N/A"}`,console.log(u+"\n")};return{postcssPlugin:"postcss-debug-logger",AtRule:atRuleHandler("AtRule"),AtRuleExit:atRuleHandler("AtRuleExit"),Comment:commentHandler("Comment"),CommentExit:commentHandler("CommentExit"),Declaration:declHandler("Declaration"),DeclarationExit:declHandler("DeclarationExit"),Document:documentHandler("Document"),DocumentExit:documentHandler("DocumentExit"),Once:onceHandler("Once"),OnceExit:onceHandler("OnceExit"),Root:onceHandler("Root"),RootExit:onceHandler("RootExit"),Rule:ruleHandler("Rule"),RuleExit:ruleHandler("RuleExit")}};creator.postcss=!0;export{creator as default};
