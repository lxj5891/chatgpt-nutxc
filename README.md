docker build -t nuxt .
docker run -d --name nuxt -p 3000:3000 --net=network --ip=172.9.3.79 nuxt
