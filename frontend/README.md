1. recoil 설치
   npm add recoil

2. Root에 <RecoilRoot> 로 감싸주어야함.

3. atom 예시

import { atom, selector } from "recoil";

const todoListState = atom({
    // key: 고유한 키 값, default: atom의 초기값
    key: "todoListState",
    default: []
});

4. Hooks of Atom
- 전역상태(Atoms/Selector) 관련 Hooks
1. useRecoilValue(): 전역상태의 state 상태 값만을 참조하기 위해 사용
2. useSetRecoilState(): 전역상태의 state의 setter함수만을 활용하기 위해 사용
3. useRecoilState(): useState()와 유사, state와 state를 set 하는 setter함수를 각각 받아옴.
4. useResetRecoilState(): 전역상태를 default(초기값)으로 Reset 하기 위해 사용
- Selector
1. Atom 혹은 다른 Selecotor 상태를 입력 받아 동적인 데이터를 반환하는 순수함수
2. 상태 값에서 비롯된 파생된 데이터를 만들때 사용
3. Selector가 참조하던 다른 상태가 변경되면 이도 같이 업데이트 됨
4. example

const filteredTodoListState = selector({
    // key: 고유한 키 값, get: Selector순수함수, 사용할 값을 반환(get()메서드로 다른 atom 혹은 selector를 참조)
    key: "filterdTodoListState",
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case "Show Completed":
                return list.filter((item) => item.isComplete);
            case "Show Uncompleted":
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    }

});
