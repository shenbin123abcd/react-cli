import React from 'react';

var isFirst=true;
window.requestAnimationFrame=(function(){
   return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function (callback){
              window.setTimeout(callback,1000/60);
          };
})();
window.cancelAnimationFrame=(function(){
   return window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          function (callback){
              window.clearTimeout(callback);
          }
})();

export default class Countdown extends React.Component{
    constructor(props){
        super(props);
        const {d,h,m,s,ms}=this.getTime();
        this.state={
            d:d,
            h:h,
            m:m,
            s:s,
            ms:ms,
        }
    }
    getTime(){
        let d='',h='',m='',s='',ms='';
        let endTime=new Date(this.props.endTime.replace(/\-/g,'/')).getTime();
        let startTime=new Date().getTime();
        let t=endTime-startTime;
        this.componentWillUnmount();
        if(t>0){
            d=parseInt(t/1000/86400,10);
            if(!this.props.accurateHour){
                h=parseInt(t/1000/3600%24,10);
            }else{
                h=parseInt(t/1000/3600,10);
            }
            m=parseInt(t/1000/60%60,10);
            s=parseInt(t/1000%60,10);
            ms=parseInt(t%1000/100,10);

            d=d<10 ? '0'+d : d;
            h=h<10 ? '0'+h : h;
            m=m<10 ? '0'+m : m;
            s=s<10 ? '0'+s : s;
            ms=ms<10 ? '0'+ms : ms;
        }else{
            d='00';h='00';m='00';s='00';ms='00';
        }
        return{
            d,
            h,
            m,
            s,
            ms,
        }
    }
    timeoutStart(){
        let countDown=()=>{
            const {d,h,m,s,ms}=this.getTime();
            this.setState({
                d:d,
                h:h,
                m:m,
                s:s,
                ms:ms,
            });
        }

        if(isFirst && this.state.d=='00' && this.state.h=='00' && this.state.m=='00' && this.state.s=='00' && this.state.ms=='00'){
            this.props.fn && this.props.fn();
            isFirst=false;
        }else{
            if(this.props.accurateMs){
                this.timer=requestAnimationFrame(countDown);
            }else{
                this.timer=setTimeout(countDown,1000);
            }
        }
    }
    componentWillUnmount(){
        if(this.props.accurateMs){
            this.timer && cancelAnimationFrame(this.timer);
        }else{
            this.timer && clearTimeout(this.timer);
        }
    }
    //shouldComponentUpdate(nextProps,nextState){
    //    console.log(nextState);
    //    return true;
    //}
    render(){
        this.timeoutStart();
        return(
            <div className="countdown-wrapper">
                {
                    this.props.accurateHour ? null : <span className="day">{this.state.d}:</span>
                }
                <span className="hour">{this.state.h}:</span>
                <span className="minute">{this.state.m}:</span>
                <span className="seconds">{this.state.s}{this.props.accurateMs ? ':' : null}</span>
                {
                    this.props.accurateMs ? <span className="millisecond">{this.state.ms}</span> : null
                }
            </div>
        )
    }
}