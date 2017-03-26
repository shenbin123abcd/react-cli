import React from 'react';
import Test from './test';
import Countdown from './Countdown';
import Toast from './Toast';
import VersonToast from './VersionToast';
import countdownPic from '../img/countdown.png';

const list=[
    {
        name:'佳能 EOS 6D',
        desc:'AR扫描佳能6D相机正面，有机会获得大礼包 会获得大礼包',
        endTime:'2017-03-20',
        picUrl:'',
        logoUrl:'',
        activityUrl:'',
    },
    {
        name:'佳能 EOS 6D',
        desc:'AR扫描佳能6D相机正面，有机会获得大礼包 会获得大礼包',
        endTime:'2017-03-20',
        picUrl:'',
        logoUrl:'',
        activityUrl:'',
    },
    {
        name:'佳能 EOS 6D',
        desc:'AR扫描佳能6D相机正面，有机会获得大礼包 会获得大礼包',
        endTime:'2017-03-20',
        picUrl:'',
        logoUrl:'',
        activityUrl:'',
    },
    {
        name:'佳能 EOS 6D',
        desc:'AR扫描佳能6D相机正面，有机会获得大礼包 会获得大礼包',
        endTime:'2017-03-20',
        picUrl:'',
        logoUrl:'',
        activityUrl:'',
    },
];

export default class App extends React.Component{
    constructor(){
        super();
        this.state={
            isShow:false,
            selectIndex:0,
            versionToast:false,
        }
    }
    setModal(obj){
        this.setState({
            isShow:obj.bool,
            selectIndex:obj.selectIndex
        })
    }
    controlVersionToast(){
        this.setState({
            versionToast:true,
        })
    }
    handleClick(){
        alert('test');
    }
    componentDidMount(){

    }
    handleTest(){
        console.log(2,this.refs.test)
        this.refs.test.console();
    }
    render(){
        const toastSettings={
            data:list,
            isShow:this.state.isShow,
            onCancel:()=>{
                this.setState({
                    isShow:false
                })
            },
            selectIndex:this.state.selectIndex
        }
        const countdownSettings={
            endTime:"2017-03-14 18:45:00",
            accurateHour:true,
            accurateMs:true,
            fn:()=>{
                console.log('倒计时结束')
            }
        }
        const versionToastSettings={
            isShow:this.state.versionToast,
            onCancel:()=>{
                this.setState({
                    versionToast:false,
                })
            }
        }
        return(
            <div className="container">
                <Countdown {...countdownSettings} />
                <Toast {...toastSettings} />
                <VersonToast {...versionToastSettings} />
                <img src={countdownPic} alt=""/>
                {
                    list.map((n,i)=>{
                        return(
                            <button onClick={this.setModal.bind(this,{bool:true,selectIndex:i})} key={i}>button{i}</button>
                        )
                    })
                }
                <button onClick={this.controlVersionToast.bind(this)}>版本弹框</button>
            </div>
        )
        //return(
        //    <div>
        //        <Test ref="test">
        //            <div onClick={this.handleTest.bind(this)}>asd</div>
        //            <div>123</div>
        //        </Test>
        //    </div>
        //)
    }
}
