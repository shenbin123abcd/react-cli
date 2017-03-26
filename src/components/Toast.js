import React from 'react';
import Slider from 'react-slick';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import VersionToast from './VersionToast';
//设置默认logo,pic
import defaultLogo from '../img/button.png';
import defaultPic from '../img/close-btn.png';
import toast from '../img/toast.png';
import button from '../img/button.png';
import closeBtn from '../img/close-btn.png';

class Mask extends React.Component{
    render(){
        const renderPage=this.props.isShow
            ?
                <div className='mask-show' key='mask-wrapper'>
                    <div className="mask-wrapper"></div>
                </div>
            :
                null;
        return(
            <ReactCSSTransitionGroup
                transitionName="maskTransition"
                component="div"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {renderPage}
            </ReactCSSTransitionGroup>
        )
    }
}

class Modal extends React.Component{
    constructor(){
        super();
        this.state={
            showText:false,
            bool:true,
            currentIndex:1,
            versionToastIsShow:false,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            currentIndex:nextProps.selectIndex+1
        })
    }
    afterChange(event){
        let len=this.props.data.length;
        if(event===len-1){
            this.setState({
                showText:true,
                bool:true,
                currentIndex:event+1,
            });
        }else{
            this.setState({
                showText:false,
                bool:false,
                currentIndex:event+1
            });
        }
    }
    onCancel(){
        this.setState({
            showText:false,
            bool:true,
        }),
        this.props.onCancel();
    }
    handleClick(bool){
        if(!bool){
            alert(1)
        }
    }
    imgErr(e,type){
        if(type==='logo'){
            e.target.src=defaultLogo;
        }else{
            e.target.src=defaultPic;
        }
    }
    jdAppVersion(){
        let ua=navigator.userAgent.toLowerCase();
        let uaArr=ua.split(';');
        let jdApp=ua.indexOf('jdapp')!=-1;
        if(jdApp && uaArr[2]){
            try{
                return parseInt(uaArr[2].replace(/\./g,''));
            }catch(e){

            }
        }else{}
    }
    handleStart(){
        let version=this.jdAppVersion();
        if(version>=600){
            //进入AR识别页
        }else{
            this.props.onCancel();
            setTimeout(()=>{
                this.setState({
                    versionToastIsShow:true
                });
            },500);
        }
    }
    render(){
        const { selectIndex,isShow,data }=this.props;
        let { showText,bool,currentIndex }=this.state;
        if(selectIndex===data.length-1 && bool) showText=true;

        const settings={
            dots: false,
            infinite: false,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding:'40px',
            vertical:false,
            easing:'linear',
            focusOnSelect: false,
            mobileFirst:true,
            draggable:false,
            accessibility:true,
            arrows: false,
            afterChange:this.afterChange.bind(this),
            initialSlide:selectIndex,
            swipe:data.length===1 ? false : true,
        };

        const slickList=data.map((n,i)=>{
            return(
                <div key={i}>
                    <div className="toast-wrapper">
                        <div className="logo">
                            <img src={n.logoUrl} alt="" onError={(e,type)=>{this.imgErr(e,'logo')}}/>
                        </div>
                        <div className="toast-content">
                            {
                                n.name ? <div className="title">{n.name}</div> : <div></div>
                            }
                            <div className="date">活动有效期至 {n.endTime}</div>
                            <div className="award-block">
                                <img src={n.picUrl} alt="" onError={(e,type)=>{this.imgErr(e,'pic')}}/>
                            </div>
                            <div className="desc">{n.desc}</div>
                        </div>
                        <img className="button" src={button} alt="" onClick={this.handleStart.bind(this)}/>
                    </div>
                </div>
            )
        });

        const clickText=(bool)=>{
            const style=bool ? 'text-block' : 'text-block opacity';
            const key=bool ? 'text' : 'text_opacity';
            if(showText){
                return(
                    <div className={style} key={key} onClick={this.handleClick.bind(this,bool)}>
                        点<br/>击<br/>进<br/>入<br/>扫<br/>描<br/>识<br/>别
                    </div>
                )
            }
        }

        const renderContainer=isShow
            ?
                <div className="modal-container" key="modal-container">
                    <div className="top-block">
                        <div className="top-text">{this.state.currentIndex} / {data.length}</div>
                        <img src={closeBtn} alt="" className="close-btn" onClick={this.onCancel.bind(this)}/>
                    </div>
                    <div className="content-block" >
                        <Slider {...settings} ref="slider">
                            {slickList}
                        </Slider>
                        <ReactCSSTransitionGroup
                            transitionName="textTransition"
                            component="div"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={100}
                        >
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            :
                <div></div>;

        return(
            <ReactCSSTransitionGroup
                transitionName="toastTransition"
                component="div"
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}
            >
                {renderContainer}
                <VersionToast isShow={this.state.versionToastIsShow} onCancel={()=>{this.setState({versionToastIsShow:false})}}/>
            </ReactCSSTransitionGroup>
        )
    }
}

export default class Toast extends React.Component{
    preventEvent(e){
        e.preventDefault();
    }
    componentWillReceiveProps(props){
        try{
            if(props.isShow){
                document.querySelector('body').addEventListener('touchmove',this.preventEvent, {passive: false});
            }else{
                document.querySelector('body').removeEventListener('touchmove',this.preventEvent,{passive: false});
            }
        }catch(e){
            console.log(e);
        }
    }
    render(){
        return(
            <div className="slick-toast-wrapper">
                <Mask {...this.props}/>
                <Modal {...this.props}/>
            </div>
        )
    }
}