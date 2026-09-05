import React from 'react';
import { CircuitNode, ThemeConfig } from '../types';
import { soundFx } from '../utils/soundEngine';

interface SchematicNodesProps {
  nodes: CircuitNode[];
  theme: ThemeConfig;
  activeSurgeNode: string | null;
  onNodeClick: (nodeId: string, label: string) => void;
}

export const SchematicNodes: React.FC<SchematicNodesProps> = ({
  nodes,
  theme,
  activeSurgeNode,
  onNodeClick,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {nodes.map((node) => {
        const isActive = activeSurgeNode === node.id;
        return (
          <div
            key={node.id}
            className="absolute pointer-events-auto cursor-pointer group"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => {
              soundFx.playNodePing();
              onNodeClick(node.id, node.label);
            }}
            title={`${node.label} (${node.sublabel}) - Click to Probe Diagnostic`}
          >
            {/* Interactive Glowing Ping Anchor */}
            <div className="relative flex items-center justify-center">
              <span
                className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                  isActive ? 'scale-125' : 'group-hover:scale-110'
                }`}
                style={{
                  backgroundColor: '#0a0d12',
                  border: `1.5px solid ${isActive ? '#ffffff' : theme.primary}`,
                  boxShadow: `0 0 8px ${isActive ? '#ffffff' : theme.glowRgba}`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isActive ? '#ffffff' : theme.accent,
                  }}
                />
              </span>

              {/* Pulsing ring */}
              <span
                className="absolute w-6 h-6 rounded-full opacity-40 animate-ping pointer-events-none"
                style={{
                  border: `1px solid ${theme.primary}`,
                }}
              />

              {/* Tooltip Card on Hover / Active */}
              <div
                className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#0b0e14]/90 border border-amber-400/30 text-[9px] font-mono whitespace-nowrap shadow-lg backdrop-blur-sm transition-all pointer-events-none opacity-0 group-hover:opacity-100 ${
                  isActive ? 'opacity-100' : ''
                }`}
                style={{ color: theme.accent }}
              >
                <div className="font-bold">{node.label}</div>
                <div className="text-gray-400">{node.value}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
