const { exec } = require('child_process');

exec('tns plugin build', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log(`${err}`);
        return;
    }
});