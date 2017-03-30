/**
 * Created by shenbin on 2017/3/27.
 */
import React from 'react';

var tabNum=0;
var prevIndex=0;
var x='';

class TabPane extends React.PureComponent{
    render(){
        const { children }=this.props;
        return(
            <div>{children}</div>
        )
    }
}

class Tab extends React.PureComponent{
    handleClick(index){
        this.props.selectIndex(index);
    };
    render(){
        const { title,num,index,html }=this.props;
        const cls=()=>{
            if(html){
                return{
                    'flex':html.length<=5 ? `0 0 ${100/html.length}%` : '0 0 20%',
                    'textAlign': 'center',
                }
            }else{
                return null;
            }
        };
        const cls2=()=>{
            if(html){
                return{
                    width:'100%',
                    display:'block'
                }
            }else{
                return{
                    'flex':Tab.length<=5 ? `0 0 ${100/num}%` : '0 0 20%',
                    'textAlign': 'center',
                }
            }
        };
        const renderFun=()=>{
            if(html){
                return(
                    <div className="tabs-title-inner" style={{width:'100%',display:'flex'}}>
                        {
                            html.map((n,i)=>{
                                return(
                                    <div dangerouslySetInnerHTML={{__html:n}} key={i} className="tabs-title" style={cls()} onClick={this.handleClick.bind(this,i)}></div>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <div className="tabs-title" style={cls()} onClick={this.handleClick.bind(this,index)}>
                        {title}
                    </div>
                )
            }
        };
        return(
            <div style={cls2()}>
                {renderFun()}
            </div>
        )
    }
}

export default class Tabs extends React.PureComponent{
    constructor(){
        super()
        this.state={
            wrapperWidth:null,
            selectIndex:0,
        }
    }
    static TabPane=TabPane;
    componentDidMount(){
        const el=document.querySelector('.tabs-container-block');
        if(el){
            //console.log(el.parentNode.offsetWidth*tabNum)
            this.setState({
                wrapperWidth: el.parentNode.offsetWidth*tabNum,
            })
        }
    };
    selectIndex(index){
        if(index!==prevIndex){
            this.props.selectFunc && this.props.selectFunc();
        }
        this.setState({
            selectIndex:index
        })
    };
    render(){
        const{ wrapperWidth,selectIndex }=this.state;
        const{ children,tabs }=this.props;
        if(tabs) tabNum=tabs.length;
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
        };
        const paneItemWidth={
            width:singleWidth ? `${singleWidth}px` : '100%',
            flex:singleWidth ? `0 0 ${singleWidth}px` : '100%',
        }
        return(
            <div className="tabs-container-block">
                {
                    this.props.tabs
                        ?
                            <Tab html={tabs} selectIndex={this.selectIndex.bind(this)}/>
                        :
                            <div className="tabs-title-inner">
                                {
                                    React.Children.map(children,(child,index)=>{
                                        tabNum=children.length;
                                        return(
                                            <Tab title={child.props['data-title']} num={this.props.children.length} index={index} selectIndex={this.selectIndex.bind(this)}/>
                                        )
                                    })
                                }
                            </div>
                }
                <div className="tabs-pane-wrapper" style={paneWrapperStyle}>
                    {
                        React.Children.map(children,(child)=>{
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