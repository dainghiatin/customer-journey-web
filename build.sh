export $(cat .env | xargs)
docker build --build-arg VITE_API_URL=$VITE_API_URL -t  jeyluu/customer-journey-web:dev-0.1 .