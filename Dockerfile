# FROM node:lts-alpine AS builder
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install --force
# COPY . .
# RUN npm run build

# ### STAGE 2: Run ###
# FROM nginx:1.13.12-alpine 
# #COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html
# COPY --from=builder /usr/src/app/dist/* /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine as build
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY ./package.json .
RUN npm install --force

COPY . .
RUN ng build
#RUN ng serve

FROM nginx as runtime
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html
