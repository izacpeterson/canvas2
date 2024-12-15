module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./index.js", // Adjust to your app's entry point
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
