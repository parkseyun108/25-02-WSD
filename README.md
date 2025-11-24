# Express REST API 실습 프로젝트

웹서비스 설계 수업 실습용 Node.js Express 백엔드 REST API 예제입니다.

## 개요

- **프레임워크**: Node.js + Express
- **기능**: `items`와 `users` 리소스 CRUD(등록/조회/수정/삭제) API
- **요구 조건**:  
    - HTTP 메소드별 2개씩, 총 8개 엔드포인트  
    - 미들웨어(요청 로그)  
    - 다양한 HTTP 상태코드(2xx, 4xx, 5xx)  
    - 표준화된 응답 포맷

---

## 설치 및 실행

1. **express** 의존성 설치
    ```
    npm install express
    ```

2. 코드를 `app.js` 등 원하는 파일로 저장 후 실행
    ```
    node app.js
    ```
    - 서버 기본 포트: `http://localhost:3000`

---

## 주요 기능

### 엔드포인트 요약

| Method | Path              | Description                  |
|--------|-------------------|-----------------------------|
| POST   | `/items`          | 아이템 추가 (name 필요)      |
| POST   | `/users`          | 사용자 추가 (username 필요)  |
| GET    | `/items`          | 전체 아이템 조회             |
| GET    | `/users/:id`      | 특정 사용자 조회             |
| GET    | `/maintenance`    | 서버 장애(503 예시)          |
| PUT    | `/items/:id`      | 아이템 정보 수정             |
| PUT    | `/users/:id`      | 사용자 정보 수정             |
| DELETE | `/items/:id`      | 아이템 삭제                  |
| DELETE | `/users/:id`      | 사용자 삭제                  |

---

### API 요청 예시

**POST /items**

{
"name": "apple"
}

### API 응답 예시

{
"status": "success",
"data": { "id": 0, "name": "apple" }
}


**오류 상황 예시**
- name이 없을 때: 400
- name이 `"error"`일 때: 500
- 없는 id 접근 시: 404
- `/maintenance` 진입: 503

모든 응답은 아래와 같이 표준 포맷을 따릅니다:

{
"status": "success" | "error",
"data": { ... } | null,
"message": "설명 메시지"
}


---

## 미들웨어 기능

- 모든 요청에 대해 **요청 시각, 메소드, URL**을 로그로 출력합니다.
    ```
    mid Time: 1700000000000
    request logging: POST /items
    ```
- `express.json()` 미들웨어로 JSON 바디 지원

---

## 테스트 방법

- [Postman](https://www.postman.com/) 등 API 클라이언트로 각 엔드포인트를 테스트
- 다양한 상태코드(201, 400, 404, 500, 503 등)가 상황에 맞게 반환되는지 확인

---





