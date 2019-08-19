//定义three.js画布所需要的变量
var scene, camera, renderer,controls;
//定义画布div
var container;
//存储ajax请求返回的图片路径
var img = [];
//房子类型数量,房子id
var count,hid;
//房间类型
var room = ["客厅","厨房","洗手间","主卧","阳台"];
var parent = document.getElementById("parent");
var btn = document.getElementById("vr_btn");
//点击按钮实现房间类型div的消失与出现
btn.onclick = function(){
    var width = getComputedStyle(parent).width;
    parseInt(width) <= 0 ? parent.style.width="100%":parent.style.width=0;
}
// FUNCTIONS
function init()
{   
    //根据房间类型数量动态创建房间类型的div
    var str = "";
    for(var i = 0;i<count;i++){
        str += `<div class="items">
        <img src="Image/${hid}_${i}_f.jpg" alt="${i}">
        <div class="items_word">${room[i]}</div>
        </div>`;
    }
    parent.innerHTML = str;
    //点击房间类型的图片切换ar效果
    parent.onclick = function(e){
        if(e.target.nodeName = "IMG"){
            var index = parseInt(e.target.alt);
            scene.background = new THREE.CubeTextureLoader()
            .setPath('Image/')
            .load(img[index]);
        }
    }
    // 创建容器SCENE
    scene = new THREE.Scene();
    //设置相机参数
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    // 创建相机CAMERA
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(400, 400, 1500);
    camera.lookAt(scene.position);
    //将相机添加到容器中
    scene.add(camera);

    // 创建渲染器RENDERER

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    //将创建好的模型画到画布上
    container = document.getElementById('output');
    container.appendChild(renderer.domElement);
    //控制鼠标移动
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 光源设置
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);

    //将图片以背景模式贴到盒子上
    scene.background = new THREE.CubeTextureLoader()
        .setPath('Image/')
        .load(img[0]);
    //   .load(['1_0_r.jpg', "1_0_l.jpg", '1_0_u.jpg','1_0_d.jpg','1_0_f.jpg','1_0_b.jpg']);

}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    controls.update();
}

//渲染
function render() {
    renderer.render(scene, camera);
}

function imgs() {
    //获取url中？后面的参数
    var urlPar = new URLSearchParams(location.search);
    //获取上一个页面传递过来的uid
    hid = urlPar.get("hid");
    //获取上一个页面传递过来的房间类型数量
    count = urlPar.get("count");
    //发送ajax请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            img = result.data;
            init();
            animate();
        }
    }
    xhr.open("get", `/ar/?hid=${hid}&count=${count}`, true);
    xhr.send();
}
imgs();
//init();
//animate();