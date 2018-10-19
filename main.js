var result = `/* 
* 面试官你好，我是XXX
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
 transition: all 1s;
}
html{
 background: #eee;
}
#code{
 width: 100%;
 overflow: hidden;
 border: 1px solid #aaa;
 padding: 16px;
 margin:10px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code{
    position:fixed;
    left:0;
    width:48%;
    height:100%;
}
`
var result2 = `
#paper{
    position:fixed;
    right:0;
    width:48%;
    height:100%;
    background:#eee;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:10px;
    margin:10px;
}
#paper .content{
    background:white;
    height:100%;
    width:100%;
    padding:10px;
    border: 1px solid red;
}
/* 接下来用一个优秀的库 marked.js
   把 Markdown 变成 HTML
 */
`
var markdown = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
var result3 = `
/*
  这就是我的会动的简历
  谢谢观看
*/
`

writeCode('', result, () => {
    addpaper(() => {
        writeCode(result, result2, () => {
            writeMarkdown(markdown, () => {
                convertMarkdownToHtml(()=>{
                    writeMarkdown(result+result2,result3,()=>{
                        console.log('完成')
                    })
                })
            })
        })
    })
})
function addpaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n++
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = 1000000
        if (n >= code.length) {
            window.clearInterval(id)
           fn && fn.call()
        }
    }, 10)
}

function writeMarkdown(mkdown, fn) {
    let domPaper = document.querySelector('#paper .content')
    let n = 0
    let id = setInterval(() => {
        n++
        domPaper.innerHTML = mkdown.substring(0, n)
        domPaper.scrollTop = 1000000
        if (n >= mkdown.length) {
            window.clearInterval(id)
           fn && fn.call()
        }
    }, 10)
}
function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(markdown)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}