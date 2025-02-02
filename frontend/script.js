const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const resultDiv = document.getElementById('result');

uploadButton.addEventListener('click', () => {
    const file = imageInput.files[0]; // ดึงไฟล์แรกที่ผู้ใช้เลือก
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        resultDiv.textContent = 'กำลังประมวลผล...'; // แสดงข้อความรอ

        fetch('http://localhost:5000/api/process', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = ''; // ล้างผลลัพธ์เก่า
            if (data.success) {
                data.prices.forEach(item => {
                    const priceElement = document.createElement('p');
                    priceElement.textContent = `${item.product}: ${item.price} บาท`;
                    resultDiv.appendChild(priceElement);
                });
            } else {
                resultDiv.textContent = 'Error: ' + data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error processing image.';
        });
    } else {
        resultDiv.textContent = 'กรุณาเลือกไฟล์ภาพก่อนกด Upload';
    }
});