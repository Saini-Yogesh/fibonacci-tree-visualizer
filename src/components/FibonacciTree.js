import React, { useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { toPng } from 'html-to-image';

export default function FibonacciTree({ data }) {
    const treeRef = useRef();
    const containerRef = useRef();
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(0.8);

    React.useEffect(() => {
        if (containerRef.current) {
            const dimensions = containerRef.current.getBoundingClientRect();
            setTranslate({ x: dimensions.width / 2, y: 100 });
            resetZoom();
        }
    }, [data]);

    const handleDownload = async () => {
        if (containerRef.current) {
            const originalStyle = containerRef.current.style.overflow;

            // Ensure the entire tree is fully rendered
            containerRef.current.style.overflow = 'visible';

            const png = await toPng(containerRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                backgroundColor: 'transparent',
            });

            // Restore original overflow setting
            containerRef.current.style.overflow = originalStyle;

            const link = document.createElement('a');
            link.download = 'fibonacci_tree.png';
            link.href = png;
            link.click();
        }
    };


    const resetZoom = () => {
        const svg = treeRef.current?.querySelector('svg');
        const g = svg?.querySelector('g');

        if (!svg || !g) return;

        const bbox = g.getBBox();
        const svgRect = svg.getBoundingClientRect();

        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;

        const scale = Math.min(svgWidth / bbox.width, svgHeight / bbox.height) * 0.9;

        const translateX = (svgWidth - bbox.width * scale) / 2 - bbox.x * scale;
        const translateY = (svgHeight - bbox.height * scale) / 2 - bbox.y * scale;

        const transform = `translate(${translateX}, ${translateY}) scale(${scale})`;

        g.setAttribute('transform', transform);
    };


    // Custom render: circle with number + fib(n) label to the right
    const renderNode = ({ nodeDatum }) => {
        const valueMatch = nodeDatum.name.match(/\d+/);
        const number = valueMatch ? valueMatch[0] : '?';
        return (
            <g>
                {/* Circle */}
                <circle r={20} fill="#007acc" stroke="white" strokeWidth={2} />
                {/* Number inside circle */}
                <text
                    fill="white"
                    stroke="none"
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                >
                    {number}
                </text>
                {/* Label to the right of the circle */}
                <text
                    fill="#111111"
                    stroke="none"
                    x={30}
                    y={5}
                    textAnchor="start"
                    fontSize={16}
                    fontWeight="bold"
                >
                    {nodeDatum.name}
                </text>


            </g>
        );
    };

    return (

        <div
            ref={treeRef}
            style={{
                width: '100%',
                height: '82vh',
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '8px',
                background: '#fff',
                position: 'relative',
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)"
            }}
        >
            {/* Tree Container */}
            <div div ref={containerRef} style={{ width: '100%', height: '100%' }}>
                <Tree
                    data={data}
                    orientation="vertical"
                    translate={translate}
                    zoom={zoom}
                    zoomable
                    onUpdate={(source, evt) => {
                        if (evt?.transform) setZoom(evt.transform.k);
                    }}
                    pathFunc="step"
                    scaleExtent={{ min: 0.4, max: 2 }}
                    enableLegacyTransitions
                    collapsible={false}
                    separation={{ siblings: 1.5, nonSiblings: 2 }}
                    renderCustomNodeElement={renderNode}
                />
            </div >

            {/* Overlay Buttons */}
            < div
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10,
                }}
            >
                <button onClick={resetZoom}>Reset Zoom</button>
                <button onClick={handleDownload}>Download PNG</button>
            </ div>
        </div >

    );
}
