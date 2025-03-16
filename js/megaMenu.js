document.addEventListener("DOMContentLoaded", () => {
    // btn-menu 설정
    const $btnMenu = $(".btn-menu");
    const $btnClose = $("#btn-close");
    const $megaMenu = $(".mega-menu");
    let matterInstance = null;
    let isPhysicsEnabled = false;

    // 초기 위치 설정 (상단으로 이동)
    const initialPositions = [
        { x: 50, y: 25 }, // 로고
        { x: 1800, y: 25 }, // 닫기버튼
        { x: 50, y: 130 }, // 홈
        { x: 375, y: 130 }, // 정희주
        { x: 1450, y: 630 }, // 컨텍
        { x: 50, y: 380 }, // 프로젝트
        { x: 980, y: 380 }, // 마이크로사이트
        { x: 1550, y: 380 }, // 웹
        { x: 980, y: 510 }, // 배너
        { x: 1365, y: 510 }, // 앱
        { x: 1700, y: 510 }, // 외
        { x: 980, y: 130 }, // line1
        { x: 980, y: 205 }, // line2
        { x: 1200, y: 205 }, // line3
        { x: 1400, y: 280 }, // line4
        { x: 400, y: 635 }, // line5
        { x: 640, y: 635 }, // line6
        { x: 640, y: 710 }, // line7
        { x: 640, y: 785 }, // line8
        { x: 50, y: 740 }, // line9
        { x: 50, y: 815 }, // line10
        { x: 1430, y: 150, angle: Math.PI / 18 }, // badge1
        { x: 1120, y: 225, angle: -Math.PI / 12 }, // badge2 (-45도 회전)
        { x: 630, y: 600, angle: -Math.PI / 18 }, // badge3 (60도 회전)
        { x: 750, y: 480 }, // stroke
    ];

    // 초기 위치 즉시 적용
    function setInitialPositions() {
        const textElements = document.querySelectorAll(".text-element");
        textElements.forEach((element, index) => {
            const pos = initialPositions[index];
            const xPos = pos.x;
            const yPos = pos.y;
            const angle = pos.angle || 0;

            element.style.left = "0";
            element.style.top = "0";
            element.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}rad)`;
        });
    }

    // DOM 로드 시 즉시 위치 설정
    setInitialPositions();

    // Matter.js 모듈 설정
    const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

    function initMatterJs() {
        // 엔진 및 렌더러 생성
        const engine = Engine.create();
        engine.world.gravity.y = 2;

        const render = createRender(engine);
        const boundaries = createBoundaries();
        const bodies = createElements(engine);

        World.add(engine.world, boundaries);
        setupClickHandlers(bodies);

        // 렌더링 시작
        Engine.run(engine);
        Render.run(render);

        // DOM 요소 업데이트 시작
        startElementsUpdate(bodies);
        setupResizeHandler(render, boundaries[0]);

        return { engine, render, bodies, boundaries };
    }

    function createRender(engine) {
        return Render.create({
            element: document.getElementById("canvas-container"),
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: "transparent",
            },
        });
    }

    function createBoundaries() {
        const wallThickness = 60; // 벽 두께
        const worldWidth = window.innerWidth;
        const worldHeight = window.innerHeight;
        const ceilingHeight = worldHeight * 2; // 천장 높이를 화면 높이의 2배로 설정

        // 공통 렌더링 옵션
        const renderOptions = {
            fillStyle: "transparent",
            strokeStyle: "#transparent", // 빨간색 테두리
        };

        // 바닥 (20px 위로 올림)
        const ground = Bodies.rectangle(
            worldWidth / 2, // x: 화면 가운데
            worldHeight - 20, // y: 화면 맨 아래에서 20px 위로
            worldWidth + wallThickness, // 너비: 화면 너비 + 벽 두께
            wallThickness, // 높이
            {
                isStatic: true,
                render: renderOptions,
            }
        );

        // 천장
        const ceiling = Bodies.rectangle(
            worldWidth / 2, // x: 화면 가운데
            -ceilingHeight, // y: 화면 위
            worldWidth + wallThickness, // 너비: 화면 너비 + 벽 두께 (양쪽 벽과 겹치도록)
            wallThickness, // 높이
            {
                isStatic: true,
                render: renderOptions,
            }
        );

        // 왼쪽 벽
        const leftWall = Bodies.rectangle(
            -20, // x: 화면 왼쪽 끝
            (worldHeight - ceilingHeight) / 2, // y: 천장과 바닥 사이의 중간점
            wallThickness, // 너비
            ceilingHeight + worldHeight + wallThickness, // 높이: 전체 높이 + 바닥/천장과 겹치는 부분
            {
                isStatic: true,
                render: renderOptions,
            }
        );

        // 오른쪽 벽
        const rightWall = Bodies.rectangle(
            worldWidth + 10, // x: 화면 오른쪽 끝
            (worldHeight - ceilingHeight) / 2, // y: 천장과 바닥 사이의 중간점
            wallThickness, // 너비
            ceilingHeight + worldHeight + wallThickness, // 높이: 전체 높이 + 바닥/천장과 겹치는 부분
            {
                isStatic: true,
                render: renderOptions,
            }
        );

        return [ground, ceiling, leftWall, rightWall];
    }

    function createElements(engine) {
        const bodies = [];
        const textElements = document.querySelectorAll(".text-element");

        textElements.forEach((element, index) => {
            const pos = initialPositions[index];
            const angle = pos.angle || 0;

            // 회전을 고려한 정확한 위치 계산을 위해
            // 1. 요소의 크기를 먼저 구하고
            const width = element.offsetWidth;
            const height = element.offsetHeight;

            // 2. 회전을 고려한 중심점 계산
            const centerX = pos.x + width / 2;
            const centerY = pos.y + height / 2;

            const body = Bodies.rectangle(centerX, centerY, width, height, {
                render: { fillStyle: "transparent" },
                angle: angle,
                restitution: 0.4,
                friction: 0.2,
                frictionAir: 0.001,
                isStatic: true,
                element: element,
            });
            bodies.push(body);
            World.add(engine.world, body);
        });

        return bodies;
    }

    function setupClickHandlers(bodies) {
        const $link = $(".text-container a");
        $link.on("click", (e) => e.preventDefault());

        // megaMenu 영역 클릭 이벤트
        $megaMenu.on("click", (event) => {
            // 물리엔진이 활성화되지 않았거나 close 버튼 클릭시 무시
            if (!isPhysicsEnabled || event.target.id === "btn-close") return;

            // 첫 클릭에만 물리효과 적용
            if (bodies.some((body) => body.isStatic)) {
                bodies.forEach((body) => {
                    if (body.isStatic) {
                        Body.setStatic(body, false);
                        Body.setVelocity(body, {
                            x: (Math.random() - 0.5) * 7,
                            y: -Math.random() * 5 - 10,
                        });
                        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);
                    }
                });

                $link.unbind("click");
            }
        });
    }

    function startElementsUpdate(bodies) {
        function update() {
            bodies.forEach((body) => {
                const element = body.element;
                if (element) {
                    const pos = body.position;
                    const angle = body.angle;
                    element.style.transform = `translate(${pos.x - element.offsetWidth / 2}px, ${
                        pos.y - element.offsetHeight / 2
                    }px) rotate(${angle}rad)`;
                }
            });
            requestAnimationFrame(update);
        }
        update();
    }

    function setupResizeHandler(render, ground) {
        window.addEventListener("resize", () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Body.setPosition(ground, {
                x: window.innerWidth / 2,
                y: window.innerHeight - 20,
            });
        });
    }

    function enablePhysics() {
        if (!matterInstance) {
            matterInstance = initMatterJs();
        }
        isPhysicsEnabled = true;
    }

    // 메가메뉴 transition이 끝난 후 실행될 함수
    function onMenuTransitionEnd(e) {
        // right 속성의 transition이 끝났을 때만 처리
        if (e.propertyName === "right") {
            enablePhysics();
            // transition 이벤트 리스너 제거
            $megaMenu[0].removeEventListener("transitionend", onMenuTransitionEnd);
        }
    }

    // 메뉴 버튼 클릭 이벤트
    $btnMenu.on("click", () => {
        // 1. 메뉴 활성화
        $megaMenu.addClass("active");

        // 2. transition 완료 후 Matter.js 초기화
        $megaMenu[0].addEventListener("transitionend", onMenuTransitionEnd);
    });

    // 닫기 버튼 클릭 이벤트
    $btnClose.on("click", () => {
        $megaMenu.removeClass("active");
    });

    // 용돈 랜덤 설정
    const $money = ["500", "777", "5000", "10000", "230"];
    const index = Math.floor(Math.random() * 5);
    const moneyIndex = $money[index];

    const $won = $(".badge3 b");

    window.addEventListener("load", () => {
        $won.prepend(moneyIndex);
    });
});
