module.exports = {
  apps: [
    {
      name: 'infocimahi-dashboard',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 8000',
      cwd: './',
    },
  ],
};
