import React from 'react';
//<div className="countdown-block">
//    <div className="inner">
//        <div className="text">距结束</div>
//        <Countdown {...countdownSettings} />
//    </div>
//</div>
export default class Test extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    console(){
        alert('test');
    }
    componentDidMount(){
        var d=1;
        function sleep(time){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    if(d===1){
                        resolve('ok');
                    }else{
                        reject('fail');
                    }
                },time)
            })
        }
        async function start() {
            try{
                console.log('start');
                let result=await sleep(1000);
                console.log(result);
            }catch(err){
                console.log(err)
            }

        };
        start();


        function readonly(target, key, descriptor) {
            descriptor.name = 'asad'
            return descriptor
        }

        class Dog{
            @readonly
            bark () {
                return 'wang!wang!'
            }
        }

        let dog = new Dog()
    }
    render(){
        const renderPage=React.Children
            ?
                React.Children.map(this.props.children, (child)=>{
                    return (
                        <div>
                            {child}
                        </div>
                    )
                })
            :
                null;
        return(
            <div className="test-container">
                {renderPage}
            </div>
        )
    }
}