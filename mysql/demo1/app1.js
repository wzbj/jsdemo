(async function(){
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'admin',
        database:'test'
    });
    /**
     * arr返回一个数组，第一个数组是记录的值，第二个数组是记录包含的字段信息
     * 
     */

    // let arr = await connection.query("SELECT username,password FROM user");
    // console.log(arr);

    let [adres] = await connection.query("SELECT region_id,region_name FROM global_region");
    console.log(adres);

    adres.forEach(adrname => {
        console.log(adrname.region_name);
    });



})()

