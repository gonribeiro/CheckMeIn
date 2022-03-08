<div align="center">
  <h1> Check Me In - Server</h1>
</div>

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE.md) para obter detalhes.

---

<p align="center">Made with 💜 by Tiago Ribeiro</p>

---

## 📒 Notas do aprendizado com NodeJS
- yarn init -y
- yarn add express bcrypt jsonwebtoken @prisma/client express-async-errors uuidv4 dayjs swagger-ui-express @sentry/node @sentry/tracing google-auth-library
- yarn add prisma typescript ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt @types/uuidv4 @types/swagger-ui-express -D
- yarn tsc --init
    - tsconfig:
    ```
    {
        "compilerOptions": {
            "sourceMap": true,
            "outDir": "dist",
            "strict": true,
            "lib": ["esnext"],
            "esModuleInterop": true,
            "resolveJsonModule": true
        }
    }
    ```
- package.json
```
...
"scripts": {
    "dev": "ts-node-dev --exit-child --transpile-only --ignore-watch node_modules src/server.ts",
    "test": "jest"
},
...
```

### 🔧 Ferramentas
- Plugin vscode Prisma e Prisma - Insider
    - Control + Shift + P: >settings.json
        - Preferences: Open Settings (JSON)
        ```
        {
            ...
            "editor.formatOnSave": true,
            "[prisma]": {
                "editor.defaultFormatter": "Prisma.prisma"
            },
        }
        ```
- https://www.prisma.io/studio