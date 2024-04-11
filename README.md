This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites
Before you start, ensure you have the following installed:

- [npm](https://www.npmjs.com/get-npm)
- [Node.js](https://nodejs.org/)

## Getting Started

Install project dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Running on docker
To run, you have to run two commands.

Run the following command to build the docker containers:
```shell
docker compose build
```

Run the following command to start running the docker containers:
```shell
docker compose up
```


## Deploy on Tauri

1. Ensure rust is installed. Follow this link [rust](https://www.rust-lang.org/tools/install)

2. Ensure that C++ build tools are properly installed. This should automatically be included by the rust installment steps. But if not, follow this link [build tools](https://www.rust-lang.org/tools/install)

3. Install the tauri cli 
```shell 
cargo install tauri-cli
``` 
and in NPM

4. Create the .exe by executing the following command. This step already performs npm run build

```shell
cargo tauri build
```

or by doing

```shell
npm run tauri build
```
