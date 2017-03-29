import React from 'react';
import Tabs from './Tabs';
import Tabs2 from './Tabs2';

export default class App extends React.Component{
    handleClick(){
        alert(1)
    }
    render(){
        const settings1={
            Tab:[
                `<div>tab1</div>`,
                `<div>tab2</div>`,
                `<div>tab3</div>`,
                `<div>tab4</div>`,
            ],
            TabPane:[
                `<div onClick={alert(1)}>tabPane1</div>`,
                `<div onClick={alert(2)}>tabPane2</div>`,
                `<div onClick={alert(3)}>tabPane3</div>`,
                `<div onClick={alert(4)}>tabPane4</div>`,
            ]
        }
        const settings2={
            selectFunc:()=>{
                console.log('tab切换了')
            },
            tabs:[
                `<div>标题21</div>`,
                `<div>标题22</div>`,
                `<div>标题23</div>`,
                `<div>标题24</div>`,
            ],
        }

        return(
            <div className="container" style={{width:'90%',margin:'auto'}}>
                <Tabs {...settings1}>
                    <div></div>
                </Tabs>

                <div style={{width:'80%',margin:'30px auto 0 auto'}}>
                    <Tabs2 {...settings2}>
                        <div data-title="标题1">1</div>
                        <div data-title="标题2">2</div>
                        <div data-title="标题3">3</div>
                        <div data-title="标题4">4</div>
                    </Tabs2>
                </div>

            </div>
        )
    }
}
