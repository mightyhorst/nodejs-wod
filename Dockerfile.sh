FROM node:9
RUN mkdir -p /usr
WORKDIR /usr
COPY ./package.json /usr
#RUN npm install
COPY . /usr
RUN npm install
RUN ls
# RUN npm run lint
EXPOSE 10010
ENTRYPOINT ["npm", "run"]
CMD ["start"] 