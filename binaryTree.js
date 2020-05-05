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

const exmpl = [4, 7, 3, 1, 8, 2, 6, 5].reduce(
  (root, key) => insert(root, key),
  null
)

console.log('Binary Tree', JSON.stringify(exmpl))
console.log('Distance from root to 2', distanceFromRoot(exmpl, 2))
console.log('Distance between 7 and 5', distanceBetween(exmpl, 7, 5))