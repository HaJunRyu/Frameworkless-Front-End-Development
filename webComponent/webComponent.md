# 웹 구성 요소(webComponent)
현재(2021년 6월 22일 기준) 사용되고 있는 프론트엔드 프레임워크는 대부분 UI 구성을 위해 컴포넌트 단위로 개발을 한다. 하지만 프레임워크 없이 브라우저에서 제공하는 WebComponent라고 하는 표준 API로 컴포넌트 단위 개발을 할 수 있다.  

웹 컴포넌트는 3가지 중요 기술로 구성된다.

- HTML 템플릿: `<template>` 태그는 콘텐츠가 렌더링되지는 않지만 자바스크립트 코드에서 동적인 콘텐츠를 생성하는데 사용될 수 있다. 말 그대로 동적으로 생성하려는 콘텐츠의 template(견본)이다.

- 사용자 정의 요소: react에서 `<MyComponent />`라는 개발자가 만든 컴포넌트를 사용할 수 있듯이 웹 컴포넌트는 완전한 기능을 갖춘 자신(개발자)만의 DOM요소를 작성할 수 있다.

- 섀도우(shadow) DOM: 이 기술은 웹 구성 요소가 구성 요소 외부의 DOM에 영향을 받지 않아야하는 경우에 사용할 수 있다. 다른 사람들과 공유할 수 있도록 컴포넌트 라이브러리나 위젯을 작성하려는 경우 매우 유용하다. (모듈화가 유용하다)

> 섀도우 DOM과 가상 DOM은 완전히 다른 두 문제를 해결한다. 섀도우 DOM은 캡슐화와 관련되고, 가상 DOM은 성능과 관련된다. [관련 문서](https://develoger.com/shadow-dom-virtual-dom-889bf78ce701)  

현재 모던한 브라우저들은 모두 웹 컴포넌트를 지원한다. 하지만 IE에서는 역시 지원이 안되기 때문에 [폴리필 패키지](https://github.com/webcomponents/custom-elements)를 이용해야하지만 워낙 많은 폴리필을 해줘야해서 만약 프로젝트가 IE의 지원을 고려해야한다면 웹 컴포넌트의 사용을 피하는것이 좋을것 같다.  

## 사용자 정의 요소
사용자 정의 요소는 웹 컴포넌트에서의 핵심 요소이다. 아래와 같이 사용할 수 있다.
```javascript
<my-component/>
```
네이밍에 케밥케이스를 사용했는데 이건 개발자가 선택하는것이 아닌 정해진 룰이다. 사용자 정의 요소를 사용할때 태그의 이름은 두 단어 이상을 하이픈`-`을 이용해 구분하여 작성해주어야 한다. 한 단어 태그는 W3C에서만 단독으로 사용할 수 있다고한다. (div, section 등등...)

예시로 사용자 요소를 한번 정의해보자.
```javascript
export default class HelloWorld extends HTMLElement {
  connectedCallback() {
    window.requestAnimationFrame(() => {
      /* 
        화살표 함수에는 this바인딩이 없다. 그래서 this는 connectedCallback의
        this인 connectedCallback메서드를 호출한 인스턴스가 될 것이다. 
      */
      this.innerHTML = '<div>Hello World!</div>'
    });
  }
}
```

`connectedCallback`메서드는 사용자 정의 요소의 라이프사이클 메서드 중 하나이다. 이 메서드는 구성 요소가 DOM에 연결될 때 호출된다. react에서의 componentDidMount 메서드와 매우 유사하다. 콘텐츠를 렌더링하거나 비동기 처리를 하기 좋은 장소이다. 반대로 구성요소가 DOM에서 삭제될때 호출되는 `disconnectedCallback`메서드도 존재한다. 클린업 작업을 하기 좋은 메서드이다.

위의 예제에서처럼 사용자 정의 요소를 생성했다면 이것을 사용하기 위해 브라우저 구성 요소 레지스트리에 추가해야 한다. 그러려면 window.customElements프로퍼티의 define메서드를 사용해야 한다.

```javascript
// HelloWorld는 위에서 정의한 사용자 정의 요소입니다.
window.customElements.define('hello-world', HelloWorld);
```

위와 같이 브라우저 구성 요소 레지스트리에 구성 요소를 추가하면 첫번째 인자로 전달한 값으로 자용자 정의 태그를 사용할 수 있다. 위의 예제에서는 `<hello-world/>` 이렇게 말이다.