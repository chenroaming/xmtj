// 升序排序
/**
 *
 * @param {升序的数组} ary
 * @param {根据的字段} clom
 */
export function sortNum(ary, clom) {
  // 根據距離遠近排序，越近在前面，升序
  ary.sort((a, b) => {
    if (a[clom] < b[clom]) {
      return -1
    } else if (a[clom] == b[clom]) {
      return 0
    } else {
      return 1
    }
  })
  return ary
}

/**
 *
 * @param {要插入目标元素后面的新元素} newElement
 * @param {目标元素} targetElement
 */
export function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode
  if (parent.lastChild == targetElement) {
    // 如果最后的节点是目标元素，则直接添加。因为默认是最后
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
    // 如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
  }
}

/**
 * @description 身份证算出出生年月和性别
 * @param [string] 身份证号码
 */

export function tools_calcIdentiyInfo(str) {
  // 获取性别
  const sex = parseInt(str.substr(16, 1)) % 2 == 1 ? '男' : '女'
  const brith = str.substring(6, 10) + '-' + str.substring(10, 12) + '-' + str.substring(12, 14)
  const obj = {
    sex: sex,
    birth: brith
  }
  return obj
}

// 获取指定值的在数组的index值
export const findArrayIndexByKey = function(arrayStr, key, value) {
  return arrayStr.findIndex(function(item) {
    return item[key] == value
  })
}

/**
 * 计算当前月份的天数
 */
export const monthDay = () => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  return new Date(year, month, 0).getDate()
}
