import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import close from '../img/close-btn.png';
import warn from '../img/warn.png';

class Mask extends React.Component{
    render(){
        let renderPage=()=>{
            if(this.props.isShow){
                return(
                    <div className='version-mask' key='version-mask'>
                        <div className="mask-wrapper"></div>
                    </div>
                )
            }
        }

        return(
            <ReactCSSTransitionGroup
                transitionName="versionMaskTransition"
                component="div"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {renderPage()}
            </ReactCSSTransitionGroup>
        )
    }
}

class Toast extends React.Component{
    upload(){
        window.location.href='https://h5.m.jd.com/active/download/download.html';
    }
    handleTranstionEnd(){
        //const el=document.querySelector('.version-toast-wrapper');
        //console.log(el);
        //el.className=el.className.replace('version-toast-wrapper-fixed','');
    }
    render(){
        const renderPage=()=>{
            if(this.props.isShow){
                return(
                    <div className="version-toast-block" key="version-toast" onTransitionEnd={this.handleTranstionEnd}>
                        <div className="close-btn" onClick={this.props.onCancel}><img src={close} alt=""/></div>
                        <div className="container">
                            <div className="warn-logo"><img src={warn} alt=""/></div>
                            <div className="text">当前APP版本较低<br/>无法进行AR场景识别~赶紧更新吧</div>
                            <div className="btn upload" onClick={this.upload.bind(this)}>立即更新</div>
                            <div className="btn close" onClick={this.props.onCancel}>稍后更新</div>
                        </div>
                    </div>
                )
            }
        };

        return(
            <ReactCSSTransitionGroup
                transitionName="versionToastTransition"
                component="div"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {renderPage()}
            </ReactCSSTransitionGroup>
        )

    }
}

export default class VersonToast extends React.Component{
    constructor(){
        super();
    }
    //componentWillReceiveProps(props){
    //    const el=document.querySelector('.version-toast-wrapper');
    //    const className=el.className;
    //    if(props.isShow){
    //        if(className && className.indexOf('version-toast-wrapper-fixed')===-1){
    //            el.className=`${className} version-toast-wrapper-fixed`;
    //        }
    //    }
    //}
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
            <div className='version-toast-wrapper'>
                <Mask {...this.props}/>
                <Toast {...this.props}/>
            </div>
        )
    }
}
