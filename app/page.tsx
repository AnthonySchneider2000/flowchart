'use client'

import { FlowNode } from "@/components/flow-node"
import { NodeConnection } from "@/components/node-connection"
import { useFlowchartStore } from "@/lib/store"

export default function Home() {
  const { nodes, activeNodeId } = useFlowchartStore()
  const activeNode = nodes[activeNodeId]

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4">
        {/* Parent node if it exists */}
        {activeNode.parentId && (
          <>
            <div className="flex justify-center">
              <FlowNode id={activeNode.parentId} />
            </div>
            <NodeConnection direction="down" />
          </>
        )}

        {/* Active node */}
        <div className="flex justify-center">
          <FlowNode id={activeNodeId} isActive />
        </div>

        {/* Connection to children */}
        {activeNode.children.length > 0 && (
          <NodeConnection direction="down" />
        )}

        {/* Children nodes with horizontal line connecting them */}
        {activeNode.children.length > 0 && (
          <div className="relative">
            <div className="absolute left-1/2 right-1/2 top-0 h-px bg-border -translate 
            -translate-y-4" style={{
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
