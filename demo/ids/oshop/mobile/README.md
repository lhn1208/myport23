# 0shop 모바일

## Sitemap
/publish/oshop/mobile/html/guide.html

## icon 처리
- 2배율(간혹 3배율로 주시는 경우도 있음)로 작업되며 icon은 **image sprite**로 작업됨
- image sprite는 두 벌씩 작업되며 아래의 task를 거침
  1. root의 `ico_oshop.psd`에 아이콘 추가
  2. 추가 후 `images/m640`에 `ico_oshop.png` 파일로 저장
  3. `images/m640`에 저장된 `ico_oshop.png`파일을 절반 사이즈로 줄여 `images/m320` 폴더에 다시 저장
- psd가 없는 image sprite 형식의 이미지들도 동일하게 처리되어야 함

## 사용 플러그인
- swiper
- slick(경우에 따라 일부에 사용되기도 함)

## 메인 컬러
- 대웅, 풀무원, 매일 세곳은 해당 직원의 소속에 따라 메인 페이지의 메인 컬러가 변경되므로 css에서 해당 부분 참고할 것(메인 페이지에서 확인 가능)

## 해상도
- 가로폭 320은 버리는 추세이나 크게 레이아웃이 어긋나면 수정해주는 정도이며 기준 해상도는 디자인에 따라감

## 자주 발생하는 이벤트
- 체험단 이벤트, 타임세일 이벤트가 자주 발생하며 레이아웃은 동일하므로 기존 레이아웃 그대로 사용
- 해당 이벤트는 모바일/데스트탑 동시 작업
- 체험단은 sitemap의 `prodTester` 경로에서 모두 확인 가능
- 타임세일은 `/publish/oshop/mobile/html/event/timesale_*.html`에서 모두 확인 가능

## 정기 기획전
- 다른 이벤트와는 조금 다르게 복잡하므로 기존 작업물과 최대한 맞추어 작업하되, 디자인에 따라 해당 페이지에 단독 css로 스타일 조절이 필요
- 기존 작업물은 `/publish/oshop/mobile/html/event/plan_*.html`에서 모두 확인 가능
- 각 상품 섹션 상단의 `eyebrow`라고 명칭된 이미지 텍스트는 일괄적으로 가로폭 `674px`로 잘라 처리함
- 상품 리스트는 개발에서 처리하므로 임시 데이터로 채워져 있음

## 비정기 이벤트
- `/publish/oshop/mobile/html/event/` 폴더에 날짜와 간단한 제목 추가하여 이벤트 페이지 작성