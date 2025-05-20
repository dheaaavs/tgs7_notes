FROM node:18-alpine
WORKDIR /dhea_notes_fe/
COPY public/ /dhea_notes_fe/public
COPY src/ /dhea_notes_fe/src
COPY package.json /dhea_notes_fe/
RUN npm install
CMD ["npm", "start"]