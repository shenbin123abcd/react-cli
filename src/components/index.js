import React from 'react';
import Tabs from './Tabs';

export default class App extends React.Component{
    render(){
        const settings={
            selectFunc:()=>{
                console.log('tab切换了')
            },
            // tabs:[
            //     `<div>标题21</div>`,
            //     `<div>标题22</div>`,
            //     `<div>标题23</div>`,
            //     `<div>标题24</div>`,
            // ],
        }
        return(
            <div className="container" style={{width:'90%',margin:'auto'}}>
                <Tabs {...settings}>
                    <Tabs.TabPane data-title="标题1">
                        <div className="item">1</div>
                        <div className="icon">12</div>
                    </Tabs.TabPane>
                    <Tabs.TabPane data-title="标题2">
                        <div className="item">2</div>
                        <div className="icon">123</div>
                    </Tabs.TabPane>
                    <Tabs.TabPane data-title="标题3">
                        <div className="item">3</div>
                        <div className="icon">124</div>
                    </Tabs.TabPane>
                    <Tabs.TabPane data-title="标题4">
                        <div className="item">4</div>
                        <div className="icon">125</div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}
