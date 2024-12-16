module.exports = {
  apps: [
    {
      name: "my-app",
      script: "npm",
      args: "run start", // Specifies the npm script to run
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
