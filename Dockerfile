FROM hub.fenxibao.com/base/nginx:1.12-alpine
MAINTAINER "<qian.ma@shuyun.com>"

COPY ccms /usr/share/nginx/html/ccms/
COPY default.conf /etc/nginx/conf.d/

EXPOSE 8080

