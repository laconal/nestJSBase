1. create and edit .env

2. generate private and public access keys for JWT:
`openssl genpkey -algorithm RSA -out src/shared/secrets/accessPrivate.pem -pkeyopt rsa_keygen_bits:2048`
`openssl rsa -pubout -in src/shared/secrets/accessPrivate.pem -out src/shared/secrets/accessPublic.pem`

3. generate private and public refresh keys for JWT:
`openssl genpkey -algorithm RSA -out src/shared/secrets/refreshPrivate.pem -pkeyopt rsa_keygen_bits:2048`
`openssl rsa -pubout -in src/shared/secrets/refreshPrivate.pem -out src/shared/secrets/refreshPublic.pem`

3. install dependecies
`pnpm install`

5. Run containers:
`docker compose up -d`

4. make migrations:
`npx drizzle-kit generate`
`npx drizzle-kit migrate`

6. edit docker config files in /docker

7. Run
`pnpm run dev`


