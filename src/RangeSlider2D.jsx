import React, { useState } from "react";

function RangeSlider2D(props) {
    let setPoint1X = props.setPoint1X ? props.setPoint1X : () => 1;
    let setPoint1Y = props.setPoint1Y ? props.setPoint1Y : () => 1;
    let setPoint2X = props.setPoint2X ? props.setPoint2X : () => 1;
    let setPoint2Y = props.setPoint2Y ? props.setPoint2Y : () => 1;
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

    let initial1X = props.initial1X ? props.initial1X : -1.5;
    let initial1Y = props.initial1Y ? props.initial1Y : -1.5;
    let initial2X = props.initial2X ? props.initial2X : 0.5;
    let initial2Y = props.initial2Y ? props.initial2Y : 1.5;

    let [point1Left, setPoint1Left] = useState(xToLeft(initial1X) - pointWidth / 2)
    let [point1Top, setPoint1Top] = useState(yToTop(initial1Y) - pointHeight / 2)
    let [point2Left, setPoint2Left] = useState(xToLeft(initial2X) - pointWidth / 2)
    let [point2Top, setPoint2Top] = useState(yToTop(initial2Y) - pointHeight / 2)

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

    let point1Style = {
        height: pointHeight + "px",
        width: pointWidth + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: point1Left + "px",
        top: point1Top + "px"
    }

    let point2Style = {
        height: pointHeight + "px",
        width: pointWidth + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: point2Left + "px",
        top: point2Top + "px"
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

    let boxStyle = {
        width: point2Left - point1Left + "px",
        height: point1Top - point2Top + "px",
        position: "absolute",
        left: point1Left + pointWidth / 2 + "px",
        top: point2Top + pointHeight / 2 + "px"
    }

    function handlePointMouseDown1(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag1(e2, e.nativeEvent.offsetX, e.nativeEvent.offsetY, e.target);
    }

    function handlePointMouseDown2(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag2(e2, e.nativeEvent.offsetX, e.nativeEvent.offsetY, e.target);
    }


    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function elementDrag1(e, ix, iy, target) {
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
        if (nextTop < point2Top) {
            nextTop = point2Top
            closeDragElement()
        }
        if (nextLeft > point2Left) {
            nextLeft = point2Left
            closeDragElement()
        }

        setPoint1Left(nextLeft)
        setPoint1Top(nextTop)
        setPoint1X(leftToX(nextLeft))
        setPoint1Y(topToY(nextTop))
    }

    function elementDrag2(e, ix, iy, target) {
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

        if (nextTop > point1Top) {
            nextTop = point1Top
            closeDragElement()
        }
        if (nextLeft < point1Left) {
            nextLeft = point1Left
            closeDragElement()
        }
        setPoint2Left(nextLeft)
        setPoint2Top(nextTop)
        setPoint2X(leftToX(nextLeft))
        setPoint2Y(topToY(nextTop))
    }



    return <div className="range-slider-2d">
        <div className="grid" style={gridStyle}>
            {includeAxis && <div className="axis axis-x" style={xaxisStyle}></div>}
            {includeAxis && <div className="axis axis-y" style={yaxisStyle}></div>}
            <div className="box" style={boxStyle}></div>
            <div className="point point-1" style={point1Style} onMouseDown={handlePointMouseDown1}></div>
            <div className="point point-2" style={point2Style} onMouseDown={handlePointMouseDown2}></div>

        </div>
    </div>
}

export default RangeSlider2D;

