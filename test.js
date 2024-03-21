import  Set  from "./hashSet.js";
import sort, { randomValueArrayGenerator as ranArrGen, sortedValueArrayGenerator as sortedArrGen} from "./sort.js";
import Tree from "./bst.js";


function test() {
    const array = ranArrGen(47);

    // Add array items to set to remove 
    const set = new Set();
    array.forEach(item => set.append(item));

    // Sorted array
    const sortedArray = sort(set.entries());

    // Initialize Binary search tree
    const BST = new Tree(sortedArray);
    
    // Build tree with sortedArray;
    BST.build();
    BST.print();
    // Check is tree balanced
    let treeBalance = BST.isBalanced();
    console.log("\nBalanced",treeBalance);

    // Print element
    // In level-order(Breadth first)
    let levelOrd = BST.levelOrder([BST.tree]);
    console.log("\nLevel-order",levelOrd);

    // In pre-order (Depth first)
    let preOrd = BST.preOrder(BST.tree);
    console.log("\nPre-order",preOrd);

    // In post-order (Depth first)
    let postOrd = BST.postOrder(BST.tree);
    console.log("\nPost-order",postOrd);

    // In in-order (Depth first)
    let inOrd = BST.inOrder(BST.tree);
    console.log("\nIn-order", inOrd, "\n");

    // Unbalance the tree
    const unbalancingArr = [100, 102, 103, 101, 104, 107, 106, 109];
    unbalancingArr.forEach(item => BST.insert(item));
    BST.print();

    // Check is tree balanced
    treeBalance = BST.isBalanced();
    console.log("\nBalanced", treeBalance, "\n");

    // Rebalance the tree
    const unbalancedTreeArr = BST.inOrder(BST.tree);
    BST.array = unbalancedTreeArr;
    BST.build();
    BST.print();

    // Check is tree balanced
    treeBalance = BST.isBalanced();
    console.log("\nBalanced", treeBalance);

     // Print element
    // In level-order(Breadth first)
    levelOrd = BST.levelOrder([BST.tree]);
    console.log("\nLevel-order", levelOrd);

    // In pre-order (Depth first)
    preOrd = BST.preOrder(BST.tree);
    console.log("\nPre-order", preOrd);

    // In post-order (Depth first)
    postOrd = BST.postOrder(BST.tree);
    console.log("\nPost-order", postOrd);

    // In in-order (Depth first)
    inOrd = BST.inOrder(BST.tree);
    console.log("\nIn-order", inOrd);
}

test();

