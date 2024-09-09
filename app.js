document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;

    // Debug: 打印输入的 a 和 b 值
    console.log('Input a:', a);
    console.log('Input b:', b);

    fetch('https://api.jsonbin.io/v3/b/66dea200e41b4d34e42c5dfd', {
        method: 'GET',
        headers: {
            'X-Access-Key': '$2a$10$BniJHi6wL1Mu6okcRgEFH.hXtk0pJsjXGG3u/YMIxHqhWVKjY6oJC',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const token = data.record.token;
        console.log('Fetched token:', token);  // Debug: 打印获取到的 token

        sendToSalesforce(a, b, token);
    })
    .catch(error => {
        console.error('Error fetching token:', error);  // Debug: 捕获并打印错误
    });
});

function sendToSalesforce(a, b, token) {
    console.log('Sending to Salesforce with token:', token);  // Debug: 打印 token 和发送数据前的状态
    fetch('https://dns0000033zzh2aa-dev-ed.develop.my.salesforce.com/services/apexrest/service/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ a: a, b: b })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Salesforce response:', data);  // Debug: 打印 Salesforce 返回数据
        document.getElementById('responseData').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error sending data to Salesforce:', error);  // Debug: 捕获并打印错误
    });
}
