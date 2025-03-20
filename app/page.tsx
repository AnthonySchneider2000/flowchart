'use client'

import Image from "next/image";
import { FlowNode } from "@/components/flow-node";
import { useFlowchartStore } from "@/lib/store";

export default function Home() {
  const { nodes, activeNodeId } = useFlowchartStore();
  const activeNode = nodes[activeNodeId];

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4">
        {/* Parent node if it exists */}
        {activeNode.parentId && (
          <div className="mb-8">
            <FlowNode id={activeNode.parentId} />
          </div>
        )}

        {/* Active node */}
        <div className="ml-8">
          <FlowNode id={activeNodeId} isActive />
        </div>

        {/* Children nodes */}
        <div className="ml-16 space-y-4">
          {activeNode.children.map((childId) => (
            <FlowNode key={childId} id={childId} />
          ))}
        </div>
      </div>
    </div>
  );
}
