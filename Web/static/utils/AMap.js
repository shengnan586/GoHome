//AMap.js
export default function MapLader(){
    return new Promise((resolve,reject)=>{
        if(window.AMap){
            resolve(window.AMap)
            
        }else{
            var script=document.createElement('script')
            script.type='text/javascript'
            script.async=true
            script.src='http://webapi.amap.com/maps?v=1.4.11&callback=initAMap&key=4c161a55f0be560b1d286efa4f731fe5'
            script.onerror=reject
            document.head.appendChild(script)
            
        }
        window.initAMap=()=>{
            resolve(window.AMap)
        }
    })
}