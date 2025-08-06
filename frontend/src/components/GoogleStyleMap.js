import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Maximize2, Navigation } from 'lucide-react';

const GoogleStyleMap = () => {
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const mapRef = useRef(null);

  // Mock map configuration - this would come from backend
  const mapConfig = {
    focusCity: "Manhattan",
    state: "New York, NY USA",
    coordinates: { lat: 40.7831, lng: -73.9712 },
    zoomLevel: zoomLevel,
    address: "121 Rock Street, 21 Avenue, New York, NY 92103-9000"
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.map-controls')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setMapPosition(prev => ({
      x: Math.max(-200, Math.min(200, prev.x + deltaX * 0.5)),
      y: Math.max(-200, Math.min(200, prev.y + deltaY * 0.5))
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(18, prev + 1);
      return Math.max(8, prev - 1);
    });
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

  // Generate street-like grid pattern
  const generateStreets = () => {
    const streets = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        streets.push(
          <rect
            key={`h-${i}-${j}`}
            x={i * 40}
            y={j * 40 + 20}
            width="35"
            height="2"
            fill="rgba(156, 163, 175, 0.6)"
          />,
          <rect
            key={`v-${i}-${j}`}
            x={i * 40 + 20}
            y={j * 40}
            width="2"
            height="35"
            fill="rgba(156, 163, 175, 0.6)"
          />
        );
      }
    }
    return streets;
  };

  return (
    <div 
      ref={mapRef}
      className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 relative overflow-hidden cursor-grab rounded-lg border border-border"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Map Content */}
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${0.8 + (zoomLevel - 8) * 0.05})`,
        }}
      >
        {/* Water areas (representing Manhattan's rivers) */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            {/* Hudson River */}
            <path
              d="M 0,0 Q 50,100 0,200 Q 30,300 0,400 L 0,0"
              fill="rgba(59, 130, 246, 0.3)"
            />
            {/* East River */}
            <path
              d="M 350,0 Q 320,100 350,200 Q 330,300 350,400 L 400,400 L 400,0"
              fill="rgba(59, 130, 246, 0.3)"
            />
          </svg>
        </div>

        {/* Street Grid */}
        <svg className="absolute inset-0 w-full h-full">
          {generateStreets()}
          
          {/* Major Streets (highlighted) */}
          <rect x="0" y="100" width="400" height="4" fill="rgba(156, 163, 175, 0.8)" />
          <rect x="0" y="200" width="400" height="4" fill="rgba(156, 163, 175, 0.8)" />
          <rect x="0" y="300" width="400" height="4" fill="rgba(156, 163, 175, 0.8)" />
          <rect x="100" y="0" width="4" height="400" fill="rgba(156, 163, 175, 0.8)" />
          <rect x="200" y="0" width="4" height="400" fill="rgba(156, 163, 175, 0.8)" />
          <rect x="300" y="0" width="4" height="400" fill="rgba(156, 163, 175, 0.8)" />
        </svg>

        {/* Buildings/Blocks */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => 
            [...Array(15)].map((_, j) => (
              <div
                key={`${i}-${j}`}
                className="absolute bg-gray-300 dark:bg-gray-600"
                style={{
                  left: `${25 + i * 18 + Math.random() * 5}px`,
                  top: `${25 + j * 25 + Math.random() * 5}px`,
                  width: `${10 + Math.random() * 15}px`,
                  height: `${10 + Math.random() * 15}px`,
                  opacity: 0.7
                }}
              />
            ))
          )}
        </div>

        {/* Central Park representation */}
        <div 
          className="absolute bg-green-300 dark:bg-green-700 rounded-lg opacity-60"
          style={{
            left: '150px',
            top: '80px',
            width: '100px',
            height: '200px'
          }}
        />

        {/* Location Marker */}
        <div className="absolute transform -translate-x-1/2 -translate-y-full" style={{ left: '200px', top: '200px' }}>
          <div className="relative">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
            </div>
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-foreground px-3 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
              Manhattan
            </div>
          </div>
        </div>

        {/* Additional location markers */}
        <div className="absolute transform -translate-x-1/2 -translate-y-full" style={{ left: '120px', top: '150px' }}>
          <div className="w-4 h-4 bg-blue-500 rounded-full border border-white shadow-md"></div>
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-full" style={{ left: '280px', top: '180px' }}>
          <div className="w-4 h-4 bg-green-500 rounded-full border border-white shadow-md"></div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="map-controls absolute top-4 right-4 space-y-2">
        <button
          onClick={() => handleZoom('in')}
          className="w-10 h-10 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-10 h-10 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Minus className="w-4 h-4 text-foreground" />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Maximize2 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Map Info Panel */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <h4 className="text-sm font-semibold text-foreground mb-1">{mapConfig.focusCity}</h4>
        <p className="text-xs text-muted-foreground">{mapConfig.state}</p>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors mt-1">
          View larger map
        </button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Zoom: {zoomLevel}
      </div>

      {/* Directions Button */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm">
          <Navigation className="w-4 h-4" />
          Directions
        </button>
      </div>
    </div>
  );
};

export default GoogleStyleMap;