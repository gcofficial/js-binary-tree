/**
 * Create new node object.
 *
 * @param {number} key Value key.
 */
function newNode (key) {
  return {
    key,
    left: null,
    right: null
  }
}

/**
 * Standard BST insert function.
 *
 * @param {mixed} root Root node or null.
 * @param {number} key Key number.
 */
function insert (root, key) {
  if (!root) {
    root = newNode(key)
  } else if (root.key > key) {
    root.left = insert(root.left, key)
  } else if (root.key < key) {
    root.right = insert(root.right, key)
  }
  return root
}

/**
 * This function returns distance of findKey from root.
 * This function assumes that findKey exists in BST and BST is not NULL.
 *
 * @param {node} root Root node.
 * @param {number} findKey distance of this key.
 */
function distanceFromRoot (root, findKey) {
  if (root.key == findKey) {
    return 0
  } else if (root.key > findKey) {
    return 1 + distanceFromRoot(root.left, findKey)
  }
  return 1 + distanceFromRoot(root.right, findKey)
}

/**
 * Returns minimum distance between from and to.
 * This function assumes that from and to exist in BST.
 *
 * @param {*} root Root node.
 * @param {*} from key.
 * @param {*} to key.
 */
function distanceBetween (root, from, to) {
  if (!root) {
    return 0
  }

  // Both keys lie in left
  if (root.key > from && root.key > to) {
    return distanceBetween(root.left, from, to)
  }

  // Both keys lie in right
  if (root.key < from && root.key < to) {
    return distanceBetween(root.right, from, to)
  }

  // Lie in opposite directions (Root is LCA of two nodes)
  if (root.key >= from && root.key <= from) {
    return distanceFromRoot (root, from) + distanceFromRoot (root, to)
  }
}

/**
 * Travers.
 *
 * @param {node} tree Whole tree.
 * @param {Function} fn Callback.
 */
function traverse (tree, fn) {
  if (tree !== null) {
    tree.left = traverse(tree.left, fn)
    tree.right = traverse(tree.right, fn)
    tree.key = fn(tree.key, tree)
  }
  return tree
}

/**
 * Convert binary tree to array.
 *
 * @param {node} tree Whole tree.
 */
function toArray (tree) {
  let result = []
  if (tree !== null) {
    result = result.concat(tree.key)
    result = result.concat(toArray(tree.left))
    result = result.concat(toArray(tree.right))
  }
  return result
}

/**
 * Function to return the size of the tree.
 *
 * @param {node} tree root node.
 */
function sizeOfTree (tree) {
  if (tree === null) {
    return 0
  }

  return sizeOfTree(tree.left) + sizeOfTree(tree.right) + 1
} 

const exmpl = [4, 7, 3, 1, 8, 2, 6, 5].reduce(
  (root, key) => insert(root, key),
  null
)

console.log('Binary Tree', JSON.stringify(exmpl))
console.log('Size of tree', sizeOfTree(exmpl))
console.log('Traverse',  JSON.stringify(traverse(exmpl, key => key * 2)))
console.log('To array',  toArray(exmpl))
console.log('Distance from root to 2', distanceFromRoot(exmpl, 2))
console.log('Distance between 7 and 5', distanceBetween(exmpl, 7, 5))