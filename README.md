# ibike or Morcyc4you
senior project computer engineering
วิธีรันมี 2 แบบคือ
1. รันแบบ local
2. รันบน Web hosting(ในที่นี้ใช้ Heroku)
_______________________________________________________________
Import database
1. นำไฟล์ .json ใน mongodb ไป import เข้า mongodb บน mlab
2. แก้ไขไฟล์ app.js บรรทัดที่ 15 ให้นำ url บน mlab มาใส่
_______________________________________________________________
Run Web app on local
  - install nodejs
  - clone ไฟล์นี้
  - รัน command line ใน path ที่เก็บไฟล์ clone ไว้จากนั้นพิมพ์ว่า npm install รอจนกว่าจะเสร็จ
  - รันคำสั่ง npm start เพื่อเปิด web server แล้วจะสามารถเข้าเว็บได้ที่ localhost:3000
_______________________________________________________________
Run Web app on heroku
- รันบน Heroku สามารถทำได้ตามลิ้งนี้ https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
