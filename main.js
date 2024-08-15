const http = require('http');
const mysql = require('mysql2');

const hostname = '127.0.0.1';
const port = 3000;

// MySQL 연결 설정 (새로 생성한 사용자 정보로 업데이트)
const db = mysql.createConnection({
    host: 'localhost',     // MySQL 서버 호스트
    user: 'name1',      // 새로 생성한 MySQL 사용자 이름
    password: 'skehahffk123', // 새로 생성한 MySQL 사용자 비밀번호
    database: 'users'      // 사용하려는 데이터베이스 이름
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패: ' + err.stack);
        return;
    }
    console.log('데이터베이스에 연결되었습니다.');
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // 간단한 라우팅
    if (req.url === '/') {
        res.end('<h1>Hello, World!</h1><p>Welcome to my web server!</p>');
    } else if (req.url === '/users') {
        // MySQL 데이터베이스에서 사용자 목록 가져오기
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                res.statusCode = 500;
                res.end('데이터베이스 쿼리 중 오류가 발생했습니다.');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        });
    } else {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});