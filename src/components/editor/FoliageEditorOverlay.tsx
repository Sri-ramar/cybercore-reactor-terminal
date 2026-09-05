import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FoliageSprayItem, DEFAULT_FOLIAGE_LAYOUT, STORAGE_KEY_FOLIAGE } from '../../data/defaultFoliageLayout';
import { ThemeConfig } from '../../types';
import {
  Move,
  RotateCw,
  Plus,
  Copy,
  Trash2,
  FlipHorizontal,
  RotateCcw,
  Check,
  Layers,
  Sparkles,
  X,
  Eye,
} from 'lucide-react';

interface FoliageEditorOverlayProps {
  theme: ThemeConfig;
  foliageList: FoliageSprayItem[];
  onUpdateFoliage: (newList: FoliageSprayItem[]) => void;
  onClose: () => void;
}

export const FoliageEditorOverlay: React.FC<FoliageEditorOverlayProps> = ({
  theme,
  foliageList,
  onUpdateFoliage,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(foliageList[0]?.id || null);
  const [copiedCode, setCopiedCode] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const isDraggingRef = useRef(false);
  const isRotatingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const itemStartPos = useRef({ x: 0, y: 0, rot: 0 });

  const selectedItem = foliageList.find((item) => item.id === selectedId) || null;

  // Transform screen client mouse coords to SVG (1600x900) coordinates
  const getSvgCoords = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 1600 / rect.width;
    const scaleY = 900 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  // Update specific item properties
  const updateSelectedItem = useCallback(
    (partial: Partial<FoliageSprayItem>) => {
      if (!selectedId) return;
      const updated = foliageList.map((item) =>
        item.id === selectedId ? { ...item, ...partial } : item
      );
      onUpdateFoliage(updated);
    },
    [selectedId, foliageList, onUpdateFoliage]
  );

  // Duplicate Selected Bunch
  const handleDuplicate = useCallback(() => {
    if (!selectedItem) return;
    const newId = `spray-copy-${Date.now().toString(36)}`;
    const newItem: FoliageSprayItem = {
      ...selectedItem,
      id: newId,
      x: Math.min(1500, selectedItem.x + 40),
      y: Math.min(820, selectedItem.y + 30),
      rot: (selectedItem.rot + 15) % 360,
    };
    const updated = [...foliageList, newItem];
    onUpdateFoliage(updated);
    setSelectedId(newId);
  }, [selectedItem, foliageList, onUpdateFoliage]);

  // Add New Bunch
  const handleAddNew = useCallback(() => {
    const newId = `spray-new-${Date.now().toString(36)}`;
    const newItem: FoliageSprayItem = {
      id: newId,
      x: 800,
      y: 450,
      rot: 0,
      scale: 1.0,
      density: 'dense',
      flip: false,
      layer: 'both',
    };
    const updated = [...foliageList, newItem];
    onUpdateFoliage(updated);
    setSelectedId(newId);
  }, [foliageList, onUpdateFoliage]);

  // Delete Selected Bunch
  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    const updated = foliageList.filter((item) => item.id !== selectedId);
    onUpdateFoliage(updated);
    setSelectedId(updated[0]?.id || null);
  }, [selectedId, foliageList, onUpdateFoliage]);

  // Reset to Factory Default Layout
  const handleResetDefaults = useCallback(() => {
    if (window.confirm('Reset foliage positions back to factory defaults?')) {
      onUpdateFoliage(DEFAULT_FOLIAGE_LAYOUT);
      setSelectedId(DEFAULT_FOLIAGE_LAYOUT[0]?.id || null);
      localStorage.removeItem(STORAGE_KEY_FOLIAGE);
    }
  }, [onUpdateFoliage]);

  // Copy JSON Code
  const handleCopyCode = useCallback(() => {
    const jsonStr = JSON.stringify(foliageList, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, [foliageList]);

  // Pointer Down on Move Gizmo
  const handleStartMove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const item = foliageList.find((it) => it.id === id);
    if (!item) return;

    const coords = getSvgCoords(e);
    isDraggingRef.current = true;
    dragStartPos.current = coords;
    itemStartPos.current = { x: item.x, y: item.y, rot: item.rot };
  };

  // Pointer Down on Rotate Handle
  const handleStartRotate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const item = foliageList.find((it) => it.id === id);
    if (!item) return;

    const coords = getSvgCoords(e);
    isRotatingRef.current = true;
    dragStartPos.current = coords;
    itemStartPos.current = { x: item.x, y: item.y, rot: item.rot };
  };

  // Global Drag and Rotate Movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!selectedId) return;
      const coords = getSvgCoords(e);

      if (isDraggingRef.current) {
        const dx = coords.x - dragStartPos.current.x;
        const dy = coords.y - dragStartPos.current.y;
        const newX = Math.round(Math.max(20, Math.min(1580, itemStartPos.current.x + dx)));
        const newY = Math.round(Math.max(20, Math.min(880, itemStartPos.current.y + dy)));

        const updated = foliageList.map((item) =>
          item.id === selectedId ? { ...item, x: newX, y: newY } : item
        );
        onUpdateFoliage(updated);
      } else if (isRotatingRef.current) {
        const item = foliageList.find((it) => it.id === selectedId);
        if (!item) return;

        const angleRad = Math.atan2(coords.y - item.y, coords.x - item.x);
        let angleDeg = Math.round((angleRad * 180) / Math.PI + 90);
        if (angleDeg > 180) angleDeg -= 360;
        if (angleDeg < -180) angleDeg += 360;

        const updated = foliageList.map((it) =>
          it.id === selectedId ? { ...it, rot: angleDeg } : it
        );
        onUpdateFoliage(updated);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      isRotatingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selectedId, foliageList, getSvgCoords, onUpdateFoliage]);

  // Keyboard Shortcuts (Delete, Duplicate, Escape to Close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (e.target instanceof HTMLInputElement) return;
        handleDelete();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleDuplicate();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDelete, handleDuplicate, onClose]);

  return (
    <div className="absolute inset-0 w-full h-full z-50 pointer-events-none select-none flex flex-col justify-between overflow-hidden">
      {/* 1. TOP HEADER TOOLBAR (pointer-events-auto ensures 100% clickability) */}
      <div className="relative z-30 pointer-events-auto flex items-center justify-between px-4 py-2 bg-[#040804]/96 border-b border-[#243e18] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-cyber tracking-widest text-emerald-400 font-bold uppercase">
            🌿 LIVE FOLIAGE LAYOUT EDITOR
          </span>
          <span className="text-[10px] text-zinc-400 font-code px-2 py-0.5 bg-[#0a1808] border border-[#1e3412] rounded hidden sm:inline">
            {foliageList.length} Bunches • Auto-Saved Permanently
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-1 px-3 py-1 bg-emerald-700/90 hover:bg-emerald-600 text-white rounded text-xs font-code font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD BUNCH</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-3 py-1 bg-[#0f1e0c] hover:bg-[#183014] text-zinc-200 border border-[#2c4e1e] rounded text-xs font-code transition-all cursor-pointer"
            title="Copy Layout JSON to Clipboard"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'COPIED!' : 'COPY JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#1a1208] hover:bg-[#281c0c] text-amber-300 border border-[#483416] rounded text-xs font-code transition-all cursor-pointer"
            title="Reset positions to default layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          {/* Explicit Save & Exit Button */}
          <button
            type="button"
            id="close-foliage-editor-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded text-xs font-code shadow-xl transition-all active:scale-95 cursor-pointer border border-emerald-300"
          >
            <Check className="w-4 h-4" />
            <span>SAVE & EXIT</span>
          </button>

          {/* Quick Close Icon Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            title="Close Editor (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. INTERACTIVE SVG CANVAS GIZMO OVERLAY */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {foliageList.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <g
              key={`gizmo-${item.id}`}
              transform={`translate(${item.x}, ${item.y}) rotate(${item.rot})`}
              className="pointer-events-auto cursor-grab active:cursor-grabbing"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(item.id);
              }}
            >
              {/* Bounding Visual Ring */}
              <circle
                cx="0"
                cy="0"
                r={isSelected ? 44 : 28}
                fill={isSelected ? 'rgba(74, 222, 128, 0.28)' : 'rgba(255, 255, 255, 0.08)'}
                stroke={isSelected ? '#4ade80' : 'rgba(255, 255, 255, 0.35)'}
                strokeWidth={isSelected ? 2.5 : 1.2}
                strokeDasharray={isSelected ? 'none' : '3 3'}
                onMouseDown={(e) => handleStartMove(e, item.id)}
              />

              {/* Move Center Anchor Node */}
              <circle
                cx="0"
                cy="0"
                r="7.5"
                fill={isSelected ? '#4ade80' : '#ffffff'}
                stroke="#000000"
                strokeWidth="2"
                onMouseDown={(e) => handleStartMove(e, item.id)}
              />

              {/* Direction Indicator Line & Rotation Handle */}
              {isSelected && (
                <g>
                  {/* Stem Line to Rotation Handle */}
                  <line x1="0" y1="0" x2="0" y2="-65" stroke="#4ade80" strokeWidth="2.2" strokeDasharray="3 2" />

                  {/* Circular Rotation Handle */}
                  <circle
                    cx="0"
                    cy="-65"
                    r="9.5"
                    fill="#38bdf8"
                    stroke="#000000"
                    strokeWidth="2"
                    className="cursor-crosshair"
                    onMouseDown={(e) => handleStartRotate(e, item.id)}
                  />
                  <path
                    d="M -3 -65 A 3 3 0 0 1 3 -65"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.5"
                    className="pointer-events-none"
                  />
                </g>
              )}

              {/* Item Label */}
              <text
                x="0"
                y={isSelected ? 60 : 42}
                textAnchor="middle"
                fill={isSelected ? '#4ade80' : '#e4e4e7'}
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,1)]"
              >
                {item.rot}° (x:{item.x}, y:{item.y})
              </text>
            </g>
          );
        })}
      </svg>

      {/* 3. FLOATING PROPERTY INSPECTOR FOR SELECTED BUNCH */}
      {selectedItem && (
        <div
          className="relative z-30 pointer-events-auto mb-4 mx-auto w-[92%] max-w-4xl bg-[#050a04]/96 border border-[#244218] rounded-lg p-3 shadow-2xl backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Info & Position Coordinates */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0c1808] border border-[#1e3412] rounded-md text-emerald-400">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-cyber text-white font-bold tracking-wider">
                BUNCH: <span className="text-emerald-400 font-code">{selectedItem.id}</span>
              </div>
              <div className="text-[10px] text-zinc-400 font-code flex items-center gap-2 mt-0.5">
                <span>X: {selectedItem.x}px</span>
                <span>•</span>
                <span>Y: {selectedItem.y}px</span>
                <span>•</span>
                <span>ANGLE: {selectedItem.rot}°</span>
              </div>
            </div>
          </div>

          {/* Center: Real-time Sliders (Rotation, Scale) */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            {/* Rotation Slider */}
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-code text-zinc-300 mb-1">
                <span>ROTATION</span>
                <span className="text-emerald-400 font-bold">{selectedItem.rot}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={selectedItem.rot}
                onChange={(e) => updateSelectedItem({ rot: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-[#0e1c0a] rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Scale Slider */}
            <div className="w-32">
              <div className="flex justify-between text-[10px] font-code text-zinc-300 mb-1">
                <span>SCALE</span>
                <span className="text-emerald-400 font-bold">{selectedItem.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={selectedItem.scale}
                onChange={(e) => updateSelectedItem({ scale: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#0e1c0a] rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          {/* Right: Actions (Flip, Density, Duplicate, Delete, Close) */}
          <div className="flex items-center gap-2">
            {/* Flip Toggle */}
            <button
              type="button"
              onClick={() => updateSelectedItem({ flip: !selectedItem.flip })}
              className={`p-1.5 rounded border text-xs font-code transition-all cursor-pointer ${
                selectedItem.flip
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-[#0b1608] text-zinc-300 border-[#1e3412] hover:text-white'
              }`}
              title="Flip Horizontally"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Density Selector */}
            <select
              value={selectedItem.density}
              onChange={(e) =>
                updateSelectedItem({ density: e.target.value as 'medium' | 'dense' | 'ultra' })
              }
              className="bg-[#0b1608] border border-[#1e3412] text-zinc-200 rounded px-2 py-1 text-[11px] font-code cursor-pointer"
            >
              <option value="medium">Medium Density</option>
              <option value="dense">Dense Foliage</option>
              <option value="ultra">Ultra Full Spray</option>
            </select>

            {/* Duplicate Button */}
            <button
              type="button"
              onClick={handleDuplicate}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#0e200a] hover:bg-[#163010] text-emerald-300 border border-[#244416] rounded text-[11px] font-code font-bold transition-all cursor-pointer"
              title="Duplicate this bunch (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>DUPLICATE</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/80 rounded transition-all cursor-pointer"
              title="Delete this bunch (Del)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Exit Button right in Inspector */}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-code transition-all cursor-pointer"
              title="Exit Editor"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
