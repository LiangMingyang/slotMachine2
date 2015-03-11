var WAIT = 0;  //停止后空转多少圈
var NAME;      //中奖的名字是全局变量
var LIST = [];
var LUCKYLIST;      //中奖的列表
var MAXSPEED = 0.2;
var LOWSPEED = 0.04; //皆为正常值
var MINSPEED = 0.06; //最终减速的阈值，越大则所用时间越少
var SPEED = 0.001;
var FACTOR = 0.9;   //变成LOWSPEED的时间，越小越短
var DEC = -0.01; //减速度
var CONST = -0.05; //轮子停下的微调常量
var CNT = 0; //按键次数
var WATCH = 0; //是否在观看结果状态
var PROTECT = 0; //是否处在按键保护状态
var CLICK; //按键时的音效
var BG; //背景音效
var GOT;//跳出数字时的音效
var SIGN; //表示这个数组的意义
var RUN;
var VEDIO; //背景星空
var LUCKTYPE; //中奖人的类型 0 表示本科生 1非本科生
var LUCKERTYPE; //中奖人的类型，中文
var LUCKYSTAR;
var FREE = false;
var sign = function () {
    var div = document.createElement('div');
    div.className = "sign";

    var span = document.createElement('span');
    div.appendChild(span);

    var sign = new THREE.CSS3DObject(div);
    // 开头位置缓动效果初始位置
    sign.hide = function () {
        // 补间动画 位置
        new TWEEN.Tween(sign.position)
            .to({
                x: 8000 * Math.random() - 4000,
                y: 8000 * Math.random() - 4000,
                z: 8000 * Math.random() + 4000
            }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        // 补间动画 角度
        new TWEEN.Tween(sign.rotation)
            .to({
                x: 8 * Math.random() - 4,
                y: 8 * Math.random() - 4,
                z: 8 * Math.random() - 4
            }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    };
    sign.appear = function (type) {
        if(running())return ;
        if(type == 0) {
            new TWEEN.Tween(sign.position)
                .to({x: 0, y: 200, z: 300},
                1000)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            // 开头角度缓动效果
            new TWEEN.Tween(sign.rotation)
                .to({x: 0, y: 0, z: 0},
                1000)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        } else {
            new TWEEN.Tween(sign.position)
                .to({x: -700, y: 0, z: 300},
                500)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            // 开头角度缓动效果
            new TWEEN.Tween(sign.rotation)
                .to({x: 0, y: 0, z: 0},
                500)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            setTimeout(function () {
                new TWEEN.Tween(sign.position)
                    .to({x: -700+140, y: 0},
                    500)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
            },500);
        }
    };
    sign.position.x = (1000 * Math.random() + 2000) * (parseInt(Math.random()) ==0?1:-1);
    sign.position.y = (1000 * Math.random() + 2000) * (parseInt(Math.random()) ==0?1:-1);
    sign.position.z = (1000 * Math.random() + 2000) * (parseInt(Math.random()) ==0?1:-1);

    // 开头角度缓动初始化
    sign.rotation.x = 8 * Math.random() - 4;
    sign.rotation.y = 8 * Math.random() - 4;
    sign.rotation.z = 8 * Math.random() - 4;
    return sign;
};
var backGround = function() {
    var div = document.createElement('div');
    div.className = "backGround";
    var backGround = new THREE.CSS3DObject(div);
    backGround.position.z = -500;
    return backGround;
};
var CAMERA;    //全局照相机
var luckyName = function() {

    // name
    var div = document.createElement('div');
    div.className = 'name';

    NAME = document.createElement('span');
    div.appendChild(NAME);

    var name = new THREE.CSS3DObject(div);

    //name.position.z = 1700;
    //name.rotation.y = Math.PI;
    name.position.x = 1000;
    name.position.z = 1000;
    name.rotation.y = 3 * Math.PI / 2 ;
    return name;

};
var resultBoard = function () {
    var div = document.createElement('div');
    div.className = "result";
    LUCKYLIST = document.createElement('p');
    div.appendChild(LUCKYLIST);

    var resultBoard = new THREE.CSS3DObject(div);
    resultBoard.position.z = 2000;
    resultBoard.rotation.y = Math.PI;
    return resultBoard;
};
var Reel = function() {
    var radius = 300;

    this.obj = new THREE.Object3D();

    this.target = 0;   // 应当停下的位置

    this.omiga = SPEED;         // 角速度(每一帧移动的角向量)
    this.beta  = 0;    // 角加速度
    this.factor = FACTOR;
    this.lowSpeed = LOWSPEED;
    this.maxSpeed = MAXSPEED;
    this.minSpeed = MINSPEED;
    this.wait = WAIT;
    this.filter = 1;
    this.FILTER = 1;

    for (var i = 0; i < 10; ++i) {
        var div = document.createElement('div');
        div.className = 'digit';

        var span = document.createElement('span');
        span.textContent = i.toString();
        div.appendChild(span);

        var digit = new THREE.CSS3DObject(div);

        // 开头位置缓动效果初始位置
        digit.position.x = 2000 * Math.random() - 1000;
        digit.position.y = 2000 * Math.random() - 1000;
        digit.position.z = 2000 * Math.random() - 1000;

        // 开头角度缓动初始化
        digit.rotation.x = 8 * Math.random() - 4;
        digit.rotation.y = 8 * Math.random() - 4;
        digit.rotation.z = 8 * Math.random() - 4;

        // 添加数字卡片至元件
        this.obj.add(digit);
    }

    this.running = function () { //是不是在运行
        return this.omiga != 0;
    };

    this.build = function() {
        this.omiga = 0;
        this.obj.children.forEach(function (digit, index) {
            // 当前数字卡片的角度（10个数字均分360°）
            var r = Math.PI * index / 5;
            // 开头位置缓动效果
            new TWEEN.Tween(digit.position)
                .to({x: 0, y: radius * Math.sin(r), z: radius * Math.cos(r)},
                2000+4000*Math.random())
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            // 开头角度缓动效果
            new TWEEN.Tween(digit.rotation)
                .to({x: -r, y: 0, z: 0},
                2000+4000*Math.random())
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        })
    };

    this.free = function () {
        this.obj.children.forEach(function (digit) {
            // 补间动画 位置
            new TWEEN.Tween(digit.position)
                .to({
                    x: 2000 * Math.random() - 1000,
                    y: 2000 * Math.random() - 1000,
                    z: 2000 * Math.random() - 1000
                }, 2000+4000*Math.random())
                .easing(TWEEN.Easing.Exponential.Out)
                .start();
            // 补间动画 角度
            new TWEEN.Tween(digit.rotation)
                .to({
                    x: 8 * Math.random() - 4,
                    y: 8 * Math.random() - 4,
                    z: 8 * Math.random() - 4
                }, 2000+4000*Math.random())
                .easing(TWEEN.Easing.Exponential.Out)
                .start();
        });
        this.omiga = 0.001;
    };

    this.update = function() {
        if(this.beta < 0) { //减速状态
            if(this.omiga > this.lowSpeed) { //匀减速
                this.omiga += this.beta;
            } else
            if(this.omiga <= this.lowSpeed && this.omiga > this.minSpeed) { //指数形式减速
                this.omiga = this.omiga * this.factor;
            } else
            if(this.omiga <= this.minSpeed) { //匀减速
                if(this.status == 4) {
                    this.omiga += this.beta;
                }
                else {
                    this.status = 4;
                    var phi = (this.target * Math.PI / 5 - this.obj.rotation.x);
                    if(phi < 0) phi += 2 * Math.PI;
                    if((2 * this.wait * Math.PI +  phi + CONST) < Math.PI/180*10)phi += 2 * Math.PI;
                    this.beta = - (this.omiga * this.omiga) /
                    (2 * this.wait * Math.PI +  phi + CONST) /
                    2;
                    console.log("最后的减速"+this.beta);
                }
                if(this.omiga < 0) {
                    this.obj.rotation.x = this.target * Math.PI / 5;
                    this.omiga = 0;
                    this.beta = 0;
                    this.status = undefined;
                    if(this.onStopped) {
                        this.onStopped();
                        this.onStopped = undefined;
                    }
                }
            }
        }
        else if(this.beta > 0) {
            if(!this.running()) {
                if(this.onStart) {
                    this.onStart();
                    this.onStart = undefined;
                }
            }
            this.omiga += this.beta;
            if(this.omiga >= this.maxSpeed) {
                this.omiga = this.maxSpeed;
            }
        }


        var alpha = 0;
        this.obj.rotation.x += this.omiga;
        this.obj.rotation.x %= Math.PI*2;
        if(this.obj.rotation.x < 0) this.obj.rotation.x += Math.PI*2;
        var r = this.obj.rotation.x;
        for (var i = 0; i < 10; ++i, r -= Math.PI/5) {
            alpha = 0.4 + 0.5 * Math.cos(r);
            if(i != this.target) alpha *= this.filter;
            alpha *= this.FILTER;
            this.obj.children[i].element.style.opacity = alpha.toString();
            this.obj.children[i].element.style.filter = 'alpha(opacity='+(alpha*100).toString()+')';
        }
    };

    this.run = function () {
        this.maxSpeed = MAXSPEED;
        this.omiga = 0;
        this.beta  = 0.0025;
    };

    this.vibration = function () {
        var count = 0;
        var limit = 10; //one second
        var maxDelta = Math.PI/180*10; //上下动5度
        var dist1 = function(x) {return maxDelta-(maxDelta/limit)*x;};
        var dist2 = function(x) {return Math.sin(x);};
        var target = this.target;
        var x = this.obj;
        var interval_ID = setInterval(function () {
            x.rotation.x = target * Math.PI / 5+dist1(count)*dist2(count);
            ++count;
            if(count == limit) {
                clearInterval(interval_ID);
            }
        }, 20);
    };

    this.stop = function() {
        this.beta = DEC;
    };
    this.stopForce = function () {
        this.obj.rotation.x = this.target * (Math.PI/5);
        this.omiga = 0;
        this.beta = 0;
        this.vibration();
        if (this.onStopped) {
            this.onStopped();
            this.onStopped = undefined;
        }
    };
    this.hide = function() {
        new TWEEN.Tween(this)
            .to({filter: 0}, 500)
            //.easing(TWEEN.Easing.Exponential.InOut)
            .start();
    };
    this.hiden = function () {
        new TWEEN.Tween(this)
            .to({FILTER: 0}, 500)
            //.easing(TWEEN.Easing.Exponential.InOut)
            .start();
    };
    this.appear = function() {
        new TWEEN.Tween(this)
            .to({
                filter: 1,
                FILTER: 1
            }, 500)
            //.easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }
};
var reels = [];
function refresh() {
    SIGN.hide();
    BG.load();
    BG.play();
    GOT.pause();
    RUN.pause();
    reels.forEach(function (ele) {
        ele.omiga = 0;
        ele.beta  = 0;
        ele.lowSpeed = LOWSPEED;
        ele.maxSpeed = MAXSPEED;
        ele.minSpeed = MINSPEED;
        ele.factor = FACTOR;
        ele.wait = WAIT;
        ele.obj.rotation.x =
            (ele.obj.rotation.x % (2 * Math.PI) + Math.PI + Math.PI) % (2 * Math.PI);
        ele.appear();
        new TWEEN.Tween(ele.obj.rotation)
            .to({x:0}, 1000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        //ele.obj.rotation.x = 0;
    });
    setTimeout(function() {
        PROTECT = 0;
    },1000);
}

function run() {
    BG.pause();
    GOT.pause();
    RUN.load();
    RUN.play();
    reels.forEach(function (ele, index) {
        setTimeout(function () {
            ele.run();
            if(index == 7)PROTECT = 0;
        },250*index);
    })
}

function turnForward() {
    CAMERA.rotation.y = - Math.PI;
    new TWEEN.Tween(CAMERA.rotation)
        .to({y: 0}, 1000)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    if(CAMERA.position.z != 1000)
        setTimeout(function() {
            new TWEEN.Tween(CAMERA.position)
                .to({z: 1000}, 1000)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            setTimeout(function () {
                PROTECT = 0;
            },1000);
        }, 1000);
}

function turnLeft() {
    if(CAMERA.position.x != 0)
    new TWEEN.Tween(CAMERA.position)
        .to({x : 0}, 1000)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    if(CAMERA.rotation.y != 0)
    setTimeout(function() {
        new TWEEN.Tween(CAMERA.rotation)
            .to({y: 0}, 1000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        setTimeout(refresh,1000);
    }, 1000);
    else refresh();
}

function turnBack() {
    new TWEEN.Tween(CAMERA.position)
        .to({x: 0}, 1000)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    setTimeout(function() {
        new TWEEN.Tween(CAMERA.rotation)
            .to({y: -Math.PI}, 1000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        setTimeout(function() {
            new TWEEN.Tween(CAMERA.position)
                .to({z: 1500}, 1000)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            setTimeout(function() {
                PROTECT = 0;
            }, 1000)
        }, 1000);
    }, 1000);
}

function turnRight() {
    new TWEEN.Tween(CAMERA.rotation)
        .to({y: - Math.PI  / 2}, 1000)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    setTimeout(function() {
        new TWEEN.Tween(CAMERA.position)
            .to({x: 500}, 1000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        setTimeout(function () {
            PROTECT = 0;
        }, 1000);
    }, 1000);
}

function running() {
    var res = false;
    reels.forEach(function(ele) {
        if(ele.running()) {
            res = true;
        }
    });
    return res;
}

function stop(keyCode) {
    LUCKYSTAR = getLuckyStar();
    var backup = LUCKYSTAR;
    NAME.innerHTML = LUCKYSTAR.name;
    LUCKYSTAR = LUCKYSTAR.id;
    if(/^ *\d+ *$/.test(LUCKYSTAR[0])) {
        LUCKTYPE = 0;
        if(LUCKYSTAR[0] == '0') {
            LUCKERTYPE = "教师";
            NAME.innerHTML += "<br>教授";
        }
        else {
            LUCKERTYPE = "本科";
        }
    } else {
        LUCKTYPE = 1;
        LUCKERTYPE = LUCKYSTAR.substr(0,2);
        LUCKYSTAR = '0' + LUCKYSTAR.substr(2);
    }
    SIGN.element.children[0].textContent = LUCKERTYPE;
    LIST.push(backup.id + ' ' + backup.name);
    LUCKYLIST.innerHTML = "<span>获奖名单</span>" + LIST.join('<br>');
    var order;
    switch(keyCode) {
        case 16: //shift键
        case 83:
            order = [0,1,2,3,4,5,6,7];
            reels.forEach(function (ele, index) {
                setTimeout(function () {
                    ele.target = parseInt(LUCKYSTAR[index]);
                    if(order[index] == 7) ele.onStopped = function () {
                        RUN.pause();
                        BG.pause();
                        GOT.load();
                        GOT.play();
                        ele.hide();
                        SIGN.appear(LUCKTYPE);
                        if(LUCKTYPE == 1) {
                            reels[0].hiden();
                        }
                        PROTECT = 0;
                    };
                    else ele.onStopped = function() {
                        ele.hide();
                        SIGN.appear(LUCKTYPE);
                    };
                    if(order[index] == 6)  {
                        ele.wait = 0;
                        ele.stop();
                    }
                    else
                    if(order[index] == 7)  {
                        ele.wait = 0;
                        ele.stop();
                    }
                    else {
                        ele.stopForce();
                    }
                }, 500 * order[index]);
            });
            break;
        case 17: // ctrl键
            order = [0,1,2,3,4,5,6,7];
            reels.forEach(function (ele, index) {
                setTimeout(function () {
                    if(order[index] == 7) ele.onStopped = function () {
                        RUN.pause();
                        BG.pause();
                        GOT.load();
                        GOT.play();
                        ele.hide();
                        SIGN.appear(LUCKTYPE);
                        if(LUCKTYPE == 1) {
                            reels[0].hiden();
                        }
                        PROTECT = 0;
                    };
                    else ele.onStopped = function () {
                        SIGN.appear(LUCKTYPE);
                        ele.hide();
                    };
                    ele.target = parseInt(LUCKYSTAR[index]);
                    ele.stopForce();
                }, 500 * order[index]);
            });
            break;
        case 32: // 空格键
            order = [0,1,2,3,4,5,6,7];
            for(var i = 7 ; i > 0 ; --i) {
                var j = parseInt(Math.random()*i);
                var k = order[i];
                order[i] = order[j];
                order[j] = k;
            }
            reels.forEach(function (ele, index) {
                setTimeout(function () {
                    ele.target = parseInt(LUCKYSTAR[index]);
                    //ele.minSpeed = MINSPEED - order[index]*0.005;
                    if(order[index] == 7) ele.onStopped = function () {
                        RUN.pause();
                        BG.pause();
                        GOT.load();
                        GOT.play();
                        ele.hide();
                        SIGN.appear(LUCKTYPE);
                        if(LUCKTYPE == 1) {
                            reels[0].hiden();
                        }
                        PROTECT = 0;
                    };
                    else ele.onStopped = function () {
                        SIGN.appear(LUCKTYPE);
                        ele.hide();
                    };
                    if(order[index] == 7) ele.wait = 0;
                    ele.stop();
                }, 1000 * order[index]);
            });
            break;
    }
}

function build() {
    TWEEN.removeAll();
    reels.forEach(function (ele) {
        ele.build();
    });
    PROTECT = 0;
}

function undo() {
    LIST.pop();
    LUCKYLIST.innerHTML = "<span>获奖名单</span>" + LIST.join('<br>');
}

function free() {
    TWEEN.removeAll();
    reels.forEach(function (ele) {
        ele.free();
    });
}

var start = function() {
    BG = document.getElementById('bg');
    CLICK = document.getElementById('click');
    GOT = document.getElementById('got');
    RUN = document.getElementById('run');
    VIDEO = document.getElementById('video');
    var scene = new THREE.Scene();
    for (var i = 0; i < 8; ++i) {
        var reel = new Reel();
        reel.obj.position.x = 140 * i - 490;
        reel.obj.rotation.x = 0;

        scene.add(reel.obj);
        reels.push(reel);
    }
    scene.add(backGround());
    scene.add(luckyName());
    scene.add(resultBoard());
    SIGN = sign();
    scene.add(SIGN);
    var renderer = new THREE.CSS3DRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1, 1000
    );
    CAMERA = camera;
    camera.position.z = 1000;
    var render = function() {
        requestAnimationFrame(render);
        for (var i = 0; i < 8; ++i) {
            reels[i].update();
        }
        TWEEN.update();
        renderer.render(scene, camera);
    };
    render();
    window.onkeydown = function (event) {
        console.log(event.keyCode);
        if(event.keyCode == 80) {
            reels.forEach(function(ele,index) {
                ele.target = parseInt(LUCKYSTAR[index]);
                if(index == 7) ele.onStopped = function () {
                    RUN.pause();
                    BG.pause();
                    GOT.load();
                    GOT.play();
                    ele.hide();
                    SIGN.appear(LUCKTYPE);
                    if(LUCKTYPE == 1) {
                        reels[0].hiden();
                    }
                    PROTECT = 0;
                };
                else ele.onStopped = function () {
                    SIGN.appear(LUCKTYPE);
                    ele.hide();
                };
                ele.stopForce();
            });
            PROTECT = 0;
            return ;
        }
        if(PROTECT)return;
        switch(event.keyCode) {
            case 70:
                if(FREE) {
                    build();
                    FREE = false;
                } else {
                    free();
                    FREE = true;
                }
                break;
            case 85:
                undo();
                break;
            case 13:
                PROTECT = 1;
                CLICK.load();
                CLICK.play();
                switch (WATCH) {
                    case 0 : turnBack();WATCH = 1;break;
                    case 1 : turnForward();WATCH = 0;break;
                }
                break;
            case 16:
            case 32:
            case 17:
            case 83:
                if(WATCH)break;
                PROTECT = 1;
                CLICK.load();
                CLICK.play();
                ++CNT;
                switch (CNT) {
                    case 1:build();break;
                    case 2:refresh();break;
                    case 3:run();break;
                    case 4:stop(event.keyCode);break;
                    case 5:turnRight();break;
                    case 6:turnLeft(); CNT = 2;break;
                }
                break;
            case 68:
                localStorage.unlucky = "{}";
                alert("已删除历史");
                location.reload();
                break;
        }
    };

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
};

window.onload = start;