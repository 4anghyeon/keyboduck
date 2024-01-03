# Keyboduck

## 프로젝트 소개

- 프로젝트명 : 🐤 Keyboduck
- 개요 : 키보드의 모든 것을 한눈에! 키보드 리뷰 및 평가 사이트
- 설명 : 이 프로젝트는 다양한 브랜드의 키보드 정보, 리뷰, 평가, 등을 제공하는 사이트입니다. 사용자는 키보드의 종류, 가격, 특징, 디자인, 타건감 등을 한눈에 비교하고, 리뷰를 통해 실제 사용자들의 평가를 확인할 수 있습니다. 또한, 키보드 소리를 들을 수 있는 영상을 제공하여, 키보드의 타건감을 미리 경험할 수 있습니다.
- 개발기간 : 2023년 12월 26일 ~ 2024년 1월 2일

## 사용 기술

### 프론트엔드

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white">

### 서버리스 DB

<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white">

### 버전 관리

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">

### 협업 툴

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 주요기능

### 로그인 / 회원가입

- supabase Auth를 활용하여 로그인, 회원가입 및 소셜 로그인이 가능합니다.
- 입력창을 다 작성하면 버튼이 활성화 되도록 하였습니다.

### 메인 페이지

- <핵심기능> 내가 작성한 리뷰나 QnA에 댓글이 달리면 실시간으로 알림창이 뜨고 상단 네비바에서 알림개수와 어떤 게시글인지 확인할 수 있으며 클릭시 해당 게시글로 이동합니다.
- 각 제품마다 받은 좋아요 수를 실시간으로 확인할 수 있습니다.
- <인기키보드> 섹션에서는 좋아요를 많이 받은 순서대로 제품이 보여집니다.
- <새로나온 키보드> 섹션에서는 출시일 기준 최신순으로 제품이 보여집니다.
- <브랜드별 키보드> 섹션에서는 총 6개의 탭으로 나눠지며 각 브랜드별 제품을 한눈에 모아볼 수있습니다.

### 상세 페이지

- 해당 제품이 마음에 들 경우 좋아요 버튼을 클릭할 수 있으며 한번누르면 좋아요, 두번 누르면 좋아요 취소가 됩니다.
- 제품의 가격, 브랜드, 연결방식, 출시일 등 상세정보를 확인할 수 있으며 '구매하러가기'로 판매스토어로 이동 가능합니다.
- 관련 유튜브 영상을 추천받을 수 있고 해당 페이지에서 바로 영상 시청이 가능합니다.
- 해당 제품명으로 등록된 관련리뷰를 확인할 수 있으며 남겨진 리뷰가 없으면 리뷰 작성페이지로 이동 가능합니다.

### 리뷰 페이지

- 리뷰 목록페이지는 최신순으로 정렬되며 작성날짜, 해당 게시물의 댓글 수를 확인할 수 있습니다.
- 검색기능을 통해 제목으로 리뷰게시물을 검색할 수 있습니다.
- 리뷰 상세페이지로 들어가면 해당 게시물에 등록된 모든 이미지와 댓글을 확인할 수 있습니다.

### QnA 페이지

- QnA 페이지 역시 최신순으로 정렬되며 해당 게시글의 댓글 수를 확인할 수있습니다.
- 카테고리 선택과 검색기능을 통해 원하는 게시글을 빠르게 찾을 수 있습니다.
- 게시글을 클릭하여 QnA 상세페이지로 넘어가면 해당 질문에 대한 답변을 등록할 수 있습니다.
- 해당 게시글을 작성한 유저는 마음에 드는 답변을 채택하여 가장 최상단으로 노출시킬 수 있습니다.

### 마이 페이지

- 프로필 이미지와 닉네임을 수정할 수 있으며, 수정 시 미리 작성했던 게시글의 정보에도 바로 반영이 됩니다.
- 내가 작성한 리뷰와 좋아요 한 제품을 확인할 수 있습니다.

## 팀원 소개

|  이름  | GitHub                         | 블로그                                 |
| :----: | ------------------------------ | -------------------------------------- |
| 이상현 | https://github.com/4anghyeon   | https://velog.io/@sanghyeon            |
| 민준혁 | https://github.com/HIITMEMARIO | https://velog.io/@alswnsgur119/posts   |
| 염혜원 | https://github.com/Yeomhyewon  | https://zheldqodnsmstkfka.tistory.com/ |
| 이예지 | https://github.com/Yeahzzl     | https://velog.io/@yeahzzl/posts        |
