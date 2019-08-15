(function(){
    var scene, camera, renderer;
    var container, controls;
    
    init();
    animate();
    var parent = document.getElementById("parent");
    var btn = document.getElementById("vr_btn");
    btn.onclick = function(){
        var width = getComputedStyle(parent).width;
        console.log(parseInt(width));
        parseInt(width) <= 0 ? parent.style.width="100%":parent.style.width=0;
    }
    // FUNCTIONS
    function init()
    {   
        var img1 = document.getElementById("img1");
        img1.onclick = function(){
            scene.background = new THREE.CubeTextureLoader()
            .setPath( 'Image/' )
            .load(['1_0_r.jpg','1_0_l.jpg','1_0_u.jpg','1_0_d.jpg','1_0_f.jpg','1_0_b.jpg']);
        }
        var img4 = document.getElementById("img4");
        img4.onclick = function(){
            scene.background = new THREE.CubeTextureLoader()
            .setPath( 'Image/' )
            .load(['1_3_r.jpg','1_3_l.jpg','1_3_u.jpg','1_3_d.jpg','1_3_f.jpg','1_3_b.jpg']);
        }
        var img3 = document.getElementById("img3");
        img3.onclick = function(){
            scene.background = new THREE.CubeTextureLoader()
            .setPath( 'Image/' )
            .load(['1_2_r.jpg','1_2_l.jpg','1_2_u.jpg','1_2_d.jpg','1_2_f.jpg','1_2_b.jpg']);
        }
        var img2 = document.getElementById("img2");
        img2.onclick = function(){
            scene.background = new THREE.CubeTextureLoader()
            .setPath( 'Image/' )
            .load(['1_1_r.jpg','1_1_l.jpg','1_1_u.jpg','1_1_d.jpg','1_1_f.jpg','1_1_b.jpg']);
        }
        // 创建容器SCENE
        scene = new THREE.Scene();
        console.log(typeof(scene));
        //设置相机参数
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        // 创建相机CAMERA
        camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.set(400,400,1500);
        camera.lookAt(scene.position);
        //将相机添加到容器中
        scene.add(camera);

        // 创建渲染器RENDERER

        renderer = new THREE.WebGLRenderer( {antialias:true} );
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        container = document.getElementById( 'output' );
        container.appendChild( renderer.domElement );

        controls = new THREE.OrbitControls( camera, renderer.domElement );

        // LIGHT
        var light = new THREE.PointLight(0xffffff);
        light.position.set(0,250,0);
        scene.add(light);

        scene.background = new THREE.CubeTextureLoader()
         .setPath( 'Image/' )
         .load(['1_0_r.jpg','1_0_l.jpg','1_0_u.jpg','1_0_d.jpg','1_0_f.jpg','1_0_b.jpg']);

    }

    function animate()
    {
        requestAnimationFrame( animate );
        render();
        update();
    }

    function update()
    {
        controls.update();
    }

    function render()
    {
        renderer.render( scene, camera );
    }
})()
