let panel;
let start;
let frames = 0;

// 단순히 div요소를 만들어 반환하는 함수 (이 예제에서 panel에 사용 될 것이다.)
const create = () => {
  const div = document.createElement('div');

  div.style.position = 'fixed';
  div.style.left = '0px';
  div.style.top = '0px';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.backgroundColor = 'black';
  div.style.color = 'white';

  return div;
};

// requestAnimationFrame의 인자로 전달 할 콜백 함수
// 이 함수는 1초에 사용자의 디스플레이 주사율만큼 호출된다. (모던한 대부분의 브라우저에)
const tick = () => {
  // 그렇다면 주사율이 60이라고 가정시, frames는 1초에 60씩 증가 할것이다.
  frames++;
  // performance.now함수는 window 컨텍스트가 생성 된 이후의 값을 ms단위로 측정하여 반환해준다. 즉, 재귀호출을 하며 값은 계속 늘어간다.
  const now = window.performance.now();
  // 1000ms가 1초이니 1초마다 한번씩 누적된 frames를 화면에 렌더링해주며 다시 0으로 초기화해주고 now의 값을 바꿔준다.
  if (now >= start + 1000) {
    // panel은 create 함수가 만들 div요소이다.
    panel.innerText = frames;
    frames = 0;
    start = now;
  }

  // window.requestAnimationFrame을 호출하고 있는 tick함수를
  // 콜백함수로 전달함으로써 재귀적으로 window.requestAnimation이 호출되고 있다.
  window.requestAnimationFrame(tick);
};

// 처음 애플리케이션을 실행할때 초기화를 해주는 함수
const init = (parent = document.body) => {
  panel = create();

  window.requestAnimationFrame(() => {
    // window 컨텍스트가 생성된 이후 처음으로 start변수를 초기화해준다.
    start = window.performance.now();
    parent.appendChild(panel);
    // tick함수는 내부적으로 requestAnimationFrame에게 본인을 재귀호출하게끔 구성되어있다.
    tick();
  });
};

console.log(window.performance.now());

export default {
  init
};
