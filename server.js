const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors()); // 允許 GitHub Pages 的前端跨網域連線
app.use(express.json()); // 讓後端看得懂前端傳來的 JSON 資料

// ⚠️ 請換成你們 Clever Cloud 網頁後台給的真實連線資訊！
const db = mysql.createConnection({
    host: 'b3jdnhv6auslxuvpf2mg-mysql.services.clever-cloud.com',
    user: 'umpzsf30yeeffpy', // 根據你的截圖，你的 User 固定是這個
    password: 'wES4RGlXXPHDvFmhKxx1',
    database: 'b3jdnhv6auslxuvpf2mg', 
    port: 3306
});

// 測試跟雲端 MySQL 是否能通
db.connect(err => {
    if (err) {
        console.error('❌ 噢不，後端連不上雲端資料庫！原因:', err.message);
    } else {
        console.log('🚀 啵棒！後端程式已順利牽線至雲端 MySQL！');
    }
});

// 設計一條「註冊管道 (API)」讓前端可以丟資料過來
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body; // 抓取前端傳來的資料
    
    // 撰寫標準 SQL 指令塞入資料表
    const sql = "INSERT INTO members (name, email, password, role) VALUES (?, ?, ?, 'student')";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: '✨ 雲端資料庫連動成功！會員資料已順利寫入！' });
    });
});

// 讓 Clever Cloud 自動分配 Port，不可死寫成 3000
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`大腦伺服器已在 Port ${PORT} 順利甦醒運行...`));
