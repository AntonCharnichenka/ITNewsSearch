const promise = Promise.reject();

try {
    await promise;
} catch {
    console.log('error1');
}

try {
    await promise;
} catch {
    console.log('error2');
}