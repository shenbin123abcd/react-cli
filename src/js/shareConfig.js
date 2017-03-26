//jdShare.sendDirectShare()
function shareConfig(url){
    return{
        title:'',
        content:'',
        img:'',
        callback:null,
        url:'',
        channel:'QRCode',
        qrparam:{
            qr_direct:url
        }
    }
}

