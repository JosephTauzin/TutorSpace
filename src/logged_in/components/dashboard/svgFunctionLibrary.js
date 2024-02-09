import React, { useEffect, useRef } from 'react';


function FunctionPlot({ funcs, xRange, yRange, numPoints = 100, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;

        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };

        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);

        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);

        // Create the plot path for each function
        funcs.forEach(func => {
            let pathString = "";
            for (let i = 0; i <= numPoints; ++i) {
                const x = xRange[0] + i / numPoints * (xRange[1] - xRange[0]);
                const y = func(x);

                if (i === 0)
                    pathString += `M ${scaleX(x)} ${scaleY(y)} `;
                else
                    pathString += `L ${scaleX(x)} ${scaleY(y)} `;
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathString);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'blue');

            svg.appendChild(path);
        });

        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');

        svg.appendChild(xAxis);
        svg.appendChild(yAxis);

        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;

        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;

        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
    }, [funcs, xRange, yRange, numPoints, xAxisLabel, yAxisLabel]);

    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );
}



function FunctionPlotStep({ func, xRange, yRange, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;

        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };

        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);

        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);

        // Create the plot path
        let pathString = "";
        for (let i = 0; i < func.length - 1; i++) {
            let x = func[i][0];
            let y = func[i][1];
            pathString += `M ${scaleX(x)} ${scaleY(y)} `;  // Move to the start of this segment

            x = func[i+1][0];  // Move x to the next step
            pathString += `L ${scaleX(x)} ${scaleY(y)} `;  // Draw a line to the start of the next segment, at the same y
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathString);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'blue');

        svg.appendChild(path);

        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');

        svg.appendChild(xAxis);
        svg.appendChild(yAxis);

        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;

        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;

        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
    }, [func, xRange, yRange, xAxisLabel, yAxisLabel]);

    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );

}


function FunctionPlotLine({ func, xRange, yRange, numPoints = 100, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;

        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };

        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);

        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);

        // Create the plot path
        let pathString = "";
        for (let i = 0; i <= numPoints; ++i) {
            const x = xRange[0] + i / numPoints * (xRange[1] - xRange[0]);
            const y = func(x);

            if (i == 0)
                pathString += `M ${scaleX(x)} ${scaleY(y)} `;
            else
                pathString += `L ${scaleX(x)} ${scaleY(y)} `;
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathString);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'blue');

        svg.appendChild(path);

        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');

        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');

        svg.appendChild(xAxis);
        svg.appendChild(yAxis);

        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;

        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;

        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
    }, [func, xRange, yRange, numPoints, xAxisLabel, yAxisLabel]);

    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );
}

function ScatterPlot({ data, xRange, yRange, scatterRange, lineFunction, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();
  
    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
  
        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  
        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);
  
        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);
  
        // Create the scatter plot
        for (let point of data) {
            let x = point[0];
            let y = point[1] || lineFunction(x) + (Math.random() - 0.5) * scatterRange * 2;
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', scaleX(x));
            circle.setAttribute('cy', scaleY(y));
            circle.setAttribute('r', point[2]);  // Use the z value as the radius
            circle.setAttribute('fill', 'blue');
            svg.appendChild(circle);
        }
  
        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');
  
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');
  
        svg.appendChild(xAxis);
        svg.appendChild(yAxis);
  
        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;
  
        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;
  
        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
  
    }, [data, xRange, yRange, scatterRange, lineFunction, xAxisLabel, yAxisLabel]);
  
    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );
  }


  function Polygon({ sides, cornerLabels, sideLabels }) {
    const svgRef = useRef();
  
    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
  
        // Calculate total length of sides and assign a unit length
        const totalLength = sides.reduce((sum, { length }) => sum + length, 0);
        const unitLength = Math.min(width, height) / totalLength;
  
        // Calculate the points of the polygon
        const points = [];
        let angle = 0;
        let x = centerX;
        let y = centerY;
        for (let i = 0; i < sides.length; i++) {
            points.push([x, y]);
  
            const { length, internalAngle } = sides[i];
            const sideLength = length * unitLength;
  
            // Calculate the next point
            x += sideLength * Math.cos(angle);
            y += sideLength * Math.sin(angle);
  
            // Update the angle for the next side
            angle += internalAngle;
        }
  
        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);
  
        // Draw the polygon
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points.map(p => p.join(',')).join(' '));
        polygon.setAttribute('fill', 'none');
        polygon.setAttribute('stroke', 'black');
        svg.appendChild(polygon);
  
        // Add labels for corners
        if (cornerLabels) {
            points.forEach((point, index) => {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', point[0]);
                label.setAttribute('y', point[1]);
                label.setAttribute('dx', '-1em');
                label.setAttribute('dy', '-0.5em');
                label.textContent = cornerLabels[index];
                svg.appendChild(label);
            });
        }
  
        // Add labels for sides
        if (sideLabels) {
            points.forEach((point, index, array) => {
                const nextPoint = array[(index + 1) % array.length];
                const midPoint = [
                    (point[0] + nextPoint[0]) / 2,
                    (point[1] + nextPoint[1]) / 2
                ];
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', midPoint[0]);
                label.setAttribute('y', midPoint[1]);
                label.textContent = sideLabels[index];
                svg.appendChild(label);
            });
        }
    }, [sides, cornerLabels, sideLabels]);
  
    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    );
  }
  


  function Graph({ data, xLabel, yLabel }) {
    const maxX = Math.max(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y));

    const viewBoxWidth = 500;
    const viewBoxHeight = 500;

    const scale = (num, maxNum, viewBoxDim) => (num / maxNum) * viewBoxDim;

    const sortedData = [...data].sort((a, b) => a.x - b.x);

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            {/* X axis */}
            <line x1="0" y1={viewBoxHeight - 50} x2={viewBoxWidth} y2={viewBoxHeight - 50} stroke="black" />
            {/* Y axis */}
            <line x1="50" y1={0} x2="50" y2={viewBoxHeight} stroke="black" />

            {sortedData.map((d, i) => (
                <circle
                    key={i}
                    cx={scale(d.x, maxX, viewBoxWidth - 100) + 50}
                    cy={viewBoxHeight - scale(d.y, maxY, viewBoxHeight - 100) - 50}
                    r="5"
                    fill="black"
                />
            ))}

            {sortedData.map((d, i, arr) => i !== arr.length - 1 && (
                <line 
                    key={i}
                    x1={scale(d.x, maxX, viewBoxWidth - 100) + 50}
                    y1={viewBoxHeight - scale(d.y, maxY, viewBoxHeight - 100) - 50}
                    x2={scale(arr[i+1].x, maxX, viewBoxWidth - 100) + 50}
                    y2={viewBoxHeight - scale(arr[i+1].y, maxY, viewBoxHeight - 100) - 50}
                    stroke="black"
                />
            ))}

            {xLabel && (
                <text x={viewBoxWidth / 2} y={viewBoxHeight - 20} textAnchor="middle">
                    {xLabel}
                </text>
            )}
            {yLabel && (
                <text x={20} y={viewBoxHeight / 2} textAnchor="middle" transform="rotate(-90,20,250)">
                    {yLabel}
                </text>
            )}
        </svg>
    );
}



function GraphDot({ data, xLabel, yLabel }) {
    const maxX = Math.max(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y));

    const viewBoxWidth = 500;
    const viewBoxHeight = 500;

    const scale = (num, maxNum, viewBoxDim) => (num / maxNum) * viewBoxDim;

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            {/* X axis */}
            <line x1="0" y1={viewBoxHeight - 50} x2={viewBoxWidth} y2={viewBoxHeight - 50} stroke="black" />
            {/* Y axis */}
            <line x1="50" y1={0} x2="50" y2={viewBoxHeight} stroke="black" />

            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={scale(d.x, maxX, viewBoxWidth - 100) + 50}
                    cy={viewBoxHeight - scale(d.y, maxY, viewBoxHeight - 100) - 50}
                    r="5"
                    fill="black"
                />
            ))}

            {xLabel && (
                <text x={viewBoxWidth / 2} y={viewBoxHeight - 20} textAnchor="middle">
                    {xLabel}
                </text>
            )}
            {yLabel && (
                <text x={20} y={viewBoxHeight / 2} textAnchor="middle" transform="rotate(-90,20,250)">
                    {yLabel}
                </text>
            )}
        </svg>
    );
}




function FunctionPlotShading({ functions, xRange, yRange, numPoints = 100, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();
  
    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
  
        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  
        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);
  
        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);
  
        functions.forEach(({ func, shade }, index) => {
            // Create the plot path
            let pathString = "";
            let fillPathString = "";
  
            for (let i = 0; i <= numPoints; ++i) {
                const x = xRange[0] + i / numPoints * (xRange[1] - xRange[0]);
                const y = func(x);
  
                const scaledX = scaleX(x);
                const scaledY = scaleY(y);
  
                if (i === 0) {
                    pathString += `M ${scaledX} ${scaledY} `;
                    fillPathString += `M ${scaledX} ${shade === 'greater' ? scaleY(yRange[1]) : scaleY(yRange[0])} L ${scaledX} ${scaledY} `;
                } else {
                    pathString += `L ${scaledX} ${scaledY} `;
                    fillPathString += `L ${scaledX} ${scaledY} `;
                }
  
                if (i === numPoints) {
                    fillPathString += `L ${scaledX} ${shade === 'greater' ? scaleY(yRange[1]) : scaleY(yRange[0])} Z`;
                }
            }
  
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathString);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'blue');
  
            const fillPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            fillPath.setAttribute('d', fillPathString);
            fillPath.setAttribute('fill', `rgba(0, 0, 255, ${0.3 + index * 0.2})`);
            fillPath.setAttribute('stroke', 'none');
  
            svg.appendChild(fillPath);
            svg.appendChild(path);
        });
  
        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');
  
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');
  
        svg.appendChild(xAxis);
        svg.appendChild(yAxis);
  
        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;
  
        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;
  
        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
    }, [functions, xRange, yRange, numPoints, xAxisLabel, yAxisLabel]);
  
    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );
  }

  

  function PointPlot({ points, drawLines = false, xRange, yRange, xAxisLabel = '', yAxisLabel = '' }) {
    const svgRef = useRef();
  
    useEffect(() => {
        const svg = svgRef.current;
        const width = svg.clientWidth;
        const height = svg.clientHeight;
  
        // Leave some space for labels
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  
        const scaleX = (x) => margin.left + (x - xRange[0]) / (xRange[1] - xRange[0]) * (width - margin.left - margin.right);
        const scaleY = (y) => height - margin.bottom - (y - yRange[0]) / (yRange[1] - yRange[0]) * (height - margin.top - margin.bottom);
  
        // Clear the SVG
        while (svg.lastChild) svg.removeChild(svg.lastChild);
  
        // Create points and optional lines
        points.forEach(([x, y], index) => {
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', scaleX(x));
            point.setAttribute('cy', scaleY(y));
            point.setAttribute('r', 5);
            point.setAttribute('fill', 'red');
  
            svg.appendChild(point);
  
            if(drawLines && index > 0) {
                const [prevX, prevY] = points[index - 1];
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', scaleX(prevX));
                line.setAttribute('y1', scaleY(prevY));
                line.setAttribute('x2', scaleX(x));
                line.setAttribute('y2', scaleY(y));
                line.setAttribute('stroke', 'red');
  
                svg.appendChild(line);
            }
        });
  
        // Create axes
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxis.setAttribute('x1', scaleX(xRange[0]));
        xAxis.setAttribute('y1', scaleY(0));
        xAxis.setAttribute('x2', scaleX(xRange[1]));
        xAxis.setAttribute('y2', scaleY(0));
        xAxis.setAttribute('stroke', 'black');
  
        const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxis.setAttribute('x1', scaleX(0));
        yAxis.setAttribute('y1', scaleY(yRange[0]));
        yAxis.setAttribute('x2', scaleX(0));
        yAxis.setAttribute('y2', scaleY(yRange[1]));
        yAxis.setAttribute('stroke', 'black');
  
        svg.appendChild(xAxis);
        svg.appendChild(yAxis);
  
        // Create labels
        const xAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xAxisLabelElement.setAttribute('x', scaleX(xRange[1]));
        xAxisLabelElement.setAttribute('y', scaleY(0) + margin.bottom / 2);
        xAxisLabelElement.setAttribute('text-anchor', 'end');
        xAxisLabelElement.textContent = xAxisLabel;
  
        const yAxisLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yAxisLabelElement.setAttribute('transform', `rotate(-90) translate(${-scaleY(yRange[1])} ${margin.left / 2})`);
        yAxisLabelElement.setAttribute('text-anchor', 'end');
        yAxisLabelElement.textContent = yAxisLabel;
  
        svg.appendChild(xAxisLabelElement);
        svg.appendChild(yAxisLabelElement);
  
    }, [points, drawLines, xRange, yRange, xAxisLabel, yAxisLabel]);
  
    return (
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    );
  }

export { FunctionPlot, PointPlot, FunctionPlotStep, FunctionPlotLine, ScatterPlot, Polygon, Graph, GraphDot, FunctionPlotShading} 