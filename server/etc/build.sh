export PATH="./node_modules/.bin:$PATH"
rimraf dist

export NODE_ENV=production

tsc -p ./tsconfig.build.json --pretty

cp package.json dist/
