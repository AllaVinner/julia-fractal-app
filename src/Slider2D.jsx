import React, { useState } from "react";

function Slider2D(props) {
    // Handle props
    let setPointX = props.setPointX ? props.setPointX : () => 1;
    let setPointY = props.setPointY ? props.setPointY : () => 1;
    let gridWidth = props.gridWidth ? props.gridWidth : 500;
    let gridHeight = props.gridHeight ? props.gridHeight : 500;

    let gridMinX = props.gridMinX ? props.gridMinX : -2.
    let gridMinY = props.gridMinY ? props.gridMinY : -2.
    let gridMaxX = props.gridMaxX ? props.gridMaxX : 2.
    let gridMaxY = props.gridMaxY ? props.gridMaxY : 2.

    let pointHeight = props.pointHeight ? props.pointHeight : 20
    let pointWidth = props.pointWidth ? props.pointWidth : 20
    let includeAxis = typeof props.includeAxis == "boolean" ? props.includeAxis : true
    let axisThickness = props.axisThickness ? props.axisThickness : 1

    let initialX = typeof props.initialX == 'number' ? props.initialX : -1;
    let initialY = typeof props.initialY == 'number' ? props.initialY : 0.25;

    // Setup reactives
    let [pointLeft, setPointLeft] = useState(xToLeft(initialX) - pointWidth / 2)
    let [pointTop, setPointTop] = useState(yToTop(initialY) - pointHeight / 2)

    function xToLeft(x) {
        return (x - gridMinX) / (gridMaxX - gridMinX) * gridWidth
    }

    function yToTop(y) {
        return (gridMaxY - y) / (gridMaxY - gridMinY) * gridHeight
    }

    function leftToX(left) {
        return (left + pointWidth / 2) / gridWidth * (gridMaxX - gridMinX) + gridMinX
    }

    function topToY(top) {
        return gridMaxY - (top + pointHeight / 2) / gridHeight * (gridMaxY - gridMinY)
    }

    let gridStyle = {
        height: gridHeight + "px",
        width: gridWidth + "px",
        position: "relative"
    }

    let pointStyle = {
        height: pointHeight + "px",
        width: pointWidth + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: pointLeft + "px",
        top: pointTop + "px"
    }

    let xaxisStyle = {
        width: gridWidth + "px",
        height: axisThickness + "px",
        position: "absolute",
        left: "0",
        top: yToTop(0) + "px"
    }

    let yaxisStyle = {
        width: axisThickness + "px",
        height: gridHeight + "px",
        position: "absolute",
        left: xToLeft(0) + "px",
        top: "0"
    }


    function handlePointMouseDown(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag(e2, e.nativeEvent.offsetX, e.nativeEvent.offsetY, e.target);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function elementDrag(e, ix, iy, target) {
        e.preventDefault();

        // calculate the new cursor position:
        // set the element's new position:
        let nextLeft = e.target.offsetLeft - ix
        let nextTop = e.target.offsetTop - iy
        if (!e.target.offsetParent) {
            closeDragElement()
            return
        }
        if (e.target.offsetParent.className == 'grid') {
            nextLeft = e.pageX - e.target.offsetParent.offsetLeft - ix
            nextTop = e.pageY - e.target.offsetParent.offsetTop - iy
        } else {
            nextLeft = e.offsetX - ix
            nextTop = e.offsetY - iy
        }

        if (nextLeft < 0) {
            nextLeft = 0
            closeDragElement()
        }
        if (nextLeft > gridWidth - pointWidth) {
            nextLeft = gridWidth - pointWidth
            closeDragElement()
        }
        if (nextTop < 0) {
            nextTop = 0
            closeDragElement()
        }
        if (nextTop > gridHeight - pointHeight) {
            nextTop = gridHeight - pointHeight
            closeDragElement()
        }
        setPointLeft(nextLeft)
        setPointTop(nextTop)
        setPointX(leftToX(nextLeft))
        setPointY(topToY(nextTop))
    }


    return <div className="slider-2d">
        <div className="grid" style={gridStyle}>
            {includeAxis && <div className="axis x" style={xaxisStyle}></div>}
            {includeAxis && <div className="axis y" style={yaxisStyle}></div>}
            <div className="point" style={pointStyle} onMouseDown={handlePointMouseDown}></div>
        </div>
    </div>
}

export default Slider2D;

