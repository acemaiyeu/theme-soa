FROM node:16

WORKDIR /app

# Sao chép file package trước để tận dụng bộ nhớ đệm
COPY package.json ./

# Cài đặt dependencies
RUN npm install --legacy-peer-deps

# Sao chép toàn bộ mã nguồn
COPY . .

# Xây dựng ứng dụng
RUN npm run build

RUN npm install -g javascript-obfuscator && \
    javascript-obfuscator build/ --output build-obfuscated/ && \
    rm -rf build && \
    mv build-obfuscated build
    
# Mở cổng (nếu cần)
EXPOSE 3000

# Lệnh chạy ứng dụng (tùy chỉnh nếu cần)
CMD ["npm", "start"]