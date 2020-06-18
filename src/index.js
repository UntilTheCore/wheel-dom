const div1 = document.querySelector('#div1')
const newDiv = dom.create('<div>我是节点a</div>')
console.dir(div1)
dom.append(div1, newDiv)
const insert_before = dom.create('<div>我是节点b，在节点"a"前面插入</div>')
dom.before(newDiv, insert_before)
const insert_after = dom.create('<div>我是节点c，在节点"b"后面插入</div>')
dom.after(insert_before, insert_after)

// 创建一个节点d，然后将d作为a的父节点
const d = dom.create('<div>d</div>')
dom.wrap(d, newDiv)

// 删除节点 a
let remove_a = dom.remove(newDiv)
const div_empty = document.querySelector('#empty')
let empty = dom.empty(div_empty)
// console.log(empty)

// 属性设置和获取属性
dom.attr(div_empty, 'title', 'helloworld!')
console.log(div_empty)
let attr = dom.attr(div_empty, 'title')
console.log(attr)

// 设置节点text内容
dom.text(div_empty, '空节点')
console.log(dom.text(div_empty))

dom.style(div_empty, 'color', 'red')
dom.style(div_empty, { border: '5px solid red', color: 'green' })
console.log(dom.style(div_empty, 'color'))

// 设置类样式
dom.class.add(div_empty, 'a')
dom.class.remove(div_empty, 'a')
console.log(dom.class.has(div_empty, 'a'))

// 设置和取消事件监听函数
let fn = () => {
	console.log('被点击了！')
}
dom.on(div_empty, 'click', fn)
dom.off(div_empty, 'click', fn)

// 查找元素
let bd = dom.find('body')
let _find = dom.find('#find', bd[0])
console.log(_find)

// 找父亲节点
let find1 = dom.find('.fd1', _find[0])
let fd1Parent = dom.parent(find1[0])
console.log(fd1Parent)

// 找子元素
let findChildren = dom.children(_find[0])
console.log(findChildren)

// 找所有兄弟节点
let fd2 = dom.find('.fd2')[0]
let find2Siblings = dom.siblings(fd2)
console.log(find2Siblings)

// 找到下一个节点
let fd2NextNode = dom.next(fd2)
console.log(fd2NextNode)

// 找到上一个节点
let fd2PreviousNode = dom.previous(fd2)
console.log(fd2PreviousNode)

// 遍历这个节点下的元素
dom.each(_find[0].children, (item) => {
	console.log(item)
})

// 获取节点的下标
let nodeIndex = dom.index(fd2)
console.log(nodeIndex)
