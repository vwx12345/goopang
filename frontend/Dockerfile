# 1. Node.js를 사용하여 Vite 빌드
FROM node:18-alpine AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json을 복사 후 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 4. 소스 코드 전체 복사 후 Vite 빌드 실행
COPY . .
RUN npm run build

# 5. Nginx를 사용하여 정적 파일 제공
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 6. Vite 빌드 결과물을 Nginx 기본 경로에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 7. 기본 Nginx 설정 유지 (커스텀 설정 필요하면 추가 가능)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
