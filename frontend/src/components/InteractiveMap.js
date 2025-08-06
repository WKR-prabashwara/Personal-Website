import React, { useState, useRef, useEffect } from 'react';

const InteractiveMap = () => {
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [focusArea, setFocusArea] = useState({ x: 50, y: 40 }); // Default focus on Washington DC area
  const mapRef = useRef(null);

  // Mock map data - in real implementation, this would come from backend
  const mapConfig = {
    focusCity: "Washington DC",
    coordinates: "-94.713",
    zoomLevel: 1,
    markers: [
      { x: 50, y: 40, label: "Washington DC", type: "city" },
      { x: 45, y: 35, label: "Baltimore", type: "city" },
      { x: 55, y: 50, label: "Richmond", type: "city" },
    ]
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setMapPosition(prev => ({
      x: Math.max(-100, Math.min(100, prev.x + deltaX * 0.5)),
      y: Math.max(-100, Math.min(100, prev.y + deltaY * 0.5))
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={mapRef}
      className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden cursor-grab rounded-lg"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background stars/dots representing a map */}
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
        }}
      >
        {/* Map grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => 
            [...Array(20)].map((_, j) => (
              <div
                key={`${i}-${j}`}
                className="absolute w-px h-px bg-white/30"
                style={{
                  left: `${i * 5}%`,
                  top: `${j * 5}%`,
                }}
              />
            ))
          )}
        </div>

        {/* Markers */}
        {mapConfig.markers.map((marker, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
          >
            {/* Marker dot */}
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse">
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
            </div>
            
            {/* Label */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {marker.label}
            </div>
          </div>
        ))}

        {/* Focus area indicator */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${focusArea.x}%`,
            top: `${focusArea.y}%`,
          }}
        >
          <div className="w-20 h-20 border-2 border-primary/60 rounded-full animate-pulse">
            <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
              <div className="text-white text-xs font-medium">Focus</div>
            </div>
          </div>
        </div>

        {/* Animated connections between cities */}
        <svg className="absolute inset-0 w-full h-full">
          {mapConfig.markers.slice(1).map((marker, index) => (
            <line
              key={index}
              x1={`${mapConfig.markers[0].x}%`}
              y1={`${mapConfig.markers[0].y}%`}
              x2={`${marker.x}%`}
              y2={`${marker.y}%`}
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-xs space-y-1">
          <div>📍 {mapConfig.focusCity}</div>
          <div>📌 {mapConfig.coordinates}</div>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
        <div className="text-white text-xs">
          Zoom: {mapConfig.zoomLevel}x
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs">
        Drag to explore
      </div>
    </div>
  );
};

export default InteractiveMap;