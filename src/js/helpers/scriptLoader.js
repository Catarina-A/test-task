export default (url, libraryName) => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(libraryName);

    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = url;
      script.id = libraryName;
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
    }
  })
};
