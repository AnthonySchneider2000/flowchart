'use client'

import { FlowNode } from "@/components/flow-node"
import { NodeConnection } from "@/components/node-connection"
import { useFlowchartStore } from "@/lib/store"

export default function Home() {
  const { nodes, activeNodeId, getAncestors } = useFlowchartStore()
  const activeNode = nodes[activeNodeId]
  const ancestors = getAncestors(activeNodeId)

  // Get siblings (nodes that share the same parent as the active node)
  const siblings = activeNode.parentId 
    ? nodes[activeNode.parentId].children.filter(id => id !== activeNodeId)
    : []

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4">
        {/* Ancestor chain */}
        {ancestors.map((ancestorId, index) => (
          <div key={ancestorId}>
            <div className="flex justify-center">
              <FlowNode id={ancestorId} />
            </div>
            <NodeConnection direction="down" />
          </div>
        ))}

        {/* Active node and siblings */}
        <div className="relative">
          {siblings.length > 0 && (
            <div className="absolute left-1/2 right-1/2 top-1/2 h-px bg-border" 
              style={{
                left: '25%',
                right: '25%'
              }} />
          )}
          <div className="flex justify-center gap-8 items-center">
            {siblings.slice(0, Math.floor(siblings.length / 2)).map((siblingId) => (
              <FlowNode key={siblingId} id={siblingId} />
            ))}
            <FlowNode id={activeNodeId} isActive />
            {siblings.slice(Math.floor(siblings.length / 2)).map((siblingId) => (
              <FlowNode key={siblingId} id={siblingId} />
            ))}
          </div>
        </div>

        {/* Connection to children */}
        {activeNode.children.length > 0 && (
          <NodeConnection direction="down" />
        )}

        {/* Children nodes with horizontal line connecting them */}
        {activeNode.children.length > 0 && (
          <div className="relative">
            <div className="absolute left-1/2 right-1/2 top-0 h-px bg-border -translate-y-4" 
              style={{
                left: '25%',
                right: '25%'
              }} />
            <div className="flex justify-center gap-8 items-start">
              {activeNode.children.map((childId) => (
                <FlowNode key={childId} id={childId} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
