export function TreeFind (tree = {}, func) {
  let _member = tree.member || []
  let _node = tree.node || []
  let _memberResult = _member.find(func)
  if (_memberResult) return _memberResult
  for (let i = 0; i < _node.length; i++) {
    let _nodeResult = TreeFind(_node[i], func)
    if (_nodeResult) return _nodeResult
  }
  return undefined
}

export function TreeFlat (tree, func) {
  let _member = tree.member || []
  let _node = tree.node || []
  let _result = []
  _result = _result.concat(_member.map(func))
  _node.forEach((item) => {
    _result = _result.concat(TreeFlat(item, func))
  })
  return _result
}
