/**
 * Created by shenbin on 2017/3/27.
 */
import React from 'react';

var tabNum=0;
var prevIndex=0;
var x='';

class Tab extends React.PureComponent{
    handleClick(index){
        this.props.selectIndex(index);
    }
    render(){
        const { title,num,index }=this.props;
        const cls={
            'flex':Tab.length<=5 ? `0 0 ${100/num}%` : '0 0 20%',
            'textAlign': 'center',
        };
        return(
            <div className="tabs-title" style={cls} onClick={this.handleClick.bind(this,index)}>
                {title}
            </div>
        )
    }
}

class Tab2 extends React.PureComponent{
    handleClick(index){
        this.props.selectIndex(index);
    }
    render(){
        const { html }=this.props;
        const cls={
            'flex':html.length<=5 ? `0 0 ${100/html.length}%` : '0 0 20%',
            'textAlign': 'center',
        };
        return(
            <div className="tabs-title-inner" style={{width:'100%',display:'flex'}}>
                {
                    html.map((n,i)=>{
                        return(
                            <div dangerouslySetInnerHTML={{__html:n}} key={i} className="tabs-title" style={cls} onClick={this.handleClick.bind(this,i)}></div>
                        )
                    })
                }
            </div>
        )
    }
}

export default class Tabs2 extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            wrapperWidth:null,
            selectIndex:0,
        }
    }
    componentDidMount(){
        const EL=document.querySelector('.tabs-container-block');
        if(EL){
            console.log(EL.parentNode.offsetWidth*tabNum)
            this.setState({
                wrapperWidth: EL.parentNode.offsetWidth*tabNum,
            })
        }
    }
    selectIndex(index){
        if(index!==prevIndex){
            this.props.selectFunc && this.props.selectFunc();
        }
        this.setState({
            selectIndex:index
        })
    }
    render(){
        if(this.props.tabs) tabNum=this.props.tabs.length;
        const{ wrapperWidth,selectIndex }=this.state;
        const singleWidth=Number(wrapperWidth/tabNum);
        const paneWrapperStyle={
            width: wrapperWidth ? `${wrapperWidth}px` : '100%',
            transform:(()=>{
                if(selectIndex>prevIndex){
                    let num=Number(selectIndex-prevIndex);
                    x-=(singleWidth*num)
                }else if(selectIndex<prevIndex){
                    let num=Number(prevIndex-selectIndex);
                    x+=(singleWidth*num)
                }else{
                    x=0;
                }
                prevIndex=selectIndex;
                return `translate3d(${x}px,0,0)`
            })()
        }
        const paneItemWidth={
            width:singleWidth ? `${singleWidth}px` : '100%',
            flex:singleWidth ? `0 0 ${singleWidth}px` : '100%',
        }
        {/*const renderContainer=(obj)=>{*/}
        //     if(Object.prototype.toString.call(obj.props.children)==='[object Array]'){
        //         obj.props.children.forEach((n,i)=>{
        //             renderContainer(n)
        //         })
        //     }
        //
        //     return obj
        // }
        return(
            <div className="tabs-container-block">
                <div className="tabs-title-wrapper">
                    {
                        this.props.tabs
                            ?
                                <Tab2 html={this.props.tabs} selectIndex={this.selectIndex.bind(this)}/>
                            :
                                React.Children.map(this.props.children,(child,index)=>{
                                    tabNum=this.props.children.length;
                                    return(
                                        <Tab title={child.props['data-title']} num={this.props.children.length} index={index} selectIndex={this.selectIndex.bind(this)}/>
                                    )
                                })
                    }
                </div>
                <div className="tabs-pane-wrapper" style={paneWrapperStyle}>
                    {
                        React.Children.map(this.props.children,(child)=>{
                            return (
                                <div className="tabs-pane" style={paneItemWidth} >
                                    {child}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}