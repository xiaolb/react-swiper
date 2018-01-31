import React from 'react'

import SliderItem from './sliderItem'
import SliderArrows from './sliderArrows'
import SliderDots from './sliderDots'
// import './extends/Hammer'


export default class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage:0,
            startX:0,
            endX:0
        };
    }

    /*  控制图片轮播的函数，n表示将要跳转到的位置 */
    turn(n) {
        let _n = this.state.nowPage + n ;
        if(_n === this.props.items.length) {
            _n = 0;
        }
        if(_n<0) {
            _n = this.props.items.length+_n
        }
        // console.log(1)
        this.setState({nowPage:_n});

    }

    /*  是否自动轮播  */
    autoPlay() {
        if(this.props.autoPlay) {
            this.autoPlayFlag = setInterval(() => {
                this.turn(1);
            },this.props.delay*1000);
        }
    }

    /* 停止自动轮播 */
    pausePlay(e) {
        clearInterval(this.autoPlayFlag);
    }

    /* 在移动端的时候触摸事件的开始，同时停止轮播 */
    TouchStart(event) {
        this.state.startX = event.targetTouches[0].pageX;
        clearInterval(this.autoPlayFlag);
        
    }
    touchMove(event) {
        this.state.endX = event.targetTouches[0].pageX;
    }

    /* 在移动端的时候触摸事件的结束，判断图片想做还是向右，并且启动自动轮播 */
    touchEnd(event) {
        if(this.state.endX-this.state.startX>0){
            this.turn(-1);
        }else{
            this.turn(1);
        }
        this.autoPlay();
    }

    /* 初次挂在的时候自动轮播 */
    componentDidMount() {
        this.autoPlay();
    }

   

    render() {
        let count = this.props.items.length;

        {/* arrowsNode表示当屏幕小于768的时候，不会出现左右箭头 */}
        let arrowsNode = null;

        {/* 通过flag控制鼠标进入、离开事件和触摸事件不同时进行，因为触摸事件触发的时候会先触发鼠标离开事件 */}
        let flag = false;

        let itemNodes = this.props.items.map((item,index) => {
            return <SliderItem item={item} count={count} key={"item"+index} />
        })


        if(document.body.clientWidth>768) {
            arrowsNode = <SliderArrows turn={this.turn.bind(this)} />
            flag = true;
        }; 


        let isPausePlay = flag ? ( this.props.pause ? this.pausePlay.bind(this) : null) : null;
        let isAutoPlay = flag ? ( this.props.autoPlay ? this.autoPlay.bind(this) : null) : null;

        let dotsNode = <SliderDots turn={this.turn.bind(this)} items={this.props.items} nowPage={this.state.nowPage}/>
        return (
            <div className='slider' 
                 onMouseOver={isPausePlay}
                 onMouseOut={isAutoPlay}
            >
                <ul className='Slide-ul'
                style={{
                    width:count*100+"%",
                    left:-100*this.state.nowPage+"%"
                }}
                onTouchStart={flag ? null : this.TouchStart.bind(this)}
                onTouchMove={flag ? null : this.touchMove.bind(this)}
                onTouchEnd={flag ? null : this.touchEnd.bind(this)}>
                    {itemNodes}
                </ul>
                {this.props.pause ? arrowsNode : null}
                {this.props.dots ? dotsNode : null}
            </div>
        )
    }
}