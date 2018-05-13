# Morcyc4you
เว็บบริการเช่ารถจักรยานยนต์ Motorcycle rental
______________________________________________

## How to run web app
1. รันแบบ local
2. รันบน Web hosting(ในที่นี้ใช้ Heroku)
______________________________________________

## Import database
1. นำไฟล์ .json ใน mongodb ไป import เข้า mongodb บน mlab สามารถทำได้ตามลิ้งนี้ [Quick-Start Guide to mLab](https://docs.mlab.com/)
2. แก้ไขไฟล์ app.js บรรทัดที่ 15 ให้นำ url บน mlab มาใส่
______________________________________________

## Run Web app on local
  - install nodejs
  - clone ไฟล์นี้
  - รัน command line ใน path ที่เก็บไฟล์ clone ไว้จากนั้นพิมพ์ว่า npm install รอจนกว่าจะเสร็จ
  - รันคำสั่ง npm start เพื่อเปิด web server แล้วจะสามารถเข้าเว็บได้ที่ localhost:3000
______________________________________________

## Run Web app on heroku
- รันบน Heroku สามารถทำได้ตามลิ้งนี้ [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
