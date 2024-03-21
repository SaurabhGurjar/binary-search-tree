export class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    setLeft(node) {
        this.left = node;
    }
    setRight(node) {
        this.right = node;
    }
}

export default class Tree {
    constructor(arr) {
        this.array = arr;
        this.root = null;
    }

    _buildTree(start, end){
        if(start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const root = new Node(this.array[mid]);
        root.setLeft(this._buildTree(start, mid - 1));
        root.setRight(this._buildTree(mid + 1, end));
        return root;
    }
     
    build() {
        this.root = this._buildTree(0, this.array.length - 1)
    }
    
    _printTree(node, prefix = "", isLeft = true) {
        if(node === null) {
            return;
        }
        if(node.right !== null){
            this._printTree(node.right, `${prefix}${isLeft ? "|  " : "  "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this._printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    print() {
        return this._printTree(this.root);
    }

    get tree() {
        return this.root;
    }

    _insertInArray(value) {
        let valueExists = false;
        let arrIndex = this.array[this.array.length];
        this.array.forEach((item, index) => {
            if(item === value) {
                valueExists = true;
                return;
            } else if(item > value) {
                arrIndex = index;
            }
        })
        if(!valueExists) {
            this.array.splice(arrIndex, 1, value);
        }
    }

    _search(value, node, prevNode) {
        if(node === null) return prevNode; 
        if(node.value === value) return node;
        
        if(node.value > value) {
            prevNode = node;
            node = node.left
        } else {
            prevNode = node;
            node = node.right;
        }
        return this._search(value, node, prevNode);
    }
    
    insert(value) {
        const newNode = new Node(value);
        if(this.root === null) {
            this.root = newNode;
            return;
        } 
        const node = this._search(value, this.tree);
        if(value === node.value) return;
        if(value < node.value) {
            node.left = newNode;
        } else {
            node.right =  newNode;
        }
    }

    deleteItem(value, node, prevNode) {
        if(node === null) return node;
        if(node.value === value) {
            // Condition:1 -> Remove leaf node.
            if(node.left ===  null && node.right === null) {
                if(prevNode.value < value) {
                    prevNode.right = null;
                    return;
                } else {
                    prevNode.left = null
                    return;  
                }
            }

            // Condition:2 -> Remove node which has one child node.
            else if(node.left === null || node.right === null) {
                const nextNode = (node.right === null) ? node.left : node.right;
                if(prevNode === node) {
                    this.root = nextNode;
                } else if (prevNode.left === node) {
                    prevNode.left = nextNode;
                } else {
                    prevNode.right = nextNode;
                }
                return;
            }

            
            // Condition: 3 -> Remove node with both children not null.
            else {
                let currentNode = node;
                let leafNode = node.right;
                while(leafNode.left !== null) {
                    currentNode = leafNode;
                    leafNode = leafNode.left;
                }
                node.value = leafNode.value;
                if(currentNode.left === leafNode) {
                    currentNode.left = leafNode.right;
                } else {
                    currentNode.right = leafNode.right;
                }
                return;
            }

        }

        if(node.value > value) {
            this.deleteItem(value, node.left, node);
        } else {
            this.deleteItem(value, node.right, node);
        }
    }

    find(value) {
        return this._search(value, this.tree).value === value ? this._search(value, this.tree) : null;
    }

    levelOrder(queue = [], callback = null, valArr = []) {
        // Recursive Method
        if(queue.length === 0) return;
        const node = queue.shift();
        if(callback === null) {
            valArr.push(node.value);
        } else {
            callback(node);
        }
        if(node.left !== null) {
            queue.push(node.left);
        }

        if(node.right !== null) {
            queue.push(node.right);
        }
        this.levelOrder(queue, callback, valArr);
        if(callback === null) {
            return valArr;
        }    

        // Iterative method
        // const queue = [];
        // const nodeValues = [];
        // queue.push(this.root);
        // while(queue.length > 0) {
        //     const node = queue.shift();
        //     if(callback !== null) {
        //         callback(node);
        //     } else {
        //         nodeValues.push(node.value);
        //     }
        //     if(node.left !== null){
        //         queue.push(node.left);
        //     }
        //     if(node.right !== null) {
        //         queue.push(node.right);
        //     }
        // }
        // if(callback === null) {
        //     return nodeValues;
        // }
    }
    

    inOrder(node, callback = null, arr = []) {
        if(node === null) return node;
        this.inOrder(node.left, callback, arr);
        if(callback === null) {
            arr.push(node.value);
        } else {
            callback(node);
        }
        this.inOrder(node.right, callback, arr)
        if(callback === null) {
            return arr;
        }
    }

    preOrder(node, callback = null, arr = [], count = 0) {
        if(node === null) return node;
        if(callback === null) {
            arr.push(node.value);
        } else {
            callback(node);
        }
        this.preOrder(node.left, callback, arr, count);
        this.preOrder(node.right, callback, arr, count);
        if(callback === null) {
            return arr;
        }
    }

    postOrder(node, callback = null, arr = [], count = 0) {
        if(node === null) return node;
        this.postOrder(node.left, callback, arr, count);
        this.postOrder(node.right, callback, arr, count);
        if(callback === null) {
            arr.push(node.value);
        } else{
            callback(node);
        }
        if(arr.length > 0) {
            return arr;
        }
    } 

    _findHeight(node) {
        if(node === null) return 0;
        const leftHeight = this._findHeight(node.left)
        const rightHeight = this._findHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    height(value) {
        const node = this._search(value, this.tree);
        if(node.value !== value) {
            console.log("Value not found!");
            return null;
        } 
        return this._findHeight(node) - 1;
    }

    _findDepth (node, value) {
        if(node.value === value) {
            return 0;
        }
        let depth;
        if(node.value > value) {
            depth = this._findDepth(node.left, value);
        } else {
            depth = this._findDepth(node.right, value);
        }

        return ++depth;
    }
    depth(value) {
        const node = this._search(value, this.tree);
        if(node.value !== value) {
            console.log("Value not found!");
            return null;
        }
        return this._findDepth(this.tree, value);
    }

    isBalanced() {
        const leftHeight = this._findHeight(this.tree.left);
        const rightHeight = this._findHeight(this.tree.right);
        const diff = Math.sqrt((leftHeight - rightHeight) ** 2);
        if(diff <= 1) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const treeArr = this.inOrder(this.tree);
        this.array = treeArr;
        this.build();
    }
}