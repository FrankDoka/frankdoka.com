"use strict";exports.id=6723,exports.ids=[6723],exports.modules={46723:(a,b,c)=>{c.r(b),c.d(b,{GET:()=>k});var d=c(29279),e=c(29021),f=c.n(e),g=c(33873),h=c.n(g);let i="https://www.frankdoka.com";function j(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}async function k(){let a=(await (0,d.i)()).sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).map(a=>{let b=function(a){let b=h().join(process.cwd(),"src/app/blog",a,"page.mdx");try{return f().readFileSync(b,"utf-8").replace(/^import\s.+$/gm,"").replace(/^export\s.+$/gm,"").replace(/\{\/\*.*?\*\/\}/gs,"").replace(/```[\s\S]*?```/g,a=>a).trim()}catch{return""}}(a.href.replace("/blog/",""));return`    <item>
      <title>${j(a.title)}</title>
      <link>${i}${a.href}</link>
      <guid isPermaLink="true">${i}${a.href}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${j(a.description)}</description>${b?`
      <content:encoded><![CDATA[${b}]]></content:encoded>`:""}${a.tags?.length?a.tags.map(a=>`
      <category>${j(a)}</category>`).join(""):""}
    </item>`}).join("\n");return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Frank Doka — Build Logs &amp; Deep Dives</title>
    <link>${i}/blog</link>
    <description>Project deep-dives, build logs, and lessons learned from cloud infrastructure and DevOps work.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${i}/feed.xml" rel="self" type="application/rss+xml"/>
${a}
  </channel>
</rss>`,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}}};