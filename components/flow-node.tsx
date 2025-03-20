import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus, X } from "lucide-react"
import { useFlowchartStore } from "@/lib/store"

interface FlowNodeProps {
  id: string
  isActive?: boolean
}

export function FlowNode({ id, isActive = false }: FlowNodeProps) {
  const node = useFlowchartStore(state => state.nodes[id])
  const activeNode = useFlowchartStore(state => state.nodes[state.activeNodeId])
  const getAncestors = useFlowchartStore(state => state.getAncestors)
  const { updateNodeText, addNode, deleteNode, setActiveNode } = useFlowchartStore()

  if (!node) return null

  const isInActiveNodeLineage = getAncestors(activeNode.id).includes(id)

  return (
    <Card className={`p-4 ${isActive ? 'border-primary' : ''}`}>
      <div className="flex gap-2">
        <Input 
          value={node.text}
          onChange={(e) => updateNodeText(id, e.target.value)}
          onClick={() => setActiveNode(id)}
        />
        {isActive ? (
          <Button size="icon" onClick={() => addNode(id)}>
            <Plus className="h-4 w-4" />
          </Button>
        ) : !isInActiveNodeLineage ? (
          <Button size="icon" variant="destructive" onClick={() => deleteNode(id)}>
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </Card>
  )
}