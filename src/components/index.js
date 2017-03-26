import React from 'react';
import Tabs from './Tabs';

export default class App extends React.Component{
    handleClick(){
        alert(1)
    }
    render(){
        const settings={
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
        return(
            <div className="container" style={{width:'90%',margin:'auto'}}>
                <Tabs {...settings}/>
            </div>
        )
    }
}
