# Hướng dẫn chạy code

## Bước 1 : Clone dự án
```shell
git clone https://github.com/tribeti/aichat-web.git
```

## Bước 2 : Có .env
### Liên hệ mình để có .env :)

## Bước 3 : Mở vscode hoặc bất kì IDE/ text editor nào (nói chung là app mà bạn dùng để code)

Mở terminal
```shell
cd server
npm i
npm run dev
```

Mở 1 cái terminal khác
```shell
cd client
npm i
npm start
```

## Bước 4 : Kiểm thử
Mở terminal khác nữa
```powershell
Invoke-RestMethod -Uri "http://localhost:5070/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"message": "Do you have any dining tables?"}'
```
Nếu trả về kết quả tức là thành công không thì lên gg, hỏi AI :)))

## Bước 5 : Kiểm thử với giao diện
Thực tế thì các bạn có thể bỏ luôn bước 4 cũng được  
1. Vào trong giao diện web [front-end](http://localhost:3000/)  
1. Mở hộp thoại chat ở góc dưới bên phải  
1. Chat với AI nếu phản hồi tức là thành công nếu không thì bấm F12 vào tab console và kiểm tra cái **[{...}]** ở dưới cùng bấm mũi tên mở ra, thử chat thêm 1 phát nữa vào nó sẽ hiện lỗi  
1. Lúc này bạn có thể copy lỗi tra gg hoặc chatGPT đảm bảo ra

# FAQ
1. Nếu muốn tự lấy key cho .env thì như nào ?  
B1 : Vào [mongodb](https://account.mongodb.com/account/login) tạo tài khoản các kiểu và theo hướng dẫn (nhớ cái mật khẩu mà app tự tạo hoặc nếu muốn thì đổi mật khẩu)  
B2 : Chọn driver thì chọn Node.js , tải thư viện về và dưới cùng là cái api key của MONGODB_ATLAS_URI (nhớ thay thế <db_pass> trong link thành cái mật khẩu thật)  
B3 : Vào [google console](https://console.cloud.google.com/) tạo project các kiểu rồi vào mục **APIs & Services** sau đó nhìn bên tay trái của màn hình có nav bar với cái icon chìa khóa **Credentials** và chọn cái đó  
B4 : Bấm nút Create credentials và chọn API KEY và nó sẽ cho bạn key của GOOGLE_API_KEY
2. Không seed database được hoặc sử dụng các tính năng liên quan tới AI ?  
Lý do mình mắc phải là do apikey nó chưa bật tính năng gemini ai để bật thì đơn giản là trong terminal nó sẽ có 1 cái [link](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com) bấm vào là vào thẳng trang để bật lên luôn :)))  
# Credits
Video hướng dẫn chi tiết về dự án này : [Building an AI-Powered E-commerce Chat Assistant with MongoDB – Tutorial](https://www.youtube.com/watch?v=9tANiA0LKn4)  
Repo chính thức : [github.com/kubowania/ecommerce-chat-helper](https://github.com/kubowania/ecommerce-chat-helper)