document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取用户输入的变量 a 和 b
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;

    // Step 1: 获取 token
    fetch('https://api.jsonbin.io/v3/b/66dea200e41b4d34e42c5dfd', {
        method: 'GET',
        headers: {
            'X-Access-Key': '$2a$10$BniJHi6wL1Mu6okcRgEFH.hXtk0pJsjXGG3u/YMIxHqhWVKjY6oJC',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const token = data.record.token;  // 获取 token

        // Step 2: 将 a, b 和 token 通过 POST 请求发送给 Salesforce
        sendToSalesforce(a, b, token);
    })
    .catch(error => {
        console.error('Error fetching token:', error);
    });
});

function sendToSalesforce(a, b, token) {
    fetch('https://dns0000033zzh2aa-dev-ed.develop.my.salesforce.com/services/apexrest/service/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,  // 使用从 API 获取到的 token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: a,
            b: b
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseData').textContent = JSON.stringify(data, null, 2);  // 显示返回的数据
    })
    .catch(error => {
        console.error('Error sending data to Salesforce:', error);
    });
}
