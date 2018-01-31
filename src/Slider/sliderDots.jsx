import React from 'react'

export default class SliderDots extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDotClick(count) {
        let option = count-this.props.nowPage;
        this.props.turn(option);
    }

    render() {
        let flag = true;
        {/* spanWidth表示调整不同屏幕情况下的圆点的大小 */}
        let spanWidth = 25;
        if(document.body.clientWidth<768) {
            flag = false;
            spanWidth = 20;
        };

        if(document.body.clientWidth<540) {
            flag = false;
            spanWidth = 15;
        };

        let dotsNode = this.props.items.map((items,index) => {
            return <span 
                key={'dot'+index}
                style={{width : spanWidth*0.6+"px",height : spanWidth*0.6+"px"}}
                className={'slider-dot'+(index === this.props.nowPage?" slider-dot-select":'')}
                onClick={flag ? this.handleDotClick.bind(this,index) : null}
                >
            </span>
        });

        return (
            <div className="slider-dots-wrap" style={{width:spanWidth*this.props.items.length + "px"}}>
                {dotsNode}
            </div>
        )
    }
}