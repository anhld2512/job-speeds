import { v4 as uuidv4 } from 'uuid';

// Hàm giả lập chuyển đổi từ UUID v4 sang ObjectId
function uuidToObjectId(uuid) {
  // Lấy 24 ký tự đầu tiên của UUID (bỏ các dấu gạch ngang)
  const hexString = uuid.replace(/-/g, '').slice(0, 24);
  return hexString.padEnd(24, '0'); // Đảm bảo chiều dài đủ 24 ký tự
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      uuidv4: uuidv4,
      uuidToObjectId: uuidToObjectId
    }
  };
});
