window.dom = {
	create(elementString) {
		const template = document.createElement('template')
		template.innerHTML = elementString
		// 我们将新节点创建在template下面
		// 然后将创建在template下面的节点append到要被添加的节点后面
		// append的特性是移除原节点下的内容，并将这些节点内容放到新节点下。
		// 而我们创建在template下的节点是在其content.firstChild内。
		return template.content.firstChild
	},
	// 添加为子节点
	append(parentNode, node) {
		parentNode.appendChild(node)
	},
	// 添加到节点的前面
	before(sibling, node) {
		sibling.parentNode.insertBefore(node, sibling)
	},
	// 添加到节点的后面
	after(sibling, node) {
		sibling.parentNode.insertBefore(node, sibling.nextSibling)
	},
	// 将一个节点包裹住另一个节点，即给一个节点创建一个父亲
	wrap(wrapNode, wrappedNode) {
		this.before(wrappedNode, wrapNode)
		this.append(wrapNode, wrappedNode)
	},

	// 删除操作
	remove(node) {
		return node.parentNode.removeChild(node)
	},
	// 清空一个节点下的所有节点
	empty(node) {
		let child = node.firstChild
		let result = []
		while (child) {
			// 由于 = 操作符是一个浅拷贝，所以这里不能使用child来删除，只能用作判断，
			// 因为找不到parent，只能用node.firsChild
			result.push(this.remove(node.firstChild))
			child = node.firstChild
		}
		return result
	},
	// 设置属性和获取属性
	attr(node, name, value) {
		if (arguments.length === 3) {
			node.setAttribute(name, value)
		} else if (arguments.length === 2) {
			return node.getAttribute(name)
		}
	},
	// 设置节点文本内容，1 个参数是获取，2 个参数是设置
	text(node, value) {
		if (arguments.length === 2) {
			if ('innerText' in node) {
				node.innerText = value
			} else {
				node.contenText = value
			}
		} else if (arguments.length == 1) {
			return 'innerText' in node ? node.innerText : node.contenText
		}
	},
	// 设置样式：
	// 1 个参数是返回节点的style，
	// 2 个参数时，是字符串就返回样式，是对象则以键值对的方式设置样式。
	// 3 个参数是设置某个特定的样式，比如设置color
	style(node, name, value) {
		if (arguments.length === 3) {
			node.style[name] = value
		} else if (arguments.length === 2) {
			if (typeof name === 'string') {
				return node.style[name]
			} else if (name instanceof Object) {
				for (key in name) {
					node.style[key] = name[key]
				}
			}
		}
	},
	// 设置、取消、查询类样式
	class: {
		add(node, className) {
			node.classList.add(className)
		},
		remove(node, className) {
			node.classList.remove(className)
		},
		has(node, className) {
			return node.classList.contains(className)
		},
	},
	// 设置、取消监听函数
	on(node, eventName, fn) {
		node.addEventListener(eventName, fn)
	},
	off(node, eventName, fn) {
		node.removeEventListener(eventName, fn)
	},
	// 查找元素，有查找范围就在范围内找，没有就从document内找。
	find(selector, scope) {
		return (scope || document).querySelectorAll(selector)
	},
	parent(node) {
		return node.parentNode
	},
	children(node) {
		return node.children
	},
	// 找到所有兄弟节点
	siblings(node) {
		return Array.from(node.parentNode.children).filter((n) => n !== node)
	},
	next(node) {
		let x = node.nextSibling
		while (x && x.nodeType === 3) {
			x = x.nextSibling
		}
		return x
	},
	previous(node) {
		let x = node.previousSibling
		while (x && x.nodeType === 3) {
			x = x.previousSibling
		}
		return x
	},
	// 遍历节点下的所有元素
	each(nodeList, fn) {
		for (let i = 0; i < nodeList.length; i++) {
			fn.call(null, nodeList[i])
		}
	},
	// 获取当前节点的下标
	index(node) {
		const list = this.children(node.parentNode)
		let i
		for (i = 0; i < list.length; i++) {
			if (list[i] === node) {
				break
			}
		}
		return i
	},
}
