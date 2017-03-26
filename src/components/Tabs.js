/**
 * Created by shenbin on 2017-03-26.
 */
import React from 'react';


var prevIndex=0;
var x=0;
class Tab extends React.PureComponent{
    constructor(){
        super();
    }
    handleClick(index){
        this.props.selectIndex(index)
    }
    render(){
        const { Tab }=this.props;
        const itemStyle={
            'flex':Tab.length<=5 ? `0 0 ${100/Tab.length}%` : '0 0 20%',
            'textAlign': 'center',
        }
        return(
            <div className="tab-wrapper" style={{display:'flex',width:'100%'}}>
                {
                    Tab.map((n,i)=>{
                        return(
                            <div dangerouslySetInnerHTML={{__html:n}} key={i} style={itemStyle} onClick={this.handleClick.bind(this,i)}></div>
                        )
                    })
                }
            </div>
        )
    }
}

class TabPane extends React.PureComponent{
    constructor(){
        super()
    }
    render(){
        const { TabPane,wrapperWidth,selectIndex }=this.props;
        const singleWidth=Number(wrapperWidth/TabPane.length);
        const styleWidth={
            width:wrapperWidth ? `${wrapperWidth}px` : '100%',
            display:'flex',
            transition:`all ease-in-out .3s`,
            WebkitTransition:`all ease-in-out .3s`,
            transform:(()=>{
                if(selectIndex>prevIndex){
                    let num=Number(selectIndex-prevIndex);
                    x+=-(singleWidth*num)
                }else{
                    let num=Number(prevIndex-selectIndex);
                    x+=(singleWidth*num)
                }
                prevIndex=selectIndex;
                return `translate3d(${x}px,0,0)`
            })()
        }
        const styleItem={
            flex:wrapperWidth ? `0 0 ${singleWidth}px` : `0 0 100%`,
        }
        return(
            <div className="tabPane-wrapper" style={styleWidth}>
                {
                    TabPane.map((n,i)=>{
                        return(
                            <div dangerouslySetInnerHTML={{__html:n}} key={i} className="tabPane-item" style={styleItem}></div>
                        )
                    })
                }
            </div>
        )
    }
}


export default class Tabs extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:props || null,
            wrapperWidth:null,
            selectIndex:0,
        }
    }
    componentDidMount(){
        const EL=document.querySelector('.tabs-container');
        if(EL){
            const length=this.state.data.TabPane.length
            this.setState({
                wrapperWidth: EL.parentNode.offsetWidth*length
            })
        }
    }
    selectIndex(selectIndex){
        this.setState({
            selectIndex
        })
    }
    render(){
        const renderPage=this.state.data
            ?
                <div className="tabs-container" style={{width:'100%',overflow:'hidden'}}>
                    <Tab {...this.state.data} selectIndex={this.selectIndex.bind(this)}/>
                    <TabPane {...this.state.data} wrapperWidth={this.state.wrapperWidth} selectIndex={this.state.selectIndex}/>
                </div>
            :
                <div>loading...</div>;
        return(
            <div style={{width:'100%'}}>
                {renderPage}
            </div>
        )
    }
}