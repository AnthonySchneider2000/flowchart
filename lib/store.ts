import { create } from 'zustand'

interface FlowNode {
  id: string
  text: string
  children: string[]
  parentId: string | null
}

interface FlowchartState {
  nodes: Record<string, FlowNode>
  activeNodeId: string
  setActiveNode: (id: string) => void
  addNode: (parentId: string) => void
  updateNodeText: (id: string, text: string) => void
  deleteNode: (id: string) => void
  getAncestors: (nodeId: string) => string[]
}

export const useFlowchartStore = create<FlowchartState>((set, get) => ({
  nodes: {
    root: {
      id: 'root',
      text: 'root',
      children: [],
      parentId: null
    }
  },
  activeNodeId: 'root',

  setActiveNode: (id: string) => set({ activeNodeId: id }),

  addNode: (parentId: string) => set((state) => {
    const newId = Math.random().toString(36).substring(2, 9)
    const newNode: FlowNode = {
      id: newId,
      text: 'New Node',
      children: [],
      parentId
    }

    const updatedParent = state.nodes[parentId]
    updatedParent.children = [...updatedParent.children, newId]

    return {
      nodes: {
        ...state.nodes,
        [newId]: newNode,
        [parentId]: updatedParent
      }
    }
  }),

  updateNodeText: (id: string, text: string) => set((state) => ({
    nodes: {
      ...state.nodes,
      [id]: {
        ...state.nodes[id],
        text
      }
    }
  })),

  deleteNode: (id: string) => set((state) => {
    const nodesToDelete = new Set<string>()
    
    const collectDescendants = (nodeId: string) => {
      nodesToDelete.add(nodeId)
      const node = state.nodes[nodeId]
      node.children.forEach(childId => collectDescendants(childId))
    }
    
    collectDescendants(id)
    
    const newNodes = { ...state.nodes }
    nodesToDelete.forEach(nodeId => {
      delete newNodes[nodeId]
    })
    
    const nodeToDelete = state.nodes[id]
    if (nodeToDelete.parentId) {
      newNodes[nodeToDelete.parentId] = {
        ...newNodes[nodeToDelete.parentId],
        children: newNodes[nodeToDelete.parentId].children.filter(childId => childId !== id)
      }
    }
    
    return {
      nodes: newNodes
    }
  }),

  getAncestors: (nodeId: string) => {
    const ancestors: string[] = []
    const nodes = get().nodes
    let currentNode = nodes[nodeId]
    
    while (currentNode && currentNode.parentId) {
      ancestors.unshift(currentNode.parentId)
      currentNode = nodes[currentNode.parentId]
    }
    
    return ancestors
  }
}))