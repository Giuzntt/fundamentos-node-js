import http from "http";



const server = http.createServer((req, res) => {

    const  buffers = [];


    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const fullStreamContent = Buffer.concat(buffers).toString();

    return res.end(fullStreamContent);



});

server.listen(3334);
