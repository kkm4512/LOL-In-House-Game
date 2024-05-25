Fronend = Nuxt3
Backend = Nestjs

[ Backend ]

1. 터미널 실행 경로를 B\backend\src 폴더 마우스 우클릭을 통하여 터미널을 연다.
2. npm i 를 실행한다.
3. npn run start:dev를 실행한다

[ Fronted ]

1. 터미널 실행 경로를 F\frontend 폴더 마우스 우클릭을 통하여 터미널을 연다.
2. npm i 를 실행한다.
3. npm run dev를 실행한다

[ 이용방법 ]

![Logo](https://github.com/kkm4512/LOL-In-House-Game/blob/main/%EB%A1%A4_%EB%82%B4%EC%A0%84_%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B4.png?raw=true)

1. 위 화면과같이 각 플레이어의 정보를 올바르게 입력한다.
2. 부라인은 공백도 허용한다.
3. 부라인 작성시 *꼭*  "," (컴마) 로 구분지어서 라인을 작성하기
4. 주라인 선택후, All 버튼 클릭시 주라인을 제외한 다른라인들이 자동으로 설정됨
5. 확인버튼 누르기


[ 성공화면 ]

![Logo](https://github.com/kkm4512/LOL-In-House-Game/blob/main/%EB%A1%A4_%EB%82%B4%EC%A0%84_%EC%84%B1%EA%B3%B5%ED%99%94%EB%A9%B4.png?raw=true)

1. 다른 조합을 확인해보고 싶다면 웹에 있는 뒤로가기 버튼을 눌러, 이전 페이지로 넘어가기
2. 이전 플레이어 목록 버튼클릭시, 이전에 기재했던 플레이어들이 나열됨
3. 다시 확인 버튼 누르기

[ 밸런스 ]

1. 매우 잘맞음 = 1000점 차이
2. 적당히 잘맞음 = 2000점 차이
3. 걍 내맘대로 짬 ㅅㄱ = 4000점 차이

[ 코드 실행 설명 ]

1. 밸런스에서 정한 점수차이만큼을 최대한 찾고, 없으면 그다음 차선책의 점수차이를 가진 팀 조합을 return

