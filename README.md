# 2024.06.28
## Google에서 제공하는 새로운 방식을 적용하면, 위에서 테스트 했던 모든 것이 의미가 없다고 판단됩니다. oAuth 구글한정으로 말입니다.

[https://developers.google.com/identity/gsi/web/guides/migration?hl=ko#redirect-mode_1](https://developers.google.com/identity/gsi/web/guides/migration?hl=ko#redirect-mode_1)


# toy_oauth_backend_express_react

## Goal
- This is simple code for STUDY
- Google oAuth for redirect to backend
- We need "Authentication" only

## Installation
**Requirements**
- NPM

### Clone
```bash
git clone https://github.com/halfenif/toy_oauth_backend_express_react.git
```

## Change Config
```bash
cp .back/.env.sample .back/.env
```

## Google Console
- Prepare the API authentication key information in Google Console
- edit .env

## Install node_module
- front/install.sh
- back/install.sh

## Run Back * Front
- back/run.sh
- front/run_dev.sh


## Issue
- App.jsx:18 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
- Build해서 실행하면 발생 안하는데, Vite Dev에서 발생하는 이유는..? 안찾아보고 있습니다.

## Below Korean Description
### 이 녀석을 만들게된 이야기

Streamlit으로 간단한 화면을 하나 만들고 있었는데, 인증이 필요한 상황이라 Google oAuth를 사용하기로 합니다. (한 3년전에 작업했던것을 다시 기억하며..)

누군가가 [streamlit-oauth](https://github.com/dnplus/streamlit-oauth)라는 라이브러리를 만들어둔것을 발견하고 잘 적용을 했는데.. 생각 해 보니 좀 이상합니다.
- 나는 인증만 필요한데?
- Access Token을 왜 화면에다가 던지고 있지?
- 인터넷에서 발견한 [OAuth 2.0 개념과 동작원리](https://hudi.blog/oauth-2.0/)라는 글을 잘 읽어봅니다.
- "oauth2 redirect front vs back" 라는 주제로 검색도 해보고 물어도 봅니다.
> 아무리 생각해도 내가 원하는 것은 back으로 redirect하는 것입니다.
- GPT에게 oauth redirect backend sample을 만들어 달라고 했더니... Express와 React로 만들어 줍니다. (어이..! 난 그거 모른다고.)
> 그냥 구글링하면서 진행하기로 합니다.
- 설정후 테스트를 하면서 SCOPE에 대해 좀더 궁금한 점이 있어 테스트 해 봅니다.
![Payload according to Google oAuth scope](/doc/payload_by_scope.png)
- 역시 access token없이 내가 원하는 인증정보는 얻을수 있는것이었습니다.
- PoC 해 본것을 GitHub에다가 던져넣고 이제 다시 streamlit으로 돌아갈것입니다.
